import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Plus, Trash2, Layers, ChevronDown, ChevronUp, GitBranch } from "lucide-react";
import { Section, Question, ConditionalBranch, AnswerSet } from "@/types/questionnaire";
import QuestionEditor from "./QuestionEditor";
import BranchEditor from "./BranchEditor";
import { cn } from "@/lib/utils";

interface SectionEditorProps {
  section: Section;
  allQuestions: Question[];
  selectedQuestionId: string | null;
  selectedBranchId: string | null;
  onUpdate: (updated: Section) => void;
  onDelete: () => void;
  onSelectQuestion: (questionId: string, branchId: string | null) => void;
  onSelectBranch: (branchId: string) => void;
}

const SectionEditor = ({
  section,
  allQuestions,
  selectedQuestionId,
  selectedBranchId,
  onUpdate,
  onDelete,
  onSelectQuestion,
  onSelectBranch,
}: SectionEditorProps) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const handleAddQuestion = (branchId?: string) => {
    const defaultAnswerSet: AnswerSet = {
      id: `as-${Date.now()}`,
      name: 'Default Answer Set',
      tag: '',
      isDefault: true,
      answers: [{ id: `ans-${Date.now()}`, label: '', value: '', active: true }]
    };
    const newQuestion: Question = {
      id: `q-${Date.now()}`,
      text: '',
      type: 'Choice',
      required: false,
      order: section.questions.length + 1,
      answerSets: [defaultAnswerSet],
      questionLevelRuleGroup: {
        type: 'group',
        id: `g-${Date.now()}`,
        matchType: 'AND',
        children: []
      },
      answerLevelRuleGroups: []
    };

    if (branchId) {
      const addQuestionToBranch = (branchList: ConditionalBranch[]): ConditionalBranch[] =>
        branchList.map(b => {
          if (b.id === branchId) {
            return { ...b, questions: [...b.questions, newQuestion] };
          }
          return { ...b, childBranches: addQuestionToBranch(b.childBranches) };
        });
      onUpdate({ ...section, branches: addQuestionToBranch(section.branches) });
      onSelectQuestion(newQuestion.id, branchId);
    } else {
      onUpdate({ ...section, questions: [...section.questions, newQuestion] });
      onSelectQuestion(newQuestion.id, null);
    }
  };

  const handleAddBranch = (parentId?: string) => {
    const newBranch: ConditionalBranch = {
      id: `cb-${Date.now()}`,
      name: 'Conditional Branch',
      ruleGroup: {
        type: 'group',
        id: `g-${Date.now()}`,
        matchType: 'AND',
        children: []
      },
      questions: [],
      childBranches: []
    };

    if (parentId) {
      const addBranchToParent = (branchList: ConditionalBranch[]): ConditionalBranch[] =>
        branchList.map(b => {
          if (b.id === parentId) {
            return { ...b, childBranches: [...b.childBranches, newBranch] };
          }
          return { ...b, childBranches: addBranchToParent(b.childBranches) };
        });
      onUpdate({ ...section, branches: addBranchToParent(section.branches) });
    } else {
      onUpdate({ ...section, branches: [...section.branches, newBranch] });
    }
    onSelectBranch(newBranch.id);
  };

  const updateQuestion = (id: string, updated: Partial<Question>) => {
    // Update in section questions
    const updatedQuestions = section.questions.map(q => 
      q.id === id ? { ...q, ...updated } : q
    );
    
    // Update in branches recursively
    const updateInBranch = (branch: ConditionalBranch): ConditionalBranch => ({
      ...branch,
      questions: branch.questions.map(q => q.id === id ? { ...q, ...updated } : q),
      childBranches: branch.childBranches.map(updateInBranch)
    });
    
    onUpdate({
      ...section,
      questions: updatedQuestions,
      branches: section.branches.map(updateInBranch)
    });
  };

  const deleteQuestion = (questionId: string) => {
    const deleteFromBranch = (branchList: ConditionalBranch[]): ConditionalBranch[] =>
      branchList.map(b => ({
        ...b,
        questions: b.questions.filter(q => q.id !== questionId),
        childBranches: deleteFromBranch(b.childBranches)
      }));

    onUpdate({
      ...section,
      questions: section.questions.filter(q => q.id !== questionId),
      branches: deleteFromBranch(section.branches)
    });
  };

  const updateBranch = (id: string, updated: Partial<ConditionalBranch>) => {
    const updateRecursive = (branchList: ConditionalBranch[]): ConditionalBranch[] =>
      branchList.map(b => ({
        ...b,
        ...(b.id === id ? updated : {}),
        childBranches: updateRecursive(b.childBranches)
      }));
    onUpdate({ ...section, branches: updateRecursive(section.branches) });
  };

  const deleteBranch = (branchId: string) => {
    const deleteRecursive = (branchList: ConditionalBranch[]): ConditionalBranch[] =>
      branchList
        .filter(b => b.id !== branchId)
        .map(b => ({ ...b, childBranches: deleteRecursive(b.childBranches) }));
    onUpdate({ ...section, branches: deleteRecursive(section.branches) });
  };

  const findBranchById = (branchList: ConditionalBranch[], id: string): ConditionalBranch | null => {
    for (const b of branchList) {
      if (b.id === id) return b;
      const found = findBranchById(b.childBranches, id);
      if (found) return found;
    }
    return null;
  };

  const selectedBranch = selectedBranchId ? findBranchById(section.branches, selectedBranchId) : null;
  
  const selectedQuestion = selectedQuestionId
    ? section.questions.find(q => q.id === selectedQuestionId) ||
      (() => {
        const findQuestion = (branchList: ConditionalBranch[]): Question | null => {
          for (const b of branchList) {
            const q = b.questions.find(q => q.id === selectedQuestionId);
            if (q) return q;
            const found = findQuestion(b.childBranches);
            if (found) return found;
          }
          return null;
        };
        return findQuestion(section.branches);
      })()
    : null;

  return (
    <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
      <Card className="border-l-4 border-l-primary/50">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 flex-1">
              <Layers className="h-5 w-5 text-primary shrink-0" />
              <Input
                value={section.name}
                onChange={(e) => onUpdate({ ...section, name: e.target.value })}
                onClick={(e) => e.stopPropagation()}
                className="h-8 text-base font-semibold border-0 bg-transparent px-1 focus-visible:ring-1 focus-visible:ring-offset-0"
                placeholder="Section name"
              />
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 shrink-0">
                  {isExpanded ? (
                    <ChevronUp className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </CollapsibleTrigger>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onDelete}
              className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive shrink-0"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CollapsibleContent>
          <CardContent className="space-y-3 pt-0">
            <div className="flex gap-2">
              <Button size="sm" onClick={() => handleAddQuestion()}>
                <Plus className="h-4 w-4 mr-1" />
                Add Question
              </Button>
              <Button size="sm" variant="secondary" onClick={() => handleAddBranch()}>
                <Plus className="h-4 w-4 mr-1" />
                Add Branch
              </Button>
            </div>

            {/* Compact Questions & Branches List */}
            {(section.questions.length > 0 || section.branches.length > 0) && (
              <div className="flex flex-wrap gap-1.5">
                {section.questions.map(q => (
                  <div
                    key={q.id}
                    onClick={() => onSelectQuestion(q.id, null)}
                    className={cn(
                      "px-2 py-1 rounded text-xs cursor-pointer transition-colors",
                      "bg-muted hover:bg-accent border",
                      selectedQuestionId === q.id && !selectedBranchId 
                        ? "border-primary bg-primary/10 text-primary" 
                        : "border-transparent"
                    )}
                  >
                    {q.text || 'Untitled Question'}
                  </div>
                ))}
                {section.branches.map(b => (
                  <div
                    key={b.id}
                    onClick={() => onSelectBranch(b.id)}
                    className={cn(
                      "px-2 py-1 rounded text-xs cursor-pointer transition-colors flex items-center gap-1",
                      "bg-muted hover:bg-accent border",
                      selectedBranchId === b.id 
                        ? "border-primary bg-primary/10 text-primary" 
                        : "border-transparent"
                    )}
                  >
                    <GitBranch className="h-3 w-3" />
                    {b.name || 'Untitled Branch'}
                  </div>
                ))}
              </div>
            )}

            {/* Selected Branch Editor */}
            {selectedBranch && (
              <div className="pt-4 border-t">
                <BranchEditor
                  branch={selectedBranch}
                  allQuestions={allQuestions}
                  selectedQuestionId={selectedQuestionId}
                  onUpdateBranch={updateBranch}
                  onAddQuestion={handleAddQuestion}
                  onAddChildBranch={handleAddBranch}
                  onSelectQuestion={(id) => onSelectQuestion(id, selectedBranchId)}
                  onDeleteBranch={deleteBranch}
                  onDeleteQuestion={deleteQuestion}
                  questionEditor={
                    selectedQuestion && selectedBranch.questions.some(q => q.id === selectedQuestionId) ? (
                      <QuestionEditor
                        question={selectedQuestion}
                        allQuestions={allQuestions}
                        onUpdate={updateQuestion}
                        onDelete={deleteQuestion}
                      />
                    ) : undefined
                  }
                />
              </div>
            )}

            {/* Selected Question Editor (not in branch) */}
            {selectedQuestion && !selectedBranch && section.questions.some(q => q.id === selectedQuestionId) && (
              <div className="pt-4 border-t">
                <QuestionEditor
                  question={selectedQuestion}
                  allQuestions={allQuestions}
                  onUpdate={updateQuestion}
                  onDelete={deleteQuestion}
                />
              </div>
            )}
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
};

export default SectionEditor;
