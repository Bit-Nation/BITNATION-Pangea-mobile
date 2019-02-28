import {
  resolveNation,
  convertToDatabase,
  convertFromDatabase,
  statusColor,
} from '../../../src/utils/nations';
import { TX_JOB_STATUS } from '../../../src/global/Constants';

test('resolveNation works', () => {
  const expectedNation = {
    id: 3, nationName: 'nation3',
  };
  const nations = [
    { id: 2, info: 'nation2' },
    { id: 1, info: 'nation1' },
    { id: 4, info: 'nation4' },
    expectedNation,
    { id: 6, info: 'nation6' },
    { id: 5, info: 'nation5' },
  ];

  expect(resolveNation(nations, expectedNation.id)).toEqual(expectedNation);
  expect(resolveNation(nations, -1)).toBeNull();
});

test('convert governance service to and from database works', () => {
  const nationInApp = {
    governanceService: ['A', 'B', 'C'],
  };

  const nationDB = convertToDatabase(nationInApp);
  expect(nationDB.governanceService).toEqual('A, B, C');

  const nationConvertedBack = convertFromDatabase(nationDB);
  expect(nationConvertedBack.governanceService).toEqual(nationInApp.governanceService);
});

test('get status color', () => {
  const nationStatusColor = statusColor(TX_JOB_STATUS.SUCCESS);
  expect(nationStatusColor).toEqual('#4CAF50');
});
