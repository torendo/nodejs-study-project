import user from "../../../models/user";

export function getAll (req, res) {
  user.getAll()
    .then((documents) => res.json(documents))
    .catch((err) => res.status(404).send({ message: err }));
}
export function remove (req, res) {
  user.deleteOne(req.swagger.params.id.value)
    .then((response) => res.status(200).send({ ok: 'deleted' }))
    .catch((err) => res.status(404).send({ message: err }));
}