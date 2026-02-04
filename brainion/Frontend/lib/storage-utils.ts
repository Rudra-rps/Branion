import type { CurriculumData } from './export-utils'

export interface SavedCurriculum {
  id: string
  curriculum: CurriculumData
  createdAt: string
  updatedAt: string
}

const STORAGE_KEY = 'brainion_curricula'
const MAX_SAVED_CURRICULA = 10

/**
 * Generate unique ID for curriculum
 */
function generateId(): string {
  return `${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
}

/**
 * Get all saved curricula from localStorage
 */
export function getSavedCurricula(): SavedCurriculum[] {
  if (typeof window === 'undefined') return []
  
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    if (!data) return []
    return JSON.parse(data)
  } catch (error) {
    console.error('Failed to load saved curricula:', error)
    return []
  }
}

/**
 * Save curriculum to localStorage
 */
export function saveCurriculum(curriculum: CurriculumData): SavedCurriculum {
  const saved: SavedCurriculum = {
    id: generateId(),
    curriculum,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  try {
    let curricula = getSavedCurricula()
    
    // Add new curriculum at the beginning
    curricula.unshift(saved)
    
    // Limit to max saved curricula
    if (curricula.length > MAX_SAVED_CURRICULA) {
      curricula = curricula.slice(0, MAX_SAVED_CURRICULA)
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(curricula))
    return saved
  } catch (error) {
    console.error('Failed to save curriculum:', error)
    throw new Error('Failed to save curriculum to storage')
  }
}

/**
 * Update existing curriculum in localStorage
 */
export function updateCurriculum(id: string, curriculum: CurriculumData): void {
  try {
    const curricula = getSavedCurricula()
    const index = curricula.findIndex((c) => c.id === id)
    
    if (index !== -1) {
      curricula[index] = {
        ...curricula[index],
        curriculum,
        updatedAt: new Date().toISOString(),
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(curricula))
    }
  } catch (error) {
    console.error('Failed to update curriculum:', error)
    throw new Error('Failed to update curriculum')
  }
}

/**
 * Delete curriculum by ID
 */
export function deleteCurriculum(id: string): void {
  try {
    const curricula = getSavedCurricula()
    const filtered = curricula.filter((c) => c.id !== id)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
  } catch (error) {
    console.error('Failed to delete curriculum:', error)
    throw new Error('Failed to delete curriculum')
  }
}

/**
 * Get curriculum by ID
 */
export function getCurriculumById(id: string): SavedCurriculum | null {
  const curricula = getSavedCurricula()
  return curricula.find((c) => c.id === id) || null
}

/**
 * Clear all saved curricula
 */
export function clearAllCurricula(): void {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (error) {
    console.error('Failed to clear curricula:', error)
    throw new Error('Failed to clear all curricula')
  }
}

/**
 * Load curriculum from URL parameter
 */
export function loadCurriculumFromURL(): CurriculumData | null {
  if (typeof window === 'undefined') return null
  
  const params = new URLSearchParams(window.location.search)
  const shared = params.get('shared')
  
  if (!shared) return null
  
  try {
    const json = decodeURIComponent(atob(shared))
    return JSON.parse(json)
  } catch (error) {
    console.error('Failed to decode curriculum:', error)
    return null
  }
}
