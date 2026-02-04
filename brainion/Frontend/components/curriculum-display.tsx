'use client'

import { useState, useEffect } from 'react'
import { Download, Share2, FileText, Loader, File, Copy, Link2 } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useToast } from '@/hooks/use-toast'
import { useCurriculum } from '@/hooks/use-curriculum'
import { WeekSection } from '@/components/week-section'
import { exportToPDF, downloadMarkdown, copyMarkdownToClipboard, copyShareLink, type CurriculumData } from '@/lib/export-utils'
import { saveCurriculum } from '@/lib/storage-utils'

export function CurriculumDisplay() {
  const { curriculum, setCurriculum, isGenerating } = useCurriculum()
  const { toast } = useToast()
  const [curriculumId, setCurriculumId] = useState<string>('')
  const [progress, setProgress] = useState(0)

  // Generate curriculum ID when curriculum changes
  useEffect(() => {
    if (curriculum) {
      const id = `${curriculum.topic.replace(/\s+/g, '_')}_${Date.now()}`
      setCurriculumId(id)
      calculateProgress()
    }
  }, [curriculum])

  const calculateProgress = () => {
    if (!curriculum || !curriculumId) return 0
    let completed = 0
    let total = 0
    curriculum.weeks.forEach(week => {
      week.days.forEach(day => {
        total++
        if (typeof window !== 'undefined') {
          const storageKey = `progress_${curriculumId}_w${week.week}_d${day.day}`
          const saved = localStorage.getItem(storageKey)
          if (saved && JSON.parse(saved)) completed++
        }
      })
    })
    const newProgress = total > 0 ? Math.round((completed / total) * 100) : 0
    setProgress(newProgress)
    return newProgress
  }

  const handleProgressUpdate = () => {
    calculateProgress()
  }

  const handleUpdateDay = (weekNumber: number, dayIndex: number, updates: { title?: string; objectives?: string[] }) => {
    if (!curriculum) return
    
    const updatedCurriculum = { ...curriculum }
    const weekIdx = updatedCurriculum.weeks.findIndex(w => w.week === weekNumber)
    
    if (weekIdx !== -1) {
      if (updates.title) {
        updatedCurriculum.weeks[weekIdx].days[dayIndex].title = updates.title
      }
      if (updates.objectives) {
        updatedCurriculum.weeks[weekIdx].days[dayIndex].objectives = updates.objectives
      }
      setCurriculum(updatedCurriculum)
      
      // Save updated curriculum
      saveCurriculum(updatedCurriculum)
    }
  }

  const handleExportPDF = () => {
    if (!curriculum) return
    try {
      exportToPDF(curriculum)
      toast({
        title: 'PDF Downloaded',
        description: 'Your curriculum has been exported as PDF',
      })
    } catch {
      toast({
        title: 'Export Failed',
        description: 'Failed to export PDF. Please try again.',
        variant: 'destructive',
      })
    }
  }

  const handleDownloadMarkdown = () => {
    if (!curriculum) return
    try {
      downloadMarkdown(curriculum)
      toast({
        title: 'Markdown Downloaded',
        description: 'Your curriculum has been exported as Markdown',
      })
    } catch {
      toast({
        title: 'Export Failed',
        description: 'Failed to export Markdown. Please try again.',
        variant: 'destructive',
      })
    }
  }

  const handleCopyMarkdown = async () => {
    if (!curriculum) return
    try {
      await copyMarkdownToClipboard(curriculum)
      toast({
        title: 'Copied to Clipboard',
        description: 'Markdown has been copied to your clipboard',
      })
    } catch {
      toast({
        title: 'Copy Failed',
        description: 'Failed to copy to clipboard. Please try again.',
        variant: 'destructive',
      })
    }
  }

  const handleShareLink = async () => {
    if (!curriculum) return
    try {
      await copyShareLink(curriculum)
      toast({
        title: 'Link Copied',
        description: 'Share link has been copied to your clipboard',
      })
    } catch {
      toast({
        title: 'Share Failed',
        description: 'Failed to generate share link. Please try again.',
        variant: 'destructive',
      })
    }
  }

  const colors = [
    'from-blue-500 to-cyan-500',
    'from-purple-500 to-pink-500',
    'from-orange-500 to-red-500',
    'from-green-500 to-emerald-500',
    'from-indigo-500 to-blue-500',
  ]

  if (isGenerating) {
    return (
      <div className="flex flex-col items-center justify-center py-12 md:py-16">
        <div className="text-center space-y-4">
          <Loader className="w-12 h-12 text-primary animate-spin mx-auto" />
          <p className="text-muted-foreground text-sm md:text-base">
            AI is crafting your curriculum...
          </p>
          <div className="flex gap-1 justify-center mt-4">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
            <div className="w-2 h-2 bg-secondary rounded-full animate-bounce delay-100" />
            <div className="w-2 h-2 bg-accent rounded-full animate-bounce delay-200" />
          </div>
        </div>
      </div>
    )
  }

  if (!curriculum) {
    return (
      <div className="flex flex-col items-center justify-center py-12 md:py-16">
        <div className="text-center space-y-4">
          <div className="text-6xl mb-4">🎓</div>
          <h3 className="text-xl font-semibold text-foreground">No Curriculum Yet</h3>
          <p className="text-muted-foreground text-sm md:text-base max-w-md">
            Fill in your learning topic and preferences in the sidebar, then click "Generate Curriculum" to get started!
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20 p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-1">
              {curriculum.topic}
            </h2>
            <p className="text-sm md:text-base text-muted-foreground">
              {curriculum.level} • {curriculum.duration} weeks • {curriculum.weeks.reduce((total, week) => 
                total + week.days.reduce((sum, day) => sum + day.estimatedTime, 0), 0)} hours total
            </p>
          </div>
          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2 text-xs md:text-sm"
              onClick={handleExportPDF}
            >
              <File className="w-4 h-4" />
              <span>Export PDF</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2 text-xs md:text-sm"
              onClick={handleDownloadMarkdown}
            >
              <Download className="w-4 h-4" />
              <span>Download MD</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2 text-xs md:text-sm"
              onClick={handleCopyMarkdown}
            >
              <Copy className="w-4 h-4" />
              <span>Copy MD</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2 text-xs md:text-sm"
              onClick={handleShareLink}
            >
              <Link2 className="w-4 h-4" />
              <span>Share Link</span>
            </Button>
          </div>
        </div>
      </Card>

      {/* Overall Progress */}
      <Card className="p-4 md:p-6">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-foreground text-sm md:text-base">
              Overall Progress
            </h3>
            <span className="text-sm md:text-base font-bold text-accent">{progress}%</span>
          </div>
          <div className="w-full h-3 bg-border rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-xs text-muted-foreground">
            {curriculum.weeks.filter(w => w.days.every(d => d.completed)).length} of {curriculum.weeks.length} weeks completed
          </div>
        </div>
      </Card>

      {/* Weeks */}
      <div className="space-y-4 md:space-y-6">
        {curriculum.weeks.map((week, idx) => (
          <WeekSection
            key={week.week}
            week={week.week}
            title={week.title}
            days={week.days}
            color={colors[idx % colors.length]}
            curriculumId={curriculumId}
            onProgressUpdate={handleProgressUpdate}
            onUpdateDay={handleUpdateDay}
          />
        ))}
      </div>
    </div>
  )
}
