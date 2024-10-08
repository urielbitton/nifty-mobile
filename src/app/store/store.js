// @ts-nocheck
import React, { createContext, useEffect, useState } from 'react'
import { auth } from '../firebase/firebase'
import { getUserByID } from '../services/userServices'

export const StoreContext = createContext()

const StoreContextProvider = ({children}) => {
 
  const user = auth.currentUser
  const [myUser, setMyUser] = useState(null) 
  const [loggingAuth, setLoggingAuth] = useState(true)
  const [pageLoading, setPageLoading] = useState(false)
  const [selectedNewChatUser, setSelectedNewChatUser] = useState(null)
  const myUserID = user?.uid
  const myUserName = `${myUser?.firstName} ${myUser?.lastName}`
  const myUserType = myUser?.userType
  const myInterestedJobIDs = myUser?.interestedJobIDs
  const myNotInterestedJobIDs = myUser?.notInterestedJobIDs
  const photoURLPlaceholder = 'https://firebasestorage.googleapis.com/v0/b/nifty-app-ada6c.appspot.com/o/admin%2Fprofile-placeholder.png?alt=media&token=0f6158fa-3128-41d8-9f15-01039de93448'

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
    photoURLPlaceholder,
    selectedNewChatUser, setSelectedNewChatUser
  }}>
    {children}
  </StoreContext.Provider>
}
export default StoreContextProvider