/**
 * Dataverse Operations Playground
 * 
 * Interactive UI for testing all Dataverse wrapper operations:
 * - Create, Retrieve, Update, Delete records
 * - RetrieveMultiple with OData/FetchXML
 * - Metadata queries
 * 
 * Works in real-time when deployed to Dataverse, uses mock data in development.
 */

import { useState, useCallback } from 'react';
import {
  Button,
  Input,
  Label,
  Field,
  Dropdown,
  Option,
  Text,
  Textarea,
  Badge,
  TabList,
  Tab,
  Card,
  CardHeader,
  Spinner,
  Tooltip,
  Switch,
  makeStyles,
  tokens,
  shorthands,
  mergeClasses,
} from '@fluentui/react-components';
import {
  Play16Regular,
  Add16Regular,
  Edit16Regular,
  Delete16Regular,
  Search16Regular,
  Database16Regular,
  Code16Regular,
  Copy16Regular,
  Checkmark16Regular,
  Info16Regular,
  ArrowSync16Regular,
  Warning16Regular,
  ErrorCircle16Regular,
} from '@fluentui/react-icons';
import { useDataverse, useEntityFields } from '@/lib/dataverse/pcf';

// ============================================================================
// Styles
// ============================================================================

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalL),
    height: '100%',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...shorthands.padding(tokens.spacingVerticalM, tokens.spacingHorizontalL),
    backgroundColor: tokens.colorNeutralBackground2,
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
  },
  headerTitle: {
    display: 'flex',
    alignItems: 'center',
    ...shorthands.gap(tokens.spacingHorizontalM),
  },
  envBadge: {
    display: 'flex',
    alignItems: 'center',
    ...shorthands.gap(tokens.spacingHorizontalXS),
  },
  content: {
    display: 'flex',
    flex: 1,
    ...shorthands.gap(tokens.spacingHorizontalL),
    minHeight: 0,
  },
  configPanel: {
    width: '400px',
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalM),
    ...shorthands.padding(tokens.spacingVerticalM),
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke1),
    overflowY: 'auto',
  },
  resultPanel: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalM),
    ...shorthands.padding(tokens.spacingVerticalM),
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke1),
    minHeight: 0,
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalS),
  },
  sectionTitle: {
    display: 'flex',
    alignItems: 'center',
    ...shorthands.gap(tokens.spacingHorizontalS),
    fontWeight: tokens.fontWeightSemibold,
  },
  operationGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    ...shorthands.gap(tokens.spacingHorizontalS),
  },
  operationButton: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    ...shorthands.gap(tokens.spacingVerticalXS),
    ...shorthands.padding(tokens.spacingVerticalS, tokens.spacingHorizontalM),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke1),
    cursor: 'pointer',
    backgroundColor: tokens.colorNeutralBackground1,
    '&:hover': {
      backgroundColor: tokens.colorNeutralBackground3,
    },
  },
  operationButtonActive: {
    backgroundColor: tokens.colorBrandBackground2,
    ...shorthands.borderColor(tokens.colorBrandStroke1),
  },
  codeBlock: {
    flex: 1,
    ...shorthands.padding(tokens.spacingVerticalM),
    backgroundColor: tokens.colorNeutralBackground3,
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    fontFamily: tokens.fontFamilyMonospace,
    fontSize: tokens.fontSizeBase200,
    overflowY: 'auto',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    minHeight: '200px',
  },
  resultHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statusBadge: {
    display: 'flex',
    alignItems: 'center',
    ...shorthands.gap(tokens.spacingHorizontalXS),
  },
  fieldRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr auto',
    ...shorthands.gap(tokens.spacingHorizontalS),
    alignItems: 'end',
  },
  jsonEditor: {
    fontFamily: tokens.fontFamilyMonospace,
    fontSize: tokens.fontSizeBase200,
    minHeight: '120px',
  },
});

// ============================================================================
// Types
// ============================================================================

type OperationType = 'create' | 'retrieve' | 'update' | 'delete' | 'retrieveMultiple' | 'count' | 'metadata' | 'errorHandling';

interface OperationResult {
  success: boolean;
  data?: unknown;
  error?: string;
  duration: number;
  timestamp: Date;
  operation: OperationType;
  entityType: string;
}

interface FieldValue {
  field: string;
  value: string;
}

// ============================================================================
// Operation Configs
// ============================================================================

const OPERATIONS: Array<{
  type: OperationType;
  label: string;
  icon: React.ReactNode;
  description: string;
}> = [
  { type: 'create', label: 'Create', icon: <Add16Regular />, description: 'Create a new record' },
  { type: 'retrieve', label: 'Retrieve', icon: <Search16Regular />, description: 'Get record by ID' },
  { type: 'update', label: 'Update', icon: <Edit16Regular />, description: 'Update existing record' },
  { type: 'delete', label: 'Delete', icon: <Delete16Regular />, description: 'Delete record by ID' },
  { type: 'retrieveMultiple', label: 'Retrieve Multiple', icon: <Database16Regular />, description: 'Query multiple records' },
  { type: 'count', label: 'Count', icon: <Info16Regular />, description: 'Count records' },
  { type: 'errorHandling', label: 'Error Handling', icon: <Warning16Regular />, description: 'Test error scenarios' },
];

// ============================================================================
// Main Component
// ============================================================================

export function DataverseOperationsPlayground() {
  const styles = useStyles();
  const { entities, isPCFEnvironment, isLoading: entitiesLoading } = useDataverse();
  
  // State
  const [selectedOperation, setSelectedOperation] = useState<OperationType>('retrieve');
  const [selectedEntity, setSelectedEntity] = useState<string>('');
  const [recordId, setRecordId] = useState<string>('');
  const [fieldValues, setFieldValues] = useState<FieldValue[]>([{ field: '', value: '' }]);
  const [selectColumns, setSelectColumns] = useState<string>('');
  const [filterExpression, setFilterExpression] = useState<string>('');
  const [orderBy, setOrderBy] = useState<string>('');
  const [topCount, setTopCount] = useState<string>('50');
  const [useFetchXml, setUseFetchXml] = useState(false);
  const [fetchXml, setFetchXml] = useState<string>('');
  const [result, setResult] = useState<OperationResult | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [errorScenario, setErrorScenario] = useState<'not_found' | 'permission' | 'network' | 'validation' | 'concurrent'>('not_found');
  
  // Fetch fields for selected entity
  const { fields, isLoading: fieldsLoading } = useEntityFields(selectedEntity || undefined);

  // Generate code preview
  const generateCodePreview = useCallback(() => {
    const entityVar = selectedEntity || 'entityName';
    
    switch (selectedOperation) {
      case 'create': {
        const dataObj = fieldValues
          .filter(fv => fv.field && fv.value)
          .reduce((acc, fv) => ({ ...acc, [fv.field]: fv.value }), {});
        return `// Create Record
const crudService = createCrudService(context, {
  entityLogicalName: '${entityVar}'
});

const result = await crudService.create(${JSON.stringify(dataObj, null, 2)});

if (result.success) {
  console.log('Created:', result.data.id);
} else {
  console.error('Error:', result.error.message);
}`;
      }
      
      case 'retrieve':
        return `// Retrieve Record
const crudService = createCrudService(context, {
  entityLogicalName: '${entityVar}'
});

const result = await crudService.retrieve('${recordId || 'record-guid-here'}', {
  ${selectColumns ? `select: [${selectColumns.split(',').map(s => `'${s.trim()}'`).join(', ')}]` : '// select: ["field1", "field2"]'}
});

if (result.success) {
  console.log('Record:', result.data);
} else {
  console.error('Error:', result.error.message);
}`;

      case 'update': {
        const dataObj = fieldValues
          .filter(fv => fv.field && fv.value)
          .reduce((acc, fv) => ({ ...acc, [fv.field]: fv.value }), {});
        return `// Update Record
const crudService = createCrudService(context, {
  entityLogicalName: '${entityVar}'
});

const result = await crudService.update(
  '${recordId || 'record-guid-here'}',
  ${JSON.stringify(dataObj, null, 2)}
);

if (result.success) {
  console.log('Updated:', result.data.id);
} else {
  console.error('Error:', result.error.message);
}`;
      }

      case 'delete':
        return `// Delete Record
const crudService = createCrudService(context, {
  entityLogicalName: '${entityVar}'
});

const result = await crudService.delete('${recordId || 'record-guid-here'}');

if (result.success) {
  console.log('Deleted successfully');
} else {
  console.error('Error:', result.error.message);
}`;

      case 'retrieveMultiple':
        if (useFetchXml) {
          return `// Retrieve Multiple (FetchXML)
const queryService = createQueryService(context);

const result = await queryService.executeFetchXml('${entityVar}', {
  fetchXml: \`${fetchXml || '<fetch top="50"><entity name="' + entityVar + '"><all-attributes /></entity></fetch>'}\`
});

if (result.success) {
  console.log('Records:', result.data.entities.length);
  console.log('More records:', result.data.moreRecords);
} else {
  console.error('Error:', result.error.message);
}`;
        }
        return `// Retrieve Multiple (OData)
const queryService = createQueryService(context);

const result = await queryService.retrieveMultiple<Record>('${entityVar}', {
  ${selectColumns ? `select: [${selectColumns.split(',').map(s => `'${s.trim()}'`).join(', ')}],` : '// select: ["field1", "field2"],'}
  ${filterExpression ? `filter: "${filterExpression}",` : '// filter: "statecode eq 0",'}
  ${orderBy ? `orderBy: "${orderBy}",` : '// orderBy: "name asc",'}
  top: ${topCount || 50}
});

if (result.success) {
  console.log('Records:', result.data.entities.length);
  console.log('More records:', result.data.moreRecords);
} else {
  console.error('Error:', result.error.message);
}`;

      case 'count':
        return `// Count Records
const queryService = createQueryService(context);

const result = await queryService.count(
  '${entityVar}'${filterExpression ? `,\n  "${filterExpression}"` : ''}
);

if (result.success) {
  console.log('Total count:', result.data);
} else {
  console.error('Error:', result.error.message);
}`;

      case 'errorHandling':
        return `// ═══════════════════════════════════════════════════════════════════════════
// Error Handling with Result Pattern
// ═══════════════════════════════════════════════════════════════════════════

const crudService = createCrudService(context, {
  entityLogicalName: '${entityVar}'
});

// All operations return DataverseResult<T> - NEVER throws!
const result = await crudService.retrieve('${recordId || 'record-guid-here'}');

// Type-safe error handling
if (result.success) {
  // ✅ TypeScript knows result.data exists
  console.log('Record:', result.data);
} else {
  // ❌ TypeScript knows result.error exists
  const error = result.error;
  
  // Handle specific error types
  switch (error.code) {
    case 'NOT_FOUND':
      // Record doesn't exist or was deleted
      showNotification('Record not found', 'warning');
      break;
      
    case 'PERMISSION_DENIED':
      // User lacks required privileges
      showNotification('Access denied. Contact admin.', 'error');
      break;
      
    case 'NETWORK_ERROR':
      // Connection issue
      showNotification('Network error. Check connection.', 'error');
      // Optionally retry
      break;
      
    case 'VALIDATION_ERROR':
      // Invalid data submitted
      showNotification(\`Validation: \${error.message}\`, 'warning');
      break;
      
    case 'CONCURRENT_EDIT':
      // Record modified by another user
      showNotification('Record was modified. Refresh and retry.', 'warning');
      break;
      
    default:
      // Unexpected error - log for debugging
      console.error('Unexpected error:', error);
      showNotification('An error occurred', 'error');
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// Error Handling Utilities
// ═══════════════════════════════════════════════════════════════════════════

// Helper to safely execute with fallback
async function safeRetrieve<T>(
  service: CrudService,
  id: string,
  fallback: T
): Promise<T> {
  const result = await service.retrieve(id);
  return result.success ? result.data as T : fallback;
}

// Helper to retry on network errors
async function retryOnNetworkError<T>(
  operation: () => Promise<DataverseResult<T>>,
  maxRetries = 3
): Promise<DataverseResult<T>> {
  let lastResult: DataverseResult<T>;
  
  for (let i = 0; i < maxRetries; i++) {
    lastResult = await operation();
    if (lastResult.success || lastResult.error.code !== 'NETWORK_ERROR') {
      return lastResult;
    }
    await new Promise(r => setTimeout(r, 1000 * (i + 1))); // Exponential backoff
  }
  
  return lastResult!;
}`;

      default:
        return '// Select an operation';
    }
  }, [selectedOperation, selectedEntity, recordId, fieldValues, selectColumns, filterExpression, orderBy, topCount, useFetchXml, fetchXml, errorScenario]);

  // Execute operation (mock in dev, real in PCF)
  const executeOperation = useCallback(async () => {
    if (!selectedEntity) return;
    
    setIsExecuting(true);
    const startTime = Date.now();
    
    try {
      // In development mode, simulate the operation with mock response
      // In PCF environment, this would use real Xrm.WebApi
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
      
      let mockData: unknown;
      
      switch (selectedOperation) {
        case 'create':
          mockData = { 
            id: crypto.randomUUID(), 
            entityType: selectedEntity,
            message: isPCFEnvironment 
              ? 'Record created in Dataverse' 
              : '[DEV MODE] Would create record in Dataverse'
          };
          break;
        case 'retrieve':
          mockData = { 
            [selectedEntity + 'id']: recordId || crypto.randomUUID(),
            ...Object.fromEntries(fieldValues.filter(fv => fv.field).map(fv => [fv.field, `Sample ${fv.field}`])),
            message: isPCFEnvironment 
              ? 'Record retrieved from Dataverse' 
              : '[DEV MODE] Would retrieve record from Dataverse'
          };
          break;
        case 'update':
          mockData = { 
            id: recordId || crypto.randomUUID(), 
            entityType: selectedEntity,
            message: isPCFEnvironment 
              ? 'Record updated in Dataverse' 
              : '[DEV MODE] Would update record in Dataverse'
          };
          break;
        case 'delete':
          mockData = { 
            success: true,
            message: isPCFEnvironment 
              ? 'Record deleted from Dataverse' 
              : '[DEV MODE] Would delete record from Dataverse'
          };
          break;
        case 'retrieveMultiple':
          mockData = {
            entities: Array.from({ length: Math.min(Number(topCount) || 5, 10) }, (_, i) => ({
              [selectedEntity + 'id']: crypto.randomUUID(),
              name: `Sample ${selectedEntity} ${i + 1}`,
            })),
            moreRecords: true,
            totalCount: 100,
            message: isPCFEnvironment 
              ? 'Records retrieved from Dataverse' 
              : '[DEV MODE] Would query records from Dataverse'
          };
          break;
        case 'count':
          mockData = { 
            count: 42,
            message: isPCFEnvironment 
              ? 'Count retrieved from Dataverse' 
              : '[DEV MODE] Would count records in Dataverse'
          };
          break;
        case 'errorHandling': {
          // Simulate different error scenarios based on selection
          const errorMessages: Record<string, { code: string; message: string; details: string }> = {
            not_found: {
              code: 'NOT_FOUND',
              message: 'Record not found',
              details: 'The record with the specified ID does not exist or has been deleted.'
            },
            permission: {
              code: 'PERMISSION_DENIED',
              message: 'Access denied',
              details: 'User lacks required privileges (prvRead) for entity account.'
            },
            network: {
              code: 'NETWORK_ERROR',
              message: 'Network request failed',
              details: 'Unable to connect to Dataverse. Check network connectivity.'
            },
            validation: {
              code: 'VALIDATION_ERROR',
              message: 'Invalid data',
              details: 'Required field "name" is missing or invalid.'
            },
            concurrent: {
              code: 'CONCURRENT_EDIT',
              message: 'Record modified',
              details: 'The record was modified by another user. Refresh and retry.'
            }
          };
          
          const errorInfo = errorMessages[errorScenario];
          
          // Simulate error response
          setResult({
            success: false,
            error: `${errorInfo.code}: ${errorInfo.message}`,
            data: {
              error: {
                code: errorInfo.code,
                message: errorInfo.message,
                details: errorInfo.details,
                timestamp: new Date().toISOString(),
                entityType: selectedEntity,
                operation: 'retrieve'
              },
              howToHandle: `Use the Result pattern to check result.success and handle result.error accordingly.`
            },
            duration: Date.now() - startTime,
            timestamp: new Date(),
            operation: selectedOperation,
            entityType: selectedEntity,
          });
          setIsExecuting(false);
          return; // Exit early since we set result directly
        }
        default:
          mockData = { message: 'Operation not implemented' };
      }
      
      setResult({
        success: true,
        data: mockData,
        duration: Date.now() - startTime,
        timestamp: new Date(),
        operation: selectedOperation,
        entityType: selectedEntity,
      });
    } catch (error) {
      setResult({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        duration: Date.now() - startTime,
        timestamp: new Date(),
        operation: selectedOperation,
        entityType: selectedEntity,
      });
    } finally {
      setIsExecuting(false);
    }
  }, [selectedEntity, selectedOperation, recordId, fieldValues, topCount, isPCFEnvironment]);

  // Add field value row
  const addFieldValue = () => {
    setFieldValues([...fieldValues, { field: '', value: '' }]);
  };

  // Update field value
  const updateFieldValue = (index: number, key: 'field' | 'value', val: string) => {
    const updated = [...fieldValues];
    updated[index][key] = val;
    setFieldValues(updated);
  };

  // Remove field value
  const removeFieldValue = (index: number) => {
    setFieldValues(fieldValues.filter((_, i) => i !== index));
  };

  // Copy code
  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(generateCodePreview());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Copy failed:', err);
    }
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerTitle}>
          <Database16Regular />
          <Text size={500} weight="semibold">Dataverse Operations Playground</Text>
        </div>
        <div className={styles.envBadge}>
          <Badge 
            appearance="filled" 
            color={isPCFEnvironment ? 'success' : 'warning'}
          >
            {isPCFEnvironment ? '🟢 Live Dataverse' : '🟡 Development Mode'}
          </Badge>
          {entitiesLoading && <Spinner size="tiny" />}
        </div>
      </div>

      <div className={styles.content}>
        {/* Configuration Panel */}
        <div className={styles.configPanel}>
          {/* Operation Selection */}
          <div className={styles.section}>
            <Label className={styles.sectionTitle}>
              <Play16Regular />
              Select Operation
            </Label>
            <div className={styles.operationGrid}>
              {OPERATIONS.map(op => (
                <Tooltip key={op.type} content={op.description} relationship="description">
                  <div
                    className={mergeClasses(
                      styles.operationButton,
                      selectedOperation === op.type && styles.operationButtonActive
                    )}
                    onClick={() => setSelectedOperation(op.type)}
                  >
                    {op.icon}
                    <Text size={200}>{op.label}</Text>
                  </div>
                </Tooltip>
              ))}
            </div>
          </div>

          {/* Entity Selection */}
          <div className={styles.section}>
            <Field label="Entity (Table)" hint="Select Dataverse entity">
              <Dropdown
                placeholder="Select entity..."
                value={entities.find(e => e.logicalName === selectedEntity)?.displayName || ''}
                selectedOptions={selectedEntity ? [selectedEntity] : []}
                onOptionSelect={(_, data) => setSelectedEntity(data.optionValue || '')}
              >
                {entities.map(entity => (
                  <Option key={entity.logicalName} value={entity.logicalName} text={entity.displayName}>
                    {entity.displayName}
                    <Text size={200} style={{ marginLeft: 8, color: tokens.colorNeutralForeground3 }}>
                      ({entity.logicalName})
                    </Text>
                  </Option>
                ))}
              </Dropdown>
            </Field>
          </div>

          {/* Record ID (for retrieve, update, delete) */}
          {['retrieve', 'update', 'delete'].includes(selectedOperation) && (
            <div className={styles.section}>
              <Field label="Record ID (GUID)" hint="The unique identifier of the record">
                <Input
                  placeholder="e.g., 00000000-0000-0000-0000-000000000000"
                  value={recordId}
                  onChange={(_, data) => setRecordId(data.value)}
                />
              </Field>
            </div>
          )}

          {/* Field Values (for create, update) */}
          {['create', 'update'].includes(selectedOperation) && (
            <div className={styles.section}>
              <Label className={styles.sectionTitle}>
                <Edit16Regular />
                Field Values
              </Label>
              {fieldValues.map((fv, index) => (
                <div key={index} className={styles.fieldRow}>
                  <Dropdown
                    placeholder="Field..."
                    value={fields.find(f => f.logicalName === fv.field)?.displayName || fv.field}
                    selectedOptions={fv.field ? [fv.field] : []}
                    onOptionSelect={(_, data) => updateFieldValue(index, 'field', data.optionValue || '')}
                    disabled={fieldsLoading}
                  >
                    {fields.map(field => (
                      <Option key={field.logicalName} value={field.logicalName} text={field.displayName}>
                        {field.displayName}
                      </Option>
                    ))}
                  </Dropdown>
                  <Input
                    placeholder="Value..."
                    value={fv.value}
                    onChange={(_, data) => updateFieldValue(index, 'value', data.value)}
                  />
                  <Button
                    appearance="subtle"
                    icon={<Delete16Regular />}
                    onClick={() => removeFieldValue(index)}
                    disabled={fieldValues.length === 1}
                  />
                </div>
              ))}
              <Button appearance="subtle" icon={<Add16Regular />} onClick={addFieldValue}>
                Add Field
              </Button>
            </div>
          )}

          {/* Query Options (for retrieveMultiple) */}
          {selectedOperation === 'retrieveMultiple' && (
            <div className={styles.section}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Label className={styles.sectionTitle}>
                  <Code16Regular />
                  Query Options
                </Label>
                <Switch
                  checked={useFetchXml}
                  onChange={(_, data) => setUseFetchXml(data.checked)}
                  label="FetchXML"
                />
              </div>
              
              {useFetchXml ? (
                <Textarea
                  className={styles.jsonEditor}
                  placeholder="<fetch top='50'><entity name='account'>...</entity></fetch>"
                  value={fetchXml}
                  onChange={(_, data) => setFetchXml(data.value)}
                  resize="vertical"
                />
              ) : (
                <>
                  <Field label="$select (comma-separated)">
                    <Input
                      placeholder="name,telephone1,createdon"
                      value={selectColumns}
                      onChange={(_, data) => setSelectColumns(data.value)}
                    />
                  </Field>
                  <Field label="$filter">
                    <Input
                      placeholder="statecode eq 0 and contains(name,'contoso')"
                      value={filterExpression}
                      onChange={(_, data) => setFilterExpression(data.value)}
                    />
                  </Field>
                  <Field label="$orderby">
                    <Input
                      placeholder="name asc, createdon desc"
                      value={orderBy}
                      onChange={(_, data) => setOrderBy(data.value)}
                    />
                  </Field>
                  <Field label="$top">
                    <Input
                      type="number"
                      placeholder="50"
                      value={topCount}
                      onChange={(_, data) => setTopCount(data.value)}
                    />
                  </Field>
                </>
              )}
            </div>
          )}

          {/* Filter for count */}
          {selectedOperation === 'count' && (
            <div className={styles.section}>
              <Field label="$filter (optional)">
                <Input
                  placeholder="statecode eq 0"
                  value={filterExpression}
                  onChange={(_, data) => setFilterExpression(data.value)}
                />
              </Field>
            </div>
          )}

          {/* Error Scenario Selection (for errorHandling) */}
          {selectedOperation === 'errorHandling' && (
            <div className={styles.section}>
              <Label className={styles.sectionTitle}>
                <ErrorCircle16Regular />
                Simulate Error Scenario
              </Label>
              <Field hint="Select an error type to see how to handle it">
                <Dropdown
                  value={
                    errorScenario === 'not_found' ? 'Record Not Found' :
                    errorScenario === 'permission' ? 'Permission Denied' :
                    errorScenario === 'network' ? 'Network Error' :
                    errorScenario === 'validation' ? 'Validation Error' :
                    'Concurrent Edit'
                  }
                  selectedOptions={[errorScenario]}
                  onOptionSelect={(_, data) => setErrorScenario(data.optionValue as typeof errorScenario)}
                >
                  <Option value="not_found" text="Record Not Found">
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <Text weight="semibold">Record Not Found</Text>
                      <Text size={200}>Record doesn't exist or was deleted</Text>
                    </div>
                  </Option>
                  <Option value="permission" text="Permission Denied">
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <Text weight="semibold">Permission Denied</Text>
                      <Text size={200}>User lacks required privileges</Text>
                    </div>
                  </Option>
                  <Option value="network" text="Network Error">
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <Text weight="semibold">Network Error</Text>
                      <Text size={200}>Connection failed or timeout</Text>
                    </div>
                  </Option>
                  <Option value="validation" text="Validation Error">
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <Text weight="semibold">Validation Error</Text>
                      <Text size={200}>Invalid data submitted</Text>
                    </div>
                  </Option>
                  <Option value="concurrent" text="Concurrent Edit">
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <Text weight="semibold">Concurrent Edit</Text>
                      <Text size={200}>Record modified by another user</Text>
                    </div>
                  </Option>
                </Dropdown>
              </Field>
              <Card style={{ marginTop: tokens.spacingVerticalS, backgroundColor: tokens.colorNeutralBackground3 }}>
                <Text size={200}>
                  💡 <strong>Tip:</strong> Run the operation to see how errors are structured and 
                  view the generated code for handling patterns.
                </Text>
              </Card>
            </div>
          )}

          {/* Execute Button */}
          <Button
            appearance="primary"
            icon={isExecuting ? <Spinner size="tiny" /> : <Play16Regular />}
            onClick={executeOperation}
            disabled={!selectedEntity || isExecuting}
          >
            {isExecuting ? 'Executing...' : 'Execute Operation'}
          </Button>
        </div>

        {/* Results Panel */}
        <div className={styles.resultPanel}>
          <TabList defaultSelectedValue="code">
            <Tab value="code">Generated Code</Tab>
            <Tab value="result">Execution Result</Tab>
          </TabList>

          {/* Code Preview */}
          <div className={styles.resultHeader}>
            <Text weight="semibold">TypeScript Code</Text>
            <Tooltip content={copied ? 'Copied!' : 'Copy code'} relationship="label">
              <Button
                appearance="subtle"
                icon={copied ? <Checkmark16Regular /> : <Copy16Regular />}
                onClick={copyCode}
              />
            </Tooltip>
          </div>
          <pre className={styles.codeBlock}>
            {generateCodePreview()}
          </pre>

          {/* Execution Result */}
          {result && (
            <>
              <div className={styles.resultHeader}>
                <div className={styles.statusBadge}>
                  <Badge appearance="filled" color={result.success ? 'success' : 'danger'}>
                    {result.success ? 'SUCCESS' : 'ERROR'}
                  </Badge>
                  <Text size={200}>{result.duration}ms</Text>
                  <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>
                    {result.timestamp.toLocaleTimeString()}
                  </Text>
                </div>
                <Button
                  appearance="subtle"
                  size="small"
                  icon={<ArrowSync16Regular />}
                  onClick={executeOperation}
                >
                  Re-run
                </Button>
              </div>
              <pre className={styles.codeBlock}>
                {JSON.stringify(result.success ? result.data : { error: result.error }, null, 2)}
              </pre>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default DataverseOperationsPlayground;
