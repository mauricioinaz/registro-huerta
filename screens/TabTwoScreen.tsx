import * as React from 'react';
import { StyleSheet } from 'react-native';

import { View } from '../components/Themed';
import RegistroButton from '../components/RegistroButton';
import GreenButton from '../components/GreenButton';
import huerta from '../assets/images/huerta.png'
import cosecha from '../assets/images/cosecha.png'
import riego from '../assets/images/riego.png'
import aplicaciones from '../assets/images/aplicaciones.png'

export default function TabTwoScreen({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <RegistroButton
          buttonText='Riego'
          onPress={() => navigation.navigate('RegistroForma', {
            tipoRegistro: 'Riego'
          })}
          image={riego}
         />
        <RegistroButton
          buttonText='Aplicaciones'
          onPress={() => navigation.navigate('RegistroForma', {
            tipoRegistro: 'Aplicación'
          })}
          image={aplicaciones}
        />
      </View>
      <View style={styles.buttonContainer}>
        <RegistroButton
          buttonText='Cosecha'
          onPress={() => navigation.navigate('RegistroForma', {
            tipoRegistro: 'Cosecha'
          })}
          image={cosecha}
        />
        <RegistroButton
          buttonText='Actividades de huerta'
          onPress={() => navigation.navigate('RegistroForma', {
            tipoRegistro: 'Huerta'
          })}
          image={huerta}
        />
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
    padding: 20,
  },
  buttonContainer: {
    flex: 2,
    flexDirection: 'row'
  },
  endContainer: {
    flex: 1
  },
});
