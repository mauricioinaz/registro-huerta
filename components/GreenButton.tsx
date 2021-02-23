import * as React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  GestureResponderEvent
} from "react-native";

import { colorGreen } from '../constants/Colors';

type RegistroButtonProps = {
  buttonText: string,
  onPress: (event: GestureResponderEvent) => void
}

export default function GreenButton({ buttonText, onPress}: RegistroButtonProps) {

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={onPress}
      >
        <Text style={styles.textButton}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10,
    width: '100%',
    paddingVertical: 20,
  },
  button: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 0,
    backgroundColor: colorGreen,
    justifyContent: 'center',
    borderRadius: 35,
    // shadowColor: '#ccc',
    // shadowOffset: {width: 5, height: 5}
  },
  textButton: {
    color: '#fff',
    fontSize: 18,
    padding: 0,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});
