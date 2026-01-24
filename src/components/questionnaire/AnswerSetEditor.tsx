import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Plus, Library, Zap, Database, Table2, ArrowUpDown, Filter, Pencil, FileUp, Trash2 } from "lucide-react";
import { AnswerSet, Answer, QuestionType, TextValidationType, TextAreaFormat } from "@/types/questionnaire";
import ActionRecordEditor from "./ActionRecordEditor";
import DynamicValuesPanel, { DynamicValueConfig, DynamicValueFilterGroup } from "./DynamicValuesPanel";
import RichTextEditor from "@/components/ui/rich-text-editor";
import { RequiredLabel } from "@/components/ui/required-label";

interface AnswerSetEditorProps {
  answerSet: AnswerSet;
  onUpdate: (updated: AnswerSet) => void;
  onAddFromExisting?: () => void;
  questionType?: QuestionType;
  textValidationType?: TextValidationType;
  onTextValidationChange?: (validationType: TextValidationType) => void;
  textAreaFormat?: TextAreaFormat;
  onTextAreaFormatChange?: (format: TextAreaFormat) => void;
}

// Validation patterns
const TEXT_VALIDATION_PATTERNS: Record<TextValidationType, { pattern: RegExp; example: string }> = {
  none: { pattern: /.*/, example: '' },
  cost_center: { pattern: /^\d{5}-\d{4}$/, example: '00000-0000' },
  email: { pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, example: 'someone@domain.com' },
  ip_address: { pattern: /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/, example: '127.0.0.1' },
  phone: { pattern: /^\d{1}-\d{3}-\d{3}-\d{4}$/, example: '0-000-000-0000' },
  url: { pattern: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/, example: 'http://domain.com' },
};

const AnswerSetEditor = ({ answerSet, onUpdate, onAddFromExisting, questionType = 'Choice', textValidationType = 'none', onTextValidationChange, textAreaFormat = 'plain', onTextAreaFormatChange }: AnswerSetEditorProps) => {
  const [showDynamicPanel, setShowDynamicPanel] = useState(false);
  
  // Use answerSet's stored values instead of local state
  const dynamicValues = answerSet.dynamicValues ?? false;
  const dynamicConfig = answerSet.dynamicConfig;
  
  // Types that don't need the full answer set UI
  const isSimpleType = ['Text', 'TextArea', 'Number', 'Decimal', 'Date', 'Rating', 'Boolean', 'Document', 'DownloadableDocument'].includes(questionType);
  // Types that use the choice-based answer set UI
  const isChoiceType = ['Choice', 'Dropdown', 'MultiSelect', 'RadioButton'].includes(questionType);

  const addAnswer = () => {
    const newAnswer: Answer = {
      id: `ans-${Date.now()}`,
      label: '',
      value: '',
      active: false
    };
    onUpdate({ ...answerSet, answers: [...answerSet.answers, newAnswer] });
  };

  const updateAnswer = (answerId: string, updated: Partial<Answer>) => {
    // For Choice and Dropdown types, only one answer can be active at a time
    if (updated.active === true && (questionType === 'Choice' || questionType === 'Dropdown')) {
      onUpdate({
        ...answerSet,
        answers: answerSet.answers.map(a => 
          a.id === answerId 
            ? { ...a, ...updated } 
            : { ...a, active: false }
        )
      });
    } else {
      onUpdate({
        ...answerSet,
        answers: answerSet.answers.map(a => a.id === answerId ? { ...a, ...updated } : a)
      });
    }
  };

  const removeAnswer = (answerId: string) => {
    onUpdate({
      ...answerSet,
      answers: answerSet.answers.filter(a => a.id !== answerId)
    });
  };

  // For simple types, ensure there's always exactly one answer
  const simpleAnswer = answerSet.answers[0] || { id: `ans-${Date.now()}`, label: '', value: '', active: true };

  const updateSimpleAnswer = (value: string, label: string) => {
    if (answerSet.answers.length === 0) {
      onUpdate({ 
        ...answerSet, 
        answers: [{ id: `ans-${Date.now()}`, label, value, active: true }] 
      });
    } else {
      onUpdate({
        ...answerSet,
        answers: [{ ...answerSet.answers[0], value, label }]
      });
    }
  };

  const getSimpleTypeLabel = () => {
    switch (questionType) {
      case 'Text': return 'Default Text Answer';
      case 'TextArea': return textAreaFormat === 'rich' ? 'Default Rich Text Content' : 'Default Text Area Content';
      case 'Number': return 'Default Number Value';
      case 'Decimal': return 'Default Decimal Value';
      case 'Date': return 'Default Date Value';
      case 'Rating': return 'Default Rating Value';
      case 'Boolean': return 'Default Boolean Value';
      case 'Document': return 'File Attachment Configuration';
      case 'DownloadableDocument': return 'Downloadable Document Configuration';
      default: return 'Default Value';
    }
  };

  const getSimpleTypePlaceholder = () => {
    switch (questionType) {
      case 'Text': return 'Enter default text response (optional)';
      case 'TextArea': return textAreaFormat === 'rich' ? 'Enter default rich text content (optional)' : 'Enter default text area content (optional)';
      case 'Number': return 'Enter default number (optional)';
      case 'Decimal': return 'Enter default decimal (optional)';
      case 'Date': return 'Select default date (optional)';
      case 'Rating': return 'Enter default rating (optional)';
      default: return 'Enter default value (optional)';
    }
  };

  // Helper to count total filters in a group (including nested)
  const countFilters = (group: DynamicValueFilterGroup): number => {
    return group.children.reduce((count, child) => {
      if (child.type === 'filter') return count + 1;
      return count + countFilters(child);
    }, 0);
  };

  // Text validation helper
  const getTextValidationError = (): string | null => {
    if (questionType !== 'Text' || textValidationType === 'none' || !simpleAnswer.value) {
      return null;
    }
    const validation = TEXT_VALIDATION_PATTERNS[textValidationType];
    if (!validation.pattern.test(simpleAnswer.value)) {
      return `Invalid format. Expected: ${validation.example}`;
    }
    return null;
  };

  const textValidationError = getTextValidationError();

  // For simple types, show a minimal UI
  if (isSimpleType) {
    return (
      <div className="border border-border rounded-lg p-4 bg-muted/30">
        {/* Answer Set Name and Tag - consistent across all types */}
        <div className="grid gap-3 sm:grid-cols-2 mb-4">
          <div className="space-y-2">
            <RequiredLabel>Set Name</RequiredLabel>
            <Input
              placeholder="Answer Set Name"
              value={answerSet.name}
              onChange={(e) => onUpdate({ ...answerSet, name: e.target.value })}
              className={!answerSet.name.trim() ? "border-destructive" : ""}
            />
          </div>
          <div className="space-y-2">
            <RequiredLabel>Tag</RequiredLabel>
            <Input
              placeholder="Tag"
              value={answerSet.tag}
              onChange={(e) => onUpdate({ ...answerSet, tag: e.target.value })}
              className={!answerSet.tag.trim() ? "border-destructive" : ""}
            />
          </div>
        </div>

        <div className="flex items-center space-x-2 mb-4">
          <Checkbox
            id={`default-simple-${answerSet.id}`}
            checked={answerSet.isDefault}
            onCheckedChange={(checked) => onUpdate({ ...answerSet, isDefault: !!checked })}
          />
          <Label htmlFor={`default-simple-${answerSet.id}`} className="text-sm font-normal">
            Is Default
          </Label>
        </div>

        <div className="space-y-2">
          {questionType === 'Text' ? (
            <div className="space-y-3">
              <Label className="text-sm font-medium">{getSimpleTypeLabel()}</Label>
              <Textarea
                placeholder={textValidationType !== 'none' 
                  ? `Format: ${TEXT_VALIDATION_PATTERNS[textValidationType].example}` 
                  : getSimpleTypePlaceholder()}
                value={simpleAnswer.value}
                onChange={(e) => updateSimpleAnswer(e.target.value, 'Text Response')}
                className={`min-h-[80px] ${textValidationError ? 'border-destructive focus-visible:ring-destructive' : ''}`}
              />
              {textValidationError && (
                <p className="text-xs text-destructive">{textValidationError}</p>
              )}
              <div className="flex items-center gap-2">
                <Label className="text-xs text-muted-foreground">Regular Expression</Label>
                <select
                  value={textValidationType || 'none'}
                  onChange={(e) => {
                    const value = e.target.value as TextValidationType;
                    if (onTextValidationChange) {
                      onTextValidationChange(value);
                    }
                  }}
                  className="h-7 px-2 text-xs border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer"
                >
                  <option value="none">None</option>
                  <option value="cost_center">Cost Center (00000-0000)</option>
                  <option value="email">Email (someone@domain.com)</option>
                  <option value="ip_address">IP Address (127.0.0.1)</option>
                  <option value="phone">Phone (0-000-000-0000)</option>
                  <option value="url">URL (http://domain.com)</option>
                </select>
              </div>
            </div>
          ) : questionType === 'TextArea' ? (
            <div className="space-y-3">
              <Label className="text-sm font-medium">{getSimpleTypeLabel()}</Label>
              {textAreaFormat === 'rich' ? (
                <RichTextEditor
                  value={simpleAnswer.value}
                  onChange={(value) => updateSimpleAnswer(value, 'Text Area Response')}
                  placeholder={getSimpleTypePlaceholder()}
                />
              ) : (
                <Textarea
                  placeholder={getSimpleTypePlaceholder()}
                  value={simpleAnswer.value}
                  onChange={(e) => updateSimpleAnswer(e.target.value, 'Text Area Response')}
                  className="min-h-[120px]"
                />
              )}
              <div className="flex items-center gap-2">
                <Label className="text-xs text-muted-foreground">Format</Label>
                <select
                  value={textAreaFormat || 'plain'}
                  onChange={(e) => {
                    const value = e.target.value as TextAreaFormat;
                    if (onTextAreaFormatChange) {
                      onTextAreaFormatChange(value);
                    }
                  }}
                  className="h-7 px-2 text-xs border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer"
                >
                  <option value="plain">Plain Text</option>
                  <option value="rich">Rich Text</option>
                </select>
              </div>
            </div>
          ) : questionType === 'Number' ? (
            <div className="space-y-3">
              <Label className="text-sm font-medium">{getSimpleTypeLabel()}</Label>
              <Input
                type="number"
                placeholder={getSimpleTypePlaceholder()}
                value={simpleAnswer.value}
                onChange={(e) => updateSimpleAnswer(e.target.value, 'Number Response')}
              />
              <div className="flex items-center gap-2">
                <Switch
                  id={`number-restriction-${answerSet.id}`}
                  checked={answerSet.numberRestriction ?? false}
                  onCheckedChange={(checked) => onUpdate({ ...answerSet, numberRestriction: checked })}
                />
                <Label htmlFor={`number-restriction-${answerSet.id}`} className="text-xs text-muted-foreground cursor-pointer">
                  Restriction
                </Label>
              </div>
              {answerSet.numberRestriction && (
                <div className="grid grid-cols-2 gap-3 pl-1">
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Min Value</Label>
                    <Input
                      type="number"
                      placeholder="No min"
                      value={answerSet.minValue ?? ''}
                      onChange={(e) => onUpdate({ ...answerSet, minValue: e.target.value ? Number(e.target.value) : undefined })}
                      className="h-8 text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Max Value</Label>
                    <Input
                      type="number"
                      placeholder="No max"
                      value={answerSet.maxValue ?? ''}
                      onChange={(e) => onUpdate({ ...answerSet, maxValue: e.target.value ? Number(e.target.value) : undefined })}
                      className="h-8 text-sm"
                    />
                  </div>
                </div>
              )}
            </div>
          ) : questionType === 'Decimal' ? (
            <div className="space-y-3">
              <Label className="text-sm font-medium">{getSimpleTypeLabel()}</Label>
              <Input
                type="number"
                step="0.01"
                placeholder={getSimpleTypePlaceholder()}
                value={simpleAnswer.value}
                onChange={(e) => updateSimpleAnswer(e.target.value, 'Decimal Response')}
              />
              <div className="flex items-center gap-2">
                <Switch
                  id={`decimal-restriction-${answerSet.id}`}
                  checked={answerSet.numberRestriction ?? false}
                  onCheckedChange={(checked) => onUpdate({ ...answerSet, numberRestriction: checked })}
                />
                <Label htmlFor={`decimal-restriction-${answerSet.id}`} className="text-xs text-muted-foreground cursor-pointer">
                  Restriction
                </Label>
              </div>
              {answerSet.numberRestriction && (
                <div className="grid grid-cols-2 gap-3 pl-1">
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Min Value</Label>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="No min"
                      value={answerSet.minValue ?? ''}
                      onChange={(e) => onUpdate({ ...answerSet, minValue: e.target.value ? Number(e.target.value) : undefined })}
                      className="h-8 text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Max Value</Label>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="No max"
                      value={answerSet.maxValue ?? ''}
                      onChange={(e) => onUpdate({ ...answerSet, maxValue: e.target.value ? Number(e.target.value) : undefined })}
                      className="h-8 text-sm"
                    />
                  </div>
                </div>
              )}
            </div>
          ) : questionType === 'Date' ? (
            <div className="space-y-3">
              <Label className="text-sm font-medium">{getSimpleTypeLabel()}</Label>
              <div className={`grid gap-3 ${answerSet.includeTime ? 'grid-cols-2' : 'grid-cols-1'}`}>
                <Input
                  type="date"
                  value={simpleAnswer.value?.split('T')[0] || simpleAnswer.value || ''}
                  onChange={(e) => {
                    const dateValue = e.target.value;
                    const timeValue = simpleAnswer.value?.split('T')[1] || '';
                    const newValue = answerSet.includeTime && timeValue 
                      ? `${dateValue}T${timeValue}` 
                      : dateValue;
                    updateSimpleAnswer(newValue, 'Date Response');
                  }}
                />
                {answerSet.includeTime && (
                  <Input
                    type="time"
                    value={simpleAnswer.value?.split('T')[1] || ''}
                    onChange={(e) => {
                      const timeValue = e.target.value;
                      const dateValue = simpleAnswer.value?.split('T')[0] || simpleAnswer.value || '';
                      const newValue = dateValue ? `${dateValue}T${timeValue}` : timeValue;
                      updateSimpleAnswer(newValue, 'Date Response');
                    }}
                  />
                )}
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Switch
                    id={`date-restriction-${answerSet.id}`}
                    checked={answerSet.dateRestriction ?? false}
                    onCheckedChange={(checked) => onUpdate({ ...answerSet, dateRestriction: checked })}
                  />
                  <Label htmlFor={`date-restriction-${answerSet.id}`} className="text-xs text-muted-foreground cursor-pointer">
                    Date Restriction
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    id={`include-time-${answerSet.id}`}
                    checked={answerSet.includeTime ?? false}
                    onCheckedChange={(checked) => onUpdate({ ...answerSet, includeTime: checked })}
                  />
                  <Label htmlFor={`include-time-${answerSet.id}`} className="text-xs text-muted-foreground cursor-pointer">
                    Time
                  </Label>
                </div>
              </div>
              {answerSet.dateRestriction && (
                <div className="grid grid-cols-2 gap-3 pl-1">
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Min Date</Label>
                    <Input
                      type="date"
                      value={answerSet.minDate ?? ''}
                      onChange={(e) => onUpdate({ ...answerSet, minDate: e.target.value })}
                      className="h-8 text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Max Date</Label>
                    <Input
                      type="date"
                      value={answerSet.maxDate ?? ''}
                      onChange={(e) => onUpdate({ ...answerSet, maxDate: e.target.value })}
                      className="h-8 text-sm"
                    />
                  </div>
                </div>
              )}
            </div>
          ) : questionType === 'Rating' ? (
            <div className="space-y-3">
              <Label className="text-sm font-medium">{getSimpleTypeLabel()}</Label>
              <Input
                type="number"
                placeholder={getSimpleTypePlaceholder()}
                min={answerSet.ratingMinValue ?? 1}
                max={answerSet.ratingMaxValue ?? 5}
                value={simpleAnswer.value}
                onChange={(e) => updateSimpleAnswer(e.target.value, 'Rating Response')}
              />
              <div className="flex items-center gap-2 mb-2">
                <Label className="text-xs text-muted-foreground">Display Style</Label>
                <select
                  value={answerSet.ratingDisplayStyle ?? 'numbers'}
                  onChange={(e) => onUpdate({ ...answerSet, ratingDisplayStyle: e.target.value as 'numbers' | 'stars' | 'smileys' | 'hearts' | 'thumbs' })}
                  className="h-7 px-2 text-xs border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer"
                >
                  <option value="numbers">Numbers (1, 2, 3...)</option>
                  <option value="stars">Stars (★)</option>
                  <option value="smileys">Smileys (😊)</option>
                  <option value="hearts">Hearts (❤️)</option>
                  <option value="thumbs">Thumbs (👍)</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">Min Value</Label>
                  <Input
                    type="number"
                    min="0"
                    value={answerSet.ratingMinValue ?? 1}
                    onChange={(e) => onUpdate({ ...answerSet, ratingMinValue: Number(e.target.value) || 1 })}
                    className="h-8 text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">Max Value</Label>
                  <Input
                    type="number"
                    min="1"
                    value={answerSet.ratingMaxValue ?? 5}
                    onChange={(e) => onUpdate({ ...answerSet, ratingMaxValue: Number(e.target.value) || 5 })}
                    className="h-8 text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">Min Label (optional)</Label>
                  <Input
                    placeholder="e.g., Poor"
                    value={answerSet.ratingMinLabel ?? ''}
                    onChange={(e) => onUpdate({ ...answerSet, ratingMinLabel: e.target.value || undefined })}
                    className="h-8 text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">Max Label (optional)</Label>
                  <Input
                    placeholder="e.g., Excellent"
                    value={answerSet.ratingMaxLabel ?? ''}
                    onChange={(e) => onUpdate({ ...answerSet, ratingMaxLabel: e.target.value || undefined })}
                    className="h-8 text-sm"
                  />
                </div>
              </div>
            </div>
          ) : questionType === 'Boolean' ? (
            <>
              <Label className="text-sm font-medium">{getSimpleTypeLabel()}</Label>
              <div className="flex items-center gap-3">
                <Switch
                  id={`boolean-${answerSet.id}`}
                  checked={simpleAnswer.value === 'true'}
                  onCheckedChange={(checked) => updateSimpleAnswer(checked ? 'true' : 'false', checked ? 'Yes' : 'No')}
                />
                <Label htmlFor={`boolean-${answerSet.id}`} className="text-sm font-normal">
                  {simpleAnswer.value === 'true' ? 'Yes (True)' : 'No (False)'}
                </Label>
              </div>
            </>
          ) : questionType === 'Document' ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <FileUp className="h-5 w-5 text-muted-foreground" />
                <Label className="text-sm font-medium">{getSimpleTypeLabel()}</Label>
              </div>
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Allowed File Types</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { value: 'pdf', label: 'PDF (.pdf)' },
                      { value: 'doc', label: 'Word (.doc, .docx)' },
                      { value: 'xls', label: 'Excel (.xls, .xlsx)' },
                      { value: 'ppt', label: 'PowerPoint (.ppt, .pptx)' },
                      { value: 'txt', label: 'Text (.txt)' },
                      { value: 'image', label: 'Images (.jpg, .png, .gif)' },
                    ].map((fileType) => (
                      <div key={fileType.value} className="flex items-center gap-2">
                        <Checkbox
                          id={`file-type-${answerSet.id}-${fileType.value}`}
                          checked={(answerSet.allowedFileTypes ?? ['pdf', 'doc', 'xls', 'ppt', 'txt', 'image']).includes(fileType.value)}
                          onCheckedChange={(checked) => {
                            const current = answerSet.allowedFileTypes ?? ['pdf', 'doc', 'xls', 'ppt', 'txt', 'image'];
                            const updated = checked 
                              ? [...current, fileType.value]
                              : current.filter(t => t !== fileType.value);
                            onUpdate({ ...answerSet, allowedFileTypes: updated });
                          }}
                        />
                        <Label htmlFor={`file-type-${answerSet.id}-${fileType.value}`} className="text-xs cursor-pointer">
                          {fileType.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">Max File Size (MB)</Label>
                    <Input
                      type="number"
                      min="1"
                      max="100"
                      placeholder="10"
                      value={answerSet.maxFileSize ?? 10}
                      onChange={(e) => onUpdate({ ...answerSet, maxFileSize: Number(e.target.value) || 10 })}
                      className="h-8 text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">Number of Files</Label>
                    <Input
                      type="number"
                      min="1"
                      max="20"
                      placeholder="3"
                      value={answerSet.maxFiles ?? 3}
                      onChange={(e) => onUpdate({ ...answerSet, maxFiles: Number(e.target.value) || 3 })}
                      className="h-8 text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : questionType === 'DownloadableDocument' ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <FileUp className="h-5 w-5 text-muted-foreground" />
                <Label className="text-sm font-medium">{getSimpleTypeLabel()}</Label>
              </div>
              <p className="text-xs text-muted-foreground">
                Upload a document that will be available for download by users completing this questionnaire.
              </p>
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Document Name</Label>
                  <Input
                    placeholder="Enter document display name"
                    value={answerSet.downloadableFileName ?? ''}
                    onChange={(e) => onUpdate({ ...answerSet, downloadableFileName: e.target.value })}
                    className="h-8 text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Attach Document</Label>
                  {!answerSet.downloadableFileUrl ? (
                    <div className="border-2 border-dashed border-border rounded-lg p-4 hover:border-primary/50 transition-colors">
                      <label className="flex flex-col items-center gap-2 cursor-pointer">
                        <FileUp className="h-8 w-8 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Click to upload a document</span>
                        <span className="text-xs text-muted-foreground">PDF, Word, Excel, PowerPoint, Text, or Images</span>
                        <Input
                          type="file"
                          accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.jpg,.jpeg,.png,.gif"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const url = URL.createObjectURL(file);
                              onUpdate({ 
                                ...answerSet, 
                                downloadableFileUrl: url,
                                downloadableFileName: answerSet.downloadableFileName || file.name,
                                downloadableFileType: file.type
                              });
                            }
                          }}
                        />
                      </label>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 p-3 bg-primary/5 border border-primary/20 rounded-lg">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <FileUp className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {answerSet.downloadableFileName || 'Uploaded document'}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {answerSet.downloadableFileType || 'Document attached'}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 px-3 text-xs"
                        onClick={() => onUpdate({ 
                          ...answerSet, 
                          downloadableFileUrl: undefined,
                          downloadableFileName: undefined,
                          downloadableFileType: undefined
                        })}
                      >
                        Remove
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  }

  // For Choice and MultiSelect types, show the full answer set UI
  return (
    <div className="border border-border rounded-lg p-4 bg-muted/30">
      <div className="flex items-center justify-between mb-3">
        <Label className="text-sm font-medium">
          Answer Set {questionType === 'MultiSelect' && <span className="text-muted-foreground">(Multiple selections allowed)</span>}
        </Label>
        <div className="flex items-center gap-3">
          {onAddFromExisting && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={onAddFromExisting}
            >
              <Library className="h-4 w-4 mr-1" />
              Add from Existing
            </Button>
          )}
          {isChoiceType && (
            <div className="flex items-center gap-2">
              <Switch
                id={`dynamic-${answerSet.id}`}
                checked={dynamicValues}
                onCheckedChange={(checked) => {
                  onUpdate({ ...answerSet, dynamicValues: checked });
                  if (checked) {
                    setShowDynamicPanel(true);
                  }
                }}
              />
              <Label htmlFor={`dynamic-${answerSet.id}`} className="text-sm font-normal cursor-pointer">
                Dynamic Values
              </Label>
              {dynamicValues && dynamicConfig?.tableName && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 px-2 text-xs"
                  onClick={() => setShowDynamicPanel(true)}
                >
                  <Database className="h-3 w-3 mr-1" />
                  {dynamicConfig.tableName}
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
      
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-2">
          <RequiredLabel>Set Name</RequiredLabel>
          <Input
            placeholder="Answer Set Name"
            value={answerSet.name}
            onChange={(e) => onUpdate({ ...answerSet, name: e.target.value })}
            className={!answerSet.name.trim() ? "border-destructive" : ""}
          />
        </div>
        <div className="space-y-2">
          <RequiredLabel>Tag</RequiredLabel>
          <Input
            placeholder="Tag"
            value={answerSet.tag}
            onChange={(e) => onUpdate({ ...answerSet, tag: e.target.value })}
            className={!answerSet.tag.trim() ? "border-destructive" : ""}
          />
        </div>
      </div>

      <div className="flex items-center space-x-2 mt-3">
        <Checkbox
          id={`default-${answerSet.id}`}
          checked={answerSet.isDefault}
          onCheckedChange={(checked) => onUpdate({ ...answerSet, isDefault: !!checked })}
        />
        <Label htmlFor={`default-${answerSet.id}`} className="text-sm font-normal">
          Is Default
        </Label>
      </div>

      {/* Answers Section - Show Dynamic Config Summary OR Regular Answers */}
      <div className="mt-4">
        {dynamicValues && dynamicConfig?.tableName ? (
          // Dynamic Values Summary Card
          <div className="border border-border rounded-lg bg-background">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30">
              <div className="flex items-center gap-2">
                <Database className="h-4 w-4 text-primary" />
                <Label className="text-sm font-medium">Dynamic Values</Label>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-7 text-xs"
                onClick={() => setShowDynamicPanel(true)}
              >
                <Pencil className="h-3 w-3 mr-1" />
                Edit
              </Button>
            </div>
            
            <div className="p-4 space-y-3">
              {/* Table Name */}
              <div className="flex items-center gap-3">
                <Table2 className="h-4 w-4 text-muted-foreground shrink-0" />
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Table:</span>
                  <Badge variant="secondary" className="font-mono text-xs">
                    {dynamicConfig.tableName}
                  </Badge>
                </div>
              </div>

              {/* Field Mappings */}
              <div className="flex items-center gap-3">
                <div className="h-4 w-4 shrink-0" /> {/* Spacer for alignment */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
                  <span className="text-muted-foreground">
                    Label: <span className="font-medium text-foreground">{dynamicConfig.labelField}</span>
                  </span>
                  <span className="text-muted-foreground">
                    Value: <span className="font-medium text-foreground">{dynamicConfig.valueField}</span>
                  </span>
                </div>
              </div>

              {/* Filters Summary */}
              {dynamicConfig.filterGroup.children.length > 0 && (
                <div className="flex items-start gap-3">
                  <Filter className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                  <div className="flex flex-wrap items-center gap-1">
                    <span className="text-sm text-muted-foreground">Filters:</span>
                    <Badge variant="outline" className="text-xs">
                      {countFilters(dynamicConfig.filterGroup)} condition{countFilters(dynamicConfig.filterGroup) !== 1 ? 's' : ''}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      ({dynamicConfig.filterGroup.matchType})
                    </span>
                  </div>
                </div>
              )}

              {/* Ordering */}
              {dynamicConfig.orderByField && (
                <div className="flex items-center gap-3">
                  <ArrowUpDown className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span className="text-sm text-muted-foreground">
                    Order by: <span className="font-medium text-foreground">{dynamicConfig.orderByField}</span>
                    <span className="text-xs ml-1">({dynamicConfig.orderDirection === 'asc' ? 'A → Z' : 'Z → A'})</span>
                  </span>
                </div>
              )}
            </div>
          </div>
        ) : (
          // Regular Static Answers
          <>
            <div className="flex items-center justify-between mb-2">
              <Label className="text-sm">Answers</Label>
              <Button variant="ghost" size="sm" onClick={addAnswer}>
                <Plus className="h-4 w-4 mr-1" />
                Add Answer
              </Button>
            </div>

            {answerSet.answers.length === 0 && (
              <p className="text-xs text-destructive mb-2">At least one answer is required</p>
            )}

            {questionType === 'RadioButton' ? (
              // Radio Button Display
              <div className="space-y-2">
                <RadioGroup className="space-y-2">
                  {answerSet.answers.map(ans => (
                    <div key={ans.id} className="flex items-center gap-3 p-3 bg-background rounded-md border border-border">
                      <RadioGroupItem value={ans.value} id={`radio-preview-${ans.id}`} disabled />
                      <div className="flex-1 grid grid-cols-2 gap-2">
                        <Input
                          placeholder="Label"
                          value={ans.label}
                          onChange={(e) => updateAnswer(ans.id, { label: e.target.value })}
                          className={`h-8 ${!ans.label.trim() ? "border-destructive" : ""}`}
                        />
                        <Input
                          placeholder="Value"
                          value={ans.value}
                          onChange={(e) => updateAnswer(ans.id, { value: e.target.value })}
                          className={`h-8 ${!ans.value.trim() ? "border-destructive" : ""}`}
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`active-${ans.id}`}
                          checked={ans.active}
                          onCheckedChange={(checked) => updateAnswer(ans.id, { active: !!checked })}
                        />
                        <Label htmlFor={`active-${ans.id}`} className="text-xs font-normal whitespace-nowrap">
                          Active
                        </Label>
                      </div>
                      {ans.actionRecord && (
                        <Zap className="h-4 w-4 text-amber-500 shrink-0" />
                      )}
                      <ActionRecordEditor
                        actionRecord={ans.actionRecord}
                        onUpdate={(actionRecord) => updateAnswer(ans.id, { actionRecord })}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive"
                        onClick={() => removeAnswer(ans.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            ) : (
              // Regular List Display for Choice/MultiSelect
              <div className="space-y-2">
                {answerSet.answers.map(ans => (
                  <div key={ans.id} className="flex items-center gap-2 p-2 bg-background rounded-md border border-border">
                    <Input
                      placeholder="Label"
                      value={ans.label}
                      onChange={(e) => updateAnswer(ans.id, { label: e.target.value })}
                      className={`flex-1 h-8 ${!ans.label.trim() ? "border-destructive" : ""}`}
                    />
                    <Input
                      placeholder="Value"
                      value={ans.value}
                      onChange={(e) => updateAnswer(ans.id, { value: e.target.value })}
                      className={`flex-1 h-8 ${!ans.value.trim() ? "border-destructive" : ""}`}
                    />
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`active-${ans.id}`}
                        checked={ans.active}
                        onCheckedChange={(checked) => updateAnswer(ans.id, { active: !!checked })}
                      />
                      <Label htmlFor={`active-${ans.id}`} className="text-xs font-normal whitespace-nowrap">
                        Active
                      </Label>
                    </div>
                    {ans.actionRecord && (
                      <Zap className="h-4 w-4 text-amber-500 shrink-0" />
                    )}
                    <ActionRecordEditor
                      actionRecord={ans.actionRecord}
                      onUpdate={(actionRecord) => updateAnswer(ans.id, { actionRecord })}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive"
                      onClick={() => removeAnswer(ans.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Dynamic Values Panel */}
      <DynamicValuesPanel
        isOpen={showDynamicPanel}
        onClose={() => setShowDynamicPanel(false)}
        config={dynamicConfig}
        onSave={(config) => {
          onUpdate({ ...answerSet, dynamicConfig: config, dynamicValues: true });
        }}
      />
    </div>
  );
};

export default AnswerSetEditor;
