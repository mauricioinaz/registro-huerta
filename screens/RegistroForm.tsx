import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  StyleSheet,
  ScrollView,
  Platform,
  TouchableOpacity
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import DateTimePicker from '@react-native-community/datetimepicker';
import { View, Text } from '../components/Themed';
import RegistroTextInput from '../components/RegistroTextInput';
import GreenButton from '../components/GreenButton';

type FormData = {
  fecha: string;  // TODO: actualizar a fecha
  huerta: string;
  variedad: string;
  superficie: string;
  tiempRiego: string;
  responsable: string;
  encargadx: string;
};

export default function RegistroForm({route}) {
  const { tipoRegistro } = route.params;
  const { control, handleSubmit, errors } = useForm<FormData>();
  const onSubmit = (registroData: FormData) => {
    storeData(registroData)
  }

  const storeData = async (registroData: FormData) => {
    try {
      let storedRegistros = await AsyncStorage.getItem('@lista_registros');
      const registrosArray = (storedRegistros !== null) ? JSON.parse(storedRegistros) : []
      registrosArray.push(registroData)
      await AsyncStorage.setItem('@lista_registros', JSON.stringify(registrosArray));
    } catch (e) {
      // saving error
    }
  }


  // TEMPORAl
  const [date, setDate] = React.useState(new Date());
  const [show, setShow] = React.useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    console.log(currentDate)
  };

  const showDatepicker = () => {
    setShow(true);
  };

  // valores de tipoRegistro
  // "riego" | "aplicacion" | "cosecha" | "huerta" |
  return (
    <ScrollView>
    <View style={styles.container}>
      <Text>Datos de {tipoRegistro}</Text>
      <View style={styles.row}>
        <View style={styles.input}>
          <Text>FECHA</Text>
          <View>
            <TouchableOpacity
              onPress={showDatepicker}
            >
              <Text>{date.toLocaleDateString()}</Text>
            </TouchableOpacity>
          </View>
          {show && (
             <DateTimePicker
               testID="dateTimePicker"
               value={date}
               mode='date'
               is24Hour={true}
               display="default"
               onChange={onChange}
             />
           )}
        </View>
        <View style={styles.input}>
          <Text>SECTOR DE HUERTA</Text>
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <RegistroTextInput
                onBlur={onBlur}
                onChangeText={value => onChange(value)}
                value={value}
              />
            )}
            name="huerta"
            rules={{ required: true }}
            defaultValue=""
          />
          {errors.huerta && <Text>Campo requerido</Text>}
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.input}>
          <Text>VARIEDAD</Text>
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <RegistroTextInput
                onBlur={onBlur}
                onChangeText={value => onChange(value)}
                value={value}
              />
            )}
            name="variedad"
            rules={{ required: true }}
            defaultValue=""
          />
          {errors.variedad && <Text>Campo requerido</Text>}
        </View>
        <View style={styles.input}>
          <Text>SUPERFICIE</Text>
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <RegistroTextInput
                onBlur={onBlur}
                onChangeText={value => onChange(value)}
                value={value}
                keyboardType='number-pad'
              />
            )}
            name="superficie"
            rules={{ required: true }}
            defaultValue=""
          />
          {errors.superficie && <Text>Campo requerido</Text>}
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.input}>
          <Text>TIEMPO RIEGO</Text>
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <RegistroTextInput
                onBlur={onBlur}
                onChangeText={value => onChange(value)}
                value={value}
                keyboardType='number-pad'
              />
            )}
            name="tiempRiego"
            rules={{ required: true }}
            defaultValue=""
          />
          {errors.tiempRiego && <Text>Campo requerido</Text>}
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.input}>
          <Text>PERSONA RESPONSABLE</Text>
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <RegistroTextInput
                onBlur={onBlur}
                onChangeText={value => onChange(value)}
                value={value}
              />
            )}
            name="responsable"
            rules={{ required: true }}
            defaultValue=""
          />
          {errors.responsable && <Text>Campo requerido</Text>}
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.input}>
          <Text>TRABAJADOR ENCARGADO</Text>
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <RegistroTextInput
                onBlur={onBlur}
                onChangeText={value => onChange(value)}
                value={value}
              />
            )}
            name="encargadx"
            rules={{ required: true }}
            defaultValue=""
          />
          {errors.encargadx && <Text>Campo requerido</Text>}
        </View>
      </View>
      <GreenButton buttonText="ACEPTAR" onPress={handleSubmit(onSubmit)} />
    </View></ScrollView>
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
