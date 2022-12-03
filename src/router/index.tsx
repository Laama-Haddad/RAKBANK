import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {StackItem} from '../resources/interfaces/stackItem';
import {navigationRef} from '../navigation';
import Home from '../screens/Home';
import Login from '../screens/Login';

const Stack = createStackNavigator();

const screens: StackItem[] = [
  {
    id: 0,
    name: 'home',
    component: Home,
  },
];
const modalScreens: StackItem[] = [
  {
    id: 0,
    name: 'login',
    component: Login,
  },
];

const AppNavigator = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{gestureEnabled: true}}>
        <Stack.Group>
          {screens.map((screen, idx) => (
            <Stack.Screen
              key={idx}
              options={{
                headerShown: false,
              }}
              name={screen.name}
              component={screen.component}
            />
          ))}
          {modalScreens.map((screen, idx) => (
            <Stack.Screen
              key={idx}
              options={{
                headerShown: false,
              }}
              name={screen.name}
              component={screen.component}
            />
          ))}
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
