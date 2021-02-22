import { Entypo } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { View, Text } from '../components/Themed';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import { BottomTabParamList, TabOneParamList, TabTwoParamList } from '../types';

const Tab = createMaterialTopTabNavigator();

export default function TabNavigation() {
  const colorScheme = useColorScheme();

  return (
    <Tab.Navigator
        tabBarOptions={{
            showIcon: true,
            labelStyle: { fontSize: 12 },
            tabStyle: { width: 100 , height: 120, justifyContent: 'flex-end'},
            indicatorStyle: {backgroundColor: '#017225'},
            style: {
                backgroundColor: Colors[colorScheme].tabBackground
            },
        }}
    >
      <Tab.Screen 
        name="INICIO" 
        component={TabOneNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />
        }}
      />
      <Tab.Screen 
        name="REGISTRAR"
        component={TabTwoNavigator}
        options={{
            tabBarIcon: ({ color }) => <TabBarIcon name="clipboard" color={color} />
          }}        
      />
      <Tab.Screen 
        name="AYUDA"
        component={TabThreeNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="phone" color={color} />
        }}         
      />
      <Tab.Screen 
        name="PERFIL"
        component={TabFourNavigator}
        options={{
            tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />
        }}             
      />
    </Tab.Navigator>
  );
}

function TabBarIcon(props: { name: React.ComponentProps<typeof Entypo>['name']; color: string }) {
  return <Entypo size={25} {...props} />;
}

const TabOneStack = createStackNavigator<TabOneParamList>();

function TabOneNavigator() {
return (
    <TabOneStack.Navigator>
    <TabOneStack.Screen
        name="TabOneScreen"
        component={TabOneScreen}
        options={{ headerTitle: 'Tab One Title' }}
    />
    </TabOneStack.Navigator>
);
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
    <TabTwoStack.Screen
        name="TabTwoScreen"
        component={TabTwoScreen}
        options={{ headerTitle: 'Tab Two Title' }}
    />
    </TabTwoStack.Navigator>
  );
}

function TabThreeNavigator() {
  return (
    <View><TabBarIcon name="home" color='#ddd' /></View>
  );
}

function TabFourNavigator() {
  return (
    <View><Text>PERFIL</Text></View>
  );
}