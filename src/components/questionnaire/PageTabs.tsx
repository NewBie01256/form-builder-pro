import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, X, FileText } from "lucide-react";
import { Page } from "@/types/questionnaire";
import { cn } from "@/lib/utils";

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
  return (
    <div className="flex items-center gap-1 px-4 py-2 border-b bg-muted/30 overflow-x-auto">
      {pages.map((page, index) => (
        <div
          key={page.id}
          className={cn(
            "group flex items-center gap-2 px-3 py-1.5 rounded-md cursor-pointer transition-colors",
            "border border-transparent",
            activePageId === page.id
              ? "bg-background border-border shadow-sm"
              : "hover:bg-background/50"
          )}
          onClick={() => onSelectPage(page.id)}
        >
          <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
          <Input
            value={page.name}
            onChange={(e) => {
              e.stopPropagation();
              onUpdatePage(page.id, { name: e.target.value });
            }}
            onClick={(e) => e.stopPropagation()}
            className="h-6 w-24 px-1 text-sm border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder={`Page ${index + 1}`}
          />
          {pages.length > 1 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-5 w-5 p-0 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
              onClick={(e) => {
                e.stopPropagation();
                onDeletePage(page.id);
              }}
            >
              <X className="h-3 w-3" />
            </Button>
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
