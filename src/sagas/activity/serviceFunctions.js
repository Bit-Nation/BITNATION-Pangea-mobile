import { Msg } from 'BITNATION-Pangea-libs/src/queues/messaging';
import { MESSAGING_QUEUE_JOB_ADDED } from 'BITNATION-Pangea-libs/src/events';

import containerPromise from '../../services/container';

export { MESSAGING_QUEUE_JOB_ADDED };

export async function fetchMessages(limit) {
  const container = await containerPromise;
  return await container.queue.msgQueue.fetchMessages(limit);
}

export async function getEventEmitter() {
  const container = await containerPromise;
  return container.eventEmitter;
}

export async function addDummyMessage() {
  const container = await containerPromise;
  const messageText = 'Dummy message ' + Math.floor(Math.random() * 100) + '(random number)';
  return await container.queue.msgQueue.addJob(new Msg(messageText, {}, false));
}
