// @flow

import { type NationInputType } from 'BITNATION-Pangea-libs/src/ethereum/nation';
import { type NationType } from 'BITNATION-Pangea-libs/src/database/schemata';

export type { NationInputType } from 'BITNATION-Pangea-libs/src/ethereum/nation';
export type { NationType } from 'BITNATION-Pangea-libs/src/database/schemata';

export type EditingNationType = NationInputType | NationType;
