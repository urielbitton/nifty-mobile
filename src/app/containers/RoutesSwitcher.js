import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AppContainer from "./AppContainer"
import JobScreen from "app/screens/JobScreen"
import Search from "app/components/search/Search"

const Stack = createNativeStackNavigator()

export default function RoutesSwitcher() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="App" component={AppContainer} />
        <Stack.Screen name="Job" component={JobScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
