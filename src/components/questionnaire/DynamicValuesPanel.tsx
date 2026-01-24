import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { X, Plus, Trash2, FolderPlus, Check, ChevronsUpDown, Database, Info, Code, Copy, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { generateFormattedFetchXml } from "@/lib/dataverse/fetchXmlGenerator";
import { generateFormattedOData } from "@/lib/dataverse/odataGenerator";
import {
  DATAVERSE_ENTITIES,
  DATAVERSE_OPERATORS,
  getEntityByLogicalName,
  getFilterableFields,
  type DataverseEntity,
  type DataverseField,
  type DataverseOperator,
} from "@/data/dataverseEntities";

// Re-export types from questionnaire.ts for backward compatibility
export type { DynamicValueFilter, DynamicValueFilterGroup, DynamicValueConfig, DynamicValueOperator } from "@/types/questionnaire";
import type { DynamicValueFilter, DynamicValueFilterGroup, DynamicValueConfig } from "@/types/questionnaire";

interface DynamicValuesPanelProps {
  isOpen: boolean;
  onClose: () => void;
  config?: DynamicValueConfig;
  onSave: (config: DynamicValueConfig) => void;
}

// Map internal operators to Dataverse operators for display
const OPERATORS = DATAVERSE_OPERATORS.map(op => ({
  value: op.value,
  label: op.label,
}));

const createEmptyConditionGroup = (): DynamicValueFilterGroup => ({
  type: 'group',
  id: `group-${Date.now()}`,
  matchType: 'AND',
  children: []
});

const createEmptyCondition = (): DynamicValueFilter => ({
  type: 'filter',
  id: `filter-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
  field: '',
  operator: 'equals',
  value: ''
});

// Recursive component for rendering filter groups - matching the table-based layout
interface FilterGroupEditorProps {
  group: DynamicValueFilterGroup;
  availableFields: DataverseField[];
  onUpdate: (updated: DynamicValueFilterGroup) => void;
  onDelete?: () => void;
  isRoot?: boolean;
}

const FilterGroupEditor = ({ group, availableFields, onUpdate, onDelete, isRoot = true }: FilterGroupEditorProps) => {
  const handleAddFilter = () => {
    onUpdate({
      ...group,
      children: [...group.children, createEmptyCondition()]
    });
  };

  const handleAddGroup = () => {
    onUpdate({
      ...group,
      children: [...group.children, createEmptyConditionGroup()]
    });
  };

  const handleUpdateChild = (childId: string, updated: DynamicValueFilter | DynamicValueFilterGroup) => {
    onUpdate({
      ...group,
      children: group.children.map(c => c.id === childId ? updated : c)
    });
  };

  const handleRemoveChild = (childId: string) => {
    onUpdate({
      ...group,
      children: group.children.filter(c => c.id !== childId)
    });
  };

  const handleMatchTypeChange = (matchType: 'AND' | 'OR') => {
    onUpdate({ ...group, matchType });
  };

  return (
    <div className="border border-border bg-card">
      {/* Header Row with AND/OR and Column Labels */}
      <div className="flex items-center border-b border-border bg-muted/30">
        <div className="flex items-center gap-2 px-3 py-2 min-w-[80px] border-r border-border">
          <Select value={group.matchType} onValueChange={(v) => handleMatchTypeChange(v as 'AND' | 'OR')}>
            <SelectTrigger className="h-7 w-16 text-xs font-medium">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="AND">AND</SelectItem>
              <SelectItem value="OR">OR</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex-1 grid grid-cols-3 gap-2 px-3 py-2">
          <span className="text-xs font-medium text-muted-foreground">Field</span>
          <span className="text-xs font-medium text-muted-foreground">Operator</span>
          <span className="text-xs font-medium text-muted-foreground">Value</span>
        </div>
        <div className="w-10 px-2 flex items-center justify-center">
          {!isRoot && onDelete && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive"
              onClick={onDelete}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Rules and Nested Groups */}
      <div className="relative">
        {group.children.length === 0 ? (
          <div className="flex items-center justify-center py-6 text-sm text-muted-foreground">
            No conditions. Use buttons below to add filters.
          </div>
        ) : (
          group.children.map((child, index) => (
            <div key={child.id} className="relative">
              {/* Tree connector lines */}
              <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />
              <div className="absolute left-4 top-1/2 w-4 h-px bg-border" />
              
              <div className="flex items-stretch border-b border-border last:border-b-0">
                {/* Left connector area */}
                <div className="w-8 flex items-center justify-center relative" />

                {child.type === 'group' ? (
                  <div className="flex-1 py-2 pr-2">
                    <FilterGroupEditor
                      group={child}
                      availableFields={availableFields}
                      onUpdate={(updated) => handleUpdateChild(child.id, updated)}
                      onDelete={() => handleRemoveChild(child.id)}
                      isRoot={false}
                    />
                  </div>
                ) : (
                  <>
                    {/* Filter Row */}
                    <div className="flex-1 grid grid-cols-3 gap-2 py-2 px-2">
                      <Select 
                        value={child.field || '__empty__'} 
                        onValueChange={(v) => handleUpdateChild(child.id, { ...child, field: v === '__empty__' ? '' : v })}
                      >
                        <SelectTrigger className="h-8 text-sm">
                          <SelectValue placeholder="Select field" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="__empty__" disabled>Select field...</SelectItem>
                          {availableFields.map(field => (
                            <SelectItem key={field.logicalName} value={field.logicalName}>
                              {field.displayName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <Select 
                        value={child.operator} 
                        onValueChange={(v) => handleUpdateChild(child.id, { ...child, operator: v as DynamicValueFilter['operator'] })}
                      >
                        <SelectTrigger className="h-8 text-sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {OPERATORS.map(op => (
                            <SelectItem key={op.value} value={op.value}>
                              {op.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      {!['null', 'not_null'].includes(child.operator) ? (
                        <Input
                          placeholder="Value"
                          value={child.value}
                          onChange={(e) => handleUpdateChild(child.id, { ...child, value: e.target.value })}
                          className="h-8"
                        />
                      ) : (
                        <div className="h-8" /> // Empty placeholder for alignment
                      )}
                    </div>

                    {/* Delete button */}
                    <div className="w-10 px-2 flex items-center justify-center">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive"
                        onClick={() => handleRemoveChild(child.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add buttons footer */}
      <div className="flex items-center gap-2 px-3 py-2 border-t border-border bg-muted/20">
        <Button variant="outline" size="sm" className="h-7 text-xs" onClick={handleAddFilter}>
          <Plus className="h-3 w-3 mr-1" />
          Add Filter
        </Button>
        <Button variant="outline" size="sm" className="h-7 text-xs" onClick={handleAddGroup}>
          <FolderPlus className="h-3 w-3 mr-1" />
          Add Group
        </Button>
      </div>
    </div>
  );
};

const DynamicValuesPanel = ({ isOpen, onClose, config, onSave }: DynamicValuesPanelProps) => {
  const [tableName, setTableName] = useState('');
  const [labelField, setLabelField] = useState('');
  const [valueField, setValueField] = useState('');
  const [conditionGroup, setConditionGroup] = useState<DynamicValueFilterGroup>(createEmptyConditionGroup());
  const [orderByField, setOrderByField] = useState('');
  const [orderDirection, setOrderDirection] = useState<'asc' | 'desc'>('asc');
  const [tableSearchOpen, setTableSearchOpen] = useState(false);

  // Sync state with config prop when panel opens or config changes
  // Support both 'conditionGroup' (new) and 'filterGroup' (legacy) for backward compatibility
  useEffect(() => {
    if (isOpen) {
      setTableName(config?.tableName || '');
      setLabelField(config?.labelField || '');
      setValueField(config?.valueField || '');
      setConditionGroup(config?.conditionGroup || config?.filterGroup || createEmptyConditionGroup());
      setOrderByField(config?.orderByField || '');
      setOrderDirection(config?.orderDirection || 'asc');
    }
  }, [isOpen, config]);

  const selectedEntity = getEntityByLogicalName(tableName);
  const availableFields = selectedEntity?.fields || [];

  const handleSave = () => {
    onSave({
      tableName,
      labelField,
      valueField,
      conditionGroup,
      orderByField: orderByField || undefined,
      orderDirection
    });
    onClose();
  };

  const handleTableChange = (newTable: string) => {
    setTableName(newTable);
    // Reset field selections when table changes
    setLabelField('');
    setValueField('');
    setOrderByField('');
    setConditionGroup(createEmptyConditionGroup());
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-[40%] min-w-[400px] bg-background border-l border-border shadow-xl z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-muted/30">
        <div>
          <h2 className="text-lg font-semibold">Configure Dynamic Values</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Map to Dataverse tables for PCF control integration</p>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Dataverse Info Banner */}
        <div className="flex items-start gap-3 p-3 rounded-lg bg-primary/5 border border-primary/20">
          <Info className="h-4 w-4 text-primary mt-0.5 shrink-0" />
          <div className="text-xs text-muted-foreground">
            <p className="font-medium text-foreground mb-1">Dataverse Integration</p>
            <p>Configuration will be used by the PCF control to query Microsoft Dynamics 365 CRM tables via OData/FetchXML.</p>
          </div>
        </div>

        {/* Entity Selection - Searchable Lookup */}
        <div className="space-y-2">
          <Label className="text-sm font-semibold">Dataverse Entity</Label>
          <Popover open={tableSearchOpen} onOpenChange={setTableSearchOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={tableSearchOpen}
                className="w-full justify-between font-normal"
              >
                {tableName ? (
                  <span className="flex items-center gap-2">
                    <Database className="h-4 w-4 text-muted-foreground" />
                    <span>{selectedEntity?.displayName}</span>
                    <Badge variant="outline" className="text-xs font-mono">{tableName}</Badge>
                  </span>
                ) : (
                  <span className="text-muted-foreground">Search entities...</span>
                )}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
              <Command>
                <CommandInput placeholder="Search entities..." />
                <CommandList>
                  <CommandEmpty>No entity found.</CommandEmpty>
                  <CommandGroup>
                    {DATAVERSE_ENTITIES.map((entity) => (
                      <CommandItem
                        key={entity.logicalName}
                        value={`${entity.logicalName} ${entity.displayName}`}
                        onSelect={() => {
                          handleTableChange(entity.logicalName);
                          setTableSearchOpen(false);
                        }}
                      >
                        <Database className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span className="flex-1">{entity.displayName}</span>
                        <Badge variant="outline" className="ml-2 text-xs font-mono">
                          {entity.logicalName}
                        </Badge>
                        <Check
                          className={cn(
                            "ml-2 h-4 w-4",
                            tableName === entity.logicalName ? "opacity-100" : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <p className="text-xs text-muted-foreground">
            Select the Dataverse entity (table) from which dynamic values will be fetched.
          </p>
        </div>

        {/* Attribute Mappings */}
        {tableName && (
          <div className="space-y-4 border border-border rounded-lg p-4 bg-muted/20">
            <Label className="text-sm font-semibold">Attribute Mappings</Label>
            
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-xs">Label Attribute (Display Name)</Label>
                <Select value={labelField} onValueChange={setLabelField}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select field for label..." />
                  </SelectTrigger>
                  <SelectContent>
                    {availableFields.map(field => (
                      <SelectItem key={field.logicalName} value={field.logicalName}>
                        <span className="flex items-center gap-2">
                          {field.displayName}
                          <span className="text-xs text-muted-foreground font-mono">({field.logicalName})</span>
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Displayed to the user
                </p>
              </div>

              <div className="space-y-2">
                <Label className="text-xs">Value Attribute (Primary Key)</Label>
                <Select value={valueField} onValueChange={setValueField}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select field for value..." />
                  </SelectTrigger>
                  <SelectContent>
                    {availableFields.map(field => (
                      <SelectItem key={field.logicalName} value={field.logicalName}>
                        <span className="flex items-center gap-2">
                          {field.displayName}
                          <span className="text-xs text-muted-foreground font-mono">({field.logicalName})</span>
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Stored as the answer
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Filter Conditions (OData $filter) */}
        {tableName && (
          <div className="space-y-4">
            <Label className="text-sm font-semibold">Filter Conditions (OData $filter)</Label>
            <FilterGroupEditor
              group={conditionGroup}
              availableFields={availableFields}
              onUpdate={setConditionGroup}
            />
          </div>
        )}

        {/* Ordering (OData $orderby) */}
        {tableName && (
          <div className="space-y-4 border border-border rounded-lg p-4 bg-muted/20">
            <Label className="text-sm font-semibold">Ordering (OData $orderby)</Label>
            
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-xs">Order By Field</Label>
                <Select 
                  value={orderByField || '__none__'} 
                  onValueChange={(v) => setOrderByField(v === '__none__' ? '' : v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select field..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="__none__">None</SelectItem>
                    {availableFields.map(field => (
                      <SelectItem key={field.logicalName} value={field.logicalName}>
                        {field.displayName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-xs">Direction</Label>
                <Select value={orderDirection} onValueChange={(v) => setOrderDirection(v as 'asc' | 'desc')}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="asc">Ascending (A → Z)</SelectItem>
                    <SelectItem value="desc">Descending (Z → A)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}

        {/* Query Preview */}
        {tableName && labelField && valueField && (
          <QueryPreview 
            config={{
              tableName,
              labelField,
              valueField,
              conditionGroup,
              orderByField: orderByField || undefined,
              orderDirection
            }}
          />
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-end gap-3 p-4 border-t border-border bg-muted/30">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button 
          onClick={handleSave}
          disabled={!tableName || !labelField || !valueField}
        >
          Save Configuration
        </Button>
      </div>
    </div>
  );
};

// Query Preview Component with OData and FetchXML tabs
interface QueryPreviewProps {
  config: {
    tableName: string;
    labelField: string;
    valueField: string;
    conditionGroup: DynamicValueFilterGroup;
    orderByField?: string;
    orderDirection: 'asc' | 'desc';
  };
}

const QueryPreview = ({ config }: QueryPreviewProps) => {
  const [copiedTab, setCopiedTab] = useState<string | null>(null);

  const odataQuery = useMemo(() => {
    try {
      return generateFormattedOData(config);
    } catch {
      return '// Error generating OData query';
    }
  }, [config]);

  const fetchXmlQuery = useMemo(() => {
    try {
      return generateFormattedFetchXml(config, { top: 5000 });
    } catch {
      return '<!-- Error generating FetchXML query -->';
    }
  }, [config]);

  const handleCopy = async (text: string, tab: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedTab(tab);
      setTimeout(() => setCopiedTab(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Code className="h-4 w-4 text-muted-foreground" />
        <Label className="text-sm font-semibold">Query Preview</Label>
      </div>
      
      <Tabs defaultValue="odata" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="odata" className="text-xs">OData</TabsTrigger>
          <TabsTrigger value="fetchxml" className="text-xs">FetchXML</TabsTrigger>
        </TabsList>
        
        <TabsContent value="odata" className="mt-2">
          <div className="relative group">
            <pre className="p-3 rounded-lg bg-muted/50 border border-border text-xs font-mono overflow-x-auto whitespace-pre-wrap break-all max-h-[200px] overflow-y-auto">
              {odataQuery}
            </pre>
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2 h-7 w-7 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => handleCopy(odataQuery, 'odata')}
            >
              {copiedTab === 'odata' ? (
                <CheckCircle2 className="h-4 w-4 text-primary" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Use with Dataverse Web API: <code className="px-1 py-0.5 bg-muted rounded">Xrm.WebApi.retrieveMultipleRecords()</code>
          </p>
        </TabsContent>
        
        <TabsContent value="fetchxml" className="mt-2">
          <div className="relative group">
            <pre className="p-3 rounded-lg bg-muted/50 border border-border text-xs font-mono overflow-x-auto whitespace-pre max-h-[200px] overflow-y-auto">
              {fetchXmlQuery}
            </pre>
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2 h-7 w-7 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => handleCopy(fetchXmlQuery, 'fetchxml')}
            >
              {copiedTab === 'fetchxml' ? (
                <CheckCircle2 className="h-4 w-4 text-primary" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Use with FetchXML API: <code className="px-1 py-0.5 bg-muted rounded">Xrm.WebApi.retrieveMultipleRecords(entityName, "?fetchXml=" + encodedXml)</code>
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DynamicValuesPanel;
