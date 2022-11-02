import { getChatByID, getChatsByUserID, getMessagesByChatID } from "app/services/chatsServices"
import { useEffect } from "react"
import { useState } from "react"

export const useChat = (chatID) => {

  const [chat, setChat] = useState(null)

  useEffect(() => {
    if(chatID)
      getChatByID(chatID, setChat)
  },[chatID]) 

  return chat
}

export const useChats = (userID, limit) => {

  const [chats, setChats] = useState([])

  useEffect(() => {
    getChatsByUserID(userID, setChats, limit)
  },[userID, limit]) 

  return chats
}

export const useChatMessages = (chatID, limit) => {

  const [messages, setMessages] = useState([])

  useEffect(() => {
    if(chatID)
      getMessagesByChatID(chatID, setMessages, limit)
  },[chatID, limit]) 

  return messages
}