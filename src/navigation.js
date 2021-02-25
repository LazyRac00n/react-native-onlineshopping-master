import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  StatusBar,
  StyleSheet,
  View,
  Image
} from 'react-native';
import StackViewStyleInterpolator from 'react-navigation-stack/src/views/StackView/StackViewStyleInterpolator';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import{createStackNavigator} from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Home from './main/Home/Home';
import Login from './main/Login/Login'
import Register from './main/Login/Register';
import theme from './common/theme';
import TabBarItem from './common/tabBarItem';
import CategoryScreen from './main/Category/CategoryScreen';
import CartScreen from './main/Cart/CartScreen';
import Profile from './main/Mine/Profile';
import ItemDetail from './main/ItemDetail/ItemDetail';
import OrderScreen from './main/Order/OrderScreen';


class AuthLoadingScreen extends React.Component {
    constructor() {
      super();
      this._bootstrapAsync();
    }
  
    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {
      const userToken = await AsyncStorage.getItem('x-auth');
  
      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      this.props.navigation.navigate(userToken ? 'App' : 'Auth');
    };
  
    // Render any loading content that you like here
    render() {
      return (
        <View style={styles.container}>
          <ActivityIndicator />
          <StatusBar barStyle="default" />
        </View>
      );
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });


const routeOptMap = {
    Home: {
      headerTitle: 'Gundam Store',
      selectedImage: require('./img/homeSelect.png'),
      normalImage: require('./img/home.png'),
      tabBarLabel: 'Home'
    },
    Category: {
      headerTitle: 'Category',
      selectedImage: require('./img/categorySelect.png'),
      normalImage: require('./img/category.png'),
      tabBarLabel: 'Category'
    },
    Cart: {
      headerTitle: 'Cart',
      selectedImage: require('./img/cartSelect.png'),
      normalImage: require('./img/cart.png'),
      tabBarLabel: 'Cart'
    },
    Mine: {
      headerTitle: 'Profile',
      selectedImage: require('./img/mineSelect.png'),
      normalImage: require('./img/mine.png'),
      tabBarLabel: 'Profile'
    },
    ItemDetail: {
      headerTitle: 'itemDetail'
    },
    OrderScreen: {
      headerTitle: 'OrderList'
    },
    CartScreen: {
      headerTitle: 'Cart'
    }
};


const defaultHeaderOpts = {
    headerTitleStyle: {
      flex: 1, 
      textAlign: 'center', 
      fontSize: 15,
      color: theme.fontColor
    },
    headerStyle: {
      height: 38,
      backgroundColor: theme.color
    }
  };
  
  const HeaderBackImage = () => (
    <Image
      style={{ marginLeft: 2, width: 25, height: 25 }}
      source={require('./img/arrow.png')}
    />
  );
  
  const TabNavigator = createBottomTabNavigator(
    {
      Home: Home,
      Category: CategoryScreen,
      Cart: CartScreen,
      Mine: Profile
    },
    {
      defaultNavigationOptions: ({ navigation }) => {
        const { routeName } = navigation.state;
        return {
          tabBarLabel: routeOptMap[routeName].tabBarLabel,
          /* eslint-disable-next-line */
          tabBarIcon: ({ focused, tintColor }) => (
            <TabBarItem
              tintColor={tintColor}
              focused={focused}
              selectedImage={routeOptMap[routeName].selectedImage}
              normalImage={routeOptMap[routeName].normalImage}
            />
          )
        };
      },
      tabBarOptions: {
        activeTintColor: theme.color,
        inactiveTintColor: '#979797',
        labelStyle: {
          fontSize: 13
        }
      }
    }
  );
  

  TabNavigator.navigationOptions = ({ navigation }) => {
    const { routeName } = navigation.state.routes[navigation.state.index];
    return {
      ...defaultHeaderOpts,
      headerTitle: routeOptMap[routeName].headerTitle
    };
  };
  
  const AppNavigator = createStackNavigator(
    {
      Tab: TabNavigator,
      ItemDetail,
      CartScreen,
      OrderScreen,
      Register:Register 
    },
    {
      initialRouteName: 'Tab',
      mode: 'card',
      defaultNavigationOptions: ({ navigation }) => {
        const { routeName } = navigation.state;
        return {
          ...defaultHeaderOpts,
          gesturesEnabled: true,
          headerBackTitle: null,
          headerTitle:
            routeOptMap[routeName] && routeOptMap[routeName].headerTitle,
          headerBackImage: HeaderBackImage
        };
      },
      transitionConfig: () => ({
        screenInterpolator: StackViewStyleInterpolator.forHorizontal
      })
    }
);
  
  

const AppStack = createStackNavigator({ Home: Home,Register:Register });
const AuthStack = createStackNavigator({ SignIn: Login });





const SwitchNavigtor = createSwitchNavigator(
    {
        Auth: AuthStack,
        App: AppNavigator,
        AuLoading: AuthLoadingScreen
    },
    {
        initialRouteName:'AuLoading'
    }
)
const AppContainer = createAppContainer(SwitchNavigtor)

export default AppContainer