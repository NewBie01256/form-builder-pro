import { useState } from "react";
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
import { X, Plus, Trash2, FolderPlus } from "lucide-react";
import { cn } from "@/lib/utils";

export interface DynamicValueFilter {
  type: 'filter';
  id: string;
  field: string;
  operator: 'equals' | 'not_equals' | 'contains' | 'not_contains' | 'greater_than' | 'less_than' | 'starts_with' | 'ends_with' | 'is_null' | 'is_not_null';
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

interface DynamicValuesPanelProps {
  isOpen: boolean;
  onClose: () => void;
  config?: DynamicValueConfig;
  onSave: (config: DynamicValueConfig) => void;
}

// Sample tables for demonstration - in a real app, these would come from the database schema
const SAMPLE_TABLES = [
  { name: 'users', fields: ['id', 'name', 'email', 'role', 'department', 'status', 'created_at'] },
  { name: 'departments', fields: ['id', 'name', 'code', 'manager_id', 'active'] },
  { name: 'categories', fields: ['id', 'name', 'parent_id', 'description', 'sort_order'] },
  { name: 'products', fields: ['id', 'name', 'sku', 'price', 'category_id', 'status'] },
  { name: 'locations', fields: ['id', 'name', 'address', 'city', 'country', 'active'] },
];

const OPERATORS = [
  { value: 'equals', label: 'Equals' },
  { value: 'not_equals', label: 'Not Equals' },
  { value: 'contains', label: 'Contains' },
  { value: 'not_contains', label: 'Not Contains' },
  { value: 'greater_than', label: 'Greater Than' },
  { value: 'less_than', label: 'Less Than' },
  { value: 'starts_with', label: 'Starts With' },
  { value: 'ends_with', label: 'Ends With' },
  { value: 'is_null', label: 'Is Null' },
  { value: 'is_not_null', label: 'Is Not Null' },
];

const createEmptyFilterGroup = (): DynamicValueFilterGroup => ({
  type: 'group',
  id: `group-${Date.now()}`,
  matchType: 'AND',
  children: []
});

const createEmptyFilter = (): DynamicValueFilter => ({
  type: 'filter',
  id: `filter-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
  field: '',
  operator: 'equals',
  value: ''
});

// Recursive component for rendering filter groups
interface FilterGroupEditorProps {
  group: DynamicValueFilterGroup;
  availableFields: string[];
  onUpdate: (updated: DynamicValueFilterGroup) => void;
  onDelete?: () => void;
  depth?: number;
}

const FilterGroupEditor = ({ group, availableFields, onUpdate, onDelete, depth = 0 }: FilterGroupEditorProps) => {
  const handleAddFilter = () => {
    onUpdate({
      ...group,
      children: [...group.children, createEmptyFilter()]
    });
  };

  const handleAddGroup = () => {
    onUpdate({
      ...group,
      children: [...group.children, createEmptyFilterGroup()]
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
    <div className={cn(
      "border rounded-lg p-3 space-y-3",
      depth === 0 ? "border-border bg-muted/20" : "border-dashed border-muted-foreground/30 bg-background"
    )}>
      {/* Group Header */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Label className="text-xs font-medium text-muted-foreground">Match</Label>
          <Select value={group.matchType} onValueChange={(v) => handleMatchTypeChange(v as 'AND' | 'OR')}>
            <SelectTrigger className="h-7 w-20 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="AND">AND</SelectItem>
              <SelectItem value="OR">OR</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-xs text-muted-foreground">
            {group.matchType === 'AND' ? 'All conditions must match' : 'Any condition can match'}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" className="h-7 px-2 text-xs" onClick={handleAddFilter}>
            <Plus className="h-3 w-3 mr-1" />
            Filter
          </Button>
          <Button variant="ghost" size="sm" className="h-7 px-2 text-xs" onClick={handleAddGroup}>
            <FolderPlus className="h-3 w-3 mr-1" />
            Group
          </Button>
          {onDelete && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-7 w-7 text-muted-foreground hover:text-destructive"
              onClick={onDelete}
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          )}
        </div>
      </div>

      {/* Children */}
      {group.children.length === 0 ? (
        <div className="text-center py-4 border border-dashed border-border rounded bg-muted/10">
          <p className="text-xs text-muted-foreground">
            No conditions. Click "+ Filter" to add a condition.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {group.children.map((child, index) => (
            <div key={child.id}>
              {index > 0 && (
                <div className="flex items-center justify-center py-1">
                  <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded">
                    {group.matchType}
                  </span>
                </div>
              )}
              {child.type === 'group' ? (
                <FilterGroupEditor
                  group={child}
                  availableFields={availableFields}
                  onUpdate={(updated) => handleUpdateChild(child.id, updated)}
                  onDelete={() => handleRemoveChild(child.id)}
                  depth={depth + 1}
                />
              ) : (
                <FilterRow
                  filter={child}
                  availableFields={availableFields}
                  onUpdate={(updated) => handleUpdateChild(child.id, updated)}
                  onDelete={() => handleRemoveChild(child.id)}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Single filter row component
interface FilterRowProps {
  filter: DynamicValueFilter;
  availableFields: string[];
  onUpdate: (updated: DynamicValueFilter) => void;
  onDelete: () => void;
}

const FilterRow = ({ filter, availableFields, onUpdate, onDelete }: FilterRowProps) => {
  return (
    <div className="flex items-center gap-2 p-2 border border-border rounded bg-background">
      <Select 
        value={filter.field || '__empty__'} 
        onValueChange={(v) => onUpdate({ ...filter, field: v === '__empty__' ? '' : v })}
      >
        <SelectTrigger className="h-8 flex-1">
          <SelectValue placeholder="Select field..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="__empty__" disabled>Select field...</SelectItem>
          {availableFields.map(field => (
            <SelectItem key={field} value={field}>
              {field}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select 
        value={filter.operator} 
        onValueChange={(v) => onUpdate({ ...filter, operator: v as DynamicValueFilter['operator'] })}
      >
        <SelectTrigger className="h-8 w-36">
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

      {!['is_null', 'is_not_null'].includes(filter.operator) && (
        <Input
          placeholder="Value"
          value={filter.value}
          onChange={(e) => onUpdate({ ...filter, value: e.target.value })}
          className="h-8 flex-1"
        />
      )}

      <Button 
        variant="ghost" 
        size="icon" 
        className="h-8 w-8 text-muted-foreground hover:text-destructive shrink-0"
        onClick={onDelete}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};

const DynamicValuesPanel = ({ isOpen, onClose, config, onSave }: DynamicValuesPanelProps) => {
  const [tableName, setTableName] = useState(config?.tableName || '');
  const [labelField, setLabelField] = useState(config?.labelField || '');
  const [valueField, setValueField] = useState(config?.valueField || '');
  const [filterGroup, setFilterGroup] = useState<DynamicValueFilterGroup>(
    config?.filterGroup || createEmptyFilterGroup()
  );
  const [orderByField, setOrderByField] = useState(config?.orderByField || '');
  const [orderDirection, setOrderDirection] = useState<'asc' | 'desc'>(config?.orderDirection || 'asc');

  const selectedTable = SAMPLE_TABLES.find(t => t.name === tableName);
  const availableFields = selectedTable?.fields || [];

  const handleSave = () => {
    onSave({
      tableName,
      labelField,
      valueField,
      filterGroup,
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
    setFilterGroup(createEmptyFilterGroup());
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-[40%] min-w-[400px] bg-background border-l border-border shadow-xl z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-muted/30">
        <h2 className="text-lg font-semibold">Configure Dynamic Values</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Table Selection */}
        <div className="space-y-2">
          <Label className="text-sm font-semibold">Data Source Table</Label>
          <Select value={tableName} onValueChange={handleTableChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select a table..." />
            </SelectTrigger>
            <SelectContent>
              {SAMPLE_TABLES.map(table => (
                <SelectItem key={table.name} value={table.name}>
                  {table.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            Select the database table from which dynamic values will be fetched.
          </p>
        </div>

        {/* Field Mappings */}
        {tableName && (
          <div className="space-y-4 border border-border rounded-lg p-4 bg-muted/20">
            <Label className="text-sm font-semibold">Field Mappings</Label>
            
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-xs">Label Field</Label>
                <Select value={labelField} onValueChange={setLabelField}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select field for label..." />
                  </SelectTrigger>
                  <SelectContent>
                    {availableFields.map(field => (
                      <SelectItem key={field} value={field}>
                        {field}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Displayed to the user
                </p>
              </div>

              <div className="space-y-2">
                <Label className="text-xs">Value Field</Label>
                <Select value={valueField} onValueChange={setValueField}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select field for value..." />
                  </SelectTrigger>
                  <SelectContent>
                    {availableFields.map(field => (
                      <SelectItem key={field} value={field}>
                        {field}
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

        {/* Filters Section with Grouping */}
        {tableName && (
          <div className="space-y-4">
            <Label className="text-sm font-semibold">Filter Conditions</Label>
            <FilterGroupEditor
              group={filterGroup}
              availableFields={availableFields}
              onUpdate={setFilterGroup}
            />
          </div>
        )}

        {/* Ordering */}
        {tableName && (
          <div className="space-y-4 border border-border rounded-lg p-4 bg-muted/20">
            <Label className="text-sm font-semibold">Ordering</Label>
            
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
                      <SelectItem key={field} value={field}>
                        {field}
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

export default DynamicValuesPanel;
