import NationActionButton from '../../../../src/components/common/NationActionButton';
import React from 'react';
import renderer from 'react-test-renderer'
import AssetsImage from "../../../../src/global/AssetsImages";

test('NationActionButton renders correctly', () => {
  const tree = renderer.create(<NationActionButton
                                  iconSource={AssetsImage.Actions.chat}
                                  title='Chat' disable={true}/>
                              ).toJSON();
  expect(tree).toMatchSnapshot();
});