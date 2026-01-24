/**
 * PCF Dataverse Wrapper
 * 
 * Production-ready wrapper layer for Dataverse operations in PCF controls.
 * Uses only PCF-safe APIs (context.webAPI) and follows clean architecture patterns.
 */

// ============================================================================
// Types
// ============================================================================

export type {
  // PCF Context types
  IPCFWebApi,
  IPCFUtility,
  IPCFContext,
  
  // Entity types
  EntityReference,
  CreateResult,
  RetrieveMultipleResponse,
  
  // Query types
  ODataOptions,
  ExpandOption,
  FetchXmlOptions,
  QueryResult,
  RetrieveAllOptions,
  
  // Metadata types
  EntityMetadata,
  AttributeMetadata,
  OptionMetadata,
  
  // Error types
  DataverseErrorCode,
  NormalizedError,
  
  // Result types
  SuccessResult,
  FailureResult,
  DataverseResult,
  
  // Operation types
  OperationType,
  UpdateOptions,
} from './types';

// ============================================================================
// Logger
// ============================================================================

export {
  createLogger,
  getLogger,
  configureDefaultLogger,
  logger,
  type ILogger,
  type LogLevel,
  type LoggerConfig,
} from './Logger';

// ============================================================================
// Error Handler
// ============================================================================

export {
  createErrorHandler,
  getErrorHandler,
  errorHandler,
  type IErrorHandler,
} from './ErrorHandler';

// ============================================================================
// Base Service
// ============================================================================

export {
  BaseDataverseService,
  createBaseServiceConfig,
  type BaseServiceConfig,
} from './BaseDataverseService';

// ============================================================================
// CRUD Service
// ============================================================================

export {
  CrudService,
  createCrudService,
  type EntityRecord,
  type CrudServiceConfig,
  type UpsertResult,
} from './CrudService';

// ============================================================================
// Query Service
// ============================================================================

export {
  QueryService,
  createQueryService,
} from './QueryService';

// ============================================================================
// FetchXML Templates
// ============================================================================

export {
  FetchXmlTemplates,
} from './QueryService.examples';

// ============================================================================
// Example Entity Types (for reference)
// ============================================================================

export type {
  Account,
  Contact,
  Incident,
} from './CrudService.examples';

export {
  createAccountService,
  createContactService,
  createIncidentService,
} from './CrudService.examples';
