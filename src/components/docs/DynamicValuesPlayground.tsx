/**
 * Interactive Dynamic Values Playground
 * 
 * Allows users to configure Dynamic Values and see generated
 * OData/FetchXML queries in real-time.
 */

import { useState, useMemo, useCallback } from "react";
import {
  makeStyles,
  tokens,
  shorthands,
  Card,
  CardHeader,
  Title3,
  Body1,
  Body2,
  Label,
  Dropdown,
  Option,
  Input,
  Button,
  Badge,
  Divider,
  TabList,
  Tab,
  SelectTabData,
  SelectTabEvent,
  Combobox,
  Spinner,
  Table,
  TableHeader,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
} from "@fluentui/react-components";
import {
  Add16Regular,
  Delete16Regular,
  Play16Regular,
  Copy16Regular,
  Checkmark16Regular,
  Database16Regular,
  Filter16Regular,
  ArrowSort16Regular,
  Play24Regular,
  Dismiss16Regular,
  TableSimple24Regular,
} from "@fluentui/react-icons";
import { CodeBlock } from "@/components/ui/code-block";
import { DATAVERSE_ENTITIES, getFilterableFields } from "@/data/dataverseEntities";
import { generateFetchXml } from "@/lib/dataverse/fetchXmlGenerator";
import { generateFormattedOData } from "@/lib/dataverse/odataGenerator";
import type { DynamicValueConfig, DynamicValueConditionGroup, DynamicValueCondition, ConditionOperator } from "@/types/questionnaire";

// ============================================================================
// SAMPLE DATA FOR SIMULATION
// ============================================================================

interface SampleRecord {
  [key: string]: string | number | boolean | null;
}

const SAMPLE_DATA: Record<string, SampleRecord[]> = {
  account: [
    { accountid: "a1b2c3d4-e5f6-7890-abcd-ef1234567890", name: "Contoso Ltd", statecode: 0, revenue: 5000000, telephone1: "555-0100", industrycode: 1 },
    { accountid: "b2c3d4e5-f6a7-8901-bcde-f12345678901", name: "Fabrikam Inc", statecode: 0, revenue: 2500000, telephone1: "555-0200", industrycode: 2 },
    { accountid: "c3d4e5f6-a7b8-9012-cdef-123456789012", name: "Adventure Works", statecode: 0, revenue: 8000000, telephone1: "555-0300", industrycode: 1 },
    { accountid: "d4e5f6a7-b8c9-0123-defa-234567890123", name: "Northwind Traders", statecode: 1, revenue: 1500000, telephone1: "555-0400", industrycode: 3 },
    { accountid: "e5f6a7b8-c9d0-1234-efab-345678901234", name: "Tailspin Toys", statecode: 0, revenue: 750000, telephone1: "555-0500", industrycode: 4 },
    { accountid: "f6a7b8c9-d0e1-2345-fabc-456789012345", name: "Alpine Ski House", statecode: 0, revenue: 3200000, telephone1: "555-0600", industrycode: 2 },
    { accountid: "a7b8c9d0-e1f2-3456-abcd-567890123456", name: "Blue Yonder Airlines", statecode: 1, revenue: 12000000, telephone1: "555-0700", industrycode: 5 },
    { accountid: "b8c9d0e1-f2a3-4567-bcde-678901234567", name: "City Power & Light", statecode: 0, revenue: 9500000, telephone1: "555-0800", industrycode: 6 },
  ],
  contact: [
    { contactid: "c1a2b3c4-d5e6-7890-1234-567890abcdef", fullname: "John Smith", statecode: 0, emailaddress1: "john.smith@contoso.com", telephone1: "555-1100" },
    { contactid: "c2b3c4d5-e6f7-8901-2345-67890abcdef1", fullname: "Jane Doe", statecode: 0, emailaddress1: "jane.doe@fabrikam.com", telephone1: "555-1200" },
    { contactid: "c3c4d5e6-f7a8-9012-3456-7890abcdef12", fullname: "Bob Johnson", statecode: 0, emailaddress1: "bob.johnson@adventure.com", telephone1: "555-1300" },
    { contactid: "c4d5e6f7-a8b9-0123-4567-890abcdef123", fullname: "Alice Williams", statecode: 1, emailaddress1: "alice.w@northwind.com", telephone1: "555-1400" },
    { contactid: "c5e6f7a8-b9c0-1234-5678-90abcdef1234", fullname: "Charlie Brown", statecode: 0, emailaddress1: "charlie.b@tailspin.com", telephone1: "555-1500" },
  ],
  incident: [
    { incidentid: "i1a2b3c4-d5e6-7890-abcd-ef1234567890", title: "Cannot access email", statecode: 0, prioritycode: 1, ticketnumber: "CAS-001" },
    { incidentid: "i2b3c4d5-e6f7-8901-bcde-f12345678901", title: "Printer not working", statecode: 0, prioritycode: 2, ticketnumber: "CAS-002" },
    { incidentid: "i3c4d5e6-f7a8-9012-cdef-123456789012", title: "Software license expired", statecode: 0, prioritycode: 1, ticketnumber: "CAS-003" },
    { incidentid: "i4d5e6f7-a8b9-0123-defa-234567890123", title: "Network connectivity issues", statecode: 1, prioritycode: 3, ticketnumber: "CAS-004" },
    { incidentid: "i5e6f7a8-b9c0-1234-efab-345678901234", title: "Password reset required", statecode: 0, prioritycode: 2, ticketnumber: "CAS-005" },
  ],
  lead: [
    { leadid: "l1a2b3c4-d5e6-7890-abcd-ef1234567890", fullname: "Michael Chen", statecode: 0, emailaddress1: "m.chen@prospect.com", companyname: "Tech Startup Inc" },
    { leadid: "l2b3c4d5-e6f7-8901-bcde-f12345678901", fullname: "Sarah Wilson", statecode: 0, emailaddress1: "s.wilson@enterprise.com", companyname: "Enterprise Corp" },
    { leadid: "l3c4d5e6-f7a8-9012-cdef-123456789012", fullname: "David Lee", statecode: 1, emailaddress1: "d.lee@smallbiz.com", companyname: "Small Business LLC" },
  ],
  opportunity: [
    { opportunityid: "o1a2b3c4-d5e6-7890-abcd-ef1234567890", name: "Enterprise License Deal", statecode: 0, estimatedvalue: 500000, closeprobability: 75 },
    { opportunityid: "o2b3c4d5-e6f7-8901-bcde-f12345678901", name: "Cloud Migration Project", statecode: 0, estimatedvalue: 250000, closeprobability: 60 },
    { opportunityid: "o3c4d5e6-f7a8-9012-cdef-123456789012", name: "Support Contract Renewal", statecode: 0, estimatedvalue: 75000, closeprobability: 90 },
  ],
  systemuser: [
    { systemuserid: "u1a2b3c4-d5e6-7890-abcd-ef1234567890", fullname: "Admin User", isdisabled: false, internalemailaddress: "admin@company.com" },
    { systemuserid: "u2b3c4d5-e6f7-8901-bcde-f12345678901", fullname: "Support Agent", isdisabled: false, internalemailaddress: "support@company.com" },
    { systemuserid: "u3c4d5e6-f7a8-9012-cdef-123456789012", fullname: "Sales Rep", isdisabled: false, internalemailaddress: "sales@company.com" },
  ],
  team: [
    { teamid: "t1a2b3c4-d5e6-7890-abcd-ef1234567890", name: "Support Team", teamtype: 0, description: "Customer support team" },
    { teamid: "t2b3c4d5-e6f7-8901-bcde-f12345678901", name: "Sales Team", teamtype: 0, description: "Sales department" },
    { teamid: "t3c4d5e6-f7a8-9012-cdef-123456789012", name: "IT Team", teamtype: 0, description: "Information technology" },
  ],
  product: [
    { productid: "p1a2b3c4-d5e6-7890-abcd-ef1234567890", name: "Enterprise Suite", statecode: 0, price: 999.99, productnumber: "ENT-001" },
    { productid: "p2b3c4d5-e6f7-8901-bcde-f12345678901", name: "Professional License", statecode: 0, price: 499.99, productnumber: "PRO-001" },
    { productid: "p3c4d5e6-f7a8-9012-cdef-123456789012", name: "Basic Package", statecode: 0, price: 99.99, productnumber: "BAS-001" },
    { productid: "p4d5e6f7-a8b9-0123-defa-234567890123", name: "Support Add-on", statecode: 1, price: 149.99, productnumber: "SUP-001" },
  ],
  queue: [
    { queueid: "q1a2b3c4-d5e6-7890-abcd-ef1234567890", name: "Support Queue", statecode: 0, emailaddress: "support@queue.com" },
    { queueid: "q2b3c4d5-e6f7-8901-bcde-f12345678901", name: "Sales Queue", statecode: 0, emailaddress: "sales@queue.com" },
  ],
  businessunit: [
    { businessunitid: "b1a2b3c4-d5e6-7890-abcd-ef1234567890", name: "Headquarters", isdisabled: false },
    { businessunitid: "b2b3c4d5-e6f7-8901-bcde-f12345678901", name: "West Region", isdisabled: false },
    { businessunitid: "b3c4d5e6-f7a8-9012-cdef-123456789012", name: "East Region", isdisabled: false },
  ],
};

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
    padding: tokens.spacingVerticalL,
    backgroundColor: tokens.colorNeutralBackground3,
    borderRadius: tokens.borderRadiusLarge,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: tokens.spacingHorizontalM,
  },
  headerTitle: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
  },
  configSection: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: tokens.spacingVerticalL,
    "@media (max-width: 768px)": {
      gridTemplateColumns: "1fr",
    },
  },
  fieldGroup: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXS,
  },
  filtersSection: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
    padding: tokens.spacingVerticalM,
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusMedium,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  filterHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  filterRow: {
    display: "grid",
    gridTemplateColumns: "1fr 120px 1fr auto",
    gap: tokens.spacingHorizontalS,
    alignItems: "center",
  },
  previewSection: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
  },
  tabContent: {
    marginTop: tokens.spacingVerticalM,
  },
  emptyState: {
    padding: tokens.spacingVerticalL,
    textAlign: "center",
    color: tokens.colorNeutralForeground3,
    fontStyle: "italic",
  },
  orderRow: {
    display: "grid",
    gridTemplateColumns: "1fr 120px",
    gap: tokens.spacingHorizontalS,
    alignItems: "center",
  },
  badgeRow: {
    display: "flex",
    gap: tokens.spacingHorizontalS,
    flexWrap: "wrap",
    marginTop: tokens.spacingVerticalS,
  },
  resultsSection: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
    padding: tokens.spacingVerticalL,
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusMedium,
    border: `1px solid ${tokens.colorBrandStroke1}`,
  },
  resultsHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  resultsTitle: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
  },
  resultsTable: {
    marginTop: tokens.spacingVerticalS,
    ...shorthands.overflow("auto"),
    maxHeight: "300px",
  },
  resultRow: {
    cursor: "pointer",
    "&:hover": {
      backgroundColor: tokens.colorNeutralBackground3,
    },
  },
  tryItButton: {
    minWidth: "120px",
  },
  statsRow: {
    display: "flex",
    gap: tokens.spacingHorizontalM,
    flexWrap: "wrap",
  },
  loadingOverlay: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: tokens.spacingHorizontalS,
    padding: tokens.spacingVerticalL,
  },
});

interface FilterState {
  id: string;
  field: string;
  operator: string;
  value: string;
}

const OPERATORS = [
  { value: "eq", label: "equals" },
  { value: "ne", label: "not equals" },
  { value: "gt", label: "greater than" },
  { value: "lt", label: "less than" },
  { value: "contains", label: "contains" },
  { value: "startswith", label: "starts with" },
  { value: "null", label: "is null" },
  { value: "not_null", label: "is not null" },
];

export const DynamicValuesPlayground = () => {
  const styles = useStyles();
  
  // Configuration state
  const [selectedEntity, setSelectedEntity] = useState<string>("account");
  const [valueField, setValueField] = useState<string>("accountid");
  const [labelField, setLabelField] = useState<string>("name");
  const [orderByField, setOrderByField] = useState<string>("name");
  const [orderDirection, setOrderDirection] = useState<"asc" | "desc">("asc");
  const [filters, setFilters] = useState<FilterState[]>([
    { id: "1", field: "statecode", operator: "eq", value: "0" }
  ]);
  const [matchType, setMatchType] = useState<"AND" | "OR">("AND");
  
  // UI state
  const [activeTab, setActiveTab] = useState<string>("odata");
  const [copied, setCopied] = useState(false);
  
  // Simulation state
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationResults, setSimulationResults] = useState<SampleRecord[] | null>(null);
  const [executionTime, setExecutionTime] = useState<number>(0);

  // Get current entity and its fields
  const currentEntity = useMemo(() => 
    DATAVERSE_ENTITIES.find(e => e.logicalName === selectedEntity),
    [selectedEntity]
  );

  const filterableFields = useMemo(() => 
    currentEntity ? getFilterableFields(currentEntity) : [],
    [currentEntity]
  );

  // Build DynamicValueConfig from state
  const config = useMemo((): DynamicValueConfig => {
    const conditionGroup: DynamicValueConditionGroup = {
      type: "group",
      id: "root",
      matchType,
      children: filters
        .filter(f => f.field)
        .map((f): DynamicValueCondition => ({
          type: "filter",
          id: f.id,
          field: f.field,
          operator: f.operator as ConditionOperator,
          value: f.value,
        })),
    };

    return {
      tableName: selectedEntity,
      valueField,
      labelField,
      orderByField,
      orderDirection,
      conditionGroup,
    };
  }, [selectedEntity, valueField, labelField, orderByField, orderDirection, filters, matchType]);

  // Generate queries
  const { odataQuery, fetchXmlQuery, error } = useMemo(() => {
    try {
      const odata = generateFormattedOData(config, { top: 500 });
      const fetchXml = generateFetchXml(config, { top: 500 });
      return { odataQuery: odata, fetchXmlQuery: fetchXml, error: null };
    } catch (e) {
      return { 
        odataQuery: "", 
        fetchXmlQuery: "", 
        error: e instanceof Error ? e.message : "Unknown error" 
      };
    }
  }, [config]);

  // Handlers
  const handleEntityChange = (entity: string) => {
    setSelectedEntity(entity);
    const newEntity = DATAVERSE_ENTITIES.find(e => e.logicalName === entity);
    if (newEntity) {
      setValueField(newEntity.primaryIdAttribute);
      setLabelField(newEntity.primaryNameAttribute);
      setOrderByField(newEntity.primaryNameAttribute);
      setFilters([{ id: "1", field: "statecode", operator: "eq", value: "0" }]);
    }
  };

  const addFilter = () => {
    setFilters([
      ...filters,
      { id: String(Date.now()), field: "", operator: "eq", value: "" }
    ]);
  };

  const removeFilter = (id: string) => {
    setFilters(filters.filter(f => f.id !== id));
  };

  const updateFilter = (id: string, updates: Partial<FilterState>) => {
    setFilters(filters.map(f => f.id === id ? { ...f, ...updates } : f));
  };

  const handleCopy = async () => {
    const text = activeTab === "odata" ? odataQuery : fetchXmlQuery;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTabSelect = (_: SelectTabEvent, data: SelectTabData) => {
    setActiveTab(data.value as string);
  };

  // Simulation logic - filters sample data based on configuration
  const simulateQuery = useCallback(async () => {
    setIsSimulating(true);
    setSimulationResults(null);
    
    const startTime = performance.now();
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 500));
    
    // Get sample data for this entity
    const entityData = SAMPLE_DATA[selectedEntity] || [];
    
    // Apply filters
    let filteredData = entityData.filter(record => {
      if (filters.length === 0 || !filters.some(f => f.field)) {
        return true;
      }

      const filterResults = filters
        .filter(f => f.field)
        .map(filter => {
          const recordValue = record[filter.field];
          const filterValue = filter.value;
          
          switch (filter.operator) {
            case "eq":
            case "equals":
              return String(recordValue) === filterValue;
            case "ne":
            case "not_equals":
              return String(recordValue) !== filterValue;
            case "gt":
            case "greater_than":
              return Number(recordValue) > Number(filterValue);
            case "lt":
            case "less_than":
              return Number(recordValue) < Number(filterValue);
            case "contains":
              return String(recordValue).toLowerCase().includes(filterValue.toLowerCase());
            case "startswith":
            case "starts_with":
              return String(recordValue).toLowerCase().startsWith(filterValue.toLowerCase());
            case "null":
            case "is_null":
              return recordValue === null || recordValue === undefined || recordValue === "";
            case "not_null":
            case "is_not_null":
              return recordValue !== null && recordValue !== undefined && recordValue !== "";
            default:
              return true;
          }
        });

      // Apply AND/OR logic
      if (matchType === "AND") {
        return filterResults.every(r => r);
      } else {
        return filterResults.some(r => r);
      }
    });

    // Apply ordering
    if (orderByField) {
      filteredData = [...filteredData].sort((a, b) => {
        const aVal = a[orderByField];
        const bVal = b[orderByField];
        
        if (typeof aVal === "number" && typeof bVal === "number") {
          return orderDirection === "asc" ? aVal - bVal : bVal - aVal;
        }
        
        const aStr = String(aVal || "").toLowerCase();
        const bStr = String(bVal || "").toLowerCase();
        
        if (orderDirection === "asc") {
          return aStr.localeCompare(bStr);
        } else {
          return bStr.localeCompare(aStr);
        }
      });
    }

    const endTime = performance.now();
    setExecutionTime(Math.round(endTime - startTime));
    setSimulationResults(filteredData);
    setIsSimulating(false);
  }, [selectedEntity, filters, matchType, orderByField, orderDirection]);

  const clearResults = () => {
    setSimulationResults(null);
    setExecutionTime(0);
  };

  // Get display columns for results table
  const displayColumns = useMemo(() => {
    const cols: string[] = [];
    if (valueField) cols.push(valueField);
    if (labelField && labelField !== valueField) cols.push(labelField);
    // Add a few extra columns for context
    const extraCols = currentEntity?.fields
      .filter(f => f.logicalName !== valueField && f.logicalName !== labelField)
      .slice(0, 2)
      .map(f => f.logicalName) || [];
    return [...cols, ...extraCols];
  }, [valueField, labelField, currentEntity]);

  const getFieldDisplayName = (logicalName: string): string => {
    return currentEntity?.fields.find(f => f.logicalName === logicalName)?.displayName || logicalName;
  };

  const formatCellValue = (value: string | number | boolean | null): string => {
    if (value === null || value === undefined) return "—";
    if (typeof value === "boolean") return value ? "Yes" : "No";
    if (typeof value === "number" && value > 10000) {
      return value.toLocaleString();
    }
    const str = String(value);
    // Truncate GUIDs for display
    if (str.length === 36 && str.includes("-")) {
      return str.substring(0, 8) + "...";
    }
    return str;
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerTitle}>
          <Play16Regular />
          <Title3>Interactive Configuration Playground</Title3>
        </div>
        <Badge appearance="outline" color="success">Live Preview</Badge>
      </div>

      <Divider />

      {/* Entity & Field Selection */}
      <Card>
        <CardHeader
          image={<Database16Regular />}
          header={<b>1. Select Entity & Fields</b>}
          description="Choose which Dataverse table to query and map fields"
        />
        <div className={styles.configSection} style={{ padding: tokens.spacingVerticalM }}>
          <div className={styles.fieldGroup}>
            <Label htmlFor="entity-select">Dataverse Entity</Label>
            <Combobox
              id="entity-select"
              value={currentEntity?.displayName || ""}
              onOptionSelect={(_, data) => {
                if (data.optionValue) handleEntityChange(data.optionValue);
              }}
              placeholder="Select entity..."
            >
              {DATAVERSE_ENTITIES.map(entity => (
                <Option key={entity.logicalName} value={entity.logicalName} text={`${entity.displayName} (${entity.logicalName})`}>
                  {entity.displayName} ({entity.logicalName})
                </Option>
              ))}
            </Combobox>
          </div>

          <div className={styles.fieldGroup}>
            <Label htmlFor="value-field">Value Attribute (stored)</Label>
            <Dropdown
              id="value-field"
              value={currentEntity?.fields.find(f => f.logicalName === valueField)?.displayName || valueField}
              onOptionSelect={(_, data) => data.optionValue && setValueField(data.optionValue)}
            >
              {currentEntity?.fields.map(field => (
                <Option key={field.logicalName} value={field.logicalName} text={`${field.displayName} (${field.logicalName})`}>
                  {field.displayName} ({field.logicalName})
                </Option>
              ))}
            </Dropdown>
          </div>

          <div className={styles.fieldGroup}>
            <Label htmlFor="label-field">Label Attribute (displayed)</Label>
            <Dropdown
              id="label-field"
              value={currentEntity?.fields.find(f => f.logicalName === labelField)?.displayName || labelField}
              onOptionSelect={(_, data) => data.optionValue && setLabelField(data.optionValue)}
            >
              {currentEntity?.fields.map(field => (
                <Option key={field.logicalName} value={field.logicalName} text={`${field.displayName} (${field.logicalName})`}>
                  {field.displayName} ({field.logicalName})
                </Option>
              ))}
            </Dropdown>
          </div>

          <div className={styles.fieldGroup}>
            <Label>Current Config</Label>
            <div className={styles.badgeRow}>
              <Badge appearance="tint" color="informative">{selectedEntity}</Badge>
              <Badge appearance="tint" color="success">Value: {valueField}</Badge>
              <Badge appearance="tint" color="warning">Label: {labelField}</Badge>
            </div>
          </div>
        </div>
      </Card>

      {/* Filters */}
      <Card>
        <CardHeader
          image={<Filter16Regular />}
          header={<b>2. Add Filter Conditions</b>}
          description="Filter which records appear in the dropdown"
        />
        <div className={styles.filtersSection} style={{ margin: tokens.spacingVerticalM }}>
          <div className={styles.filterHeader}>
            <Dropdown
              value={matchType}
              onOptionSelect={(_, data) => setMatchType(data.optionValue as "AND" | "OR")}
              style={{ width: 100 }}
            >
              <Option value="AND">AND</Option>
              <Option value="OR">OR</Option>
            </Dropdown>
            <Button
              appearance="subtle"
              icon={<Add16Regular />}
              onClick={addFilter}
            >
              Add Filter
            </Button>
          </div>

          {filters.length === 0 ? (
            <div className={styles.emptyState}>
              No filters configured. All records will be returned.
            </div>
          ) : (
            filters.map((filter, index) => (
              <div key={filter.id} className={styles.filterRow}>
                <Dropdown
                  value={filterableFields.find(f => f.logicalName === filter.field)?.displayName || filter.field || "Select field..."}
                  onOptionSelect={(_, data) => updateFilter(filter.id, { field: data.optionValue || "" })}
                  placeholder="Field"
                >
                  {filterableFields.map(field => (
                    <Option key={field.logicalName} value={field.logicalName}>
                      {field.displayName}
                    </Option>
                  ))}
                </Dropdown>

                <Dropdown
                  value={OPERATORS.find(o => o.value === filter.operator)?.label || filter.operator}
                  onOptionSelect={(_, data) => updateFilter(filter.id, { operator: data.optionValue || "eq" })}
                >
                  {OPERATORS.map(op => (
                    <Option key={op.value} value={op.value}>
                      {op.label}
                    </Option>
                  ))}
                </Dropdown>

                <Input
                  value={filter.value}
                  onChange={(_, data) => updateFilter(filter.id, { value: data.value })}
                  placeholder="Value"
                  disabled={["null", "not_null"].includes(filter.operator)}
                />

                <Button
                  appearance="subtle"
                  icon={<Delete16Regular />}
                  onClick={() => removeFilter(filter.id)}
                  title="Remove filter"
                />
              </div>
            ))
          )}
        </div>
      </Card>

      {/* Ordering */}
      <Card>
        <CardHeader
          image={<ArrowSort16Regular />}
          header={<b>3. Set Ordering</b>}
          description="Define sort order for dropdown options"
        />
        <div className={styles.orderRow} style={{ padding: tokens.spacingVerticalM }}>
          <Dropdown
            value={currentEntity?.fields.find(f => f.logicalName === orderByField)?.displayName || orderByField}
            onOptionSelect={(_, data) => data.optionValue && setOrderByField(data.optionValue)}
          >
            {currentEntity?.fields.map(field => (
              <Option key={field.logicalName} value={field.logicalName}>
                {field.displayName}
              </Option>
            ))}
          </Dropdown>

          <Dropdown
            value={orderDirection === "asc" ? "Ascending" : "Descending"}
            onOptionSelect={(_, data) => setOrderDirection(data.optionValue as "asc" | "desc")}
          >
            <Option value="asc">Ascending</Option>
            <Option value="desc">Descending</Option>
          </Dropdown>
        </div>
      </Card>

      {/* Try It Section */}
      <Card>
        <CardHeader
          image={<TableSimple24Regular />}
          header={<b>4. Try It - Simulate Query</b>}
          description="Execute the query against sample data to see results"
          action={
            <Button
              appearance="primary"
              icon={isSimulating ? <Spinner size="tiny" /> : <Play24Regular />}
              onClick={simulateQuery}
              disabled={isSimulating}
              className={styles.tryItButton}
            >
              {isSimulating ? "Running..." : "Try It"}
            </Button>
          }
        />
        
        {isSimulating && (
          <div className={styles.loadingOverlay}>
            <Spinner size="small" />
            <Body1>Executing query against sample data...</Body1>
          </div>
        )}

        {simulationResults !== null && !isSimulating && (
          <div className={styles.resultsSection} style={{ margin: tokens.spacingVerticalM }}>
            <div className={styles.resultsHeader}>
              <div className={styles.resultsTitle}>
                <TableSimple24Regular />
                <Title3>Query Results</Title3>
              </div>
              <div style={{ display: "flex", gap: tokens.spacingHorizontalS, alignItems: "center" }}>
                <Badge appearance="filled" color="success">
                  {simulationResults.length} record{simulationResults.length !== 1 ? "s" : ""}
                </Badge>
                <Badge appearance="tint" color="informative">
                  {executionTime}ms
                </Badge>
                <Button
                  appearance="subtle"
                  size="small"
                  icon={<Dismiss16Regular />}
                  onClick={clearResults}
                  title="Clear results"
                />
              </div>
            </div>

            <div className={styles.statsRow}>
              <Body2>
                <strong>Entity:</strong> {currentEntity?.displayName}
              </Body2>
              <Body2>
                <strong>Filters:</strong> {filters.filter(f => f.field).length} condition{filters.filter(f => f.field).length !== 1 ? "s" : ""}
              </Body2>
              <Body2>
                <strong>Order:</strong> {getFieldDisplayName(orderByField)} ({orderDirection})
              </Body2>
            </div>

            {simulationResults.length === 0 ? (
              <div className={styles.emptyState}>
                No records match the current filter criteria.
                <br />
                Try adjusting your filters or removing some conditions.
              </div>
            ) : (
              <div className={styles.resultsTable}>
                <Table size="small">
                  <TableHeader>
                    <TableRow>
                      <TableHeaderCell style={{ width: "40px" }}>#</TableHeaderCell>
                      {displayColumns.map(col => (
                        <TableHeaderCell key={col}>
                          {getFieldDisplayName(col)}
                        </TableHeaderCell>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {simulationResults.slice(0, 10).map((record, index) => (
                      <TableRow key={index} className={styles.resultRow}>
                        <TableCell>{index + 1}</TableCell>
                        {displayColumns.map(col => (
                          <TableCell key={col}>
                            {formatCellValue(record[col])}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {simulationResults.length > 10 && (
                  <div style={{ 
                    padding: tokens.spacingVerticalS, 
                    textAlign: "center",
                    color: tokens.colorNeutralForeground3 
                  }}>
                    Showing first 10 of {simulationResults.length} results
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </Card>

      {/* Query Preview */}
      <div className={styles.previewSection}>
        <div className={styles.header}>
          <Title3>Generated Query Preview</Title3>
          <Button
            appearance="subtle"
            icon={copied ? <Checkmark16Regular /> : <Copy16Regular />}
            onClick={handleCopy}
          >
            {copied ? "Copied!" : "Copy"}
          </Button>
        </div>

        <TabList selectedValue={activeTab} onTabSelect={handleTabSelect}>
          <Tab value="odata">OData URL</Tab>
          <Tab value="fetchxml">FetchXML</Tab>
          <Tab value="config">Config Object</Tab>
        </TabList>

        <div className={styles.tabContent}>
          {error ? (
            <div style={{ color: tokens.colorPaletteRedForeground1, padding: tokens.spacingVerticalM }}>
              Error: {error}
            </div>
          ) : activeTab === "odata" ? (
            <CodeBlock code={odataQuery || "// Configure entity and fields above"} language="text" />
          ) : activeTab === "fetchxml" ? (
            <CodeBlock code={fetchXmlQuery || "<!-- Configure entity and fields above -->"} language="xml" />
          ) : (
            <CodeBlock 
              code={JSON.stringify(config, null, 2)} 
              language="json" 
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DynamicValuesPlayground;
