import { useState, useEffect, useCallback } from "react";
import {
  getStudentProfile,
  getStudentProgress,
  updateStudentData,
  analyzeWhatIfScenario,
  type Student,
  type StudentProgress,
  type WhatIfScenarioResponse,
} from "../services";

/**
 * Hook for fetching and managing student profile
 */
export function useStudentProfile(studentId: string) {
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    if (!studentId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await getStudentProfile(studentId);
      setStudent(response.student);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch profile";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [studentId]);

  const updateProfile = useCallback(
    async (data: Partial<Student>) => {
      if (!studentId) return;

      try {
        const response = await updateStudentData(studentId, data);
        setStudent(response.student);
        return response.student;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to update profile";
        setError(errorMessage);
        throw err;
      }
    },
    [studentId],
  );

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return { student, loading, error, refresh: fetchProfile, updateProfile };
}

/**
 * Hook for fetching student progress/analytics
 */
export function useStudentProgress(studentId: string) {
  const [progress, setProgress] = useState<StudentProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProgress = useCallback(async () => {
    if (!studentId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await getStudentProgress(studentId);
      setProgress(response.progress);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch progress";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [studentId]);

  useEffect(() => {
    fetchProgress();
  }, [fetchProgress]);

  return { progress, loading, error, refresh: fetchProgress };
}

/**
 * Hook for "What If" scenario analysis
 */
export function useWhatIfScenario(studentId: string) {
  const [result, setResult] = useState<
    WhatIfScenarioResponse["scenario"] | null
  >(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyze = useCallback(
    async (scenario: string) => {
      if (!studentId) return;

      setLoading(true);
      setError(null);

      try {
        const response = await analyzeWhatIfScenario(studentId, scenario);
        setResult(response.scenario);
        return response.scenario;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to analyze scenario";
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [studentId],
  );

  const reset = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  return { result, loading, error, analyze, reset };
}
