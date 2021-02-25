import React from 'react';
import { View,StyleSheet, ScrollView, RefreshControl, AsyncStorage,navigation } from 'react-native';
import PropTypes from 'prop-types';
import Header from './Header';
import Order from './Order';
import Button from '../../common/Button';
const RefreshCon = (
  <RefreshControl
    refreshing={false}
    tintColor="#000000"
    title="loading"
    colors={['#000000']}
    progressBackgroundColor="#ffffff"
    enabled
  />
);

const Profile = ({ navigation }) => (
  <ScrollView
    style={styles.container}
    refreshControl={RefreshCon}>
    <Header />
    <Order navigation={navigation} style={styles.order} />
    <Button style={{width:100,alignSelf: 'center'}} onPress={this.logout}>Log out</Button>
  </ScrollView>
);

logout=()=>{
  AsyncStorage.removeItem('x-auth').then(()=>{
    //this.props.navigation.navigate('SignIn');
    this.props.navigation.navigate('Register');
  })
}

Profile.propTypes = {
  navigation: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  order: {
    marginTop: 10
  }
});

export default Profile;
