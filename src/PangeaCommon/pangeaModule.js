// @flow
import { PangeaCommon } from ".";

export class ModuleHost {
    Modules: Map<string, PangeaModule>;
    
    constructor() {
        this.Modules = new Map();
    };

    cleanup() {
        let toRemove = new Map(this.Modules);
        toRemove.forEach((module, name) => {
            try {
                module.cleanup();
                this.Modules.delete(name);
            }
            catch (err) {
            //    log(err);
            }
        });
    }
}

const Host = new ModuleHost();

export class PangeaModule {
    name: string;
    reducers: [];
    sagas: [];

    initialize: () => void;
    cleanup: () => void;

    constructor(name: string) {
        this.name = name;
        if (Host.Modules.has(name)) {
            throw new Error("A module with name " + name + " already exists.");
        }
    };
}

class ModuleSagas {
    uServices: ModuleServices;
}

class ModuleServices {
    uReducers: ModuleReducers;
}

class ModuleReducers { 
    uActions: ModuleActions;
}

class ModuleActions {
    ActionType: any
}

export const Modules = {
    ModuleHost,
    PangeaModule,
    ModuleSagas,
    ModuleServices,
    ModuleReducers,
    ModuleActions

}