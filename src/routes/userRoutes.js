const express = require('express');
const { createUserWithRole } = require('../controllers/userController');
const router = express.Router();

// Ruta para crear usuario con rol
router.post('/create', createUserWithRole);

module.exports = router;
