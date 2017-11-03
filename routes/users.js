import express from 'express';
const router = express.Router();
import User from '../models/user';

router.get('/', function (req, res) {
  res.json(User.getAll());
});

export default router;