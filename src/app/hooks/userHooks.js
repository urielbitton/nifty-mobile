import { getUserByID } from "app/services/userServices"
import { useEffect } from "react"
import { useState } from "react"

export const useUser = (userID) => {

  const [user, setUser] = useState(null)

  useEffect(() => {
    if(userID)
      getUserByID(userID, setUser)
  },[userID])

  return user
}