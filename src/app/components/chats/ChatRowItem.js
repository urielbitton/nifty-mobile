import React, { useContext } from 'react'
import { Pressable, View, StyleSheet, Text, Image, Vibration } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useUser } from "app/hooks/userHooks"
import { StoreContext } from "app/store/store"
import { getTimeTextAgo } from "app/utils/dateUtils"
import { truncateText } from "app/utils/generalUtils"
import AppAvatar from "../ui/AppAvatar"
import { FontAwesome } from "@expo/vector-icons"
import { colors } from "app/utils/colors"
import ChatTypingAnimate from "../ui/ChatTypingAnimate"

export default function ChatRowItem(props) {

  const { myUserID } = useContext(StoreContext)
  const { members, lastMessage, lastMessageDate, lastSenderID,
    notSeenBy, chatID, userTyping, lastMessageIsImg, lastMessageIsFile } = props.chat
  const { sheetRef, setChatDetails } = props
  const otherUserID = members?.filter(userID => userID !== myUserID)[0]
  const otherUser = useUser(otherUserID)
  const otherUserHasSeen = !notSeenBy?.includes(otherUserID)
  const myUserHasSeen = !notSeenBy?.includes(myUserID)
  const navigation = useNavigation()

  return (
    <Pressable
      key={chatID}
      style={styles.container}
      android_ripple={{ color: '#ddd' }}
      onPress={() => navigation.navigate('Conversation', { chatID: chatID })}
      onLongPress={() => {
        Vibration.vibrate(1 * 5)
        setChatDetails(props.chat)
        sheetRef.current?.snapToIndex(0)
      }}
    >
      <View style={styles.left}>
        <AppAvatar
          dimensions={60}
          source={otherUser?.photoURL}
          style={{ marginRight: 15 }}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.userName}>{otherUser?.firstName} {otherUser?.lastName}</Text>
          {
            userTyping?.includes(otherUserID) ? 
            <ChatTypingAnimate 
              style={styles.typingAnimate}
            /> :
            !lastMessageIsImg && !lastMessageIsFile ?
            <Text style={[styles.messageText, !myUserHasSeen && lastSenderID !== myUserID && styles.unseenMessageText]}>
              {lastSenderID === myUserID ? 'You: ' : ''}
              {truncateText(lastMessage, 30)}
            </Text> :
            <Text>Shared a {lastMessageIsImg ? 'photo' : 'file'}</Text>
          }
          <Text style={styles.timestamp}>{getTimeTextAgo(lastMessageDate?.toDate())}</Text>
        </View>
      </View>
      <View style={styles.right}>
        {
          lastSenderID === myUserID && otherUserHasSeen ?
          <Image
            source={{ uri: otherUser?.photoURL }}
            style={styles.seenAvatar}
          /> : 
          !otherUserHasSeen && lastSenderID === myUserID ?
          <FontAwesome
            name="check-circle"
            size={14}
            color={colors.darkBlueGray}
          /> :
          !myUserHasSeen && lastSenderID !== myUserID &&
          <View style={styles.unseenDot} />
        }
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoContainer: {},
  userName: {
    fontSize: 16,
    fontWeight: '500',
  },
  messageText: {
    fontSize: 14,
    color: '#444',
  },
  unseenMessageText: {
    fontWeight: '600',
  },
  timestamp: {
    fontSize: 12,
    color: '#aaa',
  },
  right: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  seenAvatar: {
    width: 17,
    height: 17,
    borderRadius: 17,
  },
  unseenDot: {
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: '#007aff',
  },
  typingAnimate: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10
  }
})