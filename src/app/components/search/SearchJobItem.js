import React from 'react'
import { Text, View } from "react-native"

export default function SearchJobItem(props) {

  const { title } = props.result

  return (
    <View>
      <Text>{title}</Text>
    </View>
  )
}
