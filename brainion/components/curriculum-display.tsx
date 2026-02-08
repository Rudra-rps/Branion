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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'
import { useCurriculum } from '@/hooks/use-curriculum'
import { WeekSection } from '@/components/week-section'
import { exportToPDF, downloadMarkdown, copyMarkdownToClipboard, copyShareLink, type CurriculumData } from '@/lib/export-utils'
import { saveCurriculum } from '@/lib/storage-utils'
import { useTamboThread } from '@tambo-ai/react'

export function CurriculumDisplay() {
  const { curriculum, setCurriculum, isGenerating } = useCurriculum()
  const { toast } = useToast()
  const { sendThreadMessage } = useTamboThread()
  const [curriculumId, setCurriculumId] = useState<string>('')
  const [progress, setProgress] = useState(0)
  const [showCustomDayDialog, setShowCustomDayDialog] = useState(false)
  const [customDayWeek, setCustomDayWeek] = useState(0)
  const [customDayTitle, setCustomDayTitle] = useState('')
  const [customDayObjectives, setCustomDayObjectives] = useState(['', '', ''])
  const [customDayTime, setCustomDayTime] = useState(3)
  const [isRegenerating, setIsRegenerating] = useState(false)

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

  const handleRegenerateDay = async (weekNumber: number, dayIndex: number) => {
    if (!curriculum) return
    
    setIsRegenerating(true)
    const weekIdx = curriculum.weeks.findIndex(w => w.week === weekNumber)
    
    if (weekIdx === -1) {
      toast({
        title: 'Error',
        description: 'Week not found',
        variant: 'destructive',
      })
      setIsRegenerating(false)
      return
    }

    const currentDay = curriculum.weeks[weekIdx].days[dayIndex]
    const prompt = `Regenerate a single day for a ${curriculum.level} level curriculum on ${curriculum.topic}.

Week ${weekNumber}: ${curriculum.weeks[weekIdx].title}
Current day ${currentDay.day}: ${currentDay.title}

Generate a fresh alternative for this day with:
- A different title
- 3-4 new specific learning objectives
- Estimated time in hours (${currentDay.estimatedTime} hours as reference)

Output ONLY valid JSON in this exact format:
{
  "day": ${currentDay.day},
  "title": "New day title",
  "objectives": ["Objective 1", "Objective 2", "Objective 3"],
  "estimatedTime": 3
}`

    try {
      const message = await sendThreadMessage(prompt)
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      let textContent = ''
      if (typeof message.content === 'string') {
        textContent = message.content
      } else if (Array.isArray(message.content)) {
        textContent = message.content.map(c => typeof c === 'string' ? c : c.text || '').join('')
      }
      
      const firstBrace = textContent.indexOf('{')
      const lastBrace = textContent.lastIndexOf('}')
      
      if (firstBrace !== -1 && lastBrace !== -1) {
        const jsonString = textContent.substring(firstBrace, lastBrace + 1)
        const newDay = JSON.parse(jsonString)
        
        const updatedCurriculum = { ...curriculum }
        updatedCurriculum.weeks[weekIdx].days[dayIndex] = {
          ...currentDay,
          title: newDay.title,
          objectives: newDay.objectives,
          estimatedTime: newDay.estimatedTime || currentDay.estimatedTime
        }
        
        setCurriculum(updatedCurriculum)
        saveCurriculum(updatedCurriculum)
        
        toast({
          title: 'Day Regenerated',
          description: `Day ${currentDay.day} has been updated`,
        })
      }
    } catch (error) {
      console.error('Regeneration failed:', error)
      toast({
        title: 'Regeneration Failed',
        description: 'Failed to regenerate day. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsRegenerating(false)
    }
  }

  const handleAddCustomDay = (weekNumber: number) => {
    setCustomDayWeek(weekNumber)
    setCustomDayTitle('')
    setCustomDayObjectives(['', '', ''])
    setCustomDayTime(3)
    setShowCustomDayDialog(true)
  }

  const handleSaveCustomDay = () => {
    if (!curriculum) return
    
    const weekIdx = curriculum.weeks.findIndex(w => w.week === customDayWeek)
    if (weekIdx === -1) return
    
    const filteredObjectives = customDayObjectives.filter(obj => obj.trim() !== '')
    if (!customDayTitle.trim() || filteredObjectives.length === 0) {
      toast({
        title: 'Invalid Input',
        description: 'Please provide a title and at least one objective',
        variant: 'destructive',
      })
      return
    }
    
    const updatedCurriculum = { ...curriculum }
    const newDayNumber = updatedCurriculum.weeks[weekIdx].days.length + 1
    
    updatedCurriculum.weeks[weekIdx].days.push({
      day: newDayNumber,
      title: customDayTitle,
      objectives: filteredObjectives,
      estimatedTime: customDayTime
    })
    
    setCurriculum(updatedCurriculum)
    saveCurriculum(updatedCurriculum)
    setShowCustomDayDialog(false)
    
    toast({
      title: 'Custom Day Added',
      description: `Added new day to Week ${customDayWeek}`,
    })
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
      <Card className="p-4 md:p-6 bg-gradient-to-br from-card to-muted/20 border-border hover:shadow-lg transition-all">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-foreground text-sm md:text-base flex items-center gap-2">
              Overall Progress
              {progress === 100 && <span className="text-2xl">🎉</span>}
            </h3>
            <span className={`text-sm md:text-base font-bold ${
              progress === 100 ? 'text-green-500' : 
              progress >= 50 ? 'text-primary' : 
              'text-accent'
            }`}>{progress}%</span>
          </div>
          <div className="w-full h-3 bg-border rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-700 ease-out ${
                progress === 100 
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                  : 'bg-gradient-to-r from-primary to-secondary'
              }`}
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
          <div 
            key={week.week} 
            className={`animate-fadeIn stagger-${Math.min(idx + 1, 5)}`}
            style={{ animationFillMode: 'both' }}
          >
            <WeekSection
              week={week.week}
              title={week.title}
              days={week.days}
              color={colors[idx % colors.length]}
              curriculumId={curriculumId}
              onProgressUpdate={handleProgressUpdate}
              onUpdateDay={handleUpdateDay}
              onRegenerateDay={handleRegenerateDay}
              onAddCustomDay={handleAddCustomDay}
            />
          </div>
        ))}
      </div>

      {/* Custom Day Dialog */}
      <Dialog open={showCustomDayDialog} onOpenChange={setShowCustomDayDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add Custom Day to Week {customDayWeek}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="block text-sm font-medium mb-2">Day Title</label>
              <Input
                value={customDayTitle}
                onChange={(e) => setCustomDayTitle(e.target.value)}
                placeholder="e.g., Introduction to React Hooks"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Objectives</label>
              <div className="space-y-2">
                {customDayObjectives.map((obj, idx) => (
                  <Input
                    key={idx}
                    value={obj}
                    onChange={(e) => {
                      const newObjectives = [...customDayObjectives]
                      newObjectives[idx] = e.target.value
                      setCustomDayObjectives(newObjectives)
                    }}
                    placeholder={`Objective ${idx + 1}`}
                  />
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => setCustomDayObjectives([...customDayObjectives, ''])}
              >
                + Add Objective
              </Button>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">
                Estimated Time: {customDayTime} hours
              </label>
              <input
                type="range"
                min="1"
                max="8"
                value={customDayTime}
                onChange={(e) => setCustomDayTime(Number(e.target.value))}
                className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCustomDayDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveCustomDay}>
              Add Day
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Regenerating overlay */}
      {isRegenerating && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="text-center space-y-4">
            <Loader className="w-12 h-12 text-primary animate-spin mx-auto" />
            <p className="text-muted-foreground">Regenerating day...</p>
          </div>
        </div>
      )}
    </div>
  )
}
