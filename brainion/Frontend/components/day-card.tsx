'use client'

import { useState, useEffect } from 'react'
import { Check, Clock, MessageSquare, Edit2, RotateCw } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'

interface DayCardProps {
  day: number
  title: string
  objectives: string[]
  estimatedTime: number
  color: string
  curriculumId?: string
  weekNumber: number
  onToggleComplete?: (completed: boolean) => void
  onSaveNote?: (note: string) => void
  onUpdateDay?: (updates: { title?: string; objectives?: string[] }) => void
  onRegenerate?: () => void
}

export function DayCard({ 
  day, 
  title, 
  objectives, 
  estimatedTime, 
  color,
  curriculumId,
  weekNumber,
  onToggleComplete,
  onSaveNote,
  onUpdateDay,
  onRegenerate
}: DayCardProps) {
  const [completed, setCompleted] = useState(false)
  const [note, setNote] = useState('')
  const [showNoteDialog, setShowNoteDialog] = useState(false)
  const [noteInput, setNoteInput] = useState('')
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [editedTitle, setEditedTitle] = useState(title)
  const [editedObjectives, setEditedObjectives] = useState<string[]>(objectives)

  const storageKey = curriculumId ? `progress_${curriculumId}_w${weekNumber}_d${day}` : null
  const noteKey = curriculumId ? `note_${curriculumId}_w${weekNumber}_d${day}` : null

  // Load saved state
  useEffect(() => {
    if (storageKey && typeof window !== 'undefined') {
      const saved = localStorage.getItem(storageKey)
      if (saved) setCompleted(JSON.parse(saved))
    }
    if (noteKey && typeof window !== 'undefined') {
      const savedNote = localStorage.getItem(noteKey)
      if (savedNote) setNote(savedNote)
    }
  }, [storageKey, noteKey])

  const handleToggleComplete = () => {
    const newState = !completed
    setCompleted(newState)
    if (storageKey && typeof window !== 'undefined') {
      localStorage.setItem(storageKey, JSON.stringify(newState))
    }
    onToggleComplete?.(newState)
  }

  const handleSaveNote = () => {
    setNote(noteInput)
    if (noteKey && typeof window !== 'undefined') {
      localStorage.setItem(noteKey, noteInput)
    }
    onSaveNote?.(noteInput)
    setShowNoteDialog(false)
  }

  const handleOpenNote = () => {
    setNoteInput(note)
    setShowNoteDialog(true)
  }

  const handleSaveEdit = () => {
    if (onUpdateDay) {
      onUpdateDay({
        title: editedTitle,
        objectives: editedObjectives
      })
    }
    
    // Save to localStorage
    const editKey = curriculumId ? `edit_${curriculumId}_w${weekNumber}_d${day}` : null
    if (editKey && typeof window !== 'undefined') {
      localStorage.setItem(editKey, JSON.stringify({
        title: editedTitle,
        objectives: editedObjectives
      }))
    }
    
    setIsEditingTitle(false)
  }

  return (
    <>
      <Card
        className={`p-4 md:p-5 relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02] cursor-pointer group ${
          completed
            ? 'bg-muted border-accent opacity-75'
            : 'bg-card hover:border-primary border-border hover-lift'
        }`}
      >
        <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${color} transition-all duration-300 group-hover:w-2`} />

        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <span
              className={`inline-flex items-center justify-center w-6 h-6 md:w-8 md:h-8 rounded-full text-xs md:text-sm font-bold ${color} text-white shrink-0`}
            >
              {day}
            </span>
            {isEditingTitle ? (
              <Input
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                onBlur={handleSaveEdit}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSaveEdit()
                  if (e.key === 'Escape') {
                    setEditedTitle(title)
                    setIsEditingTitle(false)
                  }
                }}
                className="h-7 text-sm md:text-base font-semibold"
                autoFocus
              />
            ) : (
              <h3 className="font-semibold text-foreground text-sm md:text-base truncate">
                {editedTitle}
              </h3>
            )}
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => setIsEditingTitle(true)}
              className="p-1.5 rounded-lg transition-colors bg-muted text-muted-foreground hover:bg-border"
              aria-label="Edit title"
              title="Edit title"
            >
              <Edit2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleToggleComplete}
              className={`p-1.5 rounded-lg transition-colors ${
                completed
                  ? 'bg-accent text-white'
                  : 'bg-muted text-muted-foreground hover:bg-border'
              }`}
              aria-label={completed ? 'Mark incomplete' : 'Mark complete'}
              title={completed ? 'Mark incomplete' : 'Mark complete'}
            >
              {completed ? (
                <Check className="w-4 h-4" />
              ) : (
                <div className="w-4 h-4 rounded border border-current" />
              )}
            </button>
          </div>
        </div>

        <ul className="space-y-2 mb-4">
          {editedObjectives.map((obj, idx) => (
            <li key={idx} className="flex gap-2 text-xs md:text-sm text-muted-foreground group">
              <span className="text-primary font-bold">•</span>
              <input
                value={obj}
                onChange={(e) => {
                  const newObjectives = [...editedObjectives]
                  newObjectives[idx] = e.target.value
                  setEditedObjectives(newObjectives)
                }}
                onBlur={handleSaveEdit}
                className={`flex-1 bg-transparent border-none outline-none focus:bg-muted/30 rounded px-1 -ml-1 ${
                  completed ? 'line-through' : ''
                }`}
              />
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between gap-2 text-xs md:text-sm">
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1 bg-muted px-2 py-1 rounded">
              <Clock className="w-3 h-3 md:w-4 md:h-4" />
              <span>{estimatedTime}h</span>
            </div>
            {/* Difficulty badge based on estimated time */}
            <span className={`px-2 py-0.5 rounded text-xs font-medium ${
              estimatedTime <= 2 
                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                : estimatedTime <= 3
                ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
            }`}>
              {estimatedTime <= 2 ? 'Easy' : estimatedTime <= 3 ? 'Medium' : 'Hard'}
            </span>
          </div>
          <div className="flex items-center gap-1">
            {onRegenerate && (
              <button
                onClick={onRegenerate}
                className="p-1.5 rounded-lg transition-colors bg-muted text-muted-foreground hover:bg-border hover:text-foreground"
                aria-label="Regenerate day"
                title="Regenerate this day"
              >
                <RotateCw className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              onClick={handleOpenNote}
              className={`flex items-center gap-1 px-2 md:px-3 py-1.5 rounded transition-all ${
                note
                  ? 'bg-primary/20 text-primary'
                  : 'bg-muted text-muted-foreground hover:bg-border'
              }`}
              aria-label="Add note"
              title="Add or view notes"
            >
              <MessageSquare className="w-3.5 h-3.5 md:w-4 md:h-4" />
              <span className="text-xs hidden sm:inline">{note ? 'View Note' : 'Add Note'}</span>
              {note && (
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              )}
            </button>
          </div>
        </div>
      </Card>

      <Dialog open={showNoteDialog} onOpenChange={setShowNoteDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              Notes for Day {day}: {title}
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Textarea
              value={noteInput}
              onChange={(e) => setNoteInput(e.target.value)}
              placeholder="Add your notes, thoughts, or resources here..."
              className="min-h-[200px] resize-none"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNoteDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveNote}>
              Save Note
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
