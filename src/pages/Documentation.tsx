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
                <a href="#getting-started" className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-1">
                  Getting Started
                </a>
                <a href="#workflow" className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-1">
                  Workflow & Navigation
                </a>
                <a href="#sidebar-tree" className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-1">
                  Sidebar Tree View
                </a>
                <a href="#structure" className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-1">
                  Questionnaire Structure
                </a>
                <a href="#erd" className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-1">
                  Data Model (ERD)
                </a>
                <a href="#adding-content" className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-1">
                  Adding Questions & Branches
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
                <a href="#feature-comparison" className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-1">
                  Feature Comparison
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
                <a href="#validation" className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-1">
                  Validation & Required Fields
                </a>
                <a href="#delete-confirmations" className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-1">
                  Delete Confirmations
                </a>
                <a href="#templates" className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-1">
                  Templates & Drafts
                </a>
                <a href="#preview" className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-1">
                  Preview & Testing
                </a>
                <a href="#troubleshooting" className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-1">
                  Troubleshooting
                </a>
                <a href="#glossary" className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-1">
                  Glossary
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
                        Hierarchical tree navigation with click-to-select editing
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

            {/* Getting Started */}
            <section id="getting-started">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <ArrowRight className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>Getting Started</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground">
                    Follow these steps to create your first questionnaire from scratch:
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex gap-4 p-4 rounded-lg border">
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-primary-foreground font-bold text-sm shrink-0">
                        1
                      </div>
                      <div>
                        <div className="font-semibold">Click "Create New" on the Home Screen</div>
                        <p className="text-sm text-muted-foreground mt-1">
                          This opens a blank questionnaire with one default page. Alternatively, select an existing template to start with pre-built content.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-4 p-4 rounded-lg border">
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-primary-foreground font-bold text-sm shrink-0">
                        2
                      </div>
                      <div>
                        <div className="font-semibold">Fill in Questionnaire Details</div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Expand the "Questionnaire Details" section in the sidebar to set the name, description, service catalog, and status.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-4 p-4 rounded-lg border">
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-primary-foreground font-bold text-sm shrink-0">
                        3
                      </div>
                      <div>
                        <div className="font-semibold">Add Sections to Your Page</div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Click "Add Section" in the main workspace to create content containers. Sections help organize questions by topic.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-4 p-4 rounded-lg border">
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-primary-foreground font-bold text-sm shrink-0">
                        4
                      </div>
                      <div>
                        <div className="font-semibold">Add Questions to Sections</div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Click "Add Question" within a section card. Configure the question text, type, and answer options in the editor that appears.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-4 p-4 rounded-lg border">
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-primary-foreground font-bold text-sm shrink-0">
                        5
                      </div>
                      <div>
                        <div className="font-semibold">Save Your Work</div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Click "Save as Draft" to store your questionnaire locally. You can return and edit it anytime from the Saved Drafts section.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Workflow & Navigation */}
            <section id="workflow">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <LayoutGrid className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>Workflow & Navigation</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground">
                    The builder uses a 30/70 split layout with the sidebar on the left and the main workspace on the right.
                  </p>
                  
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="p-4 rounded-lg border">
                      <div className="flex items-center gap-2 mb-3">
                        <PanelLeft className="h-5 w-5 text-primary" />
                        <span className="font-medium">Left Sidebar (30%)</span>
                      </div>
                      <ul className="text-sm text-muted-foreground space-y-2">
                        <li>• Collapsible Questionnaire Details form</li>
                        <li>• Interactive tree view of all pages, sections, questions, and branches</li>
                        <li>• Click any item to select and edit it</li>
                        <li>• Reset button to return to home screen</li>
                      </ul>
                    </div>
                    
                    <div className="p-4 rounded-lg border">
                      <div className="flex items-center gap-2 mb-3">
                        <LayoutGrid className="h-5 w-5 text-primary" />
                        <span className="font-medium">Main Workspace (70%)</span>
                      </div>
                      <ul className="text-sm text-muted-foreground space-y-2">
                        <li>• Page tabs at the top for navigation</li>
                        <li>• Section cards with inline hierarchy preview</li>
                        <li>• Full Question/Branch editors when selected</li>
                        <li>• Add Section button for creating new containers</li>
                      </ul>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h4 className="font-semibold mb-3">Page Navigation</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Use the page tabs in the header area to switch between pages. Each tab shows the page name with options to:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">Click to select page</Badge>
                      <Badge variant="secondary">Double-click to rename</Badge>
                      <Badge variant="secondary">X button to delete</Badge>
                      <Badge variant="secondary">+ button to add new page</Badge>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h4 className="font-semibold mb-3">Selection Flow</h4>
                    <div className="flex items-center gap-2 flex-wrap text-sm">
                      <Badge variant="outline">Click Page Tab</Badge>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      <Badge variant="outline">Click Section in Tree</Badge>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      <Badge variant="outline">Click Question/Branch</Badge>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      <Badge variant="outline">Editor Opens</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-3">
                      Selected items are highlighted in both the sidebar tree and section preview. The corresponding editor appears in the main workspace.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Sidebar Tree View */}
            <section id="sidebar-tree">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <FolderTree className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>Sidebar Tree View</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground">
                    The sidebar displays your entire questionnaire as an interactive hierarchical tree with visual connector lines.
                  </p>
                  
                  <div className="p-4 rounded-lg bg-muted/50 border font-mono text-sm">
                    <div className="text-foreground">📄 Page 1: Initial Assessment</div>
                    <div className="ml-4 border-l-2 border-muted-foreground/30 pl-3 mt-1 space-y-1">
                      <div className="text-muted-foreground">📁 Section: Contact Information</div>
                      <div className="ml-4 border-l-2 border-muted-foreground/20 pl-3 space-y-1">
                        <div className="flex items-center gap-2">
                          <HelpCircle className="h-3 w-3" />
                          <span>What is your department?</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <HelpCircle className="h-3 w-3" />
                          <span>Preferred contact method?</span>
                          <Zap className="h-3 w-3 text-yellow-500" />
                        </div>
                      </div>
                      <div className="text-muted-foreground">📁 Section: Issue Details</div>
                      <div className="ml-4 border-l-2 border-muted-foreground/20 pl-3 space-y-1">
                        <div className="flex items-center gap-2">
                          <HelpCircle className="h-3 w-3" />
                          <span>What type of issue?</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <GitBranch className="h-3 w-3" />
                          <span>Hardware Issues Branch</span>
                        </div>
                        <div className="ml-4 border-l-2 border-muted-foreground/10 pl-3">
                          <div className="flex items-center gap-2">
                            <HelpCircle className="h-3 w-3" />
                            <span>What hardware is affected?</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="p-4 rounded-lg border">
                      <div className="font-medium mb-2">Tree Icons</div>
                      <ul className="text-sm text-muted-foreground space-y-2">
                        <li className="flex items-center gap-2">
                          <HelpCircle className="h-4 w-4" />
                          <span>Question item</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <GitBranch className="h-4 w-4" />
                          <span>Conditional branch</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Zap className="h-4 w-4 text-yellow-500" />
                          <span>Has Action Record attached</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="p-4 rounded-lg border">
                      <div className="font-medium mb-2">Interactions</div>
                      <ul className="text-sm text-muted-foreground space-y-2">
                        <li className="flex items-center gap-2">
                          <MousePointer className="h-4 w-4" />
                          <span>Click to select and open editor</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Eye className="h-4 w-4" />
                          <span>Selected items are highlighted</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <ChevronRight className="h-4 w-4" />
                          <span>Nested items show parent lines</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-muted/50 border">
                    <div className="text-sm font-medium mb-2">💡 Visual Connector Lines</div>
                    <p className="text-sm text-muted-foreground">
                      CSS-based tree lines connect parent and child items, making the hierarchy easy to understand. 
                      Deeper nesting levels show progressively lighter connector lines to maintain visual clarity.
                    </p>
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

            {/* Data Model (ERD) */}
            <section id="erd">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Database className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>Data Model (ERD)</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground">
                    The Questionnaire Studio uses a hierarchical data model with rich relationships between entities.
                    This Entity-Relationship Diagram shows how all components connect.
                  </p>
                  
                  {/* ERD Diagram */}
                  <div className="p-6 rounded-lg border bg-muted/30 overflow-x-auto">
                    <h4 className="font-semibold mb-6 text-center">Entity-Relationship Diagram</h4>
                    
                    {/* Main ERD Layout */}
                    <div className="min-w-[800px]">
                      {/* Top Level - Questionnaire */}
                      <div className="flex justify-center mb-6">
                        <div className="p-4 rounded-xl border-2 border-primary bg-primary/5 min-w-[200px]">
                          <div className="font-bold text-primary text-center mb-2">Questionnaire</div>
                          <div className="text-xs text-muted-foreground space-y-1">
                            <div className="flex justify-between"><span>name</span><span className="text-primary">string</span></div>
                            <div className="flex justify-between"><span>description</span><span className="text-primary">string</span></div>
                            <div className="flex justify-between"><span>status</span><span className="text-primary">string</span></div>
                            <div className="flex justify-between"><span>version</span><span className="text-primary">string</span></div>
                            <div className="flex justify-between"><span>serviceCatalog</span><span className="text-primary">string</span></div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Connection Line */}
                      <div className="flex justify-center mb-2">
                        <div className="w-0.5 h-8 bg-muted-foreground/30"></div>
                      </div>
                      <div className="flex justify-center mb-6">
                        <Badge variant="outline" className="text-xs">1:N pages[]</Badge>
                      </div>
                      
                      {/* Level 2 - Page */}
                      <div className="flex justify-center mb-6">
                        <div className="p-4 rounded-xl border-2 border-blue-500 bg-blue-500/5 min-w-[180px]">
                          <div className="font-bold text-blue-500 text-center mb-2">Page</div>
                          <div className="text-xs text-muted-foreground space-y-1">
                            <div className="flex justify-between"><span>id</span><span className="text-blue-500">string</span></div>
                            <div className="flex justify-between"><span>name</span><span className="text-blue-500">string</span></div>
                            <div className="flex justify-between"><span>description</span><span className="text-blue-500">string?</span></div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Connection Line */}
                      <div className="flex justify-center mb-2">
                        <div className="w-0.5 h-8 bg-muted-foreground/30"></div>
                      </div>
                      <div className="flex justify-center mb-6">
                        <Badge variant="outline" className="text-xs">1:N sections[]</Badge>
                      </div>
                      
                      {/* Level 3 - Section */}
                      <div className="flex justify-center mb-6">
                        <div className="p-4 rounded-xl border-2 border-green-500 bg-green-500/5 min-w-[180px]">
                          <div className="font-bold text-green-500 text-center mb-2">Section</div>
                          <div className="text-xs text-muted-foreground space-y-1">
                            <div className="flex justify-between"><span>id</span><span className="text-green-500">string</span></div>
                            <div className="flex justify-between"><span>name</span><span className="text-green-500">string</span></div>
                            <div className="flex justify-between"><span>description</span><span className="text-green-500">string?</span></div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Connection Lines to Questions and Branches */}
                      <div className="flex justify-center mb-2">
                        <div className="flex items-end gap-24">
                          <div className="flex flex-col items-center">
                            <div className="w-0.5 h-8 bg-muted-foreground/30"></div>
                            <Badge variant="outline" className="text-xs">1:N questions[]</Badge>
                          </div>
                          <div className="flex flex-col items-center">
                            <div className="w-0.5 h-8 bg-muted-foreground/30"></div>
                            <Badge variant="outline" className="text-xs">1:N branches[]</Badge>
                          </div>
                        </div>
                      </div>
                      
                      {/* Level 4 - Question and ConditionalBranch */}
                      <div className="flex justify-center gap-8 mb-6 mt-4">
                        {/* Question Entity */}
                        <div className="p-4 rounded-xl border-2 border-orange-500 bg-orange-500/5 min-w-[220px]">
                          <div className="font-bold text-orange-500 text-center mb-2">Question</div>
                          <div className="text-xs text-muted-foreground space-y-1">
                            <div className="flex justify-between gap-4"><span>id</span><span className="text-orange-500">string</span></div>
                            <div className="flex justify-between gap-4"><span>text</span><span className="text-orange-500">string</span></div>
                            <div className="flex justify-between gap-4"><span>type</span><span className="text-orange-500">QuestionType</span></div>
                            <div className="flex justify-between gap-4"><span>required</span><span className="text-orange-500">boolean</span></div>
                            <div className="flex justify-between gap-4"><span>order</span><span className="text-orange-500">number</span></div>
                            <div className="flex justify-between gap-4"><span>readOnly</span><span className="text-orange-500">boolean?</span></div>
                            <div className="flex justify-between gap-4"><span>hidden</span><span className="text-orange-500">boolean?</span></div>
                          </div>
                        </div>
                        
                        {/* ConditionalBranch Entity */}
                        <div className="p-4 rounded-xl border-2 border-purple-500 bg-purple-500/5 min-w-[200px]">
                          <div className="font-bold text-purple-500 text-center mb-2">ConditionalBranch</div>
                          <div className="text-xs text-muted-foreground space-y-1">
                            <div className="flex justify-between gap-4"><span>id</span><span className="text-purple-500">string</span></div>
                            <div className="flex justify-between gap-4"><span>name</span><span className="text-purple-500">string</span></div>
                            <div className="flex justify-between gap-4"><span>ruleGroup</span><span className="text-purple-500">RuleGroup</span></div>
                            <div className="flex justify-between gap-4"><span>questions[]</span><span className="text-purple-500">Question[]</span></div>
                            <div className="flex justify-between gap-4"><span>childBranches[]</span><span className="text-purple-500">self[]</span></div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Question's relationships */}
                      <div className="flex justify-center mb-2">
                        <div className="flex items-start gap-16">
                          <div className="flex flex-col items-center">
                            <div className="w-0.5 h-6 bg-muted-foreground/30"></div>
                            <Badge variant="outline" className="text-xs">1:N answerSets[]</Badge>
                          </div>
                          <div className="flex flex-col items-center">
                            <div className="w-0.5 h-6 bg-muted-foreground/30"></div>
                            <Badge variant="outline" className="text-xs">1:1 questionLevelRuleGroup</Badge>
                          </div>
                          <div className="flex flex-col items-center">
                            <div className="w-0.5 h-6 bg-muted-foreground/30"></div>
                            <Badge variant="outline" className="text-xs">1:N answerLevelRuleGroups[]</Badge>
                          </div>
                        </div>
                      </div>
                      
                      {/* Level 5 - AnswerSet, RuleGroup, AnswerLevelRuleGroup */}
                      <div className="flex justify-center gap-4 mb-6 mt-4 flex-wrap">
                        {/* AnswerSet Entity */}
                        <div className="p-4 rounded-xl border-2 border-cyan-500 bg-cyan-500/5 min-w-[200px]">
                          <div className="font-bold text-cyan-500 text-center mb-2">AnswerSet</div>
                          <div className="text-xs text-muted-foreground space-y-1">
                            <div className="flex justify-between gap-4"><span>id</span><span className="text-cyan-500">string</span></div>
                            <div className="flex justify-between gap-4"><span>name</span><span className="text-cyan-500">string</span></div>
                            <div className="flex justify-between gap-4"><span>tag</span><span className="text-cyan-500">string</span></div>
                            <div className="flex justify-between gap-4"><span>isDefault</span><span className="text-cyan-500">boolean</span></div>
                            <div className="flex justify-between gap-4"><span>answers[]</span><span className="text-cyan-500">Answer[]</span></div>
                            <div className="flex justify-between gap-4"><span>dynamicValues</span><span className="text-cyan-500">boolean?</span></div>
                            <div className="flex justify-between gap-4"><span>dynamicConfig</span><span className="text-cyan-500">DynamicValueConfig?</span></div>
                          </div>
                        </div>
                        
                        {/* RuleGroup Entity */}
                        <div className="p-4 rounded-xl border-2 border-rose-500 bg-rose-500/5 min-w-[180px]">
                          <div className="font-bold text-rose-500 text-center mb-2">RuleGroup</div>
                          <div className="text-xs text-muted-foreground space-y-1">
                            <div className="flex justify-between gap-4"><span>id</span><span className="text-rose-500">string</span></div>
                            <div className="flex justify-between gap-4"><span>matchType</span><span className="text-rose-500">'AND' | 'OR'</span></div>
                            <div className="flex justify-between gap-4"><span>children[]</span><span className="text-rose-500">Rule | self[]</span></div>
                          </div>
                        </div>
                        
                        {/* AnswerLevelRuleGroup Entity */}
                        <div className="p-4 rounded-xl border-2 border-amber-500 bg-amber-500/5 min-w-[200px]">
                          <div className="font-bold text-amber-500 text-center mb-2">AnswerLevelRuleGroup</div>
                          <div className="text-xs text-muted-foreground space-y-1">
                            <div className="flex justify-between gap-4"><span>id</span><span className="text-amber-500">string</span></div>
                            <div className="flex justify-between gap-4"><span>matchType</span><span className="text-amber-500">'AND' | 'OR'</span></div>
                            <div className="flex justify-between gap-4"><span>children[]</span><span className="text-amber-500">Rule | self[]</span></div>
                            <div className="flex justify-between gap-4"><span>inlineAnswerSet</span><span className="text-amber-500">AnswerSet?</span></div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Answer relationship */}
                      <div className="flex justify-start ml-[100px] mb-2">
                        <div className="flex flex-col items-center">
                          <div className="w-0.5 h-6 bg-muted-foreground/30"></div>
                          <Badge variant="outline" className="text-xs">1:N answers[]</Badge>
                        </div>
                      </div>
                      
                      {/* Level 6 - Answer and ActionRecord */}
                      <div className="flex justify-start gap-8 ml-[50px] mt-4">
                        {/* Answer Entity */}
                        <div className="p-4 rounded-xl border-2 border-indigo-500 bg-indigo-500/5 min-w-[180px]">
                          <div className="font-bold text-indigo-500 text-center mb-2">Answer</div>
                          <div className="text-xs text-muted-foreground space-y-1">
                            <div className="flex justify-between gap-4"><span>id</span><span className="text-indigo-500">string</span></div>
                            <div className="flex justify-between gap-4"><span>label</span><span className="text-indigo-500">string</span></div>
                            <div className="flex justify-between gap-4"><span>value</span><span className="text-indigo-500">string</span></div>
                            <div className="flex justify-between gap-4"><span>active</span><span className="text-indigo-500">boolean</span></div>
                            <div className="flex justify-between gap-4"><span>actionRecord</span><span className="text-indigo-500">ActionRecord?</span></div>
                          </div>
                        </div>
                        
                        {/* ActionRecord Entity */}
                        <div className="p-4 rounded-xl border-2 border-teal-500 bg-teal-500/5 min-w-[220px]">
                          <div className="font-bold text-teal-500 text-center mb-2">ActionRecord</div>
                          <div className="text-xs text-muted-foreground space-y-1">
                            <div className="flex justify-between gap-4"><span>operationCategoryTier1</span><span className="text-teal-500">string</span></div>
                            <div className="flex justify-between gap-4"><span>operationCategoryTier2</span><span className="text-teal-500">string</span></div>
                            <div className="flex justify-between gap-4"><span>operationCategoryTier3</span><span className="text-teal-500">string</span></div>
                            <div className="flex justify-between gap-4"><span>productCategoryTier1</span><span className="text-teal-500">string</span></div>
                            <div className="flex justify-between gap-4"><span>productCategoryTier2</span><span className="text-teal-500">string</span></div>
                            <div className="flex justify-between gap-4"><span>productCategoryTier3</span><span className="text-teal-500">string</span></div>
                            <div className="flex justify-between gap-4"><span>impact</span><span className="text-teal-500">ImpactLevel</span></div>
                            <div className="flex justify-between gap-4"><span>urgency</span><span className="text-teal-500">UrgencyLevel</span></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  {/* Entity Descriptions */}
                  <div>
                    <h4 className="font-semibold mb-4">Entity Descriptions</h4>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="p-3 rounded-lg border">
                        <div className="font-medium text-primary">Questionnaire</div>
                        <p className="text-xs text-muted-foreground mt-1">Root entity containing metadata and all pages</p>
                      </div>
                      <div className="p-3 rounded-lg border">
                        <div className="font-medium text-blue-500">Page</div>
                        <p className="text-xs text-muted-foreground mt-1">Top-level container grouping related sections</p>
                      </div>
                      <div className="p-3 rounded-lg border">
                        <div className="font-medium text-green-500">Section</div>
                        <p className="text-xs text-muted-foreground mt-1">Collapsible container for questions and branches</p>
                      </div>
                      <div className="p-3 rounded-lg border">
                        <div className="font-medium text-orange-500">Question</div>
                        <p className="text-xs text-muted-foreground mt-1">Input field with type, validation, and answer options</p>
                      </div>
                      <div className="p-3 rounded-lg border">
                        <div className="font-medium text-purple-500">ConditionalBranch</div>
                        <p className="text-xs text-muted-foreground mt-1">Dynamic path with rules, questions, and nested branches</p>
                      </div>
                      <div className="p-3 rounded-lg border">
                        <div className="font-medium text-cyan-500">AnswerSet</div>
                        <p className="text-xs text-muted-foreground mt-1">Container for answers with optional dynamic configuration</p>
                      </div>
                      <div className="p-3 rounded-lg border">
                        <div className="font-medium text-rose-500">RuleGroup</div>
                        <p className="text-xs text-muted-foreground mt-1">AND/OR logic container for question visibility rules</p>
                      </div>
                      <div className="p-3 rounded-lg border">
                        <div className="font-medium text-indigo-500">Answer</div>
                        <p className="text-xs text-muted-foreground mt-1">Atomic choice with label, value, and optional action</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-muted/50 border">
                    <div className="text-sm font-medium mb-2">💡 Recursive Structures</div>
                    <p className="text-sm text-muted-foreground">
                      Note that <strong>ConditionalBranch</strong> and <strong>RuleGroup</strong> are recursive—branches can contain 
                      child branches, and rule groups can contain nested rule groups. This enables arbitrarily complex conditional logic.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Adding Questions & Branches */}
            <section id="adding-content">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Plus className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>Adding Questions & Branches</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground">
                    Learn how to add and manage questions and conditional branches within your questionnaire sections.
                  </p>
                  
                  <Separator />
                  
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <HelpCircle className="h-5 w-5 text-primary" />
                      Adding Questions
                    </h4>
                    <div className="space-y-4">
                      <div className="p-4 rounded-lg border">
                        <div className="font-medium mb-2">Method 1: From Section Card</div>
                        <p className="text-sm text-muted-foreground mb-3">
                          Each section card in the main workspace has an "Add Question" button. Click it to add a new question to that section.
                        </p>
                        <div className="flex items-center gap-2 text-sm">
                          <Badge variant="outline">Section Card</Badge>
                          <ArrowRight className="h-4 w-4 text-muted-foreground" />
                          <Badge variant="outline">Click "Add Question"</Badge>
                          <ArrowRight className="h-4 w-4 text-muted-foreground" />
                          <Badge variant="outline">Question Editor Opens</Badge>
                        </div>
                      </div>
                      
                      <div className="p-4 rounded-lg border">
                        <div className="font-medium mb-2">Method 2: From Within a Branch</div>
                        <p className="text-sm text-muted-foreground mb-3">
                          When viewing a branch editor, use the "Add Question" button in the branch's left panel to add questions specific to that conditional path.
                        </p>
                        <div className="flex items-center gap-2 text-sm">
                          <Badge variant="outline">Select Branch</Badge>
                          <ArrowRight className="h-4 w-4 text-muted-foreground" />
                          <Badge variant="outline">Branch Editor Opens</Badge>
                          <ArrowRight className="h-4 w-4 text-muted-foreground" />
                          <Badge variant="outline">Click "Add Question" in Left Panel</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <GitBranch className="h-5 w-5 text-primary" />
                      Adding Conditional Branches
                    </h4>
                    <div className="space-y-4">
                      <div className="p-4 rounded-lg border">
                        <div className="font-medium mb-2">Section-Level Branches</div>
                        <p className="text-sm text-muted-foreground mb-3">
                          Click "Add Branch" in a section card to create a new conditional path. The branch will appear in both the section preview and the sidebar tree.
                        </p>
                        <div className="flex items-center gap-2 text-sm">
                          <Badge variant="outline">Section Card</Badge>
                          <ArrowRight className="h-4 w-4 text-muted-foreground" />
                          <Badge variant="outline">Click "Add Branch"</Badge>
                          <ArrowRight className="h-4 w-4 text-muted-foreground" />
                          <Badge variant="outline">Configure Branch Rules</Badge>
                        </div>
                      </div>
                      
                      <div className="p-4 rounded-lg border">
                        <div className="font-medium mb-2">Nested Branches (Sub-Branches)</div>
                        <p className="text-sm text-muted-foreground mb-3">
                          When editing a branch, use "Add Nested Branch" to create child branches within the current branch, enabling multi-level decision trees.
                        </p>
                        <div className="flex items-center gap-2 text-sm">
                          <Badge variant="outline">Parent Branch Editor</Badge>
                          <ArrowRight className="h-4 w-4 text-muted-foreground" />
                          <Badge variant="outline">Click "Add Nested Branch"</Badge>
                          <ArrowRight className="h-4 w-4 text-muted-foreground" />
                          <Badge variant="outline">Child Branch Created</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Pencil className="h-5 w-5 text-primary" />
                      Editing & Deleting
                    </h4>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="p-4 rounded-lg border">
                        <div className="font-medium mb-2">Edit Items</div>
                        <p className="text-sm text-muted-foreground">
                          Click any question or branch in the sidebar tree or section preview to select it. 
                          The full editor will appear in the main workspace with all configurable options.
                        </p>
                      </div>
                      
                      <div className="p-4 rounded-lg border">
                        <div className="font-medium mb-2">Delete Items</div>
                        <p className="text-sm text-muted-foreground">
                          Each question and branch has a delete button (trash icon) in its editor header. 
                          Deleting a branch also removes all its nested questions and sub-branches.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-muted/50 border">
                    <div className="text-sm font-medium mb-2">📍 Section Preview</div>
                    <p className="text-sm text-muted-foreground">
                      Each section card shows a compact horizontal preview of its contents. Questions display with a 
                      <HelpCircle className="h-3 w-3 inline mx-1" /> icon, and branches show with a 
                      <GitBranch className="h-3 w-3 inline mx-1" /> icon in dashed-border containers. 
                      Nested items are indented with vertical connector lines.
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
                <CardContent className="space-y-8">
                  <p className="text-muted-foreground">
                    The builder supports 13 question types, organized into three categories: Choice-based types, Input types, and Special types. Each type has specific configurations and behaviors.
                  </p>
                  
                  <Separator />
                  
                  {/* Choice-Based Types */}
                  <div>
                    <h4 className="font-semibold mb-4 flex items-center gap-2">
                      <ListChecks className="h-5 w-5 text-primary" />
                      Choice-Based Types
                    </h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      These types allow users to select from predefined options. They support Answer Sets, Dynamic Values, and Action Records.
                    </p>
                    
                    <div className="space-y-4">
                      {/* Choice-options */}
                      <div className="p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <ListChecks className="h-5 w-5 text-primary" />
                          <span className="font-semibold">Choice-options</span>
                          <Badge variant="secondary" className="text-xs">Single Select</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          Displays options as selectable chips or buttons. Users can select only one option at a time.
                        </p>
                        <div className="grid gap-3 sm:grid-cols-2 text-xs">
                          <div className="p-2 rounded bg-muted/50">
                            <strong>Use Case:</strong> When you want all options visible at once for quick selection
                          </div>
                          <div className="p-2 rounded bg-muted/50">
                            <strong>Best For:</strong> 2-6 options that fit horizontally
                          </div>
                        </div>
                        <div className="mt-3 p-2 rounded bg-primary/5 border border-primary/20 text-xs">
                          <strong>Features:</strong> Dynamic Values, Answer Sets, Action Records, Single active selection enforcement
                        </div>
                      </div>
                      
                      {/* Dropdown */}
                      <div className="p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <ChevronRight className="h-5 w-5 text-primary" />
                          <span className="font-semibold">Dropdown</span>
                          <Badge variant="secondary" className="text-xs">Single Select</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          Traditional dropdown select menu. Users click to reveal options and select one.
                        </p>
                        <div className="grid gap-3 sm:grid-cols-2 text-xs">
                          <div className="p-2 rounded bg-muted/50">
                            <strong>Use Case:</strong> When space is limited or you have many options
                          </div>
                          <div className="p-2 rounded bg-muted/50">
                            <strong>Best For:</strong> 5+ options, standardized data entry
                          </div>
                        </div>
                        <div className="mt-3 p-2 rounded bg-primary/5 border border-primary/20 text-xs">
                          <strong>Features:</strong> Dynamic Values, Answer Sets, Action Records, Single active selection enforcement
                        </div>
                      </div>
                      
                      {/* Radio Button */}
                      <div className="p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <CircleDot className="h-5 w-5 text-primary" />
                          <span className="font-semibold">Radio Button</span>
                          <Badge variant="secondary" className="text-xs">Single Select</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          Displays options as a vertical or horizontal list of radio buttons. All options are visible, and only one can be selected.
                        </p>
                        <div className="grid gap-3 sm:grid-cols-2 text-xs">
                          <div className="p-2 rounded bg-muted/50">
                            <strong>Use Case:</strong> When users need to see all options before deciding
                          </div>
                          <div className="p-2 rounded bg-muted/50">
                            <strong>Best For:</strong> 2-5 mutually exclusive options
                          </div>
                        </div>
                        <div className="mt-3 p-2 rounded bg-primary/5 border border-primary/20 text-xs">
                          <strong>Features:</strong> Dynamic Values, Answer Sets, Action Records
                        </div>
                      </div>
                      
                      {/* Multi-Select */}
                      <div className="p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckSquare className="h-5 w-5 text-primary" />
                          <span className="font-semibold">Multi-Select</span>
                          <Badge variant="outline" className="text-xs">Multiple Select</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          Displays options as checkboxes, allowing users to select multiple answers simultaneously.
                        </p>
                        <div className="grid gap-3 sm:grid-cols-2 text-xs">
                          <div className="p-2 rounded bg-muted/50">
                            <strong>Use Case:</strong> When multiple answers apply (e.g., "Select all that apply")
                          </div>
                          <div className="p-2 rounded bg-muted/50">
                            <strong>Best For:</strong> Features, preferences, multiple selections
                          </div>
                        </div>
                        <div className="mt-3 p-2 rounded bg-primary/5 border border-primary/20 text-xs">
                          <strong>Features:</strong> Dynamic Values, Answer Sets, Action Records, Multiple active selections allowed
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  {/* Input Types */}
                  <div>
                    <h4 className="font-semibold mb-4 flex items-center gap-2">
                      <Type className="h-5 w-5 text-primary" />
                      Input Types
                    </h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      These types accept free-form user input. They show simplified configuration without Answer Set lists.
                    </p>
                    
                    <div className="space-y-4">
                      {/* Text */}
                      <div className="p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Type className="h-5 w-5 text-primary" />
                          <span className="font-semibold">Text</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          Single-line text input field for short responses. Supports regex-based validation patterns.
                        </p>
                        <div className="p-3 rounded bg-muted/30 mb-3">
                          <div className="text-xs font-medium mb-2">Configuration Options:</div>
                          <ul className="text-xs text-muted-foreground space-y-1">
                            <li>• <strong>Default Text Answer:</strong> Pre-filled value (optional)</li>
                            <li>• <strong>Regular Expression:</strong> Validation pattern dropdown</li>
                          </ul>
                        </div>
                        <div className="p-3 rounded bg-primary/5 border border-primary/20">
                          <div className="text-xs font-medium mb-2">Available Validation Patterns:</div>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                            <div className="p-1.5 rounded bg-background">None (free text)</div>
                            <div className="p-1.5 rounded bg-background">Cost Center (00000-0000)</div>
                            <div className="p-1.5 rounded bg-background">Email (someone@domain.com)</div>
                            <div className="p-1.5 rounded bg-background">IP Address (127.0.0.1)</div>
                            <div className="p-1.5 rounded bg-background">Phone (0-000-000-0000)</div>
                            <div className="p-1.5 rounded bg-background">URL (http://domain.com)</div>
                          </div>
                        </div>
                      </div>
                      
                      {/* TextArea */}
                      <div className="p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Type className="h-5 w-5 text-primary" />
                          <span className="font-semibold">Text Area</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          Multi-line text input for longer responses. Supports both plain text and rich text formatting.
                        </p>
                        <div className="p-3 rounded bg-muted/30 mb-3">
                          <div className="text-xs font-medium mb-2">Configuration Options:</div>
                          <ul className="text-xs text-muted-foreground space-y-1">
                            <li>• <strong>Default Content:</strong> Pre-filled text (optional)</li>
                            <li>• <strong>Format:</strong> Plain Text or Rich Text</li>
                          </ul>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2 text-xs">
                          <div className="p-2 rounded bg-muted/50">
                            <strong>Plain Text:</strong> Standard textarea, no formatting
                          </div>
                          <div className="p-2 rounded bg-muted/50">
                            <strong>Rich Text:</strong> TipTap editor with bold, italic, lists, headings
                          </div>
                        </div>
                      </div>
                      
                      {/* Number */}
                      <div className="p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Hash className="h-5 w-5 text-primary" />
                          <span className="font-semibold">Number</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          Numeric input field for whole numbers. Supports min/max value restrictions.
                        </p>
                        <div className="p-3 rounded bg-muted/30 mb-3">
                          <div className="text-xs font-medium mb-2">Configuration Options:</div>
                          <ul className="text-xs text-muted-foreground space-y-1">
                            <li>• <strong>Default Number Value:</strong> Pre-filled number (optional)</li>
                            <li>• <strong>Restriction Toggle:</strong> Enable min/max validation</li>
                            <li>• <strong>Min Value:</strong> Minimum allowed number</li>
                            <li>• <strong>Max Value:</strong> Maximum allowed number</li>
                          </ul>
                        </div>
                      </div>
                      
                      {/* Decimal */}
                      <div className="p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Hash className="h-5 w-5 text-primary" />
                          <span className="font-semibold">Decimal</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          Numeric input field for decimal numbers with two-decimal precision (e.g., currency, percentages).
                        </p>
                        <div className="p-3 rounded bg-muted/30 mb-3">
                          <div className="text-xs font-medium mb-2">Configuration Options:</div>
                          <ul className="text-xs text-muted-foreground space-y-1">
                            <li>• <strong>Default Decimal Value:</strong> Pre-filled value (optional)</li>
                            <li>• <strong>Restriction Toggle:</strong> Enable min/max validation</li>
                            <li>• <strong>Min Value:</strong> Minimum allowed value</li>
                            <li>• <strong>Max Value:</strong> Maximum allowed value</li>
                            <li>• <strong>Step:</strong> Fixed at 0.01 for two-decimal precision</li>
                          </ul>
                        </div>
                      </div>
                      
                      {/* Date */}
                      <div className="p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="h-5 w-5 text-primary" />
                          <span className="font-semibold">Date</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          Date picker input with optional time selection and date range restrictions.
                        </p>
                        <div className="p-3 rounded bg-muted/30 mb-3">
                          <div className="text-xs font-medium mb-2">Configuration Options:</div>
                          <ul className="text-xs text-muted-foreground space-y-1">
                            <li>• <strong>Default Date:</strong> Pre-selected date (optional)</li>
                            <li>• <strong>Date Restriction Toggle:</strong> Enable min/max date validation</li>
                            <li>• <strong>Time Toggle:</strong> Add time picker alongside date</li>
                            <li>• <strong>Min Date:</strong> Earliest selectable date</li>
                            <li>• <strong>Max Date:</strong> Latest selectable date</li>
                          </ul>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2 text-xs">
                          <div className="p-2 rounded bg-muted/50">
                            <strong>Date Only:</strong> Single date input field
                          </div>
                          <div className="p-2 rounded bg-muted/50">
                            <strong>Date + Time:</strong> Split into date and time inputs
                          </div>
                        </div>
                      </div>
                      
                      {/* Rating */}
                      <div className="p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Star className="h-5 w-5 text-primary" />
                          <span className="font-semibold">Rating</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          Scale-based rating input with configurable range and multiple display styles.
                        </p>
                        <div className="p-3 rounded bg-muted/30 mb-3">
                          <div className="text-xs font-medium mb-2">Configuration Options:</div>
                          <ul className="text-xs text-muted-foreground space-y-1">
                            <li>• <strong>Default Rating Value:</strong> Pre-selected rating (optional)</li>
                            <li>• <strong>Display Style:</strong> Visual representation style</li>
                            <li>• <strong>Min Value:</strong> Lowest rating number (default: 1)</li>
                            <li>• <strong>Max Value:</strong> Highest rating number (default: 5)</li>
                            <li>• <strong>Min Label:</strong> Text for lowest rating (e.g., "Poor")</li>
                            <li>• <strong>Max Label:</strong> Text for highest rating (e.g., "Excellent")</li>
                          </ul>
                        </div>
                        <div className="p-3 rounded bg-primary/5 border border-primary/20">
                          <div className="text-xs font-medium mb-2">Available Display Styles:</div>
                          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs text-center">
                            <div className="p-2 rounded bg-background">Numbers (1, 2, 3...)</div>
                            <div className="p-2 rounded bg-background">Stars (★)</div>
                            <div className="p-2 rounded bg-background">Smileys (😊)</div>
                            <div className="p-2 rounded bg-background">Hearts (❤️)</div>
                            <div className="p-2 rounded bg-background">Thumbs (👍)</div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Boolean */}
                      <div className="p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <ToggleLeft className="h-5 w-5 text-primary" />
                          <span className="font-semibold">Boolean (Yes/No)</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          Simple toggle switch for yes/no or true/false responses.
                        </p>
                        <div className="p-3 rounded bg-muted/30 mb-3">
                          <div className="text-xs font-medium mb-2">Configuration Options:</div>
                          <ul className="text-xs text-muted-foreground space-y-1">
                            <li>• <strong>Default Boolean Value:</strong> Pre-set to Yes (True) or No (False)</li>
                          </ul>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2 text-xs">
                          <div className="p-2 rounded bg-muted/50">
                            <strong>Use Case:</strong> Consent forms, confirmations, binary choices
                          </div>
                          <div className="p-2 rounded bg-muted/50">
                            <strong>Display:</strong> Switch component with Yes/No labels
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  {/* Special Types */}
                  <div>
                    <h4 className="font-semibold mb-4 flex items-center gap-2">
                      <Settings className="h-5 w-5 text-primary" />
                      Special Types
                    </h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      These types handle file attachments and document distribution.
                    </p>
                    
                    <div className="space-y-4">
                      {/* File Attachment */}
                      <div className="p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Layers className="h-5 w-5 text-primary" />
                          <span className="font-semibold">File Attachment</span>
                          <Badge variant="secondary" className="text-xs">Upload</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          Allows respondents to upload files as part of their response. Supports multiple file types and configurable restrictions.
                        </p>
                        <div className="p-3 rounded bg-muted/30 mb-3">
                          <div className="text-xs font-medium mb-2">Configuration Options:</div>
                          <ul className="text-xs text-muted-foreground space-y-1">
                            <li>• <strong>Allowed File Types:</strong> Checkboxes for PDF, Word, Excel, PowerPoint, Text, Images</li>
                            <li>• <strong>Max File Size (MB):</strong> Maximum size per file (default: 10 MB, range: 1-100)</li>
                            <li>• <strong>Number of Files:</strong> Maximum uploads allowed (default: 3, range: 1-20)</li>
                          </ul>
                        </div>
                        <div className="p-3 rounded bg-primary/5 border border-primary/20">
                          <div className="text-xs font-medium mb-2">Supported File Types:</div>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                            <div className="p-1.5 rounded bg-background">PDF (.pdf)</div>
                            <div className="p-1.5 rounded bg-background">Word (.doc, .docx)</div>
                            <div className="p-1.5 rounded bg-background">Excel (.xls, .xlsx)</div>
                            <div className="p-1.5 rounded bg-background">PowerPoint (.ppt, .pptx)</div>
                            <div className="p-1.5 rounded bg-background">Text (.txt)</div>
                            <div className="p-1.5 rounded bg-background">Images (.jpg, .png, .gif)</div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Downloadable Document */}
                      <div className="p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Layers className="h-5 w-5 text-primary" />
                          <span className="font-semibold">Downloadable Document</span>
                          <Badge variant="outline" className="text-xs">Download</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          Provides a document for respondents to download. Use for distributing terms, agreements, instructions, or reference materials.
                        </p>
                        <div className="p-3 rounded bg-muted/30 mb-3">
                          <div className="text-xs font-medium mb-2">Configuration Options:</div>
                          <ul className="text-xs text-muted-foreground space-y-1">
                            <li>• <strong>Document Name:</strong> Display name shown to respondents</li>
                            <li>• <strong>Attach Document:</strong> File upload control with drag-and-drop area</li>
                          </ul>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2 text-xs">
                          <div className="p-2 rounded bg-muted/50">
                            <strong>Use Case:</strong> Terms of service, instruction manuals, reference PDFs
                          </div>
                          <div className="p-2 rounded bg-muted/50">
                            <strong>Display:</strong> Shows attached file with name, type, and remove option
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  {/* Question Type Quick Reference */}
                  <div>
                    <h4 className="font-semibold mb-4">Quick Reference Table</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs border rounded-lg">
                        <thead>
                          <tr className="bg-muted/50">
                            <th className="p-2 text-left border-b">Type</th>
                            <th className="p-2 text-left border-b">Category</th>
                            <th className="p-2 text-center border-b">Answer Sets</th>
                            <th className="p-2 text-center border-b">Dynamic Values</th>
                            <th className="p-2 text-center border-b">Action Records</th>
                            <th className="p-2 text-left border-b">Best For</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="p-2 font-medium">Choice-options</td>
                            <td className="p-2">Choice</td>
                            <td className="p-2 text-center text-green-600">✓</td>
                            <td className="p-2 text-center text-green-600">✓</td>
                            <td className="p-2 text-center text-green-600">✓</td>
                            <td className="p-2">Visible options, quick selection</td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-2 font-medium">Dropdown</td>
                            <td className="p-2">Choice</td>
                            <td className="p-2 text-center text-green-600">✓</td>
                            <td className="p-2 text-center text-green-600">✓</td>
                            <td className="p-2 text-center text-green-600">✓</td>
                            <td className="p-2">Long lists, compact UI</td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-2 font-medium">Radio Button</td>
                            <td className="p-2">Choice</td>
                            <td className="p-2 text-center text-green-600">✓</td>
                            <td className="p-2 text-center text-green-600">✓</td>
                            <td className="p-2 text-center text-green-600">✓</td>
                            <td className="p-2">2-5 mutually exclusive options</td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-2 font-medium">Multi-Select</td>
                            <td className="p-2">Choice</td>
                            <td className="p-2 text-center text-green-600">✓</td>
                            <td className="p-2 text-center text-green-600">✓</td>
                            <td className="p-2 text-center text-green-600">✓</td>
                            <td className="p-2">Multiple selections allowed</td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-2 font-medium">Text</td>
                            <td className="p-2">Input</td>
                            <td className="p-2 text-center text-muted-foreground">—</td>
                            <td className="p-2 text-center text-muted-foreground">—</td>
                            <td className="p-2 text-center text-muted-foreground">—</td>
                            <td className="p-2">Short text, validated formats</td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-2 font-medium">Text Area</td>
                            <td className="p-2">Input</td>
                            <td className="p-2 text-center text-muted-foreground">—</td>
                            <td className="p-2 text-center text-muted-foreground">—</td>
                            <td className="p-2 text-center text-muted-foreground">—</td>
                            <td className="p-2">Long text, rich formatting</td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-2 font-medium">Number</td>
                            <td className="p-2">Input</td>
                            <td className="p-2 text-center text-muted-foreground">—</td>
                            <td className="p-2 text-center text-muted-foreground">—</td>
                            <td className="p-2 text-center text-muted-foreground">—</td>
                            <td className="p-2">Whole numbers, counts</td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-2 font-medium">Decimal</td>
                            <td className="p-2">Input</td>
                            <td className="p-2 text-center text-muted-foreground">—</td>
                            <td className="p-2 text-center text-muted-foreground">—</td>
                            <td className="p-2 text-center text-muted-foreground">—</td>
                            <td className="p-2">Currency, percentages</td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-2 font-medium">Date</td>
                            <td className="p-2">Input</td>
                            <td className="p-2 text-center text-muted-foreground">—</td>
                            <td className="p-2 text-center text-muted-foreground">—</td>
                            <td className="p-2 text-center text-muted-foreground">—</td>
                            <td className="p-2">Dates, optional time</td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-2 font-medium">Rating</td>
                            <td className="p-2">Input</td>
                            <td className="p-2 text-center text-muted-foreground">—</td>
                            <td className="p-2 text-center text-muted-foreground">—</td>
                            <td className="p-2 text-center text-muted-foreground">—</td>
                            <td className="p-2">Satisfaction, NPS, scales</td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-2 font-medium">Boolean</td>
                            <td className="p-2">Input</td>
                            <td className="p-2 text-center text-muted-foreground">—</td>
                            <td className="p-2 text-center text-muted-foreground">—</td>
                            <td className="p-2 text-center text-muted-foreground">—</td>
                            <td className="p-2">Yes/No, consent</td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-2 font-medium">File Attachment</td>
                            <td className="p-2">Special</td>
                            <td className="p-2 text-center text-muted-foreground">—</td>
                            <td className="p-2 text-center text-muted-foreground">—</td>
                            <td className="p-2 text-center text-muted-foreground">—</td>
                            <td className="p-2">Document uploads</td>
                          </tr>
                          <tr>
                            <td className="p-2 font-medium">Downloadable Document</td>
                            <td className="p-2">Special</td>
                            <td className="p-2 text-center text-muted-foreground">—</td>
                            <td className="p-2 text-center text-muted-foreground">—</td>
                            <td className="p-2 text-center text-muted-foreground">—</td>
                            <td className="p-2">Distribute files</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-muted/50 border">
                    <div className="text-sm font-medium mb-2">💡 Question Properties</div>
                    <p className="text-sm text-muted-foreground mb-3">
                      All question types support these common properties:
                    </p>
                    <div className="grid gap-2 sm:grid-cols-3 text-xs">
                      <div className="flex items-center gap-2 p-2 rounded bg-background">
                        <CheckCircle className="h-3 w-3 text-primary" />
                        <span><strong>Required:</strong> Must be answered</span>
                      </div>
                      <div className="flex items-center gap-2 p-2 rounded bg-background">
                        <Lock className="h-3 w-3 text-primary" />
                        <span><strong>Read-only:</strong> Visible but not editable</span>
                      </div>
                      <div className="flex items-center gap-2 p-2 rounded bg-background">
                        <EyeOff className="h-3 w-3 text-primary" />
                        <span><strong>Hidden:</strong> Not visible to respondents</span>
                      </div>
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
                    <div>
                      <CardTitle>Answer Sets</CardTitle>
                      <CardDescription>
                        Define, configure, and manage answer options for all question types
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Key Definitions */}
                  <div>
                    <h4 className="font-semibold mb-4">Key Definitions</h4>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="p-4 rounded-lg border-2 border-primary/30 bg-primary/5">
                        <div className="flex items-center gap-2 mb-2">
                          <ListChecks className="h-5 w-5 text-primary" />
                          <span className="font-semibold text-lg">Answer Set</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          An <strong>Answer Set</strong> is a <strong>container</strong> that holds one or more Answers. 
                          It groups related response options together and includes metadata like name, tag, and configuration settings. 
                          Each question has at least one Answer Set, and can have multiple for conditional branching scenarios.
                        </p>
                        <div className="mt-3 p-2 rounded bg-background border text-xs">
                          <strong>Contains:</strong> Answers[], name, tag, isDefault flag, type-specific configs
                        </div>
                      </div>
                      
                      <div className="p-4 rounded-lg border-2 border-primary/30 bg-primary/5">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle className="h-5 w-5 text-primary" />
                          <span className="font-semibold text-lg">Answer</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          An <strong>Answer</strong> is a single response option within an Answer Set. 
                          For choice-based questions, each Answer represents one selectable option with a display label and stored value. 
                          Answers can be marked as active/inactive and optionally have Action Records attached.
                        </p>
                        <div className="mt-3 p-2 rounded bg-background border text-xs">
                          <strong>Contains:</strong> id, label, value, active status, optional actionRecord
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 p-4 rounded-lg bg-muted/30 border">
                      <div className="text-sm font-medium mb-2">📦 Relationship Hierarchy</div>
                      <div className="flex items-center gap-2 text-sm">
                        <Badge variant="outline">Question</Badge>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        <Badge variant="secondary">Answer Set(s)</Badge>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        <Badge variant="default">Answer(s)</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        A Question contains one or more Answer Sets. Each Answer Set contains one or more Answers.
                      </p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  {/* Answer Structure Details */}
                  <div>
                    <h4 className="font-semibold mb-4">Answer Structure</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Each <strong>Answer</strong> within an Answer Set contains the following properties:
                    </p>
                    
                    <div className="p-4 rounded-lg border mb-4">
                      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="p-3 rounded bg-muted/50">
                          <div className="text-sm font-medium mb-1">id</div>
                          <p className="text-xs text-muted-foreground">Unique identifier for the answer (auto-generated UUID)</p>
                        </div>
                        <div className="p-3 rounded bg-muted/50">
                          <div className="text-sm font-medium mb-1">label</div>
                          <p className="text-xs text-muted-foreground">Display text shown to the user (e.g., "Yes", "High Priority")</p>
                        </div>
                        <div className="p-3 rounded bg-muted/50">
                          <div className="text-sm font-medium mb-1">value</div>
                          <p className="text-xs text-muted-foreground">Stored data value when selected (e.g., "yes", "1")</p>
                        </div>
                        <div className="p-3 rounded bg-muted/50">
                          <div className="text-sm font-medium mb-1">active</div>
                          <p className="text-xs text-muted-foreground">Boolean flag indicating if this answer is currently enabled/selected</p>
                        </div>
                      </div>
                      
                      <div className="mt-4 p-3 rounded bg-primary/5 border border-primary/20">
                        <div className="flex items-center gap-2 mb-2">
                          <Zap className="h-4 w-4 text-primary" />
                          <span className="text-sm font-medium">Optional: Action Record</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Each answer can optionally have an <strong>actionRecord</strong> attached containing ITSM categorization:
                          Operation Category (Tier 1/2/3), Product Category (Tier 1/2/3), Impact, and Urgency levels.
                        </p>
                      </div>
                    </div>
                    
                    {/* Default Answer for Simple Types */}
                    <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/30">
                      <div className="flex items-center gap-2 mb-2">
                        <Info className="h-5 w-5 text-amber-600" />
                        <span className="font-medium text-amber-700 dark:text-amber-400">Default Answer for Simple Types</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        For <strong>simple types</strong> (Text, TextArea, Number, Decimal, Date, Rating, Boolean), the Answer Set 
                        contains exactly <strong>one Answer</strong> called the <strong>Default Answer</strong>. The "Default Value" 
                        input in the editor directly maps to <code className="px-1 py-0.5 rounded bg-muted text-xs">answers[0].value</code>.
                      </p>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <div className="p-3 rounded bg-background border">
                          <div className="font-medium text-sm mb-1">How it works</div>
                          <ul className="text-xs text-muted-foreground space-y-1">
                            <li>• Answer Set is initialized with one empty answer</li>
                            <li>• The first answer (<code className="px-1 rounded bg-muted">answers[0]</code>) stores the default value</li>
                            <li>• Configuration fields are stored at the Answer Set level</li>
                          </ul>
                        </div>
                        <div className="p-3 rounded bg-background border">
                          <div className="font-medium text-sm mb-1">Example: Number Type</div>
                          <pre className="text-xs text-muted-foreground overflow-x-auto">{`{
  answers: [{ value: "50" }],
  numberRestriction: true,
  minValue: 0,
  maxValue: 100
}`}</pre>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <p className="text-muted-foreground">
                    Answer Sets are the foundation for defining response options in your questionnaire. They control what 
                    users can select, input, or configure for each question. The Answer Set Editor adapts its interface 
                    based on the question type, showing relevant configuration options for choice-based types, input types, 
                    and special types.
                  </p>
                  
                  <Separator />
                  
                  {/* Types of Answer Sets */}
                  <div>
                    <h4 className="font-semibold mb-4">Types of Answer Sets</h4>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <ListChecks className="h-5 w-5 text-primary" />
                          <span className="font-medium">Standard Answer Sets</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          Manually defined configurations attached directly to questions. Each question starts with one default answer set.
                        </p>
                        <ul className="text-xs text-muted-foreground space-y-1">
                          <li>• Editable name and tag for identification</li>
                          <li>• Type-specific configuration fields</li>
                          <li>• Can be marked as default</li>
                          <li>• Supports Action Records on choice answers</li>
                        </ul>
                      </div>
                      
                      <div className="p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <GitBranch className="h-5 w-5 text-primary" />
                          <span className="font-medium">Inline Answer Sets</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          Created within answer-level rule groups for conditional display based on previous answers.
                        </p>
                        <ul className="text-xs text-muted-foreground space-y-1">
                          <li>• Attached to specific rule conditions</li>
                          <li>• Replaces default set when conditions match</li>
                          <li>• Same editing capabilities as standard sets</li>
                          <li>• Referenced in sidebar tree lookups</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  {/* Answer Set Structure */}
                  <div>
                    <h4 className="font-semibold mb-4">Answer Set Structure</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Every answer set contains core identification fields plus type-specific configuration:
                    </p>
                    
                    <div className="p-4 rounded-lg bg-muted/30 border">
                      <div className="grid gap-4 sm:grid-cols-3">
                        <div>
                          <div className="text-sm font-medium mb-2">Core Fields</div>
                          <ul className="text-xs text-muted-foreground space-y-1">
                            <li>• <strong>ID:</strong> Unique identifier</li>
                            <li>• <strong>Name:</strong> Descriptive label</li>
                            <li>• <strong>Tag:</strong> Short reference code</li>
                            <li>• <strong>isDefault:</strong> Primary set flag</li>
                          </ul>
                        </div>
                        <div>
                          <div className="text-sm font-medium mb-2">Choice Type Fields</div>
                          <ul className="text-xs text-muted-foreground space-y-1">
                            <li>• <strong>answers[]:</strong> List of options</li>
                            <li>• <strong>dynamicValues:</strong> Enable data source</li>
                            <li>• <strong>dynamicConfig:</strong> Data source settings</li>
                          </ul>
                        </div>
                        <div>
                          <div className="text-sm font-medium mb-2">Input Type Fields</div>
                          <ul className="text-xs text-muted-foreground space-y-1">
                            <li>• <strong>minValue/maxValue:</strong> Number limits</li>
                            <li>• <strong>minDate/maxDate:</strong> Date limits</li>
                            <li>• <strong>textAreaFormat:</strong> Plain/Rich text</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  {/* Choice-Based Answer Sets */}
                  <div>
                    <h4 className="font-semibold mb-4 flex items-center gap-2">
                      <CheckSquare className="h-5 w-5 text-primary" />
                      Choice-Based Answer Sets
                    </h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      For Choice-options, Dropdown, Radio Button, and Multi-Select question types, answer sets contain 
                      a list of selectable options. Each answer has:
                    </p>
                    
                    <div className="p-4 rounded-lg border mb-4">
                      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="p-3 rounded bg-muted/50">
                          <div className="text-sm font-medium mb-1">Label</div>
                          <p className="text-xs text-muted-foreground">Display text shown to users (e.g., "Engineering Department")</p>
                        </div>
                        <div className="p-3 rounded bg-muted/50">
                          <div className="text-sm font-medium mb-1">Value</div>
                          <p className="text-xs text-muted-foreground">Stored data when selected (e.g., "ENG")</p>
                        </div>
                        <div className="p-3 rounded bg-muted/50">
                          <div className="text-sm font-medium mb-1">Active</div>
                          <p className="text-xs text-muted-foreground">Whether this answer is currently enabled</p>
                        </div>
                        <div className="p-3 rounded bg-muted/50">
                          <div className="text-sm font-medium mb-1">Action Record</div>
                          <p className="text-xs text-muted-foreground">Optional ITSM categorization (via <Zap className="h-3 w-3 inline" /> icon)</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 rounded-lg bg-muted/30 border">
                      <div className="text-sm font-medium mb-2">Selection Behavior</div>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <div className="p-3 rounded border bg-background">
                          <div className="font-medium text-sm mb-1">Single-Select Types</div>
                          <p className="text-xs text-muted-foreground">
                            <strong>Choice-options & Dropdown:</strong> Activating one answer automatically deactivates all others. 
                            Only one answer can be active at a time.
                          </p>
                        </div>
                        <div className="p-3 rounded border bg-background">
                          <div className="font-medium text-sm mb-1">Multi-Select Type</div>
                          <p className="text-xs text-muted-foreground">
                            <strong>Multi-Select:</strong> Multiple answers can be active simultaneously. 
                            Users can select any combination of options.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  {/* Text Type Configuration */}
                  <div>
                    <h4 className="font-semibold mb-4 flex items-center gap-2">
                      <Type className="h-5 w-5 text-primary" />
                      Text & TextArea Configuration
                    </h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Text-based question types have specialized configuration options in the Answer Set Editor:
                    </p>
                    
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="p-4 rounded-lg border">
                        <div className="font-medium mb-3">Text (Single Line)</div>
                        <ul className="text-sm text-muted-foreground space-y-2">
                          <li className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                            <span><strong>Default Value:</strong> Pre-filled text input</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                            <span><strong>Validation Type:</strong> Select from None, Cost Center, Email, IP Address, Phone, or URL</span>
                          </li>
                        </ul>
                        <div className="mt-3 p-2 rounded bg-muted/50 text-xs">
                          <strong>Example patterns:</strong>
                          <ul className="mt-1 space-y-1 text-muted-foreground">
                            <li>• Email: user@example.com</li>
                            <li>• Phone: +1-555-123-4567</li>
                            <li>• URL: https://example.com</li>
                          </ul>
                        </div>
                      </div>
                      
                      <div className="p-4 rounded-lg border">
                        <div className="font-medium mb-3">TextArea (Multi Line)</div>
                        <ul className="text-sm text-muted-foreground space-y-2">
                          <li className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                            <span><strong>Default Value:</strong> Pre-filled text content</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                            <span><strong>Format Toggle:</strong> Plain Text or Rich Text</span>
                          </li>
                        </ul>
                        <div className="mt-3 p-2 rounded bg-muted/50 text-xs">
                          <strong>Rich Text Features:</strong>
                          <ul className="mt-1 space-y-1 text-muted-foreground">
                            <li>• Bold, Italic formatting</li>
                            <li>• Bullet and numbered lists</li>
                            <li>• Undo/Redo actions</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  {/* Number & Decimal Configuration */}
                  <div>
                    <h4 className="font-semibold mb-4 flex items-center gap-2">
                      <Hash className="h-5 w-5 text-primary" />
                      Number & Decimal Configuration
                    </h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Numeric question types support value restrictions and defaults:
                    </p>
                    
                    <div className="p-4 rounded-lg border">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <div className="font-medium mb-2">Configuration Fields</div>
                          <ul className="text-sm text-muted-foreground space-y-2">
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                              <span><strong>Default Value:</strong> Initial number to display</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                              <span><strong>Number Restriction:</strong> Toggle to enable limits</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                              <span><strong>Min Value:</strong> Lowest allowed number</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                              <span><strong>Max Value:</strong> Highest allowed number</span>
                            </li>
                          </ul>
                        </div>
                        <div className="p-3 rounded bg-muted/50">
                          <div className="text-sm font-medium mb-2">Example Configuration</div>
                          <div className="space-y-2 text-xs text-muted-foreground">
                            <p><strong>Quantity Field:</strong></p>
                            <ul className="space-y-1">
                              <li>• Default: 1</li>
                              <li>• Min Value: 1</li>
                              <li>• Max Value: 100</li>
                            </ul>
                            <p className="mt-2"><strong>Percentage Field:</strong></p>
                            <ul className="space-y-1">
                              <li>• Default: 0</li>
                              <li>• Min Value: 0</li>
                              <li>• Max Value: 100</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  {/* Date Configuration */}
                  <div>
                    <h4 className="font-semibold mb-4 flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-primary" />
                      Date Configuration
                    </h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Date question types offer flexible configuration for date and time input:
                    </p>
                    
                    <div className="p-4 rounded-lg border">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <div className="font-medium mb-3">Available Options</div>
                          <ul className="text-sm text-muted-foreground space-y-2">
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                              <span><strong>Include Time:</strong> Split into date and time inputs</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                              <span><strong>Date Restriction:</strong> Enable min/max limits</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                              <span><strong>Min Date:</strong> Earliest selectable date</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                              <span><strong>Max Date:</strong> Latest selectable date</span>
                            </li>
                          </ul>
                        </div>
                        <div className="space-y-3">
                          <div className="p-3 rounded bg-muted/50">
                            <div className="text-sm font-medium mb-1">Without Time</div>
                            <p className="text-xs text-muted-foreground">Single date picker showing calendar view</p>
                          </div>
                          <div className="p-3 rounded bg-muted/50">
                            <div className="text-sm font-medium mb-1">With Time</div>
                            <p className="text-xs text-muted-foreground">Date picker + separate time input (HH:MM format)</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  {/* Rating Configuration */}
                  <div>
                    <h4 className="font-semibold mb-4 flex items-center gap-2">
                      <Star className="h-5 w-5 text-primary" />
                      Rating Configuration
                    </h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Rating questions provide scale-based input with customizable appearance:
                    </p>
                    
                    <div className="p-4 rounded-lg border mb-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <div className="font-medium mb-3">Scale Settings</div>
                          <ul className="text-sm text-muted-foreground space-y-2">
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                              <span><strong>Min Value:</strong> Starting point (e.g., 1)</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                              <span><strong>Max Value:</strong> Ending point (e.g., 5, 10)</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                              <span><strong>Min Label:</strong> Text for lowest value</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                              <span><strong>Max Label:</strong> Text for highest value</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                              <span><strong>Default Value:</strong> Pre-selected rating</span>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <div className="font-medium mb-3">Display Styles</div>
                          <div className="space-y-2">
                            <div className="p-2 rounded bg-muted/50 flex items-center gap-2">
                              <span className="text-lg">1️⃣ 2️⃣ 3️⃣</span>
                              <span className="text-sm">Numbers</span>
                            </div>
                            <div className="p-2 rounded bg-muted/50 flex items-center gap-2">
                              <span className="text-lg">⭐⭐⭐</span>
                              <span className="text-sm">Stars</span>
                            </div>
                            <div className="p-2 rounded bg-muted/50 flex items-center gap-2">
                              <span className="text-lg">😀😐😢</span>
                              <span className="text-sm">Smileys</span>
                            </div>
                            <div className="p-2 rounded bg-muted/50 flex items-center gap-2">
                              <span className="text-lg">❤️❤️❤️</span>
                              <span className="text-sm">Hearts</span>
                            </div>
                            <div className="p-2 rounded bg-muted/50 flex items-center gap-2">
                              <span className="text-lg">👍👎</span>
                              <span className="text-sm">Thumbs</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-3 rounded-lg bg-muted/30 border text-sm">
                      <strong>Example:</strong> NPS (Net Promoter Score) uses Min: 0, Max: 10, 
                      Min Label: "Not Likely", Max Label: "Very Likely", Display: Numbers
                    </div>
                  </div>
                  
                  <Separator />
                  
                  {/* Boolean Configuration */}
                  <div>
                    <h4 className="font-semibold mb-4 flex items-center gap-2">
                      <ToggleLeft className="h-5 w-5 text-primary" />
                      Boolean Configuration
                    </h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Boolean questions provide simple true/false or yes/no answers:
                    </p>
                    
                    <div className="p-4 rounded-lg border">
                      <div className="flex items-center gap-4">
                        <div className="flex-1">
                          <div className="font-medium mb-2">Configuration</div>
                          <ul className="text-sm text-muted-foreground space-y-2">
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                              <span><strong>Default Value:</strong> Toggle switch to set initial state (ON/OFF)</span>
                            </li>
                          </ul>
                        </div>
                        <div className="p-4 rounded bg-muted/50 text-center">
                          <div className="text-sm font-medium mb-2">Preview</div>
                          <div className="flex items-center gap-2 text-sm">
                            <span className="text-muted-foreground">OFF</span>
                            <div className="w-12 h-6 bg-primary rounded-full relative">
                              <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                            </div>
                            <span>ON</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  {/* File Attachment Configuration */}
                  <div>
                    <h4 className="font-semibold mb-4 flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary" />
                      File Attachment Configuration
                    </h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Document (File Attachment) questions allow users to upload files with configurable restrictions:
                    </p>
                    
                    <div className="p-4 rounded-lg border">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <div className="font-medium mb-3">Configuration Options</div>
                          <ul className="text-sm text-muted-foreground space-y-2">
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                              <span><strong>Allowed File Types:</strong> Select from PDF, Word, Excel, PowerPoint, Text, Images</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                              <span><strong>Max File Size:</strong> Limit in MB (default: 10 MB)</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                              <span><strong>Number of Files:</strong> Maximum uploads allowed (1-20, default: 3)</span>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <div className="font-medium mb-3">File Type Extensions</div>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="p-2 rounded bg-muted/50">
                              <strong>PDF:</strong> .pdf
                            </div>
                            <div className="p-2 rounded bg-muted/50">
                              <strong>Word:</strong> .doc, .docx
                            </div>
                            <div className="p-2 rounded bg-muted/50">
                              <strong>Excel:</strong> .xls, .xlsx
                            </div>
                            <div className="p-2 rounded bg-muted/50">
                              <strong>PowerPoint:</strong> .ppt, .pptx
                            </div>
                            <div className="p-2 rounded bg-muted/50">
                              <strong>Text:</strong> .txt
                            </div>
                            <div className="p-2 rounded bg-muted/50">
                              <strong>Images:</strong> .jpg, .png, .gif
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  {/* Downloadable Document Configuration */}
                  <div>
                    <h4 className="font-semibold mb-4 flex items-center gap-2">
                      <ArrowRight className="h-5 w-5 text-primary" />
                      Downloadable Document Configuration
                    </h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Downloadable Document questions provide files for users to download (e.g., terms, instructions, templates):
                    </p>
                    
                    <div className="p-4 rounded-lg border">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <div className="font-medium mb-3">Configuration Options</div>
                          <ul className="text-sm text-muted-foreground space-y-2">
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                              <span><strong>File Upload:</strong> Drag & drop or click to attach document</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                              <span><strong>File Name:</strong> Displayed name for the download</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                              <span><strong>File URL:</strong> Link to the file (auto-generated)</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                              <span><strong>File Type:</strong> Detected file format</span>
                            </li>
                          </ul>
                        </div>
                        <div className="p-3 rounded bg-muted/50">
                          <div className="text-sm font-medium mb-2">Use Cases</div>
                          <ul className="text-xs text-muted-foreground space-y-1">
                            <li>• Terms and Conditions documents</li>
                            <li>• Instruction manuals</li>
                            <li>• Template files for completion</li>
                            <li>• Reference materials</li>
                            <li>• Compliance forms</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  {/* Answer Set Library */}
                  <div>
                    <h4 className="font-semibold mb-4">Answer Set Library</h4>
                    <div className="p-4 rounded-lg border">
                      <div className="flex items-center gap-2 mb-3">
                        <Plus className="h-5 w-5 text-primary" />
                        <span className="font-medium">"Add from Existing" Feature</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">
                        Quickly populate your answer set from a library of common, reusable answer templates. 
                        Available only for choice-based question types.
                      </p>
                      
                      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="p-3 rounded bg-muted/50 text-center">
                          <div className="text-sm font-medium">Yes / No</div>
                          <p className="text-xs text-muted-foreground">Simple binary choice</p>
                        </div>
                        <div className="p-3 rounded bg-muted/50 text-center">
                          <div className="text-sm font-medium">NPS Scale</div>
                          <p className="text-xs text-muted-foreground">0-10 rating options</p>
                        </div>
                        <div className="p-3 rounded bg-muted/50 text-center">
                          <div className="text-sm font-medium">Priority Levels</div>
                          <p className="text-xs text-muted-foreground">Low, Medium, High, Critical</p>
                        </div>
                        <div className="p-3 rounded bg-muted/50 text-center">
                          <div className="text-sm font-medium">Satisfaction</div>
                          <p className="text-xs text-muted-foreground">Very Unsatisfied to Very Satisfied</p>
                        </div>
                        <div className="p-3 rounded bg-muted/50 text-center">
                          <div className="text-sm font-medium">Agreement Scale</div>
                          <p className="text-xs text-muted-foreground">Strongly Disagree to Strongly Agree</p>
                        </div>
                        <div className="p-3 rounded bg-muted/50 text-center">
                          <div className="text-sm font-medium">Frequency</div>
                          <p className="text-xs text-muted-foreground">Never, Sometimes, Often, Always</p>
                        </div>
                      </div>
                      
                      <div className="mt-4 p-3 rounded-lg bg-muted/30 border-dashed border">
                        <p className="text-xs text-muted-foreground">
                          <strong>Note:</strong> The library picker includes a search bar. Selecting a template replaces the current answer set's content while preserving its ID. 
                          This feature is hidden for simple types (Text, Number, Date, Rating, Boolean) and when Dynamic Values is enabled.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  {/* Multiple Answer Sets */}
                  <div>
                    <h4 className="font-semibold mb-4">Multiple Answer Sets per Question</h4>
                    <div className="p-4 rounded-lg border">
                      <p className="text-sm text-muted-foreground mb-4">
                        A single question can have multiple answer sets. Use this when different scenarios require different answer options:
                      </p>
                      
                      <div className="flex items-center gap-2 text-sm mb-4">
                        <Badge variant="outline">Default Set</Badge>
                        <span className="text-muted-foreground">+</span>
                        <Badge variant="outline">Answer-Level Rule Set 1</Badge>
                        <span className="text-muted-foreground">+</span>
                        <Badge variant="outline">Answer-Level Rule Set 2</Badge>
                      </div>
                      
                      <div className="p-3 rounded bg-muted/50 text-sm">
                        <strong>Example:</strong> A "What type of hardware?" question might show "Laptop, Desktop, Printer" 
                        by default, but show "iPhone, Android, Tablet" when the user previously selected "Mobile Device" 
                        as their department.
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-muted/50 border">
                    <div className="text-sm font-medium mb-2">💡 Answer Set Initialization</div>
                    <p className="text-sm text-muted-foreground">
                      Every new answer set (standard or inline) is automatically initialized with appropriate defaults based on question type:
                    </p>
                    <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                      <li>• <strong>Choice types:</strong> One empty answer with blank label/value, marked active</li>
                      <li>• <strong>Number types:</strong> Min/Max values set to undefined (no restrictions)</li>
                      <li>• <strong>Date types:</strong> Date restriction disabled by default</li>
                      <li>• <strong>Rating types:</strong> Scale 1-5 with "Numbers" display style</li>
                      <li>• <strong>Boolean types:</strong> Default value set to false (OFF)</li>
                    </ul>
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
                    Instead of manually defining static answer options, Dynamic Values allow you to populate answer sets 
                    from external data sources in real-time. This is ideal for data that changes frequently or is managed centrally.
                  </p>
                  
                  {/* Dynamic Values Flow Diagram */}
                  <div className="p-6 rounded-lg border bg-muted/30 overflow-x-auto">
                    <h4 className="font-semibold mb-6 text-center">Dynamic Values Data Flow</h4>
                    
                    <div className="min-w-[800px]">
                      <div className="flex items-start gap-4 justify-center">
                        
                        {/* Step 1: Data Source */}
                        <div className="flex flex-col items-center gap-3">
                          <div className="p-4 rounded-xl border-2 border-blue-500 bg-blue-500/5 min-w-[160px]">
                            <Database className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                            <div className="text-sm font-medium text-center">Data Source</div>
                            <div className="text-xs text-muted-foreground text-center mt-1">External Table</div>
                          </div>
                          <div className="p-3 rounded-lg border bg-background text-xs">
                            <div className="font-mono space-y-1">
                              <div className="flex gap-4"><span className="text-muted-foreground">id</span><span className="text-muted-foreground">name</span><span className="text-muted-foreground">region</span></div>
                              <div className="flex gap-4"><span>1</span><span>Sales</span><span>NA</span></div>
                              <div className="flex gap-4"><span>2</span><span>Support</span><span>EU</span></div>
                              <div className="flex gap-4"><span>3</span><span>IT</span><span>NA</span></div>
                              <div className="flex gap-4"><span>4</span><span>HR</span><span>APAC</span></div>
                              <div className="flex gap-4"><span>5</span><span>Finance</span><span>NA</span></div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Arrow */}
                        <div className="flex flex-col items-center justify-center pt-12">
                          <ArrowRight className="h-6 w-6 text-muted-foreground" />
                        </div>
                        
                        {/* Step 2: Filter */}
                        <div className="flex flex-col items-center gap-3">
                          <div className="p-4 rounded-xl border-2 border-amber-500 bg-amber-500/5 min-w-[180px]">
                            <Filter className="h-8 w-8 text-amber-500 mx-auto mb-2" />
                            <div className="text-sm font-medium text-center">Apply Filters</div>
                            <div className="text-xs text-muted-foreground text-center mt-1">AND/OR Logic</div>
                          </div>
                          <div className="p-3 rounded-lg border bg-background">
                            <div className="space-y-2 text-xs">
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="text-[10px]">AND</Badge>
                              </div>
                              <div className="ml-2 space-y-1 border-l-2 border-amber-500/30 pl-2">
                                <div className="p-1.5 rounded bg-amber-500/10 text-amber-700">
                                  region = "NA"
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="text-xs text-muted-foreground text-center">
                            <span className="text-amber-500">3 rows</span> match filter
                          </div>
                        </div>
                        
                        {/* Arrow */}
                        <div className="flex flex-col items-center justify-center pt-12">
                          <ArrowRight className="h-6 w-6 text-muted-foreground" />
                        </div>
                        
                        {/* Step 3: Map Fields */}
                        <div className="flex flex-col items-center gap-3">
                          <div className="p-4 rounded-xl border-2 border-purple-500 bg-purple-500/5 min-w-[160px]">
                            <ArrowUpDown className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                            <div className="text-sm font-medium text-center">Map & Sort</div>
                            <div className="text-xs text-muted-foreground text-center mt-1">Label/Value Fields</div>
                          </div>
                          <div className="p-3 rounded-lg border bg-background text-xs">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <span className="text-muted-foreground">Label:</span>
                                <Badge variant="secondary" className="text-[10px]">name</Badge>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-muted-foreground">Value:</span>
                                <Badge variant="secondary" className="text-[10px]">id</Badge>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-muted-foreground">Sort:</span>
                                <Badge variant="secondary" className="text-[10px]">name ASC</Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Arrow */}
                        <div className="flex flex-col items-center justify-center pt-12">
                          <ArrowRight className="h-6 w-6 text-muted-foreground" />
                        </div>
                        
                        {/* Step 4: Answer Set Output */}
                        <div className="flex flex-col items-center gap-3">
                          <div className="p-4 rounded-xl border-2 border-green-500 bg-green-500/5 min-w-[160px]">
                            <ListChecks className="h-8 w-8 text-green-500 mx-auto mb-2" />
                            <div className="text-sm font-medium text-center">Answer Set</div>
                            <div className="text-xs text-muted-foreground text-center mt-1">Rendered Options</div>
                          </div>
                          <div className="p-3 rounded-lg border-2 border-green-500/50 bg-green-500/5">
                            <div className="space-y-1.5 text-xs">
                              <div className="flex items-center gap-2 p-1.5 rounded bg-background">
                                <CircleDot className="h-3 w-3 text-muted-foreground" />
                                <span>Finance</span>
                                <span className="text-muted-foreground ml-auto">(5)</span>
                              </div>
                              <div className="flex items-center gap-2 p-1.5 rounded bg-background">
                                <CircleDot className="h-3 w-3 text-muted-foreground" />
                                <span>IT</span>
                                <span className="text-muted-foreground ml-auto">(3)</span>
                              </div>
                              <div className="flex items-center gap-2 p-1.5 rounded bg-background">
                                <CircleDot className="h-3 w-3 text-muted-foreground" />
                                <span>Sales</span>
                                <span className="text-muted-foreground ml-auto">(1)</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-xs text-center">
                            <span className="text-green-500 font-medium">Sorted A→Z</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Flow Description */}
                      <div className="mt-6 pt-4 border-t">
                        <div className="flex justify-center gap-6 text-xs">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                            <span className="text-muted-foreground">Data Source (5 rows)</span>
                          </div>
                          <ArrowRight className="h-4 w-4 text-muted-foreground" />
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                            <span className="text-muted-foreground">Filtered (3 rows)</span>
                          </div>
                          <ArrowRight className="h-4 w-4 text-muted-foreground" />
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                            <span className="text-muted-foreground">Mapped & Sorted</span>
                          </div>
                          <ArrowRight className="h-4 w-4 text-muted-foreground" />
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            <span className="text-muted-foreground">Rendered to User</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-xs text-muted-foreground text-center mt-4 max-w-2xl mx-auto">
                      Dynamic Values fetch data from external tables at runtime, apply filter conditions, map label/value fields, 
                      sort results, and render the final options to users. Changes in the source data are automatically reflected.
                    </p>
                  </div>
                  
                  {/* Nested Filter Example */}
                  <div className="p-4 rounded-lg border bg-muted/30">
                    <h5 className="font-semibold mb-4">Nested Filter Groups</h5>
                    <p className="text-xs text-muted-foreground mb-4">
                      Filters support complex nested AND/OR logic for precise data selection:
                    </p>
                    
                    <div className="flex flex-col lg:flex-row gap-4 justify-center">
                      {/* Simple Filter */}
                      <div className="p-3 rounded-lg border bg-background min-w-[200px]">
                        <div className="text-xs font-medium mb-2">Simple Filter</div>
                        <div className="space-y-1 text-xs font-mono">
                          <div className="p-1.5 rounded bg-amber-500/10">status = "active"</div>
                        </div>
                      </div>
                      
                      {/* AND Filter */}
                      <div className="p-3 rounded-lg border bg-background min-w-[220px]">
                        <div className="text-xs font-medium mb-2 flex items-center gap-2">
                          <Badge className="bg-rose-500 text-[10px]">AND</Badge>
                          Multiple Conditions
                        </div>
                        <div className="space-y-1 text-xs font-mono border-l-2 border-rose-500/50 pl-2">
                          <div className="p-1.5 rounded bg-rose-500/10">region = "NA"</div>
                          <div className="p-1.5 rounded bg-rose-500/10">active = true</div>
                          <div className="p-1.5 rounded bg-rose-500/10">type != "internal"</div>
                        </div>
                      </div>
                      
                      {/* Nested Filter */}
                      <div className="p-3 rounded-lg border bg-background min-w-[260px]">
                        <div className="text-xs font-medium mb-2 flex items-center gap-2">
                          <Badge className="bg-purple-500 text-[10px]">Nested</Badge>
                          Complex Logic
                        </div>
                        <div className="space-y-2 text-xs font-mono">
                          <div className="border-l-2 border-blue-500/50 pl-2">
                            <Badge variant="outline" className="text-[9px] mb-1">OR</Badge>
                            <div className="space-y-1">
                              <div className="p-1.5 rounded bg-blue-500/10">region = "NA"</div>
                              <div className="p-1.5 rounded bg-blue-500/10">region = "EU"</div>
                            </div>
                          </div>
                          <div className="text-center text-muted-foreground">AND</div>
                          <div className="p-1.5 rounded bg-amber-500/10">active = true</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  {/* Supported Question Types */}
                  <div>
                    <h4 className="font-semibold mb-4">Supported Question Types</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Dynamic Values are available only for choice-based question types:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary" className="gap-1">
                        <ListChecks className="h-3 w-3" />
                        Choice-options
                      </Badge>
                      <Badge variant="secondary" className="gap-1">
                        <ChevronRight className="h-3 w-3" />
                        Dropdown
                      </Badge>
                      <Badge variant="secondary" className="gap-1">
                        <CircleDot className="h-3 w-3" />
                        Radio Button
                      </Badge>
                      <Badge variant="secondary" className="gap-1">
                        <CheckSquare className="h-3 w-3" />
                        Multi-Select
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-3">
                      Simple types (Text, Number, Date, Rating, Boolean) do not support Dynamic Values as they don't have selectable options.
                    </p>
                  </div>
                  
                  <Separator />
                  
                  {/* Enabling Dynamic Values */}
                  <div>
                    <h4 className="font-semibold mb-4">Enabling Dynamic Values</h4>
                    <div className="space-y-4">
                      <div className="flex gap-4 p-4 rounded-lg border">
                        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-primary-foreground font-bold text-sm shrink-0">
                          1
                        </div>
                        <div>
                          <div className="font-medium">Locate the Dynamic Values Toggle</div>
                          <p className="text-sm text-muted-foreground mt-1">
                            In the Answer Set Editor, find the "Dynamic Values" switch toggle. This appears only for Choice, Radio Button, and Multi-Select questions.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex gap-4 p-4 rounded-lg border">
                        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-primary-foreground font-bold text-sm shrink-0">
                          2
                        </div>
                        <div>
                          <div className="font-medium">Enable the Toggle</div>
                          <p className="text-sm text-muted-foreground mt-1">
                            Click the toggle to enable Dynamic Values. This opens a 40%-width configuration panel on the right side of the editor.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex gap-4 p-4 rounded-lg border">
                        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-primary-foreground font-bold text-sm shrink-0">
                          3
                        </div>
                        <div>
                          <div className="font-medium">Configure Data Source</div>
                          <p className="text-sm text-muted-foreground mt-1">
                            Set up the table, field mappings, filters, and sorting in the configuration panel. 
                            Changes are saved automatically when you close the panel.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 p-3 rounded-lg bg-muted/30 border">
                      <p className="text-xs text-muted-foreground">
                        <strong>Note:</strong> When Dynamic Values is enabled, the "Add from Existing" library button is hidden, 
                        as answers are populated from the data source instead of static templates.
                      </p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  {/* Configuration Panel */}
                  <div>
                    <h4 className="font-semibold mb-4">Configuration Panel</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      The Dynamic Values panel slides in from the right and contains all settings for your data source:
                    </p>
                    
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-3">
                          <Database className="h-5 w-5 text-primary" />
                          <span className="font-medium">Data Source</span>
                        </div>
                        <div className="space-y-3">
                          <div className="p-3 rounded bg-muted/50">
                            <div className="text-xs font-medium text-muted-foreground mb-1">Table Name</div>
                            <p className="text-sm">Select the database table to query</p>
                          </div>
                          <div className="p-3 rounded bg-muted/50">
                            <div className="text-xs font-medium text-muted-foreground mb-1">Label Field</div>
                            <p className="text-sm">Column displayed to users (e.g., "name", "title")</p>
                          </div>
                          <div className="p-3 rounded bg-muted/50">
                            <div className="text-xs font-medium text-muted-foreground mb-1">Value Field</div>
                            <p className="text-sm">Column stored as the answer value (e.g., "id", "code")</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-3">
                          <ArrowUpDown className="h-5 w-5 text-primary" />
                          <span className="font-medium">Sorting</span>
                        </div>
                        <div className="space-y-3">
                          <div className="p-3 rounded bg-muted/50">
                            <div className="text-xs font-medium text-muted-foreground mb-1">Order By Field</div>
                            <p className="text-sm">Column to sort results by</p>
                          </div>
                          <div className="p-3 rounded bg-muted/50">
                            <div className="text-xs font-medium text-muted-foreground mb-1">Order Direction</div>
                            <p className="text-sm">Ascending (A→Z, 1→9) or Descending (Z→A, 9→1)</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  {/* Filter Groups */}
                  <div>
                    <h4 className="font-semibold mb-4 flex items-center gap-2">
                      <Filter className="h-5 w-5 text-primary" />
                      Filter Groups
                    </h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Filter groups allow you to define complex conditions to narrow down which records appear as answer options.
                      Use nested AND/OR logic for sophisticated filtering.
                    </p>
                    
                    <div className="p-4 rounded-lg bg-muted/30 border mb-4">
                      <div className="font-mono text-sm space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">AND</Badge>
                          <span>All conditions in this group must match</span>
                        </div>
                        <div className="ml-4 border-l-2 border-muted-foreground/30 pl-3 space-y-1">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <span>status</span>
                            <Badge variant="secondary" className="text-xs">equals</Badge>
                            <span>"active"</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">OR</Badge>
                            <span className="text-xs text-muted-foreground">Any condition matches</span>
                          </div>
                          <div className="ml-4 border-l-2 border-muted-foreground/20 pl-3 space-y-1">
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <span>department</span>
                              <Badge variant="secondary" className="text-xs">equals</Badge>
                              <span>"IT"</span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <span>department</span>
                              <Badge variant="secondary" className="text-xs">equals</Badge>
                              <span>"HR"</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="p-3 rounded-lg border">
                        <div className="font-medium text-sm mb-2">Filter Structure</div>
                        <ul className="text-xs text-muted-foreground space-y-1">
                          <li>• <strong>Field:</strong> Database column to check</li>
                          <li>• <strong>Operator:</strong> Comparison type</li>
                          <li>• <strong>Value:</strong> Value to compare against</li>
                        </ul>
                      </div>
                      
                      <div className="p-3 rounded-lg border">
                        <div className="font-medium text-sm mb-2">Group Actions</div>
                        <ul className="text-xs text-muted-foreground space-y-1">
                          <li>• <strong>Add Filter:</strong> New condition in group</li>
                          <li>• <strong>Add Group:</strong> Nested AND/OR group</li>
                          <li>• <strong>Toggle AND/OR:</strong> Switch group logic</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  {/* Available Operators */}
                  <div>
                    <h4 className="font-semibold mb-4">Available Filter Operators</h4>
                    <div className="grid gap-2 sm:grid-cols-4">
                      <div className="p-2 rounded border text-center text-sm">
                        <div className="font-medium">equals</div>
                        <p className="text-xs text-muted-foreground">Exact match</p>
                      </div>
                      <div className="p-2 rounded border text-center text-sm">
                        <div className="font-medium">not_equals</div>
                        <p className="text-xs text-muted-foreground">Not matching</p>
                      </div>
                      <div className="p-2 rounded border text-center text-sm">
                        <div className="font-medium">greater_than</div>
                        <p className="text-xs text-muted-foreground">Numeric/date comparison</p>
                      </div>
                      <div className="p-2 rounded border text-center text-sm">
                        <div className="font-medium">less_than</div>
                        <p className="text-xs text-muted-foreground">Numeric/date comparison</p>
                      </div>
                      <div className="p-2 rounded border text-center text-sm">
                        <div className="font-medium">contains</div>
                        <p className="text-xs text-muted-foreground">Partial text match</p>
                      </div>
                      <div className="p-2 rounded border text-center text-sm">
                        <div className="font-medium">not_contains</div>
                        <p className="text-xs text-muted-foreground">Excludes text</p>
                      </div>
                      <div className="p-2 rounded border text-center text-sm">
                        <div className="font-medium">starts_with</div>
                        <p className="text-xs text-muted-foreground">Prefix match</p>
                      </div>
                      <div className="p-2 rounded border text-center text-sm">
                        <div className="font-medium">ends_with</div>
                        <p className="text-xs text-muted-foreground">Suffix match</p>
                      </div>
                      <div className="p-2 rounded border text-center text-sm">
                        <div className="font-medium">is_null</div>
                        <p className="text-xs text-muted-foreground">Field is empty</p>
                      </div>
                      <div className="p-2 rounded border text-center text-sm">
                        <div className="font-medium">is_not_null</div>
                        <p className="text-xs text-muted-foreground">Field has value</p>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  {/* Summary Card */}
                  <div>
                    <h4 className="font-semibold mb-4">Configuration Summary</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Once configured, the Answer Set Editor displays a summary card instead of manual answer inputs:
                    </p>
                    
                    <div className="p-4 rounded-lg border bg-muted/30">
                      <div className="flex items-start gap-3">
                        <Database className="h-5 w-5 text-primary mt-0.5" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">Dynamic Values Configured</span>
                            <Pencil className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <div className="mt-2 grid gap-2 text-sm">
                            <div className="flex items-center gap-2">
                              <span className="text-muted-foreground">Table:</span>
                              <Badge variant="outline" className="text-xs">employees</Badge>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-muted-foreground">Label → Value:</span>
                              <span className="font-mono text-xs">full_name → employee_id</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-muted-foreground">Filters:</span>
                              <Badge variant="secondary" className="text-xs">2 active</Badge>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-muted-foreground">Sort:</span>
                              <span className="font-mono text-xs">full_name ASC</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-xs text-muted-foreground mt-3">
                      Click the edit icon on the summary card to reopen the configuration panel and modify settings.
                    </p>
                  </div>
                  
                  <Separator />
                  
                  {/* Data Persistence */}
                  <div>
                    <h4 className="font-semibold mb-4">Data Persistence</h4>
                    <div className="p-4 rounded-lg bg-muted/50 border">
                      <p className="text-sm text-muted-foreground mb-3">
                        Dynamic Values configuration is fully persisted with your questionnaire:
                      </p>
                      <ul className="text-sm text-muted-foreground space-y-2">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                          <span>Table name, field mappings, and sort order are saved</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                          <span>Complete filter group structure with nested logic is preserved</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                          <span>Configuration survives draft saves and template creation</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                          <span>Reopening the panel loads existing configuration for editing</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-muted/50 border">
                    <div className="text-sm font-medium mb-2">💡 Use Cases for Dynamic Values</div>
                    <div className="grid gap-3 sm:grid-cols-2 text-sm text-muted-foreground">
                      <div>
                        <strong>Employee Directories:</strong> Pull names from HR database
                      </div>
                      <div>
                        <strong>Product Catalogs:</strong> Show current inventory items
                      </div>
                      <div>
                        <strong>Location Lists:</strong> Active office locations
                      </div>
                      <div>
                        <strong>Department Lists:</strong> Currently active departments
                      </div>
                    </div>
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
                    <div>
                      <CardTitle>Conditional Branching</CardTitle>
                      <CardDescription>
                        Create dynamic questionnaire paths that adapt based on user responses
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground">
                    Conditional Branching enables you to create dynamic, adaptive questionnaires where 
                    different questions appear based on previous answers. This creates personalized 
                    experiences and collects relevant data efficiently.
                  </p>
                  
                  {/* Branching Flow Diagram */}
                  <div className="p-6 rounded-lg border bg-muted/30 overflow-x-auto">
                    <h4 className="font-semibold mb-6 text-center">Conditional Branching Flow</h4>
                    
                    <div className="min-w-[700px]">
                      {/* Flow Diagram */}
                      <div className="flex flex-col items-center gap-4">
                        
                        {/* Step 1: User Answer */}
                        <div className="flex items-center gap-6">
                          <div className="flex flex-col items-center gap-2">
                            <div className="p-4 rounded-xl border-2 border-primary bg-primary/5">
                              <HelpCircle className="h-8 w-8 text-primary" />
                            </div>
                            <span className="text-sm font-medium">User Answers</span>
                            <span className="text-xs text-muted-foreground">Trigger Question</span>
                          </div>
                        </div>
                        
                        {/* Arrow Down */}
                        <div className="flex flex-col items-center">
                          <div className="w-0.5 h-6 bg-muted-foreground/40"></div>
                          <ArrowRight className="h-5 w-5 text-muted-foreground rotate-90" />
                        </div>
                        
                        {/* Step 2: Rule Evaluation */}
                        <div className="p-5 rounded-xl border-2 border-amber-500 bg-amber-500/5 min-w-[300px]">
                          <div className="font-bold text-amber-500 text-center mb-3">Rule Evaluation Engine</div>
                          <div className="text-xs text-muted-foreground space-y-2">
                            <div className="flex items-center gap-2">
                              <Filter className="h-3 w-3" />
                              <span>Evaluate RuleGroup conditions</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <ArrowUpDown className="h-3 w-3" />
                              <span>Apply AND/OR match logic</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CheckCircle className="h-3 w-3" />
                              <span>Compare against response values</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Arrow Down to Decision */}
                        <div className="flex flex-col items-center">
                          <div className="w-0.5 h-6 bg-muted-foreground/40"></div>
                          <ArrowRight className="h-5 w-5 text-muted-foreground rotate-90" />
                        </div>
                        
                        {/* Decision Diamond */}
                        <div className="relative">
                          <div className="w-32 h-32 border-2 border-blue-500 bg-blue-500/5 rotate-45 flex items-center justify-center">
                            <span className="font-bold text-blue-500 text-sm -rotate-45">Condition<br/>Met?</span>
                          </div>
                        </div>
                        
                        {/* Two Branches */}
                        <div className="flex items-start gap-16 mt-2">
                          {/* Yes Branch */}
                          <div className="flex flex-col items-center gap-3">
                            <Badge className="bg-green-500 text-white">YES</Badge>
                            <div className="w-0.5 h-6 bg-green-500/50"></div>
                            <div className="p-4 rounded-xl border-2 border-green-500 bg-green-500/5">
                              <div className="flex items-center gap-2">
                                <Eye className="h-5 w-5 text-green-500" />
                                <span className="font-medium text-green-500">Show</span>
                              </div>
                            </div>
                            <div className="text-xs text-muted-foreground text-center max-w-[140px]">
                              Branch questions become visible
                            </div>
                          </div>
                          
                          {/* No Branch */}
                          <div className="flex flex-col items-center gap-3">
                            <Badge variant="secondary">NO</Badge>
                            <div className="w-0.5 h-6 bg-muted-foreground/30"></div>
                            <div className="p-4 rounded-xl border-2 border-muted-foreground/50 bg-muted/30">
                              <div className="flex items-center gap-2">
                                <EyeOff className="h-5 w-5 text-muted-foreground" />
                                <span className="font-medium text-muted-foreground">Hide</span>
                              </div>
                            </div>
                            <div className="text-xs text-muted-foreground text-center max-w-[140px]">
                              Branch stays hidden, skip to next
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Rule Evaluation Logic Diagram */}
                  <div className="p-6 rounded-lg border bg-muted/30">
                    <h4 className="font-semibold mb-4 text-center">Rule Evaluation Logic</h4>
                    <p className="text-xs text-muted-foreground text-center mb-6">
                      Rules support complex nested AND/OR conditions with multiple operators
                    </p>
                    
                    <div className="flex flex-col lg:flex-row gap-6 justify-center">
                      {/* AND Logic Example */}
                      <div className="p-4 rounded-lg border-2 border-rose-500/50 bg-rose-500/5 min-w-[250px]">
                        <div className="flex items-center gap-2 mb-3">
                          <Badge className="bg-rose-500">AND</Badge>
                          <span className="text-sm font-medium">All must match</span>
                        </div>
                        <div className="space-y-2 text-xs">
                          <div className="flex items-center gap-2 p-2 rounded bg-background/50">
                            <CheckCircle className="h-3 w-3 text-green-500" />
                            <span>Department = "IT"</span>
                          </div>
                          <div className="flex items-center gap-2 p-2 rounded bg-background/50">
                            <CheckCircle className="h-3 w-3 text-green-500" />
                            <span>Priority = "High"</span>
                          </div>
                          <div className="flex items-center gap-2 p-2 rounded bg-background/50">
                            <CheckCircle className="h-3 w-3 text-green-500" />
                            <span>Type = "Hardware"</span>
                          </div>
                        </div>
                        <div className="mt-3 pt-3 border-t text-xs text-center">
                          <span className="text-green-500 font-medium">✓ Result: TRUE</span>
                          <span className="text-muted-foreground"> (3/3 match)</span>
                        </div>
                      </div>
                      
                      {/* OR Logic Example */}
                      <div className="p-4 rounded-lg border-2 border-blue-500/50 bg-blue-500/5 min-w-[250px]">
                        <div className="flex items-center gap-2 mb-3">
                          <Badge className="bg-blue-500">OR</Badge>
                          <span className="text-sm font-medium">Any can match</span>
                        </div>
                        <div className="space-y-2 text-xs">
                          <div className="flex items-center gap-2 p-2 rounded bg-background/50">
                            <CheckCircle className="h-3 w-3 text-green-500" />
                            <span>Role = "Admin"</span>
                          </div>
                          <div className="flex items-center gap-2 p-2 rounded bg-background/50">
                            <span className="h-3 w-3 text-muted-foreground">✗</span>
                            <span className="text-muted-foreground">Role = "Manager"</span>
                          </div>
                          <div className="flex items-center gap-2 p-2 rounded bg-background/50">
                            <span className="h-3 w-3 text-muted-foreground">✗</span>
                            <span className="text-muted-foreground">Role = "Supervisor"</span>
                          </div>
                        </div>
                        <div className="mt-3 pt-3 border-t text-xs text-center">
                          <span className="text-green-500 font-medium">✓ Result: TRUE</span>
                          <span className="text-muted-foreground"> (1/3 match)</span>
                        </div>
                      </div>
                      
                      {/* Nested Logic Example */}
                      <div className="p-4 rounded-lg border-2 border-purple-500/50 bg-purple-500/5 min-w-[250px]">
                        <div className="flex items-center gap-2 mb-3">
                          <Badge className="bg-purple-500">Nested</Badge>
                          <span className="text-sm font-medium">Combined logic</span>
                        </div>
                        <div className="space-y-2 text-xs">
                          <div className="p-2 rounded border border-rose-500/30 bg-rose-500/5">
                            <div className="flex items-center gap-1 mb-1">
                              <Badge variant="outline" className="text-[10px] px-1">AND</Badge>
                            </div>
                            <div className="ml-2 space-y-1">
                              <div className="flex items-center gap-1">
                                <CheckCircle className="h-2.5 w-2.5 text-green-500" />
                                <span>Type = "Software"</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <CheckCircle className="h-2.5 w-2.5 text-green-500" />
                                <span>Urgent = true</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-center text-muted-foreground font-bold">OR</div>
                          <div className="p-2 rounded border border-muted-foreground/30 bg-muted/30">
                            <div className="flex items-center gap-1 mb-1">
                              <Badge variant="outline" className="text-[10px] px-1">AND</Badge>
                            </div>
                            <div className="ml-2 space-y-1 text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <span className="h-2.5 w-2.5">✗</span>
                                <span>VIP = true</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="mt-3 pt-3 border-t text-xs text-center">
                          <span className="text-green-500 font-medium">✓ Result: TRUE</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Operators Reference */}
                  <div className="p-4 rounded-lg border bg-muted/30">
                    <h4 className="font-semibold mb-3">Supported Operators</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">equals</Badge>
                      <Badge variant="outline">not_equals</Badge>
                      <Badge variant="outline">contains</Badge>
                      <Badge variant="outline">not_contains</Badge>
                      <Badge variant="outline">greater_than</Badge>
                      <Badge variant="outline">less_than</Badge>
                      <Badge variant="outline">starts_with</Badge>
                      <Badge variant="outline">ends_with</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-3">
                      Operators are applied to compare the user's response value against the rule's target value.
                      Numeric comparisons work with Number, Decimal, and Rating types. Text comparisons work with all string-based types.
                    </p>
                  </div>
                  
                  <Separator />
                  
                  {/* Two Levels of Branching */}
                  <div>
                    <h4 className="font-semibold mb-4">Two Levels of Branching</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      The questionnaire builder supports two distinct levels of conditional logic:
                    </p>
                    
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="p-4 rounded-lg border bg-muted/30">
                        <div className="flex items-center gap-2 mb-3">
                          <GitBranch className="h-5 w-5 text-primary" />
                          <span className="font-medium">Question-Level Branching</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          Determines whether an entire branch (and all its questions) should be shown or hidden.
                        </p>
                        <ul className="text-xs text-muted-foreground space-y-1">
                          <li>• Configured in the <strong>Branch Editor</strong></li>
                          <li>• Uses "Branch Rules (Question-Level)"</li>
                          <li>• Controls visibility of entire question groups</li>
                          <li>• Based on answers from preceding questions</li>
                        </ul>
                      </div>
                      
                      <div className="p-4 rounded-lg border bg-muted/30">
                        <div className="flex items-center gap-2 mb-3">
                          <ListChecks className="h-5 w-5 text-primary" />
                          <span className="font-medium">Answer-Level Branching</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          Controls which answer set is displayed for a specific question based on previous responses.
                        </p>
                        <ul className="text-xs text-muted-foreground space-y-1">
                          <li>• Configured in the <strong>Question Editor</strong></li>
                          <li>• Uses "Answer-Level Conditional Branching" section</li>
                          <li>• Dynamically swaps answer options</li>
                          <li>• Same question, different choices</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  {/* Branch Hierarchy */}
                  <div>
                    <h4 className="font-semibold mb-4">Branch Hierarchy Structure</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Branches exist within sections and can be nested infinitely to create complex decision trees:
                    </p>
                    
                    <div className="p-4 rounded-lg bg-muted/50 border font-mono text-sm">
                      <div className="text-foreground">📁 Section: Issue Classification</div>
                      <div className="ml-4 border-l-2 border-primary/50 pl-3 mt-2 space-y-2">
                        <div className="flex items-center gap-2">
                          <HelpCircle className="h-3 w-3" />
                          <span>What type of issue?</span>
                          <Badge variant="outline" className="text-xs">Root Question</Badge>
                        </div>
                        
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <GitBranch className="h-3 w-3 text-primary" />
                          <span>Hardware Issues Branch</span>
                          <Badge variant="secondary" className="text-xs">Level 1</Badge>
                        </div>
                        <div className="ml-4 border-l-2 border-primary/30 pl-3 space-y-2">
                          <div className="flex items-center gap-2">
                            <HelpCircle className="h-3 w-3" />
                            <span>Which hardware component?</span>
                          </div>
                          
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <GitBranch className="h-3 w-3 text-primary" />
                            <span>Monitor Issues</span>
                            <Badge variant="secondary" className="text-xs">Level 2</Badge>
                          </div>
                          <div className="ml-4 border-l-2 border-primary/20 pl-3">
                            <div className="flex items-center gap-2">
                              <HelpCircle className="h-3 w-3" />
                              <span>What's wrong with the monitor?</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <GitBranch className="h-3 w-3 text-primary" />
                          <span>Software Issues Branch</span>
                          <Badge variant="secondary" className="text-xs">Level 1</Badge>
                        </div>
                        <div className="ml-4 border-l-2 border-primary/30 pl-3">
                          <div className="flex items-center gap-2">
                            <HelpCircle className="h-3 w-3" />
                            <span>Which application?</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  {/* Creating a Branch */}
                  <div>
                    <h4 className="font-semibold mb-4">Creating a Conditional Branch</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Follow these steps to add a new conditional branch to your questionnaire:
                    </p>
                    
                    <div className="space-y-3">
                      <div className="flex gap-4 p-4 rounded-lg border">
                        <div className="flex items-center justify-center h-7 w-7 rounded-full bg-primary text-primary-foreground font-bold text-xs shrink-0">
                          1
                        </div>
                        <div>
                          <div className="font-semibold text-sm">Navigate to Section</div>
                          <p className="text-xs text-muted-foreground mt-1">
                            Expand the section where you want to add the branch. Ensure you have at least one "trigger" question that will determine when the branch appears.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex gap-4 p-4 rounded-lg border">
                        <div className="flex items-center justify-center h-7 w-7 rounded-full bg-primary text-primary-foreground font-bold text-xs shrink-0">
                          2
                        </div>
                        <div>
                          <div className="font-semibold text-sm">Click "Add Conditional Branch"</div>
                          <p className="text-xs text-muted-foreground mt-1">
                            Found in the section header actions. For nested branches, use the "Add Conditional Branch" button inside an existing branch editor.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex gap-4 p-4 rounded-lg border">
                        <div className="flex items-center justify-center h-7 w-7 rounded-full bg-primary text-primary-foreground font-bold text-xs shrink-0">
                          3
                        </div>
                        <div>
                          <div className="font-semibold text-sm">Name Your Branch</div>
                          <p className="text-xs text-muted-foreground mt-1">
                            Enter a descriptive name like "Hardware Issues Path" or "High Priority Flow" in the Branch Name field.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex gap-4 p-4 rounded-lg border">
                        <div className="flex items-center justify-center h-7 w-7 rounded-full bg-primary text-primary-foreground font-bold text-xs shrink-0">
                          4
                        </div>
                        <div>
                          <div className="font-semibold text-sm">Configure Branch Rules</div>
                          <p className="text-xs text-muted-foreground mt-1">
                            Define when this branch should appear using the Rule Group Editor. Select source questions, answer sets, operators, and target answers.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex gap-4 p-4 rounded-lg border">
                        <div className="flex items-center justify-center h-7 w-7 rounded-full bg-primary text-primary-foreground font-bold text-xs shrink-0">
                          5
                        </div>
                        <div>
                          <div className="font-semibold text-sm">Add Questions to Branch</div>
                          <p className="text-xs text-muted-foreground mt-1">
                            Click "Add Question under this Branch" to populate the branch with questions that only appear when conditions are met.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  {/* Branch Editor Layout */}
                  <div>
                    <h4 className="font-semibold mb-4">Branch Editor Layout</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      When you select a branch, the Branch Editor opens with a 20/80 split layout:
                    </p>
                    
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="font-medium">Left Panel (20%)</span>
                          <Badge variant="outline" className="text-xs">Question List</Badge>
                        </div>
                        <ul className="text-xs text-muted-foreground space-y-2">
                          <li className="flex items-start gap-2">
                            <HelpCircle className="h-3 w-3 mt-0.5 shrink-0" />
                            <span>Clickable list of all questions in this branch</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <MousePointer className="h-3 w-3 mt-0.5 shrink-0" />
                            <span>Click to select and edit a question</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Trash2 className="h-3 w-3 mt-0.5 shrink-0 text-destructive" />
                            <span>Trash icon to delete individual questions</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="h-3 w-3 mt-0.5 shrink-0 text-primary" />
                            <span>Selected question is highlighted</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="font-medium">Right Panel (80%)</span>
                          <Badge variant="outline" className="text-xs">Question Editor</Badge>
                        </div>
                        <ul className="text-xs text-muted-foreground space-y-2">
                          <li className="flex items-start gap-2">
                            <Settings className="h-3 w-3 mt-0.5 shrink-0" />
                            <span>Full Question Editor for selected question</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Type className="h-3 w-3 mt-0.5 shrink-0" />
                            <span>Question text, type, and configuration</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ListChecks className="h-3 w-3 mt-0.5 shrink-0" />
                            <span>Answer sets with all options</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <GitBranch className="h-3 w-3 mt-0.5 shrink-0" />
                            <span>Answer-level conditional branching</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  {/* Branch Rules Configuration */}
                  <div>
                    <h4 className="font-semibold mb-4">Branch Rules Configuration</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Branch rules determine when the branch and its questions become visible. The Rule Group Editor provides AND/OR logic:
                    </p>
                    
                    <div className="p-4 rounded-lg bg-muted/50 border mb-4">
                      <div className="font-mono text-sm space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">AND</Badge>
                          <span className="text-xs text-muted-foreground">All conditions must be true</span>
                        </div>
                        <div className="ml-4 border-l-2 border-muted-foreground/30 pl-3 space-y-2">
                          <div className="flex flex-wrap items-center gap-2 text-sm">
                            <Badge variant="secondary" className="text-xs">Source Question</Badge>
                            <span>"Issue Type"</span>
                            <Badge variant="outline" className="text-xs">Answer Set</Badge>
                            <span>"Categories"</span>
                          </div>
                          <div className="flex flex-wrap items-center gap-2 text-sm">
                            <Badge variant="secondary" className="text-xs">Operator</Badge>
                            <span>equals</span>
                            <Badge variant="outline" className="text-xs">Answer</Badge>
                            <span>"Hardware"</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="p-3 rounded-lg border">
                        <div className="font-medium text-sm mb-2">Rule Fields</div>
                        <ul className="text-xs text-muted-foreground space-y-1">
                          <li>• <strong>Source Question:</strong> Preceding question to check</li>
                          <li>• <strong>Answer Set:</strong> Which answer set to evaluate</li>
                          <li>• <strong>Operator:</strong> Comparison type (equals, not_equals, etc.)</li>
                          <li>• <strong>Answer:</strong> Specific answer value to match</li>
                        </ul>
                      </div>
                      
                      <div className="p-3 rounded-lg border">
                        <div className="font-medium text-sm mb-2">Important Constraints</div>
                        <ul className="text-xs text-muted-foreground space-y-1">
                          <li>• Only <strong>preceding questions</strong> appear in dropdown</li>
                          <li>• Includes inline answer sets from other branches</li>
                          <li>• Changing source question resets dependent fields</li>
                          <li>• Nested groups enable complex AND/OR logic</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  {/* Answer-Level Branching Detail */}
                  <div>
                    <h4 className="font-semibold mb-4">Answer-Level Conditional Branching</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Within the Question Editor, you can configure answer-level branching to show different answer options based on previous responses:
                    </p>
                    
                    {/* Answer-Level Branching Flow Diagram */}
                    <div className="p-6 rounded-lg border bg-muted/30 overflow-x-auto mb-6">
                      <h5 className="font-semibold mb-6 text-center">Answer Set Swap Flow</h5>
                      
                      <div className="min-w-[750px]">
                        <div className="flex flex-col items-center gap-4">
                          
                          {/* Top Row - Previous Question */}
                          <div className="flex items-center gap-4">
                            <div className="p-4 rounded-xl border-2 border-blue-500 bg-blue-500/5">
                              <div className="text-center">
                                <HelpCircle className="h-6 w-6 text-blue-500 mx-auto mb-2" />
                                <span className="text-sm font-medium">Previous Question</span>
                                <div className="text-xs text-muted-foreground mt-1">"What is your role?"</div>
                              </div>
                            </div>
                            <ArrowRight className="h-5 w-5 text-muted-foreground" />
                            <div className="p-3 rounded-lg border bg-background">
                              <div className="text-xs font-medium mb-2">User Response:</div>
                              <Badge className="bg-blue-500">"Manager"</Badge>
                            </div>
                          </div>
                          
                          {/* Arrow Down */}
                          <div className="flex flex-col items-center">
                            <div className="w-0.5 h-6 bg-muted-foreground/40"></div>
                            <ArrowRight className="h-5 w-5 text-muted-foreground rotate-90" />
                            <span className="text-xs text-muted-foreground">triggers evaluation</span>
                          </div>
                          
                          {/* Current Question with Rule Evaluation */}
                          <div className="flex items-center gap-6">
                            <div className="p-4 rounded-xl border-2 border-primary bg-primary/5">
                              <div className="text-center">
                                <HelpCircle className="h-6 w-6 text-primary mx-auto mb-2" />
                                <span className="text-sm font-medium">Current Question</span>
                                <div className="text-xs text-muted-foreground mt-1">"Select priority level"</div>
                              </div>
                            </div>
                            
                            <ArrowRight className="h-5 w-5 text-muted-foreground" />
                            
                            {/* Rule Evaluation Box */}
                            <div className="p-4 rounded-xl border-2 border-amber-500 bg-amber-500/5">
                              <div className="font-medium text-amber-500 text-sm mb-2 text-center">Evaluate Answer-Level Rules</div>
                              <div className="space-y-2 text-xs">
                                <div className="flex items-center gap-2 p-2 rounded bg-green-500/10 border border-green-500/30">
                                  <CheckCircle className="h-3 w-3 text-green-500" />
                                  <span>Rule 1: Role = "Manager"</span>
                                  <Badge variant="outline" className="text-[10px] ml-auto">MATCH</Badge>
                                </div>
                                <div className="flex items-center gap-2 p-2 rounded bg-muted/50 border">
                                  <span className="h-3 w-3 text-muted-foreground">○</span>
                                  <span className="text-muted-foreground">Rule 2: Role = "Staff"</span>
                                  <Badge variant="outline" className="text-[10px] ml-auto text-muted-foreground">skip</Badge>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Arrow Down */}
                          <div className="flex flex-col items-center">
                            <div className="w-0.5 h-6 bg-muted-foreground/40"></div>
                            <ArrowRight className="h-5 w-5 text-muted-foreground rotate-90" />
                            <span className="text-xs text-muted-foreground">first matching rule wins</span>
                          </div>
                          
                          {/* Answer Set Swap Result */}
                          <div className="flex items-start gap-8">
                            {/* Before (Default) */}
                            <div className="p-4 rounded-xl border-2 border-muted-foreground/30 bg-muted/20 opacity-50">
                              <div className="font-medium text-sm mb-3 text-center text-muted-foreground">
                                <EyeOff className="h-4 w-4 inline mr-1" />
                                Default Answer Set
                              </div>
                              <div className="space-y-1 text-xs">
                                <div className="p-2 rounded bg-background/50 text-muted-foreground">○ Low</div>
                                <div className="p-2 rounded bg-background/50 text-muted-foreground">○ Medium</div>
                                <div className="p-2 rounded bg-background/50 text-muted-foreground">○ High</div>
                              </div>
                              <div className="text-xs text-center mt-2 text-muted-foreground">Hidden</div>
                            </div>
                            
                            {/* Arrow */}
                            <div className="flex flex-col items-center justify-center h-full pt-8">
                              <ArrowRight className="h-6 w-6 text-green-500" />
                              <span className="text-xs text-green-500 font-medium">SWAP</span>
                            </div>
                            
                            {/* After (Conditional) */}
                            <div className="p-4 rounded-xl border-2 border-green-500 bg-green-500/5">
                              <div className="font-medium text-sm mb-3 text-center text-green-500">
                                <Eye className="h-4 w-4 inline mr-1" />
                                Manager Answer Set
                              </div>
                              <div className="space-y-1 text-xs">
                                <div className="p-2 rounded bg-background border border-green-500/30">○ Low</div>
                                <div className="p-2 rounded bg-background border border-green-500/30">○ Medium</div>
                                <div className="p-2 rounded bg-background border border-green-500/30">○ High</div>
                                <div className="p-2 rounded bg-green-500/10 border border-green-500/50 font-medium">○ Critical ⭐</div>
                              </div>
                              <div className="text-xs text-center mt-2 text-green-500">Displayed to User</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-xs text-muted-foreground text-center mt-6 max-w-xl mx-auto">
                        The same question displays different answer options based on the user's previous responses.
                        This enables role-based, context-aware questionnaires without duplicating questions.
                      </p>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex gap-4 p-4 rounded-lg border">
                        <div className="flex items-center justify-center h-7 w-7 rounded-full bg-primary text-primary-foreground font-bold text-xs shrink-0">
                          1
                        </div>
                        <div>
                          <div className="font-semibold text-sm">Click "Add Answer Set" Button</div>
                          <p className="text-xs text-muted-foreground mt-1">
                            Located in the "Answer-Level Conditional Branching" section of the Question Editor. This creates a new branching group.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex gap-4 p-4 rounded-lg border">
                        <div className="flex items-center justify-center h-7 w-7 rounded-full bg-primary text-primary-foreground font-bold text-xs shrink-0">
                          2
                        </div>
                        <div>
                          <div className="font-semibold text-sm">Select from Left Panel</div>
                          <p className="text-xs text-muted-foreground mt-1">
                            The 20/80 layout shows answer set names on the left. Click one to edit. Uses the inline answer set name or "Untitled Answer Set" as fallback.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex gap-4 p-4 rounded-lg border">
                        <div className="flex items-center justify-center h-7 w-7 rounded-full bg-primary text-primary-foreground font-bold text-xs shrink-0">
                          3
                        </div>
                        <div>
                          <div className="font-semibold text-sm">Configure Rules in Right Panel</div>
                          <p className="text-xs text-muted-foreground mt-1">
                            The AnswerLevelRuleGroupEditor appears with cascading dropdowns: Source Question → Answer Set → Operator → Answer.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex gap-4 p-4 rounded-lg border">
                        <div className="flex items-center justify-center h-7 w-7 rounded-full bg-primary text-primary-foreground font-bold text-xs shrink-0">
                          4
                        </div>
                        <div>
                          <div className="font-semibold text-sm">Define Inline Answer Set</div>
                          <p className="text-xs text-muted-foreground mt-1">
                            Each branching group has its own inline answer set with answers, labels, values, and optional action records.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 rounded-lg bg-muted/30 border mt-4">
                      <div className="text-sm font-medium mb-2">💡 Example Use Case</div>
                      <p className="text-xs text-muted-foreground">
                        A question "Select your priority level" might show different options based on the user's role:
                      </p>
                      <ul className="text-xs text-muted-foreground mt-2 space-y-1 ml-4">
                        <li>• <strong>If Role = "Manager":</strong> Show Critical, High, Medium, Low</li>
                        <li>• <strong>If Role = "Staff":</strong> Show High, Medium, Low only</li>
                        <li>• <strong>Default:</strong> Show standard priority options</li>
                      </ul>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  {/* Visual Indicators */}
                  <div>
                    <h4 className="font-semibold mb-4">Visual Indicators in Sidebar</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      The sidebar tree uses visual cues to help you understand your branch structure:
                    </p>
                    
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="p-3 rounded-lg border flex items-center gap-3">
                        <GitBranch className="h-5 w-5 text-primary shrink-0" />
                        <div>
                          <div className="font-medium text-sm">GitBranch Icon</div>
                          <p className="text-xs text-muted-foreground">Indicates a conditional branch</p>
                        </div>
                      </div>
                      
                      <div className="p-3 rounded-lg border flex items-center gap-3">
                        <HelpCircle className="h-5 w-5 text-muted-foreground shrink-0" />
                        <div>
                          <div className="font-medium text-sm">HelpCircle Icon</div>
                          <p className="text-xs text-muted-foreground">Indicates a question</p>
                        </div>
                      </div>
                      
                      <div className="p-3 rounded-lg border flex items-center gap-3">
                        <Zap className="h-5 w-5 text-yellow-500 shrink-0" />
                        <div>
                          <div className="font-medium text-sm">Zap Icon</div>
                          <p className="text-xs text-muted-foreground">Question has Action Records attached</p>
                        </div>
                      </div>
                      
                      <div className="p-3 rounded-lg border flex items-center gap-3">
                        <div className="h-5 w-0.5 bg-muted-foreground/30 shrink-0" />
                        <div>
                          <div className="font-medium text-sm">Vertical Lines</div>
                          <p className="text-xs text-muted-foreground">Connector lines show nesting depth</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  {/* Deleting Branches */}
                  <div>
                    <h4 className="font-semibold mb-4">Deleting Branches</h4>
                    <div className="p-4 rounded-lg border border-destructive/30 bg-destructive/5">
                      <p className="text-sm text-muted-foreground mb-3">
                        <strong className="text-destructive">⚠️ Caution:</strong> Deleting a branch removes:
                      </p>
                      <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                        <li>• All questions within the branch</li>
                        <li>• All nested child branches</li>
                        <li>• All associated rules and answer sets</li>
                        <li>• All action records attached to those questions</li>
                      </ul>
                      <p className="text-xs text-muted-foreground mt-3">
                        A confirmation dialog will appear before deletion. This action cannot be undone.
                      </p>
                    </div>
                    
                    <div className="mt-4 p-4 rounded-lg border">
                      <div className="font-medium text-sm mb-2">How to Delete a Branch</div>
                      <ol className="text-xs text-muted-foreground space-y-1 list-decimal ml-4">
                        <li>Select the branch in the sidebar or section preview</li>
                        <li>In the Branch Editor header, click "Delete Branch"</li>
                        <li>Review the confirmation dialog</li>
                        <li>Click "Delete" to confirm or "Cancel" to abort</li>
                      </ol>
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-muted/50 border">
                    <div className="text-sm font-medium mb-2">💡 Best Practices</div>
                    <div className="grid gap-3 sm:grid-cols-2 text-xs text-muted-foreground">
                      <div>
                        <strong>Name branches clearly:</strong> Use descriptive names like "Hardware Path" instead of "Branch 1"
                      </div>
                      <div>
                        <strong>Test your logic:</strong> Verify that branch conditions don't conflict or overlap unexpectedly
                      </div>
                      <div>
                        <strong>Limit nesting depth:</strong> More than 3-4 levels can become hard to manage
                      </div>
                      <div>
                        <strong>Use answer-level for variants:</strong> Same question structure, different answer options
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Feature Comparison */}
            <section id="feature-comparison">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <LayoutGrid className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle>Feature Comparison</CardTitle>
                      <CardDescription>
                        Understand when to use each dynamic feature
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground">
                    The Questionnaire Builder offers three powerful mechanisms for creating dynamic, adaptive forms.
                    Use this comparison to choose the right feature for your use case.
                  </p>
                  
                  {/* Comparison Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                      <thead>
                        <tr className="border-b-2">
                          <th className="text-left p-3 font-semibold bg-muted/50">Feature</th>
                          <th className="text-left p-3 font-semibold bg-purple-500/10">
                            <div className="flex items-center gap-2">
                              <GitBranch className="h-4 w-4 text-purple-500" />
                              <span>Question-Level Branching</span>
                            </div>
                          </th>
                          <th className="text-left p-3 font-semibold bg-orange-500/10">
                            <div className="flex items-center gap-2">
                              <ListChecks className="h-4 w-4 text-orange-500" />
                              <span>Answer-Level Branching</span>
                            </div>
                          </th>
                          <th className="text-left p-3 font-semibold bg-blue-500/10">
                            <div className="flex items-center gap-2">
                              <Database className="h-4 w-4 text-blue-500" />
                              <span>Dynamic Values</span>
                            </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="p-3 font-medium bg-muted/30">Purpose</td>
                          <td className="p-3">Show/hide entire question groups based on conditions</td>
                          <td className="p-3">Swap answer options for a single question</td>
                          <td className="p-3">Populate answers from external data sources</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-3 font-medium bg-muted/30">Configured In</td>
                          <td className="p-3">
                            <Badge variant="outline">Branch Editor</Badge>
                          </td>
                          <td className="p-3">
                            <Badge variant="outline">Question Editor</Badge>
                          </td>
                          <td className="p-3">
                            <Badge variant="outline">Answer Set Editor</Badge>
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-3 font-medium bg-muted/30">What Changes</td>
                          <td className="p-3">
                            <span className="text-purple-500 font-medium">Visibility</span> of branches + nested questions
                          </td>
                          <td className="p-3">
                            <span className="text-orange-500 font-medium">Answer options</span> shown to user
                          </td>
                          <td className="p-3">
                            <span className="text-blue-500 font-medium">Answer data</span> fetched from tables
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-3 font-medium bg-muted/30">Trigger</td>
                          <td className="p-3">Previous question responses</td>
                          <td className="p-3">Previous question responses</td>
                          <td className="p-3">Data source + filter conditions</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-3 font-medium bg-muted/30">Supports Nesting</td>
                          <td className="p-3">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span className="ml-2 text-xs text-muted-foreground">Infinite nesting</span>
                          </td>
                          <td className="p-3">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span className="ml-2 text-xs text-muted-foreground">Nested rule groups</span>
                          </td>
                          <td className="p-3">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span className="ml-2 text-xs text-muted-foreground">Nested filter groups</span>
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-3 font-medium bg-muted/30">Logic Type</td>
                          <td className="p-3">AND / OR rule groups</td>
                          <td className="p-3">AND / OR rule groups</td>
                          <td className="p-3">AND / OR filter groups</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-3 font-medium bg-muted/30">Question Types</td>
                          <td className="p-3">All types (affects visibility)</td>
                          <td className="p-3">Choice-based types only</td>
                          <td className="p-3">Choice, Dropdown, Radio, MultiSelect</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-3 font-medium bg-muted/30">Data Source</td>
                          <td className="p-3">
                            <span className="text-muted-foreground">N/A</span>
                            <span className="ml-2 text-xs">(uses response data)</span>
                          </td>
                          <td className="p-3">
                            <span className="text-muted-foreground">Inline answer sets</span>
                          </td>
                          <td className="p-3">
                            <span className="text-blue-500 font-medium">External tables</span>
                          </td>
                        </tr>
                        <tr>
                          <td className="p-3 font-medium bg-muted/30">Best For</td>
                          <td className="p-3">
                            <div className="space-y-1 text-xs">
                              <div>• Decision trees</div>
                              <div>• Skip logic</div>
                              <div>• Conditional sections</div>
                            </div>
                          </td>
                          <td className="p-3">
                            <div className="space-y-1 text-xs">
                              <div>• Role-based options</div>
                              <div>• Context-aware choices</div>
                              <div>• Tiered selections</div>
                            </div>
                          </td>
                          <td className="p-3">
                            <div className="space-y-1 text-xs">
                              <div>• Centralized data</div>
                              <div>• Frequently updated lists</div>
                              <div>• Large option sets</div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  <Separator />
                  
                  {/* Visual Summary */}
                  <div>
                    <h4 className="font-semibold mb-4">When to Use Each Feature</h4>
                    <div className="grid gap-4 sm:grid-cols-3">
                      <div className="p-4 rounded-lg border-2 border-purple-500/30 bg-purple-500/5">
                        <div className="flex items-center gap-2 mb-3">
                          <GitBranch className="h-5 w-5 text-purple-500" />
                          <span className="font-medium text-purple-500">Question-Level</span>
                        </div>
                        <p className="text-xs text-muted-foreground mb-3">
                          "I want to show a <strong>group of questions</strong> only when the user selects a specific answer."
                        </p>
                        <div className="p-2 rounded bg-background text-xs">
                          <span className="font-medium">Example:</span> Show "Hardware Details" section only if Issue Type = "Hardware"
                        </div>
                      </div>
                      
                      <div className="p-4 rounded-lg border-2 border-orange-500/30 bg-orange-500/5">
                        <div className="flex items-center gap-2 mb-3">
                          <ListChecks className="h-5 w-5 text-orange-500" />
                          <span className="font-medium text-orange-500">Answer-Level</span>
                        </div>
                        <p className="text-xs text-muted-foreground mb-3">
                          "I want the <strong>same question</strong> to show <strong>different choices</strong> based on context."
                        </p>
                        <div className="p-2 rounded bg-background text-xs">
                          <span className="font-medium">Example:</span> Show "Critical" priority only for Manager role users
                        </div>
                      </div>
                      
                      <div className="p-4 rounded-lg border-2 border-blue-500/30 bg-blue-500/5">
                        <div className="flex items-center gap-2 mb-3">
                          <Database className="h-5 w-5 text-blue-500" />
                          <span className="font-medium text-blue-500">Dynamic Values</span>
                        </div>
                        <p className="text-xs text-muted-foreground mb-3">
                          "I want answer options to come from an <strong>external database</strong> that updates independently."
                        </p>
                        <div className="p-2 rounded bg-background text-xs">
                          <span className="font-medium">Example:</span> Populate "Department" dropdown from HR database
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Decision Flowchart */}
                  <div className="p-6 rounded-lg border bg-muted/30">
                    <h4 className="font-semibold mb-2 text-center">Quick-Start Decision Flowchart</h4>
                    <p className="text-xs text-muted-foreground text-center mb-6">
                      Answer these questions to find the right feature for your use case
                    </p>
                    
                    <div className="flex flex-col items-center gap-4 min-w-[600px] overflow-x-auto">
                      {/* Start */}
                      <div className="p-3 rounded-full bg-primary text-primary-foreground font-medium text-sm">
                        START
                      </div>
                      
                      {/* Arrow */}
                      <div className="w-0.5 h-4 bg-muted-foreground/40"></div>
                      
                      {/* Question 1 */}
                      <div className="relative">
                        <div className="w-64 h-24 border-2 border-primary bg-primary/5 rotate-45 flex items-center justify-center">
                          <span className="text-sm font-medium -rotate-45 text-center px-4">
                            Do answers come from<br/>an external database?
                          </span>
                        </div>
                      </div>
                      
                      {/* Branch from Q1 */}
                      <div className="flex items-start gap-16">
                        {/* YES - Dynamic Values */}
                        <div className="flex flex-col items-center gap-3">
                          <Badge className="bg-green-500">YES</Badge>
                          <div className="w-0.5 h-6 bg-green-500/50"></div>
                          <div className="p-4 rounded-xl border-2 border-blue-500 bg-blue-500/10 text-center">
                            <Database className="h-6 w-6 text-blue-500 mx-auto mb-2" />
                            <div className="font-medium text-blue-500">Dynamic Values</div>
                            <p className="text-xs text-muted-foreground mt-1 max-w-[140px]">
                              Fetch from tables with filters & sorting
                            </p>
                          </div>
                        </div>
                        
                        {/* NO - Continue */}
                        <div className="flex flex-col items-center gap-3">
                          <Badge variant="secondary">NO</Badge>
                          <div className="w-0.5 h-6 bg-muted-foreground/30"></div>
                          
                          {/* Question 2 */}
                          <div className="relative">
                            <div className="w-64 h-24 border-2 border-amber-500 bg-amber-500/5 rotate-45 flex items-center justify-center">
                              <span className="text-sm font-medium -rotate-45 text-center px-4">
                                Hide/show entire<br/>question groups?
                              </span>
                            </div>
                          </div>
                          
                          {/* Branch from Q2 */}
                          <div className="flex items-start gap-12 mt-4">
                            {/* YES - Question-Level */}
                            <div className="flex flex-col items-center gap-3">
                              <Badge className="bg-green-500">YES</Badge>
                              <div className="w-0.5 h-6 bg-green-500/50"></div>
                              <div className="p-4 rounded-xl border-2 border-purple-500 bg-purple-500/10 text-center">
                                <GitBranch className="h-6 w-6 text-purple-500 mx-auto mb-2" />
                                <div className="font-medium text-purple-500">Question-Level</div>
                                <p className="text-xs text-muted-foreground mt-1 max-w-[140px]">
                                  Branches with nested questions
                                </p>
                              </div>
                            </div>
                            
                            {/* NO - Continue to Q3 */}
                            <div className="flex flex-col items-center gap-3">
                              <Badge variant="secondary">NO</Badge>
                              <div className="w-0.5 h-6 bg-muted-foreground/30"></div>
                              
                              {/* Question 3 */}
                              <div className="relative">
                                <div className="w-64 h-24 border-2 border-orange-500 bg-orange-500/5 rotate-45 flex items-center justify-center">
                                  <span className="text-sm font-medium -rotate-45 text-center px-4">
                                    Same question,<br/>different choices?
                                  </span>
                                </div>
                              </div>
                              
                              {/* Branch from Q3 */}
                              <div className="flex items-start gap-12 mt-4">
                                {/* YES - Answer-Level */}
                                <div className="flex flex-col items-center gap-3">
                                  <Badge className="bg-green-500">YES</Badge>
                                  <div className="w-0.5 h-6 bg-green-500/50"></div>
                                  <div className="p-4 rounded-xl border-2 border-orange-500 bg-orange-500/10 text-center">
                                    <ListChecks className="h-6 w-6 text-orange-500 mx-auto mb-2" />
                                    <div className="font-medium text-orange-500">Answer-Level</div>
                                    <p className="text-xs text-muted-foreground mt-1 max-w-[140px]">
                                      Swap answer sets per context
                                    </p>
                                  </div>
                                </div>
                                
                                {/* NO - Static */}
                                <div className="flex flex-col items-center gap-3">
                                  <Badge variant="secondary">NO</Badge>
                                  <div className="w-0.5 h-6 bg-muted-foreground/30"></div>
                                  <div className="p-4 rounded-xl border-2 border-muted-foreground/50 bg-muted/50 text-center">
                                    <CheckCircle className="h-6 w-6 text-muted-foreground mx-auto mb-2" />
                                    <div className="font-medium text-muted-foreground">Static Answers</div>
                                    <p className="text-xs text-muted-foreground mt-1 max-w-[140px]">
                                      Define fixed answer options
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Quick Reference */}
                    <div className="mt-8 pt-4 border-t">
                      <div className="grid gap-3 sm:grid-cols-4 text-xs">
                        <div className="flex items-center gap-2 p-2 rounded bg-blue-500/10">
                          <Database className="h-4 w-4 text-blue-500 shrink-0" />
                          <span><strong>Dynamic:</strong> External data source</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 rounded bg-purple-500/10">
                          <GitBranch className="h-4 w-4 text-purple-500 shrink-0" />
                          <span><strong>Q-Level:</strong> Show/hide groups</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 rounded bg-orange-500/10">
                          <ListChecks className="h-4 w-4 text-orange-500 shrink-0" />
                          <span><strong>A-Level:</strong> Swap choices</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 rounded bg-muted">
                          <CheckCircle className="h-4 w-4 text-muted-foreground shrink-0" />
                          <span><strong>Static:</strong> Fixed options</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  {/* Combination Note */}
                  <div className="p-4 rounded-lg bg-muted/50 border">
                    <div className="text-sm font-medium mb-2">💡 Combining Features</div>
                    <p className="text-sm text-muted-foreground">
                      These features can be used together! For example, you can have a <strong>conditional branch</strong> that contains
                      questions with <strong>dynamic answer sets</strong>, where the displayed options depend on both the user's previous
                      responses (answer-level branching) and external data (dynamic values).
                    </p>
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

            {/* Validation & Required Fields */}
            <section id="validation">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <CheckCircle className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>Validation & Required Fields</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground">
                    The builder enforces mandatory field validation to ensure questionnaire data integrity. 
                    Required fields are visually marked with a red asterisk (*) and highlighted with a red border when empty.
                  </p>
                  
                  <div>
                    <h4 className="font-semibold mb-3">Mandatory Fields</h4>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="p-4 rounded-lg border">
                        <div className="font-medium mb-2">Question Configuration</div>
                        <ul className="text-sm text-muted-foreground space-y-2">
                          <li className="flex items-center gap-2">
                            <Badge variant="destructive" className="text-xs">Required</Badge>
                            <span>Question Title</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Badge variant="destructive" className="text-xs">Required</Badge>
                            <span>Question Type</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="p-4 rounded-lg border">
                        <div className="font-medium mb-2">Answer Set Configuration</div>
                        <ul className="text-sm text-muted-foreground space-y-2">
                          <li className="flex items-center gap-2">
                            <Badge variant="destructive" className="text-xs">Required</Badge>
                            <span>Set Name</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Badge variant="destructive" className="text-xs">Required</Badge>
                            <span>Tag</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h4 className="font-semibold mb-3">Answer Validation</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      For choice-type questions (Radio Button, Checkbox, Dropdown, MultiSelect), the builder validates:
                    </p>
                    <div className="grid gap-3 sm:grid-cols-3">
                      <div className="p-3 rounded-lg border">
                        <div className="text-sm font-medium">Minimum Answers</div>
                        <p className="text-xs text-muted-foreground mt-1">
                          At least one answer option is required
                        </p>
                      </div>
                      <div className="p-3 rounded-lg border">
                        <div className="text-sm font-medium">Answer Label</div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Each answer must have a display label
                        </p>
                      </div>
                      <div className="p-3 rounded-lg border">
                        <div className="text-sm font-medium">Answer Value</div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Each answer must have a stored value
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h4 className="font-semibold mb-3">Visual Indicators</h4>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="p-4 rounded-lg border border-destructive">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-destructive font-medium">Red Border</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Empty required fields are highlighted with a red border to draw attention
                        </p>
                      </div>
                      <div className="p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-medium">Required Label <span className="text-destructive">*</span></span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Mandatory fields display a red asterisk (*) next to their label
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-muted/50 border">
                    <div className="flex items-center gap-2 text-sm font-medium mb-2">
                      <Info className="h-4 w-4 text-primary" />
                      Answer-Level Branching
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Validation also applies to inline answer sets within Answer-Level Conditional Branching. 
                      Set Name, Tag, and answer options are all validated with the same requirements.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Delete Confirmations */}
            <section id="delete-confirmations">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Trash2 className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>Delete Confirmations</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground">
                    To prevent accidental data loss, all delete actions in the builder require explicit confirmation 
                    through a confirmation dialog before any content is removed.
                  </p>
                  
                  <div>
                    <h4 className="font-semibold mb-3">Protected Delete Actions</h4>
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      <div className="p-3 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Trash2 className="h-4 w-4 text-destructive" />
                          <span className="font-medium text-sm">Pages</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Deleting a page removes all its sections, questions, and branches
                        </p>
                      </div>
                      <div className="p-3 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Trash2 className="h-4 w-4 text-destructive" />
                          <span className="font-medium text-sm">Sections</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Deleting a section removes all its questions and branches
                        </p>
                      </div>
                      <div className="p-3 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Trash2 className="h-4 w-4 text-destructive" />
                          <span className="font-medium text-sm">Questions</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Deleting a question removes all its answer sets and rules
                        </p>
                      </div>
                      <div className="p-3 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Trash2 className="h-4 w-4 text-destructive" />
                          <span className="font-medium text-sm">Branches</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Deleting a branch removes all its questions and child branches
                        </p>
                      </div>
                      <div className="p-3 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Trash2 className="h-4 w-4 text-destructive" />
                          <span className="font-medium text-sm">Answer Sets</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Deleting an answer set removes all its answers and action records
                        </p>
                      </div>
                      <div className="p-3 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Trash2 className="h-4 w-4 text-destructive" />
                          <span className="font-medium text-sm">Drafts & Records</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Deleting saved drafts or published records is permanent
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h4 className="font-semibold mb-3">Confirmation Dialog</h4>
                    <div className="p-4 rounded-lg border">
                      <p className="text-sm text-muted-foreground mb-4">
                        When you click a delete button, a confirmation dialog appears with:
                      </p>
                      <ul className="text-sm text-muted-foreground space-y-2">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-primary" />
                          <span>Clear title indicating what will be deleted</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-primary" />
                          <span>Warning message about the action being irreversible</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-primary" />
                          <span>Cancel button to abort the action</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-primary" />
                          <span>Destructive-styled Delete button to confirm</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-muted/50 border">
                    <div className="flex items-center gap-2 text-sm font-medium mb-2">
                      <Info className="h-4 w-4 text-primary" />
                      Reusable Component
                    </div>
                    <p className="text-sm text-muted-foreground">
                      The confirmation dialog is built as a generic, reusable component (ConfirmDialog) 
                      that can be used throughout the application for any destructive action.
                    </p>
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

            {/* Preview & Testing */}
            <section id="preview">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Eye className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>Preview & Testing</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground">
                    Test your questionnaire in real-time using the built-in Preview feature before exporting or publishing.
                    The Preview opens a fully functional Questionnaire Executor that simulates the end-user experience.
                  </p>
                  
                  {/* Preview Workflow Diagram */}
                  <div className="p-6 rounded-lg border bg-muted/30">
                    <h4 className="font-semibold mb-4 text-center">Preview Workflow</h4>
                    <div className="flex flex-col items-center gap-4">
                      {/* Flow diagram using flexbox */}
                      <div className="flex flex-wrap items-center justify-center gap-3">
                        {/* Step 1: Builder */}
                        <div className="flex flex-col items-center gap-2">
                          <div className="p-4 rounded-xl bg-primary/10 border-2 border-primary/30">
                            <Pencil className="h-8 w-8 text-primary" />
                          </div>
                          <span className="text-sm font-medium">Builder</span>
                          <span className="text-xs text-muted-foreground text-center max-w-[100px]">Design questionnaire</span>
                        </div>
                        
                        {/* Arrow 1 */}
                        <div className="flex flex-col items-center gap-1">
                          <ArrowRight className="h-6 w-6 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">Click Preview</span>
                        </div>
                        
                        {/* Step 2: Session Storage */}
                        <div className="flex flex-col items-center gap-2">
                          <div className="p-4 rounded-xl bg-blue-500/10 border-2 border-blue-500/30">
                            <Database className="h-8 w-8 text-blue-500" />
                          </div>
                          <span className="text-sm font-medium">Session Storage</span>
                          <span className="text-xs text-muted-foreground text-center max-w-[100px]">JSON data transfer</span>
                        </div>
                        
                        {/* Arrow 2 */}
                        <div className="flex flex-col items-center gap-1">
                          <ArrowRight className="h-6 w-6 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">Auto-load</span>
                        </div>
                        
                        {/* Step 3: Executor */}
                        <div className="flex flex-col items-center gap-2">
                          <div className="p-4 rounded-xl bg-green-500/10 border-2 border-green-500/30">
                            <Eye className="h-8 w-8 text-green-500" />
                          </div>
                          <span className="text-sm font-medium">Executor</span>
                          <span className="text-xs text-muted-foreground text-center max-w-[100px]">Fill & validate</span>
                        </div>
                        
                        {/* Arrow 3 */}
                        <div className="flex flex-col items-center gap-1">
                          <ArrowRight className="h-6 w-6 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">Submit</span>
                        </div>
                        
                        {/* Step 4: Response Export */}
                        <div className="flex flex-col items-center gap-2">
                          <div className="p-4 rounded-xl bg-orange-500/10 border-2 border-orange-500/30">
                            <FileText className="h-8 w-8 text-orange-500" />
                          </div>
                          <span className="text-sm font-medium">Response Export</span>
                          <span className="text-xs text-muted-foreground text-center max-w-[100px]">JSON or CSV</span>
                        </div>
                      </div>
                      
                      {/* Description */}
                      <p className="text-xs text-muted-foreground text-center max-w-xl mt-2">
                        The Preview button stores your current questionnaire in session storage, opens the Executor in a new tab,
                        which automatically loads the data, renders all pages with validation, and allows response export upon submission.
                      </p>
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-lg border bg-muted/30">
                    <div className="font-medium mb-3">How to Use Preview</div>
                    <div className="space-y-3">
                      <div className="flex gap-3">
                        <div className="flex items-center justify-center h-6 w-6 rounded-full bg-primary text-primary-foreground font-bold text-xs shrink-0">
                          1
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Click the <strong>"Preview"</strong> button (with Play icon) in the builder header toolbar
                        </p>
                      </div>
                      <div className="flex gap-3">
                        <div className="flex items-center justify-center h-6 w-6 rounded-full bg-primary text-primary-foreground font-bold text-xs shrink-0">
                          2
                        </div>
                        <p className="text-sm text-muted-foreground">
                          A new browser tab opens with the Questionnaire Executor pre-loaded with your current questionnaire data
                        </p>
                      </div>
                      <div className="flex gap-3">
                        <div className="flex items-center justify-center h-6 w-6 rounded-full bg-primary text-primary-foreground font-bold text-xs shrink-0">
                          3
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Navigate through pages, test conditional branches, and verify answer validation works correctly
                        </p>
                      </div>
                      <div className="flex gap-3">
                        <div className="flex items-center justify-center h-6 w-6 rounded-full bg-primary text-primary-foreground font-bold text-xs shrink-0">
                          4
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Submit and download responses as JSON or CSV to verify the output format matches your requirements
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h4 className="font-semibold mb-3">Supported Question Types in Preview</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      The Preview executor renders all 13 question types with full interactivity:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">Text Input</Badge>
                      <Badge variant="secondary">Text Area</Badge>
                      <Badge variant="secondary">Rich Text</Badge>
                      <Badge variant="secondary">Number</Badge>
                      <Badge variant="secondary">Date Picker</Badge>
                      <Badge variant="secondary">Radio Button</Badge>
                      <Badge variant="secondary">Checkbox</Badge>
                      <Badge variant="secondary">Select Dropdown</Badge>
                      <Badge variant="secondary">Toggle/Switch</Badge>
                      <Badge variant="secondary">Slider</Badge>
                      <Badge variant="secondary">Rating</Badge>
                      <Badge variant="secondary">File Attachment</Badge>
                      <Badge variant="secondary">Reference Link</Badge>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h4 className="font-semibold mb-3">Executor Features</h4>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="p-4 rounded-lg border">
                        <div className="font-medium mb-2">Page Navigation</div>
                        <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                          <li>Visual progress bar showing completion percentage</li>
                          <li>Previous/Next navigation buttons</li>
                          <li>Page indicator (e.g., "Page 2 of 5")</li>
                          <li>Conditional page visibility based on answers</li>
                          <li>Submit button on final page</li>
                        </ul>
                      </div>
                      <div className="p-4 rounded-lg border">
                        <div className="font-medium mb-2">Validation</div>
                        <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                          <li>Required field enforcement with visual indicators</li>
                          <li>Regex pattern validation for text fields</li>
                          <li>Min/Max validation for numbers and dates</li>
                          <li>Error toast messages for incomplete fields</li>
                          <li>Per-page validation before navigation</li>
                        </ul>
                      </div>
                      <div className="p-4 rounded-lg border">
                        <div className="font-medium mb-2">Conditional Logic Evaluation</div>
                        <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                          <li>Sections show/hide based on rule groups</li>
                          <li>Branch evaluation in real-time as you answer</li>
                          <li>Dynamic question visibility within branches</li>
                          <li>Support for AND/OR match types</li>
                          <li>Nested condition evaluation</li>
                          <li>Operators: equals, not_equals, contains, greater_than, less_than, starts_with, ends_with</li>
                        </ul>
                      </div>
                      <div className="p-4 rounded-lg border">
                        <div className="font-medium mb-2">Response Export</div>
                        <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                          <li>Download completed responses as JSON</li>
                          <li>Download completed responses as CSV</li>
                          <li>Includes questionnaire metadata</li>
                          <li>Timestamps for submission</li>
                          <li>All answered question IDs and values</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h4 className="font-semibold mb-3">Default Value Initialization</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      When a questionnaire is loaded in Preview, default values are automatically applied:
                    </p>
                    <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
                      <li>Questions with a <strong>Default Answer Set</strong> are pre-populated with the first answer value</li>
                      <li>Toggle questions default to their configured initial state</li>
                      <li>Slider questions start at their minimum value</li>
                      <li>Users can modify all pre-filled values during the session</li>
                    </ul>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h4 className="font-semibold mb-3">Alternative: Manual Import</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      You can also test questionnaires by manually importing JSON files:
                    </p>
                    <div className="p-4 rounded-lg border bg-muted/30">
                      <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                        <li>Export your questionnaire using the <strong>"Export JSON"</strong> button in the builder</li>
                        <li>Navigate to <strong>/execute</strong> directly or share the JSON file</li>
                        <li>Click <strong>"Import Questionnaire"</strong> and select your JSON file</li>
                        <li>The executor loads and validates the questionnaire structure</li>
                      </ol>
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
                    <div className="flex items-start gap-3">
                      <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
                      <div className="text-sm">
                        <strong className="text-blue-700 dark:text-blue-300">Instant Sync:</strong>
                        <span className="text-blue-600 dark:text-blue-400 ml-1">
                          The Preview button uses session storage to instantly transfer your current questionnaire state. 
                          No need to export and re-import—just click Preview to test immediately. The session data is 
                          automatically cleared after loading to prevent stale data on page refresh.
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
                    <div className="flex items-start gap-3">
                      <Info className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
                      <div className="text-sm">
                        <strong className="text-amber-700 dark:text-amber-300">Testing Tips:</strong>
                        <ul className="text-amber-600 dark:text-amber-400 mt-2 space-y-1 list-disc list-inside">
                          <li>Test all conditional branches by selecting different answer combinations</li>
                          <li>Verify required fields show validation errors when left empty</li>
                          <li>Check that hidden sections/questions don't appear in the final response</li>
                          <li>Download both JSON and CSV to verify export formats meet your needs</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Troubleshooting */}
            <section id="troubleshooting">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-destructive/10">
                      <Info className="h-6 w-6 text-destructive" />
                    </div>
                    <div>
                      <CardTitle>Troubleshooting</CardTitle>
                      <CardDescription>
                        Common issues and solutions for branching, dynamic values, and rule evaluation
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground">
                    Encountering unexpected behavior? Check these common issues and their solutions.
                  </p>
                  
                  {/* Branching Issues */}
                  <div className="p-4 rounded-lg border">
                    <div className="flex items-center gap-2 mb-4">
                      <GitBranch className="h-5 w-5 text-purple-500" />
                      <h4 className="font-semibold">Question-Level Branching Issues</h4>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="p-3 rounded-lg bg-muted/50">
                        <div className="flex items-start gap-3">
                          <span className="text-destructive font-bold text-lg">?</span>
                          <div className="flex-1">
                            <div className="font-medium text-sm">Branch not appearing when expected</div>
                            <div className="text-xs text-muted-foreground mt-2 space-y-2">
                              <div className="flex items-start gap-2">
                                <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 shrink-0" />
                                <span><strong>Check rule logic:</strong> Ensure AND/OR match type is correct. AND requires ALL conditions to match.</span>
                              </div>
                              <div className="flex items-start gap-2">
                                <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 shrink-0" />
                                <span><strong>Verify source question:</strong> The trigger question must appear BEFORE the branch in the questionnaire order.</span>
                              </div>
                              <div className="flex items-start gap-2">
                                <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 shrink-0" />
                                <span><strong>Check answer values:</strong> Ensure the rule's target answer value exactly matches what the user selects.</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-3 rounded-lg bg-muted/50">
                        <div className="flex items-start gap-3">
                          <span className="text-destructive font-bold text-lg">?</span>
                          <div className="flex-1">
                            <div className="font-medium text-sm">Branch shows when it shouldn't</div>
                            <div className="text-xs text-muted-foreground mt-2 space-y-2">
                              <div className="flex items-start gap-2">
                                <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 shrink-0" />
                                <span><strong>Check operator:</strong> Using "equals" vs "not_equals" or "contains" vs "not_contains".</span>
                              </div>
                              <div className="flex items-start gap-2">
                                <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 shrink-0" />
                                <span><strong>Review nested groups:</strong> Complex OR groups may trigger unexpectedly if any child matches.</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-3 rounded-lg bg-muted/50">
                        <div className="flex items-start gap-3">
                          <span className="text-destructive font-bold text-lg">?</span>
                          <div className="flex-1">
                            <div className="font-medium text-sm">Source question dropdown is empty</div>
                            <div className="text-xs text-muted-foreground mt-2 space-y-2">
                              <div className="flex items-start gap-2">
                                <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 shrink-0" />
                                <span><strong>Add trigger questions first:</strong> Rules can only reference questions that exist before the branch.</span>
                              </div>
                              <div className="flex items-start gap-2">
                                <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 shrink-0" />
                                <span><strong>Check question order:</strong> Ensure questions have answer sets defined (empty questions won't appear).</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Answer-Level Branching Issues */}
                  <div className="p-4 rounded-lg border">
                    <div className="flex items-center gap-2 mb-4">
                      <ListChecks className="h-5 w-5 text-orange-500" />
                      <h4 className="font-semibold">Answer-Level Branching Issues</h4>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="p-3 rounded-lg bg-muted/50">
                        <div className="flex items-start gap-3">
                          <span className="text-destructive font-bold text-lg">?</span>
                          <div className="flex-1">
                            <div className="font-medium text-sm">Wrong answer set displayed</div>
                            <div className="text-xs text-muted-foreground mt-2 space-y-2">
                              <div className="flex items-start gap-2">
                                <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 shrink-0" />
                                <span><strong>Check evaluation order:</strong> The first matching rule group wins. Reorder groups if needed.</span>
                              </div>
                              <div className="flex items-start gap-2">
                                <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 shrink-0" />
                                <span><strong>Verify inline answer set:</strong> Each rule group needs its own inline answer set configured.</span>
                              </div>
                              <div className="flex items-start gap-2">
                                <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 shrink-0" />
                                <span><strong>Review rule conditions:</strong> More specific rules should appear before general ones.</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-3 rounded-lg bg-muted/50">
                        <div className="flex items-start gap-3">
                          <span className="text-destructive font-bold text-lg">?</span>
                          <div className="flex-1">
                            <div className="font-medium text-sm">Inline answer set appears empty</div>
                            <div className="text-xs text-muted-foreground mt-2 space-y-2">
                              <div className="flex items-start gap-2">
                                <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 shrink-0" />
                                <span><strong>Configure the inline set:</strong> Click the rule group and define answers in the inline answer set section.</span>
                              </div>
                              <div className="flex items-start gap-2">
                                <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 shrink-0" />
                                <span><strong>Add from library:</strong> Use "Add from Existing" to populate with template answers.</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-3 rounded-lg bg-muted/50">
                        <div className="flex items-start gap-3">
                          <span className="text-destructive font-bold text-lg">?</span>
                          <div className="flex-1">
                            <div className="font-medium text-sm">Falls back to default when it shouldn't</div>
                            <div className="text-xs text-muted-foreground mt-2 space-y-2">
                              <div className="flex items-start gap-2">
                                <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 shrink-0" />
                                <span><strong>Complete all rule fields:</strong> Source Question, Answer Set, Operator, and Answer must all be selected.</span>
                              </div>
                              <div className="flex items-start gap-2">
                                <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 shrink-0" />
                                <span><strong>Check user response:</strong> Ensure the previous question was actually answered (not skipped).</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Dynamic Values Issues */}
                  <div className="p-4 rounded-lg border">
                    <div className="flex items-center gap-2 mb-4">
                      <Database className="h-5 w-5 text-blue-500" />
                      <h4 className="font-semibold">Dynamic Values Issues</h4>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="p-3 rounded-lg bg-muted/50">
                        <div className="flex items-start gap-3">
                          <span className="text-destructive font-bold text-lg">?</span>
                          <div className="flex-1">
                            <div className="font-medium text-sm">No options appear in dropdown</div>
                            <div className="text-xs text-muted-foreground mt-2 space-y-2">
                              <div className="flex items-start gap-2">
                                <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 shrink-0" />
                                <span><strong>Verify table name:</strong> Ensure the configured table exists and is accessible.</span>
                              </div>
                              <div className="flex items-start gap-2">
                                <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 shrink-0" />
                                <span><strong>Check field mappings:</strong> Label and Value fields must match actual column names in the table.</span>
                              </div>
                              <div className="flex items-start gap-2">
                                <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 shrink-0" />
                                <span><strong>Review filters:</strong> Overly restrictive filters may exclude all records. Try removing filters temporarily.</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-3 rounded-lg bg-muted/50">
                        <div className="flex items-start gap-3">
                          <span className="text-destructive font-bold text-lg">?</span>
                          <div className="flex-1">
                            <div className="font-medium text-sm">Wrong data displayed</div>
                            <div className="text-xs text-muted-foreground mt-2 space-y-2">
                              <div className="flex items-start gap-2">
                                <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 shrink-0" />
                                <span><strong>Check Label vs Value:</strong> Label is shown to users; Value is stored. Ensure correct field assignment.</span>
                              </div>
                              <div className="flex items-start gap-2">
                                <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 shrink-0" />
                                <span><strong>Verify sort order:</strong> Check Order By field and direction (ASC/DESC).</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-3 rounded-lg bg-muted/50">
                        <div className="flex items-start gap-3">
                          <span className="text-destructive font-bold text-lg">?</span>
                          <div className="flex-1">
                            <div className="font-medium text-sm">Filters not working as expected</div>
                            <div className="text-xs text-muted-foreground mt-2 space-y-2">
                              <div className="flex items-start gap-2">
                                <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 shrink-0" />
                                <span><strong>Check AND vs OR:</strong> AND requires all conditions; OR requires any one condition.</span>
                              </div>
                              <div className="flex items-start gap-2">
                                <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 shrink-0" />
                                <span><strong>Use correct operator:</strong> "equals" for exact match, "contains" for partial, "is_null" for empty values.</span>
                              </div>
                              <div className="flex items-start gap-2">
                                <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 shrink-0" />
                                <span><strong>Case sensitivity:</strong> String comparisons may be case-sensitive depending on the data source.</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Rule Evaluation Issues */}
                  <div className="p-4 rounded-lg border">
                    <div className="flex items-center gap-2 mb-4">
                      <Settings className="h-5 w-5 text-primary" />
                      <h4 className="font-semibold">Rule Evaluation Issues</h4>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="p-3 rounded-lg bg-muted/50">
                        <div className="flex items-start gap-3">
                          <span className="text-destructive font-bold text-lg">?</span>
                          <div className="flex-1">
                            <div className="font-medium text-sm">Numeric comparisons not working</div>
                            <div className="text-xs text-muted-foreground mt-2 space-y-2">
                              <div className="flex items-start gap-2">
                                <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 shrink-0" />
                                <span><strong>Use Number/Decimal types:</strong> Ensure source question uses Number or Decimal type for greater_than/less_than operators.</span>
                              </div>
                              <div className="flex items-start gap-2">
                                <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 shrink-0" />
                                <span><strong>Check value format:</strong> Enter numeric values without quotes or currency symbols.</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-3 rounded-lg bg-muted/50">
                        <div className="flex items-start gap-3">
                          <span className="text-destructive font-bold text-lg">?</span>
                          <div className="flex-1">
                            <div className="font-medium text-sm">Boolean/Toggle conditions failing</div>
                            <div className="text-xs text-muted-foreground mt-2 space-y-2">
                              <div className="flex items-start gap-2">
                                <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 shrink-0" />
                                <span><strong>Check initial state:</strong> Toggles default to "off" unless explicitly set. Account for unset state.</span>
                              </div>
                              <div className="flex items-start gap-2">
                                <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 shrink-0" />
                                <span><strong>Use correct values:</strong> Boolean comparisons expect "true" or "false" string values.</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-3 rounded-lg bg-muted/50">
                        <div className="flex items-start gap-3">
                          <span className="text-destructive font-bold text-lg">?</span>
                          <div className="flex-1">
                            <div className="font-medium text-sm">Multi-select rules behaving unexpectedly</div>
                            <div className="text-xs text-muted-foreground mt-2 space-y-2">
                              <div className="flex items-start gap-2">
                                <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 shrink-0" />
                                <span><strong>Use "contains" operator:</strong> For multi-select sources, "contains" checks if the value is in the selection array.</span>
                              </div>
                              <div className="flex items-start gap-2">
                                <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 shrink-0" />
                                <span><strong>Consider multiple rules:</strong> Use OR groups to match any of several possible selections.</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Preview/Testing Issues */}
                  <div className="p-4 rounded-lg border">
                    <div className="flex items-center gap-2 mb-4">
                      <Eye className="h-5 w-5 text-green-500" />
                      <h4 className="font-semibold">Preview & Testing Issues</h4>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="p-3 rounded-lg bg-muted/50">
                        <div className="flex items-start gap-3">
                          <span className="text-destructive font-bold text-lg">?</span>
                          <div className="flex-1">
                            <div className="font-medium text-sm">Preview shows stale data</div>
                            <div className="text-xs text-muted-foreground mt-2 space-y-2">
                              <div className="flex items-start gap-2">
                                <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 shrink-0" />
                                <span><strong>Close and re-open Preview:</strong> Changes require clicking "Preview" again to sync.</span>
                              </div>
                              <div className="flex items-start gap-2">
                                <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 shrink-0" />
                                <span><strong>Clear browser storage:</strong> Session storage may retain old data. Clear and retry.</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-3 rounded-lg bg-muted/50">
                        <div className="flex items-start gap-3">
                          <span className="text-destructive font-bold text-lg">?</span>
                          <div className="flex-1">
                            <div className="font-medium text-sm">Validation errors blocking navigation</div>
                            <div className="text-xs text-muted-foreground mt-2 space-y-2">
                              <div className="flex items-start gap-2">
                                <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 shrink-0" />
                                <span><strong>Check required fields:</strong> Questions marked as required must be answered before proceeding.</span>
                              </div>
                              <div className="flex items-start gap-2">
                                <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 shrink-0" />
                                <span><strong>Review regex patterns:</strong> Text validation patterns may be rejecting valid input. Test the regex separately.</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Quick Reference */}
                  <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                    <h4 className="font-semibold mb-3">🔧 Quick Debugging Checklist</h4>
                    <div className="grid gap-2 sm:grid-cols-2 text-xs">
                      <div className="flex items-center gap-2">
                        <CheckSquare className="h-3 w-3 text-primary" />
                        <span>Verify question order (source before target)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckSquare className="h-3 w-3 text-primary" />
                        <span>Check AND vs OR match type</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckSquare className="h-3 w-3 text-primary" />
                        <span>Confirm all rule fields are populated</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckSquare className="h-3 w-3 text-primary" />
                        <span>Test with exact answer values</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckSquare className="h-3 w-3 text-primary" />
                        <span>Verify operator matches data type</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckSquare className="h-3 w-3 text-primary" />
                        <span>Re-open Preview after changes</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Glossary */}
            <section id="glossary">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle>Glossary</CardTitle>
                      <CardDescription>
                        Key terms and definitions used throughout the Questionnaire Builder
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground">
                    Reference guide for understanding the terminology used in the Questionnaire Builder.
                  </p>
                  
                  {/* Core Structure Terms */}
                  <div>
                    <h4 className="font-semibold mb-4 flex items-center gap-2">
                      <Layers className="h-4 w-4 text-primary" />
                      Core Structure
                    </h4>
                    <div className="grid gap-3">
                      <div className="p-4 rounded-lg border bg-muted/30">
                        <div className="flex items-start gap-3">
                          <Badge variant="outline" className="shrink-0 mt-0.5">Questionnaire</Badge>
                          <div>
                            <p className="text-sm">
                              The root container holding all pages, metadata (name, description, version), and configuration. 
                              A questionnaire represents a complete form that end-users fill out.
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 rounded-lg border bg-muted/30">
                        <div className="flex items-start gap-3">
                          <Badge variant="outline" className="shrink-0 mt-0.5">Page</Badge>
                          <div>
                            <p className="text-sm">
                              A top-level container grouping related sections. Pages appear as tabs in the builder and as 
                              sequential screens in the executor. Each page can contain multiple sections.
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 rounded-lg border bg-muted/30">
                        <div className="flex items-start gap-3">
                          <Badge variant="outline" className="shrink-0 mt-0.5">Section</Badge>
                          <div>
                            <p className="text-sm">
                              A collapsible container within a page that groups questions and branches by topic or category. 
                              Sections help organize content and can be conditionally shown/hidden.
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 rounded-lg border bg-muted/30">
                        <div className="flex items-start gap-3">
                          <Badge variant="outline" className="shrink-0 mt-0.5">Question</Badge>
                          <div>
                            <p className="text-sm">
                              An individual input field that collects user responses. Questions have a type (e.g., Text, Choice, Date), 
                              validation rules, and one or more answer sets defining available options.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  {/* Answer Terms */}
                  <div>
                    <h4 className="font-semibold mb-4 flex items-center gap-2">
                      <ListChecks className="h-4 w-4 text-cyan-500" />
                      Answers & Answer Sets
                    </h4>
                    <div className="grid gap-3">
                      <div className="p-4 rounded-lg border bg-cyan-500/5 border-cyan-500/20">
                        <div className="flex items-start gap-3">
                          <Badge className="bg-cyan-500 shrink-0 mt-0.5">Answer</Badge>
                          <div>
                            <p className="text-sm">
                              The atomic unit of a selectable option. Contains a <strong>label</strong> (displayed to users), 
                              <strong>value</strong> (stored in responses), <strong>active</strong> status, and optional <strong>Action Record</strong>.
                            </p>
                            <div className="mt-2 p-2 rounded bg-background text-xs font-mono">
                              {"{ label: \"High\", value: \"high\", active: true }"}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 rounded-lg border bg-cyan-500/5 border-cyan-500/20">
                        <div className="flex items-start gap-3">
                          <Badge className="bg-cyan-500 shrink-0 mt-0.5">Answer Set</Badge>
                          <div>
                            <p className="text-sm">
                              A named container holding multiple answers. Each answer set has a <strong>name</strong>, <strong>tag</strong> (unique identifier), 
                              and <strong>isDefault</strong> flag. Choice-type questions can have multiple answer sets, with one marked as default.
                            </p>
                            <div className="mt-2 flex flex-wrap gap-2 text-xs">
                              <Badge variant="outline">Contains: answers[]</Badge>
                              <Badge variant="outline">Optional: dynamicConfig</Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 rounded-lg border bg-orange-500/5 border-orange-500/20">
                        <div className="flex items-start gap-3">
                          <Badge className="bg-orange-500 shrink-0 mt-0.5">Inline Answer Set</Badge>
                          <div>
                            <p className="text-sm">
                              An answer set embedded directly within an Answer-Level Rule Group. Unlike standard answer sets attached to questions, 
                              inline sets are triggered by specific rule conditions and swap in to replace the default options.
                            </p>
                            <div className="mt-2 text-xs text-muted-foreground">
                              <strong>Used in:</strong> Answer-Level Conditional Branching
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 rounded-lg border bg-blue-500/5 border-blue-500/20">
                        <div className="flex items-start gap-3">
                          <Badge className="bg-blue-500 shrink-0 mt-0.5">Dynamic Values</Badge>
                          <div>
                            <p className="text-sm">
                              A configuration that populates answer options from an external data source (database table) instead of static entries. 
                              Supports field mapping (label/value), filtering, and sorting. Available only for choice-based question types.
                            </p>
                            <div className="mt-2 flex flex-wrap gap-2 text-xs">
                              <Badge variant="outline">tableName</Badge>
                              <Badge variant="outline">labelField</Badge>
                              <Badge variant="outline">valueField</Badge>
                              <Badge variant="outline">filterGroup</Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 rounded-lg border bg-teal-500/5 border-teal-500/20">
                        <div className="flex items-start gap-3">
                          <Badge className="bg-teal-500 shrink-0 mt-0.5">Action Record</Badge>
                          <div>
                            <p className="text-sm">
                              ITSM-specific metadata attached to an answer, defining categorization and priority. Includes operation categories (3 tiers), 
                              product categories (3 tiers), impact level, and urgency level. Used for ticket routing and escalation.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  {/* Branching Terms */}
                  <div>
                    <h4 className="font-semibold mb-4 flex items-center gap-2">
                      <GitBranch className="h-4 w-4 text-purple-500" />
                      Branching & Conditions
                    </h4>
                    <div className="grid gap-3">
                      <div className="p-4 rounded-lg border bg-purple-500/5 border-purple-500/20">
                        <div className="flex items-start gap-3">
                          <Badge className="bg-purple-500 shrink-0 mt-0.5">Conditional Branch</Badge>
                          <div>
                            <p className="text-sm">
                              A container for questions that appears only when specific conditions are met. Branches can be nested infinitely, 
                              creating complex decision trees. Each branch has a name, rule group, and can contain questions and child branches.
                            </p>
                            <div className="mt-2 text-xs text-muted-foreground">
                              <strong>Also called:</strong> Question-Level Branching
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 rounded-lg border bg-rose-500/5 border-rose-500/20">
                        <div className="flex items-start gap-3">
                          <Badge className="bg-rose-500 shrink-0 mt-0.5">Rule Group</Badge>
                          <div>
                            <p className="text-sm">
                              A container for conditional rules with AND/OR logic. Rule groups can be nested to create complex boolean expressions. 
                              The <strong>matchType</strong> determines if all rules must match (AND) or any rule can match (OR).
                            </p>
                            <div className="mt-2 p-2 rounded bg-background text-xs font-mono">
                              {"{ matchType: \"AND\", children: [rule1, rule2, nestedGroup] }"}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 rounded-lg border bg-rose-500/5 border-rose-500/20">
                        <div className="flex items-start gap-3">
                          <Badge className="bg-rose-500 shrink-0 mt-0.5">Question-Level Rule</Badge>
                          <div>
                            <p className="text-sm">
                              A rule that controls branch visibility based on a previous question's answer. Specifies: source question, answer set, 
                              operator (equals, contains, greater_than, etc.), and target answer value.
                            </p>
                            <div className="mt-2 text-xs text-muted-foreground">
                              <strong>Controls:</strong> Show/hide entire branches and their nested content
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 rounded-lg border bg-amber-500/5 border-amber-500/20">
                        <div className="flex items-start gap-3">
                          <Badge className="bg-amber-500 shrink-0 mt-0.5">Answer-Level Rule Group</Badge>
                          <div>
                            <p className="text-sm">
                              Similar to Rule Group but specifically for swapping answer sets. When conditions match, displays an inline answer set 
                              instead of the default. The first matching group wins; if none match, the default answer set is used.
                            </p>
                            <div className="mt-2 text-xs text-muted-foreground">
                              <strong>Contains:</strong> Rules + Inline Answer Set
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  {/* Question Types Terms */}
                  <div>
                    <h4 className="font-semibold mb-4 flex items-center gap-2">
                      <HelpCircle className="h-4 w-4 text-primary" />
                      Question Types
                    </h4>
                    <div className="grid gap-2 sm:grid-cols-2">
                      <div className="p-3 rounded-lg border">
                        <div className="font-medium text-sm mb-1">Choice-Based Types</div>
                        <p className="text-xs text-muted-foreground">
                          Questions with selectable options from answer sets. Support Dynamic Values and answer-level branching.
                        </p>
                        <div className="mt-2 flex flex-wrap gap-1">
                          <Badge variant="secondary" className="text-xs">Choice</Badge>
                          <Badge variant="secondary" className="text-xs">Dropdown</Badge>
                          <Badge variant="secondary" className="text-xs">RadioButton</Badge>
                          <Badge variant="secondary" className="text-xs">MultiSelect</Badge>
                        </div>
                      </div>
                      
                      <div className="p-3 rounded-lg border">
                        <div className="font-medium text-sm mb-1">Simple Types</div>
                        <p className="text-xs text-muted-foreground">
                          Questions with direct value input. Store default value in first answer's value field.
                        </p>
                        <div className="mt-2 flex flex-wrap gap-1">
                          <Badge variant="secondary" className="text-xs">Text</Badge>
                          <Badge variant="secondary" className="text-xs">TextArea</Badge>
                          <Badge variant="secondary" className="text-xs">Number</Badge>
                          <Badge variant="secondary" className="text-xs">Decimal</Badge>
                          <Badge variant="secondary" className="text-xs">Date</Badge>
                          <Badge variant="secondary" className="text-xs">Boolean</Badge>
                          <Badge variant="secondary" className="text-xs">Rating</Badge>
                        </div>
                      </div>
                      
                      <div className="p-3 rounded-lg border">
                        <div className="font-medium text-sm mb-1">File Types</div>
                        <p className="text-xs text-muted-foreground">
                          Questions for file uploads or downloads. Configure allowed extensions, size limits, and file counts.
                        </p>
                        <div className="mt-2 flex flex-wrap gap-1">
                          <Badge variant="secondary" className="text-xs">Document</Badge>
                          <Badge variant="secondary" className="text-xs">DownloadableDocument</Badge>
                        </div>
                      </div>
                      
                      <div className="p-3 rounded-lg border">
                        <div className="font-medium text-sm mb-1">Special Formats</div>
                        <p className="text-xs text-muted-foreground">
                          Enhanced input types with additional configuration options.
                        </p>
                        <div className="mt-2 flex flex-wrap gap-1">
                          <Badge variant="secondary" className="text-xs">Rich Text (TipTap)</Badge>
                          <Badge variant="secondary" className="text-xs">Regex Validation</Badge>
                          <Badge variant="secondary" className="text-xs">Star/Smiley Rating</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  {/* Operators */}
                  <div>
                    <h4 className="font-semibold mb-4 flex items-center gap-2">
                      <Filter className="h-4 w-4 text-primary" />
                      Operators
                    </h4>
                    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                      <div className="p-3 rounded-lg border text-center">
                        <div className="font-mono text-sm font-medium">equals</div>
                        <p className="text-xs text-muted-foreground mt-1">Exact match</p>
                      </div>
                      <div className="p-3 rounded-lg border text-center">
                        <div className="font-mono text-sm font-medium">not_equals</div>
                        <p className="text-xs text-muted-foreground mt-1">Not equal to</p>
                      </div>
                      <div className="p-3 rounded-lg border text-center">
                        <div className="font-mono text-sm font-medium">contains</div>
                        <p className="text-xs text-muted-foreground mt-1">Includes substring</p>
                      </div>
                      <div className="p-3 rounded-lg border text-center">
                        <div className="font-mono text-sm font-medium">not_contains</div>
                        <p className="text-xs text-muted-foreground mt-1">Excludes substring</p>
                      </div>
                      <div className="p-3 rounded-lg border text-center">
                        <div className="font-mono text-sm font-medium">greater_than</div>
                        <p className="text-xs text-muted-foreground mt-1">Numeric {">"}</p>
                      </div>
                      <div className="p-3 rounded-lg border text-center">
                        <div className="font-mono text-sm font-medium">less_than</div>
                        <p className="text-xs text-muted-foreground mt-1">Numeric {"<"}</p>
                      </div>
                      <div className="p-3 rounded-lg border text-center">
                        <div className="font-mono text-sm font-medium">starts_with</div>
                        <p className="text-xs text-muted-foreground mt-1">Prefix match</p>
                      </div>
                      <div className="p-3 rounded-lg border text-center">
                        <div className="font-mono text-sm font-medium">ends_with</div>
                        <p className="text-xs text-muted-foreground mt-1">Suffix match</p>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  {/* UI Terms */}
                  <div>
                    <h4 className="font-semibold mb-4 flex items-center gap-2">
                      <LayoutGrid className="h-4 w-4 text-primary" />
                      Interface Terms
                    </h4>
                    <div className="grid gap-3">
                      <div className="p-4 rounded-lg border bg-muted/30">
                        <div className="flex items-start gap-3">
                          <Badge variant="outline" className="shrink-0 mt-0.5">Builder</Badge>
                          <p className="text-sm">
                            The main editing interface where questionnaires are designed. Features a sidebar tree view and main workspace for editing.
                          </p>
                        </div>
                      </div>
                      
                      <div className="p-4 rounded-lg border bg-muted/30">
                        <div className="flex items-start gap-3">
                          <Badge variant="outline" className="shrink-0 mt-0.5">Executor</Badge>
                          <p className="text-sm">
                            The runtime interface where end-users fill out questionnaires. Handles navigation, validation, conditional rendering, and response export.
                          </p>
                        </div>
                      </div>
                      
                      <div className="p-4 rounded-lg border bg-muted/30">
                        <div className="flex items-start gap-3">
                          <Badge variant="outline" className="shrink-0 mt-0.5">Preview</Badge>
                          <p className="text-sm">
                            Opens the Executor with current questionnaire data for testing. Uses session storage for instant data transfer without file export.
                          </p>
                        </div>
                      </div>
                      
                      <div className="p-4 rounded-lg border bg-muted/30">
                        <div className="flex items-start gap-3">
                          <Badge variant="outline" className="shrink-0 mt-0.5">Draft</Badge>
                          <p className="text-sm">
                            A saved work-in-progress questionnaire stored in localStorage. Drafts preserve all configuration and can be resumed later.
                          </p>
                        </div>
                      </div>
                    </div>
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
