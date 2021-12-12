const express = require('express');
const router = express.Router();
const { login, register, getAllUsers } = require('../controllers/auth');

router.get('/', getAllUsers);
router.post('/login', login);
router.post('/register', register);

module.exports = router;
