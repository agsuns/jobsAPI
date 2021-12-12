require('dotenv').config();
require('express-async-errors');
const UserModel = require('./models/User');
const PORT = process.env.PORT || 3000;

const express = require('express');
const authRoute = require('./routes/auth');
const jobsRoute = require('./routes/jobs');
const notFoundMiddleware = require('./middlewares/route-not-found');
const errorMiddleware = require('./middlewares/error-handler');
const authenticateUser = require('./middlewares/authentication');

const dbConnect = require('./db/connect');
const app = express();

// this middleware makes it possible to read responses from POST requests
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({ msg: 'Yaay, it has worked!' });
});

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/jobs', authenticateUser, jobsRoute);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

start = async () => {
  try {
    await dbConnect(process.env.MONGO_URI);
    console.log('Server has been connected to db!');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}...`);
    });
  } catch (e) {
    console.log("Couldn't connect to db");
  }
};

start();
