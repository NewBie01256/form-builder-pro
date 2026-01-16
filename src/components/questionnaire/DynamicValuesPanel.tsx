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
import { X, Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface DynamicValueFilter {
  id: string;
  field: string;
  operator: 'equals' | 'not_equals' | 'contains' | 'not_contains' | 'greater_than' | 'less_than' | 'starts_with' | 'ends_with' | 'is_null' | 'is_not_null';
  value: string;
}

export interface DynamicValueConfig {
  tableName: string;
  labelField: string;
  valueField: string;
  filters: DynamicValueFilter[];
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

const DynamicValuesPanel = ({ isOpen, onClose, config, onSave }: DynamicValuesPanelProps) => {
  const [tableName, setTableName] = useState(config?.tableName || '');
  const [labelField, setLabelField] = useState(config?.labelField || '');
  const [valueField, setValueField] = useState(config?.valueField || '');
  const [filters, setFilters] = useState<DynamicValueFilter[]>(config?.filters || []);
  const [orderByField, setOrderByField] = useState(config?.orderByField || '');
  const [orderDirection, setOrderDirection] = useState<'asc' | 'desc'>(config?.orderDirection || 'asc');

  const selectedTable = SAMPLE_TABLES.find(t => t.name === tableName);
  const availableFields = selectedTable?.fields || [];

  const handleAddFilter = () => {
    const newFilter: DynamicValueFilter = {
      id: `filter-${Date.now()}`,
      field: '',
      operator: 'equals',
      value: ''
    };
    setFilters([...filters, newFilter]);
  };

  const handleUpdateFilter = (filterId: string, updates: Partial<DynamicValueFilter>) => {
    setFilters(filters.map(f => f.id === filterId ? { ...f, ...updates } : f));
  };

  const handleRemoveFilter = (filterId: string) => {
    setFilters(filters.filter(f => f.id !== filterId));
  };

  const handleSave = () => {
    onSave({
      tableName,
      labelField,
      valueField,
      filters,
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
    setFilters([]);
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

        {/* Filters Section */}
        {tableName && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-semibold">Filters</Label>
              <Button variant="outline" size="sm" onClick={handleAddFilter}>
                <Plus className="h-4 w-4 mr-1" />
                Add Filter
              </Button>
            </div>

            {filters.length === 0 ? (
              <div className="text-center py-6 border border-dashed border-border rounded-lg bg-muted/10">
                <p className="text-sm text-muted-foreground">
                  No filters added. All records will be included.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filters.map((filter, index) => (
                  <div 
                    key={filter.id} 
                    className="flex items-start gap-2 p-3 border border-border rounded-lg bg-background"
                  >
                    <div className="flex-1 grid gap-2 sm:grid-cols-3">
                      <Select 
                        value={filter.field} 
                        onValueChange={(v) => handleUpdateFilter(filter.id, { field: v })}
                      >
                        <SelectTrigger className="h-9">
                          <SelectValue placeholder="Field" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableFields.map(field => (
                            <SelectItem key={field} value={field}>
                              {field}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <Select 
                        value={filter.operator} 
                        onValueChange={(v) => handleUpdateFilter(filter.id, { operator: v as any })}
                      >
                        <SelectTrigger className="h-9">
                          <SelectValue placeholder="Operator" />
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
                          onChange={(e) => handleUpdateFilter(filter.id, { value: e.target.value })}
                          className="h-9"
                        />
                      )}
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-9 w-9 text-muted-foreground hover:text-destructive shrink-0"
                      onClick={() => handleRemoveFilter(filter.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Ordering */}
        {tableName && (
          <div className="space-y-4 border border-border rounded-lg p-4 bg-muted/20">
            <Label className="text-sm font-semibold">Ordering</Label>
            
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-xs">Order By Field</Label>
                <Select value={orderByField} onValueChange={setOrderByField}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select field..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">None</SelectItem>
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
