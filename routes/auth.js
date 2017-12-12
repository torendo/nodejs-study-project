import express from 'express';
const router = express.Router();
import jwt from 'jsonwebtoken';
import config from '../config/index.json';

router.post('/', function (req, res) {
  if (req.body && req.body.login === config.user.login && req.body.password === config.user.password) {

    const token = jwt.sign({}, config.secret, { expiresIn: 1000 });

    res.status(200).send({
      message: "OK",
      data: {
        user: {
          email: config.user.email,
          username: config.user.login,
          fullname: config.user.fullname
        }
      },
      token: token
    });
  } else {
    res.status(404).send({ message: "Not Found" });
  }
});

export default router;