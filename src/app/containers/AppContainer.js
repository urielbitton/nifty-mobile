import React from 'react'
import { View, StyleSheet } from "react-native"
import { StatusBar } from 'expo-status-bar'
import HomeContainer from './HomeContainer'
import Constants from 'expo-constants'
import { colors } from "app/utils/colors"

export default function AppContainer() {

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <HomeContainer />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: colors.appBg,
    paddingTop: Constants.statusBarHeight,
  }
})