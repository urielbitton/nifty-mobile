import { Ionicons } from "@expo/vector-icons"
import ChatConsole from "app/components/chats/ChatConsole"
import MessageItem from "app/components/chats/MessageItem"
import AppAvatar from "app/components/ui/AppAvatar"
import ChatTypingAnimate from "app/components/ui/ChatTypingAnimate"
import GoBackBtn from "app/components/ui/GoBackBtn"
import IconContainer from "app/components/ui/IconContainer"
import { useChat, useChatMessages } from "app/hooks/chatHooks"
import { useUser } from "app/hooks/userHooks"
import { updateIsTypingChat } from "app/services/chatsServices"
import { firebaseArrayRemove, updateDB } from "app/services/crudDB"
import { StoreContext } from "app/store/store"
import { colors } from "app/utils/colors"
import { getTimeAgo } from "app/utils/dateUtils"
import React, { useContext } from 'react'
import { useEffect } from "react"
import { useRef } from "react"
import { useState } from "react"
import { View, StyleSheet, Text, ScrollView } from "react-native"

export default function ConversationScreen(props) {

  const { myUserID } = useContext(StoreContext)
  const { chatID } = props.route.params
  const chat = useChat(chatID)
  const limitsNum = 15
  const [messageText, setMessageText] = useState("")
  const [uploadedImg, setUploadedImg] = useState(null)
  const [messagesLimit, setMessagesLimit] = useState(limitsNum)
  const [inputFocused, setInputFocused] = useState(false)
  const otherUserID = chat?.members?.filter(userID => userID !== myUserID)[0]
  const otherUser = useUser(otherUserID)
  const messages = useChatMessages(chatID, messagesLimit)
  const myUserHasSeen = !chat?.notSeenBy?.includes(myUserID)
  const scrollRef = useRef(null)

  const messagesList = messages?.map((message, index) => {
    return <MessageItem
      key={index}
      message={message}
      chat={chat}
    />
  })

  const handleInputFocus = () => {
    if(scrollRef) {
      scrollRef?.current?.scrollToEnd({animated: true})
    }
    setInputFocused(true)
  }

  const handleInputBlur = () => {
    updateIsTypingChat(chatID, myUserID, false)
    setInputFocused(false)
  }

  useEffect(() => {
    if(!myUserHasSeen) {
      updateDB('chats', chatID, {
        notSeenBy: firebaseArrayRemove(myUserID)
      })
    }
  },[myUserHasSeen])

  useEffect(() => {
    let timer = null
    if(inputFocused) {
      if(messageText.length) {
        updateIsTypingChat(chatID, myUserID, true)
      }
      timer = setTimeout(() => {
        updateIsTypingChat(chatID, myUserID, false)
      }, 5000)
    }
    return () => clearTimeout(timer)
  },[inputFocused, messageText])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <GoBackBtn 
            rippleColor="#ddd"
          />
          <View style={styles.headerTitles}>
            <AppAvatar
              dimensions={40}
              source={otherUser?.photoURL}
              style={{ marginRight: 10 }}
            />
            <View>
              <Text style={styles.userName}>{otherUser?.firstName} {otherUser?.lastName}</Text>
              <Text style={styles.userStatus}>{getTimeAgo(chat?.lastActive?.toDate())}</Text>
            </View>
          </View>
        </View>
        <View style={styles.headerRight}>
          <IconContainer
            dimensions={30}
            rippleColor="#ddd"
            IconComponent={Ionicons}
            iconName="information-circle-sharp"
            iconColor={colors.primary}
            iconSize={24}
          />  
        </View>
      </View>
      <ScrollView 
        contentContainerStyle={styles.messagesList}
        ref={scrollRef}
        onScroll={(e) => e.nativeEvent.contentOffset.y <= 5 && setMessagesLimit(messagesLimit + limitsNum)}
      >
        { 
          chat?.userTyping?.includes(otherUserID) && 
          <ChatTypingAnimate style={styles.typingAnimate} /> 
        }
        {messagesList}
      </ScrollView>
      <ChatConsole
        chatPath="chats"
        storagePath={`chats/${chatID}/messages`}
        chatID={chatID}
        chatMembers={chat?.members}
        messageText={messageText}
        setMessageText={setMessageText}
        uploadedImg={uploadedImg}
        setUploadedImg={setUploadedImg}
        scrollRef={scrollRef}
        handleInputFocus={handleInputFocus}
        handleInputBlur={handleInputBlur}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.appBg,
    justifyContent: 'space-between'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 25,
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: colors.appBg, 
    shadowColor: colors.darkGrayText,
    shadowOffset: {
      width: 8,
      height: 3,
    },
    shadowOpacity: 1,
    shadowRadius: 4.65,
    elevation: 15,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15
  },
  headerBackBtn: {
    width: 30,
    height: 30,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10
  },
  headerTitles: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    fontSize: 17,
    fontWeight: '500',
  },
  userStatus: {
    fontSize: 13,
    color: colors.darkGrayText
  },
  headerRight: {},
  messagesList: {
    padding: 10,
    flexDirection: 'column-reverse',
  }, 
  typingAnimate: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    paddingVertical: 15,
    paddingHorizontal: 30,
    backgroundColor: "#fff",
    borderRadius: 30,
    shadowColor: '#aaa',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0,
    shadowRadius: 5,
    elevation: 5,
    marginLeft: 10,
    marginTop: 10,
  },
})