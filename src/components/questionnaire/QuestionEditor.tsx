import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, HelpCircle } from "lucide-react";
import { Question, AnswerSet, AnswerLevelRuleGroup } from "@/types/questionnaire";
import AnswerSetEditor from "./AnswerSetEditor";
import AnswerLevelRuleGroupEditor from "./AnswerLevelRuleGroupEditor";

interface QuestionEditorProps {
  question: Question;
  allQuestions: Question[];
  onUpdate: (id: string, updated: Partial<Question>) => void;
}

const hasAnswerLevelRule = (group: AnswerLevelRuleGroup): boolean => {
  for (const child of group.children) {
    if (child.type === 'answerRule') return true;
    if (child.type === 'group' && hasAnswerLevelRule(child)) return true;
  }
  return false;
};

const QuestionEditor = ({ question, allQuestions, onUpdate }: QuestionEditorProps) => {
  const addAnswerSet = () => {
    const newSet: AnswerSet = {
      id: `as-${Date.now()}`,
      name: '',
      tag: '',
      isDefault: false,
      answers: []
    };
    onUpdate(question.id, { answerSets: [...question.answerSets, newSet] });
  };

  return (
    <Card className="border-dashed-custom">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-primary" />
          Question Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="question-title">Question Title</Label>
            <Input
              id="question-title"
              placeholder="Enter your question"
              value={question.text}
              onChange={(e) => onUpdate(question.id, { text: e.target.value })}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Question Type</Label>
              <Select
                value={question.type}
                onValueChange={(value) => onUpdate(question.id, { type: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Choice">Choice</SelectItem>
                  <SelectItem value="Text">Text</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="required"
                  checked={question.required}
                  onCheckedChange={(checked) => onUpdate(question.id, { required: !!checked })}
                />
                <Label htmlFor="required" className="font-normal">
                  Required
                </Label>
              </div>
            </div>
          </div>
        </div>

        {/* Answer Sets Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-base font-semibold">Answer Sets</Label>
          </div>
          
          <div className="space-y-4">
            {question.answerSets.map(as => (
              <AnswerSetEditor
                key={as.id}
                answerSet={as}
                onUpdate={(updated) => {
                  const updatedSets = question.answerSets.map(s => 
                    s.id === as.id ? updated : s
                  );
                  onUpdate(question.id, { answerSets: updatedSets });
                }}
              />
            ))}
          </div>
        </div>

        {/* Answer-Level Conditional Branching */}
        <div className="space-y-4">
          <Label className="text-base font-semibold">Answer-Level Conditional Branching</Label>
          <AnswerLevelRuleGroupEditor
            group={question.answerLevelRuleGroup}
            allQuestions={allQuestions}
            onUpdate={(updated) => onUpdate(question.id, { answerLevelRuleGroup: updated })}
          />
        </div>

        {/* Add Answer Set Button */}
        <Button
          variant="outline"
          onClick={addAnswerSet}
          disabled={!hasAnswerLevelRule(question.answerLevelRuleGroup)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Answer Set
        </Button>
      </CardContent>
    </Card>
  );
};

export default QuestionEditor;
