// @flow

import React from 'react';
import {
  FlatList,
  Text,
  View,
} from 'react-native';

import styles from './styles';
import PanelView from 'pangea-common-reactnative/UI/PanelView';
import i18n from 'pangea-common/i18n';
import Button from 'pangea-common-reactnative/UI/Button';
import type { ActivityLogMessage } from 'pangea-common/types/ActivityLogMessage-type';

type Props = {
  /**
   * @desc Array of messages objects to display.
   */
  +messages: Array<ActivityLogMessage>,
  /**
   * @desc Style to be applied to root view.
   */
  style: any,
};

type TestingModeProps = {
  /**
   * @desc State of testing mode. For testing only.
   */
  testingMode: {
    +isActive: bool,
  },
  /**
   * @desc Callback to add dummy message. For testing only.
   */
  onAddDummyMessage: () => void,
}

/**
 * @desc Component to render nation panel on dashboard
 * @return {React.Component} A component.
 */
const ActivityPanel = ({
  style, messages, testingMode, onAddDummyMessage,
}: Props & TestingModeProps) => ((
  <View style={style}>
    <PanelView
      style={styles.gridPanelView}
      titleStyle={styles.panelViewTitle}
      childrenContainerStyle={styles.flex}
      title={i18n.t('screens.dashboard.activityPanel.title')}
    >
      <FlatList
        renderItem={(item: { item: ActivityLogMessage }) => {
          const message = item.item;
          const messageText = message.interpret ? i18n.t(`activityLog.${message.msg}`, JSON.parse(message.params)) : message.msg;
          return (<Text style={styles.listItemText}>{messageText}</Text>);
        }}
        keyExtractor={(item: ActivityLogMessage) => item.id.toString()}
        data={messages}
        style={styles.flex}
      />
      {
        testingMode.isActive === true &&
        <Button title='Add dummy log' onPress={onAddDummyMessage} />
      }

    </PanelView>
  </View>
));

ActivityPanel.defaultProps = {
  messages: [],
};

export default ActivityPanel;
