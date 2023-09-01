class AsyncOperationManager {
  simulateAsyncOperation(delay) {
    if (typeof delay !== 'number' || delay < 0) {
      throw new Error('Bad Argument');
    }
    setTimeout(() => {
      console.log(`Async Operation Completed after ${delay} ms`);

      process.nextTick(() => {
        console.log('Next Tick after setTimeout'); // between each phase of the event loop, in this case after timers phase
      });
    }, delay);
  }

  scheduleImmediate() {
    setImmediate(() => {
      console.log('Immediate task executed');

      process.nextTick(() => {
        console.log('Next Tick after setImmediate'); // between each phase of the event loop, in this case after check phase
      });
    });
  }
}

const manager = new AsyncOperationManager();
/**
 * 3 - it executes after next-tick when delay is 0, or after immediate when delay > 0.
 *  Because it's first phase of event loop - timers
 */
manager.simulateAsyncOperation(200);
/**
 *  1 - we instruct the engine to invoke this function at the end of the current operation, before the next event loop tick starts.
 *  Because it processed at the starting of the event loop and between each phase of the event loop.
 */
process.nextTick(() => {
  console.log('Microtask executed immediately');
});
/**
 *  2 - it executes after nextTick and after setTimeout when timeout = 0. Because it's fifth phase of event loop - check
 */
manager.scheduleImmediate();
