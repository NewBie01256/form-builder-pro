import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Layers, Filter } from "lucide-react";
import { RuleGroup, QuestionLevelRule, Question } from "@/types/questionnaire";
import { cn } from "@/lib/utils";

interface RuleGroupEditorProps {
  group: RuleGroup;
  allQuestions: Question[];
  onUpdate: (updated: RuleGroup) => void;
}

const RuleGroupEditor = ({ group, allQuestions, onUpdate }: RuleGroupEditorProps) => {
  const updateGroup = (partial: Partial<RuleGroup>) => {
    onUpdate({ ...group, ...partial });
  };

  const updateChild = (index: number, updatedChild: RuleGroup | QuestionLevelRule) => {
    const newChildren = [...group.children];
    newChildren[index] = updatedChild;
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
      sourceAnswerId: '',
      action: 'Show',
      targetQuestionId: ''
    };
    updateGroup({ children: [...group.children, newRule] });
  };

  return (
    <div className="border border-border rounded-lg p-4 bg-card">
      <div className="flex items-center gap-3 mb-4">
        <Layers className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Rule Group</span>
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
              <RuleGroupEditor
                group={child}
                allQuestions={allQuestions}
                onUpdate={(updated) => updateChild(index, updated)}
              />
            ) : (
              <div className="border border-border rounded-lg p-4 bg-muted/50">
                <div className="flex items-center gap-2 mb-3">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Rule</span>
                </div>
                
                <div className="grid gap-3 sm:grid-cols-3">
                  <Select
                    value={child.sourceQuestionId}
                    onValueChange={(value) => {
                      updateChild(index, { ...child, sourceQuestionId: value });
                    }}
                  >
                    <SelectTrigger className="h-9">
                      <SelectValue placeholder="Source Question" />
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
                    value={child.action}
                    onValueChange={(value: 'Show' | 'Hide') => {
                      updateChild(index, { ...child, action: value });
                    }}
                  >
                    <SelectTrigger className="h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Show">Show</SelectItem>
                      <SelectItem value="Hide">Hide</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select
                    value={child.targetQuestionId}
                    onValueChange={(value) => {
                      updateChild(index, { ...child, targetQuestionId: value });
                    }}
                  >
                    <SelectTrigger className="h-9">
                      <SelectValue placeholder="Target Question" />
                    </SelectTrigger>
                    <SelectContent>
                      {allQuestions.map(q => (
                        <SelectItem key={q.id} value={q.id}>
                          {q.text || 'Untitled Question'}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
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
          Add Rule
        </Button>
      </div>
    </div>
  );
};

export default RuleGroupEditor;
