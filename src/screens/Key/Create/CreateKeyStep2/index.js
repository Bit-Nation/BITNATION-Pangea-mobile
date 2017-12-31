/*eslint-disable*/
import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StatusBar,
  TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { resetRoute, goBack } from '../../actions/nav';
import Images from '../../global/AssetsImages';
import styles from './styles';
import Colors from '../../global/Colors';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Subtitle } from 'native-base';


class CreateKeyStep2 extends Component {
  componentWillMount() {
  }

  onNext() {
    this.props.resetRoute({routeName:'CreateKey3'});
}


  render() {
    return(

            <View style= {styles.container}> 
                <Image
                    style ={styles.backgroundImage}
                    source ={Images.background}
                
                />

      
                <Header style = {styles.header}>
                    <Left style ={styles.left}>
                       <Text style ={styles.cancel} >Cancel</Text>
                    </Left>
                    <Body>
                    <Title style ={styles.title}>Create Private Key</Title>
                   
                  </Body>
                    <Right style ={styles.right}> 
                    <TouchableOpacity  onPress ={()=> this.onNext()} >
                    <Text style ={styles.next}>Next</Text>
                    </TouchableOpacity>
                    </Right>

                </Header>

                

                <Text style ={styles.title}></Text>

                <View style ={styles.wholeText}>

                <Text style ={styles.description}>We will show you a group of 12 words that is the private key that unlocks your wallet..</Text>
                <Text style ={styles.description}>Write the words on paper, in order, Store the paper in very safe place. If your devices is lost, stolen, broken or upgraded, you must have this key to restore or unblock your wallet.</Text>
               
              </View>

                </View>
        );
    }

}

CreateKeyStep2.propTypes = {
};

CreateKeyStep2.defaultProps = {
};

const mapStateToProps = state => ({
  ...state,
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateKeyStep2);
