/* eslint-disable */

const sampledbs = require('../sampledb/sampledb');
const schemata = require('./schemata');
import database from './db';
const realm = require('realm');
const _0Schema = require('./schema/v0.js');
const _1Schema = require('./schema/v1.js');
const _2Schema = require('./schema/v2.js');
const execSync = require('child_process').execSync;

const dbPath = () => 'database/'+Math.random();


describe('write', () => {
    'use strict';

    /**
     * A database write should be void and will always result in a void promise
     */
    test('successfully', () => {

        const db = database(dbPath());

        function writeAction(realm) {
            expect(realm).toBeDefined();

            return 'I wrote the profile';
        }

        return expect(db.write(writeAction))
            .resolves
            .toBe('I wrote the profile');
    });

    test('error', () => {

        class CustomError extends Error {}

        const db = database(dbPath());

        function writeAction(realm) {
            expect(realm).toBeDefined();

            throw new CustomError();
        }

        return expect(db.write(writeAction))
            .rejects
            .toEqual(new CustomError);
    });
});

describe('query', () => {
    'use strict';

    test('successfully', () => {

        const db = database(dbPath());

        function searchPets(realm) {
            expect(realm).toBeDefined();

            return [
                'dog',
                'cat',
            ];
        }

        return expect(db.query(searchPets))
            .resolves
            .toEqual(['dog', 'cat']);
    });

    test('error', () => {

        const db = database(dbPath());

        class CustomError extends Error {}

        function searchPets(realm) {
            expect(realm).toBeDefined();


            throw new CustomError();
        }

        return expect(db.query(searchPets))
            .rejects
            .toEqual(new CustomError());
    });
});


describe('migrate', () => {

    //If we can open the same path without a promise rejection that mean's we succeed.
    //Realm will reject the promise if we miss somethig
    test('migrate from 0.3.1 -> 0.3.2', (done) => {

        const dbp = dbPath();

        const _031Factory = () => realm.open({
            path: dbp,
            schema: _0Schema.schemata,
            schemaVersion: 0,
            migration: _0Schema.migration
        });

        const _032Factory = () => realm.open({
            path: dbp,
            schema: _1Schema.schemata,
            schemaVersion: 1,
            migration: _1Schema.migration
        });

        _031Factory()
            .then(db => {

                //Persist test data
                db.write(() => {
                    db.create('Nation', {
                        id: 1,
                        created: false,
                        nationName: 'Bitnation',
                        nationDescription: 'We <3 cryptography',
                        exists: true,
                        virtualNation: false,
                        nationCode: 'Code civil',
                        lawEnforcementMechanism: 'xyz',
                        profit: true,
                        nonCitizenUse: false,
                        diplomaticRecognition: false,
                        decisionMakingProcess: 'dictatorship',
                        governanceService: 'Security',
                        txHash: '0x58f4465fc2f461b4508f73049e087ae32261309c5314f78e0be16a954e892c3f'
                    });
                });

                db.close();
                return _032Factory();
            })
            .then(db => {
                db.close();
                return _032Factory();
            })
            .then(db => {

                const nations = db.objects('Nation');

                expect(nations.length).toBe(1);

                expect(nations[0].id).toBe(1);
                expect(nations[0].nationName).toBe('Bitnation');
                expect(nations[0].created).toBe(false);
                expect(nations[0].nationDescription).toBe('We <3 cryptography');
                expect(nations[0].exists).toBe(true);
                expect(nations[0].nationCode).toBe('Code civil');
                expect(nations[0].lawEnforcementMechanism).toBe('xyz');
                expect(nations[0].profit).toBe(true);
                expect(nations[0].nonCitizenUse).toBe(false);
                expect(nations[0].diplomaticRecognition).toBe(false);
                expect(nations[0].decisionMakingProcess).toBe('dictatorship');

                //And tx job should have beed created for the nation
                expect(nations[0].tx.txHash).toBe('0x58f4465fc2f461b4508f73049e087ae32261309c5314f78e0be16a954e892c3f');
                expect(nations[0].tx.status).toBe(200);
                expect(nations[0].tx.type).toBe('NATION_CREATE');

                done();

            })
            .catch(done.fail)

    });

    //If we can open the same path without a promise rejection that mean's we succeed.
    //Realm will reject the promise if we miss somethig
    test('migrate from 0.3.2 -> 0.3.3', (done) => {

        const dbp = dbPath();

        const _032Factory = () => realm.open({
            path: dbp,
            schema: _1Schema.schemata,
            schemaVersion: 1,
            migration: _1Schema.migration
        });

        const _033Factory = () => realm.open({
            path: dbp,
            schema: _2Schema.schemata,
            schemaVersion: 2,
            migration: _2Schema.migration
        });

        _032Factory()
            .then(db => {

                //Persist test data
                db.write(() => {
                    db.create('Profile', {
                        id: 1,
                        name: "Florian",
                        location: "germany",
                        latitude: "-",
                        longitude: "-",
                        description: "",
                        image: "base64",
                        version: "1.0.0",
                    });
                });

                db.close();
                return _033Factory();
            })
            .then(db => {

                const p = db.objects('Profile')[0];

                expect(p.id).toEqual(1);
                expect(p.name).toEqual("Florian");
                expect(p.location).toEqual("germany");
                expect(p.latitude).toEqual("-");
                expect(p.longitude).toEqual("-");
                expect(p.description).toEqual("");
                expect(p.image).toEqual("base64");
                expect(p.version).toEqual("1.0.0");
                expect(typeof p.uid).toEqual("string");

                done();

            })
            .catch(done.fail)

    });

    test('migrationtest', async () => {

        const path = dbPath();

        //Pass 1
        let db = database(path);
        await db
          .write(r => "foo")
          .then(() => db.close());

        //Pass 2
        db = database(path);
        await db
          .write((r) => "bar")
          .then(res => "");

    });

    test('Max schema version in schemata.js should be consistent with schema file count.', () => {
        let fs = require('fs');

        const expectedCount = schemata.LatestSchemaVersion + 1;

        let schemaFiles = fs.readdirSync("./src/database/schema/").filter(name => name.endsWith('.js'));

        return expect(expectedCount).toEqual(schemaFiles.length);
    });

    test('Schema files must have migration function', () => {
        schemata.Schemas.forEach(schema => expect(typeof schema.migration).toBe('function'));
    });

    test('Schemas exist', () => {
        expect(Array.isArray(schemata.Schemas)).toBe(true);
        expect(schemata.Schemas.length).toEqual(schemata.LatestSchemaVersion + 1);
    });

    test('Schema files must have schemata', () => {
        // Since schema files themselves can't be imported dynamically,
        // We are testing that 'schema' exists within the schemata.Schemas elements
        // rather than testing the files directly
        schemata.Schemas.forEach(schema => {
            expect(Array.isArray(schema.schema)).toBe(true);
            expect(schema.schema.length).toBeGreaterThan(0);
        });
    });

    test('With sampledb', async () => {
        await sampledbs.BuildSampleDBs();
    });
});
