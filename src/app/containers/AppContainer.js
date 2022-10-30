import React, { useContext } from 'react'
import { View, StyleSheet } from "react-native"
import { StatusBar } from 'expo-status-bar'
import HomeContainer from './HomeContainer'
import Constants from 'expo-constants'
import { colors } from "app/utils/colors"
import LoadingModal from "app/components/ui/LoadingModal"
import { StoreContext } from "app/store/store"

export default function AppContainer() {

  const { pageLoading } = useContext(StoreContext)

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <HomeContainer />
      { pageLoading && <LoadingModal /> }
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