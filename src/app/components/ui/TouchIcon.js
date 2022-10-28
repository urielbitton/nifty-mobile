import React from 'react'
import { TouchableNativeFeedback } from "react-native"
import { StyleSheet } from "react-native"
import { View } from "react-native"

export default function TouchIcon(props) {

  const { width=40, height=40, iconComponent, rippleColor,
    onPress } = props
  const rippleOverflow = true

  return (
    <TouchableNativeFeedback
      background={TouchableNativeFeedback.Ripple(rippleColor, rippleOverflow)}
      onPress={(e) => onPress && onPress(e)}
    >
      <View style={[styles.container, width, height]}>
        {iconComponent}
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