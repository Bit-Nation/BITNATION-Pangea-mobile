// @flow

import * as React from 'react';
import { View } from 'react-native';
import _ from 'lodash';

import styles from './styles';

type Props = {
  /**
   * @desc Count of rows in grid view.
   */
  rowsCount: number,
  /**
   * @desc Count of columns in grid view.
   */
  itemsPerRow: number,
  /**
   * @desc Flag that specifies, if only one row (specified by activeRow prop)
   * should be shown as active.
   */
  disableInactiveRows: bool,
  /**
   * @desc Index of active row.
   */
  activeRow: number,
  /**
   * @desc Function to render item of the grid. Takes one parameter - index of item (number).
   */
  renderItem: (number) => React.Node,
  /**
   * @desc Style object to be applied on top of default style.
   */
  style: any,
}

/**
 * @desc Component to draw a grid of similar components.
 * @type {React.Component}
 */
class GridView extends React.Component<Props> {
  static defaultProps: Object;

  renderItems(firstIndex: number, count: number) {
    const { renderItem } = this.props;

    return _.map(_.range(0, count), index => renderItem(firstIndex + index));
  }

  renderRows(count: number) {
    const { activeRow, disableInactiveRows, itemsPerRow } = this.props;

    return _.map(_.range(0, count), index => (
      <View
        style={[
          styles.row,
          (index > 0) && styles.rowMargin,
          disableInactiveRows && activeRow !== index && styles.rowInactive,
        ]}
        key={index}
      >
        {
            this.renderItems(index * itemsPerRow, itemsPerRow)
          }
      </View>
    ));
  }

  render() {
    const { style, rowsCount } = this.props;

    return (
      <View style={[styles.container, style]}>
        {this.renderRows(rowsCount)}
      </View>
    );
  }
}

GridView.defaultProps = {
  rowsCount: 0,
  itemsPerRow: 1,
  disableInactiveRows: false,
  activeRow: 0,
};

export default GridView;
