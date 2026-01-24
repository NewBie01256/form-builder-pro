import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, X, FileText } from "lucide-react";
import { Page } from "@/types/questionnaire";
import { cn } from "@/lib/utils";
import { ConfirmDialog } from "@/components/fluent";

interface PageTabsProps {
  pages: Page[];
  activePageId: string | null;
  onSelectPage: (pageId: string) => void;
  onAddPage: () => void;
  onDeletePage: (pageId: string) => void;
  onUpdatePage: (pageId: string, updated: Partial<Page>) => void;
}

const PageTabs = ({
  pages,
  activePageId,
  onSelectPage,
  onAddPage,
  onDeletePage,
  onUpdatePage,
}: PageTabsProps) => {
  const [editingPageId, setEditingPageId] = useState<string | null>(null);

  const handleDoubleClick = (pageId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingPageId(pageId);
  };

  const handleBlur = () => {
    setEditingPageId(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === "Escape") {
      setEditingPageId(null);
    }
  };

  return (
    <div className="flex items-center gap-1 px-4 py-2 border-b bg-muted/30 overflow-x-auto">
      {pages.map((page, index) => (
        <div
          key={page.id}
          className={cn(
            "group flex items-center gap-2 px-3 py-1.5 rounded-md cursor-pointer transition-colors",
            "border",
            activePageId === page.id
              ? "bg-primary/10 border-primary text-primary shadow-sm"
              : "border-transparent hover:bg-background/50"
          )}
          onClick={() => onSelectPage(page.id)}
          onDoubleClick={(e) => handleDoubleClick(page.id, e)}
        >
          <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
          {editingPageId === page.id ? (
            <Input
              value={page.name}
              onChange={(e) => onUpdatePage(page.id, { name: e.target.value })}
              onClick={(e) => e.stopPropagation()}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              className="h-6 w-24 px-1 text-sm border border-primary bg-background focus-visible:ring-1 focus-visible:ring-offset-0"
              placeholder={`Page ${index + 1}`}
              autoFocus
            />
          ) : (
            <span className="text-sm truncate min-w-[60px] select-none">
              {page.name || `Page ${index + 1}`}
            </span>
          )}
          {pages.length > 1 && (
            <ConfirmDialog
              trigger={
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-5 w-5 p-0 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
                  onClick={(e) => e.stopPropagation()}
                >
                  <X className="h-3 w-3" />
                </Button>
              }
              title="Delete Page"
              description={`Are you sure you want to delete "${page.name || `Page ${index + 1}`}"? This will remove all sections, questions, and branches within it. This action cannot be undone.`}
              onConfirm={() => onDeletePage(page.id)}
            />
          )}
        </div>
      ))}
      <Button
        variant="ghost"
        size="sm"
        onClick={onAddPage}
        className="h-8 px-2 text-muted-foreground hover:text-foreground shrink-0"
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default PageTabs;
