// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';

import i18n from '../../global/i18n';
import BackgroundImage from '../../components/common/BackgroundImage';
import FakeNavigationBar from '../../components/common/FakeNavigationBar';
import PanelView from '../../components/common/PanelView';
import ScreenTitle from '../../components/common/ScreenTitle';
import Button from '../../components/common/Button';
import styles from './styles';

type Props = {
};

class Accounts extends Component<Props> {

  render() {
    return (
      <View style={styles.profilesScreenContainer}>
        <BackgroundImage />
        <FakeNavigationBar />
        <ScreenTitle title={i18n.t('screens.accounts.title')} />
        <PanelView body={i18n.t('screens.accounts.introduction')} />
        <View>
          <Button
            style={styles.panelButton}
            title={'New Account'}
            onPress={() => {}}
          />
          <Button
            style={styles.panelButton}
            title={'Restore Account'}
            onPress={() => {}}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Accounts);
