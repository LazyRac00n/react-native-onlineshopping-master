import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet,AsyncStorage } from 'react-native';
import theme from '../../common/theme';
import axios from 'axios';
import Button from '../../common/Button';
export default class Header extends Component{
  state = {data:''};
 
  componentDidMount=()=>{
    this.getData();
  };
  getData=async()=>{
      const userToken =  await AsyncStorage.getItem('x-auth');
      axios.post('http://localhost:3000/getUsername/getUsername',{token: userToken}).then(response=>{
        this.setState({
          data: response.data
          
        })
        
      })
  };
  render(){
    const {data} = this.state;
    return(
      <View style={styles.container}>
      <TouchableOpacity style={{ alignSelf: 'center' }}>
      <Image source={require('../../img/19.jpg')} style={styles.img} />
    </TouchableOpacity>
    <Text style={styles.text}>{this.state.data}</Text>
    </View>
   
    );
  }



}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 80,
    backgroundColor: theme.color
  },
  img: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginLeft: 15,
    marginRight: 8
  },
  text: {
    fontSize: 15,
    alignSelf: 'center',
    color: '#000000'
  }
});

