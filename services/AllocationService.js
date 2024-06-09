const QueueService = require('./QueueService');

class AllocationService {
  static allocateConscriptionToCabinet(conscription, cabinets) {
    const optimalCabinet = QueueService.findCabinetWithShortestWaitingTime(cabinets);
    const cabinet = cabinets.find(cab => cab.number === optimalCabinet.cabinet);
    cabinet.addToQueue(conscription);
    conscription.addCabinet(cabinet);
    return cabinet;
  }
}

module.exports = AllocationService;
