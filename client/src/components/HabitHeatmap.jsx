import './HabitHeatmap.css'

function HabitHeatmap({ completions }) {
  // Get last 30 days
  const getLast30Days = () => {
    const days = []
    
    for (let i = 29; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      date.setHours(0, 0, 0, 0)
      
      // Check if this day has a completion
      const hasCompletion = completions.some(completion => {
        const completionDate = new Date(completion)
        completionDate.setHours(0, 0, 0, 0)
        return completionDate.getTime() === date.getTime()
      })
      
      days.push({
        date: date,
        dateString: date.toISOString().split('T')[0],
        day: date.getDate(),
        month: date.toLocaleString('default', { month: 'short' }),
        completed: hasCompletion,
        isToday: date.toDateString() === new Date().toDateString()
      })
    }
    
    return days
  }

  const days = getLast30Days()
  
  // Group by weeks (rows of 7)
  const weeks = []
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7))
  }

  // Calculate completion stats
  const completedDays = days.filter(d => d.completed).length
  const completionRate = Math.round((completedDays / 30) * 100)

  return (
    <div className="habit-heatmap">
      <div className="heatmap-header">
        <h4>📅 Last 30 Days</h4>
        <div className="heatmap-stats">
          <span className="stat-badge">{completedDays}/30 days</span>
          <span className="stat-badge">{completionRate}% rate</span>
        </div>
      </div>
      
      <div className="heatmap-grid">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="heatmap-week">
            {week.map((day, dayIndex) => (
              <div
                key={dayIndex}
                className={`heatmap-day ${day.completed ? 'completed' : 'empty'} ${day.isToday ? 'today' : ''}`}
                title={`${day.month} ${day.day}: ${day.completed ? 'Completed ✓' : 'Not completed'}`}
              >
                <span className="day-number">{day.day}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
      
      <div className="heatmap-legend">
        <span>Less</span>
        <div className="legend-item empty"></div>
        <div className="legend-item completed"></div>
        <span>More</span>
      </div>
    </div>
  )
}

export default HabitHeatmap
