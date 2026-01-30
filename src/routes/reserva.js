const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { crearReserva, obtenerReservas, eliminarReserva } = require('../controllers/reservaController');

router.post('/', auth, crearReserva);
router.get('/', auth, obtenerReservas);
router.delete('/:id', auth, eliminarReserva);

module.exports = router;