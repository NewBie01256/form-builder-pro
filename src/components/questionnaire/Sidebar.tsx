import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AutoResizeTextarea } from "@/components/ui/auto-resize-textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Plus, FileText, GitBranch, HelpCircle, RotateCcw, ChevronDown, ChevronUp, Settings, Zap, Layers, File, Search, X } from "lucide-react";
import { Question, ConditionalBranch, Questionnaire, Page, Section } from "@/types/questionnaire";
import { cn } from "@/lib/utils";
import { useState, useMemo } from "react";

interface SidebarProps {
  questionnaire: Questionnaire | null;
  activePageId: string | null;
  selectedSectionId: string | null;
  selectedQuestionId: string | null;
  selectedBranchId: string | null;
  onCreateQuestionnaire: () => void;
  onSelectPage: (id: string) => void;
  onSelectSection: (id: string) => void;
  onSelectQuestion: (id: string, branchId: string | null) => void;
  onSelectBranch: (id: string) => void;
  onReset: () => void;
  onUpdateQuestionnaire: (updated: Questionnaire) => void;
  onPublish?: () => void;
  canPublish?: boolean;
}

const Sidebar = ({
  questionnaire,
  activePageId,
  selectedSectionId,
  selectedQuestionId,
  selectedBranchId,
  onCreateQuestionnaire,
  onSelectPage,
  onSelectSection,
  onSelectQuestion,
  onSelectBranch,
  onReset,
  onUpdateQuestionnaire,
  onPublish,
  canPublish = false,
}: SidebarProps) => {
  const [detailsOpen, setDetailsOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Helper to check if text matches search query
  const matchesSearch = (text: string | undefined): boolean => {
    if (!searchQuery.trim()) return true;
    return (text || '').toLowerCase().includes(searchQuery.toLowerCase());
  };

  // Helper to highlight matching text
  const highlightText = (text: string | undefined): React.ReactNode => {
    const displayText = text || 'Untitled';
    if (!searchQuery.trim()) return displayText;
    
    const query = searchQuery.toLowerCase();
    const lowerText = displayText.toLowerCase();
    const matchIndex = lowerText.indexOf(query);
    
    if (matchIndex === -1) return displayText;
    
    const before = displayText.slice(0, matchIndex);
    const match = displayText.slice(matchIndex, matchIndex + searchQuery.length);
    const after = displayText.slice(matchIndex + searchQuery.length);
    
    return (
      <>
        {before}
        <mark className="rounded-sm px-0.5" style={{ backgroundColor: 'hsl(var(--highlight))', color: 'hsl(var(--highlight-foreground))' }}>{match}</mark>
        {after}
      </>
    );
  };

  // Check if a branch or any of its descendants match the search
  const branchMatchesSearch = (branch: ConditionalBranch): boolean => {
    if (matchesSearch(branch.name)) return true;
    if (branch.questions.some(q => matchesSearch(q.text))) return true;
    return branch.childBranches.some(cb => branchMatchesSearch(cb));
  };

  // Check if a section or any of its descendants match the search
  const sectionMatchesSearch = (section: Section): boolean => {
    if (matchesSearch(section.name)) return true;
    if (section.questions.some(q => matchesSearch(q.text))) return true;
    return section.branches.some(b => branchMatchesSearch(b));
  };

  // Check if a page or any of its descendants match the search
  const pageMatchesSearch = (page: Page): boolean => {
    if (matchesSearch(page.name)) return true;
    return page.sections.some(s => sectionMatchesSearch(s));
  };

  // Filter pages based on search
  const filteredPages = useMemo(() => {
    if (!questionnaire || !searchQuery.trim()) return questionnaire?.pages || [];
    return questionnaire.pages.filter(page => pageMatchesSearch(page));
  }, [questionnaire, searchQuery]);

  // Find all ancestor branch IDs for a given branch or question
  const findAncestorBranchIds = (
    targetBranchId: string | null,
    targetQuestionId: string | null,
    branches: ConditionalBranch[],
    ancestors: string[] = []
  ): string[] | null => {
    for (const branch of branches) {
      // Check if this branch is the target
      if (targetBranchId && branch.id === targetBranchId) {
        return ancestors;
      }
      
      // Check if this branch contains the target question
      if (targetQuestionId && branch.questions.some(q => q.id === targetQuestionId)) {
        return [...ancestors, branch.id];
      }
      
      // Recurse into child branches
      const found = findAncestorBranchIds(
        targetBranchId,
        targetQuestionId,
        branch.childBranches,
        [...ancestors, branch.id]
      );
      if (found) return found;
    }
    return null;
  };

  // Get the page ID that contains the selected item
  const getSelectedPageId = (): string | null => {
    if (!questionnaire || (!selectedSectionId && !selectedQuestionId && !selectedBranchId)) {
      return null;
    }
    
    for (const page of questionnaire.pages) {
      if (selectedSectionId && page.sections.some(s => s.id === selectedSectionId)) {
        return page.id;
      }
    }
    return null;
  };

  const selectedPageId = getSelectedPageId();

  // Get ancestor branch IDs for highlighting the path
  const getAncestorBranchIds = (): string[] => {
    if (!questionnaire || !selectedSectionId) return [];
    
    const section = questionnaire.pages
      .flatMap(p => p.sections)
      .find(s => s.id === selectedSectionId);
    
    if (!section) return [];
    
    const ancestors = findAncestorBranchIds(
      selectedBranchId,
      selectedQuestionId,
      section.branches
    );
    
    return ancestors || [];
  };

  const ancestorBranchIds = getAncestorBranchIds();

  // Check if a question has any action attached (question-level or answer-level)
  const questionHasAction = (question: Question): boolean => {
    // Check question-level action record
    if (question.actionRecord) return true;
    
    // Check answer-level action records
    for (const answerSet of question.answerSets) {
      for (const answer of answerSet.answers) {
        if (answer.actionRecord) return true;
      }
    }
    for (const ruleGroup of question.answerLevelRuleGroups) {
      if (ruleGroup.inlineAnswerSet) {
        for (const answer of ruleGroup.inlineAnswerSet.answers) {
          if (answer.actionRecord) return true;
        }
      }
    }
    return false;
  };

  const renderBranchTree = (
    branch: ConditionalBranch,
    sectionId: string,
    pageId: string,
    depth: number = 0,
    isLast: boolean = true,
    parentLines: boolean[] = []
  ): JSX.Element => {
    const allItems = [
      ...branch.questions.map(q => ({ type: 'question' as const, item: q })),
      ...branch.childBranches.map(cb => ({ type: 'branch' as const, item: cb }))
    ];

    // Check if this branch is in the path to the selected item
    const isInPath = ancestorBranchIds.includes(branch.id);
    const isDirectlySelected = selectedBranchId === branch.id && !selectedQuestionId;

    return (
      <div key={branch.id} className="relative">
        <div className="flex items-stretch">
          <div className="flex" style={{ width: `${depth * 20}px` }}>
            {parentLines.map((showLine, i) => (
              <div key={i} className="w-5 relative">
                {showLine && <div className="absolute left-2 top-0 bottom-0 w-px bg-border" />}
              </div>
            ))}
          </div>

          {depth > 0 && (
            <div className="w-5 relative flex items-center">
              <div className={cn("absolute left-2 w-px bg-border", isLast ? "top-0 h-1/2" : "top-0 bottom-0")} />
              <div className="absolute left-2 top-1/2 w-3 h-px bg-border" />
            </div>
          )}

          <div
            className={cn(
              "flex-1 flex items-center gap-2 px-2 py-2 rounded-md cursor-pointer transition-colors border",
              isDirectlySelected
                ? "bg-accent text-accent-foreground border-primary"
                : isInPath
                  ? "bg-primary/5 border-primary/40 text-primary/80"
                  : "border-transparent hover:bg-accent"
            )}
            onClick={() => {
              onSelectPage(pageId);
              onSelectSection(sectionId);
              onSelectBranch(branch.id);
            }}
          >
            <GitBranch className={cn("h-4 w-4 shrink-0", isDirectlySelected || isInPath ? "text-primary" : "text-muted-foreground")} />
            <span className="truncate text-sm font-medium">{highlightText(branch.name) || 'Untitled Branch'}</span>
          </div>
        </div>

        {allItems.map((child, index) => {
          const isChildLast = index === allItems.length - 1;
          const newParentLines = [...parentLines, !isLast];

          if (child.type === 'question') {
            return (
              <div key={child.item.id} className="flex items-stretch">
                <div className="flex" style={{ width: `${(depth + 1) * 20}px` }}>
                  {[...parentLines, !isLast].map((showLine, i) => (
                    <div key={i} className="w-5 relative">
                      {showLine && <div className="absolute left-2 top-0 bottom-0 w-px bg-border" />}
                    </div>
                  ))}
                </div>

                <div className="w-5 relative flex items-center">
                  <div className={cn("absolute left-2 w-px bg-border", isChildLast ? "top-0 h-1/2" : "top-0 bottom-0")} />
                  <div className="absolute left-2 top-1/2 w-3 h-px bg-border" />
                </div>

                <div
                  className={cn(
                    "flex-1 flex items-center gap-2 px-2 py-2 rounded-md cursor-pointer transition-colors",
                    "hover:bg-accent",
                    selectedQuestionId === child.item.id && "bg-accent text-accent-foreground"
                  )}
                  onClick={() => {
                    onSelectPage(pageId);
                    onSelectSection(sectionId);
                    onSelectQuestion(child.item.id, branch.id);
                  }}
                >
                  <HelpCircle className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span className="truncate text-sm flex-1">{highlightText(child.item.text) || 'Untitled Question'}</span>
                  {questionHasAction(child.item) && (
                    <Zap className="h-3 w-3 text-amber-500 shrink-0" />
                  )}
                </div>
              </div>
            );
          } else {
            return renderBranchTree(child.item, sectionId, pageId, depth + 1, isChildLast, newParentLines);
          }
        })}
      </div>
    );
  };

  const renderSectionTree = (section: Section, pageId: string): JSX.Element => {
    // Check if this section has any selected child (question or branch)
    const hasSelectedChild = selectedSectionId === section.id && (selectedQuestionId || selectedBranchId);
    const isSectionDirectlySelected = selectedSectionId === section.id && !selectedQuestionId && !selectedBranchId;
    
    // Filter questions and branches based on search
    const filteredQuestions = searchQuery.trim() 
      ? section.questions.filter(q => matchesSearch(q.text))
      : section.questions;
    
    const filteredBranches = searchQuery.trim()
      ? section.branches.filter(b => branchMatchesSearch(b))
      : section.branches;

    // Don't render section if it has no matching children when searching
    const sectionDirectlyMatches = matchesSearch(section.name);
    const hasMatchingChildren = filteredQuestions.length > 0 || filteredBranches.length > 0;
    
    if (searchQuery.trim() && !sectionDirectlyMatches && !hasMatchingChildren) {
      return <></>;
    }
    
    return (
      <div key={section.id} className="ml-4">
        <div
          className={cn(
            "flex items-center gap-2 px-2 py-2 rounded-md cursor-pointer transition-colors border",
            isSectionDirectlySelected
              ? "bg-primary/10 border-primary text-primary"
              : hasSelectedChild
                ? "bg-primary/5 border-primary/50 text-primary/80"
                : "border-transparent hover:bg-accent"
          )}
          onClick={() => {
            // Navigate to the page containing this section
            onSelectPage(pageId);
            onSelectSection(section.id);
          }}
        >
          <Layers className={cn("h-4 w-4 shrink-0", isSectionDirectlySelected || hasSelectedChild ? "text-primary" : "text-muted-foreground")} />
          <span className="truncate text-sm font-medium">{highlightText(section.name) || 'Untitled Section'}</span>
        </div>

        {/* Section Questions */}
        {filteredQuestions.map(q => (
          <div
            key={q.id}
            className={cn(
              "flex items-center gap-2 px-2 py-2 ml-4 rounded-md cursor-pointer transition-colors",
              "hover:bg-accent",
              selectedQuestionId === q.id && selectedSectionId === section.id && "bg-accent text-accent-foreground"
            )}
            onClick={() => {
              // Navigate to the page containing this section
              onSelectPage(pageId);
              onSelectSection(section.id);
              onSelectQuestion(q.id, null);
            }}
          >
            <HelpCircle className="h-4 w-4 text-muted-foreground shrink-0" />
            <span className="truncate text-sm flex-1">{highlightText(q.text) || 'Untitled Question'}</span>
            {questionHasAction(q) && (
              <Zap className="h-3 w-3 text-amber-500 shrink-0" />
            )}
          </div>
        ))}

        {/* Section Branches */}
        {filteredBranches.map((branch, idx) => (
          <div key={branch.id} className="ml-4">
            {renderBranchTree(branch, section.id, pageId, 0, idx === filteredBranches.length - 1, [])}
          </div>
        ))}
      </div>
    );
  };

  const renderPageTree = (page: Page): JSX.Element => {
    // Check if this page contains the selected item but isn't the active page tab
    const isPageInPath = selectedPageId === page.id;
    const isPageActive = activePageId === page.id;
    const hasSelectedDescendant = isPageInPath && (selectedSectionId || selectedQuestionId || selectedBranchId);

    // Filter sections based on search
    const filteredSections = searchQuery.trim()
      ? page.sections.filter(s => sectionMatchesSearch(s))
      : page.sections;
    
    return (
      <div key={page.id}>
        <div
          className={cn(
            "flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer transition-colors border",
            isPageActive
              ? "bg-primary/10 border-primary text-primary"
              : hasSelectedDescendant
                ? "bg-primary/5 border-primary/40 text-primary/80"
                : "border-transparent hover:bg-accent"
          )}
          onClick={() => onSelectPage(page.id)}
        >
          <File className={cn("h-4 w-4 shrink-0", isPageActive || hasSelectedDescendant ? "text-primary" : "text-muted-foreground")} />
          <span className="truncate text-sm font-medium">{highlightText(page.name) || 'Untitled Page'}</span>
        </div>

        {filteredSections.map(section => renderSectionTree(section, page.id))}
      </div>
    );
  };

  return (
    <div className="h-full overflow-hidden flex flex-col bg-card">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h2 className="font-semibold text-sm text-foreground">Questionnaire Tree</h2>
        {questionnaire && (
          <Button
            variant="ghost"
            size="sm"
            className="h-7 text-xs text-muted-foreground hover:text-destructive"
            onClick={onReset}
          >
            <RotateCcw className="h-3 w-3 mr-1" />
            Reset
          </Button>
        )}
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2">
          {questionnaire ? (
            <div className="space-y-1">
              {/* Questionnaire Header */}
              <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-primary/10">
                <FileText className="h-4 w-4 text-primary shrink-0" />
                <span className="truncate text-sm font-semibold text-primary">
                  {questionnaire.name || 'Untitled Questionnaire'}
                </span>
              </div>

              {/* Collapsible Questionnaire Details */}
              <Collapsible open={detailsOpen} onOpenChange={setDetailsOpen}>
                <CollapsibleTrigger asChild>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer hover:bg-accent transition-colors">
                    <Settings className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span className="text-sm font-medium flex-1">Details</span>
                    {detailsOpen ? (
                      <ChevronUp className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="overflow-hidden">
                  <div className="px-2 py-2 overflow-hidden min-w-0 w-full">
                    {/* Entire Details Section in a Box */}
                    <div className="border border-border rounded-lg p-3 bg-muted/30 space-y-3 overflow-hidden min-w-0 w-full">
                      <div className="space-y-1 min-w-0">
                        <Label className="text-xs text-muted-foreground">Name</Label>
                        <Input
                          placeholder="Questionnaire name"
                          value={questionnaire.name}
                          onChange={(e) => onUpdateQuestionnaire({ ...questionnaire, name: e.target.value })}
                          className="h-7 text-xs w-full min-w-0"
                        />
                      </div>

                      <div className="space-y-1 min-w-0">
                        <Label className="text-xs text-muted-foreground">Description</Label>
                        <AutoResizeTextarea
                          placeholder="Description"
                          value={questionnaire.description}
                          onChange={(e) => onUpdateQuestionnaire({ ...questionnaire, description: e.target.value })}
                          className="text-xs w-full min-w-0 min-h-[28px] py-1.5"
                          minRows={1}
                          maxRows={5}
                        />
                      </div>

                      <div className="space-y-1 min-w-0">
                        <Label className="text-xs text-muted-foreground">Service Catalog</Label>
                        <Select
                          value={questionnaire.serviceCatalog}
                          onValueChange={(value) => onUpdateQuestionnaire({ ...questionnaire, serviceCatalog: value })}
                        >
                          <SelectTrigger className="h-7 text-xs w-full min-w-0">
                            <SelectValue placeholder="Select catalog" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Catalog A">Catalog A</SelectItem>
                            <SelectItem value="Catalog B">Catalog B</SelectItem>
                            <SelectItem value="Catalog C">Catalog C</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-1 min-w-0">
                        <Label className="text-xs text-muted-foreground">Status</Label>
                        <Select
                          value={questionnaire.status}
                          onValueChange={(value) => onUpdateQuestionnaire({ ...questionnaire, status: value })}
                        >
                          <SelectTrigger className="h-7 text-xs w-full min-w-0">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Draft">Draft</SelectItem>
                            <SelectItem value="Active">Active</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <Button 
                        size="sm" 
                        className="w-full h-7 text-xs"
                        onClick={onPublish}
                        disabled={!questionnaire?.name}
                        title={!questionnaire?.name ? "Please add a name before publishing" : "Publish questionnaire"}
                      >
                        Publish
                      </Button>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>

              {/* Search Box */}
              <div className="relative mt-2">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                <Input
                  placeholder="Search tree..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-8 text-xs pl-8 pr-8"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>

              {/* Pages Tree */}
              <div className="mt-2 space-y-0.5">
                {filteredPages.length > 0 ? (
                  filteredPages.map(page => renderPageTree(page))
                ) : searchQuery ? (
                  <div className="text-xs text-muted-foreground text-center py-4">
                    No results found for "{searchQuery}"
                  </div>
                ) : (
                  questionnaire.pages.map(page => renderPageTree(page))
                )}
              </div>
            </div>
          ) : (
            <div className="p-4">
              <Button
                onClick={onCreateQuestionnaire}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Questionnaire
              </Button>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default Sidebar;
