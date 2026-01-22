import { Question, AnswerSet } from "@/types/questionnaire";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Star, Heart, ThumbsUp, Smile, Meh, Frown } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuestionRendererProps {
  question: Question;
  value: string | string[] | number | boolean | null;
  onChange: (value: string | string[] | number | boolean | null) => void;
  activeAnswerSet?: AnswerSet | null;
}

const getDefaultAnswerSet = (question: Question): AnswerSet | null => {
  if (question.answerSets.length === 0) return null;
  return question.answerSets.find((as) => as.isDefault) || question.answerSets[0];
};

const QuestionRenderer = ({ question, value, onChange, activeAnswerSet }: QuestionRendererProps) => {
  // Use the provided activeAnswerSet (from rule evaluation) or fall back to default
  const answerSet = activeAnswerSet ?? getDefaultAnswerSet(question);
  const activeAnswers = answerSet?.answers.filter((a) => a.active) || [];

  const renderChoiceQuestion = () => (
    <RadioGroup
      value={value as string || ""}
      onValueChange={onChange}
      className="space-y-2"
    >
      {activeAnswers.map((answer) => (
        <div key={answer.id} className="flex items-center space-x-2">
          <RadioGroupItem value={answer.value} id={answer.id} />
          <Label htmlFor={answer.id} className="cursor-pointer">
            {answer.label}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );

  const renderRadioButtonQuestion = () => (
    <div className="flex flex-wrap gap-2">
      {activeAnswers.map((answer) => (
        <button
          key={answer.id}
          type="button"
          onClick={() => onChange(answer.value)}
          className={cn(
            "px-4 py-2 rounded-lg border transition-colors",
            value === answer.value
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-background border-border hover:bg-accent"
          )}
        >
          {answer.label}
        </button>
      ))}
    </div>
  );

  const renderDropdownQuestion = () => (
    <Select value={value as string || ""} onValueChange={onChange}>
      <SelectTrigger className="w-full max-w-md">
        <SelectValue placeholder="Select an option..." />
      </SelectTrigger>
      <SelectContent>
        {activeAnswers.map((answer) => (
          <SelectItem key={answer.id} value={answer.value}>
            {answer.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );

  const renderMultiSelectQuestion = () => {
    const selectedValues = Array.isArray(value) ? value : [];
    
    const handleToggle = (answerValue: string) => {
      if (selectedValues.includes(answerValue)) {
        onChange(selectedValues.filter((v) => v !== answerValue));
      } else {
        onChange([...selectedValues, answerValue]);
      }
    };

    return (
      <div className="space-y-2">
        {activeAnswers.map((answer) => (
          <div key={answer.id} className="flex items-center space-x-2">
            <Checkbox
              id={answer.id}
              checked={selectedValues.includes(answer.value)}
              onCheckedChange={() => handleToggle(answer.value)}
            />
            <Label htmlFor={answer.id} className="cursor-pointer">
              {answer.label}
            </Label>
          </div>
        ))}
      </div>
    );
  };

  const renderTextQuestion = () => (
    <Input
      type="text"
      value={value as string || ""}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Enter your answer..."
      className="max-w-md"
    />
  );

  const renderTextAreaQuestion = () => (
    <Textarea
      value={value as string || ""}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Enter your answer..."
      className="min-h-[100px] max-w-lg"
    />
  );

  const renderNumberQuestion = () => {
    const config = question.numberConfig;
    return (
      <Input
        type="number"
        value={value as number || ""}
        onChange={(e) => onChange(e.target.value ? Number(e.target.value) : null)}
        min={config?.min}
        max={config?.max}
        step={config?.step || 1}
        placeholder="Enter a number..."
        className="max-w-xs"
      />
    );
  };

  const renderDecimalQuestion = () => (
    <Input
      type="number"
      step="0.01"
      value={value as number || ""}
      onChange={(e) => onChange(e.target.value ? Number(e.target.value) : null)}
      placeholder="Enter a decimal number..."
      className="max-w-xs"
    />
  );

  const renderDateQuestion = () => {
    const config = question.dateConfig;
    return (
      <Input
        type="date"
        value={value as string || ""}
        onChange={(e) => onChange(e.target.value)}
        min={config?.minDate}
        max={config?.maxDate}
        className="max-w-xs"
      />
    );
  };

  const renderBooleanQuestion = () => (
    <div className="flex items-center space-x-3">
      <Switch
        checked={value === true}
        onCheckedChange={(checked) => onChange(checked)}
      />
      <Label>{value === true ? "Yes" : value === false ? "No" : "Not answered"}</Label>
    </div>
  );

  const renderRatingQuestion = () => {
    const config = question.ratingConfig || { minValue: 1, maxValue: 5 };
    const style = answerSet?.ratingDisplayStyle || "numbers";
    const currentValue = typeof value === "number" ? value : 0;

    const renderIcon = (index: number, filled: boolean) => {
      const iconClass = cn(
        "h-8 w-8 cursor-pointer transition-colors",
        filled ? "text-primary fill-primary" : "text-muted-foreground"
      );

      switch (style) {
        case "stars":
          return <Star className={iconClass} />;
        case "hearts":
          return <Heart className={iconClass} />;
        case "thumbs":
          return <ThumbsUp className={iconClass} />;
        case "smileys":
          if (index <= Math.floor((config.maxValue - config.minValue) / 3)) {
            return <Frown className={iconClass} />;
          } else if (index <= Math.floor((2 * (config.maxValue - config.minValue)) / 3)) {
            return <Meh className={iconClass} />;
          }
          return <Smile className={iconClass} />;
        default:
          return null;
      }
    };

    if (style === "numbers") {
      return (
        <div className="flex items-center gap-2">
          {config.minLabel && (
            <span className="text-sm text-muted-foreground">{config.minLabel}</span>
          )}
          <div className="flex gap-1">
            {Array.from(
              { length: config.maxValue - config.minValue + 1 },
              (_, i) => config.minValue + i
            ).map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => onChange(num)}
                className={cn(
                  "w-10 h-10 rounded-lg border flex items-center justify-center font-medium transition-colors",
                  currentValue === num
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background border-border hover:bg-accent"
                )}
              >
                {num}
              </button>
            ))}
          </div>
          {config.maxLabel && (
            <span className="text-sm text-muted-foreground">{config.maxLabel}</span>
          )}
        </div>
      );
    }

    return (
      <div className="flex items-center gap-2">
        {config.minLabel && (
          <span className="text-sm text-muted-foreground">{config.minLabel}</span>
        )}
        <div className="flex gap-1">
          {Array.from(
            { length: config.maxValue - config.minValue + 1 },
            (_, i) => config.minValue + i
          ).map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => onChange(num)}
              className="p-1"
            >
              {renderIcon(num - config.minValue, num <= currentValue)}
            </button>
          ))}
        </div>
        {config.maxLabel && (
          <span className="text-sm text-muted-foreground">{config.maxLabel}</span>
        )}
      </div>
    );
  };

  const renderDocumentQuestion = () => (
    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center max-w-md">
      <p className="text-muted-foreground mb-2">
        File upload is not available in this preview
      </p>
      <Input
        type="text"
        value={value as string || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter file reference..."
      />
    </div>
  );

  const renderDownloadableDocument = () => (
    <div className="p-4 bg-muted/50 rounded-lg max-w-md">
      <p className="text-sm text-muted-foreground">
        {answerSet?.downloadableFileName || "Document available for download"}
      </p>
      {answerSet?.downloadableFileUrl && (
        <a
          href={answerSet.downloadableFileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline text-sm"
        >
          Download
        </a>
      )}
    </div>
  );

  const renderers: Record<string, () => JSX.Element> = {
    Choice: renderChoiceQuestion,
    RadioButton: renderRadioButtonQuestion,
    Dropdown: renderDropdownQuestion,
    MultiSelect: renderMultiSelectQuestion,
    Text: renderTextQuestion,
    TextArea: renderTextAreaQuestion,
    Number: renderNumberQuestion,
    Decimal: renderDecimalQuestion,
    Date: renderDateQuestion,
    Boolean: renderBooleanQuestion,
    Rating: renderRatingQuestion,
    Document: renderDocumentQuestion,
    DownloadableDocument: renderDownloadableDocument,
  };

  const renderer = renderers[question.type];
  if (!renderer) {
    return <p className="text-muted-foreground">Unsupported question type: {question.type}</p>;
  }

  return (
    <div className="space-y-3">
      <div className="flex items-start gap-2">
        <span className="font-medium">{question.text}</span>
        {question.required && <span className="text-destructive">*</span>}
      </div>
      {renderer()}
    </div>
  );
};

export default QuestionRenderer;
