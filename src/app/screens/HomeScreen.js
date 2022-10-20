import React, { useContext } from 'react'
import { StyleSheet, Text, View } from "react-native"
import ClientHome from "../components/home/ClientHome"
import RenterHome from "../components/home/RenterHome"
import { StoreContext } from "../store/store"

export default function HomeScreen() {

  const { myUserType } = useContext(StoreContext)

  return (
    myUserType === 'client' ? 
    <ClientHome /> :
    myUserType === 'renter' ?
    <RenterHome /> :
    null
  )
}
