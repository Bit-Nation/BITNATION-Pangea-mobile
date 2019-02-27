// @flow
import { Modules } from './pangeamodule';

/*
JS modules and components which are common to both the core app and the modules. 
As a rule of thumb, these should have minimal dependencies and be lightweight.
Otherwise, there is a risk of loss of portability.
*/

export class A {
    constructor(aa: string) {

    }
}
export const PangeaCommon = {
    Modules: Modules,
}
