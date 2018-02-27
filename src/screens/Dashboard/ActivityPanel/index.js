import React, { Component } from 'react';
import {
  FlatList,
  Text,
  View,
} from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';
import PanelView from '../../../components/common/PanelView';
import i18n from '../../../global/i18n';
import Button from '../../../components/common/Button';

/**
 * @desc Component to render nation panel on dashboard
 * @type React.Component
 */
export default class ActivityPanel extends Component {

  render() {
    const { style } = this.props;

    return (
      <View style={style}>
        <PanelView style={styles.gridPanelView}
                   titleStyle={styles.panelViewTitle}
                   childrenContainerStyle={styles.flex}
                   title={i18n.t('screens.dashboard.activityPanel.title')}>
          <FlatList
            renderItem={(item) => {
              const message = item.item;
              const messageText = message.interpret ? i18n.t(`activityLog.${message.msg}`, JSON.parse(message.params)) : message.msg;
              return (<Text style={styles.listItemText}>{messageText}</Text>);
            }}
            keyExtractor={(item) => item.id}
            data={this.props.messages}
            style={styles.flex}
          />
          {
            this.props.testingMode.isActive &&
            <Button title='Add dummy log' onPress={this.props.onAddDummyMessage}/>
          }

        </PanelView>
      </View>
    );
  }

}

ActivityPanel.propTypes = {
  /**
   * @desc Array of messages objects to display
   */
  messages: PropTypes.array,
  /**
   * @desc State of testing mode. For testing only.
   */
  testingMode: PropTypes.object,
  /**
   * @desc Callback to add dummy message. For testing only.
   */
  onAddDummyMessage: PropTypes.func,
};

ActivityPanel.defaultProps = {
  messages: [],
};
