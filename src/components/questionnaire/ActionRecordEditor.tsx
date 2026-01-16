import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp, Zap, Trash2 } from "lucide-react";
import { ActionRecord, ImpactLevel, UrgencyLevel } from "@/types/questionnaire";
import { useState } from "react";

interface ActionRecordEditorProps {
  actionRecord?: ActionRecord;
  onUpdate: (actionRecord: ActionRecord | undefined) => void;
}

const IMPACT_OPTIONS: { value: ImpactLevel; label: string }[] = [
  { value: '1', label: '1 - Extensive / Widespread' },
  { value: '2', label: '2 - Significant / Large' },
  { value: '3', label: '3 - Moderate / Limited' },
  { value: '4', label: '4 - Minor / Localized' },
];

const URGENCY_OPTIONS: { value: UrgencyLevel; label: string }[] = [
  { value: '1', label: '1 - Critical' },
  { value: '2', label: '2 - High' },
  { value: '3', label: '3 - Medium' },
  { value: '4', label: '4 - Low' },
];

const createEmptyActionRecord = (): ActionRecord => ({
  operationCategoryTier1: '',
  operationCategoryTier2: '',
  operationCategoryTier3: '',
  productCategoryTier1: '',
  productCategoryTier2: '',
  productCategoryTier3: '',
  impact: '',
  urgency: '',
});

const ActionRecordEditor = ({ actionRecord, onUpdate }: ActionRecordEditorProps) => {
  const [isOpen, setIsOpen] = useState(!!actionRecord);

  const handleAddAction = () => {
    onUpdate(createEmptyActionRecord());
    setIsOpen(true);
  };

  const handleRemoveAction = () => {
    onUpdate(undefined);
    setIsOpen(false);
  };

  const handleFieldChange = (field: keyof ActionRecord, value: string) => {
    if (!actionRecord) return;
    onUpdate({ ...actionRecord, [field]: value });
  };

  if (!actionRecord) {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={handleAddAction}
        className="w-full mt-2"
      >
        <Zap className="h-4 w-4 mr-1" />
        Attach Action Record
      </Button>
    );
  }

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="mt-2">
      <CollapsibleTrigger asChild>
        <div className="flex items-center justify-between p-2 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-md cursor-pointer hover:bg-amber-100 dark:hover:bg-amber-950/50 transition-colors">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            <span className="text-sm font-medium text-amber-700 dark:text-amber-300">Action Record</span>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 text-destructive hover:text-destructive"
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveAction();
              }}
            >
              <Trash2 className="h-3 w-3" />
            </Button>
            {isOpen ? (
              <ChevronUp className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            ) : (
              <ChevronDown className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            )}
          </div>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="p-3 border border-t-0 border-amber-200 dark:border-amber-800 rounded-b-md space-y-4 bg-amber-50/50 dark:bg-amber-950/20">
          {/* Operation Category */}
          <div className="space-y-2">
            <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Operation Category</Label>
            <div className="grid gap-2 sm:grid-cols-3">
              <div className="space-y-1">
                <Label className="text-xs">Tier 1</Label>
                <Input
                  placeholder="Tier 1"
                  value={actionRecord.operationCategoryTier1}
                  onChange={(e) => handleFieldChange('operationCategoryTier1', e.target.value)}
                  className="h-8 text-sm"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Tier 2</Label>
                <Input
                  placeholder="Tier 2"
                  value={actionRecord.operationCategoryTier2}
                  onChange={(e) => handleFieldChange('operationCategoryTier2', e.target.value)}
                  className="h-8 text-sm"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Tier 3</Label>
                <Input
                  placeholder="Tier 3"
                  value={actionRecord.operationCategoryTier3}
                  onChange={(e) => handleFieldChange('operationCategoryTier3', e.target.value)}
                  className="h-8 text-sm"
                />
              </div>
            </div>
          </div>

          {/* Product Category */}
          <div className="space-y-2">
            <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Product Category</Label>
            <div className="grid gap-2 sm:grid-cols-3">
              <div className="space-y-1">
                <Label className="text-xs">Tier 1</Label>
                <Input
                  placeholder="Tier 1"
                  value={actionRecord.productCategoryTier1}
                  onChange={(e) => handleFieldChange('productCategoryTier1', e.target.value)}
                  className="h-8 text-sm"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Tier 2</Label>
                <Input
                  placeholder="Tier 2"
                  value={actionRecord.productCategoryTier2}
                  onChange={(e) => handleFieldChange('productCategoryTier2', e.target.value)}
                  className="h-8 text-sm"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Tier 3</Label>
                <Input
                  placeholder="Tier 3"
                  value={actionRecord.productCategoryTier3}
                  onChange={(e) => handleFieldChange('productCategoryTier3', e.target.value)}
                  className="h-8 text-sm"
                />
              </div>
            </div>
          </div>

          {/* Impact & Urgency */}
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1">
              <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Impact</Label>
              <Select
                value={actionRecord.impact}
                onValueChange={(value) => handleFieldChange('impact', value)}
              >
                <SelectTrigger className="h-8 text-sm">
                  <SelectValue placeholder="Select impact level" />
                </SelectTrigger>
                <SelectContent>
                  {IMPACT_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Urgency</Label>
              <Select
                value={actionRecord.urgency}
                onValueChange={(value) => handleFieldChange('urgency', value)}
              >
                <SelectTrigger className="h-8 text-sm">
                  <SelectValue placeholder="Select urgency level" />
                </SelectTrigger>
                <SelectContent>
                  {URGENCY_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default ActionRecordEditor;
