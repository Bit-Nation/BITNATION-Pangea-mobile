import containerPromise from '../../services/container';

import { convertNation } from '../../utils/nations';

export async function createDraft(data) {
  const container = await containerPromise;
  const result = await container.eth.nation.saveDraft(convertNation(data));
  return result.nation;
}

export async function updateDraft(nationId, data) {
  const container = await containerPromise;
  const result = await container.eth.nation.updateDraft(nationId, convertNation(data));
  return result.nation;
}

export async function deleteDraft(nationId) {
  const container = await containerPromise;
  return await container.eth.nation.deleteDraft(nationId);
}

export async function submitDraft(nationId) {
  const container = await containerPromise;
  const result = await container.eth.nation.submitDraft(nationId);
  return result.nation;
}

export async function saveAndSubmit(data) {
  const container = await containerPromise;
  const result = await container.eth.nation.saveAndSubmit(convertNation(data));
  return result.nation;
}