import WalletCard from '../../../../../src/components/WalletCard';
import React from 'react';
import renderer from 'react-test-renderer'
import Images from "../../../../../src/global/AssetsImages";

test('WalletCard renders correctly', () => {
  const tree = renderer.create(
    <WalletCard
      imagePath={Images.ethereumLogo}
      nameHeading='Testing Wallet'
      balance='Testing Balance'>
    </WalletCard>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
