import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardHeader,
  CardPreview,
  Badge,
  Divider,
  Text,
  makeStyles,
  tokens,
  shorthands,
} from "@fluentui/react-components";
import {
  ArrowLeft,
  FileText,
  Layers,
  HelpCircle,
  GitBranch,
  ListChecks,
  Zap,
  Settings,
  Eye,
  EyeOff,
  Lock,
  CheckCircle,
  Database,
  Filter,
  ArrowUpDown,
  Star,
  Calendar,
  Hash,
  Type,
  CircleDot,
  ToggleLeft,
  CheckSquare,
  Plus,
  MousePointer,
  ArrowRight,
  FolderTree,
  PanelLeft,
  Pencil,
  ChevronRight,
  LayoutGrid,
  Trash2,
  Info,
} from "lucide-react";

const useStyles = makeStyles({
  page: {
    minHeight: "100vh",
    backgroundColor: tokens.colorNeutralBackground1,
  },
  header: {
    position: "sticky",
    top: 0,
    zIndex: 50,
    borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
    backgroundColor: tokens.colorNeutralBackground1,
  },
  headerContent: {
    display: "flex",
    alignItems: "center",
    height: "56px",
    maxWidth: "1400px",
    marginInline: "auto",
    paddingInline: tokens.spacingHorizontalL,
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
  },
  container: {
    maxWidth: "1400px",
    marginInline: "auto",
    paddingBlock: tokens.spacingVerticalXXL,
    paddingInline: tokens.spacingHorizontalL,
  },
  layout: {
    display: "grid",
    gap: tokens.spacingHorizontalXXL,
    "@media (min-width: 1024px)": {
      gridTemplateColumns: "240px 1fr",
    },
  },
  sidebar: {
    display: "none",
    "@media (min-width: 1024px)": {
      display: "block",
    },
  },
  sidebarNav: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXS,
    paddingRight: tokens.spacingHorizontalM,
    maxHeight: "calc(100vh - 8rem)",
    overflowY: "auto",
  },
  navLink: {
    display: "block",
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
    paddingBlock: tokens.spacingVerticalXS,
    textDecoration: "none",
    "&:hover": {
      color: tokens.colorNeutralForeground1,
    },
  },
  main: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXXL,
  },
  card: {
    ...shorthands.padding(tokens.spacingVerticalL, tokens.spacingHorizontalL),
  },
  cardHeaderRow: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalM,
    marginBottom: tokens.spacingVerticalM,
  },
  iconBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "40px",
    height: "40px",
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: tokens.colorBrandBackground2,
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
  },
  grid2: {
    display: "grid",
    gap: tokens.spacingHorizontalM,
    "@media (min-width: 640px)": {
      gridTemplateColumns: "1fr 1fr",
    },
  },
  grid3: {
    display: "grid",
    gap: tokens.spacingHorizontalM,
    "@media (min-width: 640px)": {
      gridTemplateColumns: "1fr 1fr 1fr",
    },
  },
  featureBox: {
    ...shorthands.padding(tokens.spacingVerticalM),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    backgroundColor: tokens.colorNeutralBackground2,
  },
  stepCard: {
    display: "flex",
    gap: tokens.spacingHorizontalM,
    ...shorthands.padding(tokens.spacingVerticalM),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    border: `1px solid ${tokens.colorNeutralStroke1}`,
  },
  stepNumber: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
    fontWeight: tokens.fontWeightBold,
    fontSize: tokens.fontSizeBase200,
    flexShrink: 0,
  },
  badgeRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: tokens.spacingHorizontalS,
    alignItems: "center",
  },
  treeExample: {
    ...shorthands.padding(tokens.spacingVerticalM),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    backgroundColor: tokens.colorNeutralBackground3,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    fontFamily: "monospace",
    fontSize: tokens.fontSizeBase200,
  },
  treeNested: {
    marginLeft: tokens.spacingHorizontalL,
    borderLeft: `2px solid ${tokens.colorNeutralStroke2}`,
    paddingLeft: tokens.spacingHorizontalM,
    marginTop: tokens.spacingVerticalXS,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXS,
  },
  treeItem: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
  },
  tipBox: {
    ...shorthands.padding(tokens.spacingVerticalM),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    backgroundColor: tokens.colorNeutralBackground3,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
  },
  erdBox: {
    ...shorthands.padding(tokens.spacingVerticalL),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    backgroundColor: tokens.colorNeutralBackground3,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    overflowX: "auto",
  },
  erdEntity: {
    ...shorthands.padding(tokens.spacingVerticalM),
    ...shorthands.borderRadius(tokens.borderRadiusLarge),
    ...shorthands.borderWidth("2px"),
    ...shorthands.borderStyle("solid"),
    minWidth: "180px",
  },
  erdRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: tokens.spacingHorizontalM,
    fontSize: tokens.fontSizeBase100,
  },
  questionTypeCard: {
    ...shorthands.padding(tokens.spacingVerticalM),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    border: `1px solid ${tokens.colorNeutralStroke1}`,
  },
  iconList: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
  },
  iconListItem: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
  },
  codeBlock: {
    ...shorthands.padding(tokens.spacingVerticalM),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    backgroundColor: tokens.colorNeutralBackground4,
    fontFamily: "monospace",
    fontSize: tokens.fontSizeBase200,
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: tokens.fontSizeBase200,
    "& th": {
      textAlign: "left",
      ...shorthands.padding(tokens.spacingVerticalS, tokens.spacingHorizontalS),
      borderBottom: `2px solid ${tokens.colorNeutralStroke1}`,
      fontWeight: tokens.fontWeightSemibold,
    },
    "& td": {
      ...shorthands.padding(tokens.spacingVerticalS, tokens.spacingHorizontalS),
      borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    },
  },
});

const Documentation = () => {
  const styles = useStyles();

  const navLinks = [
    { href: "#overview", label: "Overview" },
    { href: "#getting-started", label: "Getting Started" },
    { href: "#workflow", label: "Workflow & Navigation" },
    { href: "#sidebar-tree", label: "Sidebar Tree View" },
    { href: "#structure", label: "Questionnaire Structure" },
    { href: "#erd", label: "Data Model (ERD)" },
    { href: "#adding-content", label: "Adding Questions & Branches" },
    { href: "#question-types", label: "Question Types" },
    { href: "#answer-sets", label: "Answer Sets" },
    { href: "#dynamic-values", label: "Dynamic Values" },
    { href: "#conditional-branching", label: "Conditional Branching" },
    { href: "#feature-comparison", label: "Feature Comparison" },
    { href: "#rules", label: "Rules & Logic" },
    { href: "#action-records", label: "Action Records" },
    { href: "#question-properties", label: "Question Properties" },
    { href: "#validation", label: "Validation & Required Fields" },
    { href: "#delete-confirmations", label: "Delete Confirmations" },
    { href: "#templates", label: "Templates & Drafts" },
    { href: "#preview", label: "Preview & Testing" },
    { href: "#troubleshooting", label: "Troubleshooting" },
    { href: "#glossary", label: "Glossary" },
  ];

  return (
    <div className={styles.page}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <Link to="/">
            <Button appearance="subtle" icon={<ArrowLeft className="h-4 w-4" />}>
              Back to Builder
            </Button>
          </Link>
          <div className={styles.headerTitle}>
            <Text weight="semibold" size={400}>Documentation</Text>
          </div>
          <div style={{ width: "96px" }} />
        </div>
      </header>

      <div className={styles.container}>
        <div className={styles.layout}>
          {/* Sidebar Navigation */}
          <aside className={styles.sidebar}>
            <nav className={styles.sidebarNav}>
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} className={styles.navLink}>
                  {link.label}
                </a>
              ))}
            </nav>
          </aside>

          {/* Main Content */}
          <main className={styles.main}>
            {/* Overview */}
            <section id="overview">
              <Card className={styles.card}>
                <div className={styles.cardHeaderRow}>
                  <div className={styles.iconBox}>
                    <FileText className="h-6 w-6" style={{ color: tokens.colorBrandForeground1 }} />
                  </div>
                  <div>
                    <Text weight="semibold" size={500}>Questionnaire Builder</Text>
                    <Text block size={200} style={{ color: tokens.colorNeutralForeground3 }}>
                      A comprehensive tool for creating dynamic, interactive questionnaires
                    </Text>
                  </div>
                </div>
                <div className={styles.cardContent}>
                  <Text style={{ color: tokens.colorNeutralForeground2 }}>
                    The Questionnaire Builder is a powerful visual tool designed for creating complex, 
                    multi-page questionnaires with advanced conditional logic. It supports nested branching, 
                    dynamic answer sets, and automated action records for ITSM workflows.
                  </Text>
                  <div className={styles.grid3}>
                    <div className={styles.featureBox}>
                      <Text weight="semibold" block>Visual Builder</Text>
                      <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>
                        Hierarchical tree navigation with click-to-select editing
                      </Text>
                    </div>
                    <div className={styles.featureBox}>
                      <Text weight="semibold" block>Conditional Logic</Text>
                      <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>
                        Complex AND/OR rules with nested branches
                      </Text>
                    </div>
                    <div className={styles.featureBox}>
                      <Text weight="semibold" block>ITSM Integration</Text>
                      <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>
                        Built-in support for operation categories and impact levels
                      </Text>
                    </div>
                  </div>
                </div>
              </Card>
            </section>

            {/* Getting Started */}
            <section id="getting-started">
              <Card className={styles.card}>
                <div className={styles.cardHeaderRow}>
                  <div className={styles.iconBox}>
                    <ArrowRight className="h-6 w-6" style={{ color: tokens.colorBrandForeground1 }} />
                  </div>
                  <Text weight="semibold" size={500}>Getting Started</Text>
                </div>
                <div className={styles.cardContent}>
                  <Text style={{ color: tokens.colorNeutralForeground2 }}>
                    Follow these steps to create your first questionnaire from scratch:
                  </Text>
                  
                  <div style={{ display: "flex", flexDirection: "column", gap: tokens.spacingVerticalM }}>
                    {[
                      { num: "1", title: 'Click "Create New" on the Home Screen', desc: "This opens a blank questionnaire with one default page. Alternatively, select an existing template to start with pre-built content." },
                      { num: "2", title: "Fill in Questionnaire Details", desc: 'Expand the "Questionnaire Details" section in the sidebar to set the name, description, service catalog, and status.' },
                      { num: "3", title: "Add Sections to Your Page", desc: 'Click "Add Section" in the main workspace to create content containers. Sections help organize questions by topic.' },
                      { num: "4", title: "Add Questions to Sections", desc: 'Click "Add Question" within a section card. Configure the question text, type, and answer options in the editor that appears.' },
                      { num: "5", title: "Save Your Work", desc: 'Click "Save as Draft" to store your questionnaire locally. You can return and edit it anytime from the Saved Drafts section.' },
                    ].map((step) => (
                      <div key={step.num} className={styles.stepCard}>
                        <div className={styles.stepNumber}>{step.num}</div>
                        <div>
                          <Text weight="semibold" block>{step.title}</Text>
                          <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>{step.desc}</Text>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </section>

            {/* Workflow & Navigation */}
            <section id="workflow">
              <Card className={styles.card}>
                <div className={styles.cardHeaderRow}>
                  <div className={styles.iconBox}>
                    <LayoutGrid className="h-6 w-6" style={{ color: tokens.colorBrandForeground1 }} />
                  </div>
                  <Text weight="semibold" size={500}>Workflow & Navigation</Text>
                </div>
                <div className={styles.cardContent}>
                  <Text style={{ color: tokens.colorNeutralForeground2 }}>
                    The builder uses a 30/70 split layout with the sidebar on the left and the main workspace on the right.
                  </Text>
                  
                  <div className={styles.grid2}>
                    <div className={styles.featureBox}>
                      <div className={styles.treeItem} style={{ marginBottom: tokens.spacingVerticalS }}>
                        <PanelLeft className="h-5 w-5" style={{ color: tokens.colorBrandForeground1 }} />
                        <Text weight="semibold">Left Sidebar (30%)</Text>
                      </div>
                      <div className={styles.iconList}>
                        <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>• Collapsible Questionnaire Details form</Text>
                        <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>• Interactive tree view of all pages, sections, questions, and branches</Text>
                        <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>• Click any item to select and edit it</Text>
                        <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>• Reset button to return to home screen</Text>
                      </div>
                    </div>
                    
                    <div className={styles.featureBox}>
                      <div className={styles.treeItem} style={{ marginBottom: tokens.spacingVerticalS }}>
                        <LayoutGrid className="h-5 w-5" style={{ color: tokens.colorBrandForeground1 }} />
                        <Text weight="semibold">Main Workspace (70%)</Text>
                      </div>
                      <div className={styles.iconList}>
                        <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>• Page tabs at the top for navigation</Text>
                        <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>• Section cards with inline hierarchy preview</Text>
                        <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>• Full Question/Branch editors when selected</Text>
                        <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>• Add Section button for creating new containers</Text>
                      </div>
                    </div>
                  </div>
                  
                  <Divider />
                  
                  <div>
                    <Text weight="semibold" block style={{ marginBottom: tokens.spacingVerticalS }}>Page Navigation</Text>
                    <Text size={200} block style={{ color: tokens.colorNeutralForeground3, marginBottom: tokens.spacingVerticalS }}>
                      Use the page tabs in the header area to switch between pages. Each tab shows the page name with options to:
                    </Text>
                    <div className={styles.badgeRow}>
                      <Badge appearance="outline">Click to select page</Badge>
                      <Badge appearance="outline">Double-click to rename</Badge>
                      <Badge appearance="outline">X button to delete</Badge>
                      <Badge appearance="outline">+ button to add new page</Badge>
                    </div>
                  </div>
                  
                  <Divider />
                  
                  <div>
                    <Text weight="semibold" block style={{ marginBottom: tokens.spacingVerticalS }}>Selection Flow</Text>
                    <div className={styles.badgeRow}>
                      <Badge appearance="tint">Click Page Tab</Badge>
                      <ChevronRight className="h-4 w-4" style={{ color: tokens.colorNeutralForeground3 }} />
                      <Badge appearance="tint">Click Section in Tree</Badge>
                      <ChevronRight className="h-4 w-4" style={{ color: tokens.colorNeutralForeground3 }} />
                      <Badge appearance="tint">Click Question/Branch</Badge>
                      <ChevronRight className="h-4 w-4" style={{ color: tokens.colorNeutralForeground3 }} />
                      <Badge appearance="tint">Editor Opens</Badge>
                    </div>
                    <Text size={200} block style={{ color: tokens.colorNeutralForeground3, marginTop: tokens.spacingVerticalS }}>
                      Selected items are highlighted in both the sidebar tree and section preview. The corresponding editor appears in the main workspace.
                    </Text>
                  </div>
                </div>
              </Card>
            </section>

            {/* Sidebar Tree View */}
            <section id="sidebar-tree">
              <Card className={styles.card}>
                <div className={styles.cardHeaderRow}>
                  <div className={styles.iconBox}>
                    <FolderTree className="h-6 w-6" style={{ color: tokens.colorBrandForeground1 }} />
                  </div>
                  <Text weight="semibold" size={500}>Sidebar Tree View</Text>
                </div>
                <div className={styles.cardContent}>
                  <Text style={{ color: tokens.colorNeutralForeground2 }}>
                    The sidebar displays your entire questionnaire as an interactive hierarchical tree with visual connector lines.
                  </Text>
                  
                  <div className={styles.treeExample}>
                    <div>📄 Page 1: Initial Assessment</div>
                    <div className={styles.treeNested}>
                      <div style={{ color: tokens.colorNeutralForeground3 }}>📁 Section: Contact Information</div>
                      <div className={styles.treeNested}>
                        <div className={styles.treeItem}>
                          <HelpCircle className="h-3 w-3" />
                          <span>What is your department?</span>
                        </div>
                        <div className={styles.treeItem}>
                          <HelpCircle className="h-3 w-3" />
                          <span>Preferred contact method?</span>
                          <Zap className="h-3 w-3" style={{ color: "#eab308" }} />
                        </div>
                      </div>
                      <div style={{ color: tokens.colorNeutralForeground3 }}>📁 Section: Issue Details</div>
                      <div className={styles.treeNested}>
                        <div className={styles.treeItem}>
                          <HelpCircle className="h-3 w-3" />
                          <span>What type of issue?</span>
                        </div>
                        <div className={styles.treeItem} style={{ color: tokens.colorNeutralForeground3 }}>
                          <GitBranch className="h-3 w-3" />
                          <span>Hardware Issues Branch</span>
                        </div>
                        <div className={styles.treeNested}>
                          <div className={styles.treeItem}>
                            <HelpCircle className="h-3 w-3" />
                            <span>What hardware is affected?</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className={styles.grid2}>
                    <div className={styles.featureBox}>
                      <Text weight="semibold" block style={{ marginBottom: tokens.spacingVerticalS }}>Tree Icons</Text>
                      <div className={styles.iconList}>
                        <div className={styles.iconListItem}>
                          <HelpCircle className="h-4 w-4" />
                          <span>Question item</span>
                        </div>
                        <div className={styles.iconListItem}>
                          <GitBranch className="h-4 w-4" />
                          <span>Conditional branch</span>
                        </div>
                        <div className={styles.iconListItem}>
                          <Zap className="h-4 w-4" style={{ color: "#eab308" }} />
                          <span>Has Action Record attached</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className={styles.featureBox}>
                      <Text weight="semibold" block style={{ marginBottom: tokens.spacingVerticalS }}>Interactions</Text>
                      <div className={styles.iconList}>
                        <div className={styles.iconListItem}>
                          <MousePointer className="h-4 w-4" />
                          <span>Click to select and open editor</span>
                        </div>
                        <div className={styles.iconListItem}>
                          <Eye className="h-4 w-4" />
                          <span>Selected items are highlighted</span>
                        </div>
                        <div className={styles.iconListItem}>
                          <ChevronRight className="h-4 w-4" />
                          <span>Nested items show parent lines</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className={styles.tipBox}>
                    <Text weight="semibold" block style={{ marginBottom: tokens.spacingVerticalXS }}>💡 Visual Connector Lines</Text>
                    <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>
                      CSS-based tree lines connect parent and child items, making the hierarchy easy to understand. 
                      Deeper nesting levels show progressively lighter connector lines to maintain visual clarity.
                    </Text>
                  </div>
                </div>
              </Card>
            </section>

            {/* Structure */}
            <section id="structure">
              <Card className={styles.card}>
                <div className={styles.cardHeaderRow}>
                  <div className={styles.iconBox}>
                    <Layers className="h-6 w-6" style={{ color: tokens.colorBrandForeground1 }} />
                  </div>
                  <Text weight="semibold" size={500}>Questionnaire Structure</Text>
                </div>
                <div className={styles.cardContent}>
                  <Text style={{ color: tokens.colorNeutralForeground2 }}>
                    Questionnaires follow a hierarchical structure that organizes content into manageable units:
                  </Text>
                  
                  <div style={{ display: "flex", flexDirection: "column", gap: tokens.spacingVerticalM }}>
                    {[
                      { level: "Level 1", title: "Pages", desc: "Top-level containers that group related sections. Use page tabs in the header to navigate between pages. Each page can contain multiple sections." },
                      { level: "Level 2", title: "Sections", desc: "Collapsible cards within pages that organize questions by topic or category. Sections can contain both questions and conditional branches." },
                      { level: "Level 3", title: "Questions & Branches", desc: "The actual content of your questionnaire. Questions collect user input while conditional branches create dynamic paths based on previous answers." },
                    ].map((item) => (
                      <div key={item.level} className={styles.stepCard}>
                        <Badge appearance="outline" style={{ marginTop: "2px" }}>{item.level}</Badge>
                        <div>
                          <Text weight="semibold" block>{item.title}</Text>
                          <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>{item.desc}</Text>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className={styles.tipBox}>
                    <Text weight="semibold" block style={{ marginBottom: tokens.spacingVerticalXS }}>💡 Sidebar Navigation</Text>
                    <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>
                      The sidebar displays the complete questionnaire hierarchy as an interactive tree. 
                      Click any item to select it for editing. Visual connector lines show the parent-child relationships.
                    </Text>
                  </div>
                </div>
              </Card>
            </section>

            {/* Question Types */}
            <section id="question-types">
              <Card className={styles.card}>
                <div className={styles.cardHeaderRow}>
                  <div className={styles.iconBox}>
                    <HelpCircle className="h-6 w-6" style={{ color: tokens.colorBrandForeground1 }} />
                  </div>
                  <Text weight="semibold" size={500}>Question Types</Text>
                </div>
                <div className={styles.cardContent}>
                  <Text style={{ color: tokens.colorNeutralForeground2 }}>
                    The builder supports various question types to capture different kinds of user input:
                  </Text>
                  
                  <div className={styles.grid2}>
                    {[
                      { icon: <Type className="h-5 w-5" />, name: "Text", desc: "Single-line or multi-line text input" },
                      { icon: <Hash className="h-5 w-5" />, name: "Number", desc: "Numeric input with optional validation" },
                      { icon: <Calendar className="h-5 w-5" />, name: "Date", desc: "Date picker for date selection" },
                      { icon: <CircleDot className="h-5 w-5" />, name: "Radio", desc: "Single selection from options" },
                      { icon: <CheckSquare className="h-5 w-5" />, name: "Checkbox", desc: "Multiple selection from options" },
                      { icon: <ToggleLeft className="h-5 w-5" />, name: "Toggle", desc: "Yes/No or On/Off switch" },
                      { icon: <Star className="h-5 w-5" />, name: "Rating", desc: "Star rating input" },
                      { icon: <ListChecks className="h-5 w-5" />, name: "Dropdown", desc: "Select from a dropdown list" },
                    ].map((type) => (
                      <div key={type.name} className={styles.questionTypeCard}>
                        <div className={styles.treeItem} style={{ marginBottom: tokens.spacingVerticalXS }}>
                          <span style={{ color: tokens.colorBrandForeground1 }}>{type.icon}</span>
                          <Text weight="semibold">{type.name}</Text>
                        </div>
                        <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>{type.desc}</Text>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </section>

            {/* Answer Sets */}
            <section id="answer-sets">
              <Card className={styles.card}>
                <div className={styles.cardHeaderRow}>
                  <div className={styles.iconBox}>
                    <ListChecks className="h-6 w-6" style={{ color: tokens.colorBrandForeground1 }} />
                  </div>
                  <Text weight="semibold" size={500}>Answer Sets</Text>
                </div>
                <div className={styles.cardContent}>
                  <Text style={{ color: tokens.colorNeutralForeground2 }}>
                    Answer sets define the available options for choice-based questions (Radio, Checkbox, Dropdown). 
                    You can create inline options or reference shared answer sets for consistency.
                  </Text>
                  
                  <div className={styles.grid2}>
                    <div className={styles.featureBox}>
                      <Text weight="semibold" block style={{ marginBottom: tokens.spacingVerticalS }}>Inline Options</Text>
                      <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>
                        Define options directly within a question. Best for unique, question-specific choices.
                      </Text>
                    </div>
                    <div className={styles.featureBox}>
                      <Text weight="semibold" block style={{ marginBottom: tokens.spacingVerticalS }}>Shared Answer Sets</Text>
                      <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>
                        Reference predefined sets like "Priority Levels" or "Departments" for consistency across questions.
                      </Text>
                    </div>
                  </div>
                  
                  <div className={styles.tipBox}>
                    <Text weight="semibold" block style={{ marginBottom: tokens.spacingVerticalXS }}>💡 Dynamic Answer Sets</Text>
                    <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>
                      Some answer sets can be configured to fetch options dynamically from external data sources (like Dataverse tables) 
                      based on filters and sorting rules.
                    </Text>
                  </div>
                </div>
              </Card>
            </section>

            {/* Conditional Branching */}
            <section id="conditional-branching">
              <Card className={styles.card}>
                <div className={styles.cardHeaderRow}>
                  <div className={styles.iconBox}>
                    <GitBranch className="h-6 w-6" style={{ color: tokens.colorBrandForeground1 }} />
                  </div>
                  <Text weight="semibold" size={500}>Conditional Branching</Text>
                </div>
                <div className={styles.cardContent}>
                  <Text style={{ color: tokens.colorNeutralForeground2 }}>
                    Conditional branches allow you to show different questions based on previous answers. 
                    Branches can be nested to create complex decision trees.
                  </Text>
                  
                  <div className={styles.grid2}>
                    <div className={styles.featureBox}>
                      <Text weight="semibold" block style={{ marginBottom: tokens.spacingVerticalS }}>Branch Conditions</Text>
                      <div className={styles.iconList}>
                        <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>• Reference any previous question</Text>
                        <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>• Compare with specific values</Text>
                        <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>• Use operators: equals, contains, greater than, etc.</Text>
                        <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>• Combine with AND/OR logic</Text>
                      </div>
                    </div>
                    <div className={styles.featureBox}>
                      <Text weight="semibold" block style={{ marginBottom: tokens.spacingVerticalS }}>Nested Branches</Text>
                      <div className={styles.iconList}>
                        <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>• Branches can contain other branches</Text>
                        <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>• Create multi-level decision trees</Text>
                        <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>• Visual tree shows full hierarchy</Text>
                        <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>• Questions inherit parent branch visibility</Text>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </section>

            {/* Rules & Logic */}
            <section id="rules">
              <Card className={styles.card}>
                <div className={styles.cardHeaderRow}>
                  <div className={styles.iconBox}>
                    <Filter className="h-6 w-6" style={{ color: tokens.colorBrandForeground1 }} />
                  </div>
                  <Text weight="semibold" size={500}>Rules & Logic</Text>
                </div>
                <div className={styles.cardContent}>
                  <Text style={{ color: tokens.colorNeutralForeground2 }}>
                    Rules control when questions appear, what options are available, and what actions are triggered.
                  </Text>
                  
                  <div style={{ display: "flex", flexDirection: "column", gap: tokens.spacingVerticalM }}>
                    <div className={styles.featureBox}>
                      <Text weight="semibold" block style={{ marginBottom: tokens.spacingVerticalS }}>Visibility Rules</Text>
                      <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>
                        Control when a question is shown based on conditions. Questions can be hidden by default and revealed when conditions are met.
                      </Text>
                    </div>
                    <div className={styles.featureBox}>
                      <Text weight="semibold" block style={{ marginBottom: tokens.spacingVerticalS }}>Answer-Level Rules</Text>
                      <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>
                        Trigger specific actions when particular answers are selected. Each answer option can have its own set of rules and actions.
                      </Text>
                    </div>
                    <div className={styles.featureBox}>
                      <Text weight="semibold" block style={{ marginBottom: tokens.spacingVerticalS }}>Rule Groups</Text>
                      <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>
                        Combine multiple conditions with AND/OR operators. Nested groups allow for complex logic expressions.
                      </Text>
                    </div>
                  </div>
                </div>
              </Card>
            </section>

            {/* Action Records */}
            <section id="action-records">
              <Card className={styles.card}>
                <div className={styles.cardHeaderRow}>
                  <div className={styles.iconBox}>
                    <Zap className="h-6 w-6" style={{ color: tokens.colorBrandForeground1 }} />
                  </div>
                  <Text weight="semibold" size={500}>Action Records</Text>
                </div>
                <div className={styles.cardContent}>
                  <Text style={{ color: tokens.colorNeutralForeground2 }}>
                    Action records define automated tasks or ITSM tickets that should be created based on questionnaire responses.
                  </Text>
                  
                  <div className={styles.grid2}>
                    <div className={styles.featureBox}>
                      <Text weight="semibold" block style={{ marginBottom: tokens.spacingVerticalS }}>Record Types</Text>
                      <div className={styles.iconList}>
                        <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>• Incident tickets</Text>
                        <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>• Service requests</Text>
                        <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>• Change requests</Text>
                        <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>• Problem records</Text>
                      </div>
                    </div>
                    <div className={styles.featureBox}>
                      <Text weight="semibold" block style={{ marginBottom: tokens.spacingVerticalS }}>Configuration</Text>
                      <div className={styles.iconList}>
                        <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>• Set priority and impact</Text>
                        <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>• Assign categories</Text>
                        <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>• Define assignment rules</Text>
                        <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>• Map question answers to fields</Text>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </section>

            {/* Question Properties */}
            <section id="question-properties">
              <Card className={styles.card}>
                <div className={styles.cardHeaderRow}>
                  <div className={styles.iconBox}>
                    <Settings className="h-6 w-6" style={{ color: tokens.colorBrandForeground1 }} />
                  </div>
                  <Text weight="semibold" size={500}>Question Properties</Text>
                </div>
                <div className={styles.cardContent}>
                  <Text style={{ color: tokens.colorNeutralForeground2 }}>
                    Each question has configurable properties that control its behavior:
                  </Text>
                  
                  <div className={styles.grid2}>
                    <div className={styles.featureBox}>
                      <div className={styles.treeItem} style={{ marginBottom: tokens.spacingVerticalS }}>
                        <CheckCircle className="h-4 w-4" style={{ color: tokens.colorBrandForeground1 }} />
                        <Text weight="semibold">Required</Text>
                      </div>
                      <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>
                        Mark questions that must be answered before submission
                      </Text>
                    </div>
                    <div className={styles.featureBox}>
                      <div className={styles.treeItem} style={{ marginBottom: tokens.spacingVerticalS }}>
                        <Lock className="h-4 w-4" style={{ color: tokens.colorBrandForeground1 }} />
                        <Text weight="semibold">Read Only</Text>
                      </div>
                      <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>
                        Display information without allowing changes
                      </Text>
                    </div>
                    <div className={styles.featureBox}>
                      <div className={styles.treeItem} style={{ marginBottom: tokens.spacingVerticalS }}>
                        <EyeOff className="h-4 w-4" style={{ color: tokens.colorBrandForeground1 }} />
                        <Text weight="semibold">Hidden</Text>
                      </div>
                      <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>
                        Hide from view while retaining for data collection
                      </Text>
                    </div>
                    <div className={styles.featureBox}>
                      <div className={styles.treeItem} style={{ marginBottom: tokens.spacingVerticalS }}>
                        <ArrowUpDown className="h-4 w-4" style={{ color: tokens.colorBrandForeground1 }} />
                        <Text weight="semibold">Order</Text>
                      </div>
                      <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>
                        Control the display sequence within a section
                      </Text>
                    </div>
                  </div>
                </div>
              </Card>
            </section>

            {/* Validation */}
            <section id="validation">
              <Card className={styles.card}>
                <div className={styles.cardHeaderRow}>
                  <div className={styles.iconBox}>
                    <CheckCircle className="h-6 w-6" style={{ color: tokens.colorBrandForeground1 }} />
                  </div>
                  <Text weight="semibold" size={500}>Validation & Required Fields</Text>
                </div>
                <div className={styles.cardContent}>
                  <Text style={{ color: tokens.colorNeutralForeground2 }}>
                    The builder validates your questionnaire to ensure completeness and correctness.
                  </Text>
                  
                  <div className={styles.featureBox}>
                    <Text weight="semibold" block style={{ marginBottom: tokens.spacingVerticalS }}>Required Indicators</Text>
                    <div className={styles.iconList}>
                      <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>• Red asterisk (*) marks required fields</Text>
                      <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>• Empty required fields show validation errors</Text>
                      <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>• Questionnaire name is always required</Text>
                      <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>• Question text is required for all questions</Text>
                    </div>
                  </div>
                </div>
              </Card>
            </section>

            {/* Delete Confirmations */}
            <section id="delete-confirmations">
              <Card className={styles.card}>
                <div className={styles.cardHeaderRow}>
                  <div className={styles.iconBox}>
                    <Trash2 className="h-6 w-6" style={{ color: tokens.colorBrandForeground1 }} />
                  </div>
                  <Text weight="semibold" size={500}>Delete Confirmations</Text>
                </div>
                <div className={styles.cardContent}>
                  <Text style={{ color: tokens.colorNeutralForeground2 }}>
                    Deleting items requires confirmation to prevent accidental data loss.
                  </Text>
                  
                  <div className={styles.tipBox}>
                    <Text weight="semibold" block style={{ marginBottom: tokens.spacingVerticalXS }}>⚠️ Cascade Deletes</Text>
                    <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>
                      When you delete a section, all questions and branches within it are also deleted. 
                      When you delete a page, all sections (and their contents) are deleted.
                    </Text>
                  </div>
                </div>
              </Card>
            </section>

            {/* Templates & Drafts */}
            <section id="templates">
              <Card className={styles.card}>
                <div className={styles.cardHeaderRow}>
                  <div className={styles.iconBox}>
                    <FileText className="h-6 w-6" style={{ color: tokens.colorBrandForeground1 }} />
                  </div>
                  <Text weight="semibold" size={500}>Templates & Drafts</Text>
                </div>
                <div className={styles.cardContent}>
                  <Text style={{ color: tokens.colorNeutralForeground2 }}>
                    Save your work as drafts and create reusable templates for common questionnaire patterns.
                  </Text>
                  
                  <div className={styles.grid2}>
                    <div className={styles.featureBox}>
                      <Text weight="semibold" block style={{ marginBottom: tokens.spacingVerticalS }}>Drafts</Text>
                      <div className={styles.iconList}>
                        <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>• Auto-saved locally in browser</Text>
                        <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>• Resume editing anytime</Text>
                        <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>• Export as JSON for backup</Text>
                      </div>
                    </div>
                    <div className={styles.featureBox}>
                      <Text weight="semibold" block style={{ marginBottom: tokens.spacingVerticalS }}>Templates</Text>
                      <div className={styles.iconList}>
                        <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>• Pre-built starting points</Text>
                        <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>• ITSM-focused templates included</Text>
                        <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>• Clone and customize as needed</Text>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </section>

            {/* Preview & Testing */}
            <section id="preview">
              <Card className={styles.card}>
                <div className={styles.cardHeaderRow}>
                  <div className={styles.iconBox}>
                    <Eye className="h-6 w-6" style={{ color: tokens.colorBrandForeground1 }} />
                  </div>
                  <Text weight="semibold" size={500}>Preview & Testing</Text>
                </div>
                <div className={styles.cardContent}>
                  <Text style={{ color: tokens.colorNeutralForeground2 }}>
                    Test your questionnaire in preview mode to see how it will appear to end users.
                  </Text>
                  
                  <div className={styles.featureBox}>
                    <div className={styles.iconList}>
                      <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>• See questions as users will see them</Text>
                      <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>• Test conditional branching logic</Text>
                      <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>• Verify required field validation</Text>
                      <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>• Check answer set options display correctly</Text>
                    </div>
                  </div>
                </div>
              </Card>
            </section>

            {/* Troubleshooting */}
            <section id="troubleshooting">
              <Card className={styles.card}>
                <div className={styles.cardHeaderRow}>
                  <div className={styles.iconBox}>
                    <Info className="h-6 w-6" style={{ color: tokens.colorBrandForeground1 }} />
                  </div>
                  <Text weight="semibold" size={500}>Troubleshooting</Text>
                </div>
                <div className={styles.cardContent}>
                  <Text style={{ color: tokens.colorNeutralForeground2 }}>
                    Common issues and solutions when building questionnaires.
                  </Text>
                  
                  <div style={{ display: "flex", flexDirection: "column", gap: tokens.spacingVerticalM }}>
                    <div className={styles.featureBox}>
                      <Text weight="semibold" block style={{ marginBottom: tokens.spacingVerticalS }}>Branch conditions not working?</Text>
                      <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>
                        Ensure the referenced question appears before the branch in the questionnaire flow. 
                        Check that the condition value matches exactly (case-sensitive for text).
                      </Text>
                    </div>
                    <div className={styles.featureBox}>
                      <Text weight="semibold" block style={{ marginBottom: tokens.spacingVerticalS }}>Questions not appearing?</Text>
                      <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>
                        Check if the question is inside a conditional branch with unmet conditions. 
                        Also verify the question is not marked as hidden.
                      </Text>
                    </div>
                    <div className={styles.featureBox}>
                      <Text weight="semibold" block style={{ marginBottom: tokens.spacingVerticalS }}>Draft not saving?</Text>
                      <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>
                        Ensure you have a questionnaire name set. Check browser storage permissions. 
                        Try exporting as JSON as a backup.
                      </Text>
                    </div>
                  </div>
                </div>
              </Card>
            </section>

            {/* Glossary */}
            <section id="glossary">
              <Card className={styles.card}>
                <div className={styles.cardHeaderRow}>
                  <div className={styles.iconBox}>
                    <FileText className="h-6 w-6" style={{ color: tokens.colorBrandForeground1 }} />
                  </div>
                  <Text weight="semibold" size={500}>Glossary</Text>
                </div>
                <div className={styles.cardContent}>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th>Term</th>
                        <th>Definition</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><Text weight="semibold">Page</Text></td>
                        <td>Top-level container for organizing sections</td>
                      </tr>
                      <tr>
                        <td><Text weight="semibold">Section</Text></td>
                        <td>Collapsible group of related questions</td>
                      </tr>
                      <tr>
                        <td><Text weight="semibold">Question</Text></td>
                        <td>Individual input field for collecting user response</td>
                      </tr>
                      <tr>
                        <td><Text weight="semibold">Conditional Branch</Text></td>
                        <td>Container that shows/hides based on conditions</td>
                      </tr>
                      <tr>
                        <td><Text weight="semibold">Answer Set</Text></td>
                        <td>Collection of options for choice questions</td>
                      </tr>
                      <tr>
                        <td><Text weight="semibold">Rule Group</Text></td>
                        <td>Combined conditions using AND/OR logic</td>
                      </tr>
                      <tr>
                        <td><Text weight="semibold">Action Record</Text></td>
                        <td>ITSM ticket to be created based on answers</td>
                      </tr>
                      <tr>
                        <td><Text weight="semibold">Dynamic Value</Text></td>
                        <td>Value fetched from external data source</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Card>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Documentation;
