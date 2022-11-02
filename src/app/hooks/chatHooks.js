import { getChatByID, getChatsByUserID } from "app/services/chatsServices"
import { useEffect } from "react"
import { useState } from "react"

export const useChat = (chatID) => {

  const [chat, setChat] = useState(null)

  useEffect(() => {
    getChatByID(chatID, setChat)
  },[chatID]) 

  return chat
}

export const useChats = (userID) => {

  const [chats, setChats] = useState([])

  useEffect(() => {
    getChatsByUserID(userID, setChats)
  },[userID]) 

  return chats
}