import { useState, useEffect } from "react";
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

// Re-export types from questionnaire.ts for backward compatibility
export type { DynamicValueFilter, DynamicValueFilterGroup, DynamicValueConfig, DynamicValueOperator } from "@/types/questionnaire";
import type { DynamicValueFilter, DynamicValueFilterGroup, DynamicValueConfig, DynamicValueOperator } from "@/types/questionnaire";

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

// Recursive component for rendering filter groups - matching the table-based layout
interface FilterGroupEditorProps {
  group: DynamicValueFilterGroup;
  availableFields: string[];
  onUpdate: (updated: DynamicValueFilterGroup) => void;
  onDelete?: () => void;
  isRoot?: boolean;
}

const FilterGroupEditor = ({ group, availableFields, onUpdate, onDelete, isRoot = true }: FilterGroupEditorProps) => {
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
                            <SelectItem key={field} value={field}>
                              {field}
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

                      {!['is_null', 'is_not_null'].includes(child.operator) ? (
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
  const [filterGroup, setFilterGroup] = useState<DynamicValueFilterGroup>(createEmptyFilterGroup());
  const [orderByField, setOrderByField] = useState('');
  const [orderDirection, setOrderDirection] = useState<'asc' | 'desc'>('asc');

  // Sync state with config prop when panel opens or config changes
  useEffect(() => {
    if (isOpen) {
      setTableName(config?.tableName || '');
      setLabelField(config?.labelField || '');
      setValueField(config?.valueField || '');
      setFilterGroup(config?.filterGroup || createEmptyFilterGroup());
      setOrderByField(config?.orderByField || '');
      setOrderDirection(config?.orderDirection || 'asc');
    }
  }, [isOpen, config]);

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
