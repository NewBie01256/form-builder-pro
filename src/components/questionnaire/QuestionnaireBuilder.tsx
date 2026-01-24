import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Plus, HelpCircle, Layers, FileText, Clock, AlertCircle, Settings, Edit, GitBranch, ListChecks, Zap, Files, Save, Trash2, BookOpen, Download, Play, X, Upload } from "lucide-react";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { ConfirmDialog } from "@/components/fluent";
import { exportQuestionnaire, buildExportData, parseQuestionnaireFile } from "@/lib/questionnaireExport";
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
import { toast } from "sonner";

const DRAFTS_STORAGE_KEY = 'questionnaire-drafts';

interface SavedDraft {
  id: string;
  questionnaire: Questionnaire;
  savedAt: string;
  pageCount: number;
  sectionCount: number;
  questionCount: number;
  branchCount: number;
}

const loadDraftsFromStorage = (): SavedDraft[] => {
  try {
    const stored = localStorage.getItem(DRAFTS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const saveDraftsToStorage = (drafts: SavedDraft[]) => {
  try {
    localStorage.setItem(DRAFTS_STORAGE_KEY, JSON.stringify(drafts));
  } catch (e) {
    console.error('Failed to save drafts to localStorage', e);
  }
};

const PUBLISHED_RECORDS_KEY = 'published-itsm-records';
const PUBLISHED_QUESTIONNAIRES_KEY = 'published-questionnaires';

interface PublishedRecord {
  metadata: ITSMRecord;
  questionnaire: Questionnaire;
}

const loadPublishedRecords = (): Record<string, PublishedRecord> => {
  try {
    const stored = localStorage.getItem(PUBLISHED_QUESTIONNAIRES_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
};

const savePublishedRecords = (records: Record<string, PublishedRecord>) => {
  try {
    localStorage.setItem(PUBLISHED_QUESTIONNAIRES_KEY, JSON.stringify(records));
  } catch (e) {
    console.error('Failed to save published records to localStorage', e);
  }
};

const QuestionnaireBuilder = () => {
  const [questionnaire, setQuestionnaire] = useState<Questionnaire | null>(null);
  const [activePageId, setActivePageId] = useState<string | null>(null);
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);
  const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(null);
  const [selectedBranchId, setSelectedBranchId] = useState<string | null>(null);
  const [savedDrafts, setSavedDrafts] = useState<SavedDraft[]>([]);
  const [editingDraftId, setEditingDraftId] = useState<string | null>(null);
  const [editingRecordId, setEditingRecordId] = useState<string | null>(null);
  const [publishedRecords, setPublishedRecords] = useState<Record<string, PublishedRecord>>(loadPublishedRecords());
  const [publishValidationError, setPublishValidationError] = useState<string | null>(null);

  // Load drafts from localStorage on mount
  useEffect(() => {
    setSavedDrafts(loadDraftsFromStorage());
  }, []);

  // Save drafts to localStorage whenever they change
  useEffect(() => {
    saveDraftsToStorage(savedDrafts);
  }, [savedDrafts]);

  // Save published records whenever they change
  useEffect(() => {
    savePublishedRecords(publishedRecords);
  }, [publishedRecords]);

  // Clear publish validation error when questionnaire changes
  useEffect(() => {
    if (publishValidationError) {
      setPublishValidationError(null);
    }
  }, [questionnaire]);

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

  const handleEditRecord = (record: ITSMRecord) => {
    const ts = Date.now();
    
    // Page 1: Initial Assessment
    const page1: Page = {
      id: `page-${ts}-1`,
      name: 'Initial Assessment',
      description: 'Gather basic information about the request',
      sections: [
        {
          id: `section-${ts}-1`,
          name: 'Contact Information',
          description: 'Requester details',
          questions: [
            {
              id: `q-${ts}-1`,
              text: 'What is your department?',
              type: 'Choice',
              required: true,
              order: 1,
              answerSets: [{
                id: `as-${ts}-1`,
                name: 'Departments',
                tag: 'department',
                isDefault: false,
                answers: [
                  { id: `a-${ts}-1a`, label: 'IT', value: 'it', active: true },
                  { id: `a-${ts}-1b`, label: 'HR', value: 'hr', active: true },
                  { id: `a-${ts}-1c`, label: 'Finance', value: 'finance', active: true },
                  { id: `a-${ts}-1d`, label: 'Operations', value: 'operations', active: true },
                  { id: `a-${ts}-1e`, label: 'Sales', value: 'sales', active: true }
                ]
              }],
              conditionGroup: { type: 'group', id: `rg-${ts}-1`, matchType: 'AND', children: [] },
              answerLevelRuleGroups: []
            },
            {
              id: `q-${ts}-2`,
              text: 'Preferred contact method?',
              type: 'Choice',
              required: true,
              order: 2,
              answerSets: [{
                id: `as-${ts}-2`,
                name: 'Contact Methods',
                tag: 'contact',
                isDefault: false,
                answers: [
                  { id: `a-${ts}-2a`, label: 'Email', value: 'email', active: true },
                  { id: `a-${ts}-2b`, label: 'Phone', value: 'phone', active: true },
                  { id: `a-${ts}-2c`, label: 'Teams/Slack', value: 'chat', active: true }
                ]
              }],
              conditionGroup: { type: 'group', id: `rg-${ts}-2`, matchType: 'AND', children: [] },
              answerLevelRuleGroups: []
            }
          ],
          branches: []
        },
        {
          id: `section-${ts}-2`,
          name: 'Issue Classification',
          description: 'Categorize the request',
          questions: [
            {
              id: `q-${ts}-3`,
              text: 'What type of issue are you experiencing?',
              type: 'Choice',
              required: true,
              order: 1,
              answerSets: [{
                id: `as-${ts}-3`,
                name: 'Issue Types',
                tag: 'issue-type',
                isDefault: false,
                answers: [
                  { id: `a-${ts}-3a`, label: 'Hardware', value: 'hardware', active: true },
                  { id: `a-${ts}-3b`, label: 'Software', value: 'software', active: true },
                  { id: `a-${ts}-3c`, label: 'Network', value: 'network', active: true },
                  { id: `a-${ts}-3d`, label: 'Access/Permissions', value: 'access', active: true }
                ]
              }],
              conditionGroup: { type: 'group', id: `rg-${ts}-3`, matchType: 'AND', children: [] },
              answerLevelRuleGroups: []
            },
            {
              id: `q-${ts}-4`,
              text: 'What is the urgency level?',
              type: 'Choice',
              required: true,
              order: 2,
              answerSets: [{
                id: `as-${ts}-4`,
                name: 'Urgency Levels',
                tag: 'urgency',
                isDefault: false,
                answers: [
                  { id: `a-${ts}-4a`, label: 'Critical - Service Down', value: 'critical', active: true },
                  { id: `a-${ts}-4b`, label: 'High - Major Impact', value: 'high', active: true },
                  { id: `a-${ts}-4c`, label: 'Medium - Moderate Impact', value: 'medium', active: true },
                  { id: `a-${ts}-4d`, label: 'Low - Minor Impact', value: 'low', active: true }
                ]
              }],
              conditionGroup: { type: 'group', id: `rg-${ts}-4`, matchType: 'AND', children: [] },
              answerLevelRuleGroups: []
            }
          ],
          branches: [
            {
              id: `branch-${ts}-1`,
              name: 'Hardware Issues',
              conditionGroup: { type: 'group', id: `brg-${ts}-1`, matchType: 'AND', children: [] },
              questions: [
                {
                  id: `q-${ts}-5`,
                  text: 'What hardware is affected?',
                  type: 'Choice',
                  required: true,
                  order: 1,
                  answerSets: [{
                    id: `as-${ts}-5`,
                    name: 'Hardware Types',
                    tag: 'hardware',
                    isDefault: false,
                    answers: [
                      { id: `a-${ts}-5a`, label: 'Laptop/Desktop', value: 'computer', active: true },
                      { id: `a-${ts}-5b`, label: 'Monitor', value: 'monitor', active: true },
                      { id: `a-${ts}-5c`, label: 'Printer', value: 'printer', active: true },
                      { id: `a-${ts}-5d`, label: 'Keyboard/Mouse', value: 'peripheral', active: true }
                    ]
                  }],
                  conditionGroup: { type: 'group', id: `rg-${ts}-5`, matchType: 'AND', children: [] },
                  answerLevelRuleGroups: []
                },
                {
                  id: `q-${ts}-6`,
                  text: 'Is this hardware under warranty?',
                  type: 'Choice',
                  required: false,
                  order: 2,
                  answerSets: [{
                    id: `as-${ts}-6`,
                    name: 'Yes/No',
                    tag: 'yesno',
                    isDefault: true,
                    answers: [
                      { id: `a-${ts}-6a`, label: 'Yes', value: 'yes', active: true },
                      { id: `a-${ts}-6b`, label: 'No', value: 'no', active: true },
                      { id: `a-${ts}-6c`, label: 'Not Sure', value: 'unknown', active: true }
                    ]
                  }],
                  conditionGroup: { type: 'group', id: `rg-${ts}-6`, matchType: 'AND', children: [] },
                  answerLevelRuleGroups: []
                }
              ],
              childBranches: []
            },
            {
              id: `branch-${ts}-2`,
              name: 'Software Issues',
              conditionGroup: { type: 'group', id: `brg-${ts}-2`, matchType: 'AND', children: [] },
              questions: [
                {
                  id: `q-${ts}-7`,
                  text: 'Which application is affected?',
                  type: 'Text',
                  required: true,
                  order: 1,
                  answerSets: [{
                    id: `as-${ts}-7`,
                    name: 'Application Name',
                    tag: '',
                    isDefault: false,
                    answers: [{ id: `a-${ts}-7a`, label: '', value: '', active: true }]
                  }],
                  conditionGroup: { type: 'group', id: `rg-${ts}-7`, matchType: 'AND', children: [] },
                  answerLevelRuleGroups: []
                }
              ],
              childBranches: [
                {
                  id: `branch-${ts}-2-1`,
                  name: 'Installation Issues',
                  conditionGroup: { type: 'group', id: `brg-${ts}-2-1`, matchType: 'AND', children: [] },
                  questions: [
                    {
                      id: `q-${ts}-8`,
                      text: 'What error message do you see during installation?',
                      type: 'Text',
                      required: false,
                      order: 1,
                      answerSets: [{
                        id: `as-${ts}-8`,
                        name: 'Error Message',
                        tag: '',
                        isDefault: false,
                        answers: [{ id: `a-${ts}-8a`, label: '', value: '', active: true }]
                      }],
                      conditionGroup: { type: 'group', id: `rg-${ts}-8`, matchType: 'AND', children: [] },
                      answerLevelRuleGroups: []
                    }
                  ],
                  childBranches: []
                }
              ]
            }
          ]
        }
      ]
    };

    // Page 2: Detailed Information
    const page2: Page = {
      id: `page-${ts}-2`,
      name: 'Detailed Information',
      description: 'Provide more details about the issue',
      sections: [
        {
          id: `section-${ts}-3`,
          name: 'Problem Description',
          description: 'Describe the issue in detail',
          questions: [
            {
              id: `q-${ts}-9`,
              text: 'Please describe the issue in detail',
              type: 'Text',
              required: true,
              order: 1,
              answerSets: [{
                id: `as-${ts}-9`,
                name: 'Description',
                tag: '',
                isDefault: false,
                answers: [{ id: `a-${ts}-9a`, label: '', value: '', active: true }]
              }],
              conditionGroup: { type: 'group', id: `rg-${ts}-9`, matchType: 'AND', children: [] },
              answerLevelRuleGroups: []
            },
            {
              id: `q-${ts}-10`,
              text: 'When did this issue first occur?',
              type: 'Date',
              required: true,
              order: 2,
              answerSets: [{
                id: `as-${ts}-10`,
                name: 'Date',
                tag: '',
                isDefault: false,
                answers: [{ id: `a-${ts}-10a`, label: '', value: '', active: true }]
              }],
              conditionGroup: { type: 'group', id: `rg-${ts}-10`, matchType: 'AND', children: [] },
              answerLevelRuleGroups: []
            },
            {
              id: `q-${ts}-11`,
              text: 'How many users are affected?',
              type: 'Number',
              required: false,
              order: 3,
              answerSets: [{
                id: `as-${ts}-11`,
                name: 'User Count',
                tag: '',
                isDefault: false,
                answers: [{ id: `a-${ts}-11a`, label: '', value: '', active: true }]
              }],
              conditionGroup: { type: 'group', id: `rg-${ts}-11`, matchType: 'AND', children: [] },
              answerLevelRuleGroups: [],
              numberConfig: { min: 1, max: 1000, step: 1 }
            }
          ],
          branches: []
        },
        {
          id: `section-${ts}-4`,
          name: 'Impact Assessment',
          description: 'Assess the business impact',
          questions: [
            {
              id: `q-${ts}-12`,
              text: 'Is this preventing you from completing your work?',
              type: 'Choice',
              required: true,
              order: 1,
              answerSets: [{
                id: `as-${ts}-12`,
                name: 'Work Impact',
                tag: 'impact',
                isDefault: false,
                answers: [
                  { id: `a-${ts}-12a`, label: 'Yes, completely blocked', value: 'blocked', active: true },
                  { id: `a-${ts}-12b`, label: 'Partially, using workaround', value: 'workaround', active: true },
                  { id: `a-${ts}-12c`, label: 'No, minor inconvenience', value: 'minor', active: true }
                ]
              }],
              conditionGroup: { type: 'group', id: `rg-${ts}-12`, matchType: 'AND', children: [] },
              answerLevelRuleGroups: []
            },
            {
              id: `q-${ts}-13`,
              text: 'Rate the severity of this issue',
              type: 'Rating',
              required: true,
              order: 2,
              answerSets: [{
                id: `as-${ts}-13`,
                name: 'Severity Rating',
                tag: '',
                isDefault: false,
                answers: [{ id: `a-${ts}-13a`, label: '', value: '', active: true }]
              }],
              conditionGroup: { type: 'group', id: `rg-${ts}-13`, matchType: 'AND', children: [] },
              answerLevelRuleGroups: [],
              ratingConfig: { minValue: 1, maxValue: 5, minLabel: 'Low', maxLabel: 'Critical' }
            }
          ],
          branches: [
            {
              id: `branch-${ts}-3`,
              name: 'Critical Impact Follow-up',
              conditionGroup: { type: 'group', id: `brg-${ts}-3`, matchType: 'AND', children: [] },
              questions: [
                {
                  id: `q-${ts}-14`,
                  text: 'Is there a deadline affected by this issue?',
                  type: 'Date',
                  required: true,
                  order: 1,
                  answerSets: [{
                    id: `as-${ts}-14`,
                    name: 'Deadline',
                    tag: '',
                    isDefault: false,
                    answers: [{ id: `a-${ts}-14a`, label: '', value: '', active: true }]
                  }],
                  conditionGroup: { type: 'group', id: `rg-${ts}-14`, matchType: 'AND', children: [] },
                  answerLevelRuleGroups: []
                }
              ],
              childBranches: []
            }
          ]
        }
      ]
    };

    // Page 3: Resolution & Follow-up
    const page3: Page = {
      id: `page-${ts}-3`,
      name: 'Resolution & Follow-up',
      description: 'Preferences for resolution',
      sections: [
        {
          id: `section-${ts}-5`,
          name: 'Resolution Preferences',
          description: 'How would you like this resolved?',
          questions: [
            {
              id: `q-${ts}-15`,
              text: 'Preferred resolution method',
              type: 'MultiSelect',
              required: false,
              order: 1,
              answerSets: [{
                id: `as-${ts}-15`,
                name: 'Resolution Methods',
                tag: 'resolution',
                isDefault: false,
                answers: [
                  { id: `a-${ts}-15a`, label: 'Remote Support', value: 'remote', active: true },
                  { id: `a-${ts}-15b`, label: 'On-site Visit', value: 'onsite', active: true },
                  { id: `a-${ts}-15c`, label: 'Phone Call', value: 'phone', active: true },
                  { id: `a-${ts}-15d`, label: 'Email Instructions', value: 'email', active: true }
                ]
              }],
              conditionGroup: { type: 'group', id: `rg-${ts}-15`, matchType: 'AND', children: [] },
              answerLevelRuleGroups: []
            },
            {
              id: `q-${ts}-16`,
              text: 'Best time to contact you',
              type: 'Choice',
              required: true,
              order: 2,
              answerSets: [{
                id: `as-${ts}-16`,
                name: 'Contact Times',
                tag: 'time',
                isDefault: false,
                answers: [
                  { id: `a-${ts}-16a`, label: 'Morning (9am-12pm)', value: 'morning', active: true },
                  { id: `a-${ts}-16b`, label: 'Afternoon (12pm-5pm)', value: 'afternoon', active: true },
                  { id: `a-${ts}-16c`, label: 'Anytime', value: 'anytime', active: true }
                ]
              }],
              conditionGroup: { type: 'group', id: `rg-${ts}-16`, matchType: 'AND', children: [] },
              answerLevelRuleGroups: []
            }
          ],
          branches: []
        },
        {
          id: `section-${ts}-6`,
          name: 'Additional Notes',
          description: 'Any other information',
          questions: [
            {
              id: `q-${ts}-17`,
              text: 'Any additional comments or information?',
              type: 'Text',
              required: false,
              order: 1,
              answerSets: [{
                id: `as-${ts}-17`,
                name: 'Comments',
                tag: '',
                isDefault: false,
                answers: [{ id: `a-${ts}-17a`, label: '', value: '', active: true }]
              }],
              conditionGroup: { type: 'group', id: `rg-${ts}-17`, matchType: 'AND', children: [] },
              answerLevelRuleGroups: []
            }
          ],
          branches: []
        }
      ]
    };
    
    setQuestionnaire({
      name: record.name,
      description: record.description,
      status: record.status,
      version: '1.0',
      serviceCatalog: record.serviceCatalog,
      pages: [page1, page2, page3]
    });
    setActivePageId(page1.id);
    setSelectedSectionId(page1.sections[0].id);
    setEditingRecordId(record.id);
  };

  const handlePublish = () => {
    if (!questionnaire) return;
    
    const validationErrors: string[] = [];
    
    // Helper to check if a rule group has rules
    const hasRules = (ruleGroup: { children: unknown[] }): boolean => {
      return ruleGroup.children && ruleGroup.children.length > 0;
    };
    
    // Helper to validate branches recursively
    const validateBranch = (branch: ConditionalBranch, path: string): void => {
      // Check if branch has no questions
      if (branch.questions.length === 0 && branch.childBranches.length === 0) {
        validationErrors.push(`Branch "${branch.name || 'Untitled Branch'}" in ${path} has no questions`);
      }
      
      // Check if branch is missing conditions
      const branchConditionGroup = branch.conditionGroup || branch.ruleGroup;
      if (!branchConditionGroup || !hasRules(branchConditionGroup)) {
        validationErrors.push(`Branch "${branch.name || 'Untitled Branch'}" in ${path} is missing conditions`);
      }
      
      // Check answer-level rule groups in branch questions
      branch.questions.forEach(q => {
        q.answerLevelRuleGroups.forEach((rg, rgIndex) => {
          if (!hasRules(rg)) {
            validationErrors.push(`Answer Set ${rgIndex + 1} in question "${q.text || 'Untitled Question'}" (${path}) is missing rules`);
          }
        });
      });
      
      // Recurse into child branches
      branch.childBranches.forEach(cb => validateBranch(cb, path));
    };
    
    // Validate pages, sections, branches
    questionnaire.pages.forEach(page => {
      const pageName = page.name || 'Untitled Page';
      
      // Check empty pages
      let pageHasContent = false;
      page.sections.forEach(section => {
        if (section.questions.length > 0 || section.branches.length > 0) {
          pageHasContent = true;
        }
      });
      
      if (!pageHasContent) {
        validationErrors.push(`Page "${pageName}" is missing Configurations`);
      }
      
      // Validate sections
      page.sections.forEach(section => {
        const sectionName = section.name || 'Untitled Section';
        const sectionPath = `Page "${pageName}" > Section "${sectionName}"`;
        
        // Check empty sections
        if (section.questions.length === 0 && section.branches.length === 0) {
          validationErrors.push(`Section "${sectionName}" in Page "${pageName}" is empty`);
        }
        
        // Check answer-level rule groups in section questions
        section.questions.forEach(q => {
          q.answerLevelRuleGroups.forEach((rg, rgIndex) => {
            if (!hasRules(rg)) {
              validationErrors.push(`Answer Set ${rgIndex + 1} in question "${q.text || 'Untitled Question'}" (${sectionPath}) is missing rules`);
            }
          });
        });
        
        // Validate branches
        section.branches.forEach(branch => validateBranch(branch, sectionPath));
      });
    });
    
    if (validationErrors.length > 0) {
      setPublishValidationError(validationErrors.join(' | '));
      return;
    }
    
    // Clear any previous error
    setPublishValidationError(null);
    const stats = getQuestionnaireStats(questionnaire);
    
    // Count answer sets
    let answerSetCount = 0;
    let actionCount = 0;
    
    const countInBranch = (branch: ConditionalBranch) => {
      branch.questions.forEach(q => {
        answerSetCount += q.answerSets.length;
        q.answerSets.forEach(as => {
          as.answers.forEach(a => {
            if (a.actionRecord) actionCount++;
          });
        });
        q.answerLevelRuleGroups.forEach(rg => {
          if (rg.inlineAnswerSet) {
            answerSetCount++;
            rg.inlineAnswerSet.answers.forEach(a => {
              if (a.actionRecord) actionCount++;
            });
          }
        });
      });
      branch.childBranches.forEach(countInBranch);
    };
    
    questionnaire.pages.forEach(page => {
      page.sections.forEach(section => {
        section.questions.forEach(q => {
          answerSetCount += q.answerSets.length;
          q.answerSets.forEach(as => {
            as.answers.forEach(a => {
              if (a.actionRecord) actionCount++;
            });
          });
          q.answerLevelRuleGroups.forEach(rg => {
            if (rg.inlineAnswerSet) {
              answerSetCount++;
              rg.inlineAnswerSet.answers.forEach(a => {
                if (a.actionRecord) actionCount++;
              });
            }
          });
        });
        section.branches.forEach(countInBranch);
      });
    });
    
    // Use existing record ID or create a new one
    const recordId = editingRecordId || `published-${Date.now()}`;
    
    const updatedMetadata: ITSMRecord = {
      id: recordId,
      name: questionnaire.name || 'Untitled Questionnaire',
      description: questionnaire.description || '',
      category: 'Service Request', // Default for new records
      status: 'Active',
      priority: 'Medium',
      createdAt: publishedRecords[recordId]?.metadata.createdAt || new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      questionCount: stats.questionCount,
      serviceCatalog: questionnaire.serviceCatalog || 'General',
      pageCount: stats.pageCount,
      sectionCount: stats.sectionCount,
      branchCount: stats.branchCount,
      actionCount,
      answerSetCount
    };
    
    const publishedRecord: PublishedRecord = {
      metadata: updatedMetadata,
      questionnaire: { ...questionnaire, status: 'Active' }
    };
    
    setPublishedRecords(prev => ({
      ...prev,
      [recordId]: publishedRecord
    }));
    
    // Remove draft if publishing from a draft
    if (editingDraftId) {
      setSavedDrafts(prev => prev.filter(d => d.id !== editingDraftId));
      setEditingDraftId(null);
    }
    
    // If this was a new questionnaire, set the editing record ID for future updates
    if (!editingRecordId) {
      setEditingRecordId(recordId);
    }
    
    setQuestionnaire({ ...questionnaire, status: 'Active' });
    toast.success("Questionnaire published successfully!");
  };
  const countQuestionsInBranch = (branch: ConditionalBranch): number => {
    let count = branch.questions.length;
    branch.childBranches.forEach(cb => {
      count += countQuestionsInBranch(cb);
    });
    return count;
  };

  const countBranchesInBranch = (branch: ConditionalBranch): number => {
    let count = 1;
    branch.childBranches.forEach(cb => {
      count += countBranchesInBranch(cb);
    });
    return count;
  };

  const getQuestionnaireStats = (q: Questionnaire) => {
    let sectionCount = 0;
    let questionCount = 0;
    let branchCount = 0;

    q.pages.forEach(page => {
      sectionCount += page.sections.length;
      page.sections.forEach(section => {
        questionCount += section.questions.length;
        section.branches.forEach(branch => {
          branchCount += countBranchesInBranch(branch);
          questionCount += countQuestionsInBranch(branch);
        });
      });
    });

    return {
      pageCount: q.pages.length,
      sectionCount,
      questionCount,
      branchCount
    };
  };

  const handleSaveAsDraft = () => {
    if (!questionnaire) return;
    
    const stats = getQuestionnaireStats(questionnaire);
    
    // Determine the draft ID to use:
    // 1. If editing an existing draft, use that ID
    // 2. If editing a record/template, use a draft ID based on the record ID
    // 3. Otherwise, create a new draft ID
    const draftIdToUse = editingDraftId || (editingRecordId ? `draft-${editingRecordId}` : null);
    
    if (draftIdToUse) {
      // Check if this draft already exists
      const existingDraft = savedDrafts.find(d => d.id === draftIdToUse);
      
      if (existingDraft) {
        // Update existing draft
        setSavedDrafts(prev => prev.map(draft => 
          draft.id === draftIdToUse
            ? {
                ...draft,
                questionnaire: { ...questionnaire, status: 'Draft' },
                savedAt: new Date().toLocaleString(),
                ...stats
              }
            : draft
        ));
        toast.success("Draft updated!");
      } else {
        // Create new draft with the determined ID
        const newDraft: SavedDraft = {
          id: draftIdToUse,
          questionnaire: { ...questionnaire, status: 'Draft' },
          savedAt: new Date().toLocaleString(),
          ...stats
        };
        setSavedDrafts(prev => [...prev, newDraft]);
        setEditingDraftId(draftIdToUse);
        toast.success("Questionnaire saved as draft!");
      }
    } else {
      // Create new draft with a fresh ID
      const newDraftId = `draft-${Date.now()}`;
      const newDraft: SavedDraft = {
        id: newDraftId,
        questionnaire: { ...questionnaire, status: 'Draft' },
        savedAt: new Date().toLocaleString(),
        ...stats
      };
      setSavedDrafts(prev => [...prev, newDraft]);
      setEditingDraftId(newDraftId);
      toast.success("Questionnaire saved as draft!");
    }
    
    // Return to list view
    setQuestionnaire(null);
    setActivePageId(null);
    setSelectedSectionId(null);
    setSelectedQuestionId(null);
    setSelectedBranchId(null);
    setEditingDraftId(null);
    setEditingRecordId(null);
  };

  const handleEditDraft = (draft: SavedDraft) => {
    setQuestionnaire(draft.questionnaire);
    setActivePageId(draft.questionnaire.pages[0]?.id || null);
    setSelectedSectionId(draft.questionnaire.pages[0]?.sections[0]?.id || null);
    setEditingDraftId(draft.id);
  };

  const handleDeleteDraft = (draftId: string) => {
    setSavedDrafts(prev => prev.filter(d => d.id !== draftId));
    toast.success("Draft deleted");
  };

  const handleEditPublishedRecord = (publishedRecord: PublishedRecord) => {
    // Restore the full questionnaire from the published record
    setQuestionnaire(publishedRecord.questionnaire);
    setActivePageId(publishedRecord.questionnaire.pages[0]?.id || null);
    setSelectedSectionId(publishedRecord.questionnaire.pages[0]?.sections[0]?.id || null);
    setEditingRecordId(publishedRecord.metadata.id);
  };

  const handleDeletePublishedRecord = (recordId: string) => {
    setPublishedRecords(prev => {
      const updated = { ...prev };
      delete updated[recordId];
      return updated;
    });
    toast.success("Published record deleted");
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
    <ResizablePanelGroup direction="horizontal" className="h-screen w-full bg-background">
      <ResizablePanel defaultSize={25} minSize={15} maxSize={40}>
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
            setEditingDraftId(null);
            setEditingRecordId(null);
          }}
          onUpdateQuestionnaire={setQuestionnaire}
          onPublish={handlePublish}
          canPublish={!!editingRecordId}
        />
      </ResizablePanel>

      <ResizableHandle withHandle />

      <ResizablePanel defaultSize={75} minSize={50}>
        <div className="h-full overflow-hidden flex flex-col">
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
                {/* Publish Validation Error */}
                {publishValidationError && (
                  <div className="flex items-center gap-2 p-3 rounded-md bg-destructive/10 border border-destructive text-destructive">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span className="text-sm font-medium flex-1">{publishValidationError}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 text-destructive hover:text-destructive hover:bg-destructive/20"
                      onClick={() => setPublishValidationError(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">{activePage.name || 'Untitled Page'}</h2>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        exportQuestionnaire(questionnaire);
                        toast.success("Questionnaire exported successfully!");
                      }}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Export JSON
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => {
                        if (questionnaire) {
                          const exportData = buildExportData(questionnaire);
                          sessionStorage.setItem('executor-questionnaire', JSON.stringify(exportData));
                          window.open('/execute', '_blank');
                        }
                      }}
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Preview
                    </Button>
                    <Button variant="outline" onClick={handleSaveAsDraft}>
                      <Save className="h-4 w-4 mr-2" />
                      Save as Draft
                    </Button>
                    <Button onClick={handleAddSection}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Section
                    </Button>
                  </div>
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
                    <div className="flex items-center gap-2">
                      <Link to="/docs">
                        <Button variant="outline" size="lg">
                          <BookOpen className="h-4 w-4 mr-2" />
                          Documentation
                        </Button>
                      </Link>
                      <Button 
                        variant="outline" 
                        size="lg"
                        onClick={() => document.getElementById('import-json-input')?.click()}
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Import JSON
                      </Button>
                      <input
                        id="import-json-input"
                        type="file"
                        accept=".json"
                        className="hidden"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          try {
                            const parsed = await parseQuestionnaireFile(file);
                            setQuestionnaire(parsed.questionnaire);
                            if (parsed.questionnaire.pages.length > 0) {
                              setActivePageId(parsed.questionnaire.pages[0].id);
                            }
                            setEditingDraftId(null);
                            setEditingRecordId(null);
                            toast.success("Questionnaire imported successfully!");
                          } catch (error) {
                            toast.error("Failed to import questionnaire. Please check the file format.");
                          }
                          e.target.value = '';
                        }}
                      />
                      <Button size="lg" onClick={handleCreateQuestionnaire}>
                      <Plus className="h-4 w-4 mr-2" />
                      Create New
                    </Button>
                  </div>
                </div>

                {/* Saved Drafts */}
                {savedDrafts.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Save className="h-5 w-5 text-muted-foreground" />
                      Saved Drafts
                    </h3>
                    <div className="grid gap-3">
                      {savedDrafts.map((draft) => (
                        <Card 
                          key={draft.id} 
                          className="hover:shadow-md transition-shadow cursor-pointer group border-dashed border-primary/30"
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex items-start gap-3 flex-1 min-w-0">
                                <div className="h-10 w-10 rounded-lg flex items-center justify-center shrink-0 bg-primary/10 text-primary">
                                  <FileText className="h-5 w-5" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <h3 className="font-semibold truncate">
                                      {draft.questionnaire.name || 'Untitled Questionnaire'}
                                    </h3>
                                    <Badge variant="secondary" className="text-xs">
                                      Draft
                                    </Badge>
                                  </div>
                                  <p className="text-sm text-muted-foreground mt-1 truncate">
                                    {draft.questionnaire.description || 'No description'}
                                  </p>
                                  <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground flex-wrap">
                                    <span className="flex items-center gap-1" title="Pages">
                                      <Files className="h-3 w-3" />
                                      {draft.pageCount}
                                    </span>
                                    <span className="flex items-center gap-1" title="Sections">
                                      <Layers className="h-3 w-3" />
                                      {draft.sectionCount}
                                    </span>
                                    <span className="flex items-center gap-1" title="Questions">
                                      <HelpCircle className="h-3 w-3" />
                                      {draft.questionCount}
                                    </span>
                                    <span className="flex items-center gap-1" title="Branches">
                                      <GitBranch className="h-3 w-3" />
                                      {draft.branchCount}
                                    </span>
                                    <span className="text-muted-foreground/60">|</span>
                                    <span className="flex items-center gap-1">
                                      <Clock className="h-3 w-3" />
                                      Saved {draft.savedAt}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => handleEditDraft(draft)}
                                >
                                  <Edit className="h-4 w-4 mr-1" />
                                  Edit
                                </Button>
                                <ConfirmDialog
                                  trigger={
                                    <Button 
                                      variant="ghost" 
                                      size="sm"
                                      className="text-destructive hover:text-destructive"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  }
                                  title="Delete Draft"
                                  description={`Are you sure you want to delete the draft "${draft.questionnaire.name || 'Untitled Questionnaire'}"? This action cannot be undone.`}
                                  onConfirm={() => handleDeleteDraft(draft.id)}
                                />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {/* Published Records (user-created) */}
                {Object.values(publishedRecords).filter(r => !sampleITSMRecords.some(s => s.id === r.metadata.id)).length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      Published Records
                    </h3>
                    <div className="grid gap-3">
                      {Object.values(publishedRecords)
                        .filter(r => !sampleITSMRecords.some(s => s.id === r.metadata.id))
                        .map((publishedRecord) => (
                        <Card 
                          key={publishedRecord.metadata.id} 
                          className="hover:shadow-md transition-shadow cursor-pointer group border-primary/30"
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex items-start gap-3 flex-1 min-w-0">
                                <div className="h-10 w-10 rounded-lg flex items-center justify-center shrink-0 bg-primary/10 text-primary">
                                  <FileText className="h-5 w-5" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <h3 className="font-semibold truncate">{publishedRecord.metadata.name}</h3>
                                    <Badge variant="default" className="text-xs">
                                      {publishedRecord.metadata.status}
                                    </Badge>
                                  </div>
                                  <p className="text-sm text-muted-foreground mt-1 truncate">{publishedRecord.metadata.description || 'No description'}</p>
                                  <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground flex-wrap">
                                    <span className="flex items-center gap-1" title="Pages">
                                      <Files className="h-3 w-3" />
                                      {publishedRecord.metadata.pageCount}
                                    </span>
                                    <span className="flex items-center gap-1" title="Sections">
                                      <Layers className="h-3 w-3" />
                                      {publishedRecord.metadata.sectionCount}
                                    </span>
                                    <span className="flex items-center gap-1" title="Questions">
                                      <HelpCircle className="h-3 w-3" />
                                      {publishedRecord.metadata.questionCount}
                                    </span>
                                    <span className="flex items-center gap-1" title="Branches">
                                      <GitBranch className="h-3 w-3" />
                                      {publishedRecord.metadata.branchCount}
                                    </span>
                                    <span className="text-muted-foreground/60">|</span>
                                    <span className="flex items-center gap-1">
                                      <Clock className="h-3 w-3" />
                                      {publishedRecord.metadata.updatedAt}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => handleEditPublishedRecord(publishedRecord)}
                                >
                                  <Edit className="h-4 w-4 mr-1" />
                                  Edit
                                </Button>
                                <ConfirmDialog
                                  trigger={
                                    <Button 
                                      variant="ghost" 
                                      size="sm"
                                      className="text-destructive hover:text-destructive"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  }
                                  title="Delete Published Record"
                                  description={`Are you sure you want to delete "${publishedRecord.metadata.name}"? This action cannot be undone.`}
                                  onConfirm={() => handleDeletePublishedRecord(publishedRecord.metadata.id)}
                                />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {/* ITSM Templates Header */}
                <h3 className="text-lg font-semibold">Templates</h3>

                {/* ITSM Records List */}
                <div className="grid gap-3">
                  {sampleITSMRecords.map((baseRecord) => {
                    // Use published version's metadata if available, otherwise use the base record
                    const record = publishedRecords[baseRecord.id]?.metadata || baseRecord;
                    return (
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
                              <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground flex-wrap">
                                <span className="flex items-center gap-1" title="Pages">
                                  <Files className="h-3 w-3" />
                                  {record.pageCount}
                                </span>
                                <span className="flex items-center gap-1" title="Sections">
                                  <Layers className="h-3 w-3" />
                                  {record.sectionCount}
                                </span>
                                <span className="flex items-center gap-1" title="Questions">
                                  <HelpCircle className="h-3 w-3" />
                                  {record.questionCount}
                                </span>
                                <span className="flex items-center gap-1" title="Branches">
                                  <GitBranch className="h-3 w-3" />
                                  {record.branchCount}
                                </span>
                                <span className="flex items-center gap-1" title="Answer Sets">
                                  <ListChecks className="h-3 w-3" />
                                  {record.answerSetCount}
                                </span>
                                <span className="flex items-center gap-1" title="Actions">
                                  <Zap className="h-3 w-3" />
                                  {record.actionCount}
                                </span>
                                <span className="text-muted-foreground/60">|</span>
                                <span>{record.serviceCatalog}</span>
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {record.updatedAt}
                                </span>
                              </div>
                            </div>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                            onClick={() => {
                              // If we have a published version with full questionnaire, use it
                              if (publishedRecords[baseRecord.id]) {
                                handleEditPublishedRecord(publishedRecords[baseRecord.id]);
                              } else {
                                handleEditRecord(baseRecord);
                              }
                            }}
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                  })}
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default QuestionnaireBuilder;
