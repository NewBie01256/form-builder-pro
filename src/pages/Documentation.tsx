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
