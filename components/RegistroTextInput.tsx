import * as React from 'react';
import {
  StyleSheet,
  TextInput
} from "react-native";

// import {colorGreen} from '../constants/Colors';

// type RegistroTextInputProps = {
//   label: string,
//   buttonText: string,
//   onPress: () => void
// }

export default function RegistroTextInput({ ...allProps}) {

  return (
    <TextInput
      style={styles.input}
      {...allProps}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    height: 40
  }
});
