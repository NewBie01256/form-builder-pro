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
import { HelpCircle } from "lucide-react";
import { ConfirmDialog } from "@/components/fluent";

// Recursive component to render branch with nested children
interface BranchContainerProps {
  branch: ConditionalBranch;
  selectedBranchId: string | null;
  selectedQuestionId: string | null;
  onSelectBranch: (branchId: string) => void;
  onSelectQuestion: (questionId: string, branchId: string | null) => void;
  depth?: number;
}

const BranchContainer = ({
  branch,
  selectedBranchId,
  selectedQuestionId,
  onSelectBranch,
  onSelectQuestion,
  depth = 0,
}: BranchContainerProps) => {
  const hasChildren = branch.questions.length > 0 || branch.childBranches.length > 0;
  
  return (
    <div
      className={cn(
        "rounded-md border-2 border-dashed p-1.5",
        depth === 0 ? "border-muted-foreground/30" : "border-muted-foreground/20",
        "bg-muted/20"
      )}
    >
      {/* Branch header */}
      <div
        onClick={() => onSelectBranch(branch.id)}
        className={cn(
          "px-2 py-1 rounded text-xs cursor-pointer transition-colors flex items-center gap-1",
          "bg-muted hover:bg-accent border",
          selectedBranchId === branch.id 
            ? "border-primary bg-primary/10 text-primary" 
            : "border-transparent"
        )}
      >
        <GitBranch className="h-3 w-3 shrink-0" />
        <span className="truncate">{branch.name || 'Untitled Branch'}</span>
      </div>
      
      {/* Nested children */}
      {hasChildren && (
        <div className="flex flex-wrap gap-1 mt-1.5 pl-2 border-l-2 border-muted-foreground/20 ml-1">
          {/* Branch questions */}
          {branch.questions.map(q => (
            <div
              key={q.id}
              onClick={() => onSelectQuestion(q.id, branch.id)}
              className={cn(
                "px-2 py-1 rounded text-xs cursor-pointer transition-colors flex items-center gap-1",
                "bg-background hover:bg-accent border",
                selectedQuestionId === q.id 
                  ? "border-primary bg-primary/10 text-primary" 
                  : "border-transparent"
              )}
            >
              <HelpCircle className="h-3 w-3 shrink-0" />
              <span className="truncate max-w-[120px]">{q.text || 'Untitled'}</span>
            </div>
          ))}
          
          {/* Child branches (recursive) */}
          {branch.childBranches.map(cb => (
            <BranchContainer
              key={cb.id}
              branch={cb}
              selectedBranchId={selectedBranchId}
              selectedQuestionId={selectedQuestionId}
              onSelectBranch={onSelectBranch}
              onSelectQuestion={onSelectQuestion}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

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
  const [isEditingName, setIsEditingName] = useState(false);

  const handleNameDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditingName(true);
  };

  const handleNameBlur = () => {
    setIsEditingName(false);
  };

  const handleNameKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === "Escape") {
      setIsEditingName(false);
    }
  };

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
      conditionGroup: {
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
      conditionGroup: {
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
            <div className="flex items-center gap-2 flex-1" onDoubleClick={handleNameDoubleClick}>
              <Layers className="h-5 w-5 text-primary shrink-0" />
              {isEditingName ? (
                <Input
                  value={section.name}
                  onChange={(e) => onUpdate({ ...section, name: e.target.value })}
                  onClick={(e) => e.stopPropagation()}
                  onBlur={handleNameBlur}
                  onKeyDown={handleNameKeyDown}
                  className="h-8 text-base font-semibold border border-primary bg-background px-1 focus-visible:ring-1 focus-visible:ring-offset-0"
                  placeholder="Section name"
                  autoFocus
                />
              ) : (
                <span className="text-base font-semibold cursor-pointer hover:text-primary transition-colors">
                  {section.name || "Untitled Section"}
                </span>
              )}
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
            <ConfirmDialog
              trigger={
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive shrink-0"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              }
              title="Delete Section"
              description={`Are you sure you want to delete "${section.name || 'Untitled Section'}"? This will remove all questions and branches within it. This action cannot be undone.`}
              onConfirm={onDelete}
            />
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

            {/* Compact Questions & Branches List with Hierarchy */}
            {(section.questions.length > 0 || section.branches.length > 0) && (
              <div className="flex flex-wrap gap-1.5 items-start">
                {/* Section-level Questions */}
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
                
                {/* Branches with nested content in dotted containers */}
                {section.branches.map(b => (
                  <BranchContainer
                    key={b.id}
                    branch={b}
                    selectedBranchId={selectedBranchId}
                    selectedQuestionId={selectedQuestionId}
                    onSelectBranch={onSelectBranch}
                    onSelectQuestion={onSelectQuestion}
                  />
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
