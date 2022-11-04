import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import ChatConsole from "app/components/chats/ChatConsole"
import MessageItem from "app/components/chats/MessageItem"
import AppAvatar from "app/components/ui/AppAvatar"
import GoBackBtn from "app/components/ui/GoBackBtn"
import { useChatMessages } from "app/hooks/chatHooks"
import { useUser } from "app/hooks/userHooks"
import { firebaseArrayAdd, updateDB } from "app/services/crudDB"
import { StoreContext } from "app/store/store"
import { colors } from "app/utils/colors"
import { getTimeAgo } from "app/utils/dateUtils"
import React, { useContext } from 'react'
import { useEffect } from "react"
import { useRef } from "react"
import { useState } from "react"
import { View, StyleSheet, Text, Pressable, 
  ScrollView } from "react-native"

export default function ConversationScreen(props) {

  const { myUserID } = useContext(StoreContext)
  const { chat } = props.route.params
  const limitsNum = 15
  const [messageText, setMessageText] = useState("")
  const [uploadedImg, setUploadedImg] = useState(null)
  const [messagesLimit, setMessagesLimit] = useState(limitsNum)
  const otherUserID = chat?.members?.filter(userID => userID !== myUserID)[0]
  const otherUser = useUser(otherUserID)
  const messages = useChatMessages(chat?.chatID, messagesLimit)
  const myUserHasSeen = chat?.seenByDate?.find(seen => seen.userID === myUserID)
  const navigation = useNavigation()
  const scrollRef = useRef(null)

  const messagesList = messages?.map((message, index) => {
    return <MessageItem
      key={index}
      message={message}
      chat={chat}
    />
  })

  useEffect(() => {
    if(!myUserHasSeen) {
      updateDB('chats', chat?.chatID, {
        seenByDate: firebaseArrayAdd({
          userID: myUserID,
          date: new Date()
        })
      })
    }
  },[myUserHasSeen])

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
          <Ionicons 
            name="information-circle-sharp" 
            size={24} 
            color={colors.primary}
          />
        </View>
      </View>
      <ScrollView 
        contentContainerStyle={styles.messagesList}
        ref={scrollRef}
        onScroll={(e) => e.nativeEvent.contentOffset.y === 0 && setMessagesLimit(messagesLimit + limitsNum)}
      >
        {messagesList}
      </ScrollView>
      <ChatConsole
        messagePath={`chats/${chat?.chatID}/messages`}
        chatPath="chats"
        storagePath={`chats/${chat?.chatID}/messages`}
        chatID={chat?.chatID}
        messageText={messageText}
        setMessageText={setMessageText}
        uploadedImg={uploadedImg}
        setUploadedImg={setUploadedImg}
        scrollRef={scrollRef}
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
    justifyContent: 'flex-end',
  }
})