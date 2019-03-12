import {
  HIDE_CHAT_SPINNER,
  SHOW_CHAT_SPINNER,
  hideSpinner,
  showSpinner,
} from '../chat-actions';

describe('chat action creators', () => {
  test('showSpinner', () => {
    expect(showSpinner()).toEqual({
      type: SHOW_CHAT_SPINNER,
    });
  });
  test('hideSpinner', () => {
    expect(hideSpinner()).toEqual({
      type: HIDE_CHAT_SPINNER,
    });
  });
});
