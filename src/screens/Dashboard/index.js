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
import TextBox from '../../components/TextBox';
import ListModal from '../../components/ListModal';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSourceNations: ds.cloneWithRows([{
        name: 'There are 120 nations in Pangea',
      },{
        name: 'Nation all around the world make their contributions' ,
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
  },{
    name: '8,230.0 mETH' ,
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
  listItemIcon:  Images.rightArrow,
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
     
      <View style = {{ flex:1 }}>

        <View style = {styles.chatTextContainer}>
        <Text style = {styles.chatsText}>Chats</Text>
        
        </View>
        <View style = {styles.listContainer}>  
        <ListView
        dataSource={this.state.dataSourceChats}
        renderRow={(data) =>
        <TouchableOpacity style={styles.containerList}>
          <View style= {styles.listName}>
              <Text style={styles.text}>
                    {data.name}
                </Text>
                </View>
                <View style= {styles.listItemIconContainer}>
                <Image source={ data.listItemIcon} style={styles.listItemIcon} /> 
                </View>
               
       </TouchableOpacity> }
       />
       </View>

       </View>
    );
  }
  
  render() {
    return(
   
      <View style= {styles.container}>
      
          <Image  style = {styles.backImage}
          source = {Images.background}
          resizeMode= "contain"
          />
          
      <ScrollView style = {styles.scrollContainer}>
          
            <View style = {styles.firstContainer}> 

                <View style = {styles.NWContainer}>
                  
                  
                    <ListModal 
                    title="Nations"
                    flexNumber = {2}
                    marginBottom = {3}
                    marginLeft ={2.5}
                    data = {this.state.dataSourceNations} />

                    <ListModal 
                    title="Wallet"
                    flexNumber = {1}
                    marginLeft ={2.5}
                    data = {this.state.dataSourceWallet} />

                   
            </View>


                    <ListModal 
                    title="Activity"
                    flexNumber = {1.5}
                    marginRight ={2.6}
                    marginLeft ={0}
                    marginBottom = {0}
                    data = {this.state.dataSourceActivity} />
            </View>



                <View style = {styles.ChatNationContainer}> 
                  <View style = {styles.chatContainer}>

                    <Image  style = {styles.demo}
                      source = {Images.demo}
                      resizeMode= "contain"
                      />
                    {this.listDemo()}

                  </View>
                  <View style = {styles.contractsContainer}>
                  <Image  style = {styles.demoContracts}
                      source = {Images.demo}
                      resizeMode= "contain"
                      />
                      <ListModal 
                      title="Contracts"
                      flexNumber = {1}
                      marginRight ={0}
                      marginLeft ={0}
                      marginBottom = {0}
                      data = {this.state.dataSourceContracts} />
                  </View>

                </View>

        <View style = {styles.secondContainer}>

     
                    <Image  style = {styles.demoWorld}
                      source = {Images.demo}
                      resizeMode= "contain"
                      />


                <Text style = {styles.secondText} >Around the World
                </Text>

                <View style ={styles.sImage}>
                <Image
                    style = {styles.secondImageContainer}
                    source= {Images.bitLogoBig}
                    resizeMode= "contain"
                      />
                  </View>
      </View>
      </ScrollView>

    
  </View>

  
 
  
);
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