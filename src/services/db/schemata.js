// @flow

// ////////////////////////////////////////////////////////////////////////// //
// ATTENTION !!! Everytime you update the schema:                             //
//            1. Update the relating interfaces as well.                      //
//            2. Ensure that migrations.js is updated.                        //
//                                                                            //
// As always, if you don't know what you're doing, feel free to ask for help! //
// ////////////////////////////////////////////////////////////////////////// //

// A note on e.g. ProfileType (and all types exported from this file).
// In the project you will often see smth like this:

// (this is an example from the queries)
// findProfiles(realm) : Array<ProfileObject>

// The value returned by realm is NOT directly a instance of an object that implement this interface,
// BUT the signature is exactly the same.

// It's ok to do this, since after the compilation from flow -> js all interfaces
// and types are striped and they are all objects. So this interface is here to
// support the developers.


//This export declaration must contain each type specified in the latest schema
export {
    Profile,
    AccountBalance,
    MessageJob,
    TransactionJob,
    Nation
} from './schema/v2'; //Must be literal hard-coded path, for flow to work

 //This must be bumped each time a new file is added
/** The latest schema version present in this codebase. */
export const LatestSchemaVersion : number = 1;

const schemaModules = [
    require("./schema/v0.js"), //Path must be hard-coded
    require("./schema/v1.js"),
    require("./schema/v2.js")
];

/** An array containing each schema from version 0 up to LatestSchemaVersion. */
export const Schemas = [];

// Each schema file is located sequentially in src/database/schema/v<number>.js
// The file must contain a schemata export, and a migration export.
// For more information, see https://realm.io/docs/javascript/latest/#migrations (See Linear Migrations)
for(let i = 0; i <= LatestSchemaVersion; i++) {
    Schemas[i] = {
        schema: schemaModules[i].schemata,
        schemaVersion: i,
        migration: schemaModules[i].migration
    };
}

export const LatestSchema = Schemas[LatestSchemaVersion];
