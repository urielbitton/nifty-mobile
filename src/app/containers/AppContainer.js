import React from 'react'
import { View, StyleSheet } from "react-native"
import { StatusBar } from 'expo-status-bar'
import HomeContainer from './HomeContainer'
import Navbar from '../components/layout/Navbar'
import Constants from 'expo-constants'

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
    backgroundColor: '#fff',
    paddingTop: Constants.statusBarHeight,
  }
})