class Doctor {
    constructor(firstName, lastName, specialization) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.specialization = specialization;
      this.cabinet = null; // Будет установлен позже
    }
    
    assignCabinet(cabinet) {
      this.cabinet = cabinet;
    }
  
    callConscription(conscription) {
      return `${conscription.firstName} ${conscription.lastName}, пожалуйста, пройдите в кабинет ${this.cabinet.number}`;
    }
  }
  
  module.exports = Doctor;
  