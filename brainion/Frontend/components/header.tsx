'use client'

import { useState } from 'react'
import { Brain, Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Header() {
  const [isDark, setIsDark] = useState(false)

  const toggleDarkMode = () => {
    setIsDark(!isDark)
    if (!isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-primary to-secondary shadow-lg">
      <div className="flex items-center justify-between px-4 md:px-6 py-3 md:py-4">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="bg-white rounded-lg p-1.5 md:p-2 shadow-md">
            <Brain className="w-5 h-5 md:w-6 md:h-6 text-primary" />
          </div>
          <h1 className="text-lg md:text-xl font-bold text-white hidden sm:block">
            Brainion
          </h1>
        </div>

        <button
          onClick={toggleDarkMode}
          className="p-2 md:p-2.5 rounded-lg bg-white/20 hover:bg-white/30 transition-colors text-white"
          aria-label="Toggle dark mode"
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>
    </header>
  )
}
