import * as React from 'react';
import {useEffect, useState} from 'react';
import {Button, StyleSheet, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {CardStyleInterpolators, createStackNavigator,} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
    activeNavigationTabColor,
    backgroundColor,
    inactiveNavigationTabColor,
    primaryAppColor,
} from '../styles/variables';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CustomIcon from '../assets/custom_icons/customIcon';

import Overview from '../components/layout/overviewScreen';
import Quiz from '../components/layout/quizScreen';
import Store from '../components/layout/storeScreen';
import Basket from '../components/layout/basketScreen';
import LoginScreen from '../components/screens/loginScreen';
import auth from '@react-native-firebase/auth';
import RegisterScreen from '../components/screens/registerScreen';
import StoreItemDetailPage from '../components/screens/storeItemDetailPage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: backgroundColor,
    flex: 1,
  },
  bottomNavigation: {
    backgroundColor: primaryAppColor,
  },
  tabBar: {
    height: 60,
    minHeight: 60,
  },
  labelStyle: {
    fontSize: 12,
    marginBottom: 8,
    marginTop: -6,
  },
});

function MoreScreen({navigation}) {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function logout() {
    auth()
      .signOut()
      .then(() => {});
  }

  function onAuthStateChanged(newUser) {
    setUser(newUser);
    if (initializing) {
      setInitializing(false);
    }
  }

  useEffect(() => {
    return auth().onAuthStateChanged(onAuthStateChanged); // unsubscribe on unmount
  });

  if (initializing) {
    return <></>;
  }

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {user ? (
        <Button title="Uitloggen" onPress={() => logout()} />
      ) : (
        <LoginScreen navigation={navigation} />
      )}
    </View>
  );
}

const MoreScreenStack = createStackNavigator();

function MoreStackScreen() {
  return (
    <MoreScreenStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <MoreScreenStack.Screen name="More" component={MoreScreen} />
      <MoreScreenStack.Screen name="Login" component={LoginScreen} />
      <MoreScreenStack.Screen name="Register" component={RegisterScreen} />
    </MoreScreenStack.Navigator>
  );
}

const StoreStack = createStackNavigator();

function StoreStackScreen() {
  return (
      <StoreStack.Navigator
          screenOptions={{
              headerShown: false,
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}>
          <StoreStack.Screen name="Store" component={Store}/>
          <StoreStack.Screen
              name="StoreItemDetailPage"
              component={StoreItemDetailPage}
              // handleCart={this.handleCartUpdate}
              initialParams={{cartUpdate: handleCartUpdate}}
          />
          <StoreStack.Screen name="Quiz" component={Quiz}/>
      </StoreStack.Navigator>
  );
}

let cart;

const handleCartUpdate = async () => {
  try {
    let newCart = await AsyncStorage.getItem('cart');

    if (cart !== null) {
      JSON.parse(newCart);
    }

    cart = newCart;
  } catch (error) {
    // Error retrieving data
    console.log('handleCartUpdate Error:', error.message);
  }
};

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: activeNavigationTabColor,
          inactiveTintColor: inactiveNavigationTabColor,
          activeBackgroundColor: primaryAppColor,
          inactiveBackgroundColor: primaryAppColor,
          labelStyle: styles.labelStyle,
          style: styles.tabBar,
        }}>
        <Tab.Screen
          name="Overzicht"
          component={Overview}
          options={{
            tabBarIcon: ({color, size}) => (
              <MaterialIcons name="favorite" size={size} color={color} />
            ),
          }}
        />
          {/*<Tab.Screen*/}
          {/*    name="Quiz"*/}
          {/*    component={Quiz}*/}
          {/*    options={{*/}
          {/*        tabBarIcon: ({color, size}) => (*/}
          {/*            <MaterialIcons name="stars" size={size} color={color} />*/}
          {/*        ),*/}
          {/*    }}*/}
          {/*/>*/}
        <Tab.Screen
          name="Winkel"
          component={StoreStackScreen}
          options={{
            tabBarIcon: ({color, size}) => (
              <CustomIcon name="coffee-beans" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Winkelmand"
          component={Basket}
          initialParams={{cart2: cart}}
          options={{
            tabBarIcon: ({color, size}) => (
              <MaterialIcons name="shopping-cart" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Meer"
          component={MoreStackScreen}
          options={{
            tabBarIcon: ({color, size}) => (
              <MaterialIcons name="more-horiz" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
