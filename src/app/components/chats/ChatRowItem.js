import React, { useContext } from 'react'
import { Pressable, View, StyleSheet, Text, Image, Vibration } from "react-native"
import { FontAwesome } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { useUser } from "app/hooks/userHooks"
import { StoreContext } from "app/store/store"
import { colors } from "app/utils/colors"
import { getTimeTextAgo } from "app/utils/dateUtils"
import { truncateText } from "app/utils/generalUtils"
import AppAvatar from "../ui/AppAvatar"

export default function ChatRowItem(props) {

  const { myUserID } = useContext(StoreContext)
  const { members, lastMessage, lastMessageDate, lastSenderID,
    seenBy, chatID } = props.chat
  const { sheetRef, setChatDetails } = props
  const otherUserID = members.filter(userID => userID !== myUserID)[0]
  const otherUser = useUser(otherUserID)
  const otherUserHasSeen = seenBy?.includes(otherUserID)
  const navigation = useNavigation()

  return (
    <Pressable
      key={chatID}
      style={styles.container}
      android_ripple={{ color: '#ddd' }}
      onPress={() => navigation.navigate('Conversation', { chat: props.chat })}
      onLongPress={() => {
        Vibration.vibrate(1 * 5)
        setChatDetails(props.chat)
        sheetRef.current?.show()
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
          <Text style={styles.lastMessageText}>
            {lastSenderID === myUserID ? 'You: ' : ''}
            {truncateText(lastMessage, 30)}
          </Text>
          <Text style={styles.timestamp}>{getTimeTextAgo(lastMessageDate?.toDate())}</Text>
        </View>
      </View>
      <View style={styles.right}>
        {
          lastSenderID === myUserID && !otherUserHasSeen ?
          <FontAwesome
            name="check-circle"
            size={17}
            color={colors.darkBlueGray}
          /> :
          <Image
            source={{ uri: otherUser?.photoURL }}
            style={styles.seenAvatar}
          />
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
  lastMessageText: {
    fontSize: 14,
    color: '#444',
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
  }
})