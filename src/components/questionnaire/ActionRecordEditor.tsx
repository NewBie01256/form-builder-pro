import { useState } from "react";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Zap, Pencil } from "lucide-react";
import { ActionRecord, ImpactLevel, UrgencyLevel } from "@/types/questionnaire";

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
  const [isOpen, setIsOpen] = useState(false);
  const [localRecord, setLocalRecord] = useState<ActionRecord>(
    actionRecord || createEmptyActionRecord()
  );

  const handleOpen = (open: boolean) => {
    if (open) {
      setLocalRecord(actionRecord || createEmptyActionRecord());
    }
    setIsOpen(open);
  };

  const handleSave = () => {
    onUpdate(localRecord);
    setIsOpen(false);
  };

  const handleRemove = () => {
    onUpdate(undefined);
    setIsOpen(false);
  };

  const handleFieldChange = (field: keyof ActionRecord, value: string) => {
    setLocalRecord(prev => ({ ...prev, [field]: value }));
  };

  const hasAction = !!actionRecord;

  return (
    <Dialog open={isOpen} onOpenChange={handleOpen}>
      <DialogTrigger asChild>
        {hasAction ? (
          <Button
            variant="ghost"
            size="sm"
            className="h-7 w-7 p-0 text-amber-500 hover:text-amber-600 hover:bg-amber-50"
          >
            <Pencil className="h-3.5 w-3.5" />
          </Button>
        ) : (
          <Button
            variant="ghost"
            size="sm"
            className="h-7 px-2 text-muted-foreground hover:text-amber-600"
          >
            <Zap className="h-3.5 w-3.5 mr-1" />
            Action
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-amber-500" />
            {hasAction ? 'Edit Action Record' : 'Attach Action Record'}
          </DialogTitle>
          <DialogDescription>
            Configure the action record details for this answer.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Operation Category */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Operation Category
            </Label>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="space-y-1.5">
                <Label className="text-xs">Tier 1</Label>
                <Input
                  placeholder="Tier 1"
                  value={localRecord.operationCategoryTier1}
                  onChange={(e) => handleFieldChange('operationCategoryTier1', e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Tier 2</Label>
                <Input
                  placeholder="Tier 2"
                  value={localRecord.operationCategoryTier2}
                  onChange={(e) => handleFieldChange('operationCategoryTier2', e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Tier 3</Label>
                <Input
                  placeholder="Tier 3"
                  value={localRecord.operationCategoryTier3}
                  onChange={(e) => handleFieldChange('operationCategoryTier3', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Product Category */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Product Category
            </Label>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="space-y-1.5">
                <Label className="text-xs">Tier 1</Label>
                <Input
                  placeholder="Tier 1"
                  value={localRecord.productCategoryTier1}
                  onChange={(e) => handleFieldChange('productCategoryTier1', e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Tier 2</Label>
                <Input
                  placeholder="Tier 2"
                  value={localRecord.productCategoryTier2}
                  onChange={(e) => handleFieldChange('productCategoryTier2', e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Tier 3</Label>
                <Input
                  placeholder="Tier 3"
                  value={localRecord.productCategoryTier3}
                  onChange={(e) => handleFieldChange('productCategoryTier3', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Impact & Urgency */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Impact
              </Label>
              <Select
                value={localRecord.impact}
                onValueChange={(value) => handleFieldChange('impact', value)}
              >
                <SelectTrigger>
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
            <div className="space-y-1.5">
              <Label className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Urgency
              </Label>
              <Select
                value={localRecord.urgency}
                onValueChange={(value) => handleFieldChange('urgency', value)}
              >
                <SelectTrigger>
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

        <DialogFooter className="flex-row gap-2 sm:justify-between">
          {hasAction && (
            <Button
              variant="destructive"
              onClick={handleRemove}
              className="mr-auto"
            >
              Remove Action
            </Button>
          )}
          <div className="flex gap-2 ml-auto">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              {hasAction ? 'Update' : 'Attach'} Action
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ActionRecordEditor;
