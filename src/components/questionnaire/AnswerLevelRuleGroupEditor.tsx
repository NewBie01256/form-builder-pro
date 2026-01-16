import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Layers, Filter } from "lucide-react";
import { AnswerLevelRuleGroup, AnswerLevelRule, Question } from "@/types/questionnaire";

interface AnswerLevelRuleGroupEditorProps {
  group: AnswerLevelRuleGroup;
  allQuestions: Question[];
  onUpdate: (updated: AnswerLevelRuleGroup) => void;
}

const AnswerLevelRuleGroupEditor = ({ group, allQuestions, onUpdate }: AnswerLevelRuleGroupEditorProps) => {
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
                    </SelectContent>
                  </Select>
                </div>

                <Button variant="ghost" size="sm" className="mt-3">
                  <Plus className="h-4 w-4 mr-1" />
                  Create Answer Set Inline
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>

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
