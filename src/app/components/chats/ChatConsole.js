import { Ionicons } from "@expo/vector-icons"
import { useChat } from "app/hooks/chatHooks"
import { createConversation, sendChatMessage } from "app/services/chatsServices"
import { StoreContext } from "app/store/store"
import React, { useContext } from 'react'
import { TextInput, View } from "react-native"

export default function ChatConsole(props) {

  const { setPageLoading, myUser, myUserID } = useContext(StoreContext)
  const { messageText, setMessageText, uploadedImgs, setUploadedImgs,
    messagePath, chatPath, chatID, storagePath } = props
  const chat = useChat(chatID)
  const isNotEmptyMessage = /\S/.test(messageText)
  const threeMinutes = 1000 * 60 * 3
  const fifteenMinutes = 15 * 60000
  const uploadedImgFiles = uploadedImgs.map(img => img?.file)

  const handleSendMessage = () => {
    
  }

  return (
    <View>
      <TextInput
        onChangeText={(text) => setMessageText(text)}
        value={messageText}
        placeholder="Type a message..."
        multiline
      />
      <Ionicons
        name="send-sharp"
        size={24}
        color="black"
        onPress={() => handleSendMessage()}
      />
    </View>
  )
}
