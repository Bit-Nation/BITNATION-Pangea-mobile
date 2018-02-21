import WalletCard from '../../../../src/components/WalletCard';
import React from 'react';
import renderer from 'react-test-renderer';
import Images from '../../../../src/global/AssetsImages';
import { shallow } from 'enzyme';
import { TouchableOpacity } from 'react-native';

describe('WalletCard component tests', () => {
  test('Rendering', () => {
    const tree = renderer.create(<WalletCard
      imagePath={Images.ethereumLogo}
      nameHeading='Testing Wallet'
      balance='Testing Balance'
      messageText='Testing Message'
    />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Press on Send/Receive Buttons', () => {
    const onPress = jest.fn();
    const wrapper = shallow(<WalletCard
      imagePath={Images.ethereumLogo}
      onSendPress={() => onPress}
      onReceivePress={() => onPress}
      nameHeading='Testing Press'
      balance='Testing balance'
    />);
    expect(wrapper).toMatchSnapshot();
    const render = wrapper.dive();
    render.find('TouchableOpacity').forEach((child) => {
      child.simulate('press');
      expect(onPress).toHaveBeenCalledTimes(1);
    });
  });
});
