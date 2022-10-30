import React from 'react'
import { StyleSheet, View } from 'react-native'
import StoreContextProvider from "./src/app/store/store"
import AppSwitcher from "app/containers/AppSwitcher"
import InstantSearches from "app/containers/InstantSearches"

export default function App() {

  return (
    <View style={styles.container}>
      <StoreContextProvider>
        <InstantSearches>
          <AppSwitcher />
        </InstantSearches>
      </StoreContextProvider>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

