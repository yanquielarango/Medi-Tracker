import {isLoaded, useFonts} from 'expo-font';
import {router, Stack} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import {tokenCache} from "@/utils/cache";
import {ClerkLoaded, ClerkProvider, useAuth} from "@clerk/clerk-expo";
import {Colors} from "@/constants/Colors";
import {ActivityIndicator} from "react-native";




// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

if (!publishableKey) {
    throw new Error('Add EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env')
}

function InitialLayout () {

    const { isLoaded, isSignedIn} = useAuth()

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

    // if (!loaded) {
    //     return null;
    // }

    useEffect(() => {
        if (!isLoaded) return

        if (isSignedIn) {
            router.replace("/(authenticated)/(tabs)/home")
        } else {
            router.replace("/")
        }
    }, [isSignedIn]);

    return isLoaded ? (
        <Stack screenOptions={{contentStyle: {backgroundColor: Colors.background}}}>
            <Stack.Screen name="index" options={{headerShown: false}} />
            <Stack.Screen name="(authenticated)" options={{ headerShown: false }} />
            {/*<Stack.Screen name="+not-found" />*/}
        </Stack>
    ) : (
        <ActivityIndicator style={{ flex: 1, justifyContent: "center", alignItems: "center"}}/>
    )

}

  export default function RootLaout () {
  return (
   <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
       <ClerkLoaded>
           <InitialLayout/>
           <StatusBar style="dark" />
       </ClerkLoaded>

   </ClerkProvider>


  );
}
