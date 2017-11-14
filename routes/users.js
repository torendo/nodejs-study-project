import express from 'express';
const router = express.Router();
import db from '../models/';

const User = require('../models/user')(db.sequelize, db.Sequelize);

router.get('/', function (req, res) {
  User.findAll().then(response => res.json(response));
});

export default router;