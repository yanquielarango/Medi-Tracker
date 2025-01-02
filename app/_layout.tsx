import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import {tokenCache} from "@/utils/cache";
import {ClerkLoaded, ClerkProvider} from "@clerk/clerk-expo";
import {Colors} from "@/constants/Colors";




// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

    if (!publishableKey) {
        throw new Error('Add EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env')
    }

  const [loaded] = useFonts({
      "Rubik-Bold": require("../assets/fonts/Rubik-Bold.ttf"),
      "Rubik-ExtraBold": require("../assets/fonts/Rubik-ExtraBold.ttf"),
      "Rubik-Light": require("../assets/fonts/Rubik-Light.ttf"),
      "Rubik-Medium": require("../assets/fonts/Rubik-Medium.ttf"),
      "Rubik-Regular": require("../assets/fonts/Rubik-Regular.ttf"),
      "Rubik-SemiBold": require("../assets/fonts/Rubik-SemiBold.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
   <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
       <ClerkLoaded>
           <Stack screenOptions={{contentStyle: {backgroundColor: Colors.background}}}>
               <Stack.Screen name="index" options={{headerShown: false}} />
               {/*<Stack.Screen name="(auth)" options={{ headerShown: false }} />*/}
               <Stack.Screen name="+not-found" />
           </Stack>
           <StatusBar style="dark" />
       </ClerkLoaded>

   </ClerkProvider>


  );
}
