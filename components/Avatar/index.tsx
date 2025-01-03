import {Image, ImageProps, StyleSheet} from "react-native";

export function Avatar({selected, ...rest}: AvatarProps & ImageProps) {
    return (
        <Image style={[styles.image, selected && styles.selected]} {...rest}/>
    )
}

const styles = StyleSheet.create({
    image: {
        width: 30,
        height: 30,
        borderRadius: 25
    },
    selected: {
        borderWidth: 3,
        borderColor: "#000",
    }
})