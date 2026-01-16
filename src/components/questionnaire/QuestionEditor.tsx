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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { HelpCircle, Plus, GitBranch, Trash2, Library } from "lucide-react";
import { Question, AnswerLevelRuleGroup, AnswerSet } from "@/types/questionnaire";
import AnswerSetEditor from "./AnswerSetEditor";
import AnswerLevelRuleGroupEditor from "./AnswerLevelRuleGroupEditor";
import AnswerSetPickerDialog from "./AnswerSetPickerDialog";
import { cn } from "@/lib/utils";

interface QuestionEditorProps {
  question: Question;
  allQuestions: Question[];
  onUpdate: (id: string, updated: Partial<Question>) => void;
  onDelete?: (questionId: string) => void;
}

const QuestionEditor = ({ question, allQuestions, onUpdate, onDelete }: QuestionEditorProps) => {
  const [selectedBranchingId, setSelectedBranchingId] = useState<string | null>(
    question.answerLevelRuleGroups.length > 0 ? question.answerLevelRuleGroups[0].id : null
  );
  const [showAnswerSetPicker, setShowAnswerSetPicker] = useState(false);
  const [pickerTargetAnswerSetId, setPickerTargetAnswerSetId] = useState<string | null>(null);
  const [pickerTargetBranchingId, setPickerTargetBranchingId] = useState<string | null>(null);

  const handleOpenPickerForAnswerSet = (answerSetId: string) => {
    setPickerTargetAnswerSetId(answerSetId);
    setPickerTargetBranchingId(null);
    setShowAnswerSetPicker(true);
  };

  const handleOpenPickerForBranching = (branchingId: string) => {
    setPickerTargetAnswerSetId(null);
    setPickerTargetBranchingId(branchingId);
    setShowAnswerSetPicker(true);
  };

  const handleSelectFromExisting = (answerSet: AnswerSet) => {
    if (pickerTargetAnswerSetId) {
      // Update existing answer set in the main Answer Sets section
      const updatedSets = question.answerSets.map(s => 
        s.id === pickerTargetAnswerSetId 
          ? { ...answerSet, id: s.id } // Keep original ID, replace content
          : s
      );
      onUpdate(question.id, { answerSets: updatedSets });
    } else if (pickerTargetBranchingId) {
      // Update inline answer set in the branching section
      const updatedGroups = question.answerLevelRuleGroups.map(g => 
        g.id === pickerTargetBranchingId 
          ? { 
              ...g, 
              inlineAnswerSet: { 
                ...answerSet, 
                id: g.inlineAnswerSet?.id || answerSet.id 
              } 
            }
          : g
      );
      onUpdate(question.id, { answerLevelRuleGroups: updatedGroups });
    }
    setPickerTargetAnswerSetId(null);
    setPickerTargetBranchingId(null);
  };

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
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-primary" />
            Question Details
          </CardTitle>
          {onDelete && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete Question
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Question</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete "{question.text || 'Untitled Question'}"? 
                    This will also delete all answer sets and conditional branching rules. 
                    This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    onClick={() => onDelete(question.id)}
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
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
                onValueChange={(value) => onUpdate(question.id, { type: value as any })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Choice">Choice (Single Select)</SelectItem>
                  <SelectItem value="MultiSelect">Multi-Select</SelectItem>
                  <SelectItem value="Text">Text</SelectItem>
                  <SelectItem value="Number">Number</SelectItem>
                  <SelectItem value="Date">Date</SelectItem>
                  <SelectItem value="Rating">Rating</SelectItem>
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

          {/* Number Configuration */}
          {question.type === 'Number' && (
            <div className="border border-border rounded-lg p-4 bg-muted/30 space-y-4">
              <Label className="text-sm font-semibold">Number Configuration</Label>
              <div className="grid gap-4 sm:grid-cols-4">
                <div className="space-y-2">
                  <Label className="text-xs">Min Value</Label>
                  <Input
                    type="number"
                    placeholder="No min"
                    value={question.numberConfig?.min ?? ''}
                    onChange={(e) => onUpdate(question.id, { 
                      numberConfig: { 
                        ...question.numberConfig, 
                        min: e.target.value ? Number(e.target.value) : undefined 
                      } 
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs">Max Value</Label>
                  <Input
                    type="number"
                    placeholder="No max"
                    value={question.numberConfig?.max ?? ''}
                    onChange={(e) => onUpdate(question.id, { 
                      numberConfig: { 
                        ...question.numberConfig, 
                        max: e.target.value ? Number(e.target.value) : undefined 
                      } 
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs">Step</Label>
                  <Input
                    type="number"
                    placeholder="1"
                    value={question.numberConfig?.step ?? ''}
                    onChange={(e) => onUpdate(question.id, { 
                      numberConfig: { 
                        ...question.numberConfig, 
                        step: e.target.value ? Number(e.target.value) : undefined 
                      } 
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs">Default Value</Label>
                  <Input
                    type="number"
                    placeholder="None"
                    value={question.numberConfig?.defaultValue ?? ''}
                    onChange={(e) => onUpdate(question.id, { 
                      numberConfig: { 
                        ...question.numberConfig, 
                        defaultValue: e.target.value ? Number(e.target.value) : undefined 
                      } 
                    })}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Date Configuration */}
          {question.type === 'Date' && (
            <div className="border border-border rounded-lg p-4 bg-muted/30 space-y-4">
              <Label className="text-sm font-semibold">Date Configuration</Label>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label className="text-xs">Min Date</Label>
                  <Input
                    type="date"
                    value={question.dateConfig?.minDate ?? ''}
                    onChange={(e) => onUpdate(question.id, { 
                      dateConfig: { 
                        ...question.dateConfig, 
                        minDate: e.target.value || undefined 
                      } 
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs">Max Date</Label>
                  <Input
                    type="date"
                    value={question.dateConfig?.maxDate ?? ''}
                    onChange={(e) => onUpdate(question.id, { 
                      dateConfig: { 
                        ...question.dateConfig, 
                        maxDate: e.target.value || undefined 
                      } 
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs">Default Date</Label>
                  <Input
                    type="date"
                    value={question.dateConfig?.defaultValue ?? ''}
                    onChange={(e) => onUpdate(question.id, { 
                      dateConfig: { 
                        ...question.dateConfig, 
                        defaultValue: e.target.value || undefined 
                      } 
                    })}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Rating Configuration */}
          {question.type === 'Rating' && (
            <div className="border border-border rounded-lg p-4 bg-muted/30 space-y-4">
              <Label className="text-sm font-semibold">Rating Configuration</Label>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label className="text-xs">Min Value</Label>
                  <Input
                    type="number"
                    min="0"
                    value={question.ratingConfig?.minValue ?? 1}
                    onChange={(e) => onUpdate(question.id, { 
                      ratingConfig: { 
                        ...question.ratingConfig,
                        minValue: Number(e.target.value) || 1,
                        maxValue: question.ratingConfig?.maxValue ?? 5
                      } 
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs">Max Value</Label>
                  <Input
                    type="number"
                    min="1"
                    value={question.ratingConfig?.maxValue ?? 5}
                    onChange={(e) => onUpdate(question.id, { 
                      ratingConfig: { 
                        ...question.ratingConfig,
                        minValue: question.ratingConfig?.minValue ?? 1,
                        maxValue: Number(e.target.value) || 5
                      } 
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs">Min Label (optional)</Label>
                  <Input
                    placeholder="e.g., Poor"
                    value={question.ratingConfig?.minLabel ?? ''}
                    onChange={(e) => onUpdate(question.id, { 
                      ratingConfig: { 
                        ...question.ratingConfig,
                        minValue: question.ratingConfig?.minValue ?? 1,
                        maxValue: question.ratingConfig?.maxValue ?? 5,
                        minLabel: e.target.value || undefined
                      } 
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs">Max Label (optional)</Label>
                  <Input
                    placeholder="e.g., Excellent"
                    value={question.ratingConfig?.maxLabel ?? ''}
                    onChange={(e) => onUpdate(question.id, { 
                      ratingConfig: { 
                        ...question.ratingConfig,
                        minValue: question.ratingConfig?.minValue ?? 1,
                        maxValue: question.ratingConfig?.maxValue ?? 5,
                        maxLabel: e.target.value || undefined
                      } 
                    })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-xs">Default Value (optional)</Label>
                <Input
                  type="number"
                  placeholder="None"
                  min={question.ratingConfig?.minValue ?? 1}
                  max={question.ratingConfig?.maxValue ?? 5}
                  value={question.ratingConfig?.defaultValue ?? ''}
                  onChange={(e) => onUpdate(question.id, { 
                    ratingConfig: { 
                      ...question.ratingConfig,
                      minValue: question.ratingConfig?.minValue ?? 1,
                      maxValue: question.ratingConfig?.maxValue ?? 5,
                      defaultValue: e.target.value ? Number(e.target.value) : undefined
                    } 
                  })}
                />
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <Label className="text-base font-semibold">Answer Sets</Label>
          
          <div className="space-y-4">
            {question.answerSets.map(as => (
              <AnswerSetEditor
                key={as.id}
                answerSet={as}
                questionType={question.type}
                onUpdate={(updated) => {
                  const updatedSets = question.answerSets.map(s => 
                    s.id === as.id ? updated : s
                  );
                  onUpdate(question.id, { answerSets: updatedSets });
                }}
                onAddFromExisting={() => handleOpenPickerForAnswerSet(as.id)}
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
              Add Answer Set
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
                      {group.inlineAnswerSet?.name || 'Untitled Answer Set'}
                    </span>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive flex-shrink-0"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Answer Set</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete "{group.inlineAnswerSet?.name || 'Untitled Answer Set'}"? 
                            This will also delete all associated branching rules. 
                            This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            onClick={() => handleRemoveAnswerLevelBranching(group.id)}
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
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
                    onAddFromExisting={() => handleOpenPickerForBranching(selectedBranching.id)}
                    questionType={question.type}
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

        <AnswerSetPickerDialog
          open={showAnswerSetPicker}
          onOpenChange={(open) => {
            setShowAnswerSetPicker(open);
            if (!open) {
              setPickerTargetAnswerSetId(null);
              setPickerTargetBranchingId(null);
            }
          }}
          onSelect={handleSelectFromExisting}
        />
      </CardContent>
    </Card>
  );
};

export default QuestionEditor;
