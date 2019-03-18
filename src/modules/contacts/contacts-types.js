// @flow

import type { ProfileType } from '@pangea/chat/chat-types';

// For now contacts are just the same as someone's profile, but later it can contain additional fields.
// So we add profile as a field to contact, not just alias Contact to ProfileType.
export type Contact = {
  profile: ProfileType,
};
