import { useState, useRef, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Upload, 
  FileJson, 
  ArrowLeft, 
  ArrowRight, 
  Download, 
  CheckCircle,
  AlertCircle,
  Home
} from "lucide-react";
import { Questionnaire, Question, ConditionalBranch } from "@/types/questionnaire";
import { ExportedQuestionnaire, parseQuestionnaireFile } from "@/lib/questionnaireExport";
import { 
  QuestionnaireResponse, 
  QuestionResponse,
  exportResponseAsJSON, 
  exportResponseAsCSV 
} from "@/types/questionnaireResponse";
import QuestionRenderer from "@/components/executor/QuestionRenderer";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { isQuestionVisible, isBranchVisible, getActiveAnswerSetForQuestion } from "@/lib/conditionEvaluator";

type ResponseValue = string | string[] | number | boolean | null;
type ResponseMap = Record<string, ResponseValue>;

const Execute = () => {
  const [questionnaire, setQuestionnaire] = useState<Questionnaire | null>(null);
  const [exportedData, setExportedData] = useState<ExportedQuestionnaire | null>(null);
  const [activePageIndex, setActivePageIndex] = useState(0);
  const [responses, setResponses] = useState<ResponseMap>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Helper to extract default values from all questions
  const getDefaultResponses = (q: Questionnaire): ResponseMap => {
    const defaults: ResponseMap = {};
    
    const processQuestion = (question: Question) => {
      const defaultAnswerSet = question.answerSets.find(as => as.isDefault) || question.answerSets[0];
      if (!defaultAnswerSet) return;
      
      const defaultAnswer = defaultAnswerSet.answers[0];
      if (!defaultAnswer?.value) return;
      
      // Set default value based on question type
      switch (question.type) {
        case 'Number':
        case 'Decimal':
        case 'Rating':
          const numVal = parseFloat(defaultAnswer.value);
          if (!isNaN(numVal)) {
            defaults[question.id] = numVal;
          }
          break;
        case 'Boolean':
          defaults[question.id] = defaultAnswer.value === 'true';
          break;
        case 'MultiSelect':
          // For MultiSelect, default could be comma-separated values
          if (defaultAnswer.value) {
            defaults[question.id] = [defaultAnswer.value];
          }
          break;
        default:
          // Text, TextArea, Date, Choice, Dropdown, RadioButton
          defaults[question.id] = defaultAnswer.value;
      }
    };

    const processFromBranch = (branch: ConditionalBranch) => {
      branch.questions.forEach(processQuestion);
      branch.childBranches.forEach(processFromBranch);
    };

    q.pages.forEach((page) => {
      page.sections.forEach((section) => {
        section.questions.forEach(processQuestion);
        section.branches.forEach(processFromBranch);
      });
    });

    return defaults;
  };

  // Check for pre-loaded questionnaire from builder on mount
  useEffect(() => {
    const stored = sessionStorage.getItem('executor-questionnaire');
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as ExportedQuestionnaire;
        setExportedData(parsed);
        setQuestionnaire(parsed.questionnaire);
        setActivePageIndex(0);
        setResponses(getDefaultResponses(parsed.questionnaire));
        setIsSubmitted(false);
        setValidationErrors([]);
        sessionStorage.removeItem('executor-questionnaire');
        toast.success("Questionnaire loaded from builder!");
      } catch (error) {
        console.error('Failed to parse stored questionnaire', error);
      }
    }
  }, []);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const parsed = await parseQuestionnaireFile(file);
      setExportedData(parsed);
      setQuestionnaire(parsed.questionnaire);
      setActivePageIndex(0);
      setResponses(getDefaultResponses(parsed.questionnaire));
      setIsSubmitted(false);
      setValidationErrors([]);
      toast.success("Questionnaire loaded successfully!");
    } catch (error) {
      toast.error("Failed to load questionnaire. Please check the file format.");
    }
  };

  const collectAllQuestions = (): Question[] => {
    if (!questionnaire) return [];
    const questions: Question[] = [];

    const collectFromBranch = (branch: ConditionalBranch) => {
      questions.push(...branch.questions);
      branch.childBranches.forEach(collectFromBranch);
    };

    questionnaire.pages.forEach((page) => {
      page.sections.forEach((section) => {
        questions.push(...section.questions);
        section.branches.forEach(collectFromBranch);
      });
    });

    return questions;
  };

  // Memoize all questions for condition evaluation
  const allQuestions = useMemo(() => collectAllQuestions(), [questionnaire]);

  const collectPageQuestions = (pageIndex: number): Question[] => {
    if (!questionnaire || !questionnaire.pages[pageIndex]) return [];
    const questions: Question[] = [];
    const page = questionnaire.pages[pageIndex];

    const collectFromBranch = (branch: ConditionalBranch) => {
      // Only collect questions from visible branches
      if (isBranchVisible(branch, responses, allQuestions)) {
        questions.push(...branch.questions.filter(q => isQuestionVisible(q, responses, allQuestions)));
        branch.childBranches.forEach(collectFromBranch);
      }
    };

    page.sections.forEach((section) => {
      // Only collect visible questions
      questions.push(...section.questions.filter(q => isQuestionVisible(q, responses, allQuestions)));
      section.branches.forEach(collectFromBranch);
    });

    return questions;
  };

  const handleResponseChange = (questionId: string, value: ResponseValue) => {
    setResponses((prev) => ({ ...prev, [questionId]: value }));
    // Clear validation errors when user makes changes
    if (validationErrors.length > 0) {
      setValidationErrors([]);
    }
  };

  const validateCurrentPage = (): boolean => {
    const pageQuestions = collectPageQuestions(activePageIndex);
    const errors: string[] = [];

    pageQuestions.forEach((question) => {
      if (question.required) {
        const response = responses[question.id];
        const isEmpty = 
          response === null || 
          response === undefined || 
          response === "" ||
          (Array.isArray(response) && response.length === 0);

        if (isEmpty) {
          errors.push(`"${question.text}" is required`);
        }
      }
    });

    setValidationErrors(errors);
    return errors.length === 0;
  };

  const handleNextPage = () => {
    if (!validateCurrentPage()) {
      toast.error("Please answer all required questions");
      return;
    }

    if (questionnaire && activePageIndex < questionnaire.pages.length - 1) {
      setActivePageIndex((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (activePageIndex > 0) {
      setActivePageIndex((prev) => prev - 1);
      setValidationErrors([]);
    }
  };

  const handleSubmit = () => {
    if (!validateCurrentPage()) {
      toast.error("Please answer all required questions");
      return;
    }

    setIsSubmitted(true);
    toast.success("Questionnaire submitted successfully!");
  };

  const buildQuestionnaireResponse = (): QuestionnaireResponse => {
    const allQuestions = collectAllQuestions();
    
    const questionResponses: QuestionResponse[] = allQuestions
      .filter((q) => responses[q.id] !== undefined && responses[q.id] !== null)
      .map((question) => {
        const value = responses[question.id];
        let displayValue = "";

        if (Array.isArray(value)) {
          // For multi-select, find labels
          const answerSet = question.answerSets[0];
          if (answerSet) {
            displayValue = value
              .map((v) => answerSet.answers.find((a) => a.value === v)?.label || v)
              .join(", ");
          } else {
            displayValue = value.join(", ");
          }
        } else if (typeof value === "boolean") {
          displayValue = value ? "Yes" : "No";
        } else if (["Choice", "RadioButton", "Dropdown"].includes(question.type)) {
          // Find the label for the selected value
          const answerSet = question.answerSets[0];
          if (answerSet) {
            displayValue = answerSet.answers.find((a) => a.value === value)?.label || String(value);
          } else {
            displayValue = String(value);
          }
        } else {
          displayValue = String(value);
        }

        return {
          questionId: question.id,
          questionText: question.text,
          questionType: question.type,
          value,
          displayValue,
        };
      });

    return {
      questionnaireId: questionnaire?.name || "unknown",
      questionnaireName: questionnaire?.name || "Untitled Questionnaire",
      submittedAt: new Date().toISOString(),
      responses: questionResponses,
    };
  };

  const handleDownloadJSON = () => {
    const response = buildQuestionnaireResponse();
    exportResponseAsJSON(response);
    toast.success("Response downloaded as JSON");
  };

  const handleDownloadCSV = () => {
    const response = buildQuestionnaireResponse();
    exportResponseAsCSV(response);
    toast.success("Response downloaded as CSV");
  };

  const handleReset = () => {
    setQuestionnaire(null);
    setExportedData(null);
    setResponses({});
    setIsSubmitted(false);
    setActivePageIndex(0);
    setValidationErrors([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const progress = questionnaire 
    ? ((activePageIndex + 1) / questionnaire.pages.length) * 100 
    : 0;

  // Landing state - no questionnaire loaded
  if (!questionnaire) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
              <FileJson className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">Questionnaire Executor</CardTitle>
            <CardDescription>
              Import a questionnaire JSON file to start filling it out
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleFileUpload}
              className="hidden"
            />
            <Button
              className="w-full"
              size="lg"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="h-5 w-5 mr-2" />
              Import Questionnaire JSON
            </Button>
            <div className="text-center">
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <Home className="h-4 w-4 mr-2" />
                  Back to Builder
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Submitted state
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl">Submission Complete!</CardTitle>
            <CardDescription>
              Your responses have been recorded. Download them below.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Button className="flex-1" onClick={handleDownloadJSON}>
                <Download className="h-4 w-4 mr-2" />
                Download JSON
              </Button>
              <Button className="flex-1" variant="outline" onClick={handleDownloadCSV}>
                <Download className="h-4 w-4 mr-2" />
                Download CSV
              </Button>
            </div>
            <Button variant="ghost" className="w-full" onClick={handleReset}>
              Start New Questionnaire
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const activePage = questionnaire.pages[activePageIndex];
  const isLastPage = activePageIndex === questionnaire.pages.length - 1;
  const isFirstPage = activePageIndex === 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h1 className="text-xl font-semibold">{questionnaire.name || "Untitled Questionnaire"}</h1>
              {questionnaire.description && (
                <p className="text-sm text-muted-foreground">{questionnaire.description}</p>
              )}
            </div>
            <Badge variant="outline">
              Page {activePageIndex + 1} of {questionnaire.pages.length}
            </Badge>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Content */}
      <ScrollArea className="h-[calc(100vh-140px)]">
        <div className="max-w-4xl mx-auto px-6 py-8">
          {/* Page Title */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold">{activePage.name}</h2>
            {activePage.description && (
              <p className="text-muted-foreground mt-1">{activePage.description}</p>
            )}
          </div>

          {/* Validation Errors */}
          {validationErrors.length > 0 && (
            <Card className="mb-6 border-destructive">
              <CardContent className="py-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-destructive">Please complete the following:</p>
                    <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                      {validationErrors.map((error, i) => (
                        <li key={i}>• {error}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Sections */}
          <div className="space-y-8">
            {activePage.sections.map((section) => {
              // Get visible questions for this section
              const visibleSectionQuestions = section.questions.filter(q => 
                isQuestionVisible(q, responses, allQuestions)
              );
              
              // Get visible branches
              const visibleBranches = section.branches.filter(branch => 
                isBranchVisible(branch, responses, allQuestions)
              );

              // Only show section if it has visible content
              const hasVisibleContent = visibleSectionQuestions.length > 0 || visibleBranches.length > 0;
              if (!hasVisibleContent) return null;

              return (
                <Card key={section.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">{section.name}</CardTitle>
                    {section.description && (
                      <CardDescription>{section.description}</CardDescription>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {visibleSectionQuestions.map((question) => (
                      <div key={question.id}>
                        <QuestionRenderer
                          question={question}
                          value={responses[question.id] ?? null}
                          onChange={(value) => handleResponseChange(question.id, value)}
                          activeAnswerSet={getActiveAnswerSetForQuestion(question, responses, allQuestions)}
                        />
                      </div>
                    ))}

                    {/* Render visible branch questions */}
                    {visibleBranches.map((branch) => {
                      const visibleBranchQuestions = branch.questions.filter(q => 
                        isQuestionVisible(q, responses, allQuestions)
                      );
                      
                      if (visibleBranchQuestions.length === 0) return null;
                      
                      return (
                        <div key={branch.id} className="pl-4 border-l-2 border-border space-y-6">
                          <div className="text-sm text-muted-foreground font-medium">
                            {branch.name}
                          </div>
                          {visibleBranchQuestions.map((question) => (
                            <div key={question.id}>
                              <QuestionRenderer
                                question={question}
                                value={responses[question.id] ?? null}
                                onChange={(value) => handleResponseChange(question.id, value)}
                                activeAnswerSet={getActiveAnswerSetForQuestion(question, responses, allQuestions)}
                              />
                            </div>
                          ))}
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </ScrollArea>

      {/* Footer Navigation */}
      <div className="border-t bg-card sticky bottom-0">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Button
            variant="outline"
            onClick={handlePrevPage}
            disabled={isFirstPage}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          <div className="flex gap-2">
            <Button variant="ghost" onClick={handleReset}>
              Cancel
            </Button>
            {isLastPage ? (
              <Button onClick={handleSubmit}>
                <CheckCircle className="h-4 w-4 mr-2" />
                Submit
              </Button>
            ) : (
              <Button onClick={handleNextPage}>
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Execute;
