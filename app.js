import express from 'express';
import cookie from 'cookie-parser';
import bodyParser from 'body-parser';
import passport from 'passport';
import mongoose from 'mongoose';

import config from './config/index.json';

import {default as userRouter} from './routes/users';
import {default as productRouter} from './routes/products';
import {default as cityRouter} from './routes/cities';
import {default as authRouter} from './routes/auth';
import {default as loginRouter} from './routes/login';

import queryParser from './middlewares/queryParser';
import cookieParser from './middlewares/cookieParser';
import tokenChecker from './middlewares/tokenChecker';

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(config.dbUrl, {
  useMongoClient: true
}, () => {
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

//pp. 5,6: Create middleware for cookie parsing, for query parsing
  app.use('/', queryParser);
  app.use('/', cookie(), cookieParser);
  app.use('/', function (req, res, next) {
    console.log('parsedCookies', req.parsedCookies);
    console.log('parsedQuery', req.parsedQuery);
    next();
  });

  app.use(passport.initialize());
  app.use('/login', loginRouter);

  app.use('/auth', authRouter);

  app.use('/api', tokenChecker);
  app.use('/api/users', userRouter);
  app.use('/api/products', productRouter);
  app.use('/api/cities', cityRouter);

  const port = process.env.PORT || 8080;
  app.listen(port, () => console.log(`App listening on port ${port}!`));
});