import express from 'express';
const router = express.Router();
import Product from '../models/product';

router.post('/', function (req, res) {
  res.send('product added');
});
router.get('/', function (req, res) {
  res.json(Product.getAll());
});
router.get('/:id', function (req, res) {
  res.json(Product.getOne(req.params.id));
});
router.get('/:id/reviews', function (req, res) {
  res.json(Product.getAllReviews(req.params.id));
});

export default router;