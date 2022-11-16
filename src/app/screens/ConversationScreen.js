import React, { useState, useRef, useEffect, useContext } from "react"
import {
  View, StyleSheet, Text, ScrollView,
  Image,
  Pressable
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import ChatConsole from "app/components/chats/ChatConsole"
import MessageItem from "app/components/chats/MessageItem"
import AppAvatar from "app/components/ui/AppAvatar"
import AppBottomSheet from "app/components/ui/AppBottomSheet"
import ChatTypingAnimate from "app/components/ui/ChatTypingAnimate"
import GoBackBtn from "app/components/ui/GoBackBtn"
import IconContainer from "app/components/ui/IconContainer"
import { useChat, useChatMessages } from "app/hooks/chatHooks"
import { useUser } from "app/hooks/userHooks"
import { sendChatMessage, updateIsTypingChat } from "app/services/chatsServices"
import { firebaseArrayRemove, updateDB } from "app/services/crudDB"
import { StoreContext } from "app/store/store"
import { colors } from "app/utils/colors"
import { getTimeAgo } from "app/utils/dateUtils"
import { Button } from "@rneui/themed"

export default function ConversationScreen(props) {

  const { myUser, myUserID } = useContext(StoreContext)
  const { chatID } = props.route.params
  const chat = useChat(chatID)
  const limitsNum = 15
  const [messageText, setMessageText] = useState("")
  const [uploadedImgs, setUploadedImgs] = useState([])
  const [photoLibrary, setPhotoLibrary] = useState(null)
  const [messagesLimit, setMessagesLimit] = useState(limitsNum)
  const [inputFocused, setInputFocused] = useState(false)
  const otherUserID = chat?.members?.filter(userID => userID !== myUserID)[0]
  const otherUser = useUser(otherUserID)
  const messages = useChatMessages(chatID, messagesLimit)
  const myUserHasSeen = !chat?.notSeenBy?.includes(myUserID)
  const scrollRef = useRef(null)
  const photosSheetRef = useRef(null)
  const chatMembers = [myUserID, otherUserID]

  const messagesList = messages?.map((message, index) => {
    return <MessageItem
      key={index}
      message={message}
      chat={chat}
    />
  })

  const photoLibraryList = photoLibrary?.map((photo, index) => {
    return <Pressable
      style={[styles.photoLibraryImgContainer]}
      onPress={() => {
        !uploadedImgs.includes(photo) ?
          setUploadedImgs(prev => [...prev, photo]) :
          setUploadedImgs(prev => prev.filter(img => img !== photo))
      }}
      key={index}
    >
      {
        uploadedImgs?.includes(photo) &&
        <View style={styles.selectedPhotoLibraryImgCover}>
          <View style={styles.selectedPhotoNumber}>
            <Text style={styles.selectedPhotoNumberText}>{uploadedImgs.indexOf(photo) + 1}</Text>
          </View>
        </View>
      }
      <Image
        source={{ uri: photo.uri }}
        style={styles.photoLibraryImg}
      />
    </Pressable>
  })

  const handleInputFocus = () => {
    if (scrollRef) {
      scrollRef?.current?.scrollToEnd({ animated: true })
    }
    setInputFocused(true)
  }

  const handleInputBlur = () => {
    updateIsTypingChat(chatID, myUserID, false)
    setInputFocused(false)
  }

  const sendPhoto = () => {
    sendChatMessage(
      messageText,
      uploadedImgs,
      chatMembers,
      `chats/${chatID}/messages`,
      'chats',
      chatID,
      `chats/${chatID}/photos`,
      myUser,
      false,
      true
    )
  }

  useEffect(() => {
    if (!myUserHasSeen) {
      updateDB('chats', chatID, {
        notSeenBy: firebaseArrayRemove(myUserID)
      })
    }
  }, [myUserHasSeen])

  useEffect(() => {
    let timer = null
    if (inputFocused) {
      if (messageText.length) {
        updateIsTypingChat(chatID, myUserID, true)
      }
      timer = setTimeout(() => {
        updateIsTypingChat(chatID, myUserID, false)
      }, 5000)
    }
    return () => clearTimeout(timer)
  }, [inputFocused, messageText])

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
        uploadedImgs={uploadedImgs}
        setUploadedImg={setUploadedImgs}
        setPhotoLibrary={setPhotoLibrary}
        scrollRef={scrollRef}
        handleInputFocus={handleInputFocus}
        handleInputBlur={handleInputBlur}
        photosSheetRef={photosSheetRef}
      />
      <AppBottomSheet
        sheetRef={photosSheetRef}
        snapPoints={['50%', '100%']}
        onClose={() => setUploadedImgs([])}
      >
        <View style={styles.photoLibraryContainer}>
          <View style={styles.photoLibraryTitles}>
            <Text style={styles.photoLibrarTitle}>Camera Roll</Text>
            {
              uploadedImgs.length > 0 &&
              <Button
                title="Send"
                onPress={() => sendPhoto()}
                buttonStyle={styles.photoLibrarySendBtn}
              />
            }
          </View>
          <ScrollView contentContainerStyle={styles.photosLibraryGrid}>
            {photoLibraryList}
          </ScrollView>
        </View>
      </AppBottomSheet>
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
  photosLibraryGrid: {
    marginTop: 20,
    flex: 4,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  photoLibraryImgContainer: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fff',
  },
  selectedPhotoLibraryImgCover: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10
  },
  photoLibraryImg: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%'
  },
  selectedPhotoNumber: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
  },
  selectedPhotoNumberText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600'
  },
  photoLibraryContainer: {
    flex: 1,
  },
  photoLibraryTitles: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10
  },
  photoLibrarTitle: {
    fontSize: 17,
    fontWeight: '500',
  },
  photoLibrarySendBtn: {
    backgroundColor: colors.primary,
    color: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 10
  }
})