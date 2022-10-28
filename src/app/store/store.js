// @ts-nocheck
import React, { createContext, useEffect, useRef, useState } from 'react'
import { auth } from '../firebase/firebase'
import { getUserByID } from '../services/userServices'

export const StoreContext = createContext()

const StoreContextProvider = ({children}) => {
 
  const user = auth.currentUser
  const [myUser, setMyUser] = useState(null) 
  const [loggingAuth, setLoggingAuth] = useState(true)
  const [pageLoading, setPageLoading] = useState(false)
  const myUserID = user?.uid
  const myUserName = `${myUser?.firstName} ${myUser?.lastName}`
  const myUserType = myUser?.userType
  const myInterestedJobIDs = myUser?.interestedJobIDs
  const myNotInterestedJobIDs = myUser?.notInterestedJobIDs
  const scrollTopRef= useRef()

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if(user) {
        getUserByID(user.uid, setMyUser)
      }
      else {
        setMyUser({})
      }
    })
  },[user])



  return <StoreContext.Provider value={{ 
    user, myUser, setMyUser, myUserID, myUserName, 
    myUserType,
    myInterestedJobIDs, myNotInterestedJobIDs, 
    loggingAuth, setLoggingAuth, 
    pageLoading, setPageLoading,
  }}>
    {children}
  </StoreContext.Provider>
}
export default StoreContextProvider