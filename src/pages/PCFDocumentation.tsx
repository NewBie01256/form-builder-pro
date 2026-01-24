import {
  makeStyles,
  tokens,
  Title1,
  Title2,
  Title3,
  Body1,
  Card,
  CardHeader,
  Badge,
  Divider,
  Link,
  Button,
} from "@fluentui/react-components";
import { Link as RouterLink } from "react-router-dom";
import {
  ArrowLeft24Regular,
  Database24Regular,
  Shield24Regular,
  Rocket24Regular,
  Warning24Regular,
  Checkmark24Regular,
  ArrowRight16Regular,
  Folder16Regular,
  Play24Regular,
} from "@fluentui/react-icons";
import { useState, useEffect, useRef } from "react";

// Self-contained PCF docs imports (no project dependencies)
import { CodeBlock, DynamicValuesPlayground } from "@/features/pcf-docs";

const useStyles = makeStyles({
  container: {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: tokens.colorNeutralBackground2,
  },
  sidebar: {
    width: "280px",
    backgroundColor: tokens.colorNeutralBackground1,
    borderRight: `1px solid ${tokens.colorNeutralStroke2}`,
    padding: tokens.spacingVerticalL,
    position: "sticky",
    top: 0,
    height: "100vh",
    overflowY: "auto",
    flexShrink: 0,
  },
  sidebarTitle: {
    marginBottom: tokens.spacingVerticalL,
  },
  navSection: {
    marginBottom: tokens.spacingVerticalM,
  },
  navSectionTitle: {
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground3,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    marginBottom: tokens.spacingVerticalS,
    paddingLeft: tokens.spacingHorizontalS,
  },
  navLink: {
    display: "block",
    padding: `${tokens.spacingVerticalXS} ${tokens.spacingHorizontalS}`,
    borderRadius: tokens.borderRadiusMedium,
    color: tokens.colorNeutralForeground2,
    textDecoration: "none",
    fontSize: tokens.fontSizeBase300,
    transition: "all 0.15s ease",
    "&:hover": {
      backgroundColor: tokens.colorNeutralBackground3,
      color: tokens.colorNeutralForeground1,
    },
  },
  navLinkActive: {
    backgroundColor: tokens.colorBrandBackground2,
    color: tokens.colorBrandForeground1,
    fontWeight: tokens.fontWeightSemibold,
  },
  main: {
    flex: 1,
    padding: tokens.spacingVerticalXXL,
    maxWidth: "900px",
  },
  backLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    color: tokens.colorBrandForeground1,
    textDecoration: "none",
    marginBottom: tokens.spacingVerticalL,
    fontSize: tokens.fontSizeBase300,
    "&:hover": {
      textDecoration: "underline",
    },
  },
  header: {
    marginBottom: tokens.spacingVerticalXXL,
  },
  headerBadges: {
    display: "flex",
    gap: tokens.spacingHorizontalS,
    marginTop: tokens.spacingVerticalS,
  },
  section: {
    marginBottom: tokens.spacingVerticalXXL,
    scrollMarginTop: tokens.spacingVerticalXL,
  },
  inlineCode: {
    backgroundColor: tokens.colorNeutralBackground4,
    padding: `${tokens.spacingVerticalXXS} ${tokens.spacingHorizontalXS}`,
    borderRadius: tokens.borderRadiusSmall,
    fontFamily: "monospace",
    fontSize: tokens.fontSizeBase200,
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: tokens.spacingVerticalM,
    marginBottom: tokens.spacingVerticalM,
  },
  th: {
    textAlign: "left",
    padding: tokens.spacingVerticalS,
    backgroundColor: tokens.colorNeutralBackground3,
    borderBottom: `2px solid ${tokens.colorNeutralStroke1}`,
    fontWeight: tokens.fontWeightSemibold,
  },
  td: {
    padding: tokens.spacingVerticalS,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    verticalAlign: "top",
  },
  warningBox: {
    backgroundColor: tokens.colorPaletteYellowBackground1,
    border: `1px solid ${tokens.colorPaletteYellowBorder1}`,
    borderRadius: tokens.borderRadiusMedium,
    padding: tokens.spacingVerticalM,
    marginTop: tokens.spacingVerticalM,
    marginBottom: tokens.spacingVerticalM,
    display: "flex",
    gap: tokens.spacingHorizontalM,
  },
  successBox: {
    backgroundColor: tokens.colorPaletteGreenBackground1,
    border: `1px solid ${tokens.colorPaletteGreenBorder1}`,
    borderRadius: tokens.borderRadiusMedium,
    padding: tokens.spacingVerticalM,
    marginTop: tokens.spacingVerticalM,
    marginBottom: tokens.spacingVerticalM,
    display: "flex",
    gap: tokens.spacingHorizontalM,
  },
  list: {
    marginTop: tokens.spacingVerticalS,
    marginBottom: tokens.spacingVerticalM,
    paddingLeft: tokens.spacingHorizontalXL,
  },
  listItem: {
    marginBottom: tokens.spacingVerticalXS,
  },
  diagram: {
    backgroundColor: "#282c34",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusMedium,
    padding: tokens.spacingVerticalL,
    marginTop: tokens.spacingVerticalM,
    marginBottom: tokens.spacingVerticalM,
    fontFamily: "monospace",
    fontSize: tokens.fontSizeBase200,
    whiteSpace: "pre",
    overflow: "auto",
    color: "#abb2bf",
  },
  flexRow: {
    display: "flex",
    gap: tokens.spacingHorizontalM,
    flexWrap: "wrap",
  },
  featureCard: {
    flex: "1 1 280px",
    minWidth: "280px",
  },
  codePath: {
    display: "inline-flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
    backgroundColor: tokens.colorNeutralBackground4,
    padding: `${tokens.spacingVerticalXXS} ${tokens.spacingHorizontalS}`,
    borderRadius: tokens.borderRadiusSmall,
    fontFamily: "monospace",
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
    marginLeft: tokens.spacingHorizontalM,
    fontWeight: tokens.fontWeightRegular,
  },
  sectionHeader: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: tokens.spacingHorizontalS,
  },
});

// Code snippets
// ============================================================================
// STEP-BY-STEP GUIDE CODE SNIPPETS - PRACTICAL IMPLEMENTATION
// ============================================================================

// -----------------------------------------------------------------------------
// GUIDE: Creating a Dynamic Entity Dropdown Service
// -----------------------------------------------------------------------------

const GUIDE_OVERVIEW = `/**
 * ============================================================================
 * GOAL: Fetch REAL entities from YOUR Dynamics 365 CRM at runtime
 * ============================================================================
 * 
 * ⚠️  NO HARDCODED DATA - This code fetches LIVE data from Dataverse!
 * 
 * HOW IT WORKS:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  1. You deploy the PCF control to Dynamics 365                          │
 * │  2. Dynamics 365 provides the 'context' object to your control          │
 * │  3. context.webAPI connects to YOUR environment's Dataverse             │
 * │  4. QueryService wraps webAPI with error handling                       │
 * │  5. Your dropdown shows REAL accounts, contacts, etc. from your CRM     │
 * └─────────────────────────────────────────────────────────────────────────┘
 * 
 * This guide shows you how to:
 * 1. Create a service file that fetches entities at runtime
 * 2. Use the existing PCF wrapper (QueryService) from this project
 * 3. Populate a dropdown with LIVE CRM data
 * 
 * FILES YOU'LL CREATE:
 * └── src/lib/dataverse/
 *     └── DynamicDropdownService.ts    ← New service file
 * 
 * EXISTING FILES YOU'LL USE:
 * └── src/lib/dataverse/pcf/
 *     ├── QueryService.ts              ← Wraps context.webAPI
 *     ├── CrudService.ts               ← For CRUD operations
 *     ├── types.ts                     ← Type definitions
 *     └── index.ts                     ← All exports
 */`;

const GUIDE_STEP1_CREATE_SERVICE = `// =============================================================================
// STEP 1: Create a new service file
// =============================================================================
// 
// CREATE FILE: src/lib/dataverse/DynamicDropdownService.ts
// 
// ⚠️  IMPORTANT: This service fetches REAL data from Dataverse!
//     The 'context' parameter comes from Dynamics 365 at runtime.
//     context.webAPI is connected to YOUR CRM environment.
// 
// This service will:
// - Accept a PCF context (provided by Dynamics 365 at runtime)
// - Use QueryService to execute REAL queries against your CRM
// - Return LIVE entities from your Dynamics 365 environment

import { 
  QueryService,
  type IPCFContext,
  type DataverseResult,
  type ODataOptions,
} from '@/lib/dataverse/pcf';

/**
 * Dropdown option structure - represents REAL CRM records
 */
export interface DropdownOption {
  value: string;      // The record's GUID (e.g., accountid)
  label: string;      // The record's name (e.g., account name)
  metadata?: Record<string, unknown>;  // Additional fields
}

/**
 * Configuration for which entity/fields to fetch
 * All data comes from YOUR Dataverse environment at runtime
 */
export interface DropdownConfig {
  /** Entity logical name - must exist in YOUR CRM (e.g., 'account', 'contact') */
  entityName: string;
  /** Primary key field (e.g., 'accountid', 'contactid') */
  valueField: string;
  /** Display name field (e.g., 'name', 'fullname') */
  labelField: string;
  /** OData filter - filters REAL records (e.g., "statecode eq 0") */
  filter?: string;
  /** Sort field and direction */
  orderBy?: string;
  /** Max records to fetch (default: 500) */
  top?: number;
  /** Additional fields to retrieve */
  additionalFields?: string[];
}

/**
 * Service for loading dropdown options from YOUR Dataverse environment
 * 
 * RUNTIME FLOW:
 * 1. PCF control receives 'context' from Dynamics 365
 * 2. context.webAPI is connected to YOUR CRM instance
 * 3. QueryService wraps webAPI with error handling
 * 4. loadOptions() fetches REAL records from your CRM
 */
export class DynamicDropdownService {
  private queryService: QueryService;

  /**
   * @param context - PCF context from Dynamics 365 (contains webAPI)
   */
  constructor(context: IPCFContext) {
    // QueryService uses context.webAPI internally
    // webAPI is connected to YOUR Dynamics 365 environment
    this.queryService = new QueryService(context);
  }

  /**
   * Load REAL records from any Dataverse entity in your CRM
   * 
   * @example
   * // This will fetch REAL accounts from your Dynamics 365:
   * const result = await service.loadOptions({
   *   entityName: 'account',     // Your CRM's account table
   *   valueField: 'accountid',   // Real GUID from your records
   *   labelField: 'name',        // Real account names
   *   filter: 'statecode eq 0',  // Only active accounts
   * });
   */
  async loadOptions(config: DropdownConfig): Promise<DataverseResult<DropdownOption[]>> {
    // Build OData query - this becomes a REAL API call to Dataverse
    const options: ODataOptions = {
      select: [config.valueField, config.labelField, ...(config.additionalFields || [])],
      filter: config.filter,
      orderBy: config.orderBy || \`\${config.labelField} asc\`,
      top: config.top || 500,
    };

    // ⚡ THIS IS THE REAL API CALL ⚡
    // QueryService.retrieveMultiple() calls context.webAPI.retrieveMultipleRecords()
    // This hits YOUR Dataverse environment and returns YOUR records
    const result = await this.queryService.retrieveMultiple<Record<string, unknown>>(
      config.entityName,
      options
    );

    if (!result.success) {
      // Error from Dataverse (e.g., entity doesn't exist, no permission)
      return result;
    }

    // Map REAL Dataverse records to dropdown options
    const dropdownOptions: DropdownOption[] = result.data.entities.map(entity => ({
      value: String(entity[config.valueField] || ''),  // Real GUID
      label: String(entity[config.labelField] || ''),  // Real name
      metadata: config.additionalFields?.reduce((acc, field) => {
        acc[field] = entity[field];  // Real field values
        return acc;
      }, {} as Record<string, unknown>),
    }));

    return { success: true, data: dropdownOptions };
  }

  /**
   * Update context when PCF refreshes (call in updateView)
   */
  updateContext(context: IPCFContext): void {
    this.queryService.updateContext(context);
  }
}`;

const GUIDE_STEP2_USE_IN_PCF = `// =============================================================================
// STEP 2: Use the service in your PCF Control
// =============================================================================
//
// ⚠️  DEPLOYMENT REQUIRED: This code only works when deployed to Dynamics 365!
//
// When you deploy this PCF control:
// 1. Dynamics 365 creates an instance of your control
// 2. D365 passes 'context' to your init() method
// 3. context.webAPI is connected to the current D365 environment
// 4. Your dropdown loads REAL data from that environment

import { DynamicDropdownService, type DropdownConfig } from '@/lib/dataverse/DynamicDropdownService';
import type { IInputs, IOutputs } from './generated/ManifestTypes';

export class DynamicEntityDropdown implements ComponentFramework.StandardControl<IInputs, IOutputs> {
  private container!: HTMLDivElement;
  private dropdownService!: DynamicDropdownService;
  private selectElement!: HTMLSelectElement;
  private selectedValue: string = '';
  private notifyOutputChanged!: () => void;

  /**
   * PCF init - called ONCE when control loads in Dynamics 365
   * 
   * @param context - PROVIDED BY DYNAMICS 365 (not created by you!)
   *                  Contains webAPI connected to the current CRM environment
   */
  public init(
    context: ComponentFramework.Context<IInputs>,
    notifyOutputChanged: () => void,
    state: ComponentFramework.Dictionary,
    container: HTMLDivElement
  ): void {
    this.container = container;
    this.notifyOutputChanged = notifyOutputChanged;

    // ═══════════════════════════════════════════════════════════════════════
    // THE MAGIC: context.webAPI is connected to YOUR CRM environment
    // ═══════════════════════════════════════════════════════════════════════
    // When deployed to production D365: connects to production Dataverse
    // When deployed to dev D365: connects to dev Dataverse
    // When in PCF test harness: uses mock/sandbox data
    
    this.dropdownService = new DynamicDropdownService(context);

    // Create the dropdown UI
    this.createDropdownUI();

    // Load REAL entities from Dataverse
    this.loadEntities();
  }

  private createDropdownUI(): void {
    this.selectElement = document.createElement('select');
    this.selectElement.className = 'pcf-dropdown';
    this.selectElement.innerHTML = '<option value="">Loading from Dataverse...</option>';
    this.selectElement.onchange = () => {
      this.selectedValue = this.selectElement.value;
      this.notifyOutputChanged();
    };
    this.container.appendChild(this.selectElement);
  }

  private async loadEntities(): Promise<void> {
    // ═══════════════════════════════════════════════════════════════════════
    // CONFIGURE: Which entity and fields to fetch from YOUR CRM
    // ═══════════════════════════════════════════════════════════════════════
    // These are the ACTUAL entity/field names in your Dynamics 365:
    
    const config: DropdownConfig = {
      entityName: 'account',           // Real entity in your D365
      valueField: 'accountid',         // Real primary key field
      labelField: 'name',              // Real display field
      filter: 'statecode eq 0',        // OData filter (active only)
      orderBy: 'name asc',             // Sort order
      top: 500,                        // Max records
    };

    // ═══════════════════════════════════════════════════════════════════════
    // FETCH: This calls YOUR Dataverse and returns YOUR real records
    // ═══════════════════════════════════════════════════════════════════════
    const result = await this.dropdownService.loadOptions(config);

    if (!result.success) {
      // Real error from Dataverse (permission denied, entity not found, etc.)
      this.showError(result.error.userMessage);
      return;
    }

    // ═══════════════════════════════════════════════════════════════════════
    // DISPLAY: Populate dropdown with REAL accounts from your CRM
    // ═══════════════════════════════════════════════════════════════════════
    this.selectElement.innerHTML = '<option value="">-- Select Account --</option>';
    
    // result.data contains REAL records from your Dynamics 365
    for (const option of result.data) {
      const optionEl = document.createElement('option');
      optionEl.value = option.value;      // Real accountid GUID
      optionEl.textContent = option.label; // Real account name
      this.selectElement.appendChild(optionEl);
    }
    
    console.log(\`Loaded \${result.data.length} accounts from Dataverse\`);
  }

  private showError(message: string): void {
    this.selectElement.innerHTML = \`<option value="">Error: \${message}</option>\`;
    this.selectElement.disabled = true;
  }

  /**
   * PCF updateView - called when context changes
   * IMPORTANT: Always update the service context here
   */
  public updateView(context: ComponentFramework.Context<IInputs>): void {
    this.dropdownService.updateContext(context);
  }

  public getOutputs(): IOutputs {
    return { selectedValue: this.selectedValue };
  }

  public destroy(): void {
    // Cleanup
  }
}`;

const GUIDE_STEP3_ENTITY_CONFIGS = `// =============================================================================
// STEP 3: Discover entities and fields dynamically FROM Dataverse
// =============================================================================
//
// ⚠️  NO PRE-BUILT CONFIGS - Everything is fetched from YOUR Dataverse at runtime!
//
// This shows how to:
// 1. Get the list of available entities from YOUR CRM
// 2. Get the fields of any entity dynamically
// 3. Build dropdown configs based on actual metadata

import { 
  BaseDataverseService,
  type IPCFContext,
  type DataverseResult,
  type EntityMetadata,
  type AttributeMetadata,
} from '@/lib/dataverse/pcf';

/**
 * Service to discover entities and fields from YOUR Dataverse at runtime
 */
export class EntityDiscoveryService extends BaseDataverseService {
  
  constructor(context: IPCFContext) {
    super(context);
  }

  /**
   * Get metadata for any entity in YOUR Dataverse
   * Returns the actual fields, types, and constraints from YOUR CRM
   * 
   * @param entityName - Logical name (e.g., 'account', 'contact', or YOUR custom entity)
   */
  async getEntityFields(entityName: string): Promise<DataverseResult<AttributeMetadata[]>> {
    // ═══════════════════════════════════════════════════════════════════════
    // THIS CALLS YOUR DATAVERSE TO GET REAL METADATA
    // ═══════════════════════════════════════════════════════════════════════
    const result = await this.getEntityMetadata(entityName);
    
    if (!result.success) {
      return result;
    }
    
    return { success: true, data: result.data.Attributes };
  }

  /**
   * Get the primary key field name for any entity
   */
  async getPrimaryKeyField(entityName: string): Promise<DataverseResult<string>> {
    const result = await this.getEntityMetadata(entityName);
    
    if (!result.success) {
      return result;
    }
    
    // PrimaryIdAttribute is the actual primary key from YOUR entity
    return { success: true, data: result.data.PrimaryIdAttribute };
  }

  /**
   * Get the primary name field (display field) for any entity
   */
  async getPrimaryNameField(entityName: string): Promise<DataverseResult<string>> {
    const result = await this.getEntityMetadata(entityName);
    
    if (!result.success) {
      return result;
    }
    
    // PrimaryNameAttribute is the actual display field from YOUR entity
    return { success: true, data: result.data.PrimaryNameAttribute };
  }

  /**
   * Build a dropdown config dynamically from YOUR Dataverse metadata
   * No hardcoding - everything discovered at runtime
   */
  async buildDynamicConfig(
    entityName: string,
    options?: {
      filter?: string;
      orderDirection?: 'asc' | 'desc';
      top?: number;
    }
  ): Promise<DataverseResult<DropdownConfig>> {
    
    // Fetch REAL metadata from YOUR Dataverse
    const metadataResult = await this.getEntityMetadata(entityName);
    
    if (!metadataResult.success) {
      return metadataResult;
    }
    
    const metadata = metadataResult.data;
    
    // Build config using actual field names from YOUR CRM
    const config: DropdownConfig = {
      entityName: entityName,
      valueField: metadata.PrimaryIdAttribute,      // Real primary key
      labelField: metadata.PrimaryNameAttribute,    // Real display field
      filter: options?.filter || 'statecode eq 0',  // Default: active only
      orderBy: \`\${metadata.PrimaryNameAttribute} \${options?.orderDirection || 'asc'}\`,
      top: options?.top || 500,
    };
    
    return { success: true, data: config };
  }

  /**
   * Get filterable fields for an entity (for building dynamic filters)
   */
  async getFilterableFields(entityName: string): Promise<DataverseResult<AttributeMetadata[]>> {
    const result = await this.getEntityMetadata(entityName);
    
    if (!result.success) {
      return result;
    }
    
    // Return fields that can be used in filters
    const filterableFields = result.data.Attributes.filter(attr => 
      attr.IsValidForRead && 
      !['Virtual', 'Image', 'File'].includes(attr.AttributeType)
    );
    
    return { success: true, data: filterableFields };
  }
}

// =============================================================================
// USAGE IN PCF CONTROL
// =============================================================================

/**
 * Example: Load ANY entity dynamically with auto-discovered fields
 */
async function loadEntityDynamically(
  context: IPCFContext,
  entityName: string,        // Could come from user selection or configuration
  customFilter?: string      // Optional filter from user
): Promise<DropdownOption[]> {
  
  const discoveryService = new EntityDiscoveryService(context);
  const dropdownService = new DynamicDropdownService(context);
  
  // ═══════════════════════════════════════════════════════════════════════
  // STEP 1: Discover the config from Dataverse metadata
  // ═══════════════════════════════════════════════════════════════════════
  const configResult = await discoveryService.buildDynamicConfig(entityName, {
    filter: customFilter,
    orderDirection: 'asc',
    top: 500,
  });
  
  if (!configResult.success) {
    console.error('Failed to discover entity:', configResult.error);
    return [];
  }
  
  console.log('Discovered config:', configResult.data);
  // Output: { entityName: 'account', valueField: 'accountid', labelField: 'name', ... }
  // These field names came from YOUR Dataverse, not hardcoded!
  
  // ═══════════════════════════════════════════════════════════════════════
  // STEP 2: Fetch actual records using the discovered config
  // ═══════════════════════════════════════════════════════════════════════
  const dataResult = await dropdownService.loadOptions(configResult.data);
  
  if (!dataResult.success) {
    console.error('Failed to load data:', dataResult.error);
    return [];
  }
  
  // These are REAL records from YOUR Dataverse
  return dataResult.data;
}

// =============================================================================
// EXAMPLE: ENTITY PICKER THAT DISCOVERS AVAILABLE ENTITIES
// =============================================================================

/**
 * Get list of available entities in YOUR Dataverse
 * Uses the Metadata API to discover what tables exist
 */
async function getAvailableEntities(
  context: IPCFContext
): Promise<{ logicalName: string; displayName: string }[]> {
  
  // Use WebApi to query entity definitions from YOUR Dataverse
  const result = await context.webAPI.retrieveMultipleRecords(
    'EntityDefinition',
    '?$select=LogicalName,DisplayName&$filter=IsCustomizable/Value eq true'
  );
  
  return result.entities.map(entity => ({
    logicalName: entity.LogicalName,
    displayName: entity.DisplayName?.UserLocalizedLabel?.Label || entity.LogicalName,
  }));
}

// Usage:
// const entities = await getAvailableEntities(context);
// → Returns ALL customizable entities from YOUR Dataverse
// → User can select an entity, then loadEntityDynamically() fetches its data`;

const GUIDE_STEP4_DYNAMIC_ENTITY = `// =============================================================================
// STEP 4: Load ANY entity dynamically (runtime configuration)
// =============================================================================
//
// Sometimes you need to load entities based on user configuration
// or form metadata, not hardcoded values

/**
 * Load entities dynamically based on form configuration
 */
async function loadDynamicEntity(
  dropdownService: DynamicDropdownService,
  entityName: string,      // From configuration/UI
  displayField: string,    // From configuration/UI
  filterExpression?: string
): Promise<DropdownOption[]> {
  
  // Build config from runtime parameters
  const config: DropdownConfig = {
    entityName: entityName,
    valueField: \`\${entityName}id\`,    // Standard naming convention
    labelField: displayField,
    filter: filterExpression || 'statecode eq 0',
    orderBy: \`\${displayField} asc\`,
    top: 500,
  };

  const result = await dropdownService.loadOptions(config);
  
  if (!result.success) {
    console.error(\`Failed to load \${entityName}:\`, result.error);
    return [];
  }

  return result.data;
}

// Example usage with DynamicValueConfig from questionnaire:
async function loadFromQuestionnaireConfig(
  dropdownService: DynamicDropdownService,
  dynamicConfig: DynamicValueConfig
): Promise<DropdownOption[]> {
  
  // Convert DynamicValueConfig to DropdownConfig
  const config: DropdownConfig = {
    entityName: dynamicConfig.tableName,
    valueField: dynamicConfig.valueField,
    labelField: dynamicConfig.labelField,
    orderBy: dynamicConfig.orderByField 
      ? \`\${dynamicConfig.orderByField} \${dynamicConfig.orderDirection || 'asc'}\`
      : undefined,
    top: 500,
  };

  // If conditionGroup exists, convert to OData filter
  if (dynamicConfig.conditionGroup?.children?.length) {
    config.filter = buildODataFilter(dynamicConfig.conditionGroup);
  }

  return (await dropdownService.loadOptions(config)).success 
    ? (await dropdownService.loadOptions(config)).data 
    : [];
}

// Helper to convert condition group to OData filter
function buildODataFilter(group: DynamicValueConditionGroup): string {
  const conditions = group.children
    .filter(c => c.type === 'filter' && c.field)
    .map(c => {
      const filter = c as DynamicValueCondition;
      const value = isNaN(Number(filter.value)) 
        ? \`'\${filter.value}'\` 
        : filter.value;
      return \`\${filter.field} eq \${value}\`;
    });
  
  return conditions.join(group.matchType === 'AND' ? ' and ' : ' or ');
}`;

const GUIDE_STEP5_FETCHXML_ADVANCED = `// =============================================================================
// STEP 5: Advanced - Generate FetchXML dynamically at runtime
// =============================================================================
//
// ⚠️  NO HARDCODED FETCHXML TEMPLATES!
//     FetchXML is generated dynamically based on:
//     - Entity metadata from YOUR Dataverse
//     - User-configured filters
//     - Runtime parameters

import { QueryService, BaseDataverseService } from '@/lib/dataverse/pcf';
import type { IPCFContext, DataverseResult, AttributeMetadata } from '@/lib/dataverse/pcf';

/**
 * Service to build and execute FetchXML dynamically from Dataverse metadata
 */
export class DynamicFetchXmlService extends BaseDataverseService {
  private queryService: QueryService;

  constructor(context: IPCFContext) {
    super(context);
    this.queryService = new QueryService(context);
  }

  /**
   * Build FetchXML dynamically using metadata from YOUR Dataverse
   * No hardcoded entity/field names - everything discovered at runtime
   */
  async buildDynamicFetchXml(
    entityName: string,
    options?: {
      filter?: { field: string; operator: string; value: string }[];
      linkedEntity?: { 
        name: string; 
        fromField: string; 
        toField: string; 
        fields: string[];
      };
      orderBy?: { field: string; descending?: boolean };
      top?: number;
    }
  ): Promise<DataverseResult<string>> {
    
    // ═══════════════════════════════════════════════════════════════════════
    // STEP 1: Get REAL metadata from YOUR Dataverse
    // ═══════════════════════════════════════════════════════════════════════
    const metadataResult = await this.getEntityMetadata(entityName);
    
    if (!metadataResult.success) {
      return metadataResult;
    }
    
    const metadata = metadataResult.data;
    const primaryId = metadata.PrimaryIdAttribute;
    const primaryName = metadata.PrimaryNameAttribute;
    
    // ═══════════════════════════════════════════════════════════════════════
    // STEP 2: Build FetchXML using discovered field names
    // ═══════════════════════════════════════════════════════════════════════
    let fetchXml = \`<fetch top="\${options?.top || 500}">\`;
    fetchXml += \`<entity name="\${entityName}">\`;
    
    // Add primary attributes (discovered from metadata)
    fetchXml += \`<attribute name="\${primaryId}" />\`;
    fetchXml += \`<attribute name="\${primaryName}" />\`;
    
    // Add dynamic filters (from user configuration)
    if (options?.filter && options.filter.length > 0) {
      fetchXml += '<filter type="and">';
      for (const f of options.filter) {
        fetchXml += \`<condition attribute="\${f.field}" operator="\${f.operator}" value="\${f.value}" />\`;
      }
      fetchXml += '</filter>';
    }
    
    // Add ordering (from user configuration)
    if (options?.orderBy) {
      fetchXml += \`<order attribute="\${options.orderBy.field}" descending="\${options.orderBy.descending || false}" />\`;
    } else {
      fetchXml += \`<order attribute="\${primaryName}" />\`;
    }
    
    // Add linked entity (for lookup relationships)
    if (options?.linkedEntity) {
      const link = options.linkedEntity;
      fetchXml += \`<link-entity name="\${link.name}" from="\${link.fromField}" to="\${link.toField}" link-type="outer">\`;
      for (const field of link.fields) {
        fetchXml += \`<attribute name="\${field}" alias="\${link.name}_\${field}" />\`;
      }
      fetchXml += '</link-entity>';
    }
    
    fetchXml += '</entity></fetch>';
    
    return { success: true, data: fetchXml };
  }

  /**
   * Execute dynamically built FetchXML and return results
   */
  async executeDynamicQuery<T extends Record<string, unknown>>(
    entityName: string,
    options?: Parameters<typeof this.buildDynamicFetchXml>[1]
  ): Promise<DataverseResult<T[]>> {
    
    // Build FetchXML from metadata
    const fetchXmlResult = await this.buildDynamicFetchXml(entityName, options);
    
    if (!fetchXmlResult.success) {
      return fetchXmlResult;
    }
    
    console.log('Generated FetchXML:', fetchXmlResult.data);
    
    // Execute against YOUR Dataverse
    const result = await this.queryService.executeFetchXml<T>(
      entityName,
      { fetchXml: fetchXmlResult.data }
    );
    
    if (!result.success) {
      return result;
    }
    
    return { success: true, data: result.data.entities };
  }

  /**
   * Discover lookup relationships for an entity
   * Returns fields that link to other entities in YOUR Dataverse
   */
  async discoverLookupFields(entityName: string): Promise<DataverseResult<AttributeMetadata[]>> {
    const metadataResult = await this.getEntityMetadata(entityName);
    
    if (!metadataResult.success) {
      return metadataResult;
    }
    
    // Filter to lookup type attributes
    const lookupFields = metadataResult.data.Attributes.filter(attr => 
      attr.AttributeType === 'Lookup' || 
      attr.AttributeType === 'Customer' ||
      attr.AttributeType === 'Owner'
    );
    
    return { success: true, data: lookupFields };
  }
}

// =============================================================================
// USAGE: Fully dynamic FetchXML with linked entities
// =============================================================================

async function loadRecordsWithRelatedData(
  context: IPCFContext,
  entityName: string,              // e.g., 'account' - from user selection
  lookupField: string,             // e.g., 'primarycontactid' - discovered at runtime
  lookupTargetEntity: string,      // e.g., 'contact' - discovered at runtime
  lookupTargetFields: string[],    // e.g., ['fullname', 'emailaddress1'] - user selected
  userFilters?: { field: string; operator: string; value: string }[]
): Promise<Record<string, unknown>[]> {
  
  const fetchService = new DynamicFetchXmlService(context);
  
  // ═══════════════════════════════════════════════════════════════════════
  // ALL PARAMETERS COME FROM RUNTIME - NO HARDCODING
  // ═══════════════════════════════════════════════════════════════════════
  const result = await fetchService.executeDynamicQuery(entityName, {
    filter: userFilters,
    linkedEntity: {
      name: lookupTargetEntity,
      fromField: \`\${lookupTargetEntity}id\`,  // Discovered primary key
      toField: lookupField,
      fields: lookupTargetFields,
    },
    orderBy: { field: 'createdon', descending: true },
    top: 500,
  });
  
  if (!result.success) {
    console.error('Query failed:', result.error);
    return [];
  }
  
  // Returns REAL data from YOUR Dataverse with related entity fields
  return result.data;
}

// =============================================================================
// EXAMPLE: Complete dynamic workflow
// =============================================================================

async function completeExample(context: IPCFContext) {
  const fetchService = new DynamicFetchXmlService(context);
  
  // 1. User selects entity (e.g., from a dropdown populated by getAvailableEntities)
  const selectedEntity = 'account';  // This comes from user selection
  
  // 2. Discover lookup fields for that entity
  const lookupsResult = await fetchService.discoverLookupFields(selectedEntity);
  if (!lookupsResult.success) return;
  
  console.log('Available lookups:', lookupsResult.data);
  // → Shows real lookup fields from YOUR account entity
  
  // 3. User selects a lookup to include (e.g., 'primarycontactid')
  const selectedLookup = lookupsResult.data[0];
  
  // 4. Get metadata for the target entity
  const targetEntity = selectedLookup.Targets[0];  // e.g., 'contact'
  
  // 5. Execute query with all runtime-discovered parameters
  const records = await loadRecordsWithRelatedData(
    context,
    selectedEntity,
    selectedLookup.LogicalName,
    targetEntity,
    ['fullname', 'emailaddress1'],  // User-selected fields
    [{ field: 'statecode', operator: 'eq', value: '0' }]  // User-configured filter
  );
  
  console.log('Loaded records with related data:', records);
  // → REAL records from YOUR Dataverse with linked entity data
}`;

const GUIDE_FILE_STRUCTURE = `// =============================================================================
// SUMMARY: Project File Structure
// =============================================================================
//
// After following this guide, your project structure should look like:

/*
src/
├── lib/
│   └── dataverse/
│       ├── pcf/                          ← EXISTING (don't modify)
│       │   ├── index.ts                  ← Exports all services
│       │   ├── QueryService.ts           ← OData & FetchXML queries
│       │   ├── CrudService.ts            ← Create/Update/Delete
│       │   ├── BaseDataverseService.ts   ← Shared functionality
│       │   ├── ErrorHandler.ts           ← Error normalization
│       │   ├── Logger.ts                 ← Structured logging
│       │   └── types.ts                  ← Type definitions
│       │
│       ├── DynamicDropdownService.ts     ← NEW: Loads dropdown options
│       ├── EntityDiscoveryService.ts     ← NEW: Discovers entities/fields
│       ├── DynamicFetchXmlService.ts     ← NEW: Builds FetchXML at runtime
│       ├── fetchXmlGenerator.ts          ← EXISTING: Query generation
│       └── odataGenerator.ts             ← EXISTING: OData URLs
│
└── your-pcf-control/
    └── index.ts                          ← Uses the services above
*/

// -----------------------------------------------------------------------------
// IMPORT PATHS REFERENCE
// -----------------------------------------------------------------------------

// From your PCF control, import like this:
import { 
  QueryService,
  CrudService,
  createLogger,
} from '@/lib/dataverse/pcf';

import { DynamicDropdownService } from '@/lib/dataverse/DynamicDropdownService';
import { EntityDiscoveryService } from '@/lib/dataverse/EntityDiscoveryService';
import { DynamicFetchXmlService } from '@/lib/dataverse/DynamicFetchXmlService';`;

const GUIDE_QUICK_REFERENCE = `// =============================================================================
// QUICK REFERENCE: Dynamic Operations (No Hardcoding)
// =============================================================================
//
// ⚠️  ALL DATA AND METADATA COMES FROM YOUR DATAVERSE AT RUNTIME

// 1. INITIALIZE SERVICES (in PCF init)
const discoveryService = new EntityDiscoveryService(context);
const dropdownService = new DynamicDropdownService(context);
const fetchXmlService = new DynamicFetchXmlService(context);

// 2. DISCOVER AVAILABLE ENTITIES FROM YOUR DATAVERSE
const entities = await context.webAPI.retrieveMultipleRecords(
  'EntityDefinition',
  '?$select=LogicalName,DisplayName&$filter=IsCustomizable/Value eq true'
);
// → Returns ALL entities in YOUR CRM (not hardcoded list)

// 3. BUILD CONFIG DYNAMICALLY FROM METADATA
const config = await discoveryService.buildDynamicConfig(
  userSelectedEntity,  // From user selection, not hardcoded
  { filter: userDefinedFilter }
);
// → Config uses real field names from YOUR entity

// 4. LOAD DATA USING DYNAMIC CONFIG
const result = await dropdownService.loadOptions(config.data);
// → Returns REAL records from YOUR Dataverse

// 5. DISCOVER LOOKUP FIELDS FOR AN ENTITY
const lookups = await fetchXmlService.discoverLookupFields(entityName);
// → Returns real lookup relationships from YOUR CRM

// 6. BUILD FETCHXML DYNAMICALLY
const fetchXml = await fetchXmlService.buildDynamicFetchXml(
  entityName,
  {
    filter: userFilters,           // From user configuration
    linkedEntity: discoveredLink,  // From metadata discovery
    orderBy: { field: discoveredSortField, descending: false },
  }
);
// → FetchXML built from runtime metadata, not templates

// 7. EXECUTE AND CHECK RESULT
const queryResult = await fetchXmlService.executeDynamicQuery(entityName, options);
if (queryResult.success) {
  console.log('Loaded', queryResult.data.length, 'records from YOUR Dataverse');
} else {
  console.error('Error:', queryResult.error.userMessage);
}`;

// Legacy snippets for other sections (keeping for backwards compatibility)

// This generates FetchXML:
// <fetch top="500">
//   <entity name="incident">
//     <attribute name="incidentid" />
//     <attribute name="title" />
//     <order attribute="createdon" descending="true" />
//     <filter type="and">
//       <condition attribute="statecode" operator="eq" value="0" />
//       <condition attribute="prioritycode" operator="eq" value="1" />
//     </filter>
//   </entity>
// </fetch>`;

const GUIDE_CONTACT_LOOKUP_EXAMPLE = `// EXAMPLE: Filter Accounts by Contact's City (Lookup Filter)

const accountsByContactCity: DynamicValueConfig = {
  tableName: 'account',
  valueField: 'accountid',
  labelField: 'name',
  orderByField: 'name',
  orderDirection: 'asc',
  conditionGroup: {
    matchType: 'AND',
    children: [
      { type: 'filter', field: 'statecode', operator: 'eq', value: '0' },
      // Lookup expression: filter by related contact's city
      {
        type: 'filter',
        field: 'primarycontactid/address1_city',  // lookup/field syntax
        operator: 'eq',
        value: 'Seattle'
      }
    ]
  }
};

// The lookup path "primarycontactid/address1_city" means:
// 1. Follow the 'primarycontactid' lookup field to the Contact entity
// 2. Filter on the 'address1_city' field of that Contact

// This generates:
// OData:    $filter=primarycontactid/address1_city eq 'Seattle'
// FetchXML: <link-entity name="contact" from="contactid" to="primarycontactid">
//             <filter>
//               <condition attribute="address1_city" operator="eq" value="Seattle" />
//             </filter>
//           </link-entity>`;

const GUIDE_TEAM_EXAMPLE = `// EXAMPLE: Load Teams for Assignment Dropdown

const teamConfig: DynamicValueConfig = {
  tableName: 'team',
  valueField: 'teamid',
  labelField: 'name',
  orderByField: 'name',
  orderDirection: 'asc',
  conditionGroup: {
    matchType: 'AND',
    children: [
      // Only business-owned teams (not default/system teams)
      { type: 'filter', field: 'teamtype', operator: 'eq', value: '0' }
    ]
  }
};`;

const GUIDE_PRODUCT_EXAMPLE = `// EXAMPLE: Load Active Products with Price

const productConfig: DynamicValueConfig = {
  tableName: 'product',
  valueField: 'productid',
  labelField: 'name',
  orderByField: 'name',
  orderDirection: 'asc',
  conditionGroup: {
    matchType: 'AND',
    children: [
      // Only active products
      { type: 'filter', field: 'statecode', operator: 'eq', value: '0' },
      // With price greater than 0
      { type: 'filter', field: 'price', operator: 'gt', value: '0' }
    ]
  }
};`;

const GUIDE_UI_MAPPING = `// UI FIELD MAPPING REFERENCE

// In the "Configure Dynamic Values" panel:

// ┌─────────────────────────────────────────────────────────────┐
// │  Dataverse Entity    │  tableName: 'account'               │
// │                      │  (Select from dropdown)              │
// ├─────────────────────────────────────────────────────────────┤
// │  Value Attribute     │  valueField: 'accountid'            │
// │                      │  (Usually the primary key GUID)      │
// ├─────────────────────────────────────────────────────────────┤
// │  Label Attribute     │  labelField: 'name'                 │
// │                      │  (What users see in dropdown)        │
// ├─────────────────────────────────────────────────────────────┤
// │  Sort Field          │  orderByField: 'name'               │
// │  Sort Direction      │  orderDirection: 'asc' | 'desc'     │
// ├─────────────────────────────────────────────────────────────┤
// │  Conditions          │  conditionGroup: { ... }            │
// │  (Add Filter)        │  Each row = one filter condition     │
// └─────────────────────────────────────────────────────────────┘`;

// ============================================================================
// ORIGINAL CODE SNIPPETS
// ============================================================================

const CODE_IMPORT_SERVICES = `import {
  // Services
  CrudService,
  QueryService,
  createCrudService,
  createQueryService,
  
  // Types
  type DataverseResult,
  type ODataOptions,
  type FetchXmlOptions,
  
  // Error handling
  createErrorHandler,
  type NormalizedError,
  
  // Logging
  createLogger,
  type ILogger,
} from '@/lib/dataverse/pcf';`;

const CODE_BASIC_SETUP = `import { CrudService, QueryService, createLogger } from '@/lib/dataverse/pcf';

// Define your entity type
interface Account {
  accountid?: string;
  name: string;
  telephone1?: string;
  revenue?: number;
}

export class MyAccountControl implements ComponentFramework.StandardControl<IInputs, IOutputs> {
  private accountService!: CrudService<Account>;
  private queryService!: QueryService;
  private logger = createLogger('MyAccountControl');
  
  public init(
    context: ComponentFramework.Context<IInputs>,
    notifyOutputChanged: () => void,
    state: ComponentFramework.Dictionary,
    container: HTMLDivElement
  ): void {
    // Initialize services with PCF context
    this.accountService = new CrudService<Account>(context, {
      entityLogicalName: 'account',
      entitySetName: 'accounts',
    });
    
    this.queryService = new QueryService(context);
    this.logger.info('Control initialized');
  }
  
  public updateView(context: ComponentFramework.Context<IInputs>): void {
    // Update service context on each refresh
    this.accountService.updateContext(context);
    this.queryService.updateContext(context);
  }
  
  public destroy(): void {
    this.logger.info('Control destroyed');
  }
}`;

const CODE_QUERY_STRING = `// OData options
const options: ODataOptions = {
  select: ['name', 'telephone1', 'revenue'],
  filter: "statecode eq 0",
  orderBy: "name asc",
  top: 50,
  expand: [{
    property: 'primarycontactid',
    select: ['fullname', 'emailaddress1']
  }]
};

// Internally converts to:
// ?$select=name,telephone1,revenue
// &$filter=statecode eq 0
// &$orderby=name asc
// &$top=50
// &$expand=primarycontactid($select=fullname,emailaddress1)`;

const CODE_CREATE = `// Create a new account
const result = await this.accountService.create({
  name: 'Contoso Ltd',
  telephone1: '555-1234',
  revenue: 1000000
});

if (result.success) {
  console.log('Created account:', result.data.id);
} else {
  console.error('Create failed:', result.error.userMessage);
}`;

const CODE_RETRIEVE = `// Retrieve with specific columns
const result = await this.accountService.retrieve(accountId, {
  select: ['name', 'telephone1', 'revenue'],
  expand: [{
    property: 'primarycontactid',
    select: ['fullname', 'emailaddress1']
  }]
});

if (result.success) {
  const account = result.data;
  console.log(\`Account: \${account.name}\`);
} else if (result.error.code === 'NOT_FOUND') {
  console.log('Account not found');
}`;

const CODE_UPDATE = `// Update specific fields only
const result = await this.accountService.update(accountId, {
  telephone1: '555-9999',
  revenue: 2000000
});

if (result.success) {
  console.log('Account updated');
}`;

const CODE_UPSERT = `// Create or update based on whether ID exists
const result = await this.accountService.upsert(
  existingId, // undefined for create, string for update
  {
    name: 'Updated Name',
    telephone1: '555-0000'
  }
);

if (result.success) {
  console.log(result.data.wasCreated ? 'Created' : 'Updated');
  console.log('Record ID:', result.data.id);
}`;

const CODE_LOOKUPS = `// Set a lookup field
const data = this.accountService.setLookup(
  { name: 'New Account' },
  'primarycontactid',    // lookup attribute
  'contacts',            // target entity set name
  contactId              // target record ID
);

// Clear a lookup field
const cleared = this.accountService.clearLookup(data, 'primarycontactid');

// Create with lookup
const result = await this.accountService.create(data);`;

const CODE_BATCH = `// Create multiple records
const records = [
  { name: 'Account 1' },
  { name: 'Account 2' },
  { name: 'Account 3' }
];

const result = await this.accountService.createMany(records, {
  stopOnError: false // Continue on individual failures
});

if (result.success) {
  console.log(\`Created \${result.data.length} accounts\`);
}

// Delete multiple records
const deleteResult = await this.accountService.deleteMany(
  ['id1', 'id2', 'id3'],
  { stopOnError: false }
);

if (deleteResult.success) {
  console.log(\`Deleted: \${deleteResult.data.deleted}\`);
  console.log(\`Failed: \${deleteResult.data.failed}\`);
}`;

const CODE_ODATA_QUERY = `// Basic query with filtering
const result = await this.queryService.retrieveMultiple<Account>(
  'account',
  {
    select: ['name', 'revenue', 'telephone1'],
    filter: "revenue gt 1000000 and statecode eq 0",
    orderBy: "revenue desc",
    top: 100
  }
);

if (result.success) {
  for (const account of result.data.entities) {
    console.log(\`\${account.name}: $\${account.revenue}\`);
  }
  
  // Check for more pages
  if (result.data.moreRecords && result.data.nextLink) {
    const nextPage = await this.queryService.getNextPage<Account>(
      result.data.nextLink
    );
  }
}`;

const CODE_FETCHXML = `// Execute FetchXML query
const fetchXml = \`
  <fetch top="50">
    <entity name="account">
      <attribute name="name" />
      <attribute name="revenue" />
      <filter>
        <condition attribute="statecode" operator="eq" value="0" />
        <condition attribute="revenue" operator="gt" value="1000000" />
      </filter>
      <order attribute="revenue" descending="true" />
      <link-entity name="contact" from="contactid" to="primarycontactid">
        <attribute name="fullname" alias="contact_name" />
      </link-entity>
    </entity>
  </fetch>
\`;

const result = await this.queryService.executeFetchXml<Account>(
  'account',
  { fetchXml }
);

if (result.success) {
  console.log(\`Found \${result.data.entities.length} accounts\`);
}`;

const CODE_RETRIEVE_ALL = `// Retrieve all with progress callback and cancellation
const abortController = new AbortController();

const result = await this.queryService.retrieveAll<Account>(
  'account',
  {
    select: ['name', 'revenue'],
    filter: "statecode eq 0",
    maxRecords: 10000, // Safety limit
    onProgress: (loaded, total) => {
      console.log(\`Loaded \${loaded} of \${total ?? '?'} records\`);
    },
    signal: abortController.signal
  }
);

// To cancel:
// abortController.abort();`;

const CODE_CONVENIENCE = `// Count records
const countResult = await this.queryService.count(
  'account',
  "revenue gt 1000000"
);

if (countResult.success) {
  console.log(\`High-value accounts: \${countResult.data}\`);
}

// Check if any records exist
const anyResult = await this.queryService.any(
  'account',
  "name eq 'Contoso'"
);

if (anyResult.success && anyResult.data) {
  console.log('Contoso account exists');
}

// Get first matching record
const firstResult = await this.queryService.firstOrNull<Account>(
  'account',
  {
    filter: "name eq 'Contoso'",
    select: ['accountid', 'name']
  }
);

if (firstResult.success && firstResult.data) {
  console.log('Found:', firstResult.data.name);
}`;

const CODE_ERROR_HANDLER = `import { createErrorHandler } from '@/lib/dataverse/pcf';

const errorHandler = createErrorHandler();

// In catch blocks or result handling
if (!result.success) {
  const error = result.error;
  
  // Show user-friendly message
  this.showError(error.userMessage);
  
  // Log technical details
  this.logger.error('Operation failed', {
    code: error.code,
    message: error.message,
    details: error.details
  });
  
  // Handle retryable errors
  if (error.isRetryable) {
    await this.scheduleRetry();
  }
  
  // Handle specific error types
  switch (error.code) {
    case 'NOT_FOUND':
      this.clearForm();
      break;
    case 'ACCESS_DENIED':
      this.disableEditing();
      break;
    case 'DUPLICATE_RECORD':
      this.highlightDuplicateField();
      break;
  }
}`;

const CODE_RESULT_TYPES = `// Type definitions
interface SuccessResult<T> {
  readonly success: true;
  readonly data: T;
  readonly error?: never;
}

interface FailureResult {
  readonly success: false;
  readonly data?: never;
  readonly error: NormalizedError;
}

type DataverseResult<T> = SuccessResult<T> | FailureResult;`;

const CODE_RESULT_USAGE = `// TypeScript enforces checking success before accessing data
const result = await this.accountService.retrieve(id);

// ❌ Compile error - must check success first
// console.log(result.data.name);

// ✅ Correct pattern
if (result.success) {
  // TypeScript knows result.data is defined here
  console.log(result.data.name);
} else {
  // TypeScript knows result.error is defined here
  console.error(result.error.message);
}

// Early return pattern
async function loadAccount(id: string): Promise<Account | null> {
  const result = await accountService.retrieve(id);
  
  if (!result.success) {
    logger.error('Failed to load account', result.error);
    return null;
  }
  
  return result.data;
}`;

const CODE_DYNAMIC_CONFIG = `// Dynamic Value configuration structure
interface DynamicValueConfig {
  entityLogicalName: string;  // e.g., 'account'
  valueAttribute: string;     // Field for option value (usually ID)
  labelAttribute: string;     // Field for display text
  orderBy?: {
    attribute: string;
    direction: 'asc' | 'desc';
  };
  filters?: DynamicValueFilterGroup;
}

// Example configuration for Account dropdown
const accountDropdownConfig: DynamicValueConfig = {
  entityLogicalName: 'account',
  valueAttribute: 'accountid',
  labelAttribute: 'name',
  orderBy: {
    attribute: 'name',
    direction: 'asc'
  },
  filters: {
    type: 'and',
    conditions: [
      { attribute: 'statecode', operator: 'eq', value: '0' },
      { attribute: 'revenue', operator: 'gt', value: '100000' }
    ]
  }
};`;

const CODE_LOAD_OPTIONS = `import { generateFetchXml } from '@/lib/dataverse/fetchXmlGenerator';
import { QueryService } from '@/lib/dataverse/pcf';

async function loadDynamicOptions(
  queryService: QueryService,
  config: DynamicValueConfig
): Promise<Array<{ value: string; label: string }>> {
  
  // Generate FetchXML from configuration
  const fetchXml = generateFetchXml(config, { top: 5000 });
  
  // Execute query
  const result = await queryService.executeFetchXml(
    config.entityLogicalName,
    { fetchXml }
  );
  
  if (!result.success) {
    console.error('Failed to load options:', result.error.userMessage);
    return [];
  }
  
  // Map to dropdown options
  return result.data.entities.map(entity => ({
    value: String(entity[config.valueAttribute]),
    label: String(entity[config.labelAttribute])
  }));
}`;

const CODE_LOOKUP_FILTER = `// Filter accounts by their primary contact's city
const configWithLookup: DynamicValueConfig = {
  entityLogicalName: 'account',
  valueAttribute: 'accountid',
  labelAttribute: 'name',
  filters: {
    type: 'and',
    conditions: [
      {
        // Lookup path: primarycontactid is a lookup to contact
        attribute: 'primarycontactid/address1_city',
        operator: 'eq',
        value: 'Seattle'
      }
    ]
  }
};

// This generates:
// FetchXML with link-entity:
// <link-entity name="contact" from="contactid" to="primarycontactid">
//   <filter>
//     <condition attribute="address1_city" operator="eq" value="Seattle" />
//   </filter>
// </link-entity>

// OData with navigation:
// $filter=primarycontactid/address1_city eq 'Seattle'`;

const CODE_DYNAMIC_CONTROL = `// In your PCF control or component
class DynamicDropdownControl {
  private queryService!: QueryService;
  private container!: HTMLDivElement;
  
  public async init(context: IPCFContext, container: HTMLDivElement) {
    this.queryService = new QueryService(context);
    this.container = container;
    await this.loadAndRender();
  }
  
  private async loadAndRender() {
    const config: DynamicValueConfig = {
      entityLogicalName: 'incident',
      valueAttribute: 'incidentid',
      labelAttribute: 'title',
      orderBy: { attribute: 'createdon', direction: 'desc' },
      filters: {
        type: 'and',
        conditions: [
          { attribute: 'statecode', operator: 'eq', value: '0' },
          { attribute: 'prioritycode', operator: 'eq', value: '1' }
        ]
      }
    };
    
    const options = await loadDynamicOptions(this.queryService, config);
    
    const select = document.createElement('select');
    select.innerHTML = '<option value="">-- Select Case --</option>';
    
    for (const opt of options) {
      const option = document.createElement('option');
      option.value = opt.value;
      option.textContent = opt.label;
      select.appendChild(option);
    }
    
    this.container.appendChild(select);
  }
}`;

const CODE_FETCHXML_GEN = `import { 
  generateFetchXml, 
  validateConfigForFetchXml 
} from '@/lib/dataverse/fetchXmlGenerator';

// Validate configuration first
const errors = validateConfigForFetchXml(config);
if (errors.length > 0) {
  console.error('Invalid config:', errors);
  return;
}

// Generate FetchXML
const fetchXml = generateFetchXml(config, {
  top: 100,
  count: true,     // Include total count
  distinct: true,  // Remove duplicates
  page: 1,
  pagingCookie: previousCookie
});

// Output example:
// <fetch top="100" count="true" distinct="true" page="1">
//   <entity name="account">
//     <attribute name="accountid" />
//     <attribute name="name" />
//     <order attribute="name" />
//     <filter type="and">
//       <condition attribute="statecode" operator="eq" value="0" />
//     </filter>
//   </entity>
// </fetch>`;

const CODE_ODATA_GEN = `import { 
  generateODataUrl, 
  generateODataParts 
} from '@/lib/dataverse/odataGenerator';

// Generate complete URL
const url = generateODataUrl(config, {
  top: 100,
  skip: 0,
  count: true,
  additionalSelect: ['createdon', 'modifiedon']
});

// Output: /api/data/v9.2/accounts?$select=accountid,name,createdon,modifiedon
//         &$filter=statecode eq 0&$orderby=name asc&$top=100&$count=true

// Or get individual parts for custom building
const parts = generateODataParts(config, { top: 50 });
// parts = {
//   entitySet: 'accounts',
//   select: 'accountid,name',
//   filter: 'statecode eq 0',
//   orderby: 'name asc',
//   top: 50
// }`;

const CODE_INIT = `public init(
  context: ComponentFramework.Context<IInputs>,
  notifyOutputChanged: () => void,
  state: ComponentFramework.Dictionary,
  container: HTMLDivElement
): void {
  // ✅ DO: Initialize services once
  this.crudService = new CrudService(context, { entityLogicalName: 'account' });
  this.queryService = new QueryService(context);
  
  // ✅ DO: Store references needed later
  this.container = container;
  this.notifyOutputChanged = notifyOutputChanged;
  
  // ✅ DO: Set up AbortController for cancellation
  this.abortController = new AbortController();
  
  // ❌ DON'T: Make data calls here (use updateView)
  // ❌ DON'T: Access context.parameters (not ready yet)
}`;

const CODE_UPDATE_VIEW = `public updateView(context: ComponentFramework.Context<IInputs>): void {
  // ✅ DO: Update service context every time
  this.crudService.updateContext(context);
  this.queryService.updateContext(context);
  
  // ✅ DO: Read parameters here
  const recordId = context.parameters.recordId?.raw;
  
  // ✅ DO: Debounce rapid calls
  clearTimeout(this.updateTimeout);
  this.updateTimeout = setTimeout(() => {
    this.loadData(recordId);
  }, 100);
  
  // ❌ DON'T: Re-initialize services
  // ❌ DON'T: Make unbounded async calls without cleanup
}`;

const CODE_DESTROY = `public destroy(): void {
  // ✅ DO: Cancel pending requests
  this.abortController?.abort();
  
  // ✅ DO: Clear timeouts
  clearTimeout(this.updateTimeout);
  
  // ✅ DO: Remove event listeners
  this.container?.removeEventListener('click', this.handleClick);
  
  // ✅ DO: Clear references
  this.container = null!;
  
  // ❌ DON'T: Make async calls
  // ❌ DON'T: Leave memory leaks
}`;

const CODE_SANITIZATION = `// ✅ Escape user input in OData filters
function escapeODataString(value: string): string {
  return value.replace(/'/g, "''");
}

const filter = \`name eq '\${escapeODataString(userInput)}'\`;

// ✅ Escape for FetchXML
function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// ✅ Use textContent for DOM, not innerHTML
element.textContent = untrustedData;`;

const CODE_QUERY_OPT = `// ✅ Always specify $select - never retrieve all columns
const result = await queryService.retrieveMultiple('account', {
  select: ['name', 'telephone1'], // Only what you need
  top: 50                         // Always limit results
});

// ✅ Use AbortController for cancellation
const controller = new AbortController();

const result = await queryService.retrieveAll('account', {
  select: ['name'],
  maxRecords: 5000,
  signal: controller.signal
});

// Cancel on component unmount
controller.abort();`;

const CODE_CACHING = `// Entity metadata is cached automatically (5-minute TTL)
const metadata = await service.getEntityMetadata('account');

// Force refresh if needed
const freshMetadata = await service.getEntityMetadata('account', true);

// Clear cache when appropriate
service.clearMetadataCache('account'); // Specific entity
service.clearMetadataCache();          // All entities`;

const CODE_DEBOUNCE = `private updateTimeout?: number;

public updateView(context: IPCFContext): void {
  // Debounce rapid updateView calls
  window.clearTimeout(this.updateTimeout);
  
  this.updateTimeout = window.setTimeout(() => {
    this.performUpdate(context);
  }, 150);
}

public destroy(): void {
  window.clearTimeout(this.updateTimeout);
}`;

const ARCHITECTURE_DIAGRAM = `┌─────────────────────────────────────────────────────────────┐
│                      PCF Control                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │    init()   │  │ updateView()│  │     destroy()       │  │
│  └──────┬──────┘  └──────┬──────┘  └──────────┬──────────┘  │
└─────────┼────────────────┼─────────────────────┼────────────┘
          │                │                     │
          ▼                ▼                     ▼
┌─────────────────────────────────────────────────────────────┐
│                    Service Layer                             │
│  ┌─────────────────┐  ┌─────────────────────────────────┐   │
│  │   CrudService   │  │         QueryService            │   │
│  │  - create()     │  │  - retrieveMultiple()           │   │
│  │  - retrieve()   │  │  - executeFetchXml()            │   │
│  │  - update()     │  │  - count() / any() / first()    │   │
│  │  - delete()     │  │  - retrieveAll()                │   │
│  └────────┬────────┘  └────────────────┬────────────────┘   │
│           │                            │                     │
│           └────────────┬───────────────┘                     │
│                        ▼                                     │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │              BaseDataverseService                       │ │
│  │  - execute() wrapper with Result pattern                │ │
│  │  - buildQueryString() for OData                         │ │
│  │  - getEntityMetadata() with caching                     │ │
│  └────────────────────────┬────────────────────────────────┘ │
└───────────────────────────┼──────────────────────────────────┘
                            │
┌───────────────────────────┼──────────────────────────────────┐
│                           ▼                                  │
│  ┌─────────────────┐  ┌─────────────────────────────────┐   │
│  │     Logger      │  │         ErrorHandler            │   │
│  │  - debug/info   │  │  - normalize()                  │   │
│  │  - warn/error   │  │  - getUserMessage()             │   │
│  │  - structured   │  │  - isRetryable()                │   │
│  └─────────────────┘  └─────────────────────────────────┘   │
│                        Infrastructure                        │
└──────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌──────────────────────────────────────────────────────────────┐
│              context.webAPI (PCF Framework)                  │
└──────────────────────────────────────────────────────────────┘`;

const PCFDocumentation = () => {
  const styles = useStyles();
  const [activeSection, setActiveSection] = useState<string>("overview");
  const observerRef = useRef<IntersectionObserver | null>(null);

  const navSections = [
    {
      title: "Getting Started",
      links: [
        { id: "overview", label: "Overview" },
        { id: "architecture", label: "Architecture" },
        { id: "setup", label: "Setup & Installation" },
      ],
    },
    {
      title: "Step-by-Step Guides",
      links: [
        { id: "guide-dropdown", label: "📖 Dynamic Dropdown" },
        { id: "guide-filters", label: "📖 Adding Filters" },
        { id: "guide-examples", label: "📖 Real Examples" },
        { id: "guide-playground", label: "🎮 Interactive Playground" },
      ],
    },
    {
      title: "Core Services",
      links: [
        { id: "base-service", label: "BaseDataverseService" },
        { id: "crud-service", label: "CrudService" },
        { id: "query-service", label: "QueryService" },
      ],
    },
    {
      title: "Error Handling",
      links: [
        { id: "error-handler", label: "ErrorHandler" },
        { id: "result-pattern", label: "Result Pattern" },
      ],
    },
    {
      title: "Integration",
      links: [
        { id: "dynamic-values", label: "Dynamic Values" },
        { id: "fetchxml", label: "FetchXML Generator" },
        { id: "odata", label: "OData Generator" },
      ],
    },
    {
      title: "Best Practices",
      links: [
        { id: "pcf-lifecycle", label: "PCF Lifecycle" },
        { id: "security", label: "Security" },
        { id: "performance", label: "Performance" },
      ],
    },
  ];

  useEffect(() => {
    const sectionIds = navSections.flatMap((s) => s.links.map((l) => l.id));

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observerRef.current?.observe(element);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={styles.container}>
      {/* Sidebar Navigation */}
      <aside className={styles.sidebar}>
        <Title3 className={styles.sidebarTitle}>PCF Dataverse Wrapper</Title3>
        {navSections.map((section) => (
          <div key={section.title} className={styles.navSection}>
            <div className={styles.navSectionTitle}>{section.title}</div>
            {section.links.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`${styles.navLink} ${
                  activeSection === link.id ? styles.navLinkActive : ""
                }`}
                onClick={(e) => handleNavClick(e, link.id)}
              >
                {link.label}
              </a>
            ))}
          </div>
        ))}
      </aside>

      {/* Main Content */}
      <main className={styles.main}>
        <RouterLink to="/docs" className={styles.backLink}>
          <ArrowLeft24Regular />
          Back to Main Documentation
        </RouterLink>

        {/* Header */}
        <header className={styles.header}>
          <Title1>PCF Dataverse Wrapper Framework</Title1>
          <Body1>
            A production-ready, type-safe wrapper for Microsoft Dataverse
            operations in Power Apps Component Framework controls.
          </Body1>
          <div className={styles.headerBadges}>
            <Badge appearance="filled" color="success">TypeScript</Badge>
            <Badge appearance="filled" color="brand">PCF Safe</Badge>
            <Badge appearance="filled" color="informative">Result Pattern</Badge>
          </div>
          <RouterLink to="/docs/pcf/playground" style={{ textDecoration: 'none', marginTop: tokens.spacingVerticalM }}>
            <Button 
              appearance="primary" 
              icon={<Play24Regular />}
              size="large"
            >
              Open Operations Playground
            </Button>
          </RouterLink>
        </header>

        {/* Overview Section */}
        <section id="overview" className={styles.section}>
          <div className={styles.sectionHeader}>
            <Title2>Overview</Title2>
            <span className={styles.codePath}>
              <Folder16Regular /> src/lib/dataverse/pcf/
            </span>
          </div>
          <Body1>
            The PCF Dataverse Wrapper provides a clean abstraction layer for
            interacting with Microsoft Dataverse from Power Apps Component
            Framework controls. It enforces PCF-safe APIs, standardized error
            handling, and type safety.
          </Body1>

          <div className={styles.flexRow} style={{ marginTop: tokens.spacingVerticalL }}>
            <Card className={styles.featureCard}>
              <CardHeader
                image={<Database24Regular />}
                header={<b>Type-Safe CRUD</b>}
                description="Strongly-typed create, read, update, delete operations"
              />
            </Card>
            <Card className={styles.featureCard}>
              <CardHeader
                image={<Shield24Regular />}
                header={<b>Error Normalization</b>}
                description="Consistent error codes with user-friendly messages"
              />
            </Card>
            <Card className={styles.featureCard}>
              <CardHeader
                image={<Rocket24Regular />}
                header={<b>PCF Compliant</b>}
                description="Uses only context.webAPI - no forbidden APIs"
              />
            </Card>
          </div>
        </section>

        <Divider />

        {/* Architecture Section */}
        <section id="architecture" className={styles.section}>
          <div className={styles.sectionHeader}>
            <Title2>Architecture</Title2>
            <span className={styles.codePath}>
              <Folder16Regular /> src/lib/dataverse/pcf/ARCHITECTURE.md
            </span>
          </div>
          <Body1>
            The wrapper follows a layered architecture with clear separation of concerns:
          </Body1>
          <div className={styles.diagram}>{ARCHITECTURE_DIAGRAM}</div>
        </section>

        <Divider />

        {/* Setup Section */}
        <section id="setup" className={styles.section}>
          <div className={styles.sectionHeader}>
            <Title2>Setup & Installation</Title2>
            <span className={styles.codePath}>
              <Folder16Regular /> src/lib/dataverse/pcf/index.ts
            </span>
          </div>

          <Title3>Importing Services</Title3>
          <CodeBlock code={CODE_IMPORT_SERVICES} language="typescript" />

          <Title3>Basic Control Setup</Title3>
          <CodeBlock code={CODE_BASIC_SETUP} language="typescript" />
        </section>

        <Divider />

        {/* ================================================================ */}
        {/* STEP-BY-STEP GUIDES SECTION */}
        {/* ================================================================ */}

        {/* Guide: Dynamic Dropdown */}
        <section id="guide-dropdown" className={styles.section}>
          <div className={styles.sectionHeader}>
            <Title2>📖 Step-by-Step: Create Dynamic Entity Dropdown</Title2>
          </div>
          <Body1>
            This guide shows how to create a service that loads entities from YOUR Dynamics 365 CRM 
            at runtime and populates dropdowns with live data.
          </Body1>

          <div className={styles.successBox}>
            <Checkmark24Regular />
            <Body1>
              <strong>Goal:</strong> Create a reusable service that fetches entities using the 
              existing PCF wrapper services in this project.
            </Body1>
          </div>

          <Title3>Overview: What You'll Build</Title3>
          <CodeBlock code={GUIDE_OVERVIEW} language="typescript" />

          <Title3>Step 1: Create the DynamicDropdownService</Title3>
          <Body1>
            Create a new service file that wraps the QueryService for dropdown-specific operations.
          </Body1>
          <CodeBlock code={GUIDE_STEP1_CREATE_SERVICE} language="typescript" />

          <Title3>Step 2: Use in Your PCF Control</Title3>
          <Body1>
            The PCF context (with webAPI) is provided by Dynamics 365 when your control loads.
          </Body1>
          <CodeBlock code={GUIDE_STEP2_USE_IN_PCF} language="typescript" />
        </section>

        <Divider />

        {/* Guide: Entity Configurations */}
        <section id="guide-filters" className={styles.section}>
          <div className={styles.sectionHeader}>
            <Title2>📖 Step-by-Step: Pre-built Entity Configs</Title2>
          </div>
          <Body1>
            Create ready-to-use configurations for common Dataverse entities.
          </Body1>

          <Title3>Step 3: Pre-built Entity Configurations</Title3>
          <CodeBlock code={GUIDE_STEP3_ENTITY_CONFIGS} language="typescript" />

          <Title3>Step 4: Dynamic Entity Loading</Title3>
          <Body1>
            Load any entity dynamically based on runtime configuration.
          </Body1>
          <CodeBlock code={GUIDE_STEP4_DYNAMIC_ENTITY} language="typescript" />
        </section>

        <Divider />

        {/* Guide: Advanced & Reference */}
        <section id="guide-examples" className={styles.section}>
          <div className={styles.sectionHeader}>
            <Title2>📖 Advanced: FetchXML & Quick Reference</Title2>
          </div>
          <Body1>
            Advanced patterns using FetchXML for complex queries with linked entities.
          </Body1>

          <Title3>Step 5: Advanced FetchXML Queries</Title3>
          <CodeBlock code={GUIDE_STEP5_FETCHXML_ADVANCED} language="typescript" />

          <Title3>Project File Structure</Title3>
          <CodeBlock code={GUIDE_FILE_STRUCTURE} language="typescript" />

          <Title3>Quick Reference: Common Operations</Title3>
          <CodeBlock code={GUIDE_QUICK_REFERENCE} language="typescript" />
        </section>

        <Divider />

        {/* Interactive Playground */}
        <section id="guide-playground" className={styles.section}>
          <div className={styles.sectionHeader}>
            <Title2>🎮 Interactive Playground</Title2>
          </div>
          <Body1>
            Configure Dynamic Values interactively and see the generated OData/FetchXML queries in real-time.
          </Body1>
          
          <div style={{ marginTop: tokens.spacingVerticalL }}>
            <DynamicValuesPlayground />
          </div>
        </section>

        <Divider />

        {/* BaseDataverseService Section */}
        <section id="base-service" className={styles.section}>
          <div className={styles.sectionHeader}>
            <Title2>BaseDataverseService</Title2>
            <span className={styles.codePath}>
              <Folder16Regular /> src/lib/dataverse/pcf/BaseDataverseService.ts
            </span>
          </div>
          <Body1>
            The abstract base class providing shared functionality for all Dataverse services.
          </Body1>

          <Title3>Key Methods</Title3>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.th}>Method</th>
                <th className={styles.th}>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={styles.td}><code className={styles.inlineCode}>execute&lt;T&gt;(...)</code></td>
                <td className={styles.td}>Wraps operations with error handling, returns <code className={styles.inlineCode}>DataverseResult</code></td>
              </tr>
              <tr>
                <td className={styles.td}><code className={styles.inlineCode}>buildQueryString(options)</code></td>
                <td className={styles.td}>Builds OData query string from options</td>
              </tr>
              <tr>
                <td className={styles.td}><code className={styles.inlineCode}>getEntityMetadata(entityName)</code></td>
                <td className={styles.td}>Retrieves cached entity metadata</td>
              </tr>
              <tr>
                <td className={styles.td}><code className={styles.inlineCode}>updateContext(ctx)</code></td>
                <td className={styles.td}>Updates PCF context (call in updateView)</td>
              </tr>
              <tr>
                <td className={styles.td}><code className={styles.inlineCode}>setLookupField(data, attr, entitySet, id)</code></td>
                <td className={styles.td}>Formats lookup field for binding</td>
              </tr>
            </tbody>
          </table>

          <Title3>Query String Building</Title3>
          <CodeBlock code={CODE_QUERY_STRING} language="typescript" />
        </section>

        <Divider />

        {/* CrudService Section */}
        <section id="crud-service" className={styles.section}>
          <div className={styles.sectionHeader}>
            <Title2>CrudService</Title2>
            <span className={styles.codePath}>
              <Folder16Regular /> src/lib/dataverse/pcf/CrudService.ts
            </span>
          </div>
          <Body1>Type-safe CRUD operations for a specific entity type.</Body1>

          <Title3>Create Operation</Title3>
          <CodeBlock code={CODE_CREATE} language="typescript" />

          <Title3>Retrieve Operation</Title3>
          <CodeBlock code={CODE_RETRIEVE} language="typescript" />

          <Title3>Update Operation</Title3>
          <CodeBlock code={CODE_UPDATE} language="typescript" />

          <Title3>Upsert Operation</Title3>
          <CodeBlock code={CODE_UPSERT} language="typescript" />

          <Title3>Working with Lookups</Title3>
          <CodeBlock code={CODE_LOOKUPS} language="typescript" />

          <Title3>Batch Operations</Title3>
          <CodeBlock code={CODE_BATCH} language="typescript" />
        </section>

        <Divider />

        {/* QueryService Section */}
        <section id="query-service" className={styles.section}>
          <div className={styles.sectionHeader}>
            <Title2>QueryService</Title2>
            <span className={styles.codePath}>
              <Folder16Regular /> src/lib/dataverse/pcf/QueryService.ts
            </span>
          </div>
          <Body1>
            Advanced querying capabilities including OData, FetchXML, and convenience methods.
          </Body1>

          <Title3>OData Queries</Title3>
          <CodeBlock code={CODE_ODATA_QUERY} language="typescript" />

          <Title3>FetchXML Queries</Title3>
          <CodeBlock code={CODE_FETCHXML} language="typescript" />

          <Title3>Retrieve All Records</Title3>
          <CodeBlock code={CODE_RETRIEVE_ALL} language="typescript" />

          <Title3>Convenience Methods</Title3>
          <CodeBlock code={CODE_CONVENIENCE} language="typescript" />
        </section>

        <Divider />

        {/* ErrorHandler Section */}
        <section id="error-handler" className={styles.section}>
          <div className={styles.sectionHeader}>
            <Title2>ErrorHandler</Title2>
            <span className={styles.codePath}>
              <Folder16Regular /> src/lib/dataverse/pcf/ErrorHandler.ts
            </span>
          </div>
          <Body1>
            Normalizes Dataverse errors into consistent, actionable error objects.
          </Body1>

          <Title3>Error Codes</Title3>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.th}>Code</th>
                <th className={styles.th}>Description</th>
                <th className={styles.th}>Retryable</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={styles.td}><code className={styles.inlineCode}>NOT_FOUND</code></td>
                <td className={styles.td}>Record does not exist</td>
                <td className={styles.td}>No</td>
              </tr>
              <tr>
                <td className={styles.td}><code className={styles.inlineCode}>ACCESS_DENIED</code></td>
                <td className={styles.td}>User lacks permission for operation</td>
                <td className={styles.td}>No</td>
              </tr>
              <tr>
                <td className={styles.td}><code className={styles.inlineCode}>DUPLICATE_RECORD</code></td>
                <td className={styles.td}>Duplicate key or alternate key violation</td>
                <td className={styles.td}>No</td>
              </tr>
              <tr>
                <td className={styles.td}><code className={styles.inlineCode}>VALIDATION_ERROR</code></td>
                <td className={styles.td}>Invalid data or business rule violation</td>
                <td className={styles.td}>No</td>
              </tr>
              <tr>
                <td className={styles.td}><code className={styles.inlineCode}>CONCURRENCY_ERROR</code></td>
                <td className={styles.td}>Record modified by another user</td>
                <td className={styles.td}>Yes</td>
              </tr>
              <tr>
                <td className={styles.td}><code className={styles.inlineCode}>TIMEOUT</code></td>
                <td className={styles.td}>Request timed out</td>
                <td className={styles.td}>Yes</td>
              </tr>
              <tr>
                <td className={styles.td}><code className={styles.inlineCode}>RATE_LIMITED</code></td>
                <td className={styles.td}>Too many requests (429 status)</td>
                <td className={styles.td}>Yes</td>
              </tr>
              <tr>
                <td className={styles.td}><code className={styles.inlineCode}>NETWORK_ERROR</code></td>
                <td className={styles.td}>Connection failed</td>
                <td className={styles.td}>Yes</td>
              </tr>
            </tbody>
          </table>

          <Title3>Usage Example</Title3>
          <CodeBlock code={CODE_ERROR_HANDLER} language="typescript" />
        </section>

        <Divider />

        {/* Result Pattern Section */}
        <section id="result-pattern" className={styles.section}>
          <div className={styles.sectionHeader}>
            <Title2>Result Pattern</Title2>
            <span className={styles.codePath}>
              <Folder16Regular /> src/lib/dataverse/pcf/types.ts
            </span>
          </div>
          <Body1>
            All service methods return a discriminated union type that enforces
            error handling at compile time.
          </Body1>

          <CodeBlock code={CODE_RESULT_TYPES} language="typescript" />

          <Title3>Pattern Usage</Title3>
          <CodeBlock code={CODE_RESULT_USAGE} language="typescript" />

          <div className={styles.successBox}>
            <Checkmark24Regular />
            <Body1>
              The Result pattern eliminates uncaught exceptions and makes error
              handling explicit and type-safe.
            </Body1>
          </div>
        </section>

        <Divider />

        {/* Dynamic Values Section */}
        <section id="dynamic-values" className={styles.section}>
          <div className={styles.sectionHeader}>
            <Title2>Dynamic Values Integration</Title2>
            <span className={styles.codePath}>
              <Folder16Regular /> src/types/questionnaire.ts
            </span>
          </div>
          <Body1>
            Connect questionnaire Choice/MultiSelect fields to live Dataverse
            data using the Dynamic Values configuration.
          </Body1>

          <Title3>Dynamic Value Configuration</Title3>
          <CodeBlock code={CODE_DYNAMIC_CONFIG} language="typescript" />

          <Title3>Loading Dynamic Options</Title3>
          <CodeBlock code={CODE_LOAD_OPTIONS} language="typescript" />

          <Title3>Lookup Field Filtering</Title3>
          <Body1>Filter by attributes of related entities using lookup expressions:</Body1>
          <CodeBlock code={CODE_LOOKUP_FILTER} language="typescript" />

          <Title3>Complete Integration Example</Title3>
          <CodeBlock code={CODE_DYNAMIC_CONTROL} language="typescript" />
        </section>

        <Divider />

        {/* FetchXML Generator Section */}
        <section id="fetchxml" className={styles.section}>
          <div className={styles.sectionHeader}>
            <Title2>FetchXML Generator</Title2>
            <span className={styles.codePath}>
              <Folder16Regular /> src/lib/dataverse/fetchXmlGenerator.ts
            </span>
          </div>
          <Body1>Generate FetchXML queries from Dynamic Value configurations.</Body1>

          <CodeBlock code={CODE_FETCHXML_GEN} language="typescript" />
        </section>

        <Divider />

        {/* OData Generator Section */}
        <section id="odata" className={styles.section}>
          <div className={styles.sectionHeader}>
            <Title2>OData Generator</Title2>
            <span className={styles.codePath}>
              <Folder16Regular /> src/lib/dataverse/odataGenerator.ts
            </span>
          </div>
          <Body1>Generate OData query URLs from Dynamic Value configurations.</Body1>

          <CodeBlock code={CODE_ODATA_GEN} language="typescript" />
        </section>

        <Divider />

        {/* PCF Lifecycle Section */}
        <section id="pcf-lifecycle" className={styles.section}>
          <div className={styles.sectionHeader}>
            <Title2>PCF Lifecycle Best Practices</Title2>
            <span className={styles.codePath}>
              <Folder16Regular /> src/lib/dataverse/pcf/SamplePCFControl.ts
            </span>
          </div>

          <Title3>init() - Initialization</Title3>
          <CodeBlock code={CODE_INIT} language="typescript" />

          <Title3>updateView() - Refresh</Title3>
          <CodeBlock code={CODE_UPDATE_VIEW} language="typescript" />

          <Title3>destroy() - Cleanup</Title3>
          <CodeBlock code={CODE_DESTROY} language="typescript" />
        </section>

        <Divider />

        {/* Security Section */}
        <section id="security" className={styles.section}>
          <div className={styles.sectionHeader}>
            <Title2>Security Considerations</Title2>
            <span className={styles.codePath}>
              <Folder16Regular /> src/lib/dataverse/pcf/PCF_CODING_STANDARDS.md
            </span>
          </div>

          <div className={styles.warningBox}>
            <Warning24Regular />
            <div>
              <Body1 style={{ fontWeight: 600 }}>Forbidden APIs</Body1>
              <Body1>
                Never use these in PCF controls: <code>Xrm.*</code>,{" "}
                <code>parent.*</code>, <code>window.fetch</code>,{" "}
                <code>localStorage</code>, <code>eval()</code>
              </Body1>
            </div>
          </div>

          <Title3>Input Sanitization</Title3>
          <CodeBlock code={CODE_SANITIZATION} language="typescript" />

          <Title3>Data Logging Guidelines</Title3>
          <ul className={styles.list}>
            <li className={styles.listItem}>Never log PII (names, emails, phone numbers)</li>
            <li className={styles.listItem}>Never log passwords or authentication tokens</li>
            <li className={styles.listItem}>Truncate large data payloads in logs</li>
            <li className={styles.listItem}>Use structured logging with entity/id context</li>
          </ul>
        </section>

        <Divider />

        {/* Performance Section */}
        <section id="performance" className={styles.section}>
          <div className={styles.sectionHeader}>
            <Title2>Performance Optimization</Title2>
            <span className={styles.codePath}>
              <Folder16Regular /> src/lib/dataverse/pcf/PRODUCTION_CHECKLIST.md
            </span>
          </div>

          <Title3>Query Optimization</Title3>
          <CodeBlock code={CODE_QUERY_OPT} language="typescript" />

          <Title3>Caching Strategy</Title3>
          <CodeBlock code={CODE_CACHING} language="typescript" />

          <Title3>Debouncing Updates</Title3>
          <CodeBlock code={CODE_DEBOUNCE} language="typescript" />

          <div className={styles.successBox}>
            <Checkmark24Regular />
            <div>
              <Body1 style={{ fontWeight: 600 }}>Performance Checklist</Body1>
              <ul className={styles.list}>
                <li>Always use $select - never retrieve all columns</li>
                <li>Always use $top to limit results</li>
                <li>Implement AbortController for cancellation</li>
                <li>Debounce rapid updateView calls</li>
                <li>Cache entity metadata</li>
                <li>Clean up in destroy()</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Footer */}
        <Divider style={{ marginTop: tokens.spacingVerticalXXL }} />
        <div
          style={{
            marginTop: tokens.spacingVerticalL,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <RouterLink to="/docs" className={styles.backLink}>
            <ArrowLeft24Regular />
            Back to Main Documentation
          </RouterLink>
          <Link
            href="https://learn.microsoft.com/en-us/power-apps/developer/component-framework/overview"
            target="_blank"
          >
            Microsoft PCF Docs <ArrowRight16Regular />
          </Link>
        </div>
      </main>
    </div>
  );
};

export default PCFDocumentation;
