const { crearReserva } = require('../src/controllers/reservaController');
const Reserva = require('../src/models/Reserva');

// Mock explícito del constructor y método save
jest.mock('../src/models/Reserva', () => {
  return jest.fn().mockImplementation(() => ({
    save: jest.fn().mockResolvedValue({ _id: 'reserva456' })
  }));
});

describe('crearReserva', () => {
  it('crea una reserva válida', async () => {
    const req = {
      body: { fecha: '2024-01-15', hora: '10:00' }, // lunes
      user: { id: 'usuario123' }
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await crearReserva(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ msg: 'Reserva creada', id: 'reserva456' });
  });

  it('rechaza reservas en domingo', async () => {
    const req = {
      body: { fecha: '2024-01-18', hora: '10:00' }, // domingo
      user: { id: 'usuario123' }
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await crearReserva(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'No se permiten reservas en domingo' });
  });
});