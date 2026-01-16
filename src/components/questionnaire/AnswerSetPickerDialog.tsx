import { useState, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Check } from "lucide-react";
import { AnswerSet } from "@/types/questionnaire";
import { sampleAnswerSets, getUniqueTags } from "@/data/sampleAnswerSets";
import { cn } from "@/lib/utils";

interface AnswerSetPickerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (answerSet: AnswerSet) => void;
}

const AnswerSetPickerDialog = ({
  open,
  onOpenChange,
  onSelect,
}: AnswerSetPickerDialogProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const tags = useMemo(() => getUniqueTags(), []);

  const filteredAnswerSets = useMemo(() => {
    return sampleAnswerSets.filter((set) => {
      const matchesSearch =
        searchQuery === "" ||
        set.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        set.tag.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTag = selectedTag === null || set.tag === selectedTag;
      return matchesSearch && matchesTag;
    });
  }, [searchQuery, selectedTag]);

  const handleSelect = (answerSet: AnswerSet) => {
    // Create a copy with new IDs to avoid conflicts
    const newAnswerSet: AnswerSet = {
      ...answerSet,
      id: `as-${Date.now()}`,
      answers: answerSet.answers.map((ans) => ({
        ...ans,
        id: `ans-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      })),
    };
    onSelect(newAnswerSet);
    onOpenChange(false);
    setSearchQuery("");
    setSelectedTag(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Add from Existing Answer Set</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search answer sets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* Tag filters */}
          <div className="flex flex-wrap gap-2">
            <Badge
              variant={selectedTag === null ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setSelectedTag(null)}
            >
              All
            </Badge>
            {tags.map((tag) => (
              <Badge
                key={tag}
                variant={selectedTag === tag ? "default" : "outline"}
                className="cursor-pointer capitalize"
                onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>

          {/* Answer set list */}
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-2">
              {filteredAnswerSets.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No answer sets found
                </div>
              ) : (
                filteredAnswerSets.map((set) => (
                  <div
                    key={set.id}
                    className={cn(
                      "p-4 border border-border rounded-lg cursor-pointer transition-colors",
                      "hover:bg-accent hover:border-accent"
                    )}
                    onClick={() => handleSelect(set)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{set.name}</span>
                      <Badge variant="secondary" className="capitalize">
                        {set.tag}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {set.answers.slice(0, 5).map((ans) => (
                        <Badge
                          key={ans.id}
                          variant="outline"
                          className="text-xs"
                        >
                          {ans.label}
                        </Badge>
                      ))}
                      {set.answers.length > 5 && (
                        <Badge variant="outline" className="text-xs">
                          +{set.answers.length - 5} more
                        </Badge>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AnswerSetPickerDialog;
