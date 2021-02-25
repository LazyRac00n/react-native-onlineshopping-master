import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Alert,
  AsyncStorage
} from 'react-native';
import axios from 'axios';
import Button from '../../common/Button';
import TextButton from '../../common/TextButton';
import TextField from '../../common/TextField';


class Login extends Component {
    state = {};
  
    render() {
      const { navigation } = this.props;
      const { username, password } = this.state;
      return (
        <View style={styles.container}>
          <TextField
            label='Username'
            placeholder='username'
            onChange={value => this.setState({ username: value })}
          />
          <TextField
            label='Password'
            type='password'
            placeholder='Enter your password'
            onChange={value => this.setState({ password: value })}
          />
          <Button
            isDisabled={!username || !password}
            onPress={this.login}
          >Sign in</Button>
          <View style={styles.textBtnContainer}>
            <TextButton
              onPress={() => navigation.navigate('Register')}
            >Sign up</TextButton>
            <TextButton>Forget password？</TextButton>
          </View>
        </View>
      );
    }
  
    login = () => {
      const { username, password } = this.state;
      const self = this;
      if(username && password){
        axios.post('http://localhost:3000/user/login',{
          username,
          password
        }).then(response => {
          
          try{
            const token = response.headers['x-auth'];
            if(token){
                  AsyncStorage.setItem('x-auth',token).then(()=>{
                      this.props.navigation.navigate('Home');
              }).catch(()=>{
                alert('err');
              })
            }
          }catch(err){
             alert('error');
          }
          
        }).catch(()=>{
            alert('Wrong username or password');
        });
      }else{
        alert('username and password field are both required');
      }
    };
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 16,
      backgroundColor: '#fff'
    },
    textBtnContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between'
    }
  });
  
  export default Login;