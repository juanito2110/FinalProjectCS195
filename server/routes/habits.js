const express = require('express');
const router = express.Router();
const Habit = require('../models/Habit');

// GET all habits
router.get('/', async (req, res) => {
  try {
    const habits = await Habit.find().sort({ createdAt: -1 });
    res.json(habits);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create new habit
router.post('/', async (req, res) => {
  const habit = new Habit({
    title: req.body.title,
    description: req.body.description
  });

  try {
    const newHabit = await habit.save();
    res.status(201).json(newHabit);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PATCH mark habit complete for today
router.patch('/:id/complete', async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);
    if (!habit) {
      return res.status(404).json({ message: 'Habit not found' });
    }

    // Add today's date to completions
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Check if already completed today
    const alreadyCompleted = habit.completions.some(date => {
      const completionDate = new Date(date);
      completionDate.setHours(0, 0, 0, 0);
      return completionDate.getTime() === today.getTime();
    });

    if (!alreadyCompleted) {
      habit.completions.push(today);
      await habit.save();
    }

    res.json(habit);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE habit
router.delete('/:id', async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);
    if (!habit) {
      return res.status(404).json({ message: 'Habit not found' });
    }

    await Habit.findByIdAndDelete(req.params.id);
    res.json({ message: 'Habit deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET habit statistics
router.get('/:id/stats', async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);
    if (!habit) {
      return res.status(404).json({ message: 'Habit not found' });
    }

    // Group completions by day of week
    const weekData = [0, 0, 0, 0, 0, 0, 0]; // Sun-Sat
    habit.completions.forEach(date => {
      const day = new Date(date).getDay();
      weekData[day]++;
    });

    res.json({
      totalCompletions: habit.completions.length,
      weekData: weekData,
      completions: habit.completions
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
