import React, { Component } from 'react';
import {
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import _ from 'lodash';

/**
 * @desc Component to draw a grid of similar components.
 * @type React.Component
 */
export class GridView extends Component {

  _renderItems(firstIndex, count) {
    return _.map(_.range(0, count), (index) => {
      return this.props.renderItem(firstIndex + index);
    });
  }

  _renderRows(count) {
    return _.map(_.range(0, count), (index) => {
      return (
        <View style={[
          styles.row,
          (index > 0) && styles.rowMargin,
          this.props.disableInactiveRows && this.props.activeRow !== index && styles.rowInactive,
        ]} key={index}>
          {
            this._renderItems(index * this.props.itemsPerRow, this.props.itemsPerRow)
          }
        </View>
      );
    });
  }

  render() {
    const { style, ...props } = this.props;

    return (
      <View style={[styles.container, style]}>
        {this._renderRows(this.props.rowsCount)}
      </View>
    );
  }

}

GridView.propTypes = {
  /**
   * @desc Count of rows in grid view.
   * @type number
   */
  rowsCount: PropTypes.number,
  /**
   * @desc Count of columns in grid view.
   * @type number
   */
  itemsPerRow: PropTypes.number,
  /**
   * @desc Flag that specifies, if only one row (specified by activeRow prop) should be shown as active.
   * @type bool
   */
  disableInactiveRows: PropTypes.bool,
  /**
   * @desc Index of active row.
   * @type number
   */
  activeRow: PropTypes.number,
  /**
   * @desc Function to render item of the grid. Takes one parameter - index of item (number).
   * @type func
   */
  renderItem: PropTypes.func,
};

GridView.defaultProps = {
  rowsCount: 0,
  itemsPerRow: 1,
  disableInactiveRows: false,
};

export default GridView;