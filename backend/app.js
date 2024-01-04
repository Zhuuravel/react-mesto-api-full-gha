
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose').default;
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');
const { rateLimit } = require('express-rate-limit');
const helmet = require('helmet');
const routes = require('./routes');
const NotFound = require('./errors/NotFound');
const errorHandler = require('./middlewares/error-handler');
const app = express();
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
});

const { PORT, MONGO_URL } = process.env;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(limiter);
app.use(helmet());

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('MongoDB connected');
  });

  app.use(requestLogger);

app.use(cors);

app.use(routes);

app.use('*', (req, res, next) => next(new NotFound('Неверный путь')));

app.use(errorLogger);

app.use(errors()); // обработчик ошибок celebrate

app.use(errorHandler);

app.listen(PORT, () => {
  console.log('Server started on port 3000');
});
