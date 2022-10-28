import React from 'react'
import { TouchableNativeFeedback } from "react-native"
import { View, StyleSheet } from "react-native"

export default function IconContainer(props) {

  const { width=40, height=40, backgroundColor, IconComponent,
    iconColor, iconSize, iconName, borderRadius, onPress,
    rippleColor } = props

  return (
    <TouchableNativeFeedback
      background={TouchableNativeFeedback.Ripple(rippleColor, true)}
    >
      <View
        style={[styles.container, {width, height, backgroundColor, borderRadius}]}
      >
        <IconComponent
          onPress={() => onPress && onPress()}
          name={iconName}
          size={iconSize}
          color={iconColor}
        />
      </View>
    </TouchableNativeFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  }
})