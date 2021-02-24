import * as React from 'react'
import {
  StyleSheet,
  ScrollView,
  Platform,
  TouchableOpacity,
  Modal
} from "react-native";
import { Entypo } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useForm } from "react-hook-form";
import DateTimePicker from '@react-native-community/datetimepicker';
import { View, Text } from '../components/Themed';
import GreenButton from '../components/GreenButton';
import Input from '../components/Input';
import {
  darkGreen,
  colorWhite,
  colorBlack,
  tintColorGr
} from '../constants/Colors';

type FormData = {
  fecha: Date;
  huerta: string;
  variedad: string;
  superficie: string;
  tiempRiego: string;
  responsable: string;
  encargadx: string;
  tipo: string;
  id: string;
};
type acceptedRegistros = { tipoRegistro: "Riego" | "Aplicacion" | "Cosecha" | "Huerta" ; }
type RegistroFormTypes = {route: React.ReactNode, navigation: React.ReactNode}


export default function RegistroForm({route, navigation} : RegistroFormTypes ) {
  // General Form
  const { tipoRegistro } : acceptedRegistros = route.params;
  const { control, handleSubmit, errors, reset } = useForm<FormData>();

  // Modal
  const [modalVisible, setModalVisible] = React.useState(false);

  // Date
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

  // SUBMITTING FORM
  const onSubmit = (registroData: FormData) => {
    storeData({
      ...registroData,
      tipo: tipoRegistro,
      fecha: date,
      // Fake id generation
      id: '_' + Math.random().toString(36).substr(2, 9)
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
      // error logic
    }
  }

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
          <Input
            label='SECTOR DE HUERTA'
            control={control}
            name="huerta"
            error={errors.huerta}
          />
        </View>
        <View style={styles.row}>
          <Input
            label='VARIEDAD'
            control={control}
            name="variedad"
            error={errors.variedad}
          />
          <Input
            label='SUPERFICIE'
            control={control}
            name="superficie"
            error={errors.superficie}
            numberHelpText="ha"
          />
        </View>
        <View style={styles.row}>
          <Input
            label='TIEMPO RIEGO'
            control={control}
            name="tiempRiego"
            error={errors.tiempRiego}
            numberHelpText="horas"
          />
        </View>
        <View style={styles.row}>
          <Input
            label='PERSONA RESPONSABLE'
            control={control}
            name="responsable"
            error={errors.responsable}
          />
        </View>
        <View style={styles.row}>
          <Input
            label='TRABAJADOR ENCARGADO'
            control={control}
            name="encargadx"
            error={errors.encargadx}
          />
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
  datePicker: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: colorBlack,
    height: 40,
    justifyContent: 'center'
  }
});
