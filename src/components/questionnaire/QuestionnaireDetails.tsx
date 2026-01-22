import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Questionnaire } from "@/types/questionnaire";

interface QuestionnaireDetailsProps {
  questionnaire: Questionnaire;
  onUpdate: (updated: Questionnaire) => void;
  onPublish?: () => void;
  canPublish?: boolean;
}

const QuestionnaireDetails = ({ questionnaire, onUpdate, onPublish, canPublish = false }: QuestionnaireDetailsProps) => {
  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">Questionnaire Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Details Box */}
        <div className="border border-border rounded-lg p-4 bg-muted/30 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Enter questionnaire name"
                value={questionnaire.name}
                onChange={(e) => onUpdate({ ...questionnaire, name: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="catalog">Service Catalog</Label>
              <Select
                value={questionnaire.serviceCatalog}
                onValueChange={(value) => onUpdate({ ...questionnaire, serviceCatalog: value })}
              >
                <SelectTrigger id="catalog">
                  <SelectValue placeholder="Select catalog" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Catalog A">Catalog A</SelectItem>
                  <SelectItem value="Catalog B">Catalog B</SelectItem>
                  <SelectItem value="Catalog C">Catalog C</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              placeholder="Enter description"
              value={questionnaire.description}
              onChange={(e) => onUpdate({ ...questionnaire, description: e.target.value })}
            />
          </div>
        </div>

        {/* Status and Publish */}
        <div className="space-y-3">
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={questionnaire.status}
              onValueChange={(value) => onUpdate({ ...questionnaire, status: value })}
            >
              <SelectTrigger id="status">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Draft">Draft</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button 
            onClick={onPublish} 
            disabled={!canPublish}
            className="w-full"
            title={!canPublish ? "Only records opened from Templates can be published back" : "Publish changes to the record"}
          >
            Publish
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuestionnaireDetails;
