import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import StackScreens from '../screens/Stack';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={StackScreens.Home} />
      <Stack.Screen name="Details" component={StackScreens.Details} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
