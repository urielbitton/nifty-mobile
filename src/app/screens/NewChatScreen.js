import { usersIndex } from "app/algolia"
import ChatConsole from "app/components/chats/ChatConsole"
import Screen from "app/components/layout/Screen"
import AppAvatar from "app/components/ui/AppAvatar"
import GoBackBtn from "app/components/ui/GoBackBtn"
import { useInstantSearch } from "app/hooks/searchHooks"
import { getRandomDocID } from "app/services/crudDB"
import { StoreContext } from "app/store/store"
import { colors } from "app/utils/colors"
import React from 'react'
import { useEffect } from "react"
import { useContext } from "react"
import { useState } from "react"
import { View, StyleSheet, Text, Pressable, Dimensions } from "react-native"
import { TextInput } from "react-native-gesture-handler"

const screenHeight = Dimensions.get('window').height

export default function NewChatScreen() {

  const { setPageLoading, selectedNewChatUser,
    setSelectedNewChatUser, myUserID, myUserName } = useContext(StoreContext)
  const [query, setQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [numOfPages, setNumOfPages] = useState(1)
  const [pageNum, setPageNum] = useState(0)
  const [numOfHits, setNumOfHits] = useState(0)
  const hitsLimit = 10
  const [hitsPerPage, setHitsPerPage] = useState(hitsLimit)
  const [chatID, setChatID] = useState(null)
  const [messageText, setMessageText] = useState("")
  const filters = ''
  const showAll = false
  const chatMembers = [selectedNewChatUser?.userID, myUserID]
  const searchNames = [`${selectedNewChatUser?.firstName} ${selectedNewChatUser?.lastName}`, myUserName]

  const users = useInstantSearch(
    query,
    searchResults,
    setSearchResults,
    usersIndex,
    filters,
    setNumOfHits,
    setNumOfPages,
    pageNum,
    hitsPerPage,
    setPageLoading,
    showAll
  )

  const usersList = users?.map((user, index) => {
    return <Pressable
      key={index}
      onPress={() => setSelectedNewChatUser(user)}
      android_ripple={{ color: '#ddd', borderless: false }}
      style={styles.userItem}
    >
      <AppAvatar
        dimensions={35}
        source={user?.photoURL}
        style={{ marginRight: 10 }}
      />
      <Text style={styles.userItemText}>{user.firstName} {user.lastName}</Text>
    </Pressable>
  })

  useEffect(() => {
    if(selectedNewChatUser) {
      setChatID(getRandomDocID('chats'))
    }
  },[selectedNewChatUser])

  useEffect(() => {
    return () => setSelectedNewChatUser(null)
  },[])

  return (
    <Screen style={styles.container}>
      <View style={styles.header}>
        <GoBackBtn
          rippleColor='#ddd'
        />
        <Text style={styles.title}>New Message</Text>
      </View>
      <View style={styles.searchBar}>
        <TextInput
          placeholder="Type a name..."
          style={styles.searchInput}
          value={query}
          onChangeText={(text) => setQuery(text)}
          cursorColor={colors.primary}
          autoFocus
        />
      </View>
      {
        !selectedNewChatUser ?
          <View style={styles.searchResults}>
            {usersList}
          </View> :
          <View style={styles.selectedUserChat}>
            <View style={styles.selectedUserChatTop}>
              <AppAvatar
                dimensions={70}
                source={selectedNewChatUser?.photoURL}
                style={{ marginRight: 10 }}
              />
              <Text style={styles.selectedUserChatTitle}>
                {selectedNewChatUser.firstName} {selectedNewChatUser.lastName}
              </Text>
            </View>
            <View style={styles.selectedUserChatBottom}>
              <ChatConsole
                messagePath={`chats/${chatID}/messages`}
                chatPath="chats"
                storagePath={`chats/${chatID}/messages`}
                chatID={chatID}
                chatMembers={chatMembers}
                searchNames={searchNames}
                messageText={messageText}
                setMessageText={setMessageText}
                uploadedImg={null}
                setUploadedImg={null}
                newChat
                handleInputFocus={() => {}}
                handleInputBlur={() => {}}
              />
            </View>
          </View>
      }
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
  },
  searchBar: {
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderBottomColor: 'rgba(0,0,0,0.04)',
    borderBottomWidth: 1,
  },
  searchInput: {
    width: '100%',
    fontSize: 16,
  },
  searchResults: {},
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    overflow: 'hidden',
  },
  userItemText: {
    fontSize: 16,
  },
  selectedUserChat: {
    height: screenHeight - 90,
    justifyContent: 'space-between',
  },
  selectedUserChatTop: {
    paddingTop: 20,
    alignItems: 'center',
  },
  selectedUserChatTitle: {
    fontSize: 22,
    fontWeight: '500',
    marginTop: 10,
    textAlign: 'center',
  },
})