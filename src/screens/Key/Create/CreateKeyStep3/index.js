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


class CreateKeyStep3 extends Component {
  componentWillMount() {
  }

  onNext() {
    //this.props.resetRoute({routeName:'CreateKeyStep3'});
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

                <Text style ={styles.description}>Write each row of words on teh piece of paper. Press "Next" when you have written the row.</Text>
               
              </View>

                </View>
        );
    }

}

CreateKeyStep3.propTypes = {
};

CreateKeyStep3.defaultProps = {
};

const mapStateToProps = state => ({
  ...state,
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateKeyStep3);
