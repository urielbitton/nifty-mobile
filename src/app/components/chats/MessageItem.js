import { FontAwesome } from "@expo/vector-icons"
import { useUser } from "app/hooks/userHooks"
import { StoreContext } from "app/store/store"
import { colors } from "app/utils/colors"
import { getTimeTextAgo } from "app/utils/dateUtils"
import React from 'react'
import { useState } from "react"
import { useContext } from "react"
import { View, StyleSheet, Text, Pressable } from "react-native"
import AppAvatar from "../ui/AppAvatar"

export default function MessageItem(props) {

  const { myUserID } = useContext(StoreContext)
  const { hasLink, hasTimestamp, isCombined, isDeleted, isEdited,
    messageDate, messageID, messageText, senderID, senderImg, 
    senderName } = props.message
  const { chat } = props
  const [showBottom, setShowBottom] = useState(false)
  const [showTimestamp, setShowTimestamp] = useState(false)
  const isMyMessage = senderID === myUserID
  const userSawCurrentMessage = chat?.seenByDate?.find(seen => seen.userID !== senderID)?.date?.toDate() > messageDate?.toDate()
  const seenUser = useUser(chat?.seenByDate?.find(seen => seen.userID !== senderID)?.userID)
  const isLastMessage = chat?.lastMessageID === messageID

  return (
    <Pressable 
      style={[styles.container, !isCombined && styles.spaceTop]}
      onPress={() => setShowTimestamp(prev => !prev)}
    >
      {
        (hasTimestamp || showTimestamp) &&
        <View style={styles.top}>
          <Text style={styles.timestamp}>{getTimeTextAgo(messageDate?.toDate())}</Text>
        </View>
      }
      <View style={[styles.bubbleContainer, isMyMessage && styles.myBubbleContainer]}>
        {
          !isMyMessage ?
          <AppAvatar
            dimensions={30}
            source={senderImg}
            style={styles.avatar}
          /> :
          userSawCurrentMessage && isLastMessage ?
          <AppAvatar
            dimensions={13}
            source={seenUser?.photoURL}
          /> :
          isLastMessage ?
          <FontAwesome
            name="check-circle"
            size={14}
            color={colors.primary}
          /> :
          <View style={styles.avatarSpacer} />
        }
        <View style={[
          styles.bubble, 
          isMyMessage && styles.myBubble, 
          isCombined && styles.combinedBottomBubble,
          isCombined && messageDate === chat?.lastMessageDate && styles.combinedMiddleBubble
        ]}>
          <Text style={[styles.messageText, isMyMessage && styles.myMessageText]}>{messageText}</Text>
        </View>
      </View>
      {
        showBottom &&
        <View style={styles.bottom}>

        </View>
      }
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 1,
  },
  spaceTop: {
    marginTop: 10
  },
  top: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 8,
    marginTop: 5
  },
  timestamp: {
    fontSize: 12,
    color: colors.darkGrayText,
  },  
  bubbleContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  myBubbleContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  avatar: {
    marginRight: 10,
    top: -2
  },
  avatarSpacer: {
    width: 13
  },
  bubble: {
    maxWidth: '80%',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 40,
    backgroundColor: '#fff',
    shadowColor: '#aaa',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0,
    shadowRadius: 5,
    elevation: 5,
  },
  myBubble: {
    backgroundColor: colors.primary,
    marginRight: 5
  },
  combinedMiddleBubble: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  combinedBottomBubble: {
    borderTopRightRadius: 3
  },  
  messageText: {
    fontSize: 16,
    color: '#333',
  },
  myMessageText: {
    color: '#fff',
  }
})
