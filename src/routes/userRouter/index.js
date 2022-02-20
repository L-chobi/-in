const { Router } = require('express');

const router = Router();

const {
  getUsers,
  getUserDetail,
  createUser,
  updateUser,
  deleteUser,
} = require('./userController');

router.get('/', getUsers);
router.post('/', createUser);
router.get('/:id', getUserDetail);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
