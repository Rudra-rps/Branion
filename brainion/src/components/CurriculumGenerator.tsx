import { useTamboThread } from '@tambo-ai/react';
import { useEffect, useState } from 'react';
import type { Goal, Curriculum } from '../types/curriculum';
import { exportToPDF, downloadMarkdown, copyMarkdownToClipboard } from '../utils/exportUtils';
import { saveCurriculum, copyShareLink } from '../utils/storageUtils';
import './CurriculumGenerator.css';

interface CurriculumGeneratorProps {
  goal: Goal;
  loadedCurriculum?: Curriculum | null;
}

export function CurriculumGenerator({ goal, loadedCurriculum }: CurriculumGeneratorProps) {
  const { topic, duration, level } = goal;
  const { sendThreadMessage, thread } = useTamboThread();
  const [curriculum, setCurriculum] = useState<Curriculum | null>(loadedCurriculum || null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    // If we have a loaded curriculum, use it and don't generate
    if (loadedCurriculum) {
      setCurriculum(loadedCurriculum);
      return;
    }

    const generateCurriculum = async () => {
      if (!thread) return;
      
      setIsGenerating(true);
      
      const prompt = `Generate a ${duration}-week curriculum for learning ${topic} at ${level} level.

Structure requirements:
- ${duration} weeks total
- 5 days per week
- Each day must have: a concise title and 2-3 specific learning objectives
- No emojis
- No explanations or commentary
- Output as JSON matching this exact structure:

{
  "weeks": [
    {
      "weekNumber": 1,
      "days": [
        {
          "title": "Day title",
          "objectives": ["Objective 1", "Objective 2", "Objective 3"]
        }
      ]
    }
  ]
}

Be concise and focused. Generate curriculum now.`;

      try {
        const message = await sendThreadMessage(prompt);
        // Extract JSON from message content
        const content = message.content as string | { type: string; text: string }[];
        const textContent = typeof content === 'string' ? content : content.map(c => c.text).join('');
        if (textContent) {
          const jsonMatch = textContent.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            const parsed = JSON.parse(jsonMatch[0]);
            setCurriculum(parsed);
            // Auto-save curriculum
            saveCurriculum(goal, parsed);
            showNotification('Curriculum saved successfully!');
          }
        }
      } catch (error) {
        console.error('Failed to generate curriculum:', error);
        showNotification('Failed to generate curriculum');
      } finally {
        setIsGenerating(false);
      }
    };

    generateCurriculum();
  }, [topic, duration, level, thread, sendThreadMessage, loadedCurriculum, goal]);

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleExportPDF = () => {
    if (!curriculum) return;
    exportToPDF(curriculum, goal);
    setShowExportMenu(false);
    showNotification('PDF downloaded!');
  };

  const handleExportMarkdown = () => {
    if (!curriculum) return;
    downloadMarkdown(curriculum, goal);
    setShowExportMenu(false);
    showNotification('Markdown downloaded!');
  };

  const handleCopyMarkdown = async () => {
    if (!curriculum) return;
    try {
      await copyMarkdownToClipboard(curriculum, goal);
      setShowExportMenu(false);
      showNotification('Markdown copied to clipboard!');
    } catch {
      showNotification('Failed to copy to clipboard');
    }
  };

  const handleShareLink = async () => {
    if (!curriculum) return;
    try {
      await copyShareLink(goal, curriculum);
      setShowExportMenu(false);
      showNotification('Share link copied to clipboard!');
    } catch {
      showNotification('Failed to copy share link');
    }
  };

  if (isGenerating) {
    return (
      <div className="curriculum-container">
        <div className="loading">Generating curriculum...</div>
      </div>
    );
  }

  if (!curriculum) {
    return (
      <div className="curriculum-container">
        <div className="placeholder">Curriculum will appear here</div>
      </div>
    );
  }

  return (
    <div className="curriculum-container">
      {notification && (
        <div className="notification-toast">
          {notification}
        </div>
      )}
      
      <div className="curriculum-header">
        <h1>{goal.topic}</h1>
        <div className="export-actions">
          <div className="export-dropdown">
            <button 
              className="export-btn"
              onClick={() => setShowExportMenu(!showExportMenu)}
            >
              Export ▾
            </button>
            {showExportMenu && (
              <div className="export-menu">
                <button onClick={handleExportPDF}>
                  <span className="menu-icon">📄</span> Export as PDF
                </button>
                <button onClick={handleExportMarkdown}>
                  <span className="menu-icon">📝</span> Download Markdown
                </button>
                <button onClick={handleCopyMarkdown}>
                  <span className="menu-icon">📋</span> Copy Markdown
                </button>
                <button onClick={handleShareLink}>
                  <span className="menu-icon">🔗</span> Copy Share Link
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="curriculum-content">
        {curriculum.weeks.map((week) => (
          <div key={week.weekNumber} className="week-section">
            <h2>Week {week.weekNumber}</h2>
            <div className="days-grid">
              {week.days.map((day, dayIndex) => (
                <div key={dayIndex} className="day-card">
                  <h3>{day.title}</h3>
                  <ul className="objectives-list">
                    {day.objectives.map((objective, objIndex) => (
                      <li key={objIndex}>{objective}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
