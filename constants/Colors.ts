const tintColorLight = '#484848';
const tintColorDark = '#fff';
const colorGreen = '#2cb972';


export default {
  light: {
    text: '#000',
    background: '#fff',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
    tabBackground: colorGreen    
  },
  dark: {
    text: tintColorLight,
    background: '#fff',  
    tint: colorGreen,
    tabIconDefault: colorGreen,
    tabIconSelected: tintColorDark,
    tabBackground: colorGreen
  },
};
