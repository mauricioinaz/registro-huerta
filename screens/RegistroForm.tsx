import * as React from 'react'
import {
  StyleSheet,
  ScrollView,
  Platform,
  TouchableOpacity,
  Modal
} from "react-native";;
import { Entypo } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useForm, Controller } from "react-hook-form";
import DateTimePicker from '@react-native-community/datetimepicker';
import { View, Text } from '../components/Themed';
import RegistroTextInput from '../components/RegistroTextInput';
import GreenButton from '../components/GreenButton';
import {
  darkGreen,
  colorWhite,
  darkRed,
  colorBlack,
  tintColorGr
} from '../constants/Colors';

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
    storeData({
      ...registroData,
      tipo: tipoRegistro,
      fecha: date
    })
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
  // "Riego" | "Aplicacion" | "Cosecha" | "Huerta" |
  return (
    <ScrollView>
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={onEndRegistration}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Entypo size={120} name="save" color={darkGreen} />
          <Text style={styles.modalTextBig}>Registro Guardado</Text>
          <Text style={styles.modalText}>Tu actividad se ha guardado correctamente</Text>
          <View style={styles.modalButtonContainer}>
            <GreenButton
              buttonText="FINALIZAR"
              onPress={onEndRegistration}
            />
          </View>
        </View>
      </View>
    </Modal>
      <View style={styles.container}>
        <Text style={styles.title}>Datos de la actividad</Text>
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
            <View style={styles.inputContainer}>
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
              <Text style={styles.helpText}>ha</Text>
            </View>
            {errors.superficie && <Text style={styles.error}>Campo requerido</Text>}
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.input}>
            <Text>TIEMPO RIEGO</Text>
            <View style={styles.inputContainer}>
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
              <Text style={styles.helpText}>horas</Text>
            </View>
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
  title: {
    fontSize: 24
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    padding: 10
  },
  input: {
    flex: 1,
    height: 90,
    padding: 10,
    justifyContent: 'space-between'
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  helpText: {
    marginLeft: 8
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(1, 1, 1, 0.3)'
  },
  modalView: {
    margin: 20,
    backgroundColor: colorWhite,
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: colorBlack,
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
  textStyle: {
    color: colorWhite,
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 20,
    color: tintColorGr
  },
  modalTextBig: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 28,
    fontWeight: 'bold'
  },
  modalButtonContainer: {
    height: 100
  },
  error: {
    color: darkRed,
    fontSize: 10
  },
  datePicker: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: colorBlack,
    height: 40,
    justifyContent: 'center'
  }
});
