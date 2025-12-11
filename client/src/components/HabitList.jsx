import { useState } from 'react'
import HabitHeatmap from './HabitHeatmap'
import './HabitList.css'

function HabitList({ habits, onHabitUpdate }) {
  const [loading, setLoading] = useState({})
  const [expandedHabits, setExpandedHabits] = useState({})

  const isCompletedToday = (completions) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    return completions.some(date => {
      const completionDate = new Date(date)
      completionDate.setHours(0, 0, 0, 0)
      return completionDate.getTime() === today.getTime()
    })
  }

  const handleComplete = async (habitId) => {
    setLoading(prev => ({ ...prev, [habitId]: true }))
    
    try {
      const response = await fetch(`http://localhost:5000/habits/${habitId}/complete`, {
        method: 'PATCH',
      })

      if (!response.ok) {
        throw new Error('Failed to mark habit as complete')
      }

      onHabitUpdate()
    } catch (error) {
      console.error('Error completing habit:', error)
      alert('Failed to mark habit as complete. Please try again.')
    } finally {
      setLoading(prev => ({ ...prev, [habitId]: false }))
    }
  }

  const handleDelete = async (habitId, habitTitle) => {
    if (!window.confirm(`Are you sure you want to delete "${habitTitle}"?`)) {
      return
    }

    setLoading(prev => ({ ...prev, [habitId]: true }))
    
    try {
      const response = await fetch(`http://localhost:5000/habits/${habitId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete habit')
      }

      onHabitUpdate()
    } catch (error) {
      console.error('Error deleting habit:', error)
      alert('Failed to delete habit. Please try again.')
    } finally {
      setLoading(prev => ({ ...prev, [habitId]: false }))
    }
  }

  const toggleChart = (habitId) => {
    setExpandedHabits(prev => ({
      ...prev,
      [habitId]: !prev[habitId]
    }))
  }

  if (habits.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📝</div>
        <h3>No habits yet</h3>
        <p>Create your first habit above to get started on your journey!</p>
      </div>
    )
  }

  return (
    <div className="habits-section">
      <h2>📊 Your Habits ({habits.length})</h2>
      <div className="habits-list">
        {habits.map(habit => {
          const completedToday = isCompletedToday(habit.completions)
          
          return (
            <div key={habit._id} className="habit-card">
              <div className="habit-header">
                <h3>{habit.title}</h3>
                <button 
                  className="delete-btn"
                  onClick={() => handleDelete(habit._id, habit.title)}
                  disabled={loading[habit._id]}
                  title="Delete habit"
                >
                  🗑️
                </button>
              </div>
              
              {habit.description && (
                <p className="habit-description">{habit.description}</p>
              )}
              
              <div className="habit-stats">
                <div className="stat">
                  <span className="stat-icon">✅</span>
                  <span className="stat-value">{habit.completions.length}</span>
                  <span className="stat-label">completions</span>
                </div>
                <div className="stat">
                  <span className="stat-icon">📅</span>
                  <span className="stat-value">
                    {Math.floor((Date.now() - new Date(habit.createdAt)) / (1000 * 60 * 60 * 24))}
                  </span>
                  <span className="stat-label">days old</span>
                </div>
              </div>

              <button
                className={`complete-btn ${completedToday ? 'completed' : ''}`}
                onClick={() => handleComplete(habit._id)}
                disabled={completedToday || loading[habit._id]}
              >
                {loading[habit._id] ? 'Updating...' : completedToday ? '✓ Completed Today!' : '✓ Mark Complete'}
              </button>

              <button
                className="view-chart-btn"
                onClick={() => toggleChart(habit._id)}
              >
                {expandedHabits[habit._id] ? '📅 Hide Calendar' : '📅 View Calendar'}
              </button>

              {expandedHabits[habit._id] && (
                <HabitHeatmap completions={habit.completions} />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default HabitList
