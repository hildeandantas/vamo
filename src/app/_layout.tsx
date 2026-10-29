import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold } from '@expo-google-fonts/inter';
import {
  Montserrat_300Light,
  Montserrat_400Regular,
  Montserrat_500Medium,
} from '@expo-google-fonts/montserrat';
import { useFonts } from 'expo-font';
import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';

import { useTheme } from '@/hooks/use-theme';
import { AppProviders } from '@/providers/app-providers';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { scheme, colors } = useTheme();
  const [loaded, error] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_500Medium,
  });

  useEffect(() => {
    if (loaded || error) SplashScreen.hideAsync();
  }, [loaded, error]);

  if (!loaded && !error) return null;

  const base = scheme === 'dark' ? DarkTheme : DefaultTheme;
  const navigationTheme = {
    ...base,
    colors: {
      ...base.colors,
      primary: colors.primary,
      background: colors.background,
      card: colors.card,
      text: colors.foreground,
      border: colors.border,
      notification: colors.primary,
    },
  };

  return (
    <AppProviders>
      <ThemeProvider value={navigationTheme}>
        <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
        </Stack>
      </ThemeProvider>
    </AppProviders>
  );
}
