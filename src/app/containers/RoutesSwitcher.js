import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AppContainer from "./AppContainer"

const Stack = createNativeStackNavigator()

export default function RoutesSwitcher() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="App" component={AppContainer} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
