import {Image, ScrollView, StyleSheet, View, Text, TouchableOpacity} from "react-native";
import {SafeAreaView, useSafeAreaInsets} from "react-native-safe-area-context";
import {useAuth, useOAuth} from "@clerk/clerk-expo";
import {Colors} from "@/constants/Colors";
import {Button} from "@/components/Button";
import {useEffect, useState} from "react";

import * as WebBrowser from 'expo-web-browser';
import * as Linking from "expo-linking";

WebBrowser.maybeCompleteAuthSession()



const Login = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { isSignedIn } = useAuth()

    const {top} = useSafeAreaInsets()


    useEffect(() => {
         WebBrowser.warmUpAsync()
        return () => {
            void WebBrowser.coolDownAsync()
        }
    }, [])

    const googleOAuth = useOAuth({strategy: "oauth_google"})

    const handleGoogleLogin = async  () => {
        try {
            setIsLoading(true);
            const redirectUrl = Linking.createURL("/(authenticated)/(tabs)/home")
            const oAuthFlow = await googleOAuth.startOAuthFlow({redirectUrl})
            if(oAuthFlow.authSessionResult?.type === "success") {
                if (oAuthFlow.setActive) {
                    await oAuthFlow.setActive({session: oAuthFlow.createdSessionId})
                }
            } else {
                setIsLoading(false);
            }

        } catch (err) {
            console.error(err);
        }
    }


    return (
        <View style={[styles.container, {paddingTop: top}]}>
            <Image source={require("@/assets/images/medi-logo.png")} style={styles.loginImage} />
            <Image source={require("@/assets/images/onboarding.jpeg")} style={styles.bannerImage}/>

            <View>
                <Text style={styles.textTitle}>Welcome to Medication Tracker</Text>
                <Text style={styles.textSubtitle}>
                    Let's Stay on Track, {"\n"}
                    <Text>Stay Healthy!</Text>
                </Text>
                <Text style={styles.textDescription}>Track your meds, take control of your health. Stay consistent, stay confident</Text>
            </View>

            <View style={styles.buttonContainer}>
               <Button title="Login with Google" icon="logo-google"  onPress={handleGoogleLogin}  isLoading={isLoading} />

                <Text style={styles.policy}>
                    By continuing you agree to Medi-Tracker's{' '}
                    <Text>
                        Terms of Service
                    </Text>{' '}
                    and{' '}
                    <Text>Privacy Policy.</Text>
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        gap: 20
    },
    logoContainer: {
        flexDirection: 'column',
        justifyContent: 'center'
    },
    loginImage: {
        marginTop: 20,
        height: 70,
        resizeMode: "contain",
    },
    bannerImage: {
        height: 260,
        resizeMode: "contain",
        alignSelf: "center",
    },
    textTitle: {
        textAlign: "center",
        fontSize: 20,
        fontFamily: "Rubik-Bold",
    },
    textSubtitle: {
        textAlign: "center",
        fontSize: 22,
        fontFamily: "Rubik-Regular",
    },
    textDescription: {
        textAlign: "center",
        fontSize: 15,
        marginTop: 16,
        color: Colors.dark,
        fontFamily: "Rubik-Light",
    },
    buttonContainer: {
        paddingHorizontal: 40
    },

    policy: {
        color: Colors.lightText,
        fontSize: 12,
        fontFamily: "Rubik-Regular",
        textAlign: "center",
        marginTop: 20
    }
})

export default  Login;

