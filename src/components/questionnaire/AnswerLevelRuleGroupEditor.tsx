import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, ChevronDown, ChevronUp, Trash2, Library, Zap, FileUp } from "lucide-react";
import { AnswerLevelRuleGroup, AnswerLevelRule, Question, AnswerSet, Answer, AnswerLevelOperator, QuestionType } from "@/types/questionnaire";
import ActionRecordEditor from "./ActionRecordEditor";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface AnswerLevelRuleGroupEditorProps {
  group: AnswerLevelRuleGroup;
  allQuestions: Question[];
  currentQuestion: Question;
  onUpdate: (updated: AnswerLevelRuleGroup) => void;
  isRoot?: boolean;
  onDelete?: () => void;
  onAddFromExisting?: () => void;
  questionType?: QuestionType;
}

interface InlineAnswerSetEditorProps {
  answerSet: AnswerSet;
  onUpdate: (updated: AnswerSet) => void;
  onAddFromExisting?: () => void;
  questionType?: QuestionType;
}

const InlineAnswerSetEditor = ({ answerSet, onUpdate, onAddFromExisting, questionType = 'Choice' }: InlineAnswerSetEditorProps) => {
  // Types that don't need the full answer set UI
  const isSimpleType = ['Text', 'TextArea', 'Number', 'Decimal', 'Date', 'Rating', 'Boolean', 'Document'].includes(questionType);
  // Types that use the choice-based answer set UI
  const isChoiceType = ['Choice', 'MultiSelect', 'RadioButton'].includes(questionType);

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
    // For Choice type, only one answer can be active at a time
    if (updated.active === true && questionType === 'Choice') {
      onUpdate({
        ...answerSet,
        answers: answerSet.answers.map(a => 
          a.id === answerId 
            ? { ...a, ...updated } 
            : { ...a, active: false }
        )
      });
    } else {
      onUpdate({
        ...answerSet,
        answers: answerSet.answers.map(a => a.id === answerId ? { ...a, ...updated } : a)
      });
    }
  };

  const removeAnswer = (answerId: string) => {
    onUpdate({
      ...answerSet,
      answers: answerSet.answers.filter(a => a.id !== answerId)
    });
  };

  // For simple types, ensure there's always exactly one answer
  const simpleAnswer = answerSet.answers[0] || { id: `ans-${Date.now()}`, label: '', value: '', active: true };

  const updateSimpleAnswer = (value: string, label: string) => {
    if (answerSet.answers.length === 0) {
      onUpdate({ 
        ...answerSet, 
        answers: [{ id: `ans-${Date.now()}`, label, value, active: true }] 
      });
    } else {
      onUpdate({
        ...answerSet,
        answers: [{ ...answerSet.answers[0], value, label }]
      });
    }
  };

  const getSimpleTypeLabel = () => {
    switch (questionType) {
      case 'Text': return 'Default Text Answer';
      case 'TextArea': return 'Default Text Area Content';
      case 'Number': return 'Default Number Value';
      case 'Decimal': return 'Default Decimal Value';
      case 'Date': return 'Default Date Value';
      case 'Rating': return 'Default Rating Value';
      case 'Boolean': return 'Default Boolean Value';
      case 'Document': return 'Document Upload Configuration';
      default: return 'Default Value';
    }
  };

  // For simple types, show a minimal UI
  if (isSimpleType) {
    return (
      <div className="border border-primary/30 rounded-lg p-4 bg-primary/5 mt-3">
        <div className="space-y-3">
          <Label className="text-sm font-semibold text-primary">{getSimpleTypeLabel()}</Label>
          {questionType === 'Text' ? (
            <Textarea
              placeholder="Enter default text response (optional)"
              value={simpleAnswer.value}
              onChange={(e) => updateSimpleAnswer(e.target.value, 'Text Response')}
              className="min-h-[80px]"
            />
          ) : questionType === 'TextArea' ? (
            <div className="space-y-3">
              <Textarea
                placeholder="Enter default text area content (optional)"
                value={simpleAnswer.value}
                onChange={(e) => updateSimpleAnswer(e.target.value, 'Text Area Response')}
                className="min-h-[120px]"
              />
              <div className="flex items-center gap-2">
                <Label className="text-xs text-muted-foreground">Format</Label>
                <select
                  value={answerSet.textAreaFormat || 'plain'}
                  onChange={(e) => onUpdate({ ...answerSet, textAreaFormat: e.target.value as 'plain' | 'rich' })}
                  className="h-7 px-2 text-xs border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer"
                >
                  <option value="plain">Plain Text</option>
                  <option value="rich">Rich Text</option>
                </select>
              </div>
            </div>
          ) : questionType === 'Number' ? (
            <div className="space-y-3">
              <Input
                type="number"
                placeholder="Enter default number (optional)"
                value={simpleAnswer.value}
                onChange={(e) => updateSimpleAnswer(e.target.value, 'Number Response')}
                className="h-8"
              />
              <div className="flex items-center gap-2">
                <Switch
                  id={`inline-number-restriction-${answerSet.id}`}
                  checked={answerSet.numberRestriction ?? false}
                  onCheckedChange={(checked) => onUpdate({ ...answerSet, numberRestriction: checked })}
                />
                <Label htmlFor={`inline-number-restriction-${answerSet.id}`} className="text-xs text-muted-foreground cursor-pointer">
                  Restriction
                </Label>
              </div>
              {answerSet.numberRestriction && (
                <div className="grid grid-cols-2 gap-3 pl-1">
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Min Value</Label>
                    <Input
                      type="number"
                      placeholder="No min"
                      value={answerSet.minValue ?? ''}
                      onChange={(e) => onUpdate({ ...answerSet, minValue: e.target.value ? Number(e.target.value) : undefined })}
                      className="h-8 text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Max Value</Label>
                    <Input
                      type="number"
                      placeholder="No max"
                      value={answerSet.maxValue ?? ''}
                      onChange={(e) => onUpdate({ ...answerSet, maxValue: e.target.value ? Number(e.target.value) : undefined })}
                      className="h-8 text-sm"
                    />
                  </div>
                </div>
              )}
            </div>
          ) : questionType === 'Decimal' ? (
            <div className="space-y-3">
              <Input
                type="number"
                step="0.01"
                placeholder="Enter default decimal (optional)"
                value={simpleAnswer.value}
                onChange={(e) => updateSimpleAnswer(e.target.value, 'Decimal Response')}
                className="h-8"
              />
              <div className="flex items-center gap-2">
                <Switch
                  id={`inline-decimal-restriction-${answerSet.id}`}
                  checked={answerSet.numberRestriction ?? false}
                  onCheckedChange={(checked) => onUpdate({ ...answerSet, numberRestriction: checked })}
                />
                <Label htmlFor={`inline-decimal-restriction-${answerSet.id}`} className="text-xs text-muted-foreground cursor-pointer">
                  Restriction
                </Label>
              </div>
              {answerSet.numberRestriction && (
                <div className="grid grid-cols-2 gap-3 pl-1">
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Min Value</Label>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="No min"
                      value={answerSet.minValue ?? ''}
                      onChange={(e) => onUpdate({ ...answerSet, minValue: e.target.value ? Number(e.target.value) : undefined })}
                      className="h-8 text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Max Value</Label>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="No max"
                      value={answerSet.maxValue ?? ''}
                      onChange={(e) => onUpdate({ ...answerSet, maxValue: e.target.value ? Number(e.target.value) : undefined })}
                      className="h-8 text-sm"
                    />
                  </div>
                </div>
              )}
            </div>
          ) : questionType === 'Date' ? (
            <div className="space-y-3">
              <div className={`grid gap-3 ${answerSet.includeTime ? 'grid-cols-2' : 'grid-cols-1'}`}>
                <Input
                  type="date"
                  value={simpleAnswer.value?.split('T')[0] || simpleAnswer.value || ''}
                  onChange={(e) => {
                    const dateValue = e.target.value;
                    const timeValue = simpleAnswer.value?.split('T')[1] || '';
                    const newValue = answerSet.includeTime && timeValue 
                      ? `${dateValue}T${timeValue}` 
                      : dateValue;
                    updateSimpleAnswer(newValue, 'Date Response');
                  }}
                  className="h-8"
                />
                {answerSet.includeTime && (
                  <Input
                    type="time"
                    value={simpleAnswer.value?.split('T')[1] || ''}
                    onChange={(e) => {
                      const timeValue = e.target.value;
                      const dateValue = simpleAnswer.value?.split('T')[0] || simpleAnswer.value || '';
                      const newValue = dateValue ? `${dateValue}T${timeValue}` : timeValue;
                      updateSimpleAnswer(newValue, 'Date Response');
                    }}
                    className="h-8"
                  />
                )}
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Switch
                    id={`inline-date-restriction-${answerSet.id}`}
                    checked={answerSet.dateRestriction ?? false}
                    onCheckedChange={(checked) => onUpdate({ ...answerSet, dateRestriction: checked })}
                  />
                  <Label htmlFor={`inline-date-restriction-${answerSet.id}`} className="text-xs text-muted-foreground cursor-pointer">
                    Date Restriction
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    id={`inline-include-time-${answerSet.id}`}
                    checked={answerSet.includeTime ?? false}
                    onCheckedChange={(checked) => onUpdate({ ...answerSet, includeTime: checked })}
                  />
                  <Label htmlFor={`inline-include-time-${answerSet.id}`} className="text-xs text-muted-foreground cursor-pointer">
                    Time
                  </Label>
                </div>
              </div>
              {answerSet.dateRestriction && (
                <div className="grid grid-cols-2 gap-3 pl-1">
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Min Date</Label>
                    <Input
                      type="date"
                      value={answerSet.minDate ?? ''}
                      onChange={(e) => onUpdate({ ...answerSet, minDate: e.target.value })}
                      className="h-8 text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Max Date</Label>
                    <Input
                      type="date"
                      value={answerSet.maxDate ?? ''}
                      onChange={(e) => onUpdate({ ...answerSet, maxDate: e.target.value })}
                      className="h-8 text-sm"
                    />
                  </div>
                </div>
              )}
            </div>
          ) : questionType === 'Rating' ? (
            <div className="space-y-3">
              <Input
                type="number"
                placeholder="Enter default rating (optional)"
                min={answerSet.ratingMinValue ?? 1}
                max={answerSet.ratingMaxValue ?? 5}
                value={simpleAnswer.value}
                onChange={(e) => updateSimpleAnswer(e.target.value, 'Rating Response')}
                className="h-8"
              />
              <div className="flex items-center gap-2 mb-2">
                <Label className="text-xs text-muted-foreground">Display Style</Label>
                <select
                  value={answerSet.ratingDisplayStyle ?? 'numbers'}
                  onChange={(e) => onUpdate({ ...answerSet, ratingDisplayStyle: e.target.value as 'numbers' | 'stars' | 'smileys' | 'hearts' | 'thumbs' })}
                  className="h-7 px-2 text-xs border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer"
                >
                  <option value="numbers">Numbers (1, 2, 3...)</option>
                  <option value="stars">Stars (★)</option>
                  <option value="smileys">Smileys (😊)</option>
                  <option value="hearts">Hearts (❤️)</option>
                  <option value="thumbs">Thumbs (👍)</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">Min Value</Label>
                  <Input
                    type="number"
                    min="0"
                    value={answerSet.ratingMinValue ?? 1}
                    onChange={(e) => onUpdate({ ...answerSet, ratingMinValue: Number(e.target.value) || 1 })}
                    className="h-8 text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">Max Value</Label>
                  <Input
                    type="number"
                    min="1"
                    value={answerSet.ratingMaxValue ?? 5}
                    onChange={(e) => onUpdate({ ...answerSet, ratingMaxValue: Number(e.target.value) || 5 })}
                    className="h-8 text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">Min Label (optional)</Label>
                  <Input
                    placeholder="e.g., Poor"
                    value={answerSet.ratingMinLabel ?? ''}
                    onChange={(e) => onUpdate({ ...answerSet, ratingMinLabel: e.target.value || undefined })}
                    className="h-8 text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">Max Label (optional)</Label>
                  <Input
                    placeholder="e.g., Excellent"
                    value={answerSet.ratingMaxLabel ?? ''}
                    onChange={(e) => onUpdate({ ...answerSet, ratingMaxLabel: e.target.value || undefined })}
                    className="h-8 text-sm"
                  />
                </div>
              </div>
            </div>
          ) : questionType === 'Boolean' ? (
            <div className="flex items-center gap-3">
              <Switch
                id={`inline-boolean-${answerSet.id}`}
                checked={simpleAnswer.value === 'true'}
                onCheckedChange={(checked) => updateSimpleAnswer(checked ? 'true' : 'false', checked ? 'Yes' : 'No')}
              />
              <Label htmlFor={`inline-boolean-${answerSet.id}`} className="text-sm font-normal">
                {simpleAnswer.value === 'true' ? 'Yes (True)' : 'No (False)'}
              </Label>
            </div>
          ) : questionType === 'Document' ? (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <FileUp className="h-4 w-4 text-muted-foreground" />
                <Label className="text-xs text-muted-foreground">Document Upload Configuration</Label>
              </div>
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Allowed File Types</Label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { value: 'pdf', label: 'PDF' },
                    { value: 'doc', label: 'Word' },
                    { value: 'xls', label: 'Excel' },
                    { value: 'ppt', label: 'PowerPoint' },
                    { value: 'txt', label: 'Text' },
                    { value: 'image', label: 'Images' },
                  ].map((fileType) => (
                    <div key={fileType.value} className="flex items-center gap-2">
                      <Checkbox
                        id={`inline-file-type-${answerSet.id}-${fileType.value}`}
                        checked={(answerSet.allowedFileTypes ?? ['pdf', 'doc', 'xls', 'ppt', 'txt', 'image']).includes(fileType.value)}
                        onCheckedChange={(checked) => {
                          const current = answerSet.allowedFileTypes ?? ['pdf', 'doc', 'xls', 'ppt', 'txt', 'image'];
                          const updated = checked 
                            ? [...current, fileType.value]
                            : current.filter(t => t !== fileType.value);
                          onUpdate({ ...answerSet, allowedFileTypes: updated });
                        }}
                      />
                      <Label htmlFor={`inline-file-type-${answerSet.id}-${fileType.value}`} className="text-xs cursor-pointer">
                        {fileType.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Max File Size (MB)</Label>
                <Input
                  type="number"
                  min="1"
                  max="100"
                  placeholder="10"
                  value={answerSet.maxFileSize ?? 10}
                  onChange={(e) => onUpdate({ ...answerSet, maxFileSize: Number(e.target.value) || 10 })}
                  className="h-7 w-24 text-xs"
                />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  }

  // For Choice and MultiSelect types, show the full answer set UI
  return (
    <div className="border border-primary/30 rounded-lg p-4 bg-primary/5 mt-3">
      <div className="flex items-center justify-between mb-3">
        <Label className="text-sm font-semibold text-primary">
          Answer Set for this Rule {questionType === 'MultiSelect' && <span className="text-primary/70">(Multi-Select)</span>}
        </Label>
        {onAddFromExisting && (
          <Button 
            variant="outline" 
            size="sm"
            onClick={onAddFromExisting}
          >
            <Library className="h-4 w-4 mr-1" />
            Add from Existing
          </Button>
        )}
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-2">
          <Label className="text-xs">Set Name</Label>
          <Input
            placeholder="Answer Set Name"
            value={answerSet.name}
            onChange={(e) => onUpdate({ ...answerSet, name: e.target.value })}
            className="h-8"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-xs">Tag</Label>
          <Input
            placeholder="Tag"
            value={answerSet.tag}
            onChange={(e) => onUpdate({ ...answerSet, tag: e.target.value })}
            className="h-8"
          />
        </div>
      </div>

      <div className="flex items-center space-x-2 mt-3">
        <Checkbox
          id={`default-${answerSet.id}`}
          checked={answerSet.isDefault}
          onCheckedChange={(checked) => onUpdate({ ...answerSet, isDefault: !!checked })}
        />
        <Label htmlFor={`default-${answerSet.id}`} className="text-xs font-normal">
          Is Default
        </Label>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between mb-2">
          <Label className="text-xs font-medium">Answers</Label>
          <Button variant="ghost" size="sm" onClick={addAnswer} className="h-7 text-xs">
            <Plus className="h-3 w-3 mr-1" />
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
                className="flex-1 h-7 text-sm"
              />
              <Input
                placeholder="Value"
                value={ans.value}
                onChange={(e) => updateAnswer(ans.id, { value: e.target.value })}
                className="flex-1 h-7 text-sm"
              />
              <div className="flex items-center space-x-1">
                <Checkbox
                  id={`active-${ans.id}`}
                  checked={ans.active}
                  onCheckedChange={(checked) => updateAnswer(ans.id, { active: !!checked })}
                />
                <Label htmlFor={`active-${ans.id}`} className="text-xs font-normal">
                  Active
                </Label>
              </div>
              {ans.actionRecord && (
                <Zap className="h-3.5 w-3.5 text-amber-500 shrink-0" />
              )}
              <ActionRecordEditor
                actionRecord={ans.actionRecord}
                onUpdate={(actionRecord) => updateAnswer(ans.id, { actionRecord })}
              />
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => removeAnswer(ans.id)}
                className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const AnswerLevelRuleGroupEditor = ({ group, allQuestions, currentQuestion, onUpdate, isRoot = true, onDelete, onAddFromExisting, questionType = 'Choice' }: AnswerLevelRuleGroupEditorProps) => {
  const [answerSetExpanded, setAnswerSetExpanded] = useState(!!group.inlineAnswerSet);
  const isTextType = questionType === 'Text';

  // Filter to only show previous questions (order less than current question)
  const previousQuestions = allQuestions.filter(q => q.order < currentQuestion.order);

  const updateGroup = (partial: Partial<AnswerLevelRuleGroup>) => {
    onUpdate({ ...group, ...partial });
  };

  const updateChild = (index: number, updatedChild: AnswerLevelRuleGroup | AnswerLevelRule) => {
    const newChildren = [...group.children];
    newChildren[index] = updatedChild;
    updateGroup({ children: newChildren });
  };

  const deleteChild = (index: number) => {
    const newChildren = group.children.filter((_, i) => i !== index);
    updateGroup({ children: newChildren });
  };

  const addGroup = () => {
    const newGroup: AnswerLevelRuleGroup = {
      type: 'group',
      id: `ag-${Date.now()}`,
      matchType: 'AND',
      children: []
    };
    updateGroup({ children: [...group.children, newGroup] });
  };

  const addRule = () => {
    const newRule: AnswerLevelRule = {
      type: 'answerRule',
      id: `ar-${Date.now()}`,
      previousQuestionId: '',
      previousAnswerSetId: '',
      operator: 'equals',
      previousAnswerId: '',
      selectedAnswerSetId: ''
    };
    updateGroup({ children: [...group.children, newRule] });
  };

  const operatorOptions: { value: AnswerLevelOperator; label: string }[] = [
    { value: 'equals', label: 'Equals' },
    { value: 'not_equals', label: 'Not Equals' },
    { value: 'greater_than', label: 'Greater Than' },
    { value: 'less_than', label: 'Less Than' },
    { value: 'contains', label: 'Contains' },
    { value: 'not_contains', label: 'Not Contains' },
    { value: 'starts_with', label: 'Starts With' },
    { value: 'ends_with', label: 'Ends With' },
  ];

  // Get answer sets for selected question (including inline answer sets from answer-level rule groups)
  const getAnswerSetsForQuestion = (questionId: string) => {
    const question = allQuestions.find(q => q.id === questionId);
    if (!question) return [];
    
    // Start with the regular answer sets
    const allAnswerSets = [...question.answerSets];
    
    // Add inline answer sets from answer-level rule groups
    question.answerLevelRuleGroups?.forEach(ruleGroup => {
      if (ruleGroup.inlineAnswerSet) {
        allAnswerSets.push(ruleGroup.inlineAnswerSet);
      }
    });
    
    return allAnswerSets;
  };

  // Get answers for selected answer set (including inline answer sets)
  const getAnswersForAnswerSet = (questionId: string, answerSetId: string) => {
    const question = allQuestions.find(q => q.id === questionId);
    if (!question || !answerSetId) return [];
    
    // First check regular answer sets
    let answerSet = question.answerSets.find(as => as.id === answerSetId);
    
    // If not found, check inline answer sets from answer-level rule groups
    if (!answerSet) {
      for (const ruleGroup of question.answerLevelRuleGroups || []) {
        if (ruleGroup.inlineAnswerSet?.id === answerSetId) {
          answerSet = ruleGroup.inlineAnswerSet;
          break;
        }
      }
    }
    
    return answerSet?.answers || [];
  };

  const allAnswers = allQuestions.flatMap(q => q.answerSets.flatMap(as => as.answers));
  const allAnswerSets = allQuestions.flatMap(q => q.answerSets);

  // Get inline answer sets from all groups in the tree
  const getInlineAnswerSets = (g: AnswerLevelRuleGroup): AnswerSet[] => {
    const sets: AnswerSet[] = [];
    if (g.inlineAnswerSet) sets.push(g.inlineAnswerSet);
    g.children.forEach(child => {
      if (child.type === 'group') {
        sets.push(...getInlineAnswerSets(child));
      }
    });
    return sets;
  };

  return (
    <div className="border border-border bg-card">
      {/* Header Row with AND/OR and Column Labels */}
      <div className="flex items-center border-b border-border bg-muted/30">
        <div className="flex items-center gap-2 px-3 py-2 min-w-[80px] border-r border-border">
          <Select
            value={group.matchType}
            onValueChange={(value: 'AND' | 'OR') => updateGroup({ matchType: value })}
          >
            <SelectTrigger className="h-7 w-16 text-xs font-medium">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="AND">AND</SelectItem>
              <SelectItem value="OR">OR</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex-1 grid grid-cols-4 gap-2 px-3 py-2">
          <span className="text-xs font-medium text-muted-foreground">Select Question</span>
          <span className="text-xs font-medium text-muted-foreground">Answer Set</span>
          <span className="text-xs font-medium text-muted-foreground">Operator</span>
          <span className="text-xs font-medium text-muted-foreground">Answer</span>
        </div>
        <div className="w-10 px-2 flex items-center justify-center">
          {!isRoot && onDelete && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive"
              onClick={onDelete}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Rules and Nested Groups */}
      <div className="relative">
        {group.children.map((child, index) => (
          <div key={child.id} className="relative">
            {/* Tree connector lines */}
            <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />
            <div className="absolute left-4 top-1/2 w-4 h-px bg-border" />
            
            <div className="flex items-stretch border-b border-border last:border-b-0">
              {/* Left connector area */}
              <div className="w-8 flex items-center justify-center relative" />

              {child.type === 'group' ? (
                <div className="flex-1 py-2 pr-2">
                  <AnswerLevelRuleGroupEditor
                    group={child}
                    allQuestions={allQuestions}
                    currentQuestion={currentQuestion}
                    onUpdate={(updated) => updateChild(index, updated)}
                    isRoot={false}
                    onDelete={() => deleteChild(index)}
                  />
                </div>
              ) : (
                <>
                  {/* Rule Row */}
                  <div className="flex-1 grid grid-cols-4 gap-2 py-2 px-2">
                    <Select
                      value={child.previousQuestionId}
                      onValueChange={(value) => {
                        updateChild(index, { ...child, previousQuestionId: value, previousAnswerSetId: '', previousAnswerId: '' });
                      }}
                    >
                      <SelectTrigger className="h-8 text-sm">
                        <SelectValue placeholder="Select question" />
                      </SelectTrigger>
                      <SelectContent>
                        {previousQuestions.map(q => (
                          <SelectItem key={q.id} value={q.id}>
                            {q.text || 'Untitled Question'}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select
                      value={child.previousAnswerSetId || ''}
                      onValueChange={(value) => {
                        updateChild(index, { ...child, previousAnswerSetId: value, previousAnswerId: '' });
                      }}
                    >
                      <SelectTrigger className="h-8 text-sm">
                        <SelectValue placeholder="Select answer set" />
                      </SelectTrigger>
                      <SelectContent>
                        {getAnswerSetsForQuestion(child.previousQuestionId).map(as => (
                          <SelectItem key={as.id} value={as.id}>
                            {as.name || 'Untitled Answer Set'}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select
                      value={child.operator || 'equals'}
                      onValueChange={(value: AnswerLevelOperator) => {
                        updateChild(index, { ...child, operator: value });
                      }}
                    >
                      <SelectTrigger className="h-8 text-sm">
                        <SelectValue placeholder="Select operator" />
                      </SelectTrigger>
                      <SelectContent>
                        {operatorOptions.map(op => (
                          <SelectItem key={op.value} value={op.value}>
                            {op.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select
                      value={child.previousAnswerId}
                      onValueChange={(value) => {
                        updateChild(index, { ...child, previousAnswerId: value });
                      }}
                    >
                      <SelectTrigger className="h-8 text-sm">
                        <SelectValue placeholder="Select answer" />
                      </SelectTrigger>
                      <SelectContent>
                        {getAnswersForAnswerSet(child.previousQuestionId, child.previousAnswerSetId || '').map(ans => (
                          <SelectItem key={ans.id} value={ans.id}>
                            {ans.label || 'Untitled Answer'}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Actions */}
                  <div className="w-10 flex items-center justify-center">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive"
                      onClick={() => deleteChild(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}

        {/* Add Button Row */}
        <div className="flex items-center border-t border-border">
          <div className="w-8 flex items-center justify-center relative">
            {group.children.length > 0 && (
              <>
                <div className="absolute left-4 top-0 h-1/2 w-px bg-border" />
                <div className="absolute left-4 top-1/2 w-4 h-px bg-border" />
              </>
            )}
          </div>
          <div className="py-2 px-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 text-xs">
                  <Plus className="h-3 w-3 mr-1" />
                  Add
                  <ChevronDown className="h-3 w-3 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem onClick={addRule}>
                  Add Rule
                </DropdownMenuItem>
                <DropdownMenuItem onClick={addGroup}>
                  Add Group
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Inline Answer Set Section - Only at Root Level */}
      {isRoot && group.inlineAnswerSet && (
        <Collapsible 
          open={answerSetExpanded} 
          onOpenChange={setAnswerSetExpanded}
          className="border-t border-border"
        >
          <div className="flex items-center justify-between px-3 py-2">
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="h-7 text-xs">
                {answerSetExpanded ? (
                  <ChevronUp className="h-3 w-3 mr-1" />
                ) : (
                  <ChevronDown className="h-3 w-3 mr-1" />
                )}
                {answerSetExpanded ? 'Hide' : 'Show'} {isTextType ? 'Default Text Answer' : 'Answer Set'}
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="px-3 pb-3">
            <InlineAnswerSetEditor
              answerSet={group.inlineAnswerSet}
              onUpdate={(updated) => {
                updateGroup({ inlineAnswerSet: updated });
              }}
              onAddFromExisting={onAddFromExisting}
              questionType={questionType}
            />
          </CollapsibleContent>
        </Collapsible>
      )}
    </div>
  );
};

export default AnswerLevelRuleGroupEditor;