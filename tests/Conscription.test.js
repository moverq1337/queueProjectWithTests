const Conscription = require('../models/Conscription');
const Cabinet = require('../models/Cabinet');

test('Conscription can add and complete cabinets', () => {
  const conscription = new Conscription('Petr', 'Petrov', '2000-01-01');
  const cabinet1 = new Cabinet(101);
  const cabinet2 = new Cabinet(102);

  conscription.addCabinet(cabinet1);
  conscription.addCabinet(cabinet2);
  console.log(`Призывник ${conscription.firstName} ${conscription.lastName} должен посетить кабинеты: ${conscription.cabinetsToVisit.map(c => c.number).join(', ')}`);
  expect(conscription.cabinetsToVisit.length).toBe(2);

  conscription.completeCabinet(cabinet1);
  console.log(`Призывник ${conscription.firstName} ${conscription.lastName} завершил посещение кабинета №${cabinet1.number}. Осталось посетить: ${conscription.cabinetsToVisit.map(c => c.number).join(', ')}`);
  expect(conscription.cabinetsToVisit.length).toBe(1);
  expect(conscription.status).toBe('Pending');

  conscription.completeCabinet(cabinet2);
  console.log(`Призывник ${conscription.firstName} ${conscription.lastName} завершил посещение всех кабинетов. Статус: ${conscription.status}`);
  expect(conscription.cabinetsToVisit.length).toBe(0);
  expect(conscription.status).toBe('Ready for commission');
});

test('Conscription initializes correctly', () => {
  const conscription = new Conscription('Ivan', 'Ivanov', '1995-05-15');
  console.log(`Создан призывник: ${conscription.firstName} ${conscription.lastName}, дата рождения: ${conscription.birthDate}`);
  expect(conscription.firstName).toBe('Ivan');
  expect(conscription.lastName).toBe('Ivanov');
  expect(conscription.birthDate).toBe('1995-05-15');
  expect(conscription.cabinetsToVisit).toEqual([]);
  expect(conscription.status).toBe('Pending');
});

test('Conscription can calculate age correctly', () => {
  const conscription = new Conscription('Petr', 'Petrov', '2000-01-01');
  const age = conscription.calculateAge();
  console.log(`Призывнику ${conscription.firstName} ${conscription.lastName} ${age} лет`);
  expect(age).toBe(new Date().getFullYear() - 2000);
});

test('Conscription can estimate waiting time correctly', () => {
  const conscription = new Conscription('Petr', 'Petrov', '2000-01-01');
  const cabinet1 = new Cabinet(101);
  const cabinet2 = new Cabinet(102);
  cabinet1.addToQueue(new Conscription('A', 'A', '2000-01-01'));
  cabinet1.addToQueue(new Conscription('B', 'B', '2000-01-01'));
  cabinet2.addToQueue(new Conscription('C', 'C', '2000-01-01'));

  conscription.addCabinet(cabinet1);
  conscription.addCabinet(cabinet2);

  const waitingTime = conscription.estimateWaitingTime();
  console.log(`Оценочное время ожидания для ${conscription.firstName}: ${waitingTime} минут`);
  expect(waitingTime).toBe(30); // 2*10 + 1*10 = 30
});
