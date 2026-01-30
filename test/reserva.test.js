const { crearReserva } = require('../src/controllers/reservaController');
const Reserva = require('../src/models/Reserva');

jest.mock('../src/models/Reserva');

describe('crearReserva', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('crea una reserva válida', async () => {
    const mockSave = jest.fn().mockResolvedValue({ _id: 'reserva456' });
    Reserva.mockImplementation(() => ({ save: mockSave }));

    const req = {
      body: { fecha: '2024-01-15', hora: '10:00' },
      user: { id: 'usuario123' }
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await crearReserva(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      msg: 'Reserva creada',
      id: 'reserva456'
    });
  });

  it('rechaza reservas en domingo', async () => {
    const req = {
      body: { fecha: '2024-01-07', hora: '10:00' },
      user: { id: 'usuario123' }
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await crearReserva(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: 'No se permiten reservas en domingo'
    });
  });

  it('rechaza reservas sin usuario autenticado', async () => {
    const req = {
      body: { fecha: '2024-01-15', hora: '10:00' },
      user: null
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await crearReserva(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Usuario no autenticado'
    });
  });

});
