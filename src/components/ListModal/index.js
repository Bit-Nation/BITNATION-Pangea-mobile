import React, { Component } from 'react';
import {Text,Image,View, StyleSheet,ListView, TouchableOpacity} from 'react-native';
import styles from './styles';
import PropTypes from 'prop-types';
import Images from '../../global/assetsImagesResources';



const ListModal = (props) => {

  return (
    <View style = {[styles.container,
                     {flex:props.flexNumber,
                      marginRight:props.marginRight * props.marginRight,
                      marginLeft:props.marginLeft * props.marginLeft,
                      marginBottom:props.marginBottom * props.marginBottom,
                      }]}>
            <View style = {styles.textContainer}>
            <Text style = {styles.textStyle}>{props.title}</Text>
            
            </View>
            <View style = {styles.listContainer}>  
            <ListView
            dataSource={props.data}
            renderRow={(data) =>
              <TouchableOpacity style= {styles.listName}>
                  <Text style={styles.text}>
                        {data.name} 
                    </Text>
                </TouchableOpacity>  }
          />
           </View>
    </View>
  )
}

ListModal.propTypes = {

    title: PropTypes.string,
    flexNumber: PropTypes.number,
    marginRight: PropTypes.number,
    marginLeft: PropTypes.number,
    marginBottom: PropTypes.number,
    data: PropTypes.object,
  };

  ListModal.defaultProps = {
    title:'',
    flexNumber:1,
    marginRight:0,
    marginLeft:0,
    marginBottom:0,
    data: null,
  };

export default ListModal;
