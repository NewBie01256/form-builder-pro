import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, GitBranch, HelpCircle } from "lucide-react";
import { ConditionalBranch, Question } from "@/types/questionnaire";
import RuleGroupEditor from "./RuleGroupEditor";
import { cn } from "@/lib/utils";

interface BranchEditorProps {
  branch: ConditionalBranch;
  allQuestions: Question[];
  selectedQuestionId: string | null;
  onUpdateBranch: (id: string, updated: Partial<ConditionalBranch>) => void;
  onAddQuestion: (branchId: string) => void;
  onAddChildBranch: (parentId: string) => void;
  onSelectQuestion: (questionId: string) => void;
}

const BranchEditor = ({
  branch,
  allQuestions,
  selectedQuestionId,
  onUpdateBranch,
  onAddQuestion,
  onAddChildBranch,
  onSelectQuestion,
}: BranchEditorProps) => {
  return (
    <Card className="border-dashed-custom">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg flex items-center gap-2">
          <GitBranch className="h-5 w-5 text-primary" />
          Conditional Branch Details
        </CardTitle>
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
          <Label className="text-base font-semibold">Branch Rules (Question-Level)</Label>
          <RuleGroupEditor
            group={branch.ruleGroup}
            allQuestions={allQuestions}
            onUpdate={(updated) => onUpdateBranch(branch.id, { ruleGroup: updated })}
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
            <div className="space-y-2">
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
                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{q.text || 'Untitled Question'}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BranchEditor;
