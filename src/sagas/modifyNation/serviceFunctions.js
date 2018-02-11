import containerPromise from '../../services/container';

import { convertFromDatabase, convertToDatabase } from '../../utils/nations';

export async function createDraft(data) {
  const container = await containerPromise;
  const result = await container.eth.nation.saveDraft(convertToDatabase(data));
  return convertFromDatabase(result.nation);
}

export async function updateDraft(nationId, data) {
  const container = await containerPromise;
  const result = await container.eth.nation.updateDraft(nationId, convertToDatabase(data));
  return convertFromDatabase(result.nation);
}

export async function deleteDraft(nationId) {
  const container = await containerPromise;
  return await container.eth.nation.deleteDraft(nationId);
}

export async function submitDraft(nationId) {
  const container = await containerPromise;
  const result = await container.eth.nation.submitDraft(nationId);
  return convertFromDatabase(result.nation);
}

export async function saveAndSubmit(data) {
  const container = await containerPromise;
  const result = await container.eth.nation.saveAndSubmit(convertToDatabase(data));
  return convertFromDatabase(result.nation);
}