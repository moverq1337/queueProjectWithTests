const Commission = require('../models/Commission');

class CommissionService {
  static processConscription(conscription) {
    return Commission.assignCategory(conscription);
  }
}

module.exports = CommissionService;
