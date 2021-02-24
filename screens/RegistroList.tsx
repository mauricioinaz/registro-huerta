import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text } from '../components/Themed';

import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  Modal
} from 'react-native';
import {
  lightGreen,
  darkRed,
  colorRed,
  colorWhite,
  colorBlack,
  tintColorGr,
  colorGray
} from '../constants/Colors';

const itemBackColors = [lightGreen, colorWhite]

const Item = ({ tipo, fecha, backColor, deleteItem }) => {
  const date = new Date(fecha)
  return (
    <View style={[styles.item,{ backgroundColor: backColor}]}>
      <Text style={styles.title}>{tipo}</Text>
      <View style={styles.itemButtons}>
        <Text>{date.toLocaleDateString()}</Text>
        <Entypo size={28} name="edit" />
        <TouchableOpacity onPress={deleteItem}><Entypo size={28} name="circle-with-cross" /></TouchableOpacity>
      </View>
    </View>
  )
};

export default function RegistroList() {
  const [registros, setRegistros] = React.useState([]);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [itemToDelete, setitemToDelete] = React.useState(null);

  // Initially load Registros
  React.useEffect(
    () => {
      getData()
    }
    ,[])

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@lista_registros')
      if(value !== null) {
        // console.log(value)
        // console.log(typeof(value))
        setRegistros(JSON.parse(value))
      } else {
        console.log('VACIA')
      }
    } catch(e) {
      console.log(e)
    }
  }

  const updateData = async newData => {
    try {
      const jsonValue = JSON.stringify(newData)
      await AsyncStorage.setItem('@lista_registros', jsonValue)
    } catch(e) {
      console.log(e)
    }
  }

  const deleteItemById = () => {
    if (itemToDelete) {
      const registrosFiltered = registros.filter(item => item.id !== itemToDelete)
      console.log(`itemToDelete ${itemToDelete}`)
      console.log(`registros length ${registros.length}`)
      console.log(`registrosFiltered length ${registrosFiltered.length}`)
      setRegistros(registrosFiltered)
      updateData(registrosFiltered)
    } else {
      console.log('NO HAY ELEMENTO PARA BORRAR')
    }
    // TODO: agregar spinner y esperar a que se borró
    setModalVisible(false)
  }

  const openDeletetingModal = (id : string) => {
    setModalVisible(true)
    setitemToDelete(id)
  }

  const renderItem = ({ item, index }) => {
    const backColor = itemBackColors[index % itemBackColors.length]
    return (
      <Item
        key={item.id}
        tipo={item.tipo}
        fecha={item.fecha}
        backColor={backColor}
        deleteItem={() => openDeletetingModal(item.id)}
      />
    )};

  const cancelModal = () => {
    setModalVisible(false);
    setitemToDelete(null)
  }

  return (
    <SafeAreaView style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={cancelModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Entypo size={80} name="circle-with-cross" color={darkRed} />
            <Text style={styles.modalTextBig}>¿Confirmas que deseas borrar el registro?</Text>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity style={styles.confirmDelete} onPress={deleteItemById}>
                <Text style={styles.deleteText}>Borrar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelDelete} onPress={cancelModal}>
                <Text style={styles.deleteText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <FlatList
        data={registros}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.listContainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  item: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginVertical: 0,
    marginHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 5,
    shadowColor: colorWhite,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  itemButtons: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    width: 165,
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 18,
  },
  listContainer: {
    padding: 15,
    backgroundColor: colorWhite,

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
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 280
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(1, 1, 1, 0.3)'
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
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
  confirmDelete: {
    backgroundColor: colorRed,
    padding: 20,
    width: 120,
    borderRadius: 8
  },
  cancelDelete: {
    backgroundColor: colorGray,
    padding: 20,
    width: 120,
    alignItems: 'center',
    borderRadius: 8
  },
  deleteText: {
    color: '#fff',
    textAlign: 'center'
  }
});
