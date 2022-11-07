import React from 'react'
import { View } from 'react-native'
import StoreContextProvider from "./src/app/store/store"
import AppSwitcher from "app/containers/AppSwitcher"
import InstantSearches from "app/containers/InstantSearches"
import { GestureHandlerRootView } from "react-native-gesture-handler"

export default function App() {

  return (
    <View style={{flex: 1}}>
      <StoreContextProvider>
        <InstantSearches>
          <GestureHandlerRootView style={{flex: 1}}>
            <AppSwitcher />
          </GestureHandlerRootView>
        </InstantSearches>
      </StoreContextProvider>
    </View>
  )
}
