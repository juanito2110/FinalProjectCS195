import { useState, useEffect } from 'react'
import axios from 'axios'
import HabitForm from './components/HabitForm'
import HabitList from './components/HabitList'
import OverallHeatmap from './components/OverallHeatmap'
import './App.css'

function App() {
  const [habits, setHabits] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchHabits()
  }, [])

  const fetchHabits = async () => {
    try {
      const response = await axios.get('http://localhost:5000/habits')
      setHabits(response.data)
      setLoading(false)
    } catch (err) {
      setError('Failed to fetch habits')
      setLoading(false)
      console.error('Error fetching habits:', err)
    }
  }

  const handleHabitCreated = (newHabit) => {
    setHabits(prevHabits => [newHabit, ...prevHabits])
  }

  const handleHabitUpdate = () => {
    fetchHabits()
  }

  if (loading) return <div className="container">Loading...</div>
  if (error) return <div className="container error">{error}</div>

  return (
    <div className="container">
      <header className="app-header">
        <h1>Habit Tracker</h1>
        <p className="tagline">Build better routines through visual progress tracking</p>
      </header>
      
      <HabitForm onHabitCreated={handleHabitCreated} />
      <HabitList habits={habits} onHabitUpdate={handleHabitUpdate} />
      
      {habits.length > 0 && (
        <OverallHeatmap habits={habits} />
      )}
    </div>
  )
}

export default App
