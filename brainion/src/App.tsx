import { useState } from 'react'
import { CurriculumGenerator } from './components/CurriculumGenerator'
import { CurriculumHistory } from './components/CurriculumHistory'
import type { Goal, Curriculum } from './types/curriculum'
import { loadCurriculumFromURL } from './utils/storageUtils'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState<'generate' | 'history'>('generate');
  
  // Initialize state from URL if available
  const initialState = () => {
    const shared = loadCurriculumFromURL();
    if (shared) {
      // Clear URL parameter immediately
      window.history.replaceState({}, document.title, window.location.pathname);
      return {
        goal: shared.goal,
        loadedCurriculum: shared,
      };
    }
    return {
      goal: { topic: 'Web Development', duration: 2, level: 'beginner' as const },
      loadedCurriculum: null,
    };
  };
  
  const initial = initialState();
  const [goal, setGoal] = useState<Goal>(initial.goal);
  const [shouldGenerate, setShouldGenerate] = useState(false);
  const [loadedCurriculum, setLoadedCurriculum] = useState<{ goal: Goal; curriculum: Curriculum } | null>(initial.loadedCurriculum);

  // No longer need useEffect for URL loading

  const handleGenerateClick = () => {
    setShouldGenerate(true);
    setLoadedCurriculum(null);
    setTimeout(() => setShouldGenerate(false), 100);
  };

  const handleLoadFromHistory = (historyGoal: Goal, curriculum: Curriculum) => {
    setGoal(historyGoal);
    setLoadedCurriculum({ goal: historyGoal, curriculum });
    setActiveTab('generate');
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Brainion - AI Curriculum Generator</h1>
      </header>

      <div className="app-layout">
        <aside className="input-panel">
          <div className="tabs">
            <button 
              className={activeTab === 'generate' ? 'tab active' : 'tab'}
              onClick={() => setActiveTab('generate')}
            >
              New Curriculum
            </button>
            <button 
              className={activeTab === 'history' ? 'tab active' : 'tab'}
              onClick={() => setActiveTab('history')}
            >
              History
            </button>
          </div>

          {activeTab === 'generate' ? (
            <>
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

              <button className="generate-btn" onClick={handleGenerateClick}>
                Generate Curriculum
              </button>
            </>
          ) : (
            <CurriculumHistory onLoad={handleLoadFromHistory} />
          )}
        </aside>

        <main className="curriculum-area">
          {activeTab === 'generate' && (shouldGenerate || loadedCurriculum) && (
            <CurriculumGenerator 
              goal={goal} 
              loadedCurriculum={loadedCurriculum?.curriculum}
              key={loadedCurriculum ? `loaded-${loadedCurriculum.goal.topic}` : `${goal.topic}-${goal.duration}-${goal.level}`} 
            />
          )}
          {activeTab === 'generate' && !shouldGenerate && !loadedCurriculum && (
            <div className="empty-state">
              <div className="empty-icon">🎓</div>
              <h2>Generate Your First Curriculum</h2>
              <p>Fill in the details on the left and click "Generate Curriculum" to get started</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default App
