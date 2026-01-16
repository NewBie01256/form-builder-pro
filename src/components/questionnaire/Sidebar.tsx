import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
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
import { Plus, FileText, GitBranch, HelpCircle, RotateCcw, ChevronDown, ChevronUp, Settings } from "lucide-react";
import { Question, ConditionalBranch, Questionnaire, LayoutItem } from "@/types/questionnaire";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface SidebarProps {
  questionnaire: Questionnaire | null;
  questions: Question[];
  branches: ConditionalBranch[];
  layoutOrder: LayoutItem[];
  selectedQuestionId: string | null;
  selectedBranchId: string | null;
  onCreateQuestionnaire: () => void;
  onSelectQuestion: (id: string, branchId: string | null) => void;
  onSelectBranch: (id: string) => void;
  onReset: () => void;
  onUpdateQuestionnaire: (updated: Questionnaire) => void;
}

const Sidebar = ({
  questionnaire,
  questions,
  branches,
  layoutOrder,
  selectedQuestionId,
  selectedBranchId,
  onCreateQuestionnaire,
  onSelectQuestion,
  onSelectBranch,
  onReset,
  onUpdateQuestionnaire,
}: SidebarProps) => {
  const [detailsOpen, setDetailsOpen] = useState(true);

  const renderBranchTree = (branch: ConditionalBranch, depth: number = 0, isLast: boolean = true, parentLines: boolean[] = []): JSX.Element => {
    const allItems = [
      ...branch.questions.map(q => ({ type: 'question' as const, item: q })),
      ...branch.childBranches.map(cb => ({ type: 'branch' as const, item: cb }))
    ];
    
    return (
      <div key={branch.id} className="relative">
        {/* Branch header row */}
        <div className="flex items-stretch">
          {/* Tree lines column */}
          <div className="flex" style={{ width: `${depth * 20}px` }}>
            {parentLines.map((showLine, i) => (
              <div key={i} className="w-5 relative">
                {showLine && <div className="absolute left-2 top-0 bottom-0 w-px bg-border" />}
              </div>
            ))}
          </div>
          
          {/* Connector for this item */}
          {depth > 0 && (
            <div className="w-5 relative flex items-center">
              <div className={cn("absolute left-2 w-px bg-border", isLast ? "top-0 h-1/2" : "top-0 bottom-0")} />
              <div className="absolute left-2 top-1/2 w-3 h-px bg-border" />
            </div>
          )}
          
          {/* Branch item */}
          <div
            className={cn(
              "flex-1 flex items-center gap-2 px-2 py-2 rounded-md cursor-pointer transition-colors",
              "hover:bg-accent",
              selectedBranchId === branch.id && !selectedQuestionId && "bg-accent text-accent-foreground"
            )}
            onClick={() => onSelectBranch(branch.id)}
          >
            <GitBranch className="h-4 w-4 text-muted-foreground shrink-0" />
            <span className="truncate text-sm font-medium">{branch.name || 'Untitled Branch'}</span>
          </div>
        </div>
        
        {/* Children */}
        {allItems.map((child, index) => {
          const isChildLast = index === allItems.length - 1;
          const newParentLines = [...parentLines, !isLast];
          
          if (child.type === 'question') {
            return (
              <div key={child.item.id} className="flex items-stretch">
                {/* Tree lines column */}
                <div className="flex" style={{ width: `${(depth + 1) * 20}px` }}>
                  {[...parentLines, !isLast].map((showLine, i) => (
                    <div key={i} className="w-5 relative">
                      {showLine && <div className="absolute left-2 top-0 bottom-0 w-px bg-border" />}
                    </div>
                  ))}
                </div>
                
                {/* Connector */}
                <div className="w-5 relative flex items-center">
                  <div className={cn("absolute left-2 w-px bg-border", isChildLast ? "top-0 h-1/2" : "top-0 bottom-0")} />
                  <div className="absolute left-2 top-1/2 w-3 h-px bg-border" />
                </div>
                
                {/* Question item */}
                <div
                  className={cn(
                    "flex-1 flex items-center gap-2 px-2 py-2 rounded-md cursor-pointer transition-colors",
                    "hover:bg-accent",
                    selectedQuestionId === child.item.id && "bg-accent text-accent-foreground"
                  )}
                  onClick={() => onSelectQuestion(child.item.id, branch.id)}
                >
                  <HelpCircle className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span className="truncate text-sm">{child.item.text || 'Untitled Question'}</span>
                </div>
              </div>
            );
          } else {
            return renderBranchTree(child.item, depth + 1, isChildLast, newParentLines);
          }
        })}
      </div>
    );

  return (
    <div className="w-[30%] min-w-[250px] max-w-[400px] border-r border-border h-full flex flex-col bg-card">
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
                <CollapsibleContent>
                  <div className="px-3 py-2 space-y-3">
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Name</Label>
                      <Input
                        placeholder="Questionnaire name"
                        value={questionnaire.name}
                        onChange={(e) => onUpdateQuestionnaire({ ...questionnaire, name: e.target.value })}
                        className="h-8 text-sm"
                      />
                    </div>
                    
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Description</Label>
                      <Input
                        placeholder="Description"
                        value={questionnaire.description}
                        onChange={(e) => onUpdateQuestionnaire({ ...questionnaire, description: e.target.value })}
                        className="h-8 text-sm"
                      />
                    </div>

                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Service Catalog</Label>
                      <Select
                        value={questionnaire.serviceCatalog}
                        onValueChange={(value) => onUpdateQuestionnaire({ ...questionnaire, serviceCatalog: value })}
                      >
                        <SelectTrigger className="h-8 text-sm">
                          <SelectValue placeholder="Select catalog" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Catalog A">Catalog A</SelectItem>
                          <SelectItem value="Catalog B">Catalog B</SelectItem>
                          <SelectItem value="Catalog C">Catalog C</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="space-y-1 flex-1">
                        <Label className="text-xs text-muted-foreground">Status</Label>
                        <Select
                          value={questionnaire.status}
                          onValueChange={(value) => onUpdateQuestionnaire({ ...questionnaire, status: value })}
                        >
                          <SelectTrigger className="h-8 text-sm">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Draft">Draft</SelectItem>
                            <SelectItem value="Active">Active</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button size="sm" className="mt-5 h-8 text-xs">
                        Publish
                      </Button>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
              
              {/* Tree Items */}
              <div className="mt-2 space-y-0.5">
                {layoutOrder.map(item => {
                  if (item.type === 'question') {
                    const q = questions.find(q => q.id === item.id);
                    return q ? (
                      <div
                        key={q.id}
                        className={cn(
                          "flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer transition-colors",
                          "hover:bg-accent",
                          selectedQuestionId === q.id && "bg-accent text-accent-foreground"
                        )}
                        style={{ paddingLeft: '28px' }}
                        onClick={() => onSelectQuestion(q.id, null)}
                      >
                        <HelpCircle className="h-4 w-4 text-muted-foreground shrink-0" />
                        <span className="truncate text-sm">{q.text || 'Untitled Question'}</span>
                      </div>
                    ) : null;
                  } else {
                    const b = branches.find(br => br.id === item.id);
                    return b ? renderBranchTree(b) : null;
                  }
                })}
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