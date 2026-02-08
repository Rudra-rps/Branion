'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import type { CurriculumData } from '@/lib/export-utils'

interface CurriculumContextType {
  curriculum: CurriculumData | null
  setCurriculum: (curriculum: CurriculumData | null) => void
  isGenerating: boolean
  setIsGenerating: (isGenerating: boolean) => void
}

const CurriculumContext = createContext<CurriculumContextType | undefined>(undefined)

export function CurriculumProvider({ children }: { children: ReactNode }) {
  const [curriculum, setCurriculum] = useState<CurriculumData | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  return (
    <CurriculumContext.Provider
      value={{
        curriculum,
        setCurriculum,
        isGenerating,
        setIsGenerating,
      }}
    >
      {children}
    </CurriculumContext.Provider>
  )
}

export function useCurriculum() {
  const context = useContext(CurriculumContext)
  if (context === undefined) {
    throw new Error('useCurriculum must be used within a CurriculumProvider')
  }
  return context
}
