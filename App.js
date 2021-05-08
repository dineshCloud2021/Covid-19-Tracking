import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeStackNavigator from './navigations/Navigator';
import {StatusBar} from 'react-native';

const App = ()=>{
  return(
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor={'#fff'} />
      <HomeStackNavigator/>
    </NavigationContainer>
  )
}

export default App;