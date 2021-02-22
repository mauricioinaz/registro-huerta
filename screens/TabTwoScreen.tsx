import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { Text, View } from '../components/Themed';
import RegistroButton from '../components/RegistroButton';

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <RegistroButton buttonText='Riego' onPress={() => {}}/>
        <RegistroButton buttonText='Aplicaciones' onPress={() => {}}/>
      </View>
      <View style={styles.buttonContainer}>
        <RegistroButton buttonText='Cosecha' onPress={() => {}}/>
        <RegistroButton buttonText='Actividades de huerta' onPress={() => {}}/>
      </View>
      <View style={styles.endContainer}><TouchableOpacity><Text>VER ACTIVIDADES ANTERIORES</Text></TouchableOpacity></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flex: 2,
    flexDirection: 'row'
  },
  endContainer: {
    flex: 1
  },
});
