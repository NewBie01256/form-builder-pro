import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Plus, Library, Zap, Database, Table2, ArrowUpDown, Filter, Pencil } from "lucide-react";
import { AnswerSet, Answer, QuestionType } from "@/types/questionnaire";
import ActionRecordEditor from "./ActionRecordEditor";
import DynamicValuesPanel, { DynamicValueConfig, DynamicValueFilterGroup } from "./DynamicValuesPanel";

interface AnswerSetEditorProps {
  answerSet: AnswerSet;
  onUpdate: (updated: AnswerSet) => void;
  onAddFromExisting?: () => void;
  questionType?: QuestionType;
}

const AnswerSetEditor = ({ answerSet, onUpdate, onAddFromExisting, questionType = 'Choice' }: AnswerSetEditorProps) => {
  const [showDynamicPanel, setShowDynamicPanel] = useState(false);
  
  // Use answerSet's stored values instead of local state
  const dynamicValues = answerSet.dynamicValues ?? false;
  const dynamicConfig = answerSet.dynamicConfig;
  
  // Types that don't need the full answer set UI
  const isSimpleType = ['Text', 'Number', 'Date', 'Rating', 'Boolean'].includes(questionType);
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
    onUpdate({
      ...answerSet,
      answers: answerSet.answers.map(a => a.id === answerId ? { ...a, ...updated } : a)
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
      case 'Number': return 'Default Number Value';
      case 'Date': return 'Default Date Value';
      case 'Rating': return 'Default Rating Value';
      case 'Boolean': return 'Default Boolean Value';
      default: return 'Default Value';
    }
  };

  const getSimpleTypePlaceholder = () => {
    switch (questionType) {
      case 'Text': return 'Enter default text response (optional)';
      case 'Number': return 'Enter default number (optional)';
      case 'Date': return 'Select default date (optional)';
      case 'Rating': return 'Enter default rating (optional)';
      default: return 'Enter default value (optional)';
    }
  };

  // Helper to count total filters in a group (including nested)
  const countFilters = (group: DynamicValueFilterGroup): number => {
    return group.children.reduce((count, child) => {
      if (child.type === 'filter') return count + 1;
      return count + countFilters(child);
    }, 0);
  };

  // For simple types, show a minimal UI
  if (isSimpleType) {
    return (
      <div className="border border-border rounded-lg p-4 bg-muted/30">
        <div className="space-y-2">
          <Label className="text-sm font-medium">{getSimpleTypeLabel()}</Label>
          {questionType === 'Text' ? (
            <Textarea
              placeholder={getSimpleTypePlaceholder()}
              value={simpleAnswer.value}
              onChange={(e) => updateSimpleAnswer(e.target.value, 'Text Response')}
              className="min-h-[80px]"
            />
          ) : questionType === 'Number' ? (
            <Input
              type="number"
              placeholder={getSimpleTypePlaceholder()}
              value={simpleAnswer.value}
              onChange={(e) => updateSimpleAnswer(e.target.value, 'Number Response')}
            />
          ) : questionType === 'Date' ? (
            <Input
              type="date"
              value={simpleAnswer.value}
              onChange={(e) => updateSimpleAnswer(e.target.value, 'Date Response')}
            />
          ) : questionType === 'Rating' ? (
            <Input
              type="number"
              placeholder={getSimpleTypePlaceholder()}
              value={simpleAnswer.value}
              onChange={(e) => updateSimpleAnswer(e.target.value, 'Rating Response')}
            />
          ) : questionType === 'Boolean' ? (
            <div className="flex items-center gap-3">
              <Switch
                id={`boolean-${answerSet.id}`}
                checked={simpleAnswer.value === 'true'}
                onCheckedChange={(checked) => updateSimpleAnswer(checked ? 'true' : 'false', checked ? 'Yes' : 'No')}
              />
              <Label htmlFor={`boolean-${answerSet.id}`} className="text-sm font-normal">
                {simpleAnswer.value === 'true' ? 'Yes (True)' : 'No (False)'}
              </Label>
            </div>
          ) : null}
        </div>
      </div>
    );
  }

  // For Choice and MultiSelect types, show the full answer set UI
  return (
    <div className="border border-border rounded-lg p-4 bg-muted/30">
      <div className="flex items-center justify-between mb-3">
        <Label className="text-sm font-medium">
          Answer Set {questionType === 'MultiSelect' && <span className="text-muted-foreground">(Multiple selections allowed)</span>}
        </Label>
        <div className="flex items-center gap-3">
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
          {isChoiceType && (
            <div className="flex items-center gap-2">
              <Switch
                id={`dynamic-${answerSet.id}`}
                checked={dynamicValues}
                onCheckedChange={(checked) => {
                  onUpdate({ ...answerSet, dynamicValues: checked });
                  if (checked) {
                    setShowDynamicPanel(true);
                  }
                }}
              />
              <Label htmlFor={`dynamic-${answerSet.id}`} className="text-sm font-normal cursor-pointer">
                Dynamic Values
              </Label>
              {dynamicValues && dynamicConfig?.tableName && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 px-2 text-xs"
                  onClick={() => setShowDynamicPanel(true)}
                >
                  <Database className="h-3 w-3 mr-1" />
                  {dynamicConfig.tableName}
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
      
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

      {/* Answers Section - Show Dynamic Config Summary OR Regular Answers */}
      <div className="mt-4">
        {dynamicValues && dynamicConfig?.tableName ? (
          // Dynamic Values Summary Card
          <div className="border border-border rounded-lg bg-background">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30">
              <div className="flex items-center gap-2">
                <Database className="h-4 w-4 text-primary" />
                <Label className="text-sm font-medium">Dynamic Values</Label>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-7 text-xs"
                onClick={() => setShowDynamicPanel(true)}
              >
                <Pencil className="h-3 w-3 mr-1" />
                Edit
              </Button>
            </div>
            
            <div className="p-4 space-y-3">
              {/* Table Name */}
              <div className="flex items-center gap-3">
                <Table2 className="h-4 w-4 text-muted-foreground shrink-0" />
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Table:</span>
                  <Badge variant="secondary" className="font-mono text-xs">
                    {dynamicConfig.tableName}
                  </Badge>
                </div>
              </div>

              {/* Field Mappings */}
              <div className="flex items-center gap-3">
                <div className="h-4 w-4 shrink-0" /> {/* Spacer for alignment */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
                  <span className="text-muted-foreground">
                    Label: <span className="font-medium text-foreground">{dynamicConfig.labelField}</span>
                  </span>
                  <span className="text-muted-foreground">
                    Value: <span className="font-medium text-foreground">{dynamicConfig.valueField}</span>
                  </span>
                </div>
              </div>

              {/* Filters Summary */}
              {dynamicConfig.filterGroup.children.length > 0 && (
                <div className="flex items-start gap-3">
                  <Filter className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                  <div className="flex flex-wrap items-center gap-1">
                    <span className="text-sm text-muted-foreground">Filters:</span>
                    <Badge variant="outline" className="text-xs">
                      {countFilters(dynamicConfig.filterGroup)} condition{countFilters(dynamicConfig.filterGroup) !== 1 ? 's' : ''}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      ({dynamicConfig.filterGroup.matchType})
                    </span>
                  </div>
                </div>
              )}

              {/* Ordering */}
              {dynamicConfig.orderByField && (
                <div className="flex items-center gap-3">
                  <ArrowUpDown className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span className="text-sm text-muted-foreground">
                    Order by: <span className="font-medium text-foreground">{dynamicConfig.orderByField}</span>
                    <span className="text-xs ml-1">({dynamicConfig.orderDirection === 'asc' ? 'A → Z' : 'Z → A'})</span>
                  </span>
                </div>
              )}
            </div>
          </div>
        ) : (
          // Regular Static Answers
          <>
            <div className="flex items-center justify-between mb-2">
              <Label className="text-sm">Answers</Label>
              <Button variant="ghost" size="sm" onClick={addAnswer}>
                <Plus className="h-4 w-4 mr-1" />
                Add Answer
              </Button>
            </div>

            {questionType === 'RadioButton' ? (
              // Radio Button Display
              <div className="space-y-2">
                <RadioGroup className="space-y-2">
                  {answerSet.answers.map(ans => (
                    <div key={ans.id} className="flex items-center gap-3 p-3 bg-background rounded-md border border-border">
                      <RadioGroupItem value={ans.value} id={`radio-preview-${ans.id}`} disabled />
                      <div className="flex-1 grid grid-cols-2 gap-2">
                        <Input
                          placeholder="Label"
                          value={ans.label}
                          onChange={(e) => updateAnswer(ans.id, { label: e.target.value })}
                          className="h-8"
                        />
                        <Input
                          placeholder="Value"
                          value={ans.value}
                          onChange={(e) => updateAnswer(ans.id, { value: e.target.value })}
                          className="h-8"
                        />
                      </div>
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
                      {ans.actionRecord && (
                        <Zap className="h-4 w-4 text-amber-500 shrink-0" />
                      )}
                      <ActionRecordEditor
                        actionRecord={ans.actionRecord}
                        onUpdate={(actionRecord) => updateAnswer(ans.id, { actionRecord })}
                      />
                    </div>
                  ))}
                </RadioGroup>
              </div>
            ) : (
              // Regular List Display for Choice/MultiSelect
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
                    {ans.actionRecord && (
                      <Zap className="h-4 w-4 text-amber-500 shrink-0" />
                    )}
                    <ActionRecordEditor
                      actionRecord={ans.actionRecord}
                      onUpdate={(actionRecord) => updateAnswer(ans.id, { actionRecord })}
                    />
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Dynamic Values Panel */}
      <DynamicValuesPanel
        isOpen={showDynamicPanel}
        onClose={() => setShowDynamicPanel(false)}
        config={dynamicConfig}
        onSave={(config) => {
          onUpdate({ ...answerSet, dynamicConfig: config, dynamicValues: true });
        }}
      />
    </div>
  );
};

export default AnswerSetEditor;
