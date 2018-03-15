// @flow
const Realm = require('realm');
const schemata = require('./schemata');

/**
 * @typedef {Object} DBInterface
 * @property {function} query query the realm database.
 * @property {function} write executes an write on the database
 */
export interface DBInterface {

    /**
     * Expect an query callback that will receive an instance of realm.
     * Should return the realm query result
     */
    query(queryAction: (realm: Realm) => Realm.Results) : Promise<Realm.Results>;

    /**
     * Expect an callback that that will receive an instance of realm.
     */
    write(writeAction: (realm: Realm) => any) : Promise<any>;

    close() : Promise<any>;

}

/**
 * @module database/db.js
 * @param {string} path
 * @param {number} schemaVersionAt If specified, force the schema version to be locked at this number. Not intended for use in production.
 * @return {DBInterface}
 */
export default function dbFactory(path: string, schemaVersionAt: number = -1): DBInterface {
    function getRealmOptions(version) {
        if (version < 0) {
            version = 0;
        }

        const s = schemata.Schemas[version];
        return {
            path: path,
            schema: s.schema,
            schemaVersion: s.schemaVersion,
            migration: s.migration,
        };
    };

    let latestVersion = schemaVersionAt >= 0 ? schemaVersionAt : schemata.LatestSchemaVersion;
    if (latestVersion > schemata.LatestSchemaVersion) {
        throw 'schemaVersionAt is out of range. Must be from 0 to ' + schemata.LatestSchemaVersion;
    }

    // Perform migrations linearly, if needed
    let currentSchemaVersion = Realm.schemaVersion(path);
    if (schemaVersionAt >= 0) {
        currentSchemaVersion = schemaVersionAt;
    }

    while (currentSchemaVersion < latestVersion) {
        if (currentSchemaVersion < 0) {
            currentSchemaVersion = 0;
        }
        const realmOptions = getRealmOptions(currentSchemaVersion);
        const tempRealm = new Realm(realmOptions);
        tempRealm.close(); // If we are not in the final iteration of the DB opening, then we need to close the DB.
        currentSchemaVersion++;
    }

    let currentOpts = getRealmOptions(latestVersion);
    const realm = Realm.open(currentOpts);

    const dbImplementation : DBInterface = {

        query: (queryAction: (realm) => any): Promise<*> => new Promise((res, rej) => {
            realm
                .then((r) => res(queryAction(r)))
                .catch(rej);
        }),

        write: (writeAction: (realm: any) => void): Promise<*> => new Promise((res, rej) => {
            'use strict';

            realm
                .then((r) => r.write((_) => res(writeAction(r))))
                .catch(rej);
        }),

        close: (): Promise<*> => new Promise((res, rej) => {
            realm
                .then((r) => res(r.close()))
                .catch(rej);
        }),

    };

    return dbImplementation;
}
