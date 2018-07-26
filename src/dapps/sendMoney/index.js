// @flow

import Modal from './Modal';
import Message from './Message';
import type { DAppType } from '../index';

const dApp: DAppType = {
  name: 'Send money',
  identityPublicKey: '0x@send_money',
  modal: Modal,
  message: Message,
};

export default dApp;
