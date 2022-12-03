import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StackItem} from '../resources/interfaces/stackItem';
import {navigationRef} from '../navigation';
import Home from '../screens/Home';
import Login from '../screens/Login';
import {TabItem} from '../resources/interfaces/tabItem';
import ProductIcon from 'react-native-vector-icons/Entypo';
import LiveChatIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import TokenIcon from 'react-native-vector-icons/FontAwesome5';
import LocateIcon from 'react-native-vector-icons/FontAwesome5';
import {getByScreenSize} from '../utils/responsive';

const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();
const Products = () => <></>;
const LiveChat = () => <></>;
const Token = () => <></>;
const LocateUs = () => <></>;
const tabsScreens: TabItem[] = [
  {
    id: 0,
    name: 'home',
    label: 'Products',
    component: Home,
    icon: (color, size) => (
      <ProductIcon name={'wallet'} color={color} size={size} />
    ),
  },
  {
    id: 1,
    name: 'liveChat',
    label: 'Live Chat',
    component: LiveChat,
    icon: (color, size) => (
      <LiveChatIcon
        name={'chat-processing-outline'}
        color={color}
        size={size}
      />
    ),
  },
  {
    id: 2,
    name: 'token',
    label: 'RAK Token',
    component: Token,
    icon: (color, size) => <TokenIcon name={'key'} color={color} size={size} />,
  },
  {
    id: 3,
    name: 'locateUs',
    label: 'Locate Us',
    component: LocateUs,
    icon: (color, size) => (
      <LocateIcon name={'search-location'} color={color} size={size} />
    ),
  },
];
const HomeTabs = () => {
  return (
    <Tabs.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#dddddd',
        tabBarInactiveTintColor: '#222222',
      }}>
      {tabsScreens.map((screen, idx) => (
        <Tabs.Screen
          key={`tabScreen${idx}`}
          name={screen.name}
          component={screen.component}
          options={{
            headerShown: false,
            tabBarLabel: `${screen.label}`,
            tabBarLabelStyle: {fontSize: getByScreenSize(13, 25)},
            tabBarIcon: ({focused}) =>
              screen.icon(
                focused ? '#dddddd' : '#222222',
                getByScreenSize(20, 25),
              ),
            tabBarStyle: {height: getByScreenSize(50, 80)},
          }}
        />
      ))}
    </Tabs.Navigator>
  );
};
const screens: StackItem[] = [
  {
    id: 0,
    name: 'homeTabs',
    component: HomeTabs,
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
