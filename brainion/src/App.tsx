import { useState } from 'react'
import { CurriculumGenerator } from './components/CurriculumGenerator'
import type { Goal } from './types/curriculum'
import './App.css'

function App() {
  const [goal, setGoal] = useState<Goal>({
    topic: 'Web Development',
    duration: 2,
    level: 'beginner'
  });

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Brainion - AI Curriculum Generator</h1>
      </header>

      <div className="app-layout">
        <aside className="input-panel">
          <h2>Learning Goal</h2>
          
          <div className="input-group">
            <label htmlFor="topic">Topic</label>
            <input
              id="topic"
              type="text"
              value={goal.topic}
              onChange={(e) => setGoal({ ...goal, topic: e.target.value })}
              placeholder="e.g., Web Development"
            />
          </div>

          <div className="input-group">
            <label htmlFor="duration">Duration (weeks)</label>
            <input
              id="duration"
              type="number"
              min="1"
              max="12"
              value={goal.duration}
              onChange={(e) => setGoal({ ...goal, duration: parseInt(e.target.value) || 1 })}
            />
          </div>

          <div className="input-group">
            <label htmlFor="level">Level</label>
            <select
              id="level"
              value={goal.level}
              onChange={(e) => setGoal({ ...goal, level: e.target.value as Goal['level'] })}
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
        </aside>

        <main className="curriculum-area">
          <CurriculumGenerator goal={goal} />
        </main>
      </div>
    </div>
  )
}

export default App
