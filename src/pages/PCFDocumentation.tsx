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
  Button,
  Divider,
  Link,
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionPanel,
} from "@fluentui/react-components";
import {
  ArrowLeft24Regular,
  Database24Regular,
  Shield24Regular,
  Rocket24Regular,
  Checkmark24Regular,
  Play24Filled,
  ArrowRight16Regular,
  Code24Regular,
  Document24Regular,
  Warning24Regular,
  Folder24Regular,
  Settings24Regular,
  Copy24Regular,
  CheckmarkCircle24Regular,
  Circle24Regular,
  ArrowSync24Regular,
} from "@fluentui/react-icons";
import { useNavigation } from "../lib/navigation";
import { CodeBlock } from "../components/ui/code-block";

const useStyles = makeStyles({
  container: {
    minHeight: "100vh",
    backgroundColor: tokens.colorNeutralBackground2,
    display: "flex",
    flexDirection: "column",
  },
  header: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    padding: `${tokens.spacingVerticalXL} ${tokens.spacingHorizontalXXL}`,
  },
  headerContent: {
    maxWidth: "1200px",
    margin: "0 auto",
  },
  backLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    color: tokens.colorBrandForeground1,
    textDecoration: "none",
    marginBottom: tokens.spacingVerticalL,
    fontSize: tokens.fontSizeBase300,
    cursor: "pointer",
    background: "none",
    border: "none",
    padding: 0,
    "&:hover": {
      textDecoration: "underline",
    },
  },
  headerBadges: {
    display: "flex",
    gap: tokens.spacingHorizontalS,
    marginTop: tokens.spacingVerticalS,
    marginBottom: tokens.spacingVerticalL,
    flexWrap: "wrap",
  },
  main: {
    flex: 1,
    padding: tokens.spacingVerticalXXL,
    maxWidth: "1200px",
    margin: "0 auto",
    width: "100%",
  },
  heroCard: {
    padding: tokens.spacingVerticalXXL,
    marginBottom: tokens.spacingVerticalXXL,
    background: `linear-gradient(135deg, ${tokens.colorBrandBackground2} 0%, ${tokens.colorNeutralBackground1} 100%)`,
    border: `2px solid ${tokens.colorBrandStroke1}`,
  },
  heroContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    gap: tokens.spacingVerticalL,
  },
  heroIcon: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    backgroundColor: tokens.colorBrandBackground,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: tokens.colorNeutralForegroundOnBrand,
    fontSize: "40px",
  },
  heroButton: {
    marginTop: tokens.spacingVerticalM,
    minWidth: "280px",
    height: "48px",
    fontSize: tokens.fontSizeBase400,
  },
  section: {
    marginBottom: tokens.spacingVerticalXXL,
  },
  featureGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: tokens.spacingHorizontalL,
    marginTop: tokens.spacingVerticalL,
  },
  featureCard: {
    padding: tokens.spacingVerticalL,
  },
  quickLinks: {
    display: "flex",
    gap: tokens.spacingHorizontalL,
    flexWrap: "wrap",
    marginTop: tokens.spacingVerticalL,
  },
  quickLink: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`,
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusMedium,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    textDecoration: "none",
    color: tokens.colorNeutralForeground1,
    "&:hover": {
      backgroundColor: tokens.colorNeutralBackground3,
    },
  },
  warningBox: {
    backgroundColor: tokens.colorPaletteYellowBackground1,
    border: `1px solid ${tokens.colorPaletteYellowBorder1}`,
    borderRadius: tokens.borderRadiusMedium,
    padding: tokens.spacingVerticalM,
    marginTop: tokens.spacingVerticalM,
    display: "flex",
    gap: tokens.spacingHorizontalM,
  },
  successBox: {
    backgroundColor: tokens.colorPaletteGreenBackground1,
    border: `1px solid ${tokens.colorPaletteGreenBorder1}`,
    borderRadius: tokens.borderRadiusMedium,
    padding: tokens.spacingVerticalM,
    marginTop: tokens.spacingVerticalM,
    display: "flex",
    gap: tokens.spacingHorizontalM,
  },
  footer: {
    marginTop: tokens.spacingVerticalXXL,
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: tokens.spacingHorizontalL,
  },
  stepCard: {
    padding: tokens.spacingVerticalL,
    marginBottom: tokens.spacingVerticalM,
  },
  stepHeader: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalM,
    marginBottom: tokens.spacingVerticalM,
  },
  stepNumber: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 600,
    fontSize: tokens.fontSizeBase400,
  },
  codeContainer: {
    marginTop: tokens.spacingVerticalM,
    marginBottom: tokens.spacingVerticalM,
  },
  fileList: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
    marginTop: tokens.spacingVerticalM,
  },
  fileItem: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    padding: tokens.spacingVerticalS,
    backgroundColor: tokens.colorNeutralBackground3,
    borderRadius: tokens.borderRadiusMedium,
    fontFamily: "monospace",
    fontSize: tokens.fontSizeBase200,
  },
  checklistItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: tokens.spacingHorizontalS,
    padding: tokens.spacingVerticalS,
  },
  accordionPanel: {
    padding: tokens.spacingVerticalM,
  },
});

const PCFDocumentation = () => {
  const styles = useStyles();
  const { navigate } = useNavigation();

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <button onClick={() => navigate('docs')} className={styles.backLink}>
            <ArrowLeft24Regular />
            Back to Documentation
          </button>
          <Title1>PCF Dataverse Wrapper</Title1>
          <Body1>
            Production-ready TypeScript services for Microsoft Dataverse integration
            in Power Apps Component Framework (PCF) controls.
          </Body1>
          <div className={styles.headerBadges}>
            <Badge appearance="filled" color="success">TypeScript</Badge>
            <Badge appearance="filled" color="brand">PCF Safe</Badge>
            <Badge appearance="filled" color="informative">Result Pattern</Badge>
            <Badge appearance="filled" color="warning">Real-time Ready</Badge>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className={styles.main}>
        {/* Hero Card - Open Playground */}
        <Card className={styles.heroCard}>
          <div className={styles.heroContent}>
            <div className={styles.heroIcon}>
              <Play24Filled />
            </div>
            <Title2>Interactive Operations Playground</Title2>
            <Body1 style={{ maxWidth: "600px" }}>
              Test all Dataverse wrapper operations in real-time. The playground includes 
              step-by-step guides, code generation, and works with live Dataverse when 
              deployed to Dynamics 365.
            </Body1>
            <Button 
              appearance="primary" 
              size="large"
              icon={<Play24Filled />}
              className={styles.heroButton}
              onClick={() => navigate('docs-playground')}
            >
              Open Operations Playground
            </Button>
          </div>
        </Card>

        <Divider />

        {/* PCF Migration Guide */}
        <section className={styles.section}>
          <Title2>📦 PCF Migration Guide</Title2>
          <Body1>
            Follow this step-by-step guide to migrate the Dataverse wrapper services to a new PCF project.
          </Body1>

          {/* Step 1: Create PCF Project */}
          <Card className={styles.stepCard}>
            <div className={styles.stepHeader}>
              <div className={styles.stepNumber}>1</div>
              <Title3>Create New PCF Project</Title3>
            </div>
            <Body1>
              Initialize a new PCF control project using the Power Platform CLI (pac).
            </Body1>
            <div className={styles.codeContainer}>
              <CodeBlock
                code={`# Install Power Platform CLI (if not installed)
npm install -g @microsoft/power-platform-cli

# Create new PCF project directory
mkdir my-pcf-control
cd my-pcf-control

# Initialize PCF control (React)
pac pcf init --namespace MyNamespace --name MyControl --template field --framework react

# Install dependencies
npm install`}
                language="bash"
              />
            </div>
            <div className={styles.warningBox}>
              <Warning24Regular />
              <Body1>
                Make sure you have Node.js 18+ and the Power Platform CLI installed globally.
              </Body1>
            </div>
          </Card>

          {/* Step 2: Copy Core Files */}
          <Card className={styles.stepCard}>
            <div className={styles.stepHeader}>
              <div className={styles.stepNumber}>2</div>
              <Title3>Copy Dataverse Wrapper Files</Title3>
            </div>
            <Body1>
              Copy the following files from <code>src/lib/dataverse/pcf/</code> to your PCF project:
            </Body1>
            <div className={styles.fileList}>
              <div className={styles.fileItem}>
                <Folder24Regular /> types.ts — Core type definitions
              </div>
              <div className={styles.fileItem}>
                <Folder24Regular /> Logger.ts — Environment-aware logging
              </div>
              <div className={styles.fileItem}>
                <Folder24Regular /> ErrorHandler.ts — Result pattern & error handling
              </div>
              <div className={styles.fileItem}>
                <Folder24Regular /> BaseDataverseService.ts — Service base class
              </div>
              <div className={styles.fileItem}>
                <Folder24Regular /> CrudService.ts — Generic CRUD operations
              </div>
              <div className={styles.fileItem}>
                <Folder24Regular /> QueryService.ts — OData & FetchXML queries
              </div>
              <div className={styles.fileItem}>
                <Folder24Regular /> MetadataService.ts — Entity metadata discovery
              </div>
              <div className={styles.fileItem}>
                <Folder24Regular /> DynamicValuesService.ts — Dynamic value resolution
              </div>
              <div className={styles.fileItem}>
                <Folder24Regular /> index.ts — Barrel exports
              </div>
            </div>
            <div className={styles.codeContainer}>
              <CodeBlock
                code={`# Recommended folder structure in your PCF project
MyControl/
├── services/
│   └── dataverse/
│       ├── types.ts
│       ├── Logger.ts
│       ├── ErrorHandler.ts
│       ├── BaseDataverseService.ts
│       ├── CrudService.ts
│       ├── QueryService.ts
│       ├── MetadataService.ts
│       ├── DynamicValuesService.ts
│       └── index.ts
├── index.ts              # PCF control entry
└── MyControl.tsx         # React component`}
                language="bash"
              />
            </div>
          </Card>

          {/* Step 3: Update Import Paths */}
          <Card className={styles.stepCard}>
            <div className={styles.stepHeader}>
              <div className={styles.stepNumber}>3</div>
              <Title3>Update Import Paths (Critical!)</Title3>
            </div>
            <Body1>
              PCF projects don't support path aliases like <code>@/</code>. Ensure all imports use relative paths.
            </Body1>
            <div className={styles.codeContainer}>
              <CodeBlock
                code={`// ❌ BROKEN in PCF - alias won't resolve
import { AnswerSet } from "@/types/questionnaire";
import { Logger } from "@/lib/core/logger";

// ✅ WORKS in PCF - relative imports are portable
import { AnswerSet } from "../types/questionnaire";
import { Logger } from "./Logger";
import { CrudService, QueryService } from "./services/dataverse";`}
                language="typescript"
              />
            </div>
            <div className={styles.successBox}>
              <CheckmarkCircle24Regular />
              <Body1>
                This codebase has already been converted to use relative imports throughout, making it PCF-ready.
              </Body1>
            </div>
          </Card>

          {/* Step 4: Configure PCF Control */}
          <Card className={styles.stepCard}>
            <div className={styles.stepHeader}>
              <div className={styles.stepNumber}>4</div>
              <Title3>Configure PCF Control Entry Point</Title3>
            </div>
            <Body1>
              Update your PCF control's <code>index.ts</code> to initialize services with the context.
            </Body1>
            <div className={styles.codeContainer}>
              <CodeBlock
                code={`// index.ts - PCF Control Entry Point
import { IInputs, IOutputs } from "./generated/ManifestTypes";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { createCrudService, createQueryService } from "./services/dataverse";
import { MyControl } from "./MyControl";

export class MyPCFControl implements ComponentFramework.ReactControl<IInputs, IOutputs> {
  private container: HTMLDivElement;
  private context: ComponentFramework.Context<IInputs>;
  
  // Services initialized with context
  private crudService: ReturnType<typeof createCrudService>;
  private queryService: ReturnType<typeof createQueryService>;

  public init(
    context: ComponentFramework.Context<IInputs>,
    notifyOutputChanged: () => void,
    state: ComponentFramework.Dictionary
  ): void {
    this.context = context;
    
    // ✅ Initialize services with PCF context
    this.crudService = createCrudService(context);
    this.queryService = createQueryService(context);
  }

  public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {
    this.context = context;
    
    return React.createElement(MyControl, {
      context: this.context,
      crudService: this.crudService,
      queryService: this.queryService,
    });
  }

  public destroy(): void {
    // Cleanup - important for memory management
    ReactDOM.unmountComponentAtNode(this.container);
  }
}`}
                language="typescript"
              />
            </div>
          </Card>

          {/* Step 5: Use Services in Components */}
          <Card className={styles.stepCard}>
            <div className={styles.stepHeader}>
              <div className={styles.stepNumber}>5</div>
              <Title3>Use Services in React Components</Title3>
            </div>
            <Body1>
              Access the Dataverse services through props or React Context in your components.
            </Body1>
            <div className={styles.codeContainer}>
              <CodeBlock
                code={`// MyControl.tsx - React Component
import * as React from "react";
import { CrudService, QueryService, DataverseResult } from "./services/dataverse";

interface MyControlProps {
  context: ComponentFramework.Context<IInputs>;
  crudService: CrudService;
  queryService: QueryService;
}

export const MyControl: React.FC<MyControlProps> = ({ 
  context, 
  crudService, 
  queryService 
}) => {
  const [accounts, setAccounts] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    loadAccounts();
  }, []);

  const loadAccounts = async () => {
    setLoading(true);
    
    // ✅ Using Result pattern - never throws
    const result = await queryService.retrieveMultiple<{ name: string }>(
      "account",
      { select: ["name", "accountid"], top: 10 }
    );

    if (result.success) {
      setAccounts(result.data);
      setError(null);
    } else {
      setError(result.error.userMessage);
      setAccounts([]);
    }
    
    setLoading(false);
  };

  const createAccount = async (name: string) => {
    const result = await crudService.create("account", { name });
    
    if (result.success) {
      console.log("Created account:", result.data.id);
      await loadAccounts(); // Refresh list
    } else {
      setError(result.error.userMessage);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Accounts ({accounts.length})</h2>
      <ul>
        {accounts.map(acc => (
          <li key={acc.accountid}>{acc.name}</li>
        ))}
      </ul>
    </div>
  );
};`}
                language="typescript"
              />
            </div>
          </Card>

          {/* Step 6: Build and Deploy */}
          <Card className={styles.stepCard}>
            <div className={styles.stepHeader}>
              <div className={styles.stepNumber}>6</div>
              <Title3>Build and Deploy</Title3>
            </div>
            <Body1>
              Build your PCF control and deploy it to your Power Platform environment.
            </Body1>
            <div className={styles.codeContainer}>
              <CodeBlock
                code={`# Build the control
npm run build

# Test locally with harness
npm start watch

# Create solution for deployment
pac solution init --publisher-name MyPublisher --publisher-prefix myp

# Add control to solution
pac solution add-reference --path ./

# Build managed solution
msbuild /t:build /restore /p:configuration=Release

# Deploy to environment
pac auth create --environment https://yourorg.crm.dynamics.com
pac pcf push --publisher-prefix myp`}
                language="bash"
              />
            </div>
          </Card>

          {/* Migration Checklist */}
          <Accordion collapsible>
            <AccordionItem value="checklist">
              <AccordionHeader icon={<Checkmark24Regular />}>
                Migration Checklist
              </AccordionHeader>
              <AccordionPanel className={styles.accordionPanel}>
                <div className={styles.checklistItem}>
                  <Circle24Regular /> All imports use relative paths (no <code>@/</code> aliases)
                </div>
                <div className={styles.checklistItem}>
                  <Circle24Regular /> No <code>Xrm.*</code> or <code>formContext</code> usage
                </div>
                <div className={styles.checklistItem}>
                  <Circle24Regular /> No <code>window.fetch</code> for Dataverse calls
                </div>
                <div className={styles.checklistItem}>
                  <Circle24Regular /> No <code>localStorage</code> or <code>sessionStorage</code>
                </div>
                <div className={styles.checklistItem}>
                  <Circle24Regular /> All Dataverse calls use <code>context.webAPI</code>
                </div>
                <div className={styles.checklistItem}>
                  <Circle24Regular /> Error handling uses Result pattern (no throws)
                </div>
                <div className={styles.checklistItem}>
                  <Circle24Regular /> Logger configured for production (WARN/ERROR only)
                </div>
                <div className={styles.checklistItem}>
                  <Circle24Regular /> QueryClient cleanup in <code>destroy()</code> method
                </div>
                <div className={styles.checklistItem}>
                  <Circle24Regular /> PCF manifest (<code>ControlManifest.Input.xml</code>) configured
                </div>
                <div className={styles.checklistItem}>
                  <Circle24Regular /> Solution built and tested in harness
                </div>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem value="troubleshooting">
              <AccordionHeader icon={<Warning24Regular />}>
                Common Issues & Solutions
              </AccordionHeader>
              <AccordionPanel className={styles.accordionPanel}>
                <Title3>Module Resolution Errors</Title3>
                <Body1>
                  If you see "Cannot find module" errors, check that all imports use relative paths
                  and the file extensions are correct for your tsconfig settings.
                </Body1>
                
                <Title3 style={{ marginTop: tokens.spacingVerticalL }}>
                  context.webAPI is undefined
                </Title3>
                <Body1>
                  Ensure you're testing in a real Dynamics 365 environment or the PCF test harness.
                  The webAPI is not available in standalone browser testing.
                </Body1>

                <Title3 style={{ marginTop: tokens.spacingVerticalL }}>
                  CORS Errors
                </Title3>
                <Body1>
                  Never use <code>window.fetch</code> for Dataverse calls. Always use 
                  <code>context.webAPI</code> which handles authentication automatically.
                </Body1>

                <Title3 style={{ marginTop: tokens.spacingVerticalL }}>
                  Type Errors with ComponentFramework
                </Title3>
                <Body1>
                  Install the PCF types package: <code>npm install @types/powerapps-component-framework</code>
                </Body1>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </section>

        <Divider />

        {/* Features Overview */}
        <section className={styles.section}>
          <Title2>What's Included</Title2>
          <div className={styles.featureGrid}>
            <Card className={styles.featureCard}>
              <CardHeader
                image={<Database24Regular />}
                header={<b>CRUD Operations</b>}
                description="Create, Retrieve, Update, Delete with type safety"
              />
            </Card>
            <Card className={styles.featureCard}>
              <CardHeader
                image={<Code24Regular />}
                header={<b>Query Services</b>}
                description="OData & FetchXML with auto-pagination"
              />
            </Card>
            <Card className={styles.featureCard}>
              <CardHeader
                image={<Shield24Regular />}
                header={<b>ErrorHandler Wrapper</b>}
                description="Consistent error handling with retry logic"
              />
            </Card>
            <Card className={styles.featureCard}>
              <CardHeader
                image={<Rocket24Regular />}
                header={<b>Metadata Discovery</b>}
                description="Dynamic entity & field discovery at runtime"
              />
            </Card>
            <Card className={styles.featureCard}>
              <CardHeader
                image={<Checkmark24Regular />}
                header={<b>Result Pattern</b>}
                description="Type-safe success/failure handling - never throws"
              />
            </Card>
            <Card className={styles.featureCard}>
              <CardHeader
                image={<Document24Regular />}
                header={<b>PCF Lifecycle</b>}
                description="Best practices for init, updateView, destroy"
              />
            </Card>
          </div>
        </section>

        <Divider />

        {/* Quick Reference */}
        <section className={styles.section}>
          <Title2>Quick Reference</Title2>
          <Body1>
            All wrapper services are exported from a single entry point:
          </Body1>
          <div className={styles.codeContainer}>
            <CodeBlock
              code={`import { 
  createCrudService,
  createQueryService,
  errorHandler,
  withRetry,
  withSafeExecution,
  handleError,
} from './services/dataverse';`}
              language="typescript"
            />
          </div>

          <div className={styles.warningBox}>
            <Warning24Regular />
            <div>
              <Body1 style={{ fontWeight: 600 }}>PCF Safety</Body1>
              <Body1>
                All services use only <code>context.webAPI</code> and <code>context.utils</code>. 
                Forbidden APIs like <code>Xrm.*</code>, <code>window.fetch</code>, and <code>localStorage</code> are never used.
              </Body1>
            </div>
          </div>
        </section>

        <Divider />

        {/* Source Files */}
        <section className={styles.section}>
          <Title2>Source Files</Title2>
          <Body1>
            The wrapper implementation is located in the following directory:
          </Body1>
          <div className={styles.quickLinks}>
            <span className={styles.quickLink}>
              📁 src/lib/dataverse/pcf/
            </span>
            <span className={styles.quickLink}>
              📄 CrudService.ts
            </span>
            <span className={styles.quickLink}>
              📄 QueryService.ts
            </span>
            <span className={styles.quickLink}>
              📄 ErrorHandler.ts
            </span>
            <span className={styles.quickLink}>
              📄 MetadataService.ts
            </span>
            <span className={styles.quickLink}>
              📄 types.ts
            </span>
          </div>
        </section>

        {/* Footer */}
        <Divider />
        <div className={styles.footer}>
          <button onClick={() => navigate('docs')} className={styles.backLink}>
            <ArrowLeft24Regular />
            Back to Main Documentation
          </button>
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
