const Doctor = require('./models/Doctor');
const Conscription = require('./models/Conscription');
const Cabinet = require('./models/Cabinet');
const AllocationService = require('./services/AllocationService');
const CommissionService = require('./services/CommissionService');

function initializeProject() {
  // Создание кабинетов
  const cabinets = [
    new Cabinet(101),
    new Cabinet(102),
    new Cabinet(103),
    new Cabinet(104),
    new Cabinet(105)
  ];

  // Создание врачей и назначение кабинетов
  const doctors = [
    new Doctor('Ivan', 'Ivanov', 'Окулист'),
    new Doctor('Petr', 'Petrov', 'Невролог'),
    new Doctor('Sergey', 'Sergeev', 'Кардиолог'),
    new Doctor('Anna', 'Andreeva', 'Гинеколог'),
    new Doctor('Olga', 'Orlova', 'Проктолог')
  ];

  doctors.forEach((doctor, index) => {
    doctor.assignCabinet(cabinets[index]);
  });

  // Создание призывников
  const conscriptions = [
    new Conscription('Alexey', 'Alexeev', '2000-05-15'),
    new Conscription('Dmitry', 'Dmitriev', '1999-03-22'),
    new Conscription('Andrey', 'Andreev', '2001-07-30'),
    new Conscription('Nikolay', 'Nikolaev', '2000-08-11'),
    new Conscription('Mikhail', 'Mikhailov', '1998-12-12'),
    new Conscription('Igor', 'Igorev', '2002-06-05'),
    new Conscription('Vladimir', 'Vladimirov', '2000-01-19'),
    new Conscription('Pavel', 'Pavlov', '2001-09-23'),
    new Conscription('Roman', 'Romanov', '1999-07-14'),
    new Conscription('Oleg', 'Olegov', '2000-04-28'),
    new Conscription('Denis', 'Denisov', '2002-02-17'),
    new Conscription('Maxim', 'Maximov', '1999-11-03'),
    new Conscription('Yuri', 'Yuriev', '2001-12-27'),
    new Conscription('Victor', 'Victorov', '2000-10-09'),
    new Conscription('Sergey', 'Sergeev', '2001-05-08'),
    new Conscription('Anton', 'Antonov', '2000-07-19'),
    new Conscription('Boris', 'Borisov', '1998-01-31'),
    new Conscription('Grigory', 'Grigoriev', '1999-08-22'),
    new Conscription('Stepan', 'Stepanov', '2001-03-13')
  ];

  // Распределение призывников по кабинетам
  conscriptions.forEach(conscription => {
    AllocationService.allocateConscriptionToCabinet(conscription, cabinets);
  });

  // Вызов призывников врачами
  doctors.forEach(doctor => {
    const conscription = doctor.cabinet.queue[0];
    if (conscription) {
      console.log(doctor.callConscription(conscription));
    }
  });

  // Вывод информации о состоянии очередей в кабинетах
  console.table(cabinets.map(cabinet => ({
    Cabinet: cabinet.number,
    QueueLength: cabinet.getQueueLength()
  })));

  // Пример прохождения кабинетов призывником и обновления статуса
  const sampleConscription = conscriptions[0];
  sampleConscription.cabinetsToVisit.forEach(cabinet => sampleConscription.completeCabinet(cabinet));
  console.log(`Статус призывника ${sampleConscription.firstName} после прохождения всех кабинетов: ${sampleConscription.status}`);

  // Присвоение категории призывнику комиссией
  const finalStatus = CommissionService.processConscription(sampleConscription);
  console.log(`Окончательный статус призывника ${sampleConscription.firstName}: ${finalStatus}`);
}

initializeProject();
