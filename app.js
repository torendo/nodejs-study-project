import express from 'express';
import cookie from 'cookie-parser';

import {default as userRouter} from './routes/users';
import {default as productRouter} from './routes/products';

import queryParser from './middlewares/queryParser';
import cookieParser from './middlewares/cookieParser';

const app = express();

//pp. 5,6: Create middleware for cookie parsing, for query parsing
app.use('/', queryParser);
app.use('/', cookie(), cookieParser);
app.use('/', function (req, res, next) {
  console.log('parsedCookies', req.parsedCookies);
  console.log('parsedQuery', req.parsedQuery);
  next();
});

//p. 8 Make your application to respond to the following routes...
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`App listening on port ${port}!`));