import React, { useContext } from 'react'
import { StoreContext } from "../store/store" 
import AuthSwitch from '../auth/AuthSwitch'
import { Text } from "react-native"
import AppContainer from './AppContainer'

export default function AppSwitcher() {

  const { myUser, user } = useContext(StoreContext)

  return (
    user ?
    <AppContainer /> :
    myUser === null ?
    <Text>Loading...</Text> :
    <AuthSwitch /> 
  )
}
