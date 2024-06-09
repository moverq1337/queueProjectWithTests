class Commission {
    static assignCategory(conscription) {
      // Пример простой логики: возраст до 27 лет - годен
      const currentYear = new Date().getFullYear();
      const birthYear = new Date(conscription.birthDate).getFullYear();
      const age = currentYear - birthYear;
  
      if (age <= 27) {
        conscription.status = 'Fit';
      } else {
        conscription.status = 'Unfit';
      }
      return conscription.status;
    }
  }
  
  module.exports = Commission;
  