import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar, LogBox} from 'react-native';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import store from './src/redux';
import StackNavigator from './src/navigation/StackNavigator';

LogBox.ignoreLogs([
  'RCTBridge required dispatch_sync to load RNGestureHandlerModule. This may lead to deadlocks',
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={store}>
        <NavigationContainer>
          <StatusBar barStyle="dark-content" />
          <StackNavigator />
        </NavigationContainer>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;
