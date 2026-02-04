import { useState } from 'react';
import { getSavedCurricula, deleteCurriculum, clearAllCurricula, type SavedCurriculum } from '../utils/storageUtils';
import type { Goal, Curriculum } from '../types/curriculum';
import './CurriculumHistory.css';

interface CurriculumHistoryProps {
  onLoad: (goal: Goal, curriculum: Curriculum) => void;
}

export function CurriculumHistory({ onLoad }: CurriculumHistoryProps) {
  const [curricula, setCurricula] = useState<SavedCurriculum[]>(getSavedCurricula());

  const handleLoad = (saved: SavedCurriculum) => {
    onLoad(saved.goal, saved.curriculum);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this curriculum?')) {
      deleteCurriculum(id);
      setCurricula(getSavedCurricula());
    }
  };

  const handleClearAll = () => {
    if (confirm('Are you sure you want to delete all saved curricula? This cannot be undone.')) {
      clearAllCurricula();
      setCurricula([]);
    }
  };

  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (curricula.length === 0) {
    return (
      <div className="history-container">
        <div className="history-empty">
          <div className="empty-icon">📚</div>
          <h3>No Saved Curricula</h3>
          <p>Your saved curricula will appear here. Generate a curriculum to get started!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="history-container">
      <div className="history-header">
        <h2>Saved Curricula</h2>
        <button className="clear-all-btn" onClick={handleClearAll}>
          Clear All
        </button>
      </div>
      
      <div className="history-list">
        {curricula.map((saved) => (
          <div key={saved.id} className="history-card">
            <div className="history-card-header">
              <h3>{saved.goal.topic}</h3>
              <span className="history-date">{formatDate(saved.createdAt)}</span>
            </div>
            
            <div className="history-card-meta">
              <span className="meta-badge">{saved.goal.duration} weeks</span>
              <span className="meta-badge level-badge">{saved.goal.level}</span>
              <span className="meta-badge">{saved.curriculum.weeks.length} weeks</span>
            </div>
            
            <div className="history-card-actions">
              <button 
                className="load-btn"
                onClick={() => handleLoad(saved)}
              >
                Load
              </button>
              <button 
                className="delete-btn"
                onClick={() => handleDelete(saved.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
