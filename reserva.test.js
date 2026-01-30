const { crearReserva } = require('../src/controllers/reservaController');

test('crearReserva devuelve objeto esperado', () => {
  const resultado = crearReserva({ fecha: '2024-01-15', hora: '10:00' });
  expect(resultado).toEqual({ status: 'creada', id: 123 });
});