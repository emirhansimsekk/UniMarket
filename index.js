import "expo-router/entry";
import { useFonts } from "expo-font";

const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
    'Poppins-SemiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-MediumItalic': require('./assets/fonts/Poppins-MediumItalic.ttf'),
    'Poppins-Light': require('./assets/fonts/Poppins-Light.ttf'),
    'Poppins-LightItalic': require('./assets/fonts/Poppins-LightItalic.ttf'),
    'Poppins-ExtraLightItalic': require('./assets/fonts/Poppins-ExtraLightItalic.ttf'),
  });
  if (!fontsLoaded) {
    return null;
  }