import {View, Text, TouchableOpacity, Image} from 'react-native'
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {useAuth} from "@clerk/clerk-expo";


const Home = () => {
    const { signOut, } = useAuth()
    const {top} = useSafeAreaInsets()



    return (
        <View style={{padding: top}} >
            <TouchableOpacity onPress={() => signOut()}>
                <Text>Logout</Text>

            </TouchableOpacity>

        </View>
    )
}
export default Home
