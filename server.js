//server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const router = require('./routes/router');

const port = process.env.PORT || 3000;
const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define your routes here
app.use('/api', router);

// Custom 404 handler must be after all other app.use() and routes calls
app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!");
});

// Consolidated custom error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).send({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});


