import React from 'react'
import { Text, View, StyleSheet } from "react-native"
import Constants from 'expo-constants'

export default function Navbar() {
  return (
    <View style={styles.container}>
      <Text>Navbar</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: Constants.statusBarHeight,
    left: 0,
    width: '100%',
    height: 50,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    padding: 10,
    zIndex: 1000
  }
})