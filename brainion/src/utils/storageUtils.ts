import type { Curriculum, Goal } from '../types/curriculum';

export interface SavedCurriculum {
  id: string;
  goal: Goal;
  curriculum: Curriculum;
  createdAt: string;
  updatedAt: string;
}

const STORAGE_KEY = 'brainion_curricula';
const MAX_SAVED_CURRICULA = 10;

/**
 * Generate unique ID for curriculum
 */
function generateId(): string {
  return `${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Get all saved curricula from localStorage
 */
export function getSavedCurricula(): SavedCurriculum[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    return JSON.parse(data);
  } catch (error) {
    console.error('Failed to load saved curricula:', error);
    return [];
  }
}

/**
 * Save curriculum to localStorage
 */
export function saveCurriculum(goal: Goal, curriculum: Curriculum): SavedCurriculum {
  const saved: SavedCurriculum = {
    id: generateId(),
    goal,
    curriculum,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  try {
    let curricula = getSavedCurricula();
    
    // Add new curriculum at the beginning
    curricula.unshift(saved);
    
    // Limit to max saved curricula
    if (curricula.length > MAX_SAVED_CURRICULA) {
      curricula = curricula.slice(0, MAX_SAVED_CURRICULA);
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(curricula));
    return saved;
  } catch (error) {
    console.error('Failed to save curriculum:', error);
    throw new Error('Failed to save curriculum to storage');
  }
}

/**
 * Delete curriculum by ID
 */
export function deleteCurriculum(id: string): void {
  try {
    const curricula = getSavedCurricula();
    const filtered = curricula.filter((c) => c.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Failed to delete curriculum:', error);
    throw new Error('Failed to delete curriculum');
  }
}

/**
 * Get curriculum by ID
 */
export function getCurriculumById(id: string): SavedCurriculum | null {
  const curricula = getSavedCurricula();
  return curricula.find((c) => c.id === id) || null;
}

/**
 * Clear all saved curricula
 */
export function clearAllCurricula(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear curricula:', error);
    throw new Error('Failed to clear all curricula');
  }
}

/**
 * Encode curriculum to shareable URL-safe string
 */
export function encodeCurriculumToURL(goal: Goal, curriculum: Curriculum): string {
  const data = { goal, curriculum };
  const json = JSON.stringify(data);
  return btoa(encodeURIComponent(json));
}

/**
 * Decode curriculum from URL-safe string
 */
export function decodeCurriculumFromURL(encoded: string): { goal: Goal; curriculum: Curriculum } | null {
  try {
    const json = decodeURIComponent(atob(encoded));
    return JSON.parse(json);
  } catch (error) {
    console.error('Failed to decode curriculum:', error);
    return null;
  }
}

/**
 * Generate shareable link
 */
export function generateShareLink(goal: Goal, curriculum: Curriculum): string {
  const encoded = encodeCurriculumToURL(goal, curriculum);
  const baseUrl = window.location.origin + window.location.pathname;
  return `${baseUrl}?shared=${encoded}`;
}

/**
 * Copy share link to clipboard
 */
export async function copyShareLink(goal: Goal, curriculum: Curriculum): Promise<string> {
  const link = generateShareLink(goal, curriculum);
  await navigator.clipboard.writeText(link);
  return link;
}

/**
 * Load curriculum from URL parameter
 */
export function loadCurriculumFromURL(): { goal: Goal; curriculum: Curriculum } | null {
  const params = new URLSearchParams(window.location.search);
  const shared = params.get('shared');
  
  if (!shared) return null;
  
  return decodeCurriculumFromURL(shared);
}
