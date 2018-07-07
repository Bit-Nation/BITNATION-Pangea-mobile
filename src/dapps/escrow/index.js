// @flow

import Modal from './Modal';
import Message from './Message';
import type { DAppType } from '../index';

const dApp: DAppType = {
  name: 'XPAT escrow',
  // @todo
  identityPublicKey: '0x@xpat_escrow',
  modal: Modal,
  message: Message,
};

export default dApp;
