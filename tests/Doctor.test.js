const Doctor = require('../models/Doctor');
const Cabinet = require('../models/Cabinet');
const Conscription = require('../models/Conscription');

test('Doctor can call a conscription', () => {
  const doctor = new Doctor('Ivan', 'Ivanov', 'Окулист');
  const cabinet = new Cabinet(101);
  doctor.assignCabinet(cabinet);
  const conscription = new Conscription('Petr', 'Petrov', '2000-01-01');

  const message = doctor.callConscription(conscription);
  console.log(`Доктор ${doctor.firstName} ${doctor.lastName} вызвал призывника: ${message}`);
  expect(message).toBe('Petr Petrov, пожалуйста, пройдите в кабинет 101');
});

test('Doctor assigns a cabinet correctly', () => {
  const doctor = new Doctor('Ivan', 'Ivanov', 'Окулист');
  const cabinet = new Cabinet(101);
  doctor.assignCabinet(cabinet);
  console.log(`Доктору ${doctor.firstName} ${doctor.lastName} назначен кабинет №${doctor.cabinet.number}`);
  expect(doctor.cabinet).toBe(cabinet);
});
