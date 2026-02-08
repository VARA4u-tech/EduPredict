import { get, put, post } from "./api";

// Types for Student endpoints
export interface Student {
  id: string;
  name: string;
  email: string;
  grade: string;
  attendance: number;
  assignmentCompletion: number;
  quizScores: number;
  studyHours: number;
  participation: number;
  level: number;
  xp: number;
  badges: string[];
}

export interface StudentResponse {
  success: boolean;
  student: Student;
}

export interface ProgressMetric {
  value: number;
  trend: "up" | "down" | "stable";
  change: number;
}

export interface SubjectAverage {
  name: string;
  internal: number;
  external: number;
  average: number;
}

// Subject types
export interface Subject {
  name: string;
  internalMarks: number;
  externalMarks: number;
  predictedScore: number;
}

export interface StudentProgress {
  studentId: string;
  name: string;
  rollNumber?: string;
  gender?: string;
  overallScore: number;
  hasSubjectData: boolean;
  subjects: Subject[];
  subjectAverages: SubjectAverage[];
  metrics: {
    attendance: ProgressMetric;
    assignments: ProgressMetric;
    quizzes: ProgressMetric;
    participation: ProgressMetric;
  };
  gamification: {
    level: number;
    xp: number;
    xpToNextLevel: number;
    badges: string[];
  };
  weeklyStudyHours: number;
  successPrediction: string;
}

export interface ProgressResponse {
  success: boolean;
  progress: StudentProgress;
}

export interface WhatIfScenarioRequest {
  scenario: string;
}

export interface WhatIfScenarioResponse {
  success: boolean;
  scenario:
    | {
        impact: string;
        projectedScores: Record<string, number>;
        timeline: string;
        actionSteps: string[];
        challenges: string[];
        encouragement: string;
      }
    | string;
}

// Student Service Functions

/**
 * Get student profile by ID
 */
export async function getStudentProfile(
  studentId: string,
): Promise<StudentResponse> {
  return get<StudentResponse>(`/students/${studentId}`);
}

/**
 * Update student data
 */
export async function updateStudentData(
  studentId: string,
  data: Partial<Student>,
): Promise<StudentResponse> {
  return put<StudentResponse>(`/students/${studentId}`, data);
}

/**
 * Get student progress and analytics
 */
export async function getStudentProgress(
  studentId: string,
): Promise<ProgressResponse> {
  return get<ProgressResponse>(`/students/${studentId}/progress`);
}

/**
 * Analyze "What If" scenario
 */
export async function analyzeWhatIfScenario(
  studentId: string,
  scenario: string,
): Promise<WhatIfScenarioResponse> {
  return post<WhatIfScenarioResponse>(`/students/${studentId}/what-if`, {
    scenario,
  });
}

export interface SubjectsResponse {
  success: boolean;
  subjects: Subject[];
  studentName?: string;
  rollNumber?: string;
}

/**
 * Get student subjects/marks
 */
export async function getStudentSubjects(
  studentId: string,
): Promise<SubjectsResponse> {
  return get<SubjectsResponse>(`/students/${studentId}/subjects`);
}

/**
 * Update student subjects/marks
 */
export async function updateStudentSubjects(
  studentId: string,
  subjects: Subject[],
): Promise<SubjectsResponse> {
  return put<SubjectsResponse>(`/students/${studentId}/subjects`, { subjects });
}
