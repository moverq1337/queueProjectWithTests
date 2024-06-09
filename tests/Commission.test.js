const Commission = require('../models/Commission');
const Conscription = require('../models/Conscription');

test('Commission assigns correct category', () => {
  const conscription = new Conscription('Petr', 'Petrov', '2000-01-01');

  const status = Commission.assignCategory(conscription);
  console.log(`Категория для призывника ${conscription.firstName} ${conscription.lastName}: ${status}`);
  expect(status).toBe('Fit');
  expect(conscription.status).toBe('Fit');

  conscription.birthDate = '1970-01-01';
  const status2 = Commission.assignCategory(conscription);
  console.log(`Категория для призывника ${conscription.firstName} ${conscription.lastName}: ${status2}`);
  expect(status2).toBe('Unfit');
  expect(conscription.status).toBe('Unfit');
});
