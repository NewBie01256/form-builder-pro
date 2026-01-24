import {
  makeStyles,
  tokens,
  Title1,
  Title2,
  Title3,
  Body1,
  Caption1,
  Card,
  CardHeader,
  Badge,
  Divider,
  Link,
} from "@fluentui/react-components";
import { Link as RouterLink } from "react-router-dom";
import {
  ArrowLeft24Regular,
  Code24Regular,
  Database24Regular,
  Shield24Regular,
  Rocket24Regular,
  Warning24Regular,
  Checkmark24Regular,
  ArrowRight16Regular,
  Folder16Regular,
} from "@fluentui/react-icons";
import { useState, useEffect, useRef } from "react";

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
  card: {
    marginBottom: tokens.spacingVerticalL,
  },
  codeBlock: {
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusMedium,
    padding: tokens.spacingVerticalM,
    fontFamily: "monospace",
    fontSize: tokens.fontSizeBase200,
    overflow: "auto",
    whiteSpace: "pre",
    marginTop: tokens.spacingVerticalS,
    marginBottom: tokens.spacingVerticalM,
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
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusMedium,
    padding: tokens.spacingVerticalL,
    marginTop: tokens.spacingVerticalM,
    marginBottom: tokens.spacingVerticalM,
    fontFamily: "monospace",
    fontSize: tokens.fontSizeBase200,
    whiteSpace: "pre",
    overflow: "auto",
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
            <Badge appearance="filled" color="success">
              TypeScript
            </Badge>
            <Badge appearance="filled" color="brand">
              PCF Safe
            </Badge>
            <Badge appearance="filled" color="informative">
              Result Pattern
            </Badge>
          </div>
        </header>

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

          <div
            className={styles.flexRow}
            style={{ marginTop: tokens.spacingVerticalL }}
          >
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

        <section id="architecture" className={styles.section}>
          <div className={styles.sectionHeader}>
            <Title2>Architecture</Title2>
            <span className={styles.codePath}>
              <Folder16Regular /> src/lib/dataverse/pcf/ARCHITECTURE.md
            </span>
          </div>
          <Body1>
            The wrapper follows a layered architecture with clear separation of
            concerns:
          </Body1>

          <div className={styles.diagram}>
            {`┌─────────────────────────────────────────────────────────────┐
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
└──────────────────────────────────────────────────────────────┘`}
          </div>
        </section>

        <Divider />

        <section id="setup" className={styles.section}>
          <div className={styles.sectionHeader}>
            <Title2>Setup & Installation</Title2>
            <span className={styles.codePath}>
              <Folder16Regular /> src/lib/dataverse/pcf/index.ts
            </span>
          </div>

          <Title3>Importing Services</Title3>
          <div className={styles.codeBlock}>
            {`import {
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
} from '@/lib/dataverse/pcf';`}
          </div>

          <Title3>Basic Control Setup</Title3>
          <div className={styles.codeBlock}>
            {`import { CrudService, QueryService, createLogger } from '@/lib/dataverse/pcf';

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
    // Cleanup if needed
    this.logger.info('Control destroyed');
  }
}`}
          </div>
        </section>

        <Divider />

        <section id="base-service" className={styles.section}>
          <div className={styles.sectionHeader}>
            <Title2>BaseDataverseService</Title2>
            <span className={styles.codePath}>
              <Folder16Regular /> src/lib/dataverse/pcf/BaseDataverseService.ts
            </span>
          </div>
          <Body1>
            The abstract base class providing shared functionality for all
            Dataverse services.
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
                <td className={styles.td}>
                  <code className={styles.inlineCode}>
                    execute&lt;T&gt;(...)
                  </code>
                </td>
                <td className={styles.td}>
                  Wraps operations with error handling, returns{" "}
                  <code className={styles.inlineCode}>DataverseResult</code>
                </td>
              </tr>
              <tr>
                <td className={styles.td}>
                  <code className={styles.inlineCode}>
                    buildQueryString(options)
                  </code>
                </td>
                <td className={styles.td}>
                  Builds OData query string from options
                </td>
              </tr>
              <tr>
                <td className={styles.td}>
                  <code className={styles.inlineCode}>
                    getEntityMetadata(entityName)
                  </code>
                </td>
                <td className={styles.td}>
                  Retrieves cached entity metadata
                </td>
              </tr>
              <tr>
                <td className={styles.td}>
                  <code className={styles.inlineCode}>updateContext(ctx)</code>
                </td>
                <td className={styles.td}>
                  Updates PCF context (call in updateView)
                </td>
              </tr>
              <tr>
                <td className={styles.td}>
                  <code className={styles.inlineCode}>
                    setLookupField(data, attr, entitySet, id)
                  </code>
                </td>
                <td className={styles.td}>Formats lookup field for binding</td>
              </tr>
            </tbody>
          </table>

          <Title3>Query String Building</Title3>
          <div className={styles.codeBlock}>
            {`// OData options
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
// &$expand=primarycontactid($select=fullname,emailaddress1)`}
          </div>
        </section>

        <Divider />

        <section id="crud-service" className={styles.section}>
          <div className={styles.sectionHeader}>
            <Title2>CrudService</Title2>
            <span className={styles.codePath}>
              <Folder16Regular /> src/lib/dataverse/pcf/CrudService.ts
            </span>
          </div>
          <Body1>
            Type-safe CRUD operations for a specific entity type.
          </Body1>

          <Title3>Create Operation</Title3>
          <div className={styles.codeBlock}>
            {`// Create a new account
const result = await this.accountService.create({
  name: 'Contoso Ltd',
  telephone1: '555-1234',
  revenue: 1000000
});

if (result.success) {
  console.log('Created account:', result.data.id);
} else {
  console.error('Create failed:', result.error.userMessage);
}`}
          </div>

          <Title3>Retrieve Operation</Title3>
          <div className={styles.codeBlock}>
            {`// Retrieve with specific columns
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
}`}
          </div>

          <Title3>Update Operation</Title3>
          <div className={styles.codeBlock}>
            {`// Update specific fields only
const result = await this.accountService.update(accountId, {
  telephone1: '555-9999',
  revenue: 2000000
});

if (result.success) {
  console.log('Account updated');
}`}
          </div>

          <Title3>Upsert Operation</Title3>
          <div className={styles.codeBlock}>
            {`// Create or update based on whether ID exists
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
}`}
          </div>

          <Title3>Working with Lookups</Title3>
          <div className={styles.codeBlock}>
            {`// Set a lookup field
const data = this.accountService.setLookup(
  { name: 'New Account' },
  'primarycontactid',    // lookup attribute
  'contacts',            // target entity set name
  contactId              // target record ID
);

// Clear a lookup field
const cleared = this.accountService.clearLookup(data, 'primarycontactid');

// Create with lookup
const result = await this.accountService.create(data);`}
          </div>

          <Title3>Batch Operations</Title3>
          <div className={styles.codeBlock}>
            {`// Create multiple records
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
}`}
          </div>
        </section>

        <Divider />

        <section id="query-service" className={styles.section}>
          <div className={styles.sectionHeader}>
            <Title2>QueryService</Title2>
            <span className={styles.codePath}>
              <Folder16Regular /> src/lib/dataverse/pcf/QueryService.ts
            </span>
          </div>
          <Body1>
            Advanced querying capabilities including OData, FetchXML, and
            convenience methods.
          </Body1>

          <Title3>OData Queries</Title3>
          <div className={styles.codeBlock}>
            {`// Basic query with filtering
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
    console.log(\`\${account.name}: \$\${account.revenue}\`);
  }
  
  // Check for more pages
  if (result.data.moreRecords && result.data.nextLink) {
    const nextPage = await this.queryService.getNextPage<Account>(
      result.data.nextLink
    );
  }
}`}
          </div>

          <Title3>FetchXML Queries</Title3>
          <div className={styles.codeBlock}>
            {`// Execute FetchXML query
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
}`}
          </div>

          <Title3>Retrieve All Records</Title3>
          <div className={styles.codeBlock}>
            {`// Retrieve all with progress callback and cancellation
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
// abortController.abort();`}
          </div>

          <Title3>Convenience Methods</Title3>
          <div className={styles.codeBlock}>
            {`// Count records
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
}`}
          </div>
        </section>

        <Divider />

        <section id="error-handler" className={styles.section}>
          <div className={styles.sectionHeader}>
            <Title2>ErrorHandler</Title2>
            <span className={styles.codePath}>
              <Folder16Regular /> src/lib/dataverse/pcf/ErrorHandler.ts
            </span>
          </div>
          <Body1>
            Normalizes Dataverse errors into consistent, actionable error
            objects.
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
                <td className={styles.td}>
                  <code className={styles.inlineCode}>NOT_FOUND</code>
                </td>
                <td className={styles.td}>Record does not exist</td>
                <td className={styles.td}>No</td>
              </tr>
              <tr>
                <td className={styles.td}>
                  <code className={styles.inlineCode}>ACCESS_DENIED</code>
                </td>
                <td className={styles.td}>
                  User lacks permission for operation
                </td>
                <td className={styles.td}>No</td>
              </tr>
              <tr>
                <td className={styles.td}>
                  <code className={styles.inlineCode}>DUPLICATE_RECORD</code>
                </td>
                <td className={styles.td}>
                  Duplicate key or alternate key violation
                </td>
                <td className={styles.td}>No</td>
              </tr>
              <tr>
                <td className={styles.td}>
                  <code className={styles.inlineCode}>VALIDATION_ERROR</code>
                </td>
                <td className={styles.td}>
                  Invalid data or business rule violation
                </td>
                <td className={styles.td}>No</td>
              </tr>
              <tr>
                <td className={styles.td}>
                  <code className={styles.inlineCode}>CONCURRENCY_ERROR</code>
                </td>
                <td className={styles.td}>
                  Record modified by another user
                </td>
                <td className={styles.td}>Yes</td>
              </tr>
              <tr>
                <td className={styles.td}>
                  <code className={styles.inlineCode}>TIMEOUT</code>
                </td>
                <td className={styles.td}>Request timed out</td>
                <td className={styles.td}>Yes</td>
              </tr>
              <tr>
                <td className={styles.td}>
                  <code className={styles.inlineCode}>RATE_LIMITED</code>
                </td>
                <td className={styles.td}>
                  Too many requests (429 status)
                </td>
                <td className={styles.td}>Yes</td>
              </tr>
              <tr>
                <td className={styles.td}>
                  <code className={styles.inlineCode}>NETWORK_ERROR</code>
                </td>
                <td className={styles.td}>Connection failed</td>
                <td className={styles.td}>Yes</td>
              </tr>
            </tbody>
          </table>

          <Title3>Usage Example</Title3>
          <div className={styles.codeBlock}>
            {`import { createErrorHandler } from '@/lib/dataverse/pcf';

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
}`}
          </div>
        </section>

        <Divider />

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

          <div className={styles.codeBlock}>
            {`// Type definitions
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

type DataverseResult<T> = SuccessResult<T> | FailureResult;`}
          </div>

          <Title3>Pattern Usage</Title3>
          <div className={styles.codeBlock}>
            {`// TypeScript enforces checking success before accessing data
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
}`}
          </div>

          <div className={styles.successBox}>
            <Checkmark24Regular />
            <Body1>
              The Result pattern eliminates uncaught exceptions and makes error
              handling explicit and type-safe.
            </Body1>
          </div>
        </section>

        <Divider />

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
          <div className={styles.codeBlock}>
            {`// Dynamic Value configuration structure
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
      {
        attribute: 'statecode',
        operator: 'eq',
        value: '0'
      },
      {
        attribute: 'revenue',
        operator: 'gt',
        value: '100000'
      }
    ]
  }
};`}
          </div>

          <Title3>Loading Dynamic Options</Title3>
          <div className={styles.codeBlock}>
            {`import { generateFetchXml } from '@/lib/dataverse/fetchXmlGenerator';
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
}`}
          </div>

          <Title3>Lookup Field Filtering</Title3>
          <Body1>
            Filter by attributes of related entities using lookup expressions:
          </Body1>
          <div className={styles.codeBlock}>
            {`// Filter accounts by their primary contact's city
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
// $filter=primarycontactid/address1_city eq 'Seattle'`}
          </div>

          <Title3>Complete Integration Example</Title3>
          <div className={styles.codeBlock}>
            {`// In your PCF control or component
class DynamicDropdownControl {
  private queryService!: QueryService;
  private container!: HTMLDivElement;
  
  public async init(context: IPCFContext, container: HTMLDivElement) {
    this.queryService = new QueryService(context);
    this.container = container;
    
    await this.loadAndRender();
  }
  
  private async loadAndRender() {
    // Configuration from questionnaire
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
    
    // Load options
    const options = await loadDynamicOptions(this.queryService, config);
    
    // Render dropdown
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
}`}
          </div>
        </section>

        <Divider />

        <section id="fetchxml" className={styles.section}>
          <div className={styles.sectionHeader}>
            <Title2>FetchXML Generator</Title2>
            <span className={styles.codePath}>
              <Folder16Regular /> src/lib/dataverse/fetchXmlGenerator.ts
            </span>
          </div>
          <Body1>
            Generate FetchXML queries from Dynamic Value configurations.
          </Body1>

          <div className={styles.codeBlock}>
            {`import { 
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
// </fetch>`}
          </div>
        </section>

        <Divider />

        <section id="odata" className={styles.section}>
          <div className={styles.sectionHeader}>
            <Title2>OData Generator</Title2>
            <span className={styles.codePath}>
              <Folder16Regular /> src/lib/dataverse/odataGenerator.ts
            </span>
          </div>
          <Body1>
            Generate OData query URLs from Dynamic Value configurations.
          </Body1>

          <div className={styles.codeBlock}>
            {`import { 
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
// }`}
          </div>
        </section>

        <Divider />

        <section id="pcf-lifecycle" className={styles.section}>
          <div className={styles.sectionHeader}>
            <Title2>PCF Lifecycle Best Practices</Title2>
            <span className={styles.codePath}>
              <Folder16Regular /> src/lib/dataverse/pcf/SamplePCFControl.ts
            </span>
          </div>

          <Title3>init() - Initialization</Title3>
          <div className={styles.codeBlock}>
            {`public init(
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
}`}
          </div>

          <Title3>updateView() - Refresh</Title3>
          <div className={styles.codeBlock}>
            {`public updateView(context: ComponentFramework.Context<IInputs>): void {
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
}`}
          </div>

          <Title3>destroy() - Cleanup</Title3>
          <div className={styles.codeBlock}>
            {`public destroy(): void {
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
}`}
          </div>
        </section>

        <Divider />

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
          <div className={styles.codeBlock}>
            {`// ✅ Escape user input in OData filters
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
element.textContent = untrustedData;`}
          </div>

          <Title3>Data Logging Guidelines</Title3>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              Never log PII (names, emails, phone numbers)
            </li>
            <li className={styles.listItem}>
              Never log passwords or authentication tokens
            </li>
            <li className={styles.listItem}>
              Truncate large data payloads in logs
            </li>
            <li className={styles.listItem}>
              Use structured logging with entity/id context
            </li>
          </ul>
        </section>

        <Divider />

        <section id="performance" className={styles.section}>
          <div className={styles.sectionHeader}>
            <Title2>Performance Optimization</Title2>
            <span className={styles.codePath}>
              <Folder16Regular /> src/lib/dataverse/pcf/PRODUCTION_CHECKLIST.md
            </span>
          </div>

          <Title3>Query Optimization</Title3>
          <div className={styles.codeBlock}>
            {`// ✅ Always specify $select - never retrieve all columns
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
controller.abort();`}
          </div>

          <Title3>Caching Strategy</Title3>
          <div className={styles.codeBlock}>
            {`// Entity metadata is cached automatically (5-minute TTL)
const metadata = await service.getEntityMetadata('account');

// Force refresh if needed
const freshMetadata = await service.getEntityMetadata('account', true);

// Clear cache when appropriate
service.clearMetadataCache('account'); // Specific entity
service.clearMetadataCache();          // All entities`}
          </div>

          <Title3>Debouncing Updates</Title3>
          <div className={styles.codeBlock}>
            {`private updateTimeout?: number;

public updateView(context: IPCFContext): void {
  // Debounce rapid updateView calls
  window.clearTimeout(this.updateTimeout);
  
  this.updateTimeout = window.setTimeout(() => {
    this.performUpdate(context);
  }, 150);
}

public destroy(): void {
  window.clearTimeout(this.updateTimeout);
}`}
          </div>

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
