// client/src/components/Game.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

const Game = ({ module }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds

  useEffect(() => {
    // Fetch questions from the backend
    axios.get(`http://localhost:5000/api/questions/${module}`)
      .then(response => setQuestions(response.data));

    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
    };
  }, [module]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearInterval(timer);
    } else {
      setGameOver(true);
    }
  }, [timeLeft]);

  const handleAnswer = (answer) => {
    // Handle answer logic
    if (questions[currentQuestion].answer === answer) {
      setScore(score + 1);
    }
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setGameOver(true);
    }
  };

  return (
    <div>
      {!gameOver ? (
        questions.length > 0 && (
          <div>
            <h2>{questions[currentQuestion].question}</h2>
            {questions[currentQuestion].options.map(option => (
              <button key={option} onClick={() => handleAnswer(option)}>{option}</button>
            ))}
            <div>Time left: {Math.floor(timeLeft / 60)}:{timeLeft % 60}</div>
          </div>
        )
      ) : (
        <div>
          <h1>Game Over</h1>
          <p>Your score: {score}</p>
        </div>
      )}
    </div>
  );
};

export default Game;
