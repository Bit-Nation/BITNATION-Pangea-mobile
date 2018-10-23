import { components, tap } from '../helpers';

export const actionChoiceAccountInList = async () => {
  await tap(components.account_list_item_first);
};
