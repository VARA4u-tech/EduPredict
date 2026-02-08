import { post } from "./api";

// Types for AI endpoints
export interface StudentData {
  attendance?: number;
  assignmentCompletion?: number;
  quizScores?: number;
  studyHours?: number;
  participation?: number;
}

export interface PredictionResponse {
  success: boolean;
  prediction:
    | {
        successProbability: number;
        strengths: string[];
        improvements: string[];
        recommendations: string[];
      }
    | string;
}

export interface StudyAdviceRequest {
  subject: string;
  currentLevel?: string;
  learningStyle?: string;
  challenges?: string;
}

export interface StudyAdviceResponse {
  success: boolean;
  advice: string;
}

export interface ComicNarrativeRequest {
  studentName?: string;
  journey?: string;
  achievements?: string;
  challenges?: string;
}

export interface ComicPanel {
  panel: number;
  scene: string;
  dialogue: string;
  mood: string;
}

export interface ComicNarrativeResponse {
  success: boolean;
  comic: ComicPanel[] | string;
}

export interface ChatRequest {
  message: string;
  context?: "student" | "admin";
}

export interface ChatResponse {
  success: boolean;
  response: string;
}

// AI Service Functions

/**
 * Generate a success prediction based on student data
 */
export async function generatePrediction(
  studentData: StudentData,
): Promise<PredictionResponse> {
  return post<PredictionResponse>("/ai/predict", { studentData });
}

/**
 * Get personalized study advice
 */
export async function getStudyAdvice(
  request: StudyAdviceRequest,
): Promise<StudyAdviceResponse> {
  return post<StudyAdviceResponse>("/ai/study-advice", request);
}

/**
 * Generate comic narrative for student journey
 */
export async function generateComicNarrative(
  request: ComicNarrativeRequest,
): Promise<ComicNarrativeResponse> {
  return post<ComicNarrativeResponse>("/ai/comic-narrative", request);
}

/**
 * Send a chat message to the AI assistant
 */
export async function chatWithAI(
  message: string,
  context: "student" | "admin" = "student",
): Promise<ChatResponse> {
  return post<ChatResponse>("/ai/chat", { message, context });
}
