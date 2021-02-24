import * as React from 'react';
import { Entypo } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text } from '../components/Themed';

import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  StatusBar
} from 'react-native';

const itemBackColors = ['#ebf6f1', '#fff']

const Item = ({ tipo, fecha, backColor }) => {
  const date = new Date(fecha)
  return (
    <View style={[styles.item,{ backgroundColor: backColor}]}>
      <Text style={styles.title}>{tipo}</Text>
      <View style={styles.itemButtons}>
        <Text>{date.toLocaleDateString()}</Text>
        <Entypo size={28} name="edit" />
        <Entypo size={28} name="circle-with-cross" />
      </View>
    </View>
  )
};

export default function RegistroList() {
  const [registros, setRegistros] = React.useState([]);
  React.useEffect(
    () => {
      getData()
    }
    ,[])
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@lista_registros')
      if(value !== null) {
        console.log(value)
        console.log(typeof(value))
        setRegistros(JSON.parse(value))
      } else {
        console.log('VACIA')
      }
    } catch(e) {
      console.log(e)
    }
  }

  const renderItem = ({ item, index }) => {
    const backColor = itemBackColors[index % itemBackColors.length]
    return (
      <Item tipo={item.tipo} fecha={item.fecha} backColor={backColor}  />
    )};

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={registros}
        renderItem={renderItem}
        keyExtractor={item => item.huerta}
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
    shadowColor: "#000",
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
    backgroundColor: '#fff',

  }
});
