import React from 'react'
import { StyleSheet, View } from 'react-native'
import StoreContextProvider from "./src/app/store/store"
import AppSwitcher from "./src/app/containers/AppSwitcher"
import RoutesSwitcher from "./src/app/containers/RoutesSwitcher"

export default function App() {

  return (
    <View style={styles.container}>
      <StoreContextProvider>
        <RoutesSwitcher />
      </StoreContextProvider>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
