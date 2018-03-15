/* eslint-disable */

import queries from '../../../src/database/queries';

describe('queries', () => {
    'use strict';

    test('findProfiles', () => {
        // Profiles mock data
        const profiles = [
            {
                // Profile one
            },
            {
                // Profile two
            },
        ];

        const realmMock = {
            objects: jest.fn(),
        };

        realmMock
            .objects
            .mockReturnValueOnce(profiles);

        expect(queries.findProfiles(realmMock)).toBe(profiles);

        expect(realmMock.objects).toBeCalledWith('Profile');
    });
});
