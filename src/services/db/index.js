// @flow
const Realm = require('realm');
const schemata = require('./schemata');

/**
 * @module database/db.js
 * @param {string} path
 * @param {number} schemaVersionAt If specified, force the schema version to be locked at this number. Not intended for use in production.
 * @return {Realm}
 */
export function dbFactory(path: string, schemaVersionAt : number = -1): Realm {

    function getRealmOptions(version) {
        if (version < 0){
            version = 0;
        }

        const s = schemata.Schemas[version];
        return {
            path: path,
            schema: s.schema,
            schemaVersion: s.schemaVersion,
            migration: s.migration
        };
    };

    let latestVersion = schemaVersionAt >= 0 ? schemaVersionAt : schemata.LatestSchemaVersion;
    if (latestVersion > schemata.LatestSchemaVersion){
        throw "schemaVersionAt is out of range. Must be from 0 to " + schemata.LatestSchemaVersion;
    }

    //Perform migrations linearly, if needed
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
        tempRealm.close(); //If we are not in the final iteration of the DB opening, then we need to close the DB.
        currentSchemaVersion++;
    }

    let currentOpts = getRealmOptions(latestVersion);

    return Realm.open(currentOpts);

}

export default dbFactory('pangea');
