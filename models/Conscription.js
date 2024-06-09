class Conscription {
    constructor(firstName, lastName, birthDate) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.birthDate = birthDate;
      this.cabinetsToVisit = [];
      this.status = 'Pending';
    }
  
    addCabinet(cabinet) {
      this.cabinetsToVisit.push(cabinet);
    }
  
    completeCabinet(cabinet) {
      this.cabinetsToVisit = this.cabinetsToVisit.filter(cab => cab !== cabinet);
      if (this.cabinetsToVisit.length === 0) {
        this.status = 'Ready for commission';
      }
    }
  
    calculateAge() {
      const birthDate = new Date(this.birthDate);
      const ageDifMs = Date.now() - birthDate.getTime();
      const ageDate = new Date(ageDifMs);
      return Math.abs(ageDate.getUTCFullYear() - 1970);
    }
  
    estimateWaitingTime() {
      return this.cabinetsToVisit.reduce((totalTime, cabinet) => {
        return totalTime + (cabinet.getQueueLength() * 10); // предположим, что один прием занимает 10 минут
      }, 0);
    }
  }
  
  module.exports = Conscription;
  