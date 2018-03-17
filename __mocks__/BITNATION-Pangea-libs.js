/* eslint-disable */
jest.mock("XMLHttpRequest");
/**
 * @return {Promise<{eth: {nation: {create, index, all, joinNation, leaveNation}}}>} Pangea lib's mock
 */
export default function () {
  return Promise.resolve({
    eth: {
      nation: {
        create: jest.fn(),
        index: jest.fn(),
        all: jest.fn(),
        joinNation: jest.fn(),
        leaveNation: jest.fn(),
      },
    },
  });
}
