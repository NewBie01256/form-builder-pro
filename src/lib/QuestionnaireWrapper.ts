import { Questionnaire } from "@/types/questionnaire";
import { ExportedQuestionnaire, buildExportData } from "./questionnaireExport";
import { DraftService, SavedDraft } from "./storage/draftService";
import { PublishedService, PublishedRecord } from "./storage/publishedService";
import { Result, success, failure } from "./core/result";

/**
 * Lookup result containing the questionnaire and its source
 */
export interface QuestionnaireLookupResult {
  questionnaire: Questionnaire;
  source: 'draft' | 'published';
  id: string;
  name: string;
}

/**
 * Generic wrapper class for Questionnaire operations.
 * Provides programmatic access to questionnaire data in the standard export format.
 */
export class QuestionnaireWrapper {
  private questionnaire: Questionnaire;
  private sourceInfo?: { source: 'draft' | 'published'; id: string };

  constructor(questionnaire: Questionnaire, sourceInfo?: { source: 'draft' | 'published'; id: string }) {
    this.questionnaire = questionnaire;
    this.sourceInfo = sourceInfo;
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
   * Returns the source info if loaded via fromId or fromName
   */
  getSourceInfo(): { source: 'draft' | 'published'; id: string } | undefined {
    return this.sourceInfo;
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

  /**
   * Load questionnaire from localStorage by ID.
   * Searches both drafts and published records.
   * 
   * @example
   * const result = QuestionnaireWrapper.fromId("draft-abc123");
   * if (result.success) {
   *   const wrapper = result.data;
   *   console.log(wrapper.toJSON());
   * }
   */
  static fromId(id: string): Result<QuestionnaireWrapper, Error> {
    // Check drafts first
    const draft = DraftService.findById(id);
    if (draft) {
      return success(new QuestionnaireWrapper(
        draft.questionnaire,
        { source: 'draft', id: draft.id }
      ));
    }

    // Check published records
    const published = PublishedService.findById(id);
    if (published) {
      return success(new QuestionnaireWrapper(
        published.questionnaire,
        { source: 'published', id: published.metadata.id }
      ));
    }

    return failure(new Error(`Questionnaire not found with ID: ${id}`));
  }

  /**
   * Load questionnaire from localStorage by name.
   * Searches both drafts and published records.
   * Returns the first match found (published records take priority).
   * 
   * @example
   * const result = QuestionnaireWrapper.fromName("IT Support Request");
   * if (result.success) {
   *   const wrapper = result.data;
   *   console.log(wrapper.getMetadata());
   * }
   */
  static fromName(name: string): Result<QuestionnaireWrapper, Error> {
    const normalizedName = name.toLowerCase().trim();

    // Check published records first (they take priority)
    const publishedRecords = PublishedService.getAll();
    const publishedMatch = publishedRecords.find(
      r => r.questionnaire.name.toLowerCase().trim() === normalizedName
    );
    if (publishedMatch) {
      return success(new QuestionnaireWrapper(
        publishedMatch.questionnaire,
        { source: 'published', id: publishedMatch.metadata.id }
      ));
    }

    // Check drafts
    const drafts = DraftService.loadAll();
    const draftMatch = drafts.find(
      d => d.questionnaire.name.toLowerCase().trim() === normalizedName
    );
    if (draftMatch) {
      return success(new QuestionnaireWrapper(
        draftMatch.questionnaire,
        { source: 'draft', id: draftMatch.id }
      ));
    }

    return failure(new Error(`Questionnaire not found with name: ${name}`));
  }

  /**
   * List all available questionnaires from localStorage.
   * Returns both drafts and published records.
   */
  static listAll(): QuestionnaireLookupResult[] {
    const results: QuestionnaireLookupResult[] = [];

    // Add published records
    const publishedRecords = PublishedService.getAll();
    for (const record of publishedRecords) {
      results.push({
        questionnaire: record.questionnaire,
        source: 'published',
        id: record.metadata.id,
        name: record.questionnaire.name,
      });
    }

    // Add drafts
    const drafts = DraftService.loadAll();
    for (const draft of drafts) {
      results.push({
        questionnaire: draft.questionnaire,
        source: 'draft',
        id: draft.id,
        name: draft.questionnaire.name,
      });
    }

    return results;
  }
}

/**
 * Factory function for creating QuestionnaireWrapper instances.
 */
export const createQuestionnaireWrapper = (questionnaire: Questionnaire): QuestionnaireWrapper => {
  return new QuestionnaireWrapper(questionnaire);
};
