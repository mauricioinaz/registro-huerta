import * as React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  GestureResponderEvent,
  Image,
  ImageSourcePropType
} from "react-native";
// import {colorGreen} from '../constants/Colors';

type RegistroButtonProps = {
  buttonText: string,
  onPress: (event: GestureResponderEvent) => void,
  image: ImageSourcePropType
}

export default function RegistroButton({ buttonText, onPress, image}: RegistroButtonProps) {

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={onPress}
      >
        <Image
          style={styles.logo}
          source={image}
        />
        <Text style={styles.text}>{buttonText}</Text>
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
    backgroundColor: "transparent",
    padding: 10
  },
  countContainer: {
    alignItems: "center",
    padding: 10
  },
  logo: {

  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
    color: '#505050'
  }
});
