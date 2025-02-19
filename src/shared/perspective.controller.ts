import axios from "axios";
import { perspectiveKey } from "../../config.js";
export class perspectiveAnalisys {
  static async analyzeText(text: string): Promise<number | null> {
    try {
      const response = await axios.post(
        `https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key=${perspectiveKey}`,
        {
          comment: { text },
          languages: ["es"],
          requestedAttributes: { TOXICITY: {} },
        }
      );

      return response.data.attributeScores.TOXICITY.summaryScore.value;
    } catch (error) {
      console.error("Error al analizar el texto con Perspective API:", error);
      return null;
    }
  }
}
