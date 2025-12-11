import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import './HabitChart.css'

function HabitChart({ completions }) {
  // Get last 7 days
  const getLast7Days = () => {
    const days = []
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      date.setHours(0, 0, 0, 0)
      
      days.push({
        name: dayNames[date.getDay()],
        fullDate: date.toISOString().split('T')[0],
        completed: 0
      })
    }
    
    return days
  }

  // Count completions for each day
  const chartData = getLast7Days().map(day => {
    const count = completions.filter(completion => {
      const completionDate = new Date(completion)
      completionDate.setHours(0, 0, 0, 0)
      return completionDate.toISOString().split('T')[0] === day.fullDate
    }).length
    
    return {
      ...day,
      completed: count
    }
  })

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{payload[0].payload.name}</p>
          <p className="value">
            {payload[0].value === 1 ? '✓ Completed' : payload[0].value > 1 ? `✓ ${payload[0].value}x` : 'Not completed'}
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="habit-chart">
      <h4>📈 Last 7 Days</h4>
      <ResponsiveContainer width="100%" height={150}>
        <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.2)" />
          <XAxis 
            dataKey="name" 
            stroke="rgba(255,255,255,0.8)" 
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            stroke="rgba(255,255,255,0.8)" 
            style={{ fontSize: '12px' }}
            allowDecimals={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="completed" radius={[8, 8, 0, 0]}>
            {chartData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.completed > 0 ? 'rgba(46, 213, 115, 0.9)' : 'rgba(255, 255, 255, 0.3)'} 
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="chart-summary">
        <span>Total this week: <strong>{completions.filter(c => {
          const date = new Date(c)
          const weekAgo = new Date()
          weekAgo.setDate(weekAgo.getDate() - 7)
          return date >= weekAgo
        }).length}</strong></span>
      </div>
    </div>
  )
}

export default HabitChart
