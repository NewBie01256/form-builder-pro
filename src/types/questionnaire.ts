export type ImpactLevel = '1' | '2' | '3' | '4';
export type UrgencyLevel = '1' | '2' | '3' | '4';

export interface ActionRecord {
  operationCategoryTier1: string;
  operationCategoryTier2: string;
  operationCategoryTier3: string;
  productCategoryTier1: string;
  productCategoryTier2: string;
  productCategoryTier3: string;
  impact: ImpactLevel | '';
  urgency: UrgencyLevel | '';
}

export interface Answer {
  id: string;
  label: string;
  value: string;
  active: boolean;
  actionRecord?: ActionRecord;
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
  sourceAnswerSetId: string;
  operator: AnswerLevelOperator;
  sourceAnswerId: string;
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

export type QuestionType = 'Choice' | 'Text' | 'Number' | 'Date' | 'MultiSelect' | 'Rating' | 'Boolean';

export interface NumberConfig {
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number;
}

export interface DateConfig {
  minDate?: string;
  maxDate?: string;
  defaultValue?: string;
}

export interface RatingConfig {
  minValue: number;
  maxValue: number;
  minLabel?: string;
  maxLabel?: string;
  defaultValue?: number;
}

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  required: boolean;
  order: number;
  answerSets: AnswerSet[];
  questionLevelRuleGroup: RuleGroup;
  answerLevelRuleGroups: AnswerLevelRuleGroup[];
  numberConfig?: NumberConfig;
  dateConfig?: DateConfig;
  ratingConfig?: RatingConfig;
}

export interface ConditionalBranch {
  id: string;
  name: string;
  ruleGroup: RuleGroup;
  questions: Question[];
  childBranches: ConditionalBranch[];
}

export interface Section {
  id: string;
  name: string;
  description?: string;
  questions: Question[];
  branches: ConditionalBranch[];
}

export interface Page {
  id: string;
  name: string;
  description?: string;
  sections: Section[];
}

export interface Questionnaire {
  name: string;
  description: string;
  status: string;
  version: string;
  serviceCatalog: string;
  pages: Page[];
}

export interface LayoutItem {
  type: 'question' | 'branch';
  id: string;
}
