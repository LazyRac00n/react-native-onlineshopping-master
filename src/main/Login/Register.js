import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Alert
} from 'react-native';
import axios from 'axios';
import Button from '../../common/Button';
import TextField from '../../common/TextField';


class Register extends Component {
  state = {};

  render() {
    const { email,username, password } = this.state;
    return (
      <View style={styles.container}>
        <TextField
          label='email'
          placeholder='Please enter a email'
          onChange={value => this.setState({ email: value })}
        />
        <TextField
          label='Username'
          placeholder='Please enter a username'
          onChange={value => this.setState({ username: value })}
        />
        <TextField
          label='Password'
          type='password'
          placeholder='Please enter a password'
          onChange={value => this.setState({ password: value })}
        />
        <Button
          isDisabled={!username || !password}
          onPress={this.register}
        >Sign up</Button>
      </View>
    );
  }

  register = () => {
    const { email,username,password } = this.state;
    const self = this;
    axios.post('http://localhost:3000/user/register',{
      email,
      username,
      password
    }).then(response =>{
      if(response.status == 201){
        this.props.navigation.navigate('SignIn');
      }
    })
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

export default Register;