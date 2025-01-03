import {Stack} from "expo-router";

const Layout = () => {
    return (
        <Stack screenOptions={{contentStyle: {backgroundColor: 'white'}}}>
            <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
        </Stack>
    )
}
export default Layout
