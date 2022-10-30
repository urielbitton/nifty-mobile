import React from 'react'
import { View, StyleSheet } from "react-native"

export default function IconContainer(props) {

  const { dimensions=30, backgroundColor, IconComponent,
    iconColor, iconSize, iconName, borderRadius, onPress,
    style } = props

  return (
    <View
      style={[styles.container, style, { width: dimensions, height: dimensions, backgroundColor, borderRadius }]}
    >
      <IconComponent
        onPress={() => onPress && onPress()}
        name={iconName}
        size={iconSize}
        color={iconColor}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  }
})