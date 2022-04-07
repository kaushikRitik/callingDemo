import React, {useLayoutEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './Screens/HomeScreen';
import CallingScreen from './Screens/CallingScreen';
import CallingSettingsScreen from './Screens/CallingSettingsScreen';
import {CometChat} from '@cometchat-pro/react-native-chat';
import {View} from 'react-native';

const Stack = createNativeStackNavigator();

const App = () => {
  const [initialRouteName, setInitialRouteName] = useState('');
  useLayoutEffect(() => {
    CometChat.getLoggedinUser().then(
      user => {
        if (!user) {
          setInitialRouteName('HomeScreen');
          console.log('Not Logged In');
        } else {
          setInitialRouteName('CallSettings');
          console.log('Logged In');
        }
      },
      error => {
        setInitialRouteName('HomeScreen');
        console.log('Something went wrong', error);
      },
    );
  }, []);

  return initialRouteName === '' ? (
    <View />
  ) : (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{header: () => null}}
        />
        <Stack.Screen
          name="CallSettings"
          component={CallingSettingsScreen}
          options={{header: () => null}}
        />
        <Stack.Screen
          name="CallingScreen"
          component={CallingScreen}
          options={{header: () => null}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
