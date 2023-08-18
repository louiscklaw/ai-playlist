class Mutex {
  constructor() {
    this.locked = false;
    this.queue = [];
  }

  // Acquire the lock
  async acquire() {
    return new Promise(resolve => {
      if (this.locked) {
        // If locked, add to queue
        this.queue.push(resolve);
      } else {
        // Lock is available, resolve immediately
        this.locked = true;
        resolve();
      }
    });
  }

  // Release the lock
  release() {
    if (this.queue.length > 0) {
      const nextResolve = this.queue.shift();
      nextResolve(); // Resolve the next waiting process in queue
    } else {
      this.locked = false; // No waiting processes, release the lock
    }
  }
}

const mutex = new Mutex();

module.exports = { mutex };
