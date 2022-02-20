const { Router } = require('express');

const router = Router();

const { setLoggedInStatus } = require('../../middlewares');
const { logined } = require('./myPageController');

router.get('/', setLoggedInStatus, logined);

module.exports = router;
