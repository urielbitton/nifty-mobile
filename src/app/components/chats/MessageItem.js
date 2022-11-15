import { FontAwesome } from "@expo/vector-icons"
import { useUser } from "app/hooks/userHooks"
import { StoreContext } from "app/store/store"
import { colors } from "app/utils/colors"
import { getTimeTextAgo } from "app/utils/dateUtils"
import React from 'react'
import { useState } from "react"
import { useContext } from "react"
import { Image } from "react-native"
import { View, StyleSheet, Text, Pressable } from "react-native"
import AppAvatar from "../ui/AppAvatar"

export default function MessageItem(props) {

  const { myUserID } = useContext(StoreContext)
  const { hasLink, hasTimestamp, isCombined, isDeleted, isEdited,
    messageDate, messageID, messageText, senderID, senderImg,
    chatImgs, hasImgs } = props.message
  const { chat } = props
  const [showTimestamp, setShowTimestamp] = useState(false)
  const isMyMessage = senderID === myUserID
  const userSawCurrentMessage = !chat?.notSeenBy?.includes(senderID)
  const seenUser = useUser(chat?.members?.find(user => user !== senderID)?.userID)
  const isLastMessage = chat?.lastMessageID === messageID

  const imgsRender = chatImgs?.map((img, index) => {
    return <Image
      source={{ uri: img?.imgURL }}
      style={[styles.chatImg, isMyMessage && styles.myChatImg]}
      key={index}
    />
  })

  const timestampRow = (hasTimestamp || showTimestamp) &&
    <View style={styles.top}>
      <Text style={styles.timestamp}>{getTimeTextAgo(messageDate?.toDate())}</Text>
    </View>

  const displayAvatarOrCheckmark = !isMyMessage ?
    <AppAvatar
      dimensions={30}
      source={senderImg}
      style={styles.avatar}
    /> :
    !userSawCurrentMessage && isLastMessage ?
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

  return (
    !hasImgs || chatImgs?.length < 1 ?
      <Pressable
        style={[styles.container, !isCombined && styles.spaceTop]}
        onPress={() => setShowTimestamp(prev => !prev)}
        key={messageID}
      >
        {timestampRow}
        <View style={[styles.bubbleContainer, isMyMessage && styles.myBubbleContainer]}>
          {displayAvatarOrCheckmark}
          <View style={[styles.bubble, isMyMessage && styles.myBubble]}>
            <Text style={[styles.messageText, isMyMessage && styles.myMessageText]}>
              {messageText}
            </Text>
          </View>
        </View>
      </Pressable> :
      <View style={[styles.chatImgContainer, isMyMessage && styles.myChatImgContainer]}>
        {timestampRow}
        <View style={[styles.chatImgsRow, isMyMessage && styles.myChatImgsRow]}>
          {displayAvatarOrCheckmark}
          <View style={[styles.chatImgs, isMyMessage && styles.myChatImgs]}>
            {imgsRender}
          </View>
        </View>
      </View>
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
  messageText: {
    fontSize: 16,
    color: '#333',
  },
  myMessageText: {
    color: '#fff',
  },
  chatImgContainer: {
    marginTop: 10,
    maxWidth: '100%',
    alignItems: 'flex-start',
  },
  myChatImgContainer: {
    alignItems: 'flex-end',
  },
  chatImgsRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    width: '90%',
  },
  myChatImgsRow: {
    flexDirection: 'row-reverse',
  },
  chatImgs: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: 5,
  },
  myChatImgs: {
    flexDirection: 'row-reverse',
  },
  chatImg: {
    width: 100,
    height: 100,
    borderRadius: 10,
    margin: 2
  },
})
