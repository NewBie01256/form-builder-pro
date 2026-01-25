import { Questionnaire } from "@/types/questionnaire";
import { ExportedQuestionnaire, buildExportData } from "./questionnaireExport";

/**
 * Generic wrapper class for Questionnaire operations.
 * Provides programmatic access to questionnaire data in the standard export format.
 */
export class QuestionnaireWrapper {
  private questionnaire: Questionnaire;

  constructor(questionnaire: Questionnaire) {
    this.questionnaire = questionnaire;
  }

  /**
   * Returns the full questionnaire JSON in the standard export format.
   * Same structure as Export JSON feature.
   */
  toJSON(): ExportedQuestionnaire {
    return buildExportData(this.questionnaire);
  }

  /**
   * Returns the questionnaire JSON as a formatted string.
   * @param indent - Number of spaces for indentation (default: 2)
   */
  toJSONString(indent: number = 2): string {
    return JSON.stringify(this.toJSON(), null, indent);
  }

  /**
   * Returns the raw questionnaire object without export metadata.
   */
  getRawQuestionnaire(): Questionnaire {
    return this.questionnaire;
  }

  /**
   * Updates the wrapped questionnaire.
   */
  setQuestionnaire(questionnaire: Questionnaire): void {
    this.questionnaire = questionnaire;
  }

  /**
   * Returns questionnaire metadata.
   */
  getMetadata(): { name: string; description: string; status: string; version: string; serviceCatalog: string } {
    return {
      name: this.questionnaire.name,
      description: this.questionnaire.description,
      status: this.questionnaire.status,
      version: this.questionnaire.version,
      serviceCatalog: this.questionnaire.serviceCatalog,
    };
  }

  /**
   * Creates a Blob suitable for file download or API transmission.
   */
  toBlob(): Blob {
    return new Blob([this.toJSONString()], { type: "application/json" });
  }

  /**
   * Static factory method to create wrapper from existing questionnaire.
   */
  static from(questionnaire: Questionnaire): QuestionnaireWrapper {
    return new QuestionnaireWrapper(questionnaire);
  }

  /**
   * Static factory method to create wrapper from exported JSON.
   */
  static fromExport(exported: ExportedQuestionnaire): QuestionnaireWrapper {
    return new QuestionnaireWrapper(exported.questionnaire);
  }
}

/**
 * Factory function for creating QuestionnaireWrapper instances.
 */
export const createQuestionnaireWrapper = (questionnaire: Questionnaire): QuestionnaireWrapper => {
  return new QuestionnaireWrapper(questionnaire);
};
