const Cabinet = require('../models/Cabinet');
const QueueService = require('../services/QueueService');
const Conscription = require('../models/Conscription');

test('Predict waiting times correctly', () => {
  const cabinets = [
    new Cabinet(101),
    new Cabinet(102),
    new Cabinet(103),
    new Cabinet(104),
    new Cabinet(105)
  ];

  const conscriptions = Array.from({ length: 19 }, (_, i) => 
    new Conscription(`Name${i + 1}`, `Surname${i + 1}`, `2000-01-0${(i % 9) + 1}`)
  );

  conscriptions.forEach((conscription, index) => {
    cabinets[index % 5].addToQueue(conscription);
  });

  const predictedTimes = QueueService.predictWaitingTimes(cabinets);
  console.log('Оценочное время ожидания в кабинетах:');
  console.table(predictedTimes);

  expect(predictedTimes.length).toBe(5);
  predictedTimes.forEach((predicted, index) => {
    const expectedQueueLength = cabinets[index].getQueueLength();
    expect(predicted.cabinet).toBe(cabinets[index].number);
    expect(predicted.predictedTime).toBe(expectedQueueLength * 10); // Время ожидания = длина очереди * 10 минут
  });
});

test('Find cabinet with shortest waiting time', () => {
  const cabinets = [
    new Cabinet(101),
    new Cabinet(102),
    new Cabinet(103),
    new Cabinet(104),
    new Cabinet(105)
  ];

  const conscriptions = Array.from({ length: 19 }, (_, i) => 
    new Conscription(`Name${i + 1}`, `Surname${i + 1}`, `2000-01-0${(i % 9) + 1}`)
  );

  conscriptions.forEach((conscription, index) => {
    cabinets[index % 5].addToQueue(conscription);
  });

  const optimalCabinet = QueueService.findCabinetWithShortestWaitingTime(cabinets);
  console.log(`Кабинет с наименьшим временем ожидания: №${optimalCabinet.cabinet}, Время ожидания: ${optimalCabinet.predictedTime} минут`);

  expect(optimalCabinet).toBeTruthy();
  const minQueueLength = Math.min(...cabinets.map(cab => cab.getQueueLength()));
  expect(optimalCabinet.predictedTime).toBe(minQueueLength * 10); // Время ожидания = длина очереди * 10 минут
});
