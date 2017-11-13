import jwt from 'jsonwebtoken';
import config from '../config/index.json';

export default function tokenChecker (req, res, next) {
  const token = req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, config.secret, function (err, decoded) {
      if (err) {
        res.status(403).send({ message: 'Invalid authorisation token' });
      } else {
        next();
      }
    });
  } else {
    res.status(403).send({ message: 'Authorisation token not provided' });
  }
};