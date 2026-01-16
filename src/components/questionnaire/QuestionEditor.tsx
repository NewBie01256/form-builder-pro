import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { HelpCircle, Plus, X } from "lucide-react";
import { Question, AnswerLevelRuleGroup } from "@/types/questionnaire";
import AnswerSetEditor from "./AnswerSetEditor";
import AnswerLevelRuleGroupEditor from "./AnswerLevelRuleGroupEditor";

interface QuestionEditorProps {
  question: Question;
  allQuestions: Question[];
  onUpdate: (id: string, updated: Partial<Question>) => void;
}

const QuestionEditor = ({ question, allQuestions, onUpdate }: QuestionEditorProps) => {
  // Check if there's existing answer-level branching content
  const hasAnswerLevelContent = question.answerLevelRuleGroup.children.length > 0;
  const [showAnswerLevelBranching, setShowAnswerLevelBranching] = useState(hasAnswerLevelContent);

  const handleAddAnswerLevelBranching = () => {
    setShowAnswerLevelBranching(true);
  };

  const handleRemoveAnswerLevelBranching = () => {
    // Reset the answer level rule group to empty
    const emptyGroup: AnswerLevelRuleGroup = {
      type: 'group',
      id: `ag-${Date.now()}`,
      matchType: 'AND',
      children: []
    };
    onUpdate(question.id, { answerLevelRuleGroup: emptyGroup });
    setShowAnswerLevelBranching(false);
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
          <div className="flex items-center justify-between">
            <Label className="text-base font-semibold">Answer-Level Conditional Branching</Label>
            {showAnswerLevelBranching && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 text-destructive hover:text-destructive"
                onClick={handleRemoveAnswerLevelBranching}
              >
                <X className="h-4 w-4 mr-1" />
                Remove
              </Button>
            )}
          </div>
          
          {showAnswerLevelBranching ? (
            <AnswerLevelRuleGroupEditor
              group={question.answerLevelRuleGroup}
              allQuestions={allQuestions}
              onUpdate={(updated) => onUpdate(question.id, { answerLevelRuleGroup: updated })}
            />
          ) : (
            <Button 
              variant="outline" 
              className="w-full h-10 border-dashed"
              onClick={handleAddAnswerLevelBranching}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Answer-Level Conditional Branching
            </Button>
          )}
        </div>

      </CardContent>
    </Card>
  );
};

export default QuestionEditor;
