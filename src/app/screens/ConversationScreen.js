import { AntDesign, Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import ChatConsole from "app/components/chats/ChatConsole"
import AppAvatar from "app/components/ui/AppAvatar"
import { useUser } from "app/hooks/userHooks"
import { StoreContext } from "app/store/store"
import { colors } from "app/utils/colors"
import { getTimeAgo } from "app/utils/dateUtils"
import React, { useContext } from 'react'
import { useState } from "react"
import { View, StyleSheet, Text, Pressable, ScrollView, } from "react-native"

export default function ConversationScreen(props) {

  const { myUserID } = useContext(StoreContext)
  const { chat } = props.route.params
  const [messageText, setMessageText] = useState("")
  const otherUserID = chat?.members?.filter(userID => userID !== myUserID)[0]
  const otherUser = useUser(otherUserID)
  const navigation = useNavigation()
  const uploadedImgs = []

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Pressable
            onPress={() => navigation.goBack()}
            android_ripple={{ color: '#ddd', borderless: true }}
            style={styles.headerBackBtn}
          >
            <AntDesign
              name="arrowleft"
              size={22}
              color={colors.primary}
            />
          </Pressable>
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
      <ScrollView>
        
      </ScrollView>
      <ChatConsole
        chatID={chat?.chatID}
        messageText={messageText}
        setMessageText={setMessageText}
        uploadedImgs={[]}
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
  headerRight: {

  }
})