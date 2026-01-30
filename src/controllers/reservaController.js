const Reserva = require('../models/Reserva');

exports.crearReserva = async (req, res) => {
  try {

    if (!req.user) {
      return res.status(401).json({ error: 'Usuario no autenticado' });
    }

    const { fecha, hora } = req.body;

    const dia = new Date(fecha + 'T00:00:00').getDay();

    if (dia === 0) {
      return res.status(400).json({ error: 'No se permiten reservas en domingo' });
    }

    const reserva = new Reserva({
      fecha,
      hora,
      usuario: req.user.id
    });

    const resultado = await reserva.save();

    return res.status(201).json({
      msg: 'Reserva creada',
      id: resultado._id
    });

  } catch (error) {
    return res.status(500).json({ error: 'Error al crear reserva' });
  }
};
