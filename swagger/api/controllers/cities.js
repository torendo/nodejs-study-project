import city from "../../../models/city";

export function getAll (req, res) {
  city.getAll()
    .then((documents) => res.json(documents))
    .catch((err) => res.status(404).send({ message: err }));
}
export function add (req, res) {
  city.add(req.swagger.params.body.value)
    .then((response) => res.status(200).send(response))
    .catch((err) => res.status(404).send({ message: err }));
}
export function getOne (req, res) {
  city.getOne(req.swagger.params.id.value)
    .then((documents) => res.json(documents[0]))
    .catch((err) => res.status(404).send({ message: err }));
}
export function update (req, res) {
  city.update(req.swagger.params.body.value, req.swagger.params.id.value)
    .then((response) => res.status(200).send(response))
    .catch((err) => res.status(404).send({ message: err }));
}
export function remove (req, res) {
  city.remove(req.swagger.params.id.value)
    .then((response) => res.status(200).send({ ok: 'deleted' }))
    .catch((err) => res.status(404).send({ message: err }));
}