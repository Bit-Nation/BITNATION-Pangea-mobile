import { NetInfo } from 'react-native';

export async function waitConnect(timeout) {
  const isConnected = await NetInfo.isConnected.fetch();
  if (isConnected) return;

  return new Promise((res, rej) => {
    const _handleChangeConnection = (isConnected) => {
      NetInfo.isConnected.removeEventListener('connectionChange', _handleChangeConnection);
      if (isConnected) {
        res();
      } else {
        rej({ transKey: 'noConnection' });
      }
    };
    setTimeout(() => {
      rej({ transKey: 'noConnection' });
    }, timeout);
    NetInfo.isConnected.addEventListener('connectionChange', _handleChangeConnection);
  });
}
