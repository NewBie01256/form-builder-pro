import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Question, Answer, QuestionType } from "@/types/questionnaire";

interface DynamicRuleValueInputProps {
  questionType: QuestionType;
  answers: Answer[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

/**
 * Renders the appropriate input type based on the source question type.
 * - Choice/Dropdown/RadioButton/MultiSelect → Dropdown of answers
 * - Text/TextArea → Text input
 * - Number/Decimal → Number input
 * - Date → Date input
 * - Boolean → Switch/Toggle
 * - Rating → Number input with constraints
 */
const DynamicRuleValueInput = ({
  questionType,
  answers,
  value,
  onChange,
  disabled = false,
  placeholder = "Enter value"
}: DynamicRuleValueInputProps) => {
  // Choice-based types show a dropdown of available answers
  const isChoiceType = ['Choice', 'Dropdown', 'MultiSelect', 'RadioButton'].includes(questionType);

  if (isChoiceType) {
    return (
      <Select
        value={value}
        onValueChange={onChange}
        disabled={disabled}
      >
        <SelectTrigger className="h-8 text-sm">
          <SelectValue placeholder="Select answer" />
        </SelectTrigger>
        <SelectContent>
          {answers.map(ans => (
            <SelectItem key={ans.id} value={ans.id}>
              {ans.label || 'Untitled Answer'}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }

  if (questionType === 'Text' || questionType === 'TextArea') {
    return (
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder={placeholder}
        className="h-8 text-sm"
      />
    );
  }

  if (questionType === 'Number') {
    return (
      <Input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder="Enter number"
        className="h-8 text-sm"
      />
    );
  }

  if (questionType === 'Decimal') {
    return (
      <Input
        type="number"
        step="0.01"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder="Enter decimal"
        className="h-8 text-sm"
      />
    );
  }

  if (questionType === 'Date') {
    return (
      <Input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="h-8 text-sm"
      />
    );
  }

  if (questionType === 'Boolean') {
    return (
      <div className="flex items-center gap-2 h-8">
        <Switch
          checked={value === 'true'}
          onCheckedChange={(checked) => onChange(checked ? 'true' : 'false')}
          disabled={disabled}
        />
        <Label className="text-sm text-muted-foreground">
          {value === 'true' ? 'Yes' : value === 'false' ? 'No' : 'Select'}
        </Label>
      </div>
    );
  }

  if (questionType === 'Rating') {
    return (
      <Input
        type="number"
        min={1}
        max={10}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder="Enter rating"
        className="h-8 text-sm"
      />
    );
  }

  // Default fallback: text input
  return (
    <Input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      placeholder={placeholder}
      className="h-8 text-sm"
    />
  );
};

export default DynamicRuleValueInput;
