import { useState } from 'react'
import './HabitForm.css'

function HabitForm({ onHabitCreated }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!title.trim()) {
      setError('Please enter a habit title')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch('http://localhost:5000/habits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim()
        })
      })

      if (!response.ok) {
        throw new Error('Failed to create habit')
      }

      const newHabit = await response.json()
      
      // Clear form
      setTitle('')
      setDescription('')
      
      // Notify parent component
      onHabitCreated(newHabit)
    } catch (err) {
      setError(err.message)
      console.error('Error creating habit:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="habit-form-container">
      <h2>✨ Create New Habit</h2>
      <form onSubmit={handleSubmit} className="habit-form">
        <div className="form-group">
          <label htmlFor="title">Habit Title *</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Morning Exercise, Read 30 Minutes"
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description (optional)</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Why is this habit important to you?"
            rows="3"
            disabled={loading}
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Creating...' : '+ Add Habit'}
        </button>
      </form>
    </div>
  )
}

export default HabitForm
