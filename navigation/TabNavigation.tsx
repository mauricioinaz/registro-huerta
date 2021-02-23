import { Entypo } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { View, Text } from '../components/Themed';

import Colors, { colorGreen } from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import TabTwoScreen from '../screens/TabTwoScreen';
import RegistroForm from '../screens/RegistroForm';
import { TabTwoParamList } from '../types';

const Tab = createMaterialTopTabNavigator();

export default function TabNavigation() {
  const colorScheme = useColorScheme();

  return (
    <Tab.Navigator
      tabBarOptions={{
        showIcon: true,
        labelStyle: { fontSize: 12 },
        tabStyle: { width: 100, height: 120, justifyContent: 'flex-end' },
        indicatorStyle: { backgroundColor: '#017225' },
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
          tabBarIcon: ({ color }) => <TabBarIcon name="phone" color={color} />,
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

function TabOneNavigator() {
  return (
    <View><Entypo size={25} name="home" color='#ddd' /></View>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator
      initialRouteName="TabTwoScreen"
    >
      <TabTwoStack.Screen
        name="TabTwoScreen"
        component={TabTwoScreen}
        options={{
          headerTitle: 'Registrar Actividad',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#e74154',
            height: 70
          },
          headerTintColor: '#fff',
        }}
      />
      <TabTwoStack.Screen
        name="RegistroForma"
        component={RegistroForm}
        options={{
          headerTitle: 'Registro',
          headerStyle: {
            backgroundColor: '#2cb972',
            height: 70
          },
        }}
      />
      <TabTwoStack.Screen
        name="ListadoDeRegistros"
        component={RegistroList}
        options={{
          headerTitle: 'Registro de...',
          headerStyle: {
            backgroundColor: colorGreen,
            height: 70
          },
        }}
      />
    </TabTwoStack.Navigator>
  );
}

function TabThreeNavigator() {
  return (
    <View><Entypo size={25} name="phone" color='#ddd' /></View>
  );
}

function TabFourNavigator() {
  return (
    <View><TabBarIcon name="user" color='#ddd' /></View>
  );
}

function RegistroList() {
  return (
    <View>
      <Text>cosas...</Text>
      <Text>cosas...</Text>
      <Text>cosas...</Text>
      <Text>cosas...</Text>
      <Text>cosas...</Text>
      <Text>cosas...</Text>
    </View>
  );
}
