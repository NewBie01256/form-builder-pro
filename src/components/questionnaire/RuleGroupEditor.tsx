import { Button } from "@/components/ui/button";
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
import { Plus, ChevronDown, Trash2 } from "lucide-react";
import { RuleGroup, QuestionLevelRule, Question, AnswerLevelOperator } from "@/types/questionnaire";
import DynamicRuleValueInput from "./DynamicRuleValueInput";

interface RuleGroupEditorProps {
  group: RuleGroup;
  allQuestions: Question[];
  currentQuestionOrder?: number; // If provided, filter to questions with order < this
  onUpdate: (updated: RuleGroup) => void;
  isRoot?: boolean;
  onDelete?: () => void;
}

const OPERATORS: { value: AnswerLevelOperator; label: string }[] = [
  { value: 'equals', label: 'Equals' },
  { value: 'not_equals', label: 'Not Equals' },
  { value: 'greater_than', label: 'Greater Than' },
  { value: 'less_than', label: 'Less Than' },
  { value: 'contains', label: 'Contains' },
  { value: 'not_contains', label: 'Not Contains' },
  { value: 'starts_with', label: 'Starts With' },
  { value: 'ends_with', label: 'Ends With' },
];

const RuleGroupEditor = ({ group, allQuestions, currentQuestionOrder, onUpdate, isRoot = true, onDelete }: RuleGroupEditorProps) => {
  // Filter to previous questions if currentQuestionOrder is provided
  const availableQuestions = currentQuestionOrder !== undefined
    ? allQuestions.filter(q => q.order < currentQuestionOrder)
    : allQuestions;

  const updateGroup = (partial: Partial<RuleGroup>) => {
    onUpdate({ ...group, ...partial });
  };

  const updateChild = (index: number, updatedChild: RuleGroup | QuestionLevelRule) => {
    const newChildren = [...group.children];
    newChildren[index] = updatedChild;
    updateGroup({ children: newChildren });
  };

  const deleteChild = (index: number) => {
    const newChildren = group.children.filter((_, i) => i !== index);
    updateGroup({ children: newChildren });
  };

  const addGroup = () => {
    const newGroup: RuleGroup = {
      type: 'group',
      id: `g-${Date.now()}`,
      matchType: 'AND',
      children: []
    };
    updateGroup({ children: [...group.children, newGroup] });
  };

  const addRule = () => {
    const newRule: QuestionLevelRule = {
      type: 'rule',
      id: `r-${Date.now()}`,
      sourceQuestionId: '',
      sourceAnswerSetId: '',
      operator: 'equals',
      sourceAnswerId: ''
    };
    updateGroup({ children: [...group.children, newRule] });
  };

  // Get answer sets for a specific question (including inline answer sets)
  const getAnswerSetsForQuestion = (questionId: string) => {
    const question = allQuestions.find(q => q.id === questionId);
    if (!question) return [];

    const allAnswerSets = [...question.answerSets];
    question.answerLevelRuleGroups?.forEach(ruleGroup => {
      if (ruleGroup.inlineAnswerSet) {
        allAnswerSets.push(ruleGroup.inlineAnswerSet);
      }
    });

    return allAnswerSets;
  };

  // Get answers for a specific answer set
  const getAnswersForAnswerSet = (questionId: string, answerSetId: string) => {
    const question = allQuestions.find(q => q.id === questionId);
    if (!question || !answerSetId) return [];

    let answerSet = question.answerSets.find(as => as.id === answerSetId);

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
          <span className="text-xs font-medium text-muted-foreground">Source Question</span>
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
                  <RuleGroupEditor
                    group={child}
                    allQuestions={allQuestions}
                    currentQuestionOrder={currentQuestionOrder}
                    onUpdate={(updated) => updateChild(index, updated)}
                    isRoot={false}
                    onDelete={() => deleteChild(index)}
                  />
                </div>
              ) : (
                <>
                  {/* Rule Row */}
                  <div className="flex-1 grid grid-cols-4 gap-2 py-2 px-2">
                    {/* Source Question */}
                    <Select
                      value={child.sourceQuestionId}
                      onValueChange={(value) => {
                        updateChild(index, { 
                          ...child, 
                          sourceQuestionId: value,
                          sourceAnswerSetId: '',
                          sourceAnswerId: ''
                        });
                      }}
                    >
                      <SelectTrigger className="h-8 text-sm">
                        <SelectValue placeholder="Select question" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableQuestions.map(q => (
                          <SelectItem key={q.id} value={q.id}>
                            {q.text || 'Untitled Question'}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {/* Answer Set */}
                    <Select
                      value={child.sourceAnswerSetId}
                      onValueChange={(value) => {
                        updateChild(index, { 
                          ...child, 
                          sourceAnswerSetId: value,
                          sourceAnswerId: ''
                        });
                      }}
                      disabled={!child.sourceQuestionId}
                    >
                      <SelectTrigger className="h-8 text-sm">
                        <SelectValue placeholder="Select answer set" />
                      </SelectTrigger>
                      <SelectContent>
                        {getAnswerSetsForQuestion(child.sourceQuestionId).map(as => (
                          <SelectItem key={as.id} value={as.id}>
                            {as.name || 'Untitled Answer Set'}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {/* Operator */}
                    <Select
                      value={child.operator}
                      onValueChange={(value: AnswerLevelOperator) => {
                        updateChild(index, { ...child, operator: value });
                      }}
                    >
                      <SelectTrigger className="h-8 text-sm">
                        <SelectValue placeholder="Select operator" />
                      </SelectTrigger>
                      <SelectContent>
                        {OPERATORS.map(op => (
                          <SelectItem key={op.value} value={op.value}>
                            {op.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {/* Answer - Dynamic based on question type */}
                    {(() => {
                      const sourceQuestion = allQuestions.find(q => q.id === child.sourceQuestionId);
                      const questionType = sourceQuestion?.type || 'Choice';
                      const answers = getAnswersForAnswerSet(child.sourceQuestionId, child.sourceAnswerSetId);
                      
                      return (
                        <DynamicRuleValueInput
                          questionType={questionType}
                          answers={answers}
                          value={child.sourceAnswerId}
                          onChange={(value) => {
                            updateChild(index, { ...child, sourceAnswerId: value });
                          }}
                          disabled={!child.sourceAnswerSetId}
                        />
                      );
                    })()}
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
    </div>
  );
};

export default RuleGroupEditor;
