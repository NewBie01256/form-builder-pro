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
import { HelpCircle, Plus, X, GitBranch, Trash2 } from "lucide-react";
import { Question, AnswerLevelRuleGroup } from "@/types/questionnaire";
import AnswerSetEditor from "./AnswerSetEditor";
import AnswerLevelRuleGroupEditor from "./AnswerLevelRuleGroupEditor";
import { cn } from "@/lib/utils";

interface QuestionEditorProps {
  question: Question;
  allQuestions: Question[];
  onUpdate: (id: string, updated: Partial<Question>) => void;
}

const QuestionEditor = ({ question, allQuestions, onUpdate }: QuestionEditorProps) => {
  const [selectedBranchingId, setSelectedBranchingId] = useState<string | null>(
    question.answerLevelRuleGroups.length > 0 ? question.answerLevelRuleGroups[0].id : null
  );

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
    setSelectedBranchingId(newGroup.id);
  };

  const handleRemoveAnswerLevelBranching = (groupId: string) => {
    const newGroups = question.answerLevelRuleGroups.filter(g => g.id !== groupId);
    onUpdate(question.id, { answerLevelRuleGroups: newGroups });
    
    // Update selection
    if (selectedBranchingId === groupId) {
      setSelectedBranchingId(newGroups.length > 0 ? newGroups[0].id : null);
    }
  };

  const handleUpdateAnswerLevelGroup = (groupId: string, updated: AnswerLevelRuleGroup) => {
    onUpdate(question.id, { 
      answerLevelRuleGroups: question.answerLevelRuleGroups.map(g => 
        g.id === groupId ? updated : g
      ) 
    });
  };

  const selectedBranching = question.answerLevelRuleGroups.find(g => g.id === selectedBranchingId);

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
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleAddAnswerLevelBranching}
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Branching
            </Button>
          </div>
          
          {question.answerLevelRuleGroups.length > 0 ? (
            <div className="flex gap-4">
              {/* Left panel - Branching list (20%) */}
              <div className="w-[20%] min-w-[160px] space-y-2">
                {question.answerLevelRuleGroups.map((group, index) => (
                  <div
                    key={group.id}
                    className={cn(
                      "flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-colors",
                      "hover:bg-accent hover:border-accent",
                      selectedBranchingId === group.id 
                        ? "bg-accent border-primary" 
                        : "bg-card border-border"
                    )}
                    onClick={() => setSelectedBranchingId(group.id)}
                  >
                    <GitBranch className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <span className="text-sm flex-1 truncate">
                      {group.inlineAnswerSet?.name || `Branching #${index + 1}`}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive flex-shrink-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveAnswerLevelBranching(group.id);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>

              {/* Right panel - Branching details (80%) */}
              <div className="w-[80%] flex-1">
                {selectedBranching ? (
                  <AnswerLevelRuleGroupEditor
                    group={selectedBranching}
                    allQuestions={allQuestions}
                    currentQuestion={question}
                    onUpdate={(updated) => handleUpdateAnswerLevelGroup(selectedBranching.id, updated)}
                  />
                ) : (
                  <div className="flex items-center justify-center h-32 border border-dashed border-border rounded-lg bg-muted/20">
                    <p className="text-sm text-muted-foreground">Select a branching to view details</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-24 border border-dashed border-border rounded-lg bg-muted/20">
              <p className="text-sm text-muted-foreground">No conditional branching configured</p>
            </div>
          )}
        </div>

      </CardContent>
    </Card>
  );
};

export default QuestionEditor;
