import { AntDesign, Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import ChatConsole from "app/components/chats/ChatConsole"
import ChatRowItem from "app/components/chats/ChatRowItem"
import GestureBottomSheet from "app/components/ui/GestureBottomSheet"
import { useChats } from "app/hooks/chatHooks"
import { StoreContext } from "app/store/store"
import { colors } from "app/utils/colors"
import React from 'react'
import { useContext } from "react"
import { useRef } from "react"
import { useState } from "react"
import { Text, View, StyleSheet, ScrollView, 
  Pressable, TextInput } from "react-native"

export default function ChatScreen() {

  const { myUserID } = useContext(StoreContext)
  const [query, setQuery] = useState('')
  const [searchString, setSearchString] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [numOfPages, setNumOfPages] = useState(1)
  const [pageNum, setPageNum] = useState(0)
  const [numOfHits, setNumOfHits] = useState(0)
  const hitsLimit = 10
  const [hitsPerPage, setHitsPerPage] = useState(hitsLimit)
  const [messageText, setMessageText] = useState('')
  const [showNewChatModal, setShowNewChatModal] = useState(false)
  const [chatDetails, setChatDetails] = useState(null)
  const chats = useChats(myUserID)
  const navigation = useNavigation()
  const sheetRef = useRef(null)

  const chatsList = chats?.map((chat, index) => {
    return <ChatRowItem
      key={index}
      chat={chat}
      setChatDetails={setChatDetails}
      sheetRef={sheetRef}
    />
  })

  return (
    <View style={styles.container}>
      <View style={styles.headerBar}>
        <Text style={styles.mainTitle}>Messages</Text>
        <Pressable 
          style={styles.newChatButton}
          onPress={() => setShowNewChatModal(true)}
          android_ripple={{color: '#ddd', borderless: true}}
        >
          <AntDesign name="plus" size={19} color="black" />
        </Pressable>
      </View>
      <View style={styles.searchBar}>
        <TextInput
          onChangeText={(text) => setSearchString(text)}
          returnKeyLabel="Search"
          placeholder="Search"
          cursorColor="#ccc"
          value={searchString}
          style={styles.searchInput}
        />
        {
          searchString.length > 0 ?
          <Ionicons
            name="close-circle"
            size={22}
            color="#aaa"
            onPress={() => {
              setSearchString('')
              setQuery('')
              setSearchResults([])
            }}
            style={styles.searchIcon}
          /> :
          <Ionicons
            name="search"
            size={20}
            color="#aaa"
            style={styles.searchIcon}
          />
        }
      </View>
      <ScrollView>
        <View style={styles.chatContent}>
          {chatsList}
        </View>
      </ScrollView>
      <GestureBottomSheet
        height={600}
        sheetRef={sheetRef}
      >
        <Text>Chat ID: {chatDetails?.chatID}</Text>
      </GestureBottomSheet>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.appBg,
  },
  headerBar: {
    width: '100%',
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  mainTitle: {
    fontSize: 22,
    fontWeight: '600',
  },
  newChatButton: {
    width: 30,
    height: 30,
    borderRadius: 30,
    backgroundColor: '#f1f1f1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBar: {
    width: '100%',
    paddingHorizontal: 15,
    paddingVertical: 10,
    paddingTop: 5,
    backgroundColor: '#fff'
  },
  searchInput: {
    width: '100%',
    padding: 7,
    paddingLeft: 20,
    borderRadius: 40,
    backgroundColor: '#f1f1f1',
    fontSize: 16,
  },
  searchIcon: {
    position: 'absolute',
    top: 15,
    right: 30,
  },
  //chat content
  chatContent: {
    width: '100%',
    paddingVertical: 10,
    backgroundColor: '#fff',
  }
})