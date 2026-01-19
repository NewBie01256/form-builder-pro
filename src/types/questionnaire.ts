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

export type DynamicValueOperator = 'equals' | 'not_equals' | 'greater_than' | 'less_than' | 'contains' | 'not_contains' | 'starts_with' | 'ends_with' | 'is_null' | 'is_not_null';

export interface DynamicValueFilter {
  type: 'filter';
  id: string;
  field: string;
  operator: DynamicValueOperator;
  value: string;
}

export interface DynamicValueFilterGroup {
  type: 'group';
  id: string;
  matchType: 'AND' | 'OR';
  children: Array<DynamicValueFilter | DynamicValueFilterGroup>;
}

export interface DynamicValueConfig {
  tableName: string;
  labelField: string;
  valueField: string;
  filterGroup: DynamicValueFilterGroup;
  orderByField?: string;
  orderDirection?: 'asc' | 'desc';
}

export interface AnswerSet {
  id: string;
  name: string;
  tag: string;
  isDefault: boolean;
  answers: Answer[];
  dynamicValues?: boolean;
  dynamicConfig?: DynamicValueConfig;
  // Date restriction fields
  dateRestriction?: boolean;
  minDate?: string;
  maxDate?: string;
  includeTime?: boolean;
  // Number restriction fields
  numberRestriction?: boolean;
  minValue?: number;
  maxValue?: number;
  // TextArea format
  textAreaFormat?: 'plain' | 'rich';
  // Rating configuration
  ratingMinValue?: number;
  ratingMaxValue?: number;
  ratingMinLabel?: string;
  ratingMaxLabel?: string;
  ratingDisplayStyle?: 'numbers' | 'stars' | 'smileys' | 'hearts' | 'thumbs';
  // Document/File attachment configuration
  allowedFileTypes?: string[];
  maxFileSize?: number; // in MB
  maxFiles?: number; // max number of files allowed
  // Downloadable Document configuration
  downloadableFileName?: string;
  downloadableFileUrl?: string;
  downloadableFileType?: string;
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

export type QuestionType = 'Choice' | 'Dropdown' | 'Text' | 'TextArea' | 'Number' | 'Decimal' | 'Date' | 'MultiSelect' | 'Rating' | 'Boolean' | 'RadioButton' | 'Document' | 'DownloadableDocument';

export type TextAreaFormat = 'plain' | 'rich';

export interface TextAreaConfig {
  format: TextAreaFormat;
  defaultValue?: string;
}

export interface NumberConfig {
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number;
}

export type TextValidationType = 'none' | 'cost_center' | 'email' | 'ip_address' | 'phone' | 'url';

export interface TextConfig {
  validationType?: TextValidationType;
  defaultValue?: string;
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
  readOnly?: boolean;
  hidden?: boolean;
  order: number;
  answerSets: AnswerSet[];
  questionLevelRuleGroup: RuleGroup;
  answerLevelRuleGroups: AnswerLevelRuleGroup[];
  textConfig?: TextConfig;
  numberConfig?: NumberConfig;
  dateConfig?: DateConfig;
  ratingConfig?: RatingConfig;
  textAreaConfig?: TextAreaConfig;
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
