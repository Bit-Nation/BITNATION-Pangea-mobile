import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  ListView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Images from '../../global/AssetsImages';
import styles from './styles';
import ListModal from '../../components/ListModal';
import BackgroundImage from '../../components/common/BackgroundImage';
import DemoImage from '../../components/common/DemoImage';
import FakeNavigationBar from '../../components/common/FakeNavigationBar';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSourceNations: ds.cloneWithRows([{
        name: 'There are 120 nations in Pangea',
      }, {
        name: 'Nation all around the world make their contributions',
      },

      ]),


      dataSourceActivity: ds.cloneWithRows([{
        name: 'Your new nations of "Andora" was created',
      },
        {
          name: 'Your Ethereum wallet was created',
        },

      ]),


      dataSourceWallet: ds.cloneWithRows([{
        name: '1,120.0 mETH',
      }, {
        name: '8,230.0 mETH',
      },

      ]),


      dataSourceChats: ds.cloneWithRows([{
        name: 'John',
        listItemIcon: Images.rightArrow,
      },
        {
          name: 'Wave',
          listItemIcon: Images.rightArrow,
        },
        {
          name: 'Ahsn',
          listItemIcon: Images.rightArrow,
        },
        {
          name: 'Akbar',
          listItemIcon: Images.rightArrow,
        },

      ]),


      dataSourceContracts: ds.cloneWithRows([{
        name: '3 contracts need your attention',

      },
      ]),
    };
  }

  listDemo() {
    return (

      <View style={{ flex: 1 }}>

        <View style={styles.chatTextContainer}>
          <Text style={styles.chatsText}>Chats</Text>

        </View>
        <View style={styles.listContainer}>
          <ListView
            dataSource={this.state.dataSourceChats}
            renderRow={(data) =>
              <TouchableOpacity style={styles.containerList}>
                <View style={styles.listName}>
                  <Text style={styles.text}>
                    {data.name}
                  </Text>
                </View>
                <View style={styles.listItemIconContainer}>
                  <Image source={data.listItemIcon} style={styles.listItemIcon}/>
                </View>

              </TouchableOpacity>}
          />
        </View>

      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <FakeNavigationBar navBarHidden/>
        <BackgroundImage/>

        <ScrollView style={styles.scrollContainer}>

          <View style={styles.firstContainer}>

            <View style={styles.NWContainer}>

              <View style={styles.NationsContainer}>
                <ListModal
                  title="Nations"
                  data={this.state.dataSourceNations}/>
              </View>

              <View style={styles.WalletContainer}>
                <ListModal
                  title="Wallet"
                  data={this.state.dataSourceWallet}/>
              </View>


            </View>

            <View style={styles.ActivityContainer}>
              <ListModal
                title="Activity"
                data={this.state.dataSourceActivity}/>
            </View>
          </View>


          <View style={styles.ChatNationContainer}>
            <View style={styles.chatContainer}>
              <DemoImage/>

              {this.listDemo()}

            </View>
            <View style={styles.contractsContainer}>
              <DemoImage/>
              <ListModal
                title="Contracts"
                flexNumber={1}
                marginRight={0}
                marginLeft={0}
                marginBottom={0}
                data={this.state.dataSourceContracts}/>
            </View>

          </View>

          <View style={styles.secondContainer}>
            <DemoImage/>

            <Text style={styles.secondText}>Around the World
            </Text>

            <View style={styles.sImage}>
              <Image
                style={styles.secondImageContainer}
                source={Images.bitLogoBig}
                resizeMode="contain"
              />
            </View>
          </View>
        </ScrollView>


      </View>


    );
  }

}

Dashboard.propTypes = {};

Dashboard.defaultProps = {};

const mapStateToProps = state => ({
  ...state,
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);