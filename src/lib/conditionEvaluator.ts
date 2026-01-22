import { 
  RuleGroup, 
  QuestionLevelRule, 
  AnswerLevelOperator,
  Question,
  ConditionalBranch 
} from "@/types/questionnaire";

type ResponseValue = string | string[] | number | boolean | null;
type ResponseMap = Record<string, ResponseValue>;

/**
 * Evaluates a single rule against the current responses
 */
const evaluateRule = (
  rule: QuestionLevelRule,
  responses: ResponseMap,
  allQuestions: Question[]
): boolean => {
  const sourceQuestion = allQuestions.find(q => q.id === rule.sourceQuestionId);
  if (!sourceQuestion) return false;

  const responseValue = responses[rule.sourceQuestionId];
  if (responseValue === undefined || responseValue === null) return false;

  // Find the answer set and answer to get the comparison value
  const answerSet = sourceQuestion.answerSets.find(as => as.id === rule.sourceAnswerSetId);
  const targetAnswer = answerSet?.answers.find(a => a.id === rule.sourceAnswerId);
  const targetValue = targetAnswer?.value ?? rule.sourceAnswerId;

  return evaluateOperator(rule.operator, responseValue, targetValue);
};

/**
 * Evaluates an operator comparison
 */
const evaluateOperator = (
  operator: AnswerLevelOperator,
  responseValue: ResponseValue,
  targetValue: string
): boolean => {
  // Handle array responses (MultiSelect)
  if (Array.isArray(responseValue)) {
    switch (operator) {
      case 'equals':
        return responseValue.includes(targetValue);
      case 'not_equals':
        return !responseValue.includes(targetValue);
      case 'contains':
        return responseValue.some(v => v.includes(targetValue));
      case 'not_contains':
        return !responseValue.some(v => v.includes(targetValue));
      default:
        return false;
    }
  }

  const stringValue = String(responseValue);
  const numValue = Number(responseValue);
  const targetNum = Number(targetValue);

  switch (operator) {
    case 'equals':
      return stringValue === targetValue;
    case 'not_equals':
      return stringValue !== targetValue;
    case 'greater_than':
      return !isNaN(numValue) && !isNaN(targetNum) && numValue > targetNum;
    case 'less_than':
      return !isNaN(numValue) && !isNaN(targetNum) && numValue < targetNum;
    case 'contains':
      return stringValue.includes(targetValue);
    case 'not_contains':
      return !stringValue.includes(targetValue);
    case 'starts_with':
      return stringValue.startsWith(targetValue);
    case 'ends_with':
      return stringValue.endsWith(targetValue);
    default:
      return false;
  }
};

/**
 * Recursively evaluates a rule group (AND/OR logic)
 */
const evaluateRuleGroup = (
  ruleGroup: RuleGroup,
  responses: ResponseMap,
  allQuestions: Question[]
): boolean => {
  if (!ruleGroup.children || ruleGroup.children.length === 0) {
    // No rules means always visible
    return true;
  }

  const results = ruleGroup.children.map(child => {
    if (child.type === 'group') {
      return evaluateRuleGroup(child, responses, allQuestions);
    } else if (child.type === 'rule') {
      return evaluateRule(child, responses, allQuestions);
    }
    return true;
  });

  if (ruleGroup.matchType === 'AND') {
    return results.every(r => r === true);
  } else {
    return results.some(r => r === true);
  }
};

/**
 * Determines if a question should be visible based on its questionLevelRuleGroup
 */
export const isQuestionVisible = (
  question: Question,
  responses: ResponseMap,
  allQuestions: Question[]
): boolean => {
  // If question is explicitly hidden, don't show
  if (question.hidden) return false;

  // If no rule group or empty, show the question
  if (!question.questionLevelRuleGroup || 
      !question.questionLevelRuleGroup.children || 
      question.questionLevelRuleGroup.children.length === 0) {
    return true;
  }

  return evaluateRuleGroup(question.questionLevelRuleGroup, responses, allQuestions);
};

/**
 * Determines if a branch should be visible based on its ruleGroup
 */
export const isBranchVisible = (
  branch: ConditionalBranch,
  responses: ResponseMap,
  allQuestions: Question[]
): boolean => {
  // If no rule group or empty, show the branch
  if (!branch.ruleGroup || 
      !branch.ruleGroup.children || 
      branch.ruleGroup.children.length === 0) {
    return true;
  }

  return evaluateRuleGroup(branch.ruleGroup, responses, allQuestions);
};

/**
 * Gets all visible questions from a page considering conditional logic
 */
export const getVisibleQuestionsForPage = (
  questions: Question[],
  responses: ResponseMap,
  allQuestions: Question[]
): Question[] => {
  return questions.filter(q => isQuestionVisible(q, responses, allQuestions));
};
