const express = require('express');
const router = express.Router();

// Ruta de ejemplo
router.get('/example', (req, res) => {
    res.json({ mensaje: '¡Ruta de ejemplo funcionando!' });
});

module.exports = router;
