import express from 'express';
const router = express.Router();
import city from '../models/city';

router.get('/', function (req, res) {
  city.getAll()
    .then((documents) => res.json(documents))
    .catch((err) => res.status(404).send({ message: err }));
});
router.get('/:id', function (req, res) {
  city.getOne(req.params.id)
    .then((documents) => res.json(documents[0]))
    .catch((err) => res.status(404).send({ message: err }));
});
router.post('/', function (req, res) {
  city.add(req.body)
    .then((response) => res.status(200).send(response))
    .catch((err) => res.status(404).send({ message: err }));
});
router.put('/:id', function (req, res) {
  city.update(req.body, req.params.id)
    .then((response) => res.status(200).send(response))
    .catch((err) => res.status(404).send({ message: err }));
});
router.delete('/:id', function (req, res) {
  city.remove(req.params.id)
    .then((response) => res.status(200).send(response))
    .catch((err) => res.status(404).send({ message: err }));
});

export default router;