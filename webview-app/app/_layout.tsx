import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { SafeAreaView, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useReducer, useRef } from 'react';
import menuReducer from '@/utils/menuReducer';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import WebScreen from './WebScreen';
import TabNavigation from './TabNavigation';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const [menu, menuDispatch] = useReducer(menuReducer, null)
  const webScreenRef = useRef()

  const onPress = (url: string) => {
    webScreenRef.current.injectJavaScript(`window.openURL('${url}')`)
  }

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <SafeAreaView style={Styles.container}>
        <WebScreen
          innerRef={webScreenRef}
          menuDispatch={menuDispatch}
        />
        <TabNavigation
          menu={menu}
          onPress={onPress}
        />
      </SafeAreaView>
    </ThemeProvider>
  )
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
