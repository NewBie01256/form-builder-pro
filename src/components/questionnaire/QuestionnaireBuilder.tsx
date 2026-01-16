import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, HelpCircle, Layers } from "lucide-react";
import {
  Question,
  ConditionalBranch,
  Questionnaire,
  Page,
  Section,
} from "@/types/questionnaire";
import Sidebar from "./Sidebar";
import PageTabs from "./PageTabs";
import SectionEditor from "./SectionEditor";

const QuestionnaireBuilder = () => {
  const [questionnaire, setQuestionnaire] = useState<Questionnaire | null>(null);
  const [activePageId, setActivePageId] = useState<string | null>(null);
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);
  const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(null);
  const [selectedBranchId, setSelectedBranchId] = useState<string | null>(null);

  const handleCreateQuestionnaire = () => {
    const defaultPage: Page = {
      id: `page-${Date.now()}`,
      name: 'Page 1',
      description: '',
      sections: []
    };
    setQuestionnaire({
      name: '',
      description: '',
      status: 'Draft',
      version: '1.0',
      serviceCatalog: '',
      pages: [defaultPage]
    });
    setActivePageId(defaultPage.id);
  };

  const activePage = questionnaire?.pages.find(p => p.id === activePageId) || null;

  const handleAddPage = () => {
    if (!questionnaire) return;
    const newPage: Page = {
      id: `page-${Date.now()}`,
      name: `Page ${questionnaire.pages.length + 1}`,
      description: '',
      sections: []
    };
    setQuestionnaire({
      ...questionnaire,
      pages: [...questionnaire.pages, newPage]
    });
    setActivePageId(newPage.id);
    setSelectedSectionId(null);
    setSelectedQuestionId(null);
    setSelectedBranchId(null);
  };

  const handleDeletePage = (pageId: string) => {
    if (!questionnaire || questionnaire.pages.length <= 1) return;
    const newPages = questionnaire.pages.filter(p => p.id !== pageId);
    setQuestionnaire({ ...questionnaire, pages: newPages });
    if (activePageId === pageId) {
      setActivePageId(newPages[0]?.id || null);
      setSelectedSectionId(null);
      setSelectedQuestionId(null);
      setSelectedBranchId(null);
    }
  };

  const handleUpdatePage = (pageId: string, updated: Partial<Page>) => {
    if (!questionnaire) return;
    setQuestionnaire({
      ...questionnaire,
      pages: questionnaire.pages.map(p => p.id === pageId ? { ...p, ...updated } : p)
    });
  };

  const handleAddSection = () => {
    if (!questionnaire || !activePageId) return;
    const newSection: Section = {
      id: `section-${Date.now()}`,
      name: '',
      description: '',
      questions: [],
      branches: []
    };
    setQuestionnaire({
      ...questionnaire,
      pages: questionnaire.pages.map(p =>
        p.id === activePageId
          ? { ...p, sections: [...p.sections, newSection] }
          : p
      )
    });
    setSelectedSectionId(newSection.id);
    setSelectedQuestionId(null);
    setSelectedBranchId(null);
  };

  const handleUpdateSection = (sectionId: string, updated: Section) => {
    if (!questionnaire || !activePageId) return;
    setQuestionnaire({
      ...questionnaire,
      pages: questionnaire.pages.map(p =>
        p.id === activePageId
          ? { ...p, sections: p.sections.map(s => s.id === sectionId ? updated : s) }
          : p
      )
    });
  };

  const handleDeleteSection = (sectionId: string) => {
    if (!questionnaire || !activePageId) return;
    setQuestionnaire({
      ...questionnaire,
      pages: questionnaire.pages.map(p =>
        p.id === activePageId
          ? { ...p, sections: p.sections.filter(s => s.id !== sectionId) }
          : p
      )
    });
    if (selectedSectionId === sectionId) {
      setSelectedSectionId(null);
      setSelectedQuestionId(null);
      setSelectedBranchId(null);
    }
  };

  // Collect all questions for rule references
  const getAllQuestions = (): Question[] => {
    if (!questionnaire) return [];
    const questions: Question[] = [];
    
    const collectFromBranch = (branch: ConditionalBranch) => {
      questions.push(...branch.questions);
      branch.childBranches.forEach(collectFromBranch);
    };

    questionnaire.pages.forEach(page => {
      page.sections.forEach(section => {
        questions.push(...section.questions);
        section.branches.forEach(collectFromBranch);
      });
    });

    return questions;
  };

  const allQuestions = getAllQuestions();

  const handleSelectQuestion = (questionId: string, branchId: string | null) => {
    setSelectedQuestionId(questionId);
    setSelectedBranchId(branchId);
  };

  const handleSelectBranch = (branchId: string) => {
    setSelectedBranchId(branchId);
    setSelectedQuestionId(null);
  };

  const handleSelectSection = (sectionId: string) => {
    setSelectedSectionId(sectionId);
    setSelectedQuestionId(null);
    setSelectedBranchId(null);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar
        questionnaire={questionnaire}
        activePageId={activePageId}
        selectedSectionId={selectedSectionId}
        selectedQuestionId={selectedQuestionId}
        selectedBranchId={selectedBranchId}
        onCreateQuestionnaire={handleCreateQuestionnaire}
        onSelectPage={setActivePageId}
        onSelectSection={handleSelectSection}
        onSelectQuestion={handleSelectQuestion}
        onSelectBranch={handleSelectBranch}
        onReset={() => {
          setQuestionnaire(null);
          setActivePageId(null);
          setSelectedSectionId(null);
          setSelectedQuestionId(null);
          setSelectedBranchId(null);
        }}
        onUpdateQuestionnaire={setQuestionnaire}
      />

      <div className="w-[70%] flex-1 overflow-hidden flex flex-col">
        {questionnaire && (
          <PageTabs
            pages={questionnaire.pages}
            activePageId={activePageId}
            onSelectPage={(id) => {
              setActivePageId(id);
              setSelectedSectionId(null);
              setSelectedQuestionId(null);
              setSelectedBranchId(null);
            }}
            onAddPage={handleAddPage}
            onDeletePage={handleDeletePage}
            onUpdatePage={handleUpdatePage}
          />
        )}

        <ScrollArea className="flex-1">
          <div className="p-6 space-y-6">
            {questionnaire && activePage && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">{activePage.name || 'Untitled Page'}</h2>
                  <Button onClick={handleAddSection}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Section
                  </Button>
                </div>

                {activePage.sections.length === 0 && (
                  <Card className="border-dashed">
                    <CardContent className="py-12 text-center">
                      <Layers className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="font-medium mb-2">No sections yet</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Add a section to start adding questions and conditional branches.
                      </p>
                      <Button onClick={handleAddSection}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Section
                      </Button>
                    </CardContent>
                  </Card>
                )}

                {activePage.sections.map(section => (
                  <SectionEditor
                    key={section.id}
                    section={section}
                    allQuestions={allQuestions}
                    selectedQuestionId={selectedSectionId === section.id ? selectedQuestionId : null}
                    selectedBranchId={selectedSectionId === section.id ? selectedBranchId : null}
                    onUpdate={(updated) => handleUpdateSection(section.id, updated)}
                    onDelete={() => handleDeleteSection(section.id)}
                    onSelectQuestion={(qId, bId) => {
                      setSelectedSectionId(section.id);
                      handleSelectQuestion(qId, bId);
                    }}
                    onSelectBranch={(bId) => {
                      setSelectedSectionId(section.id);
                      handleSelectBranch(bId);
                    }}
                  />
                ))}
              </div>
            )}

            {!questionnaire && (
              <div className="flex items-center justify-center h-[60vh]">
                <div className="text-center space-y-4">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                    <HelpCircle className="h-8 w-8 text-primary" />
                  </div>
                  <h2 className="text-xl font-semibold">Create a Questionnaire</h2>
                  <p className="text-muted-foreground max-w-md">
                    Build dynamic questionnaires with pages, sections, conditional branching and flexible answer sets.
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
