import React from 'react'
import { Image, View } from "react-native"

export default function AppAvatar(props) {

  const { dimensions, source, style } = props

  return (
    <View 
      style={[style, { width: dimensions, height: dimensions, borderRadius: dimensions, overflow: 'hidden' }]}
    >
      <Image 
        source={{ uri: source }}
        style={{ width: '100%', height: '100%', borderRadius: dimensions }}
      />
    </View>
  )
}