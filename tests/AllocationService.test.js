const Cabinet = require('../models/Cabinet');
const AllocationService = require('../services/AllocationService');
const Conscription = require('../models/Conscription');

test('Allocate conscription to the cabinet with shortest waiting time', () => {
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

  conscriptions.slice(0, 15).forEach((conscription, index) => {
    cabinets[index % 5].addToQueue(conscription);
  });

  const newConscription = new Conscription('Petr', 'Petrov', '2000-01-01');
  const optimalCabinet = AllocationService.allocateConscriptionToCabinet(newConscription, cabinets);
  
  console.log(`Призывник ${newConscription.firstName} ${newConscription.lastName} назначен в кабинет №${optimalCabinet.number}`);
  console.table([{
    Conscription: `${newConscription.firstName} ${newConscription.lastName}`,
    AssignedCabinet: optimalCabinet.number
  }]);

  expect(optimalCabinet).toBeTruthy();
  expect(newConscription.cabinetsToVisit).toContain(optimalCabinet);
});
