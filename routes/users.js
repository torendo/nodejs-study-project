import express from 'express';
const router = express.Router();
import user from '../models/user';

router.get('/', function (req, res) {
  user.getAll()
    .then((documents) => res.json(documents.filter(document => {
      return {
        email: document.email,
        login: document.login,
        fullname: document.fullname
      };
    })))
    .catch((err) => res.status(404).send({ message: err }));
});
router.delete('/:id', function (req, res) {
  user.deleteOne(req.params.id)
    .then(() => res.status(200).send({ ok: 'user deleted' }))
    .catch((err) => res.status(404).send({ message: err }));
});

export default router;