// @flow

import * as React from 'react';
import { View, Text } from 'react-native';
import { MediaQueryStyleSheet } from 'react-native-responsive';
import _ from 'lodash';

import GlobalStyles from '../../global/Styles';
import Button from './Button';

type Props = {
  /**
   * @desc Title of panel
   */
  title?: string,
  /**
   * @desc Style object of the title
   */
  titleStyle?: any,
  /**
   * @desc Icon of panel
   * @todo Fix icon to be the icon. Currently it's just a text.
   */
  icon?: string,
  /**
   * @desc Body text of panel
   */
  body?: string,
  /**
   * @desc Renders content between panel body and panel button
   */
  renderAdditionalInfo?: () => React.Node,
  /**
   * @desc Callback on panel button click. Button appears only if this one is passed.
   */
  onButtonClick?: () => void,
  /**
   * @desc Title of panel button.
   */
  buttonTitle?: string,
  /**
   * @desc Renders content below panel button.
   */
  renderBottom?: () => React.Node,
  /**
   * @desc Style object to be passed into children container.
   */
  childrenContainerStyle?: any,
  /**
   * @desc Style object to be applied on root view.
   */
  style?: any,
  /**
   * @desc Children to be rendered inside panel view.
   */
  children?: React.Node
}

const styles = MediaQueryStyleSheet.create({
  ...GlobalStyles,
});

/**
 * @desc Component that renders common panel view. It is used to provide list or mosaic layout.
 * @type {React.Component}
 */
export default class PanelView extends React.Component<Props> {
  static defaultProps: Object;

  renderHeader() {
    const { title, icon, titleStyle } = this.props;

    return (
      <View style={styles.panelTitleRowContainer}>
        {
          title &&
          <View style={styles.panelTitleContainer}>
            <Text style={titleStyle}>
              {title}
            </Text>
          </View>
        }
        {
          icon &&
          <View style={styles.panelTitleIcon}>
            <Text style={styles.panelIcon}>
              {icon}
            </Text>
          </View>
        }
      </View>
    );
  }

  render() {
    const {
      style,
      childrenContainerStyle,
      renderBottom,
      renderAdditionalInfo,
      children,
      title,
      icon,
      body,
      buttonTitle,
      onButtonClick,
    } = this.props;

    return (
      <View style={style}>

        {/* TITLE + ICON */}
        {/* Hide this view if no title or icon to avoid line below it. */}
        {
          (!_.isEmpty(title) || !_.isEmpty(icon)) &&
          this.renderHeader()
        }

        {/* CHILDREN (MAIN) DISPLAY AREA */}
        <View style={[styles.panelChildrenContainer, childrenContainerStyle]}>
          {children}
        </View>

        {
          body &&
          <View style={styles.panelBodyContainer}>
            <Text style={styles.body}>
              {body}
            </Text>
          </View>
        }

        <View style={styles.messageAdditionalInfoContainer}>
          {renderAdditionalInfo && renderAdditionalInfo()}
        </View>

        {
          onButtonClick &&
          <Button
            style={styles.panelButton}
            title={buttonTitle}
            onPress={onButtonClick}
          />
        }

        <View style={styles.messageBottomContainer}>
          {renderBottom && renderBottom()}
        </View>

      </View>
    );
  }
}

PanelView.defaultProps = {
  style: styles.panelView,
  titleStyle: styles.panelViewTitle,
};
