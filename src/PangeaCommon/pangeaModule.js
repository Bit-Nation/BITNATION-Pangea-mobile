// @flow

export class PangeaModule {
    name: string;
    reducers: [];
    sagas: [];

    initialize: () => void;
    cleanup: () => void;

    constructor() {
        this.name = "";
    };
}
