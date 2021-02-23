import * as React from 'react';
import { StyleSheet } from "react-native";
import { View, Text } from '../components/Themed';
import RegistroTextInput from '../components/RegistroTextInput';
import GreenButton from '../components/GreenButton';


export default function RegistroForm({route}) {
  const { tipoRegistro } = route.params;
  // valores de tipoRegistro
  // "riego" | "aplicacion" | "cosecha" | "huerta" |
  return (
    <View style={styles.container}>
      <Text>Datos de {tipoRegistro}</Text>
      <View style={styles.row}>
        <View style={styles.input}>
          <Text>FECHA</Text>
          <RegistroTextInput
            onChangeText={() => {}}
            value=''
          />
        </View>
        <View style={styles.input}>
          <Text>SECTOR DE HUERTA</Text>
          <RegistroTextInput
            onChangeText={() => {}}
            value=''
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.input}>
          <Text>VARIEDAD</Text>
          <RegistroTextInput
            onChangeText={() => {}}
            value=''
          />
        </View>
        <View style={styles.input}>
          <Text>SUPERFICIE</Text>
          <RegistroTextInput
            onChangeText={() => {}}
            value=''
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.input}>
          <Text>TIEMPO RIEGO</Text>
          <RegistroTextInput
            onChangeText={() => {}}
            value=''
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.input}>
          <Text>PERSONA RESPONSABLE</Text>
          <RegistroTextInput
            onChangeText={() => {}}
            value=''
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.input}>
          <Text>TRABAJADOR ENCARGADO</Text>
          <RegistroTextInput
            onChangeText={() => {}}
            value=''
          />
        </View>
      </View>
      <GreenButton buttonText="ACEPTAR" onPress={()=>{}} />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    padding: 10
  },
  input: {
    flex: 1,
    height: 90,
    padding: 10
  }
});
