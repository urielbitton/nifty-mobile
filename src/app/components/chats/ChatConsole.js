import React, { useContext } from 'react'
import { TextInput, View, StyleSheet } from "react-native"
import { Ionicons, MaterialIcons } from "@expo/vector-icons"
import { useChat } from "app/hooks/chatHooks"
import { createConversation, sendChatMessage } from "app/services/chatsServices"
import { StoreContext } from "app/store/store"
import { colors } from "app/utils/colors"
import * as ImagePicker from 'expo-image-picker'
import { isDateGreaterThanXTimeAgo, isDateLessThanXTimeAgo } from "app/utils/dateUtils"
import IconContainer from "../ui/IconContainer"

export default function ChatConsole(props) {

  const { setPageLoading, myUser, myUserID } = useContext(StoreContext)
  const { messageText, setMessageText, uploadedImg, setUploadedImg,
    messagePath, chatPath, chatID, storagePath } = props
  const chat = useChat(chatID)
  const isNotEmptyMessage = /\S/.test(messageText)
  const threeMinutes = 1000 * 60 * 3
  const fifteenMinutes = 15 * 60000

  const handleSendMessage = () => {
    if(isNotEmptyMessage) {
      setPageLoading(true)
      setMessageText('')
      const combineMessage = isDateLessThanXTimeAgo(chat?.lastMessageDate?.toDate(), threeMinutes) && 
        chat?.lastSenderID === myUserID
      const insertTimestamp = isDateGreaterThanXTimeAgo(chat?.lastMessageDate?.toDate(), fifteenMinutes)
      sendChatMessage(
        messageText, 
        [uploadedImg], 
        messagePath, 
        chatPath, 
        chatID, 
        storagePath, 
        myUser, 
        combineMessage, 
        insertTimestamp
      )
      .then(() => {
        setPageLoading(false)
        setMessageText('')
      })
      .catch(err => {
        console.log(err)
        setPageLoading(false)
      }) 
    }
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })
    if (!result.cancelled) {
      setUploadedImg(result.uri)
    }
  }

  const launchCamera = async () => {
    
  }


  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <IconContainer
          dimensions={35}
          IconComponent={Ionicons}
          iconColor={colors.primary} 
          iconSize={24} 
          iconName="camera" 
          style={styles.icon} 
          borderlessRipple
          onPress={launchCamera}
        />
        <IconContainer
          dimensions={35}
          IconComponent={MaterialIcons}
          iconColor={colors.primary} 
          iconSize={23} 
          iconName="photo" 
          style={styles.icon} 
          borderlessRipple
          onPress={pickImage}
        />
      </View>
      <View style={styles.right}>
        <TextInput
          onChangeText={(text) => setMessageText(text)}
          value={messageText}
          placeholder="Message"
          cursorColor={colors.primary}
          style={styles.textInput}
          multiline
        />
        <IconContainer
          dimensions={35}
          IconComponent={Ionicons}
          iconColor={colors.primary} 
          iconSize={24} 
          iconName="send-sharp" 
          onPress={handleSendMessage}
          style={styles.sendBtn} 
          borderlessRipple
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {},
  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    color: "#333",
    backgroundColor: colors.blueGray,
    width: 220,
    fontSize: 16,
    borderRadius: 40,
    paddingHorizontal: 10,
    paddingLeft: 12,
    paddingVertical: 7
  },  
  sendBtn: {
    marginLeft: 5,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  }
})