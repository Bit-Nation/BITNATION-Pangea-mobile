/* eslint-disable prefer-destructuring */
// @flow

import * as React from 'react';
import type { ProvidedProps as MessageProvidedProps } from '../../components/nativeDApps/MessageProvider';

export const MessageParamsValidator =
  <Props: MessageProvidedProps, Data>(Component: React.ComponentType<Props & { data: Data }>, validator: (Data) => boolean) => (props: (Props)): React.Node => {
    const params: string = props.context.dAppMessage.params;
    const data: Data = JSON.parse(params);
    if (validator(data) === false) return null;

    return <Component {...props} data={data} />;
  };
