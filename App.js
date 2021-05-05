import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeStackNavigator from './navigations/Navigator';
import {StatusBar} from 'react-native';

const App = ()=>{
  return(
    <NavigationContainer>
      <StatusBar barStyle="lite-content" backgroundColor={'#2e4052'} />
      <HomeStackNavigator/>
    </NavigationContainer>
  )
}

export default App;