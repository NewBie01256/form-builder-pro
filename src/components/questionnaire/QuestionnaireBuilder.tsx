import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, HelpCircle } from "lucide-react";
import {
  Question,
  ConditionalBranch,
  Questionnaire,
  LayoutItem,
  AnswerSet,
} from "@/types/questionnaire";
import Sidebar from "./Sidebar";
import QuestionEditor from "./QuestionEditor";
import BranchEditor from "./BranchEditor";

const QuestionnaireBuilder = () => {
  const [questionnaire, setQuestionnaire] = useState<Questionnaire | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [branches, setBranches] = useState<ConditionalBranch[]>([]);
  const [layoutOrder, setLayoutOrder] = useState<LayoutItem[]>([]);
  const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(null);
  const [selectedBranchId, setSelectedBranchId] = useState<string | null>(null);

  const handleCreateQuestionnaire = () => {
    setQuestionnaire({
      name: '',
      description: '',
      status: 'Draft',
      version: '1.0',
      serviceCatalog: ''
    });
  };

  const handleAddQuestion = (branchId?: string) => {
    const defaultAnswerSet: AnswerSet = {
      id: `as-${Date.now()}`,
      name: 'Default Answer Set',
      tag: '',
      isDefault: true,
      answers: [
        {
          id: `ans-${Date.now()}`,
          label: '',
          value: '',
          active: true
        }
      ]
    };
    const newQuestion: Question = {
      id: `q-${Date.now()}`,
      text: '',
      type: 'Choice',
      required: false,
      order: questions.length + 1,
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
      setBranches(prev => addQuestionToBranch(prev));
      setSelectedBranchId(branchId);
      setSelectedQuestionId(newQuestion.id);
    } else {
      setQuestions(prev => [...prev, newQuestion]);
      let insertIndex = layoutOrder.length;
      for (let i = layoutOrder.length - 1; i >= 0; i--) {
        if (layoutOrder[i].type === 'branch') {
          insertIndex = i + 1;
          break;
        }
      }
      const newOrder = [...layoutOrder];
      newOrder.splice(insertIndex, 0, { type: 'question', id: newQuestion.id });
      setLayoutOrder(newOrder);
      setSelectedQuestionId(newQuestion.id);
      setSelectedBranchId(null);
    }
  };

  const handleAddBranch = () => {
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
    setBranches(prev => [...prev, newBranch]);
    setLayoutOrder(prev => [...prev, { type: 'branch', id: newBranch.id }]);
    setSelectedBranchId(newBranch.id);
    setSelectedQuestionId(null);
  };

  const handleAddBranchUnderParent = (parentId: string) => {
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
    const addBranchToParent = (branchList: ConditionalBranch[]): ConditionalBranch[] =>
      branchList.map(b => {
        if (b.id === parentId) {
          return { ...b, childBranches: [...b.childBranches, newBranch] };
        }
        return { ...b, childBranches: addBranchToParent(b.childBranches) };
      });
    setBranches(prev => addBranchToParent(prev));
    setSelectedBranchId(newBranch.id);
    setSelectedQuestionId(null);
  };

  const findBranchById = (branchList: ConditionalBranch[], id: string): ConditionalBranch | null => {
    for (const b of branchList) {
      if (b.id === id) return b;
      const found = findBranchById(b.childBranches, id);
      if (found) return found;
    }
    return null;
  };

  const selectedQuestion = selectedQuestionId
    ? questions.find(q => q.id === selectedQuestionId) ||
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
        return findQuestion(branches);
      })()
    : null;

  const updateQuestionInBranch = (branch: ConditionalBranch, id: string, updated: Partial<Question>): ConditionalBranch => {
    return {
      ...branch,
      questions: branch.questions.map(q => q.id === id ? { ...q, ...updated } : q),
      childBranches: branch.childBranches.map(cb => updateQuestionInBranch(cb, id, updated))
    };
  };

  const updateQuestion = (id: string, updated: Partial<Question>) => {
    setQuestions(prev => prev.map(q => q.id === id ? { ...q, ...updated } : q));
    const updateBranchQuestions = (branchList: ConditionalBranch[]): ConditionalBranch[] =>
      branchList.map(b => updateQuestionInBranch(b, id, updated));
    setBranches(prev => updateBranchQuestions(prev));
  };

  const updateBranch = (id: string, updated: Partial<ConditionalBranch>) => {
    const updateBranchRecursive = (branchList: ConditionalBranch[]): ConditionalBranch[] =>
      branchList.map(b => ({
        ...b,
        ...(b.id === id ? updated : {}),
        childBranches: updateBranchRecursive(b.childBranches)
      }));
    setBranches(prev => updateBranchRecursive(prev));
  };

  const allQuestions = [...questions, ...branches.flatMap(b => {
    const collectQuestions = (branch: ConditionalBranch): Question[] => [
      ...branch.questions,
      ...branch.childBranches.flatMap(collectQuestions)
    ];
    return collectQuestions(b);
  })];

  const selectedBranch = selectedBranchId ? findBranchById(branches, selectedBranchId) : null;

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar
        questionnaire={questionnaire}
        questions={questions}
        branches={branches}
        layoutOrder={layoutOrder}
        selectedQuestionId={selectedQuestionId}
        selectedBranchId={selectedBranchId}
        onCreateQuestionnaire={handleCreateQuestionnaire}
        onSelectQuestion={(id, branchId) => {
          setSelectedQuestionId(id);
          setSelectedBranchId(branchId);
        }}
        onSelectBranch={(id) => {
          setSelectedBranchId(id);
          setSelectedQuestionId(null);
        }}
        onReset={() => {
          setQuestionnaire(null);
          setQuestions([]);
          setBranches([]);
          setLayoutOrder([]);
          setSelectedQuestionId(null);
          setSelectedBranchId(null);
        }}
        onUpdateQuestionnaire={setQuestionnaire}
      />

      <div className="w-[70%] flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="p-6 space-y-6">
            {questionnaire && (
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg">Questions & Branches</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex gap-3">
                    <Button onClick={() => handleAddQuestion()}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Question
                    </Button>
                    <Button variant="secondary" onClick={handleAddBranch}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Conditional Branching
                    </Button>
                  </div>

                  {selectedBranch && (
                    <BranchEditor
                      branch={selectedBranch}
                      allQuestions={allQuestions}
                      selectedQuestionId={selectedQuestionId}
                      onUpdateBranch={updateBranch}
                      onAddQuestion={handleAddQuestion}
                      onAddChildBranch={handleAddBranchUnderParent}
                      onSelectQuestion={setSelectedQuestionId}
                      questionEditor={
                        selectedQuestion && selectedBranch.questions.some(q => q.id === selectedQuestionId) ? (
                          <QuestionEditor
                            question={selectedQuestion}
                            allQuestions={allQuestions}
                            onUpdate={updateQuestion}
                          />
                        ) : undefined
                      }
                    />
                  )}

                  {selectedQuestion && !selectedBranch && (
                    <QuestionEditor
                      question={selectedQuestion}
                      allQuestions={allQuestions}
                      onUpdate={updateQuestion}
                    />
                  )}
                </CardContent>
              </Card>
            )}

            {!questionnaire && (
              <div className="flex items-center justify-center h-[60vh]">
                <div className="text-center space-y-4">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                    <HelpCircle className="h-8 w-8 text-primary" />
                  </div>
                  <h2 className="text-xl font-semibold">Create a Questionnaire</h2>
                  <p className="text-muted-foreground max-w-md">
                    Build dynamic questionnaires with conditional branching and flexible answer sets.
                  </p>
                  <Button size="lg" onClick={handleCreateQuestionnaire}>
                    <Plus className="h-4 w-4 mr-2" />
                    Get Started
                  </Button>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default QuestionnaireBuilder;