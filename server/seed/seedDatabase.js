// server/seed/seedDatabase.js
const fs = require('fs');
const path = require('path');
const sequelize = require('../config/database');
const Question = require('../models/Question');

const seedDatabase = async () => {
  const questionsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'questions.json'), 'utf-8'));

  for (const module in questionsData) {
    for (const question of questionsData[module]) {
      await Question.create({
        ...question,
        module
      });
    }
  }

  console.log('Database seeded!');
};

sequelize.sync({ force: true })
  .then(() => seedDatabase())
  .catch(err => console.log('Error: ' + err));

  