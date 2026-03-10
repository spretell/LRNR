// starter code for index.js

// import necessary packages :
// express → backend framework
// cors → allows frontend (React) to communicate with backend
// dotenv → loads environment variables from .env file
const express = require("express");
const cors = require("cors");
require("dotenv").config();

// import route files
const quizRoutes = require("./routes/quizRoutes.js");
const sessionRoutes = require("./routes/sessionRoutes");
const userRoutes = require("./routes/userRoutes");
const progressRoutes = require("./routes/progressRoutes");

// create an express application
const app = express();

// middleware → allows cross-origin requests
app.use(cors());
// allows us to parse JSON data from requests
app.use(express.json());

// basic route to test if server is running ; should see message on localhost:5050
app.get("/", (req, res) => {
  res.send("LRNR API running");
});

// register routes ; all quiz-related routes will be prefixed with /api/quiz
app.use('/api/v1/quiz', quizRoutes);
app.use('/api/v1/session', sessionRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/progress', progressRoutes);

// start the server ; uses PORT from .env or defaults to 5050
// const PORT = process.env.PORT || 5050;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
module.exports = app;
