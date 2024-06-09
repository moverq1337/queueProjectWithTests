const Cabinet = require('../models/Cabinet');

class QueueService {
  static findOptimalCabinet(cabinets) {
    return cabinets.reduce((minCabinet, currentCabinet) => {
      return currentCabinet.getQueueLength() < minCabinet.getQueueLength() ? currentCabinet : minCabinet;
    });
  }

  static predictWaitingTimes(cabinets) {
    return cabinets.map(cabinet => {
      return {
        cabinet: cabinet.number,
        predictedTime: cabinet.getQueueLength() * 10 // предположим, что один прием занимает 10 минут
      };
    });
  }

  static findCabinetWithShortestWaitingTime(cabinets) {
    const waitingTimes = this.predictWaitingTimes(cabinets);
    return waitingTimes.reduce((minCabinet, currentCabinet) => {
      return currentCabinet.predictedTime < minCabinet.predictedTime ? currentCabinet : minCabinet;
    });
  }
}

module.exports = QueueService;
