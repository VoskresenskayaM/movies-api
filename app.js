const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const helmet = require('helmet');
const { PORT, DB_ADDRESS } = require('./utils');
const routes = require('./routes/index');
const handlerError = require('./middlewares/hendlerError');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./middlewares/rateLimiter');

const app = express();
app.use(cors());
app.use(helmet());
mongoose.connect(DB_ADDRESS);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);
app.use(limiter);
app.use('/', routes);
app.use(errorLogger);
app.use(errors());
app.use(handlerError);
app.listen(PORT);
