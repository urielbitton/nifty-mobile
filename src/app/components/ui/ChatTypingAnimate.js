import React from 'react'
import { useRef } from "react"
import { useEffect } from "react"
import { Animated, StyleSheet, View } from "react-native"

export default function ChatTypingAnimate({style}) {

  const fadeAnim1 = useRef(new Animated.Value(0)).current
  const fadeAnim2 = useRef(new Animated.Value(0)).current
  const fadeAnim3 = useRef(new Animated.Value(0)).current
  const duration = 200

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim1, {
          toValue: 1,
          duration: duration,
          delay: 0,
          useNativeDriver: true
        }),
        Animated.timing(fadeAnim2, {
          toValue: 1,
          duration: duration,
          delay: 1,
          useNativeDriver: true
        }),
        Animated.timing(fadeAnim3, {
          toValue: 1,
          duration: duration,
          delay: 2,
          useNativeDriver: true
        }),
        Animated.timing(fadeAnim1, {
          toValue: 0,
          duration: duration,
          delay: 0,
          useNativeDriver: true
        }),
        Animated.timing(fadeAnim2, {
          toValue: 0,
          duration: duration,
          delay: 0,
          useNativeDriver: true
        }),
        Animated.timing(fadeAnim3, {
          toValue: 0,
          duration: duration,
          delay: 0,
          useNativeDriver: true
        })
      ])
    ).start()
  },[])

  return (
    <View
      style={style}
    >
      <Animated.View 
        style={[styles.dot, {opacity: fadeAnim1}]}
      />
      <Animated.View
        style={[styles.dot, {opacity: fadeAnim2}]}
      />
      <Animated.View
        style={[styles.dot, {opacity: fadeAnim3}]}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  dot: {
    width: 6,
    height: 6,
    borderRadius: 10,
    backgroundColor: "#ccc",
    marginHorizontal: 3
  },
})