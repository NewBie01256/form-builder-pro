import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";
import { AnswerSet, Answer } from "@/types/questionnaire";

interface AnswerSetEditorProps {
  answerSet: AnswerSet;
  onUpdate: (updated: AnswerSet) => void;
}

const AnswerSetEditor = ({ answerSet, onUpdate }: AnswerSetEditorProps) => {
  const addAnswer = () => {
    const newAnswer: Answer = {
      id: `ans-${Date.now()}`,
      label: '',
      value: '',
      active: true
    };
    onUpdate({ ...answerSet, answers: [...answerSet.answers, newAnswer] });
  };

  const updateAnswer = (answerId: string, updated: Partial<Answer>) => {
    onUpdate({
      ...answerSet,
      answers: answerSet.answers.map(a => a.id === answerId ? { ...a, ...updated } : a)
    });
  };

  return (
    <div className="border border-border rounded-lg p-4 bg-muted/30">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Set Name</Label>
          <Input
            placeholder="Answer Set Name"
            value={answerSet.name}
            onChange={(e) => onUpdate({ ...answerSet, name: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label>Tag</Label>
          <Input
            placeholder="Tag"
            value={answerSet.tag}
            onChange={(e) => onUpdate({ ...answerSet, tag: e.target.value })}
          />
        </div>
      </div>

      <div className="flex items-center space-x-2 mt-3">
        <Checkbox
          id={`default-${answerSet.id}`}
          checked={answerSet.isDefault}
          onCheckedChange={(checked) => onUpdate({ ...answerSet, isDefault: !!checked })}
        />
        <Label htmlFor={`default-${answerSet.id}`} className="text-sm font-normal">
          Is Default
        </Label>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between mb-2">
          <Label className="text-sm">Answers</Label>
          <Button variant="ghost" size="sm" onClick={addAnswer}>
            <Plus className="h-4 w-4 mr-1" />
            Add Answer
          </Button>
        </div>

        <div className="space-y-2">
          {answerSet.answers.map(ans => (
            <div key={ans.id} className="flex items-center gap-2 p-2 bg-background rounded-md border border-border">
              <Input
                placeholder="Label"
                value={ans.label}
                onChange={(e) => updateAnswer(ans.id, { label: e.target.value })}
                className="flex-1 h-8"
              />
              <Input
                placeholder="Value"
                value={ans.value}
                onChange={(e) => updateAnswer(ans.id, { value: e.target.value })}
                className="flex-1 h-8"
              />
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`active-${ans.id}`}
                  checked={ans.active}
                  onCheckedChange={(checked) => updateAnswer(ans.id, { active: !!checked })}
                />
                <Label htmlFor={`active-${ans.id}`} className="text-xs font-normal whitespace-nowrap">
                  Active
                </Label>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnswerSetEditor;
