import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Controller } from "react-hook-form";
import RegistroTextInput from './RegistroTextInput';
import { darkRed } from '../constants/Colors';


type inputType = {
  label: string;
  control: React.ReactNode;
  name: string;
  error: React.ReactNode;
  numberHelpText?: string;
};

export default function Input({ label, control, name, error, numberHelpText} : inputType) {
  let helpText = null
  let keyboard = 'default'
  if (numberHelpText) {
    helpText = <Text style={styles.helpText}>{numberHelpText}</Text>
    keyboard='number-pad'
  }
  return (
    <View style={styles.input}>
      <Text>{label}</Text>
      <View style={styles.inputContainer}>
        <Controller
          control={control}
          render={({ onChange, onBlur, value }) => (
            <RegistroTextInput
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              value={value}
              keyboardType={keyboard}
            />
          )}
          name={name}
          rules={{ required: true }}
          defaultValue=""
        />
        {helpText}
        </View>
      {error && <Text style={styles.error}>Campo requerido</Text>}
    </View>
  );
}


const styles = StyleSheet.create({
  input: {
    flex: 1,
    height: 90,
    padding: 10,
    justifyContent: 'space-between'
  },
  error: {
    color: darkRed,
    fontSize: 10
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  helpText: {
    marginLeft: 8
  },
});
