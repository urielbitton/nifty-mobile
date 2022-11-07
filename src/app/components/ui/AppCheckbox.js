import { MaterialIcons } from "@expo/vector-icons"
import React from 'react'
import { StyleSheet, Text, Pressable} from "react-native"

export default function AppCheckbox(props) {

  const { containerStyle, title, textStyle, iconStyle, 
    iconColor="#444", iconSize=23, onPress, checked } = props

  return (
    <Pressable 
      android_ripple={{color: "#ccc", borderless: false}}
      style={[styles.container, containerStyle]}
      onPress={() => onPress()}
    >
      <Text style={[styles.text, textStyle]}>{title}</Text>
      <MaterialIcons
        name={checked ? "radio-button-checked" : "radio-button-unchecked"}
        color={iconColor}
        size={iconSize}
        style={iconStyle}
      />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
    overflow: 'hidden',
  },
  text: {
    fontSize: 16,
    fontWeight: '400',
  }
})