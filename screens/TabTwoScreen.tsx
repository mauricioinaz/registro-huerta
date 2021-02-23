import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { Text, View } from '../components/Themed';
import RegistroButton from '../components/RegistroButton';
import GreenButton from '../components/GreenButton';

export default function TabTwoScreen({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <RegistroButton buttonText='Riego' onPress={() => navigation.navigate('RegistroForma', {
          tipoRegistro: 'riego'
        })} />
        <RegistroButton buttonText='Aplicaciones' onPress={() => navigation.navigate('RegistroForma', {
          tipoRegistro: 'aplicacion'
        })} />
      </View>
      <View style={styles.buttonContainer}>
        <RegistroButton buttonText='Cosecha' onPress={() => navigation.navigate('RegistroForma', {
          tipoRegistro: 'cosecha'
        })} />
        <RegistroButton buttonText='Actividades de huerta' onPress={() => navigation.navigate('RegistroForma', {
          tipoRegistro: 'huerta'
        })} />
      </View>
      <View style={styles.endContainer}>
        <GreenButton
          buttonText="VER ACTIVIDADES ANTERIORES"
          onPress={() => navigation.navigate('ListadoDeRegistros')}
        />
      </View>
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
