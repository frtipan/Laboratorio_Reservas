const Reserva = require('../models/Reserva');

// Crear nueva reserva
exports.crearReserva = async (req, res) => {
  try {
    const { fecha, hora } = req.body;

    if (!fecha || !hora) {
      return res.status(400).json({ error: "Fecha y hora son requeridas" });
    }

    const dia = new Date(fecha).getDay(); // 0 = domingo
    if (dia === 0) {
      return res.status(400).json({ error: "No se permiten reservas en domingo" });
    }

    // ⚠️ Asegúrate de que req.user exista y tenga id
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "Usuario no autenticado" });
    }

    const reserva = new Reserva({ fecha, hora, userId: req.user.id });
    await reserva.save();

    return res.status(201).json({ msg: "Reserva creada", id: reserva._id });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Obtener reservas del usuario autenticado
exports.obtenerReservas = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "Usuario no autenticado" });
    }

    const reservas = await Reserva.find({ userId: req.user.id });
    return res.status(200).json(reservas);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Eliminar reserva por ID
exports.eliminarReserva = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "Usuario no autenticado" });
    }

    const reserva = await Reserva.findById(req.params.id);

    if (!reserva) {
      return res.status(404).json({ error: "Reserva no encontrada" });
    }

    if (reserva.userId.toString() !== req.user.id) {
      return res.status(403).json({ error: "No autorizado para eliminar esta reserva" });
    }

    await reserva.deleteOne();
    return res.status(200).json({ msg: "Reserva cancelada" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};