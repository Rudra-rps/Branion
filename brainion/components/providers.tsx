'use client'

import { ReactNode } from 'react'
import { TamboProvider } from '@tambo-ai/react'
import { CurriculumProvider } from '@/hooks/use-curriculum'
import { Toaster } from '@/components/ui/toaster'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <TamboProvider apiKey={process.env.NEXT_PUBLIC_TAMBO_API_KEY || ''}>
      <CurriculumProvider>
        {children}
        <Toaster />
      </CurriculumProvider>
    </TamboProvider>
  )
}
