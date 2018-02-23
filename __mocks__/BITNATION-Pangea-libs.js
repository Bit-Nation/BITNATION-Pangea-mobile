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
