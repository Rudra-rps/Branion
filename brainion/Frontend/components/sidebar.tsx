'use client'

import { useState, useEffect } from 'react'
import { Plus, Clock, Settings, RotateCcw, Trash2, Loader2 } from 'lucide-react'
import { useTamboThread } from '@tambo-ai/react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getSavedCurricula, deleteCurriculum, clearAllCurricula, saveCurriculum, type SavedCurriculum } from '@/lib/storage-utils'
import { useCurriculum } from '@/hooks/use-curriculum'
import { useToast } from '@/hooks/use-toast'
import type { CurriculumData } from '@/lib/export-utils'

export function Sidebar() {
  const [topic, setTopic] = useState('')
  const [duration, setDuration] = useState(6)
  const [level, setLevel] = useState('intermediate')
  const [advanced, setAdvanced] = useState(false)
  const [focusType, setFocusType] = useState('balanced')
  const [timePerDay, setTimePerDay] = useState(3)
  const [prerequisites, setPrerequisites] = useState('')
  const [goals, setGoals] = useState('')
  const [savedCurricula, setSavedCurricula] = useState<SavedCurriculum[]>([])
  const { setCurriculum, setIsGenerating } = useCurriculum()
  const { sendThreadMessage, thread } = useTamboThread()
  const { toast } = useToast()

  // Load saved curricula on mount
  useEffect(() => {
    setSavedCurricula(getSavedCurricula())
  }, [])

  const handleGenerate = async () => {
    if (!topic.trim()) {
      toast({
        title: 'Topic Required',
        description: 'Please enter a learning topic',
        variant: 'destructive',
      })
      return
    }

    if (!thread) {
      toast({
        title: 'Connection Error',
        description: 'Tambo AI is not ready. Please refresh the page.',
        variant: 'destructive',
      })
      return
    }

    setIsGenerating(true)
    setCurriculum(null)

    const prompt = `Generate a ${duration}-week curriculum for learning ${topic} at ${level} level.

Additional parameters:
- Focus type: ${focusType}
- Time per day: ${timePerDay} hours
${prerequisites ? `- Prerequisites: ${prerequisites}` : ''}
${goals ? `- Specific goals: ${goals}` : ''}

Structure requirements:
- ${duration} weeks total
- 5 days per week (Mon-Fri)
- Each day must have: a concise title and 3-4 specific learning objectives
- Include estimated time in hours for each day (around ${timePerDay} hours per day)
- No emojis
- No explanations or commentary
- Output ONLY valid JSON matching this exact structure:

{
  "topic": "${topic}",
  "level": "${level}",
  "duration": ${duration},
  "weeks": [
    {
      "week": 1,
      "title": "Week theme/title",
      "days": [
        {
          "day": 1,
          "title": "Day title",
          "objectives": ["Objective 1", "Objective 2", "Objective 3"],
          "estimatedTime": 3
        }
      ]
    }
  ]
}

Be concise, focused, and practical. Generate curriculum now.`

    try {
      const message = await sendThreadMessage(prompt)
      
      // Wait a bit for streaming to complete
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Get the full content
      let textContent = ''
      if (typeof message.content === 'string') {
        textContent = message.content
      } else if (Array.isArray(message.content)) {
        textContent = message.content.map(c => typeof c === 'string' ? c : c.text || '').join('')
      }
      
      console.log('Received content:', textContent)
      
      // Extract JSON from response - look for the last complete JSON object
      const jsonMatches = textContent.match(/\{(?:[^{}]|(?:\{(?:[^{}]|\{[^{}]*\})*\}))*\}/g)
      if (jsonMatches && jsonMatches.length > 0) {
        // Try to parse the last (most complete) JSON object
        const lastJson = jsonMatches[jsonMatches.length - 1]
        const parsed: CurriculumData = JSON.parse(lastJson)
        setCurriculum(parsed)
        
        // Auto-save
        saveCurriculum(parsed)
        setSavedCurricula(getSavedCurricula())
        
        toast({
          title: 'Curriculum Generated!',
          description: `Created ${parsed.weeks.length}-week curriculum for ${parsed.topic}`,
        })
      } else {
        throw new Error('Invalid response format - no JSON found')
      }
    } catch (error) {
      console.error('Failed to generate curriculum:', error)
      toast({
        title: 'Generation Failed',
        description: 'Failed to generate curriculum. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const handleLoadCurriculum = (saved: SavedCurriculum) => {
    setCurriculum(saved.curriculum)
    toast({
      title: 'Curriculum Loaded',
      description: `Loaded: ${saved.curriculum.topic}`,
    })
  }

  const handleDeleteCurriculum = (id: string) => {
    try {
      deleteCurriculum(id)
      setSavedCurricula(getSavedCurricula())
      toast({
        title: 'Deleted',
        description: 'Curriculum has been deleted',
      })
    } catch {
      toast({
        title: 'Delete Failed',
        description: 'Failed to delete curriculum',
        variant: 'destructive',
      })
    }
  }

  const handleClearAll = () => {
    if (confirm('Are you sure you want to delete all saved curricula?')) {
      try {
        clearAllCurricula()
        setSavedCurricula([])
        toast({
          title: 'All Cleared',
          description: 'All curricula have been deleted',
        })
      } catch {
        toast({
          title: 'Clear Failed',
          description: 'Failed to clear curricula',
          variant: 'destructive',
        })
      }
    }
  }

  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  return (
    <aside className="w-full lg:w-80 lg:fixed lg:left-0 lg:top-20 lg:bottom-0 lg:overflow-y-auto">
      <Card className="lg:rounded-none lg:border-0 lg:border-r m-4 lg:m-0 p-6 shadow-none">
        <Tabs defaultValue="new" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="new" className="text-xs md:text-sm">
              <Plus className="w-4 h-4 mr-1" />
              New
            </TabsTrigger>
            <TabsTrigger value="history" className="text-xs md:text-sm">
              <Clock className="w-4 h-4 mr-1" />
              History
            </TabsTrigger>
            <TabsTrigger value="settings" className="text-xs md:text-sm">
              <Settings className="w-4 h-4 mr-1" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="new" className="space-y-6 mt-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Learning Topic
              </label>
              <Input
                type="text"
                placeholder="e.g., Machine Learning, Web Development"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-medium text-foreground">
                  Duration: {duration} weeks
                </label>
              </div>
              <input
                type="range"
                min="1"
                max="12"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>1 week</span>
                <span>12 weeks</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-3">
                Level
              </label>
              <div className="flex gap-2">
                {['beginner', 'intermediate', 'advanced'].map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setLevel(lvl)}
                    className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      level === lvl
                        ? 'bg-primary text-white'
                        : 'bg-muted text-foreground hover:bg-border'
                    }`}
                  >
                    {lvl.charAt(0).toUpperCase() + lvl.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t pt-4">
              <button
                onClick={() => setAdvanced(!advanced)}
                className="flex items-center gap-2 text-sm font-medium text-primary hover:text-secondary transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Advanced Options
              </button>
            </div>

            {advanced && (
              <div className="space-y-4 animate-in fade-in">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Focus Type
                  </label>
                  <select
                    value={focusType}
                    onChange={(e) => setFocusType(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm"
                  >
                    <option value="theory">Theory Based</option>
                    <option value="project">Project Based</option>
                    <option value="balanced">Balanced</option>
                    <option value="practice">Practice Focused</option>
                  </select>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium text-foreground">
                      Time Per Day
                    </label>
                    <span className="text-sm text-muted-foreground">{timePerDay} hours</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="4"
                    step="1"
                    value={timePerDay}
                    onChange={(e) => setTimePerDay(Number(e.target.value))}
                    className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>1h</span>
                    <span>2h</span>
                    <span>3h</span>
                    <span>4h</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Prerequisites (optional)
                  </label>
                  <textarea
                    value={prerequisites}
                    onChange={(e) => setPrerequisites(e.target.value)}
                    placeholder="e.g., Basic knowledge of programming, familiarity with Python syntax..."
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm min-h-[60px] resize-none"
                    rows={2}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Specific Learning Goals (optional)
                  </label>
                  <textarea
                    value={goals}
                    onChange={(e) => setGoals(e.target.value)}
                    placeholder="e.g., Be able to build a full-stack web application, understand REST APIs..."
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm min-h-[80px] resize-none"
                    rows={3}
                  />
                </div>
              </div>
            )}

            <Button
              onClick={handleGenerate}
              className="w-full bg-white/90 backdrop-blur-md border border-white/40 text-gray-900 font-semibold py-2.5 md:py-3 rounded-lg shadow-xl hover:bg-white hover:shadow-2xl transition-all"
            >
              Generate Curriculum
            </Button>
          </TabsContent>

          <TabsContent value="history" className="mt-6">
            {savedCurricula.length === 0 ? (
              <div className="text-center py-8">
                <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                <p className="text-sm text-muted-foreground mb-1 font-medium">No saved curricula</p>
                <p className="text-xs text-muted-foreground">
                  Generate a curriculum to see it here
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <p className="text-sm font-medium">
                    {savedCurricula.length} saved
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleClearAll}
                    className="text-xs text-destructive hover:text-destructive"
                  >
                    Clear All
                  </Button>
                </div>
                <div className="space-y-3">
                  {savedCurricula.map((saved) => (
                    <Card
                      key={saved.id}
                      className="p-3 hover:shadow-md transition-shadow cursor-pointer group"
                    >
                      <div className="space-y-2">
                        <div className="flex justify-between items-start">
                          <h4 className="font-semibold text-sm line-clamp-1">
                            {saved.curriculum.topic}
                          </h4>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDeleteCurriculum(saved.id)
                            }}
                            className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 className="w-3 h-3 text-destructive" />
                          </Button>
                        </div>
                        <div className="flex gap-2 text-xs text-muted-foreground">
                          <span className="px-2 py-0.5 bg-primary/10 text-primary rounded">
                            {saved.curriculum.level}
                          </span>
                          <span className="px-2 py-0.5 bg-muted rounded">
                            {saved.curriculum.duration}w
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(saved.createdAt)}
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleLoadCurriculum(saved)}
                          className="w-full text-xs"
                        >
                          Load Curriculum
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="settings" className="mt-6">
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>Settings coming soon</p>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </aside>
  )
}
