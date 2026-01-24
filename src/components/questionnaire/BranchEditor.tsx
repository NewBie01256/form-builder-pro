import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, GitBranch, HelpCircle, Trash2 } from "lucide-react";
import { ConditionalBranch, Question } from "@/types/questionnaire";
import RuleGroupEditor from "./RuleGroupEditor";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";

interface BranchEditorProps {
  branch: ConditionalBranch;
  allQuestions: Question[];
  selectedQuestionId: string | null;
  onUpdateBranch: (id: string, updated: Partial<ConditionalBranch>) => void;
  onAddQuestion: (branchId: string) => void;
  onAddChildBranch: (parentId: string) => void;
  onSelectQuestion: (questionId: string) => void;
  onDeleteQuestion?: (questionId: string) => void;
  onDeleteBranch?: (branchId: string) => void;
  questionEditor?: ReactNode;
}

const BranchEditor = ({
  branch,
  allQuestions,
  selectedQuestionId,
  onUpdateBranch,
  onAddQuestion,
  onAddChildBranch,
  onSelectQuestion,
  onDeleteQuestion,
  onDeleteBranch,
  questionEditor,
}: BranchEditorProps) => {
  return (
    <Card className="border-dashed-custom">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <GitBranch className="h-5 w-5 text-primary" />
            Conditional Branch Details
          </CardTitle>
          {onDeleteBranch && (
            <ConfirmDialog
              trigger={
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete Branch
                </Button>
              }
              title="Delete Branch"
              description={`Are you sure you want to delete "${branch.name || 'Untitled Branch'}"? This will also delete all questions and child branches within it. This action cannot be undone.`}
              onConfirm={() => onDeleteBranch(branch.id)}
            />
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="branch-name">Branch Name</Label>
          <Input
            id="branch-name"
            placeholder="Enter branch name"
            value={branch.name}
            onChange={(e) => onUpdateBranch(branch.id, { name: e.target.value })}
          />
        </div>

        <div className="space-y-4">
          <Label className="text-base font-semibold">Branch Conditions</Label>
          <RuleGroupEditor
            group={branch.conditionGroup || branch.ruleGroup}
            allQuestions={allQuestions}
            onUpdate={(updated) => onUpdateBranch(branch.id, { conditionGroup: updated })}
          />
        </div>

        <div className="flex gap-3">
          <Button variant="outline" onClick={() => onAddQuestion(branch.id)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Question under this Branch
          </Button>
          <Button variant="outline" onClick={() => onAddChildBranch(branch.id)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Conditional Branch
          </Button>
        </div>

        {branch.questions.length > 0 && (
          <div className="space-y-3">
            <Label className="text-base font-semibold">Questions in this Branch</Label>
            <div className="flex gap-4">
              {/* Left panel - Question list (20%) */}
              <div className="w-[20%] min-w-[180px] space-y-2">
                {branch.questions.map(q => (
                  <div
                    key={q.id}
                    className={cn(
                      "flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-colors",
                      "hover:bg-accent hover:border-accent",
                      selectedQuestionId === q.id 
                        ? "bg-accent border-primary" 
                        : "bg-card border-border"
                    )}
                    onClick={() => onSelectQuestion(q.id)}
                  >
                    <HelpCircle className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <span className="text-sm flex-1 truncate">{q.text || 'Untitled Question'}</span>
                    {onDeleteQuestion && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive flex-shrink-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteQuestion(q.id);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              {/* Right panel - Question details (80%) */}
              <div className="w-[80%] flex-1">
                {questionEditor ? (
                  questionEditor
                ) : (
                  <div className="flex items-center justify-center h-32 border border-dashed border-border rounded-lg bg-muted/20">
                    <p className="text-sm text-muted-foreground">Select a question to view details</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BranchEditor;
