import { NetInfo } from 'react-native';

export async function checkConnection() {
  const isConnected = await NetInfo.isConnected.fetch();
  if (isConnected === true) {
    return;
  } else {
    throw { transKey: 'noConnection' };
  }
}
