import React, { useContext } from 'react'
import { StoreContext } from "../store/store" 
import AuthSwitcher from '../auth/AuthSwitcher'
import LoadingModal from "app/components/ui/LoadingModal"
import RoutesSwitcher from "./RoutesSwitcher"

export default function AppSwitcher() {

  const { myUser, user } = useContext(StoreContext)

  return (
    user ?
    <RoutesSwitcher /> :
    myUser === null ?
    <LoadingModal /> :
    <AuthSwitcher /> 
  )
}
