// server/index.js
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const Question = require('./models/Question');
const questionRoutes = require('./routes/questions');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', questionRoutes);

const PORT = process.env.PORT || 5000;

sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
