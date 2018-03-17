import React from 'react';
import renderer from 'react-test-renderer';
import { Text } from 'react-native';

import GridView from '../../../../src/components/GridView';

describe('GridView rendering', () => {
  test('Default renders without error', () => {
    renderer.create(<GridView />);
  });

  /**
   * @desc Common function to render grid view with specific size.
   * @param {number} rowCount Count of rows in grid view.
   * @param {number} columnCount Count of columns in grid view.
   * @param {any} props Other props to pass to grid view.
   * @return {React.Component} Created GridView render tree.
   */
  function renderGridViewWithTestItems(rowCount, columnCount, props) {
    const renderItem = index => <Text key={index}>Test item {index}</Text>;
    const tree = renderer.create(<GridView
      rowsCount={rowCount}
      itemsPerRow={columnCount}
      renderItem={renderItem}
      {...props}
    />);
    expect(tree.toJSON()).toMatchSnapshot();

    return tree;
  }

  /**
   * @desc Common function to render grid view with specific size with mocked render item function.
   * @param {number} rowCount Count of rows in grid view.
   * @param {number} columnCount Count of columns in grid view.
   * @return {React.Component} Created GridView render tree.
   */
  function renderMockedGridView(rowCount, columnCount) {
    const mockFunc = jest.fn();
    const tree = renderer.create(<GridView
      rowsCount={rowCount}
      itemsPerRow={columnCount}
      renderItem={mockFunc}
    />);
    const itemCount = rowCount * columnCount;
    expect(tree.toJSON()).toMatchSnapshot();

    expect(mockFunc).toHaveBeenCalledTimes(itemCount);
    for (let i = 0; i < itemCount; i += 1) {
      expect(mockFunc.mock.calls).toContainEqual([i]);
    }

    return tree;
  }

  test('Render with one item', () => {
    renderMockedGridView(1, 1);
  });

  test('Render with one column', () => {
    renderMockedGridView(5, 1);
  });

  test('Render with one row', () => {
    renderMockedGridView(1, 4);
  });

  test('Render with several columns and rows', () => {
    renderMockedGridView(2, 5);
    renderMockedGridView(3, 4);
    renderMockedGridView(5, 7);
  });

  test('Renders with set renderItem', () => {
    renderGridViewWithTestItems(4, 3);
    renderGridViewWithTestItems(2, 6);
    renderGridViewWithTestItems(3, 5);
  });

  test('Renders with set disableInactiveRows', () => {
    renderGridViewWithTestItems(4, 3, { disableInactiveRows: true, activeRow: 1 });
    renderGridViewWithTestItems(3, 2, { disableInactiveRows: true, activeRow: 2 });
  });

  test('Renders with set custom style', () => {
    renderGridViewWithTestItems(4, 3, { style: { height: 100, width: 50 } });
  });
});
