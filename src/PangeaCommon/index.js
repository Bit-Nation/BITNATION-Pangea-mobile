// @flow
import { PangeaModule } from './pangeaModule';

/*
JS modules and components which are common to both the core app and the modules. 
As a rule of thumb, these should have minimal dependencies and be lightweight.
Otherwise, there is a risk of loss of portability.

*/
var a = new PangeaModule();
a.name = "";

export const PangeaCommon = {
    PangeaModule: PangeaModule
}
