/**
 * Unified Condition System
 * 
 * This module provides a consistent abstraction for all conditional logic in the application.
 * It unifies the concepts of "filters" (used in Dynamic Values) and "rules" (used in branching)
 * under consistent naming conventions.
 * 
 * Terminology:
 * - Condition: A single comparison (field/question + operator + value)
 * - ConditionGroup: A group of conditions with AND/OR logic, supporting nesting
 * - ConditionOperator: The comparison operators available
 */

// ============================================================================
// Core Condition Types (Generic)
// ============================================================================

/**
 * All operators available for conditions
 */
export type ConditionOperator = 
  | 'equals' 
  | 'not_equals' 
  | 'greater_than' 
  | 'less_than' 
  | 'contains' 
  | 'not_contains' 
  | 'starts_with' 
  | 'ends_with'
  | 'is_null'
  | 'is_not_null';

/**
 * Operators available for answer-level conditions (excludes null checks)
 */
export type AnswerLevelOperator = Exclude<ConditionOperator, 'is_null' | 'is_not_null'>;

/**
 * Match type for condition groups
 */
export type ConditionMatchType = 'AND' | 'OR';

// ============================================================================
// Dynamic Value Conditions (for filtering data source records)
// ============================================================================

/**
 * A condition for filtering dynamic values from a data source
 * Uses 'filter' type for backward compatibility with existing data
 */
export interface DynamicValueCondition {
  type: 'filter';
  id: string;
  field: string;
  operator: ConditionOperator;
  value: string;
}

/**
 * A group of dynamic value conditions with AND/OR logic
 */
export interface DynamicValueConditionGroup {
  type: 'group';
  id: string;
  matchType: ConditionMatchType;
  children: Array<DynamicValueCondition | DynamicValueConditionGroup>;
}

/**
 * Configuration for fetching dynamic values from a data source
 * Uses 'conditionGroup' as the standard name, with 'filterGroup' as an alias for backward compatibility
 */
export interface DynamicValueConfig {
  tableName: string;
  labelField: string;
  valueField: string;
  /** @deprecated Use conditionGroup instead */
  filterGroup?: DynamicValueConditionGroup;
  conditionGroup?: DynamicValueConditionGroup;
  orderByField?: string;
  orderDirection?: 'asc' | 'desc';
}

// ============================================================================
// Question-Level Conditions (for showing/hiding questions and branches)
// ============================================================================

/**
 * A condition based on a previous question's answer
 * Uses 'rule' type for backward compatibility with existing data
 */
export interface QuestionCondition {
  type: 'rule';
  id: string;
  sourceQuestionId: string;
  sourceAnswerSetId: string;
  operator: AnswerLevelOperator;
  sourceAnswerId: string;
}

/**
 * A group of question conditions with AND/OR logic
 */
export interface QuestionConditionGroup {
  type: 'group';
  id: string;
  matchType: ConditionMatchType;
  children: Array<QuestionCondition | QuestionConditionGroup>;
}

// ============================================================================
// Answer-Level Conditions (for swapping answer sets based on previous answers)
// ============================================================================

/**
 * A condition for determining which answer set to display
 * Uses 'answerRule' type for backward compatibility with existing data
 */
export interface AnswerSetCondition {
  type: 'answerRule';
  id: string;
  previousQuestionId: string;
  previousAnswerSetId: string;
  operator: AnswerLevelOperator;
  previousAnswerId: string;
  selectedAnswerSetId: string;
}

/**
 * A group of answer set conditions with AND/OR logic
 */
export interface AnswerSetConditionGroup<TAnswerSet = unknown> {
  type: 'group';
  id: string;
  matchType: ConditionMatchType;
  children: Array<AnswerSetConditionGroup<TAnswerSet> | AnswerSetCondition>;
  inlineAnswerSet?: TAnswerSet;
}

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Creates an empty dynamic value condition group
 */
export const createEmptyDynamicValueConditionGroup = (): DynamicValueConditionGroup => ({
  type: 'group',
  id: `group-${Date.now()}`,
  matchType: 'AND',
  children: []
});

/**
 * Creates an empty dynamic value condition
 */
export const createEmptyDynamicValueCondition = (): DynamicValueCondition => ({
  type: 'filter',
  id: `filter-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
  field: '',
  operator: 'equals',
  value: ''
});

/**
 * Creates an empty question condition group
 */
export const createEmptyQuestionConditionGroup = (): QuestionConditionGroup => ({
  type: 'group',
  id: `g-${Date.now()}`,
  matchType: 'AND',
  children: []
});

/**
 * Creates an empty question condition
 */
export const createEmptyQuestionCondition = (): QuestionCondition => ({
  type: 'rule',
  id: `r-${Date.now()}`,
  sourceQuestionId: '',
  sourceAnswerSetId: '',
  operator: 'equals',
  sourceAnswerId: ''
});

/**
 * Creates an empty answer set condition
 */
export const createEmptyAnswerSetCondition = (): AnswerSetCondition => ({
  type: 'answerRule',
  id: `ar-${Date.now()}`,
  previousQuestionId: '',
  previousAnswerSetId: '',
  operator: 'equals',
  previousAnswerId: '',
  selectedAnswerSetId: ''
});

// ============================================================================
// Type Aliases for Backward Compatibility
// These aliases map the old naming to the new unified naming
// ============================================================================

/** @deprecated Use DynamicValueCondition instead */
export type DynamicValueFilter = DynamicValueCondition;

/** @deprecated Use DynamicValueConditionGroup instead */
export type DynamicValueFilterGroup = DynamicValueConditionGroup;

/** @deprecated Use ConditionOperator instead */
export type DynamicValueOperator = ConditionOperator;

/** @deprecated Use QuestionCondition instead */
export type QuestionLevelRule = QuestionCondition;

/** @deprecated Use AnswerSetCondition instead */
export type AnswerLevelRule = AnswerSetCondition;

/** @deprecated Use QuestionConditionGroup instead */
export type RuleGroup = QuestionConditionGroup;

/** @deprecated Use AnswerSetConditionGroup instead */
export type AnswerLevelRuleGroup<T = unknown> = AnswerSetConditionGroup<T>;
