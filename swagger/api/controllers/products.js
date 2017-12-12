import product from "../../../models/product";

export function getAll (req, res) {
  product.getAll()
    .then((documents) => res.json(documents))
    .catch((err) => res.status(404).send({ message: err }));
}
export function add (req, res) {
  product.add(req.swagger.params.body.value)
    .then((response) => res.status(200).send(response))
    .catch((err) => res.status(404).send({ message: err }));
}
export function getOne (req, res) {
  product.getOne(req.swagger.params.id.value)
    .then((documents) => res.json(documents[0]))
    .catch((err) => res.status(404).send({ message: err }));
}
export function getAllReviews (req, res) {
  product.getAllReviews(req.swagger.params.id.value)
    .then((documents) => res.json(documents))
    .catch((err) => res.status(404).send({ message: err }));
}
export function remove (req, res) {
  product.remove(req.swagger.params.id.value)
    .then((response) => res.status(200).send({ ok: 'deleted' }))
    .catch((err) => res.status(404).send({ message: err }));
}