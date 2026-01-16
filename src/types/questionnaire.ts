export interface Answer {
  id: string;
  label: string;
  value: string;
  active: boolean;
}

export interface AnswerSet {
  id: string;
  name: string;
  tag: string;
  isDefault: boolean;
  answers: Answer[];
}

export interface QuestionLevelRule {
  type: 'rule';
  id: string;
  sourceQuestionId: string;
  sourceAnswerId: string;
  action: 'Show' | 'Hide';
  targetQuestionId: string;
}

export type AnswerLevelOperator = 'equals' | 'not_equals' | 'greater_than' | 'less_than' | 'contains' | 'not_contains' | 'starts_with' | 'ends_with';

export interface AnswerLevelRule {
  type: 'answerRule';
  id: string;
  previousQuestionId: string;
  previousAnswerSetId: string;
  operator: AnswerLevelOperator;
  previousAnswerId: string;
  selectedAnswerSetId: string;
}

export interface RuleGroup {
  type: 'group';
  id: string;
  matchType: 'AND' | 'OR';
  children: Array<RuleGroup | QuestionLevelRule>;
}

export interface AnswerLevelRuleGroup {
  type: 'group';
  id: string;
  matchType: 'AND' | 'OR';
  children: Array<AnswerLevelRuleGroup | AnswerLevelRule>;
  inlineAnswerSet?: AnswerSet;
}

export interface Question {
  id: string;
  text: string;
  type: string;
  required: boolean;
  order: number;
  answerSets: AnswerSet[];
  questionLevelRuleGroup: RuleGroup;
  answerLevelRuleGroups: AnswerLevelRuleGroup[];
}

export interface ConditionalBranch {
  id: string;
  name: string;
  ruleGroup: RuleGroup;
  questions: Question[];
  childBranches: ConditionalBranch[];
}

export interface Questionnaire {
  name: string;
  description: string;
  status: string;
  version: string;
  serviceCatalog: string;
}

export interface LayoutItem {
  type: 'question' | 'branch';
  id: string;
}
