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
                    Answer sets define the available options for choice-based questions (Choice, Radio Button, Multi-Select). 
                    Each question can have multiple answer sets that can be conditionally displayed based on previous answers.
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
                          Manually defined lists with label/value pairs. Each question starts with one default answer set.
                        </p>
                        <ul className="text-xs text-muted-foreground space-y-1">
                          <li>• Editable name and tag for identification</li>
                          <li>• Multiple answers with label + value</li>
                          <li>• Can be marked as default</li>
                          <li>• Supports Action Records on each answer</li>
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
                  
                  {/* Answer Set Editor Flow */}
                  <div>
                    <h4 className="font-semibold mb-4">Answer Set Editor</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      When you select a question, the Answer Set Editor appears below the question details, allowing you to manage all answer options.
                    </p>
                    
                    <div className="p-4 rounded-lg bg-muted/30 border space-y-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <div className="text-sm font-medium mb-2">Answer Set Header</div>
                          <ul className="text-xs text-muted-foreground space-y-1">
                            <li>• <strong>Name:</strong> Descriptive name (e.g., "Department Options")</li>
                            <li>• <strong>Tag:</strong> Short identifier (e.g., "DEPT")</li>
                            <li>• <strong>Default Toggle:</strong> Mark as the primary answer set</li>
                          </ul>
                        </div>
                        <div>
                          <div className="text-sm font-medium mb-2">Answer Row</div>
                          <ul className="text-xs text-muted-foreground space-y-1">
                            <li>• <strong>Label:</strong> What users see (e.g., "Engineering")</li>
                            <li>• <strong>Value:</strong> What's stored (e.g., "ENG")</li>
                            <li>• <strong>Zap Icon:</strong> Attach an Action Record</li>
                            <li>• <strong>Trash Icon:</strong> Remove the answer</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  {/* Adding Answers Flow */}
                  <div>
                    <h4 className="font-semibold mb-4">Adding & Managing Answers</h4>
                    <div className="space-y-4">
                      <div className="flex gap-4 p-4 rounded-lg border">
                        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-primary-foreground font-bold text-sm shrink-0">
                          1
                        </div>
                        <div>
                          <div className="font-medium">Click "Add Answer"</div>
                          <p className="text-sm text-muted-foreground mt-1">
                            Creates a new empty answer row at the bottom of the list. Each new answer starts with empty label and value fields.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex gap-4 p-4 rounded-lg border">
                        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-primary-foreground font-bold text-sm shrink-0">
                          2
                        </div>
                        <div>
                          <div className="font-medium">Fill in Label and Value</div>
                          <p className="text-sm text-muted-foreground mt-1">
                            The label is displayed to users; the value is stored in the response data. They can be the same or different depending on your needs.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex gap-4 p-4 rounded-lg border">
                        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-primary-foreground font-bold text-sm shrink-0">
                          3
                        </div>
                        <div>
                          <div className="font-medium">Optionally Attach Action Record</div>
                          <p className="text-sm text-muted-foreground mt-1">
                            Click the <Zap className="h-3 w-3 inline" /> icon next to any answer to configure ITSM categorization 
                            (operation/product categories, impact, urgency) that triggers when this answer is selected.
                          </p>
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
                          This feature is hidden for simple types (Text, Number, Date, Rating, Boolean).
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  {/* Simple Types Behavior */}
                  <div>
                    <h4 className="font-semibold mb-4">Simple Type Behavior</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      For non-choice question types, the Answer Set Editor adapts to show only relevant fields:
                    </p>
                    
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="p-3 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Type className="h-4 w-4 text-primary" />
                          <span className="font-medium text-sm">Text Questions</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Shows a Textarea for entering a "Default Text Answer" instead of multiple choice options.
                        </p>
                      </div>
                      
                      <div className="p-3 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Hash className="h-4 w-4 text-primary" />
                          <span className="font-medium text-sm">Number Questions</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Shows a number input for default value along with min/max/step configuration.
                        </p>
                      </div>
                      
                      <div className="p-3 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="h-4 w-4 text-primary" />
                          <span className="font-medium text-sm">Date Questions</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Shows a date picker for default value with optional min/max date constraints.
                        </p>
                      </div>
                      
                      <div className="p-3 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Star className="h-4 w-4 text-primary" />
                          <span className="font-medium text-sm">Rating Questions</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Shows scale configuration (min/max) with optional endpoint labels.
                        </p>
                      </div>
                      
                      <div className="p-3 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <ToggleLeft className="h-4 w-4 text-primary" />
                          <span className="font-medium text-sm">Boolean Questions</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Shows a Switch toggle for setting the default value (true/false).
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
                      Every new answer set (standard or inline) is automatically initialized with one empty answer 
                      containing empty label and value fields, marked as active. This ensures you always have a starting point for configuration.
                    </p>
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
                        Choice (Dropdown)
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
