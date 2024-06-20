// server/routes/questions.js
const express = require('express');
const router = express.Router();
const Question = require('../models/Question');

// Get questions by module
router.get('/questions/:module', async (req, res) => {
  const module = req.params.module;
  try {
    const questions = await Question.findAll({ 
      where: { module },
      limit: 10 // Limit to 10 questions per game
    });
    res.json(questions);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
