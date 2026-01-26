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
          <Title2>📦 Complete PCF Migration Guide</Title2>
          <Body1>
            Follow this comprehensive guide to migrate the entire Questionnaire Studio to a new PCF project.
            This covers all components, services, types, and best practices.
          </Body1>

          {/* Overview */}
          <Card className={styles.stepCard}>
            <div className={styles.stepHeader}>
              <Rocket24Regular />
              <Title3>Migration Overview</Title3>
            </div>
            <Body1>
              The Questionnaire Studio consists of the following major modules that need to be migrated:
            </Body1>
            <div className={styles.fileList}>
              <div className={styles.fileItem}>
                <Folder24Regular /> <b>types/</b> — Core type definitions (Questionnaire, AnswerSet, Conditions)
              </div>
              <div className={styles.fileItem}>
                <Folder24Regular /> <b>lib/core/</b> — Result pattern, ID generation, guards, logging
              </div>
              <div className={styles.fileItem}>
                <Folder24Regular /> <b>lib/questionnaire/</b> — Factory, traversal, stats, constants
              </div>
              <div className={styles.fileItem}>
                <Folder24Regular /> <b>lib/dataverse/pcf/</b> — CRUD, Query, Metadata services
              </div>
              <div className={styles.fileItem}>
                <Folder24Regular /> <b>lib/storage/</b> — Draft & Published persistence services
              </div>
              <div className={styles.fileItem}>
                <Folder24Regular /> <b>lib/navigation/</b> — State-based PCF navigation
              </div>
              <div className={styles.fileItem}>
                <Folder24Regular /> <b>components/questionnaire/</b> — Builder UI components
              </div>
              <div className={styles.fileItem}>
                <Folder24Regular /> <b>components/executor/</b> — Runtime questionnaire renderer
              </div>
              <div className={styles.fileItem}>
                <Folder24Regular /> <b>components/fluent/</b> — Fluent UI wrappers & theming
              </div>
              <div className={styles.fileItem}>
                <Folder24Regular /> <b>hooks/</b> — Custom React hooks
              </div>
            </div>
          </Card>

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
mkdir QuestionnaireStudioControl
cd QuestionnaireStudioControl

# Initialize PCF control
pac pcf init --namespace ctnapcf --name QuestionnaireStudioControl --template field

# Install required dependencies
npm install @fluentui/react-components @fluentui/react-icons
npm install @tanstack/react-query
npm install @tiptap/react @tiptap/starter-kit @tiptap/pm
npm install zod date-fns clsx
npm install react-hook-form @hookform/resolvers
npm install react-resizable-panels
npm install react-syntax-highlighter`}
                language="bash"
              />
            </div>
            <div className={styles.warningBox}>
              <Warning24Regular />
              <Body1>
                Ensure you use <code>--framework react</code> for React-based controls. 
                The <code>virtual</code> control type is recommended for complex UIs.
              </Body1>
            </div>
          </Card>

          {/* Step 2: Project Structure */}
          <Card className={styles.stepCard}>
            <div className={styles.stepHeader}>
              <div className={styles.stepNumber}>2</div>
              <Title3>Copy Source Folder As-Is</Title3>
            </div>
            <Body1>
              The <code>src/</code> folder structure is kept exactly as-is. Simply copy the entire folder into your PCF project:
            </Body1>
            <div className={styles.codeContainer}>
              <CodeBlock
                code={`QuestionnaireStudioControl/          # Your PCF control folder
├── ControlManifest.Input.xml         # PCF manifest
├── index.ts                          # PCF control entry point (new)
├── generated/                        # PCF generated types (auto-created by pac)
│   └── ManifestTypes.d.ts
│
├── src/                              # ⬅️ COPY ENTIRE FOLDER AS-IS
│   ├── App.tsx                       # Main app component
│   ├── App.css
│   ├── index.css                     # CSS variables (convert Tailwind)
│   ├── main.tsx                      # (Not used in PCF, entry is index.ts)
│   │
│   ├── types/
│   │   ├── questionnaire.ts
│   │   ├── condition.ts
│   │   └── questionnaireResponse.ts
│   │
│   ├── lib/
│   │   ├── core/                     # Result pattern, ID, guards, logging
│   │   ├── questionnaire/            # Factory, traversal, stats, constants
│   │   ├── dataverse/pcf/            # CRUD, Query, Metadata services
│   │   ├── storage/                  # Draft & Published services
│   │   ├── navigation/               # State-based navigation
│   │   ├── conditionEvaluator.ts
│   │   ├── QuestionnaireWrapper.ts
│   │   └── questionnaireExport.ts
│   │
│   ├── components/
│   │   ├── fluent/                   # FluentThemeProvider, ConfirmDialog
│   │   ├── questionnaire/            # Builder UI components
│   │   ├── executor/                 # Runtime question renderer
│   │   ├── dataverse/                # Dataverse playground
│   │   └── ui/                       # Shared UI components
│   │
│   ├── hooks/                        # Custom React hooks
│   ├── data/                         # Sample data & templates
│   ├── pages/                        # Index, Execute, Documentation
│   └── features/                     # Feature-specific modules
│
├── .gitignore
├── eslint.config.mjs
├── package.json
├── pcfconfig.json
└── tsconfig.json`}
                language="bash"
              />
            </div>
            <div className={styles.successBox}>
              <CheckmarkCircle24Regular />
              <Body1>
                <b>Key advantage:</b> No restructuring needed! The folder hierarchy stays identical, preserving all relative imports.
              </Body1>
            </div>
          </Card>

          {/* Step 3: Copy Command */}
          <Card className={styles.stepCard}>
            <div className={styles.stepHeader}>
              <div className={styles.stepNumber}>3</div>
              <Title3>Copy Files to PCF Project</Title3>
            </div>
            <Body1>
              Use these commands to copy the source folder:
            </Body1>
            <div className={styles.codeContainer}>
              <CodeBlock
                code={`# From the Questionnaire Studio source project root
# Copy entire src folder to your PCF control folder

# Windows (PowerShell)
Copy-Item -Path "src" -Destination "path/to/QuestionnaireStudioControl/src" -Recurse

# macOS/Linux
cp -r src/ path/to/QuestionnaireStudioControl/src/

# ──────────────────────────────────────
# Files to EXCLUDE (Vite-specific, not needed in PCF)
# ──────────────────────────────────────
# - src/main.tsx          (PCF uses index.ts as entry)
# - src/vite-env.d.ts     (Vite types not needed)
# - vite.config.ts        (PCF has own build)
# - tailwind.config.ts    (Convert to CSS)
# - postcss.config.js     (Not needed)

# ──────────────────────────────────────
# Files to ADAPT
# ──────────────────────────────────────
# - src/index.css         → Convert Tailwind directives to CSS
# - src/App.tsx           → Remove Vite-specific imports if any
# - src/lib/storage/*     → Replace localStorage with Dataverse`}
                language="bash"
              />
            </div>
            <div className={styles.successBox}>
              <CheckmarkCircle24Regular />
              <Body1>
                All source files already use relative imports (e.g., <code>../types/questionnaire</code>), making them PCF-compatible out of the box.
              </Body1>
            </div>
          </Card>

          {/* Step 4: Update Import Paths */}
          <Card className={styles.stepCard}>
            <div className={styles.stepHeader}>
              <div className={styles.stepNumber}>4</div>
              <Title3>Verify Import Paths</Title3>
            </div>
            <Body1>
              PCF projects don't support path aliases like <code>@/</code>. All imports must be relative.
            </Body1>
            <div className={styles.codeContainer}>
              <CodeBlock
                code={`// ❌ BROKEN in PCF - alias won't resolve
import { Questionnaire } from "@/types/questionnaire";
import { useQuestionnaireState } from "@/hooks/useQuestionnaireState";

// ✅ WORKS in PCF - relative imports
import { Questionnaire } from "../types/questionnaire";
import { useQuestionnaireState } from "../hooks/useQuestionnaireState";

// ✅ From components/questionnaire/QuestionEditor.tsx:
import { Question, AnswerSet } from "../../types/questionnaire";
import { createAnswer } from "../../lib/questionnaire/factory";
import { FluentThemeProvider } from "../fluent";`}
                language="typescript"
              />
            </div>
            <div className={styles.successBox}>
              <CheckmarkCircle24Regular />
              <Body1>
                This codebase has already been converted to relative imports. Run ESLint to verify no <code>@/</code> aliases remain.
              </Body1>
            </div>
          </Card>

          {/* Step 5: Adapt Storage Services */}
          <Card className={styles.stepCard}>
            <div className={styles.stepHeader}>
              <div className={styles.stepNumber}>5</div>
              <Title3>Adapt Storage to Dataverse</Title3>
            </div>
            <Body1>
              Replace localStorage-based storage with Dataverse persistence using the CRUD service.
            </Body1>
            <div className={styles.codeContainer}>
              <CodeBlock
                code={`// lib/storage/draftService.ts - BEFORE (localStorage)
export const draftService = {
  save: (id: string, data: Questionnaire) => {
    localStorage.setItem(\`draft-\${id}\`, JSON.stringify(data));
  },
  load: (id: string) => {
    const item = localStorage.getItem(\`draft-\${id}\`);
    return item ? JSON.parse(item) : null;
  }
};

// lib/storage/draftService.ts - AFTER (Dataverse)
import { createCrudService } from "../dataverse";

export const createDraftService = (context: ComponentFramework.Context<IInputs>) => {
  const crud = createCrudService(context);
  
  return {
    save: async (id: string, data: Questionnaire) => {
      const record = {
        ctna_name: data.name,
        ctna_status: 1, // Draft
        ctna_definition: JSON.stringify(data),
        ctna_version: data.version,
      };
      
      if (id) {
        return await crud.update("ctna_questionnaire", id, record);
      } else {
        return await crud.create("ctna_questionnaire", record);
      }
    },
    
    load: async (id: string) => {
      const result = await crud.retrieve<{ ctna_definition: string }>(
        "ctna_questionnaire", 
        id, 
        ["ctna_definition"]
      );
      
      if (result.success && result.data.ctna_definition) {
        return JSON.parse(result.data.ctna_definition);
      }
      return null;
    },
    
    list: async () => {
      const result = await createQueryService(context).retrieveMultiple<{
        ctna_questionnaireid: string;
        ctna_name: string;
        ctna_status: number;
        modifiedon: string;
      }>("ctna_questionnaire", {
        select: ["ctna_questionnaireid", "ctna_name", "ctna_status", "modifiedon"],
        filter: "ctna_status eq 1", // Drafts only
        orderBy: "modifiedon desc",
      });
      
      return result.success ? result.data : [];
    }
  };
};`}
                language="typescript"
              />
            </div>
          </Card>

          {/* Step 6: Create PCF Entry Point */}
          <Card className={styles.stepCard}>
            <div className={styles.stepHeader}>
              <div className={styles.stepNumber}>6</div>
              <Title3>Create PCF Control Entry Point</Title3>
            </div>
            <Body1>
              Set up the main PCF control class that initializes services and renders the React app.
            </Body1>
            <div className={styles.codeContainer}>
              <CodeBlock
                code={`// index.ts - PCF Control Entry Point (at project root, next to src/)
import { IInputs, IOutputs } from "./generated/ManifestTypes";
import * as React from "react";
import { createCrudService, createQueryService } from "./src/lib/dataverse/pcf";
import { NavigationProvider } from "./src/lib/navigation/NavigationContext";
import { FluentThemeProvider } from "./src/components/fluent";
import { DataverseProvider } from "./src/lib/dataverse/pcf/DataverseContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./src/App";

// PCF-safe QueryClient configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: { gcTime: 0, staleTime: 0, retry: false, refetchOnWindowFocus: false },
    mutations: { retry: false },
  },
});

export class QuestionnaireStudio implements ComponentFramework.ReactControl<IInputs, IOutputs> {
  private context: ComponentFramework.Context<IInputs>;
  private notifyOutputChanged: () => void;

  public init(
    context: ComponentFramework.Context<IInputs>,
    notifyOutputChanged: () => void,
    state: ComponentFramework.Dictionary
  ): void {
    this.context = context;
    this.notifyOutputChanged = notifyOutputChanged;
    
    // Request full-screen mode for complex UI
    context.mode.trackContainerResize(true);
  }

  public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {
    this.context = context;
    
    return React.createElement(
      QueryClientProvider,
      { client: queryClient },
      React.createElement(
        FluentThemeProvider,
        null,
        React.createElement(
          DataverseProvider,
          { context: this.context },
          React.createElement(
            NavigationProvider,
            null,
            React.createElement(App, { context: this.context })
          )
        )
      )
    );
  }

  public getOutputs(): IOutputs {
    return {};
  }

  public destroy(): void {
    // Critical cleanup for PCF lifecycle
    queryClient.clear();
  }
}`}
                language="typescript"
              />
            </div>
          </Card>

          {/* Step 7: Update Manifest */}
          <Card className={styles.stepCard}>
            <div className={styles.stepHeader}>
              <div className={styles.stepNumber}>7</div>
              <Title3>Configure PCF Manifest</Title3>
            </div>
            <Body1>
              Update <code>ControlManifest.Input.xml</code> with required resources and properties.
            </Body1>
            <div className={styles.codeContainer}>
              <CodeBlock
                code={`<?xml version="1.0" encoding="utf-8" ?>
<manifest>
  <control namespace="CTNAQuestionnaire" 
           constructor="QuestionnaireStudio" 
           version="1.0.0" 
           display-name-key="Questionnaire Studio"
           description-key="CTNA Questionnaire Builder and Executor"
           control-type="virtual"
           api-version="1.3.0">
    
    <!-- Input Properties -->
    <property name="questionnaireId" 
              display-name-key="Questionnaire ID" 
              description-key="ID of questionnaire to load"
              of-type="SingleLine.Text" 
              usage="bound" 
              required="false" />
    
    <property name="mode" 
              display-name-key="Mode" 
              description-key="builder or executor"
              of-type="Enum"
              usage="input"
              required="false"
              default-value="builder">
      <value name="builder" display-name-key="Builder">builder</value>
      <value name="executor" display-name-key="Executor">executor</value>
    </property>

    <!-- Resources -->
    <resources>
      <code path="index.ts" order="1" />
      <css path="css/QuestionnaireStudio.css" order="1" />
      <resx path="strings/QuestionnaireStudio.1033.resx" version="1.0.0" />
    </resources>
    
    <!-- Feature Usage -->
    <feature-usage>
      <uses-feature name="WebAPI" required="true" />
      <uses-feature name="Utility" required="true" />
      <uses-feature name="Device" required="false" />
    </feature-usage>
  </control>
</manifest>`}
                language="xml"
              />
            </div>
          </Card>

          {/* Step 8: Convert CSS */}
          <Card className={styles.stepCard}>
            <div className={styles.stepHeader}>
              <div className={styles.stepNumber}>8</div>
              <Title3>Convert Tailwind to CSS</Title3>
            </div>
            <Body1>
              PCF doesn't support Tailwind. Convert <code>index.css</code> to standard CSS or use Fluent UI's <code>makeStyles</code>.
            </Body1>
            <div className={styles.codeContainer}>
              <CodeBlock
                code={`/* css/QuestionnaireStudio.css */

/* Convert Tailwind tokens to CSS custom properties */
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 221.2 83.2% 53.3%;
  --primary-foreground: 210 40% 98%;
  --secondary: 210 40% 96.1%;
  --muted: 210 40% 96.1%;
  --accent: 210 40% 96.1%;
  --destructive: 0 84.2% 60.2%;
  --border: 214.3 31.8% 91.4%;
  --radius: 0.5rem;
}

/* Base styles */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: var(--font-sans, system-ui, sans-serif);
  background-color: hsl(var(--background));
  color: hsl(var(--foreground));
}

/* Utility classes (if needed) */
.flex { display: flex; }
.flex-col { flex-direction: column; }
.items-center { align-items: center; }
.justify-between { justify-content: space-between; }
.gap-2 { gap: 0.5rem; }
.gap-4 { gap: 1rem; }
.p-4 { padding: 1rem; }
.w-full { width: 100%; }
.h-full { height: 100%; }

/* Prefer Fluent UI makeStyles for component-level styling */`}
                language="css"
              />
            </div>
            <div className={styles.warningBox}>
              <Warning24Regular />
              <Body1>
                <b>Recommended:</b> Use Fluent UI's <code>makeStyles</code> hook for component styling.
                It's already used throughout this codebase and is PCF-native.
              </Body1>
            </div>
          </Card>

          {/* Step 9: Build and Test */}
          <Card className={styles.stepCard}>
            <div className={styles.stepHeader}>
              <div className={styles.stepNumber}>9</div>
              <Title3>Build, Test, and Deploy</Title3>
            </div>
            <Body1>
              Build your PCF control and test it locally before deploying.
            </Body1>
            <div className={styles.codeContainer}>
              <CodeBlock
                code={`# Build the control
npm run build

# Start local test harness
npm start watch

# ──────────────────────────────────────
# Create Solution for Deployment
# ──────────────────────────────────────

# Navigate to parent directory
cd ..

# Create solution project
pac solution init --publisher-name CTNAPublisher --publisher-prefix ctna

# Add PCF control reference
pac solution add-reference --path ./QuestionnaireStudio

# Build solution (requires msbuild or dotnet)
dotnet build --configuration Release

# ──────────────────────────────────────
# Deploy to Environment
# ──────────────────────────────────────

# Authenticate to your environment
pac auth create --environment https://yourorg.crm.dynamics.com

# Push control directly (for development)
pac pcf push --publisher-prefix ctna

# Or import the solution
pac solution import --path ./bin/Release/CTNASolution.zip`}
                language="bash"
              />
            </div>
          </Card>

          {/* Migration Checklist */}
          <Accordion collapsible defaultOpenItems={["checklist"]}>
            <AccordionItem value="checklist">
              <AccordionHeader icon={<Checkmark24Regular />}>
                Complete Migration Checklist
              </AccordionHeader>
              <AccordionPanel className={styles.accordionPanel}>
                <Title3>📁 File Structure</Title3>
                <div className={styles.checklistItem}>
                  <Circle24Regular /> All source files copied to PCF project structure
                </div>
                <div className={styles.checklistItem}>
                  <Circle24Regular /> Barrel exports (index.ts) updated for new paths
                </div>
                <div className={styles.checklistItem}>
                  <Circle24Regular /> ControlManifest.Input.xml configured
                </div>

                <Title3 style={{ marginTop: tokens.spacingVerticalL }}>🔗 Imports & Dependencies</Title3>
                <div className={styles.checklistItem}>
                  <Circle24Regular /> All imports use relative paths (no <code>@/</code> aliases)
                </div>
                <div className={styles.checklistItem}>
                  <Circle24Regular /> All npm dependencies installed in PCF project
                </div>
                <div className={styles.checklistItem}>
                  <Circle24Regular /> No Node.js-only packages (glob, fs, path)
                </div>

                <Title3 style={{ marginTop: tokens.spacingVerticalL }}>🚫 Forbidden APIs</Title3>
                <div className={styles.checklistItem}>
                  <Circle24Regular /> No <code>Xrm.*</code> or <code>formContext</code> usage
                </div>
                <div className={styles.checklistItem}>
                  <Circle24Regular /> No <code>window.fetch</code> for Dataverse calls
                </div>
                <div className={styles.checklistItem}>
                  <Circle24Regular /> No <code>localStorage</code> / <code>sessionStorage</code> (use Dataverse)
                </div>
                <div className={styles.checklistItem}>
                  <Circle24Regular /> No <code>eval()</code> or <code>new Function()</code>
                </div>

                <Title3 style={{ marginTop: tokens.spacingVerticalL }}>✅ PCF Patterns</Title3>
                <div className={styles.checklistItem}>
                  <Circle24Regular /> All Dataverse calls use <code>context.webAPI</code>
                </div>
                <div className={styles.checklistItem}>
                  <Circle24Regular /> Error handling uses Result pattern (no throws)
                </div>
                <div className={styles.checklistItem}>
                  <Circle24Regular /> State navigation instead of URL routing
                </div>
                <div className={styles.checklistItem}>
                  <Circle24Regular /> QueryClient cleanup in <code>destroy()</code> method
                </div>
                <div className={styles.checklistItem}>
                  <Circle24Regular /> Logger configured for production (WARN/ERROR only)
                </div>

                <Title3 style={{ marginTop: tokens.spacingVerticalL }}>🎨 Styling</Title3>
                <div className={styles.checklistItem}>
                  <Circle24Regular /> Tailwind utilities converted to CSS or makeStyles
                </div>
                <div className={styles.checklistItem}>
                  <Circle24Regular /> CSS custom properties defined in global stylesheet
                </div>
                <div className={styles.checklistItem}>
                  <Circle24Regular /> Fluent UI theme provider configured
                </div>

                <Title3 style={{ marginTop: tokens.spacingVerticalL }}>🧪 Testing & Deployment</Title3>
                <div className={styles.checklistItem}>
                  <Circle24Regular /> Control builds without errors
                </div>
                <div className={styles.checklistItem}>
                  <Circle24Regular /> Tested in PCF test harness
                </div>
                <div className={styles.checklistItem}>
                  <Circle24Regular /> Tested in actual Dynamics 365 environment
                </div>
                <div className={styles.checklistItem}>
                  <Circle24Regular /> Solution packaged and imported
                </div>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem value="dataverse-schema">
              <AccordionHeader icon={<Database24Regular />}>
                Dataverse Entity Schema
              </AccordionHeader>
              <AccordionPanel className={styles.accordionPanel}>
                <Body1>
                  Create these tables in your Dataverse environment to persist questionnaires:
                </Body1>
                <div className={styles.codeContainer}>
                  <CodeBlock
                    code={`// ctna_questionnaire entity schema
{
  "LogicalName": "ctna_questionnaire",
  "DisplayName": "Questionnaire",
  "Attributes": [
    { "LogicalName": "ctna_questionnaireid", "Type": "Uniqueidentifier", "IsPrimaryId": true },
    { "LogicalName": "ctna_name", "Type": "String", "MaxLength": 200, "IsPrimaryName": true },
    { "LogicalName": "ctna_description", "Type": "Memo", "MaxLength": 4000 },
    { "LogicalName": "ctna_status", "Type": "Picklist", "Options": [
      { "Value": 1, "Label": "Draft" },
      { "Value": 2, "Label": "Published" },
      { "Value": 3, "Label": "Archived" }
    ]},
    { "LogicalName": "ctna_version", "Type": "String", "MaxLength": 20 },
    { "LogicalName": "ctna_schemaversion", "Type": "String", "MaxLength": 10 },
    { "LogicalName": "ctna_definition", "Type": "Memo", "MaxLength": 1048576 }
  ]
}

// ctna_questionnaireresponse entity schema
{
  "LogicalName": "ctna_questionnaireresponse",
  "DisplayName": "Questionnaire Response",
  "Attributes": [
    { "LogicalName": "ctna_questionnaireresponseid", "Type": "Uniqueidentifier", "IsPrimaryId": true },
    { "LogicalName": "ctna_name", "Type": "String", "MaxLength": 200, "IsPrimaryName": true },
    { "LogicalName": "ctna_questionnaireid", "Type": "Lookup", "Target": "ctna_questionnaire" },
    { "LogicalName": "ctna_respondent", "Type": "Lookup", "Target": "systemuser" },
    { "LogicalName": "ctna_submittedon", "Type": "DateTime" },
    { "LogicalName": "ctna_responses", "Type": "Memo", "MaxLength": 1048576 }
  ]
}`}
                    language="json"
                  />
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
                  If you see "Cannot find module" errors, verify all imports use relative paths
                  and barrel exports (index.ts) are correctly configured.
                </Body1>
                
                <Title3 style={{ marginTop: tokens.spacingVerticalL }}>
                  context.webAPI is undefined
                </Title3>
                <Body1>
                  The webAPI is only available in Dynamics 365. Use the PCF test harness or
                  implement mock services for local development.
                </Body1>

                <Title3 style={{ marginTop: tokens.spacingVerticalL }}>
                  Fluent UI Not Rendering
                </Title3>
                <Body1>
                  Ensure FluentThemeProvider wraps your entire component tree and that
                  @fluentui/react-components is properly installed.
                </Body1>

                <Title3 style={{ marginTop: tokens.spacingVerticalL }}>
                  Large Bundle Size
                </Title3>
                <Body1>
                  Use tree-shaking by importing specific components: 
                  <code>import {'{ Button }'} from "@fluentui/react-components"</code>
                  instead of importing the entire package.
                </Body1>

                <Title3 style={{ marginTop: tokens.spacingVerticalL }}>
                  React Hook Errors
                </Title3>
                <Body1>
                  Ensure only one version of React is installed. Check <code>package-lock.json</code>
                  for duplicate React versions.
                </Body1>

                <Title3 style={{ marginTop: tokens.spacingVerticalL }}>
                  Type Errors with ComponentFramework
                </Title3>
                <Body1>
                  Install PCF types: <code>npm install @types/powerapps-component-framework</code>
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
