import { FontAwesome } from "@expo/vector-icons"
import { useUser } from "app/hooks/userHooks"
import { StoreContext } from "app/store/store"
import { colors } from "app/utils/colors"
import { getTimeTextAgo } from "app/utils/dateUtils"
import { truncateText } from "app/utils/generalUtils"
import React from 'react'
import { useState } from "react"
import { useContext } from "react"
import { Pressable, View, StyleSheet, Text, Image, Vibration } from "react-native"

export default function ChatRowItem(props) {

  const { myUserID } = useContext(StoreContext)
  const { members, lastMessage, lastMessageDate, lastSenderID,
    seenBy } = props.chat
  const { sheetRef } = props
  const [showBottomSheet, setShowBottomSheet] = useState(false)
  const otherUserID = members.filter(userID => userID !== myUserID)[0]
  const otherUser = useUser(otherUserID)
  const otherUserHasSeen = seenBy?.includes(otherUserID)

  return (
    <Pressable
      style={styles.container}
      android_ripple={{ color: '#ddd' }}
      onLongPress={() => {
        Vibration.vibrate(1 * 5)
        sheetRef.current?.show()
      }}
    >
      <View style={styles.left}>
        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: otherUser?.photoURL }}
            style={styles.avatar}
          />
        </View>
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
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 60,
    overflow: 'hidden',
    marginRight: 15
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
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
    color: '#777',
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