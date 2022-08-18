const express = require('express');
const router = express.Router();
const userMiddlewares = require('../middlewares/user');
const userController = require('../controllers/users');

router.post('/user/add', userMiddlewares.add, userController.add);
router.post('/user/login', userMiddlewares.login, userController.login);

module.exports = router; 