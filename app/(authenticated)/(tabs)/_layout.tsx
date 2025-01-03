import {Tabs} from "expo-router";
import {Foundation, Ionicons, MaterialCommunityIcons} from "@expo/vector-icons";
import {Colors} from "@/constants/Colors";
import {Avatar} from "@/components/Avatar";
import {useUser} from "@clerk/clerk-expo";



const TabLayout = () => {
    const {user} = useUser()


    return (
        <Tabs screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarActiveTintColor: '#000',
            tabBarStyle: {
                backgroundColor: '#f5f5f5',
                height: 55,
                paddingTop: 5
            }
        }}
        >
            <Tabs.Screen name="home"
               options={{
                tabBarIcon: ({size, color}) => (
                    <Foundation name="home"  size={30} color={color}/>
                )
            }}/>
            <Tabs.Screen name="history"
               options={{
                tabBarIcon: ({size, color}) => (
                    <MaterialCommunityIcons name="history" size={30} color={color} />
                )
            }}/>
            <Tabs.Screen name="profile" options={{
                tabBarIcon: ({color}) => <Avatar selected={color === '#000'} source={{uri: user?.imageUrl}}/>}}/>
        </Tabs>
    )
}

export default TabLayout;