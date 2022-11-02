import { Button } from "@rneui/themed"
import { signOut } from "app/services/crudDB"
import { StoreContext } from "app/store/store"
import React, { useContext } from 'react'
import { Text } from "react-native"
import Screen from "../components/layout/Screen"

export default function MyProfileScreen() {

  const { setPageLoading, myUserName, myUser } = useContext(StoreContext)

  return (
    <Screen>
      <Text>My Profile Screen</Text>
      <Text style={{marginTop: 20, fontSize: 25}}>{myUserName}</Text>
      <Text style={{marginTop: 20, fontSize: 21}}>{myUser?.email}</Text>
      <Button
        title="Sign Out"
        onPress={() => signOut(setPageLoading)}
        buttonStyle={{ margin: 20,  }}
      />
    </Screen>
  )
}
