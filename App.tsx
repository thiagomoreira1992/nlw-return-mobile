import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { Widget } from './src/Widget';

import { useFonts, Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter';
import AppLoading from 'expo-app-loading';
import { theme } from './src/Widget/theme';



export default function App() {
  const [fontLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium
  })

  if (!fontLoaded) {
    return <AppLoading />
  }

  return (
    <View style={{
      flex: 1,
      backgroundColor: theme.colors.background
    }}>
      <StatusBar style="light"
        backgroundColor='transparent'
        translucent />
      <Widget />
    </View>
  );
}


