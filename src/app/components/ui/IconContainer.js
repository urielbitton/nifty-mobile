import React from 'react'
import { View, StyleSheet, Pressable } from "react-native"

export default function IconContainer(props) {

  const { dimensions=30, backgroundColor="transparent", IconComponent,
    iconColor, iconSize, iconName, borderRadius=30, onPress,
    style, hasRipple=true, borderlessRipple, rippleColor="#ddd" } = props

  return (
    <Pressable
      style={[styles.container, style, { width: dimensions, height: dimensions, backgroundColor, borderRadius }]}
      onPress={() => onPress && onPress()}
      android_ripple={hasRipple ? { color: rippleColor, borderless: borderlessRipple } : {}}
    >
      <IconComponent
        name={iconName}
        size={iconSize}
        color={iconColor}
      />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  }
})