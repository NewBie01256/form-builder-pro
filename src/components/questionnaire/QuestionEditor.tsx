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
  const handleAddAnswerLevelBranching = () => {
    const newGroup: AnswerLevelRuleGroup = {
      type: 'group',
      id: `ag-${Date.now()}`,
      matchType: 'AND',
      children: [],
      inlineAnswerSet: {
        id: `as-inline-${Date.now()}`,
        name: '',
        tag: '',
        isDefault: false,
        answers: [
          {
            id: `ans-${Date.now()}`,
            label: '',
            value: '',
            active: true
          }
        ]
      }
    };
    onUpdate(question.id, { 
      answerLevelRuleGroups: [...question.answerLevelRuleGroups, newGroup] 
    });
  };

  const handleRemoveAnswerLevelBranching = (groupId: string) => {
    onUpdate(question.id, { 
      answerLevelRuleGroups: question.answerLevelRuleGroups.filter(g => g.id !== groupId) 
    });
  };

  const handleUpdateAnswerLevelGroup = (groupId: string, updated: AnswerLevelRuleGroup) => {
    onUpdate(question.id, { 
      answerLevelRuleGroups: question.answerLevelRuleGroups.map(g => 
        g.id === groupId ? updated : g
      ) 
    });
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
          
          {question.answerLevelRuleGroups.map((group, index) => (
            <div key={group.id} className="relative">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-muted-foreground">
                  Branching #{index + 1}
                </span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-7 text-xs text-destructive hover:text-destructive"
                  onClick={() => handleRemoveAnswerLevelBranching(group.id)}
                >
                  <X className="h-3 w-3 mr-1" />
                  Remove
                </Button>
              </div>
              <AnswerLevelRuleGroupEditor
                group={group}
                allQuestions={allQuestions}
                onUpdate={(updated) => handleUpdateAnswerLevelGroup(group.id, updated)}
              />
            </div>
          ))}

          <Button 
            variant="outline" 
            className="w-full h-10 border-dashed"
            onClick={handleAddAnswerLevelBranching}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Answer-Level Conditional Branching
          </Button>
        </div>

      </CardContent>
    </Card>
  );
};

export default QuestionEditor;