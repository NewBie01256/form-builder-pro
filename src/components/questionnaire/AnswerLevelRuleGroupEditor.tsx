import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Layers, Filter, ChevronDown, ChevronUp, Trash2 } from "lucide-react";
import { AnswerLevelRuleGroup, AnswerLevelRule, Question, AnswerSet, Answer } from "@/types/questionnaire";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface AnswerLevelRuleGroupEditorProps {
  group: AnswerLevelRuleGroup;
  allQuestions: Question[];
  onUpdate: (updated: AnswerLevelRuleGroup) => void;
  isRoot?: boolean; // Only root level shows Answer Set button
}

interface InlineAnswerSetEditorProps {
  answerSet: AnswerSet;
  onUpdate: (updated: AnswerSet) => void;
}

const InlineAnswerSetEditor = ({ answerSet, onUpdate }: InlineAnswerSetEditorProps) => {
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

  const removeAnswer = (answerId: string) => {
    onUpdate({
      ...answerSet,
      answers: answerSet.answers.filter(a => a.id !== answerId)
    });
  };

  return (
    <div className="border border-primary/30 rounded-lg p-4 bg-primary/5 mt-3">
      <Label className="text-sm font-semibold text-primary">Answer Set for this Rule</Label>
      
      <div className="grid gap-3 sm:grid-cols-2 mt-3">
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

const AnswerLevelRuleGroupEditor = ({ group, allQuestions, onUpdate, isRoot = true }: AnswerLevelRuleGroupEditorProps) => {
  const [answerSetExpanded, setAnswerSetExpanded] = useState(!!group.inlineAnswerSet);

  const updateGroup = (partial: Partial<AnswerLevelRuleGroup>) => {
    onUpdate({ ...group, ...partial });
  };

  const updateChild = (index: number, updatedChild: AnswerLevelRuleGroup | AnswerLevelRule) => {
    const newChildren = [...group.children];
    newChildren[index] = updatedChild;
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
      previousAnswerId: '',
      selectedAnswerSetId: ''
    };
    updateGroup({ children: [...group.children, newRule] });
  };

  const createInlineAnswerSet = () => {
    const newAnswerSet: AnswerSet = {
      id: `as-inline-${Date.now()}`,
      name: '',
      tag: '',
      isDefault: false,
      answers: []
    };
    updateGroup({ inlineAnswerSet: newAnswerSet });
    setAnswerSetExpanded(true);
  };

  const removeInlineAnswerSet = () => {
    const { inlineAnswerSet, ...rest } = group;
    onUpdate(rest as AnswerLevelRuleGroup);
    setAnswerSetExpanded(false);
  };

  const allAnswers = allQuestions.flatMap(q => q.answerSets.flatMap(as => as.answers));
  const allAnswerSets = allQuestions.flatMap(q => q.answerSets);

  return (
    <div className="border border-border rounded-lg p-4 bg-card">
      <div className="flex items-center gap-3 mb-4">
        <Layers className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Answer-Level Group</span>
        <Select
          value={group.matchType}
          onValueChange={(value: 'AND' | 'OR') => updateGroup({ matchType: value })}
        >
          <SelectTrigger className="w-24 h-8">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="AND">AND</SelectItem>
            <SelectItem value="OR">OR</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        {group.children.map((child, index) => (
          <div key={child.id} className="ml-4 tree-line pl-4">
            {child.type === 'group' ? (
              <AnswerLevelRuleGroupEditor
                group={child}
                allQuestions={allQuestions}
                onUpdate={(updated) => updateChild(index, updated)}
                isRoot={false}
              />
            ) : (
              <div className="border border-border rounded-lg p-4 bg-muted/50">
                <div className="flex items-center gap-2 mb-3">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Answer-Level Rule</span>
                </div>
                
                <div className="grid gap-3 sm:grid-cols-3">
                  <Select
                    value={child.previousQuestionId}
                    onValueChange={(value) => {
                      updateChild(index, { ...child, previousQuestionId: value });
                    }}
                  >
                    <SelectTrigger className="h-9">
                      <SelectValue placeholder="Previous Question" />
                    </SelectTrigger>
                    <SelectContent>
                      {allQuestions.map(q => (
                        <SelectItem key={q.id} value={q.id}>
                          {q.text || 'Untitled Question'}
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
                    <SelectTrigger className="h-9">
                      <SelectValue placeholder="Previous Answer" />
                    </SelectTrigger>
                    <SelectContent>
                      {allAnswers.map(ans => (
                        <SelectItem key={ans.id} value={ans.id}>
                          {ans.label || 'Untitled Answer'}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select
                    value={child.selectedAnswerSetId}
                    onValueChange={(value) => {
                      updateChild(index, { ...child, selectedAnswerSetId: value });
                    }}
                  >
                    <SelectTrigger className="h-9">
                      <SelectValue placeholder="Select Answer Set" />
                    </SelectTrigger>
                    <SelectContent>
                      {allAnswerSets.map(as => (
                        <SelectItem key={as.id} value={as.id}>
                          {as.name || 'Untitled Answer Set'}
                        </SelectItem>
                      ))}
                      {group.inlineAnswerSet && (
                        <SelectItem value={group.inlineAnswerSet.id}>
                          {group.inlineAnswerSet.name || 'Inline Answer Set'}
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Inline Answer Set Section - Only at Root Level */}
      {isRoot && (
        group.inlineAnswerSet ? (
          <Collapsible 
            open={answerSetExpanded} 
            onOpenChange={setAnswerSetExpanded}
            className="mt-4"
          >
            <div className="flex items-center justify-between">
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm" className="h-7 text-xs">
                  {answerSetExpanded ? (
                    <ChevronUp className="h-3 w-3 mr-1" />
                  ) : (
                    <ChevronDown className="h-3 w-3 mr-1" />
                  )}
                  {answerSetExpanded ? 'Hide' : 'Show'} Answer Set
                </Button>
              </CollapsibleTrigger>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-7 text-xs text-destructive hover:text-destructive"
                onClick={removeInlineAnswerSet}
              >
                <Trash2 className="h-3 w-3 mr-1" />
                Remove Answer Set
              </Button>
            </div>
            <CollapsibleContent>
              <InlineAnswerSetEditor
                answerSet={group.inlineAnswerSet}
                onUpdate={(updated) => {
                  updateGroup({ inlineAnswerSet: updated });
                }}
              />
            </CollapsibleContent>
          </Collapsible>
        ) : (
          <Button 
            variant="outline" 
            size="sm" 
            className="mt-4 h-8"
            onClick={createInlineAnswerSet}
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Answer Set
          </Button>
        )
      )}

      <div className="flex gap-2 mt-4">
        <Button variant="outline" size="sm" onClick={addGroup}>
          <Plus className="h-4 w-4 mr-1" />
          Add Group
        </Button>
        <Button variant="outline" size="sm" onClick={addRule}>
          <Plus className="h-4 w-4 mr-1" />
          Add Answer-Level Rule
        </Button>
      </div>
    </div>
  );
};

export default AnswerLevelRuleGroupEditor;
