'use client'

import { useState, useEffect } from 'react'
import { ChevronDown, ChevronUp, CheckCircle } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { DayCard } from '@/components/day-card'

interface WeekSectionProps {
  week: number
  title: string
  days: Array<{
    day: number
    title: string
    objectives: string[]
    estimatedTime: number
    completed?: boolean
  }>
  color: string
  curriculumId?: string
  onProgressUpdate?: () => void
  onUpdateDay?: (weekNumber: number, dayIndex: number, updates: { title?: string; objectives?: string[] }) => void
  onRegenerateDay?: (weekNumber: number, dayIndex: number) => void
  onAddCustomDay?: (weekNumber: number) => void
}

export function WeekSection({ week, title, days, color, curriculumId, onProgressUpdate, onUpdateDay, onRegenerateDay, onAddCustomDay }: WeekSectionProps) {
  const [expanded, setExpanded] = useState(true)
  const [completedCount, setCompletedCount] = useState(0)
  const totalHours = days.reduce((sum, day) => sum + day.estimatedTime, 0)

  // Calculate completed days from localStorage
  useEffect(() => {
    if (curriculumId && typeof window !== 'undefined') {
      let count = 0
      days.forEach(day => {
        const storageKey = `progress_${curriculumId}_w${week}_d${day.day}`
        const saved = localStorage.getItem(storageKey)
        if (saved && JSON.parse(saved)) count++
      })
      setCompletedCount(count)
    }
  }, [curriculumId, week, days])

  const handleDayToggle = () => {
    // Recalculate completed count
    setTimeout(() => {
      if (curriculumId && typeof window !== 'undefined') {
        let count = 0
        days.forEach(day => {
          const storageKey = `progress_${curriculumId}_w${week}_d${day.day}`
          const saved = localStorage.getItem(storageKey)
          if (saved && JSON.parse(saved)) count++
        })
        setCompletedCount(count)
        onProgressUpdate?.()
      }
    }, 100)
  }

  const handleMarkWeekComplete = () => {
    if (curriculumId && typeof window !== 'undefined') {
      days.forEach(day => {
        const storageKey = `progress_${curriculumId}_w${week}_d${day.day}`
        localStorage.setItem(storageKey, JSON.stringify(true))
      })
      setCompletedCount(days.length)
      onProgressUpdate?.()
    }
  }

  const colors = [
    'from-blue-500 to-purple-500',
    'from-purple-500 to-pink-500',
    'from-pink-500 to-red-500',
    'from-green-500 to-blue-500',
    'from-yellow-500 to-orange-500',
  ]

  return (
    <Card className="bg-card border-border overflow-hidden mb-6 transition-all duration-300 hover:shadow-lg">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-4 md:p-6 hover:bg-muted/50 transition-colors"
      >
        <div className="flex items-center gap-3 md:gap-4 flex-1">
          <div className={`w-1 h-12 md:h-14 rounded-full bg-gradient-to-b ${color} ${completedCount > 0 && completedCount < days.length ? 'animate-pulse' : ''}`} />
          <div className="text-left">
            <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3">
              <h3 className="font-bold text-base md:text-lg text-foreground">
                Week {week}
              </h3>
              <p className="text-xs md:text-sm text-muted-foreground">{title}</p>
            </div>
            <div className="flex gap-4 text-xs text-muted-foreground mt-2">
              <span>{days.length} days</span>
              <span>{totalHours}h total</span>
              <span className="text-accent font-semibold">
                {completedCount}/{days.length} done
              </span>
            </div>
          </div>
        </div>
        <div className="ml-2">
          {expanded ? (
            <ChevronUp className="w-5 h-5 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-5 h-5 text-muted-foreground" />
          )}
        </div>
      </button>

      {expanded && (
        <div className="px-4 md:px-6 pb-4 md:pb-6 border-t border-border pt-4 md:pt-6">
          {/* Progress bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs md:text-sm font-medium text-muted-foreground">
                Week Progress
              </span>
              <div className="flex items-center gap-2">
                <span className={`text-xs md:text-sm font-semibold ${
                  completedCount === days.length 
                    ? 'text-green-500' 
                    : completedCount > 0 
                    ? 'text-primary' 
                    : 'text-foreground'
                }`}>
                  {Math.round((completedCount / days.length) * 100)}%
                  {completedCount === days.length && ' ✓'}
                </span>
                {completedCount < days.length && (
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={handleMarkWeekComplete}
                    className="text-xs h-7 transition-all hover:scale-105"
                  >
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Mark Week Done
                  </Button>
                )}
              </div>
            </div>
            <div className="w-full h-2 bg-border rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  completedCount === days.length 
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                    : `bg-gradient-to-r ${color}`
                }`}
                style={{ width: `${(completedCount / days.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Day cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {days.map((day, idx) => (
              <DayCard
                key={day.day}
                day={day.day}
                title={day.title}
                objectives={day.objectives}
                estimatedTime={day.estimatedTime}
                color={color}
                curriculumId={curriculumId}
                weekNumber={week}
                onToggleComplete={handleDayToggle}
                onUpdateDay={(updates) => onUpdateDay?.(week, idx, updates)}
                onRegenerate={() => onRegenerateDay?.(week, idx)}
              />
            ))}
          </div>
          
          {/* Add Custom Day button */}
          {onAddCustomDay && (
            <div className="mt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onAddCustomDay(week)}
                className="w-full text-xs md:text-sm"
              >
                + Add Custom Day
              </Button>
            </div>
          )}
        </div>
      )}
    </Card>
  )
}
