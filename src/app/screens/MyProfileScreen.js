import Login from "app/auth/Login"
import { StoreContext } from "app/store/store"
import React, { useContext, useState } from 'react'
import { Text } from "react-native"
import Screen from "../components/layout/Screen"

export default function MyProfileScreen({navigation}) {

  const { user } = useContext(StoreContext)

  return (
    <Screen>
      {
        user ?
        <Text onPress={() => navigation.navigate('Home')}>My Profile Screen</Text> :
        <Login />
      }
    </Screen>
  )
}
