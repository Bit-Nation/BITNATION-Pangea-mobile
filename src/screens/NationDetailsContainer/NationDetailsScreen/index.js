import React, { Component } from 'react';
import {
  View,
  Text, ScrollView, Image,
} from 'react-native';
import PropTypes from 'prop-types';

import BackgroundImage from '../../../components/common/BackgroundImage';
import styles from './styles';
import { resolveNation } from '../../../utils/nations';
import NationActionButton from '../../../components/common/NationActionButton';
import AssetsImage from '../../../global/AssetsImages';
import MessageView from '../../../components/common/MessageView';
import DemoImage from '../../../components/common/DemoImage';

class NationDetailsScreen extends Component {

  render() {
    const nation = resolveNation(this.props.nations, this.props.openedNationId);

    if (!nation) {
      return <BackgroundImage/>;
    }

    return (
      <View style={styles.container}>
        <BackgroundImage/>
        <View style={styles.fakeNavigationBar}/>
        <Text style={styles.title}>{nation.name}</Text>
        {this._buildButtonsView()}
        <ScrollView style={styles.scrollView}>
          <MessageView style={[styles.messageView]}>
            <Image source={AssetsImage.Placeholder.map} resizeMode='contain'/>
          </MessageView>
          <MessageView style={[styles.messageView]}>
            <Image source={AssetsImage.Placeholder.achievements} resizeMode='contain'/>
          </MessageView>
          {this._buildAboutView(nation)}
          {this._buildGovernmentalStructureView(nation)}
          {this._buildFactsView(nation)}
        </ScrollView>
      </View>
    );
  }

  _buildButtonsView() {
    return (
      <View style={styles.buttonsView}>
        <NationActionButton iconSource={AssetsImage.Actions.chat} title='Chat'/>
        <NationActionButton iconSource={AssetsImage.Actions.map} title='Map'/>
        <NationActionButton iconSource={AssetsImage.Actions.join} title='Join'/>
        <NationActionButton iconSource={AssetsImage.Actions.leave} title='Leave'/>
      </View>
    );
  }

  _buildAboutView(nation) {
    return (
      <MessageView style={styles.messageView}>
        <Text style={styles.infoTitle}>
          {`About ${nation.name}...`}
        </Text>
        <Text style={styles.infoText}>
          Ethereum Address:
          {nation.ethAddress}
        </Text>
      </MessageView>
    );
  }

  _buildGovernmentalStructureView(nation) {
    return (
      <MessageView style={styles.messageView}>
        <DemoImage/>
        <Text style={styles.infoTitle}>
          Governmental Structure
        </Text>
        <Text style={styles.infoText}>
          {nation.name + ' '}
          uses the Kanun legal code, and laws are enforced with a Reputation System (using the threat of public
          shaming
          and shunning). The government is a Holocracy. The nation is managed as a non-profit entity
        </Text>
      </MessageView>
    );
  }

  _buildFactsView(nation) {
    return (
      <MessageView style={styles.messageView}>
        <DemoImage/>
        <Text style={styles.infoTitle}>
          Fun Facts
        </Text>
        <Text style={styles.infoText}>
          {`${nation.name} is seeking diplomatic recognition from Earth governments as a sovereign entity.

Non-citizens may not use national services.

Citizens of ${nation.name} are allowed to be members of other nations.`}
        </Text>
      </MessageView>
    );
  }

}

export default NationDetailsScreen;
