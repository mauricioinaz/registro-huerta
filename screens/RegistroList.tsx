import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text } from '../components/Themed';

import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  StatusBar
} from 'react-native';


const Item = ({ tipo, fecha }) => {
  const date = new Date(fecha)
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{tipo} - {date.toLocaleDateString()}</Text>
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
  const renderItem = ({ item }) => {
    console.log('...');
    console.log(item);
    return (
      <Item tipo={item.tipo} fecha={item.fecha}  />
    )};

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={registros}
        renderItem={renderItem}
        keyExtractor={item => item.huerta}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: 'rgb(226, 227, 160)',
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 2,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 14,
  },
});
