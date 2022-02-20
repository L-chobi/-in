const { Router } = require('express');

const router = Router();

const { setLoggedInStatus } = require('../../../middlewares');

const {
  getLostPets,
  getLostPetDetail,
} = require('./lostPetsController');

router.get('/', setLoggedInStatus, getLostPets);
router.get('/:id', setLoggedInStatus, getLostPetDetail);

module.exports = router;
