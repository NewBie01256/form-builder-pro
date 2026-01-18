import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
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
} from "lucide-react";

const Documentation = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center px-4">
          <Link to="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Builder
            </Button>
          </Link>
          <div className="flex-1 text-center">
            <h1 className="text-lg font-semibold">Documentation</h1>
          </div>
          <div className="w-24" />
        </div>
      </header>

      <div className="container py-8 px-4">
        <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
          {/* Sidebar Navigation */}
          <aside className="hidden lg:block">
            <ScrollArea className="h-[calc(100vh-8rem)]">
              <nav className="space-y-2 pr-4">
                <a href="#overview" className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-1">
                  Overview
                </a>
                <a href="#structure" className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-1">
                  Questionnaire Structure
                </a>
                <a href="#question-types" className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-1">
                  Question Types
                </a>
                <a href="#answer-sets" className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-1">
                  Answer Sets
                </a>
                <a href="#dynamic-values" className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-1">
                  Dynamic Values
                </a>
                <a href="#conditional-branching" className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-1">
                  Conditional Branching
                </a>
                <a href="#rules" className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-1">
                  Rules & Logic
                </a>
                <a href="#action-records" className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-1">
                  Action Records
                </a>
                <a href="#question-properties" className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-1">
                  Question Properties
                </a>
                <a href="#templates" className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-1">
                  Templates & Drafts
                </a>
              </nav>
            </ScrollArea>
          </aside>

          {/* Main Content */}
          <main className="space-y-12">
            {/* Overview */}
            <section id="overview">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">Questionnaire Builder</CardTitle>
                      <CardDescription>
                        A comprehensive tool for creating dynamic, interactive questionnaires
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="prose prose-slate max-w-none">
                  <p className="text-muted-foreground leading-relaxed">
                    The Questionnaire Builder is a powerful visual tool designed for creating complex, 
                    multi-page questionnaires with advanced conditional logic. It supports nested branching, 
                    dynamic answer sets, and automated action records for ITSM workflows.
                  </p>
                  <div className="grid gap-4 sm:grid-cols-3 mt-6">
                    <div className="p-4 rounded-lg border bg-muted/30">
                      <div className="font-medium mb-1">Visual Builder</div>
                      <p className="text-sm text-muted-foreground">
                        Drag-and-drop interface for building questionnaires
                      </p>
                    </div>
                    <div className="p-4 rounded-lg border bg-muted/30">
                      <div className="font-medium mb-1">Conditional Logic</div>
                      <p className="text-sm text-muted-foreground">
                        Complex AND/OR rules with nested branches
                      </p>
                    </div>
                    <div className="p-4 rounded-lg border bg-muted/30">
                      <div className="font-medium mb-1">ITSM Integration</div>
                      <p className="text-sm text-muted-foreground">
                        Built-in support for operation categories and impact levels
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Structure */}
            <section id="structure">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Layers className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>Questionnaire Structure</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground">
                    Questionnaires follow a hierarchical structure that organizes content into manageable units:
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 p-4 rounded-lg border">
                      <Badge variant="outline" className="mt-0.5">Level 1</Badge>
                      <div>
                        <div className="font-semibold">Pages</div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Top-level containers that group related sections. Use page tabs in the header to navigate between pages.
                          Each page can contain multiple sections.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4 p-4 rounded-lg border">
                      <Badge variant="outline" className="mt-0.5">Level 2</Badge>
                      <div>
                        <div className="font-semibold">Sections</div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Collapsible cards within pages that organize questions by topic or category.
                          Sections can contain both questions and conditional branches.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4 p-4 rounded-lg border">
                      <Badge variant="outline" className="mt-0.5">Level 3</Badge>
                      <div>
                        <div className="font-semibold">Questions & Branches</div>
                        <p className="text-sm text-muted-foreground mt-1">
                          The actual content of your questionnaire. Questions collect user input while 
                          conditional branches create dynamic paths based on previous answers.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-muted/50 border">
                    <div className="text-sm font-medium mb-2">💡 Sidebar Navigation</div>
                    <p className="text-sm text-muted-foreground">
                      The sidebar displays the complete questionnaire hierarchy as an interactive tree. 
                      Click any item to select it for editing. Visual connector lines show the parent-child relationships.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Question Types */}
            <section id="question-types">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <HelpCircle className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>Question Types</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">
                    The builder supports multiple question types, each with specific configurations:
                  </p>
                  
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="p-4 rounded-lg border space-y-2">
                      <div className="flex items-center gap-2">
                        <ListChecks className="h-4 w-4 text-primary" />
                        <span className="font-medium">Choice (Dropdown)</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Single selection from a dropdown list. Ideal for long lists of options.
                      </p>
                    </div>
                    
                    <div className="p-4 rounded-lg border space-y-2">
                      <div className="flex items-center gap-2">
                        <CircleDot className="h-4 w-4 text-primary" />
                        <span className="font-medium">Radio Button</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Single selection with visible radio buttons. Best for 2-5 options.
                      </p>
                    </div>
                    
                    <div className="p-4 rounded-lg border space-y-2">
                      <div className="flex items-center gap-2">
                        <CheckSquare className="h-4 w-4 text-primary" />
                        <span className="font-medium">Multi-Select</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Allows selecting multiple answers from a list of checkboxes.
                      </p>
                    </div>
                    
                    <div className="p-4 rounded-lg border space-y-2">
                      <div className="flex items-center gap-2">
                        <Type className="h-4 w-4 text-primary" />
                        <span className="font-medium">Text</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Free-form text input. Supports single-line and multi-line responses.
                      </p>
                    </div>
                    
                    <div className="p-4 rounded-lg border space-y-2">
                      <div className="flex items-center gap-2">
                        <Hash className="h-4 w-4 text-primary" />
                        <span className="font-medium">Number</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Numeric input with optional min/max values and step configuration.
                      </p>
                    </div>
                    
                    <div className="p-4 rounded-lg border space-y-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span className="font-medium">Date</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Date picker with optional min/max date constraints.
                      </p>
                    </div>
                    
                    <div className="p-4 rounded-lg border space-y-2">
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-primary" />
                        <span className="font-medium">Rating</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Scale-based rating with configurable min/max values and labels.
                      </p>
                    </div>
                    
                    <div className="p-4 rounded-lg border space-y-2">
                      <div className="flex items-center gap-2">
                        <ToggleLeft className="h-4 w-4 text-primary" />
                        <span className="font-medium">Boolean (Yes/No)</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Simple yes/no or true/false toggle question.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Answer Sets */}
            <section id="answer-sets">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <ListChecks className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>Answer Sets</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground">
                    Answer sets define the available options for choice-based questions. Each question can have 
                    multiple answer sets that can be conditionally displayed.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg border">
                      <div className="font-medium mb-2">Standard Answer Sets</div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Manually defined lists of answers with label and value pairs. You can:
                      </p>
                      <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                        <li>Add, edit, and remove individual answers</li>
                        <li>Set a default answer set for each question</li>
                        <li>Attach action records to specific answers</li>
                        <li>Use the Answer Set Picker to import from predefined libraries</li>
                      </ul>
                    </div>
                    
                    <div className="p-4 rounded-lg border">
                      <div className="font-medium mb-2">Inline Answer Sets</div>
                      <p className="text-sm text-muted-foreground">
                        Created within answer-level rule groups, these allow different answer options 
                        to appear based on conditions. Useful for showing context-specific choices.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Dynamic Values */}
            <section id="dynamic-values">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Database className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>Dynamic Values</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground">
                    Instead of static answer lists, you can populate answer sets dynamically from external data sources.
                  </p>
                  
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="p-4 rounded-lg border text-center">
                      <Database className="h-8 w-8 text-primary mx-auto mb-2" />
                      <div className="font-medium">Data Source</div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Select the table to fetch data from
                      </p>
                    </div>
                    
                    <div className="p-4 rounded-lg border text-center">
                      <Filter className="h-8 w-8 text-primary mx-auto mb-2" />
                      <div className="font-medium">Filters</div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Apply conditions to narrow results
                      </p>
                    </div>
                    
                    <div className="p-4 rounded-lg border text-center">
                      <ArrowUpDown className="h-8 w-8 text-primary mx-auto mb-2" />
                      <div className="font-medium">Sorting</div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Order results by any field
                      </p>
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-muted/50 border">
                    <div className="text-sm font-medium mb-2">Configuration Options</div>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                      <li><strong>Table Name:</strong> The data source table</li>
                      <li><strong>Label Field:</strong> Column to display as the answer label</li>
                      <li><strong>Value Field:</strong> Column to store as the answer value</li>
                      <li><strong>Filter Groups:</strong> AND/OR conditions to filter data</li>
                      <li><strong>Sort Order:</strong> Ascending or descending by chosen field</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Conditional Branching */}
            <section id="conditional-branching">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <GitBranch className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>Conditional Branching</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground">
                    Create dynamic questionnaire paths that adapt based on user responses. 
                    Branches can contain their own questions and nested sub-branches.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg border">
                      <div className="font-medium mb-2">Section-Level Branches</div>
                      <p className="text-sm text-muted-foreground">
                        Added directly to sections, these branches appear when their conditions are met.
                        Each branch has its own rule group that determines visibility.
                      </p>
                    </div>
                    
                    <div className="p-4 rounded-lg border">
                      <div className="font-medium mb-2">Nested Branches</div>
                      <p className="text-sm text-muted-foreground">
                        Branches can contain other branches, allowing for complex multi-level decision trees.
                        The sidebar tree displays all nesting levels clearly.
                      </p>
                    </div>
                    
                    <div className="p-4 rounded-lg border">
                      <div className="font-medium mb-2">Branch Editor Layout</div>
                      <p className="text-sm text-muted-foreground">
                        The branch editor uses a 20/80 split layout. The left panel shows the list of 
                        questions within the branch, while the right panel displays the full question editor.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Rules & Logic */}
            <section id="rules">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Settings className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>Rules & Logic</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground">
                    Define when questions appear and which answer sets to display using powerful rule systems.
                  </p>
                  
                  <Separator />
                  
                  <div>
                    <h4 className="font-semibold mb-3">Question-Level Rules</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Control question visibility with Show/Hide actions based on previous answers.
                    </p>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="p-3 rounded border bg-muted/30 text-sm">
                        <strong>Show When:</strong> Question appears only when conditions are met
                      </div>
                      <div className="p-3 rounded border bg-muted/30 text-sm">
                        <strong>Hide When:</strong> Question is hidden when conditions are met
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h4 className="font-semibold mb-3">Answer-Level Rules</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Dynamically change which answer set is displayed based on previous responses.
                      Each rule group can specify an inline answer set to use when conditions match.
                    </p>
                    <div className="p-4 rounded-lg bg-muted/50 border">
                      <div className="text-sm">
                        <strong>Constraint:</strong> Answer-level rules can only reference questions 
                        that appear <em>before</em> the current question in the questionnaire order.
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h4 className="font-semibold mb-3">Rule Groups</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Combine multiple conditions using logical operators:
                    </p>
                    <div className="flex gap-3">
                      <Badge variant="secondary" className="text-sm">AND - All conditions must match</Badge>
                      <Badge variant="secondary" className="text-sm">OR - Any condition can match</Badge>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h4 className="font-semibold mb-3">Available Operators</h4>
                    <div className="grid gap-2 sm:grid-cols-4 text-sm">
                      <div className="p-2 rounded border text-center">Equals</div>
                      <div className="p-2 rounded border text-center">Not Equals</div>
                      <div className="p-2 rounded border text-center">Greater Than</div>
                      <div className="p-2 rounded border text-center">Less Than</div>
                      <div className="p-2 rounded border text-center">Contains</div>
                      <div className="p-2 rounded border text-center">Not Contains</div>
                      <div className="p-2 rounded border text-center">Starts With</div>
                      <div className="p-2 rounded border text-center">Ends With</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Action Records */}
            <section id="action-records">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Zap className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>Action Records</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground">
                    Attach ITSM action records to specific answers to automate ticket categorization 
                    and routing based on user selections.
                  </p>
                  
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="p-4 rounded-lg border">
                      <div className="font-medium mb-3">Operation Categories</div>
                      <ul className="text-sm text-muted-foreground space-y-2">
                        <li className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">Tier 1</Badge>
                          <span>Primary category</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">Tier 2</Badge>
                          <span>Secondary category</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">Tier 3</Badge>
                          <span>Specific subcategory</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="p-4 rounded-lg border">
                      <div className="font-medium mb-3">Product Categories</div>
                      <ul className="text-sm text-muted-foreground space-y-2">
                        <li className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">Tier 1</Badge>
                          <span>Product family</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">Tier 2</Badge>
                          <span>Product line</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">Tier 3</Badge>
                          <span>Specific product</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="p-4 rounded-lg border">
                      <div className="font-medium mb-2">Impact Level</div>
                      <p className="text-sm text-muted-foreground">
                        Scale from 1-4 indicating business impact severity
                      </p>
                    </div>
                    
                    <div className="p-4 rounded-lg border">
                      <div className="font-medium mb-2">Urgency Level</div>
                      <p className="text-sm text-muted-foreground">
                        Scale from 1-4 indicating response time requirements
                      </p>
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-muted/50 border">
                    <div className="flex items-center gap-2 text-sm font-medium mb-2">
                      <Zap className="h-4 w-4 text-primary" />
                      Visual Indicator
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Questions with action records display a Zap icon in the sidebar tree, 
                      making it easy to identify which answers trigger ITSM actions.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Question Properties */}
            <section id="question-properties">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Settings className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>Question Properties</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground">
                    Configure individual question behavior with these property flags:
                  </p>
                  
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="p-4 rounded-lg border">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="h-5 w-5 text-primary" />
                        <span className="font-medium">Required</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        User must answer this question before proceeding. 
                        Validation prevents form submission without a response.
                      </p>
                    </div>
                    
                    <div className="p-4 rounded-lg border">
                      <div className="flex items-center gap-2 mb-2">
                        <Lock className="h-5 w-5 text-primary" />
                        <span className="font-medium">Read-only</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Question is visible but cannot be modified by the user. 
                        Useful for displaying pre-filled or calculated values.
                      </p>
                    </div>
                    
                    <div className="p-4 rounded-lg border">
                      <div className="flex items-center gap-2 mb-2">
                        <EyeOff className="h-5 w-5 text-primary" />
                        <span className="font-medium">Hidden</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Question is not displayed to end users but can store 
                        values for backend processing or conditional logic.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Templates & Drafts */}
            <section id="templates">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>Templates & Drafts</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground">
                    The home screen provides quick access to saved work and reusable templates.
                  </p>
                  
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="p-4 rounded-lg border">
                      <div className="font-medium mb-2">Saved Drafts</div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Work-in-progress questionnaires stored locally in your browser.
                      </p>
                      <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                        <li>Auto-saved as you work</li>
                        <li>Status badges (Draft/Active)</li>
                        <li>Edit or delete existing drafts</li>
                        <li>Metadata counts displayed on cards</li>
                      </ul>
                    </div>
                    
                    <div className="p-4 rounded-lg border">
                      <div className="font-medium mb-2">ITSM Templates</div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Pre-built questionnaire templates for common ITSM scenarios.
                      </p>
                      <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                        <li>Complex hierarchical structures</li>
                        <li>Pre-configured conditional branches</li>
                        <li>Ready-to-use answer sets</li>
                        <li>Action records already attached</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-muted/50 border">
                    <div className="text-sm font-medium mb-2">📊 Card Metadata</div>
                    <p className="text-sm text-muted-foreground">
                      Each card displays counts for Pages, Sections, Questions, Branches, 
                      Answer Sets, and Actions to help you quickly assess complexity.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Footer */}
            <div className="text-center pt-8 pb-4">
              <Link to="/">
                <Button size="lg" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Questionnaire Builder
                </Button>
              </Link>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Documentation;
