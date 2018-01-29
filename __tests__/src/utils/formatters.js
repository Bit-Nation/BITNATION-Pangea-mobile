import {roundEth} from '../../../src/utils/formatters';

test('roundEth', () => {

    expect(roundEth('0.03452345234')).toBe('0.03452');

});