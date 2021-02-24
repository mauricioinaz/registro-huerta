import * as React from 'react';
import {
  StyleSheet,
  TextInput
} from "react-native";
import { colorBlack } from '../constants/Colors';

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
    borderBottomColor: colorBlack,
    height: 40
  }
});
