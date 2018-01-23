import { NetInfo } from 'react-native';

export async function waitConnect(timeout) {
  const isConnected = await NetInfo.isConnected.fetch();
  if (isConnected) return;

  let deferred = Promise.defer();
  const _handleChangeConnection = (isConnected) => {
    NetInfo.isConnected.removeEventListener('connectionChange', _handleChangeConnection);
    if (isConnected) {
      deferred.resolve();
    } else {
      deferred.reject();
    }
  };
  setTimeout(() => {
    deferred.reject();
  }, timeout);
  NetInfo.isConnected.addEventListener('connectionChange', _handleChangeConnection);
  return await deferred.promise;
}
