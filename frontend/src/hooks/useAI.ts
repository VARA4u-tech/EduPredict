import { useState, useCallback } from "react";
import {
  chatWithAI,
  generatePrediction,
  getStudyAdvice,
  generateComicNarrative,
  type StudentData,
  type ChatResponse,
  type PredictionResponse,
  type StudyAdviceResponse,
  type ComicNarrativeResponse,
  type StudyAdviceRequest,
  type ComicNarrativeRequest,
} from "../services";

// Generic hook for async API calls
function useAsyncAPI<TRequest, TResponse>(
  apiFunction: (request: TRequest) => Promise<TResponse>,
) {
  const [data, setData] = useState<TResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(
    async (request: TRequest) => {
      setLoading(true);
      setError(null);
      try {
        const response = await apiFunction(request);
        setData(response);
        return response;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "An error occurred";
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [apiFunction],
  );

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return { data, loading, error, execute, reset };
}

/**
 * Hook for AI chat functionality
 */
export function useAIChat() {
  const [messages, setMessages] = useState<
    Array<{ role: "user" | "assistant"; content: string }>
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(
    async (message: string, context: "student" | "admin" = "student") => {
      setLoading(true);
      setError(null);

      // Add user message
      setMessages((prev) => [...prev, { role: "user", content: message }]);

      try {
        const response = await chatWithAI(message, context);

        // Add AI response
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: response.response },
        ]);

        return response;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to send message";
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const clearMessages = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  return { messages, loading, error, sendMessage, clearMessages };
}

/**
 * Hook for generating predictions
 */
export function usePrediction() {
  return useAsyncAPI<StudentData, PredictionResponse>(generatePrediction);
}

/**
 * Hook for getting study advice
 */
export function useStudyAdvice() {
  return useAsyncAPI<StudyAdviceRequest, StudyAdviceResponse>(getStudyAdvice);
}

/**
 * Hook for generating comic narratives
 */
export function useComicNarrative() {
  return useAsyncAPI<ComicNarrativeRequest, ComicNarrativeResponse>(
    generateComicNarrative,
  );
}
