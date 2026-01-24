/**
 * Interactive Dynamic Values Playground
 * 
 * Allows users to configure Dynamic Values and see generated
 * OData/FetchXML queries in real-time.
 */

import { useState, useMemo } from "react";
import {
  makeStyles,
  tokens,
  Card,
  CardHeader,
  Title3,
  Body1,
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
} from "@fluentui/react-icons";
import { CodeBlock } from "@/components/ui/code-block";
import { DATAVERSE_ENTITIES, getFilterableFields, type DataverseEntity, type DataverseField } from "@/data/dataverseEntities";
import { generateFetchXml } from "@/lib/dataverse/fetchXmlGenerator";
import { generateFormattedOData } from "@/lib/dataverse/odataGenerator";
import type { DynamicValueConfig, DynamicValueConditionGroup, DynamicValueCondition, ConditionOperator } from "@/types/questionnaire";

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
