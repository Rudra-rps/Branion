import { useTamboThread } from '@tambo-ai/react';
import { useEffect, useState } from 'react';
import type { Goal, Curriculum } from '../types/curriculum';
import './CurriculumGenerator.css';

interface CurriculumGeneratorProps {
  goal: Goal;
}

export function CurriculumGenerator({ goal }: CurriculumGeneratorProps) {
  const { topic, duration, level } = goal;
  const { sendThreadMessage, thread } = useTamboThread();
  const [curriculum, setCurriculum] = useState<Curriculum | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
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
        const content = message.content;
        if (typeof content === 'string') {
          const jsonMatch = content.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            const parsed = JSON.parse(jsonMatch[0]);
            setCurriculum(parsed);
          }
        }
      } catch (error) {
        console.error('Failed to generate curriculum:', error);
      } finally {
        setIsGenerating(false);
      }
    };

    generateCurriculum();
  }, [topic, duration, level, thread, sendThreadMessage]);

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
