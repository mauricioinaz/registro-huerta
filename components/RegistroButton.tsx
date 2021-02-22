import * as React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  GestureResponderEvent
} from "react-native";

// import {colorGreen} from '../constants/Colors';

type RegistroButtonProps = {
  buttonText: string,
  onPress: (event: GestureResponderEvent) => void
}

export default function RegistroButton({ buttonText, onPress}: RegistroButtonProps) {

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={onPress}
      >
        <Text>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  },
  countContainer: {
    alignItems: "center",
    padding: 10
  }
});
