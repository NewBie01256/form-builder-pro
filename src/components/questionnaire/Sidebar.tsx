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
import { Plus, FileText, GitBranch, HelpCircle, RotateCcw, ChevronDown, ChevronUp, Settings, Zap, Layers, File } from "lucide-react";
import { Question, ConditionalBranch, Questionnaire, Page, Section } from "@/types/questionnaire";
import { cn } from "@/lib/utils";
import { useState } from "react";

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
            <span className="truncate text-sm font-medium">{branch.name || 'Untitled Branch'}</span>
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
                  <span className="truncate text-sm flex-1">{child.item.text || 'Untitled Question'}</span>
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
          <span className="truncate text-sm font-medium">{section.name || 'Untitled Section'}</span>
        </div>

        {/* Section Questions */}
        {section.questions.map(q => (
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
            <span className="truncate text-sm flex-1">{q.text || 'Untitled Question'}</span>
            {questionHasAction(q) && (
              <Zap className="h-3 w-3 text-amber-500 shrink-0" />
            )}
          </div>
        ))}

        {/* Section Branches */}
        {section.branches.map((branch, idx) => (
          <div key={branch.id} className="ml-4">
            {renderBranchTree(branch, section.id, pageId, 0, idx === section.branches.length - 1, [])}
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
          <span className="truncate text-sm font-medium">{page.name || 'Untitled Page'}</span>
        </div>

        {page.sections.map(section => renderSectionTree(section, page.id))}
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

              {/* Pages Tree */}
              <div className="mt-2 space-y-0.5">
                {questionnaire.pages.map(page => renderPageTree(page))}
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
