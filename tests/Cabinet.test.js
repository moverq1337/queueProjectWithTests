const Cabinet = require('../models/Cabinet');
const Conscription = require('../models/Conscription');

test('Cabinet can add and remove conscriptions from queue', () => {
  const cabinet = new Cabinet(101);
  const conscription1 = new Conscription('Petr', 'Petrov', '2000-01-01');
  const conscription2 = new Conscription('Ivan', 'Ivanov', '1995-05-15');

  cabinet.addToQueue(conscription1);
  cabinet.addToQueue(conscription2);
  console.log(`Очередь в кабинете №${cabinet.number} после добавления призывников:`);
  console.table(cabinet.queue.map(c => ({ Name: `${c.firstName} ${c.lastName}`, BirthDate: c.birthDate })));
  expect(cabinet.getQueueLength()).toBe(2);

  const removedConscription = cabinet.removeFromQueue();
  console.log(`Призывник ${removedConscription.firstName} ${removedConscription.lastName} был вызван из очереди кабинета №${cabinet.number}`);
  console.log(`Очередь в кабинете №${cabinet.number} после вызова призывника:`);
  console.table(cabinet.queue.map(c => ({ Name: `${c.firstName} ${c.lastName}`, BirthDate: c.birthDate })));
  expect(removedConscription).toBe(conscription1);
  expect(cabinet.getQueueLength()).toBe(1);
});

test('Cabinet initializes correctly', () => {
  const cabinet = new Cabinet(101);
  console.log(`Создан кабинет №${cabinet.number}`);
  expect(cabinet.number).toBe(101);
  expect(cabinet.queue).toEqual([]);
});
