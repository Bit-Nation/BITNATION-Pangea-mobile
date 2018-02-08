import containerPromise from '../../services/container';

export async function fetchMessages(limit) {
  const container = await containerPromise;
  console.log('FETCH MESSAGES');
  console.log(limit);
  return await container.queue.msgQueue.fetchMessages(limit);
}
