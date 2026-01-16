import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Plus, HelpCircle, Layers, FileText, Clock, AlertCircle, Settings, Archive, Edit } from "lucide-react";
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
import { sampleITSMRecords, ITSMRecord } from "@/data/sampleITSMRecords";
import { cn } from "@/lib/utils";

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
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">ITSM Records</h2>
                    <p className="text-muted-foreground">Manage your IT Service Management questionnaires</p>
                  </div>
                  <Button size="lg" onClick={handleCreateQuestionnaire}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create New
                  </Button>
                </div>

                {/* ITSM Records List */}
                <div className="grid gap-3">
                  {sampleITSMRecords.map((record) => (
                    <Card 
                      key={record.id} 
                      className="hover:shadow-md transition-shadow cursor-pointer group"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-3 flex-1 min-w-0">
                            <div className={cn(
                              "h-10 w-10 rounded-lg flex items-center justify-center shrink-0",
                              record.category === 'Incident' && "bg-red-100 text-red-600",
                              record.category === 'Service Request' && "bg-blue-100 text-blue-600",
                              record.category === 'Change' && "bg-amber-100 text-amber-600",
                              record.category === 'Problem' && "bg-purple-100 text-purple-600"
                            )}>
                              {record.category === 'Incident' && <AlertCircle className="h-5 w-5" />}
                              {record.category === 'Service Request' && <FileText className="h-5 w-5" />}
                              {record.category === 'Change' && <Settings className="h-5 w-5" />}
                              {record.category === 'Problem' && <HelpCircle className="h-5 w-5" />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <h3 className="font-semibold truncate">{record.name}</h3>
                                <Badge 
                                  variant={record.status === 'Active' ? 'default' : record.status === 'Draft' ? 'secondary' : 'outline'}
                                  className="text-xs"
                                >
                                  {record.status}
                                </Badge>
                                <Badge 
                                  variant="outline"
                                  className={cn(
                                    "text-xs",
                                    record.priority === 'Critical' && "border-red-300 text-red-600",
                                    record.priority === 'High' && "border-orange-300 text-orange-600",
                                    record.priority === 'Medium' && "border-yellow-300 text-yellow-600",
                                    record.priority === 'Low' && "border-green-300 text-green-600"
                                  )}
                                >
                                  {record.priority}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mt-1 truncate">{record.description}</p>
                              <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Layers className="h-3 w-3" />
                                  {record.questionCount} questions
                                </span>
                                <span>{record.serviceCatalog}</span>
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  Updated {record.updatedAt}
                                </span>
                              </div>
                            </div>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
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
