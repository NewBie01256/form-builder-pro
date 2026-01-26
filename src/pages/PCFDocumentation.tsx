import {
  makeStyles,
  tokens,
  Title1,
  Title2,
  Body1,
  Card,
  CardHeader,
  Badge,
  Button,
  Divider,
  Link,
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
} from "@fluentui/react-icons";
import { useNavigation } from "../lib/navigation";

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
  footer: {
    marginTop: tokens.spacingVerticalXXL,
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: tokens.spacingHorizontalL,
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
          <div style={{ 
            backgroundColor: tokens.colorNeutralBackground4, 
            padding: tokens.spacingVerticalM,
            borderRadius: tokens.borderRadiusMedium,
            fontFamily: "monospace",
            marginTop: tokens.spacingVerticalM,
          }}>
            {`import { 
  createCrudService,
  createQueryService,
  errorHandler,
  withRetry,
  withSafeExecution,
  handleError,
} from '@/lib/dataverse/pcf';`}
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
