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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, MoreHorizontal, ChevronDown, ChevronUp, Trash2 } from "lucide-react";
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
  isRoot?: boolean;
  onDelete?: () => void;
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

const AnswerLevelRuleGroupEditor = ({ group, allQuestions, onUpdate, isRoot = true, onDelete }: AnswerLevelRuleGroupEditorProps) => {
  const [answerSetExpanded, setAnswerSetExpanded] = useState(!!group.inlineAnswerSet);

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
      previousAnswerId: '',
      selectedAnswerSetId: ''
    };
    updateGroup({ children: [...group.children, newRule] });
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
        <div className="flex-1 grid grid-cols-3 gap-2 px-3 py-2">
          <span className="text-xs font-medium text-muted-foreground">Field</span>
          <span className="text-xs font-medium text-muted-foreground">Operator</span>
          <span className="text-xs font-medium text-muted-foreground">Value</span>
        </div>
        <div className="w-16 px-2">
          {!isRoot && onDelete && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive"
              onClick={onDelete}
            >
              <MoreHorizontal className="h-4 w-4" />
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
              <div className="w-8 flex items-center justify-center relative">
                <Checkbox className="relative z-10 bg-background" />
              </div>

              {child.type === 'group' ? (
                <div className="flex-1 py-2 pr-2">
                  <AnswerLevelRuleGroupEditor
                    group={child}
                    allQuestions={allQuestions}
                    onUpdate={(updated) => updateChild(index, updated)}
                    isRoot={false}
                    onDelete={() => deleteChild(index)}
                  />
                </div>
              ) : (
                <>
                  {/* Rule Row */}
                  <div className="flex-1 grid grid-cols-3 gap-2 py-2 px-2">
                    <Select
                      value={child.previousQuestionId}
                      onValueChange={(value) => {
                        updateChild(index, { ...child, previousQuestionId: value });
                      }}
                    >
                      <SelectTrigger className="h-8 text-sm">
                        <SelectValue placeholder="Select a field" />
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
                      <SelectTrigger className="h-8 text-sm">
                        <SelectValue placeholder="Equals" />
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
                      <SelectTrigger className="h-8 text-sm">
                        <SelectValue placeholder="Value" />
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

                  {/* Actions */}
                  <div className="w-16 flex items-center justify-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem 
                          onClick={() => deleteChild(index)}
                          className="text-destructive focus:text-destructive"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
                {answerSetExpanded ? 'Hide' : 'Show'} Answer Set
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="px-3 pb-3">
            <InlineAnswerSetEditor
              answerSet={group.inlineAnswerSet}
              onUpdate={(updated) => {
                updateGroup({ inlineAnswerSet: updated });
              }}
            />
          </CollapsibleContent>
        </Collapsible>
      )}
    </div>
  );
};

export default AnswerLevelRuleGroupEditor;