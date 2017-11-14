import express from 'express';
const router = express.Router();
import db from '../models/';

const Product = require('../models/product')(db.sequelize, db.Sequelize);

router.post('/', function (req, res) {
  Product.create(req.body).then(product => res.json(product));
});
router.get('/', function (req, res) {
  Product.findAll().then(response => res.json(response));
});
router.get('/:id', function (req, res) {
  Product.findById(req.params.id).then(response => res.json(response));
});
router.get('/:id/reviews', function (req, res) {
  Product.findById(req.params.id, {
    attributes: ['reviews']
  }).then(response => res.json(response));
});

export default router;