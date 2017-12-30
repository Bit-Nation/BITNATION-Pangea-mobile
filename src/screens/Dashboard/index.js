import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  ListView,
  TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Images from '../../global/AssetsImages';
import styles from './styles';
import WalletCard from '../../components/WalletCard';



class Dashboard extends Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([{
        name: 'Amy Farha',
        avatar_url: Images.rightArrow,
        subtitle: 'Vice President'
      },
      {
        name: 'Chris Jackson',
        avatar_url:  Images.rightArrow,
        subtitle: 'Vice Chairman'
      },
      {
        name: 'Waleed ',
        avatar_url:  Images.rightArrow,
         subtitle: 'Vice Chairman'
      },
      {
        name: 'Saad Maqbool',
        avatar_url: Images.rightArrow,
         subtitle: 'Vice Chairman'
      },
      {
        name: 'Ans' ,
        avatar_url: Images.rightArrow,
        subtitle: 'Vice Chairman'
      }, {
        name: 'Ans' ,
        avatar_url: Images.rightArrow,
        subtitle: 'Vice Chairman'
      }, {
        name: 'Ans' ,
        avatar_url: Images.rightArrow,
        subtitle: 'Vice Chairman'
      }, {
        name: 'Ans' ,
        avatar_url: Images.rightArrow,
        subtitle: 'Vice Chairman'
      },
    
    ]),
    };
  }

  listDemo() {
    return (
      <View style = {styles.cnFlex}>

        <View style = {styles.chatNationTextContainer}>
        <Text style = {styles.nationsText}>Nations  </Text>
        <Text style = {styles.nationsDescription}>25 new Natioons founded</Text>
     
        </View>
        <View style = {styles.listContainer}>  
        <ListView
        style={styles.Ncontainer}
        dataSource={this.state.dataSource}
        renderRow={(data) =>
        <TouchableOpacity style={styles.container2}>
              <Text style={styles.text2}>
                    {data.name} 
                </Text>
                <Image source={ data.avatar_url} style={styles.photo2} />
               
       </TouchableOpacity> }

       renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator}/>
      }
       />
       </View>

       </View>
    );
  }


  onMain() {
}
  render() {
    return(
        
      <View style= {styles.container}>
          <Image  style = {styles.backImage}
          source = {Images.background}
          resizeMode= "contain"
          />
            <View style = {styles.firstContainer}> 

                <View style = {styles.NWCContainer}>
                    <View style = {styles.NationsContainer}>
                      {this.listDemo()}
                    </View>

                    <View style = {styles.WalletContainer}>
                      <WalletCard
                      title = "Wallet"
                      description= "1,120.00 mETH 143 PAT" />

                    </View>

                    <View style = {styles.ChatContainer}>
                    {this.listDemo()}

                  </View>
            </View>


              <View style = {styles.CNContainer}>
              <View style = {styles.contractsContainer}>
              <WalletCard
              title = "Contracts"
              description= "3 Contracts that need your atention " />

              </View>

              <View style = {styles.NewsContainer}>
                <WalletCard
                title = "News"
                description= "Lorem lpsum is simply dummy text of teh printing and typesetting industry." />
              </View>
          </View>
        </View>

          <View style = {styles.secondContainer}>
            <View>
                <Text style = {styles.secondText} >Around the World
                </Text>
           </View>

          <View style = {styles.sImage}>
          <Image
            style = {styles.secondImageContainer}
            source= {Images.world}
            source= "contain"
              />
          </View>
    </View>
  </View>);
      }
        
  }

 Dashboard.propTypes = {
};

Dashboard.defaultProps = {
};

const mapStateToProps = state => ({
  ...state,
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
