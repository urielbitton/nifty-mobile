import { Button } from "@rneui/themed"
import { signOut } from "app/services/crudDB"
import { StoreContext } from "app/store/store"
import React, { useContext } from 'react'
import { Text } from "react-native"
import Screen from "../components/layout/Screen"

export default function MyProfileScreen() {

  const { setPageLoading } = useContext(StoreContext)

  return (
    <Screen>
      <Text>My Profile Screen</Text>
      <Button
        title="Sign Out"
        onPress={() => signOut(setPageLoading)}
        buttonStyle={{ margin: 20,  }}
      />
    </Screen>
  )
}
