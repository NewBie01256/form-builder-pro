import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, FileText, GitBranch, HelpCircle, RotateCcw } from "lucide-react";
import { Question, ConditionalBranch, Questionnaire, LayoutItem } from "@/types/questionnaire";
import { cn } from "@/lib/utils";

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
}: SidebarProps) => {
  const renderBranchTree = (branch: ConditionalBranch, depth: number = 0): JSX.Element => (
    <div key={branch.id} className="relative">
      <div
        className={cn(
          "flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer transition-colors",
          "hover:bg-accent",
          selectedBranchId === branch.id && !selectedQuestionId && "bg-accent text-accent-foreground"
        )}
        style={{ paddingLeft: `${12 + depth * 16}px` }}
        onClick={() => onSelectBranch(branch.id)}
      >
        <GitBranch className="h-4 w-4 text-muted-foreground shrink-0" />
        <span className="truncate text-sm font-medium">{branch.name || 'Untitled Branch'}</span>
      </div>
      {branch.questions.map(q => (
        <div
          key={q.id}
          className={cn(
            "flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer transition-colors",
            "hover:bg-accent",
            selectedQuestionId === q.id && "bg-accent text-accent-foreground"
          )}
          style={{ paddingLeft: `${28 + depth * 16}px` }}
          onClick={() => onSelectQuestion(q.id, branch.id)}
        >
          <HelpCircle className="h-4 w-4 text-muted-foreground shrink-0" />
          <span className="truncate text-sm">{q.text || 'Untitled Question'}</span>
        </div>
      ))}
      {branch.childBranches.map(cb => renderBranchTree(cb, depth + 1))}
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
              <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-primary/10">
                <FileText className="h-4 w-4 text-primary shrink-0" />
                <span className="truncate text-sm font-semibold text-primary">
                  {questionnaire.name || 'Untitled Questionnaire'}
                </span>
              </div>
              
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
