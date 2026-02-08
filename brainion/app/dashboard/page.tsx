'use client'

import { Header } from '@/components/header'
import { Sidebar } from '@/components/sidebar'
import { CurriculumDisplay } from '@/components/curriculum-display'

export default function Dashboard() {
  return (
    <div className="flex flex-col h-screen bg-background">
      <Header />

      <div className="flex flex-1 overflow-hidden flex-col lg:flex-row">
        {/* Sidebar - responsive */}
        <div className="w-full lg:w-80 lg:flex-shrink-0 overflow-y-auto">
          <Sidebar />
        </div>

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-6 lg:p-8 max-w-6xl mx-auto w-full">
            <CurriculumDisplay />
          </div>
        </main>
      </div>
    </div>
  )
}
