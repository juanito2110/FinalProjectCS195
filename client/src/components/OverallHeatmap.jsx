import { useState } from 'react'
import './OverallHeatmap.css'

function OverallHeatmap({ habits }) {
  const [selectedDay, setSelectedDay] = useState(null)

  // Get last 30 days with completion counts
  const getLast30DaysWithCounts = () => {
    const days = []
    
    for (let i = 29; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      date.setHours(0, 0, 0, 0)
      
      // Count how many habits were completed on this day
      let completionCount = 0
      const completedHabits = []
      
      habits.forEach(habit => {
        const hasCompletion = habit.completions.some(completion => {
          const completionDate = new Date(completion)
          completionDate.setHours(0, 0, 0, 0)
          return completionDate.getTime() === date.getTime()
        })
        
        if (hasCompletion) {
          completionCount++
          completedHabits.push(habit.title)
        }
      })
      
      days.push({
        date: date,
        dateString: date.toISOString().split('T')[0],
        day: date.getDate(),
        month: date.toLocaleString('default', { month: 'short' }),
        completionCount: completionCount,
        completedHabits: completedHabits,
        isToday: date.toDateString() === new Date().toDateString()
      })
    }
    
    return days
  }

  const days = getLast30DaysWithCounts()
  
  // Group by weeks
  const weeks = []
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7))
  }

  // Get intensity class based on completion count
  const getIntensityClass = (count) => {
    if (count === 0) return 'intensity-0'
    if (count === 1) return 'intensity-1'
    if (count === 2) return 'intensity-2'
    if (count === 3) return 'intensity-3'
    return 'intensity-4' // 4 or more
  }

  // Calculate overall stats
  const totalCompletions = days.reduce((sum, day) => sum + day.completionCount, 0)
  const daysWithActivity = days.filter(d => d.completionCount > 0).length
  const currentStreak = calculateCurrentStreak(days)

  function calculateCurrentStreak(days) {
    let streak = 0
    for (let i = days.length - 1; i >= 0; i--) {
      if (days[i].completionCount > 0) {
        streak++
      } else {
        break
      }
    }
    return streak
  }

  const handleDayClick = (day) => {
    if (day.completionCount > 0) {
      setSelectedDay(day)
    } else {
      setSelectedDay(null)
    }
  }

  return (
    <div className="overall-heatmap-container">
      <div className="overall-heatmap-header">
        <h2>🔥 Overall Progress - Last 30 Days</h2>
        <div className="overall-stats">
          <div className="overall-stat-item">
            <span className="stat-number">{totalCompletions}</span>
            <span className="stat-text">Total Completions</span>
          </div>
          <div className="overall-stat-item">
            <span className="stat-number">{daysWithActivity}</span>
            <span className="stat-text">Active Days</span>
          </div>
          <div className="overall-stat-item">
            <span className="stat-number">{currentStreak}</span>
            <span className="stat-text">Current Streak</span>
          </div>
        </div>
      </div>

      <div className="overall-heatmap">
        <div className="heatmap-grid-overall">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="heatmap-week-overall">
              {week.map((day, dayIndex) => (
                <div
                  key={dayIndex}
                  className={`heatmap-day-overall ${getIntensityClass(day.completionCount)} ${day.isToday ? 'today' : ''}`}
                  onClick={() => handleDayClick(day)}
                  title={`${day.month} ${day.day}: ${day.completionCount} habit${day.completionCount !== 1 ? 's' : ''} completed`}
                >
                  <span className="day-number-overall">{day.day}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
        
        <div className="heatmap-legend-overall">
          <span>Less</span>
          <div className="legend-item-overall intensity-0"></div>
          <div className="legend-item-overall intensity-1"></div>
          <div className="legend-item-overall intensity-2"></div>
          <div className="legend-item-overall intensity-3"></div>
          <div className="legend-item-overall intensity-4"></div>
          <span>More</span>
        </div>
      </div>

      {selectedDay && (
        <div className="day-detail-card">
          <div className="day-detail-header">
            <h3>📅 {selectedDay.month} {selectedDay.day}</h3>
            <button className="close-btn" onClick={() => setSelectedDay(null)}>✕</button>
          </div>
          <p className="completion-summary">
            You completed <strong>{selectedDay.completionCount}</strong> habit{selectedDay.completionCount !== 1 ? 's' : ''} on this day:
          </p>
          <ul className="completed-habits-list">
            {selectedDay.completedHabits.map((habit, index) => (
              <li key={index}>✓ {habit}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default OverallHeatmap
