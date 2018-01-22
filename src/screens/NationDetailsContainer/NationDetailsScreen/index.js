import React, { Component } from 'react';
import {
  View,
  Text, ScrollView, Image, StatusBar,
} from 'react-native'
import PropTypes from 'prop-types';

import BackgroundImage from '../../../components/common/BackgroundImage';
import styles from './styles';
import { resolveNation } from '../../../utils/nations';
import NationActionButton from '../../../components/common/NationActionButton';
import AssetsImage from '../../../global/AssetsImages';
import MessageView from '../../../components/common/MessageView';
import DemoImage from '../../../components/common/DemoImage';
import FakeNavigationBar from '../../../components/common/FakeNavigationBar';


class NationDetailsScreen extends Component {

  render() {
    const nation = resolveNation(this.props.nations, this.props.openedNationId);

    if (!nation) {
      return <BackgroundImage/>;
    }


   return (
      <View style={styles.screenContainer}>
        <BackgroundImage/>
        <FakeNavigationBar navBarHidden='' />
        <View style={styles.titleBarLarge}>
          <Text style={styles.title}>{nation.name}</Text>
        </View>
        {this._buildTabBar()}
        <View style={styles.bodyContainer}>
          <ScrollView style={styles.scrollView}>
{/* Fake Map panel */}
{/*
            <MessageView style={[styles.messageView]}>
              <Image source={AssetsImage.Placeholder.map} resizeMode='contain'/>
            </MessageView>
*/}

{/* Fake Achievements Panel */}
{/*
            <MessageView style={[styles.messageView]}>
              <Image source={AssetsImage.Placeholder.achievements} resizeMode='contain'/>
            </MessageView>
*/}
            {this._buildAboutView(nation)}
            {this._buildGovernmentalStructureView(nation)}
            {this._buildFactsView(nation)}
          </ScrollView>
        </View>
      </View>
    );
  }

  _buildTabBar() {
    return (
      <View style={styles.tabBar}>
        <NationActionButton iconSource={AssetsImage.Actions.chat} title='Chat'/>
        <NationActionButton iconSource={AssetsImage.Actions.map} title='Map'/>
        <NationActionButton iconSource={AssetsImage.Actions.join} title='Join'/>
        <NationActionButton iconSource={AssetsImage.Actions.leave} title='Leave'/>
      </View>
    );
  }

  // Useful Notes:
  // MessageView Props: title = text, messageText = text, style, renderBottom = method, renderAdditionalInfo = method, children = main text of the display
  // DemoImage overlays a message telling user this is a demonstration

  _buildAboutView(nation) {
    return (
      <MessageView style={styles.messageView} title={`About ${nation.nationName}...`} >
        <Text style={styles.panelBody}>
          Ethereum Address:
          {nation.ethAddress}
        </Text>
    </MessageView>
    );
  }


  _buildGovernmentalStructureView(nation) {
    return (
      <MessageView style={styles.messageViewDemo} title='Governmental Structure'>
        <Text style={styles.panelBody}>
          {nation.nationName + ' '}
          uses the Kanun legal code, and laws are enforced with a Reputation System (using the threat of public
          shaming
          and shunning). The government is a Holocracy. The nation is managed as a non-profit entity
        </Text>
	      <DemoImage/>
      </MessageView>
    );
  }

  _buildFactsView(nation) {
    return (
      <MessageView style={styles.messageView} title={'Fun Facts'}>
        <Text style={styles.panelBody}>
          {`${nation.nationName} is seeking diplomatic recognition from Earth governments as a sovereign entity.

Non-citizens may not use national services.

Citizens of ${nation.nationName} are allowed to be members of other nations.`}
        </Text>
	      <DemoImage/>
      </MessageView>
    );
  }

}

export default NationDetailsScreen;
