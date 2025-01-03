import {TouchableOpacity, TouchableOpacityProps, Text, ActivityIndicator, StyleSheet} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import React from "react";

interface ButtonProps extends TouchableOpacityProps {
    title: string
    isLoading?: boolean
    icon: keyof typeof Ionicons.glyphMap
}


export function Button({title, icon, isLoading = false, ...rest}: ButtonProps) {
    // @ts-ignore
    return (
        <TouchableOpacity {...rest} style={styles.container}>
            {isLoading ? (<ActivityIndicator color="white"/>) : (
                <>
                    <Ionicons name={icon}  style={styles.icon}  />
                    <Text style={styles.text}>{title}</Text>
                </>
            )}


        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 7,
        backgroundColor: "#000",
        padding: 12,
        borderRadius: 10,

    },
    text: {
    color: "white",
    fontFamily: "Rubik-Regular",
    fontSize: 16,
    },
    icon: {
        color: "white",
        fontSize: 20,
    },
})