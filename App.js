import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './Screens/HomeScreen';
import CallingScreen from './Screens/CallingScreen';
import CallingSettingsScreen from './Screens/CallingSettingsScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
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
