import express from 'express';
const router = express.Router();
import jwt from 'jsonwebtoken';
import config from '../config/index.json';
import db from '../models/';
const User = require('../models/user')(db.sequelize, db.Sequelize);

router.post('/', async function (req, res) {
  if (!req.body) res.status(404).send({ message: "Not Found" });
  const user = await User.findOne({
    where: {
      login: req.body.login,
      password: req.body.password
    }
  });
  if (user) {
    const token = jwt.sign({}, config.secret, { expiresIn: 1000 });
    res.status(200).send({
      message: "OK",
      data: {
        user: {
          email: user.email,
          fullname: user.fullname
        }
      },
      token: token
    });
  } else {
    res.status(401).send({ message: "Wrong user or password" });
  }
});

export default router;