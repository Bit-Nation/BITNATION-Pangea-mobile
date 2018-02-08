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

/**
 * @desc Component to render nation panel on dashboard
 * @type React.Component
 */
export default class ActivityPanel extends Component {

  render() {
    const { style } = this.props;

    return (
      <View style={style}>
        <PanelView style={styles.flex}
                   childrenContainerStyle={styles.flex}
                   title={i18n.t('screens.dashboard.activityPanel.title')}>
          <FlatList
            renderItem={(item) => {
              const message = item.item;
              const messageText = message.interpret ? i18n.t(message.msg) : message.msg;
              return (<Text style={styles.body}>{messageText}</Text>);
            }}
            keyExtractor={(item) => item.id}
            data={this.props.messages}
            style={styles.flex}
          />
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
};

ActivityPanel.defaultProps = {
  messages: [],
};
