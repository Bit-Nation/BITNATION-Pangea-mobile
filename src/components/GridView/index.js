import React, { Component } from 'react';
import {
  View
} from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import _ from 'lodash';

export class GridView extends Component {

  _renderItems(firstIndex, count) {
    return _.map(_.range(0, count), (index) => {
      return this.props.renderItem(firstIndex + index);
    });
  }

  _renderRows(count) {
    return _.map(_.range(0, count), (index) => {
      return (
        <View style={[styles.row, (index > 0) && { marginTop: 14, }]} key={index}>
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

};

GridView.propTypes = {
  rowsCount: PropTypes.number,
  itemsPerRow: PropTypes.number,
  disableInactiveRows: PropTypes.bool,
  renderItem: PropTypes.func,
};

GridView.defaultProps = {
  rowsCount: 0,
  itemsPerRow: 1,
  disableInactiveRows: false,
};

export default GridView;