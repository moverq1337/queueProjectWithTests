class Cabinet {
    constructor(number) {
      this.number = number;
      this.queue = [];
    }
  
    addToQueue(conscription) {
      this.queue.push(conscription);
    }
  
    removeFromQueue() {
      return this.queue.shift();
    }
  
    getQueueLength() {
      return this.queue.length;
    }
  }
  
  module.exports = Cabinet;
  