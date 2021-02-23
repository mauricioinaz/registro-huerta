import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  StyleSheet,
  ScrollView,
  Platform,
  TouchableOpacity,
  Pressable,
  Modal
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

export default function RegistroForm({route, navigation}) {
  const { tipoRegistro } = route.params;
  const { control, handleSubmit, errors, reset } = useForm<FormData>();
  const onSubmit = (registroData: FormData) => {
    storeData(registroData)
  }

  const storeData = async (registroData: FormData) => {
    try {
      let storedRegistros = await AsyncStorage.getItem('@lista_registros');
      const registrosArray = (storedRegistros !== null) ? JSON.parse(storedRegistros) : []
      registrosArray.push(registroData)
      await AsyncStorage.setItem('@lista_registros', JSON.stringify(registrosArray));
      setModalVisible(true)
    } catch (e) {
      // saving error
    }
  }

  //MODAL
  const [modalVisible, setModalVisible] = React.useState(false);

  // FECHA
  const [date, setDate] = React.useState(new Date());
  const [show, setShow] = React.useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShow(true);
  };

  const onEndRegistration = () => {
    reset()
    navigation.goBack()
  }

  // valores de tipoRegistro
  // "riego" | "aplicacion" | "cosecha" | "huerta" |
  return (
    <ScrollView>
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={onEndRegistration}
    >
      <View style={styles.modalView}>
        <Text style={styles.modalText}>Registro Guardado</Text>
        <Text style={styles.modalText}>Tu actividad se ha guardado correctamente</Text>
        <Pressable
          style={[styles.button, styles.buttonClose]}
          onPress={onEndRegistration}
        >
          <Text style={styles.textStyle}>X</Text>
        </Pressable>
      </View>
    </Modal>
      <View style={styles.container}>
        <Text>Datos de {tipoRegistro}</Text>
        <View style={styles.row}>
          <View style={styles.input}>
            <Text>FECHA</Text>
            <View style={styles.datePicker}>
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
            {errors.huerta && <Text style={styles.error}>Campo requerido</Text>}
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
            {errors.variedad && <Text style={styles.error}>Campo requerido</Text>}
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
            {errors.superficie && <Text style={styles.error}>Campo requerido</Text>}
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
            {errors.tiempRiego && <Text style={styles.error}>Campo requerido</Text>}
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
            {errors.responsable && <Text style={styles.error}>Campo requerido</Text>}
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
            {errors.encargadx && <Text style={styles.error}>Campo requerido</Text>}
          </View>
        </View>
        <GreenButton buttonText="ACEPTAR" onPress={handleSubmit(onSubmit)} />
      </View>
    </ScrollView>
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
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  error: {
    color: '#d21111',
    fontSize: 10
  },
  datePicker: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    height: 40,
    justifyContent: 'center'
  }
});
