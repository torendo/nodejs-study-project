import express from 'express';
const router = express.Router();
import product from '../models/product';

router.get('/', function (req, res) {
  product.getAll()
    .then((documents) => res.json(documents))
    .catch((err) => res.status(404).send({ message: err }));
});
router.get('/:id', function (req, res) {
  product.getOne(req.params.id)
    .then((documents) => res.json(documents[0]))
    .catch((err) => res.status(404).send({ message: err }));
});
router.get('/:id/reviews', function (req, res) {
  product.getAllReviews(req.params.id)
    .then((documents) => res.json(documents))
    .catch((err) => res.status(404).send({ message: err }));
});
router.post('/', function (req, res) {
  product.add(req.body)
    .then((response) => res.status(200).send(response))
    .catch((err) => res.status(404).send({ message: err }));
});
router.delete('/:id', function (req, res) {
  product.remove(req.params.id)
    .then((response) => res.status(200).send(response))
    .catch((err) => res.status(404).send({ message: err }));
});

export default router;