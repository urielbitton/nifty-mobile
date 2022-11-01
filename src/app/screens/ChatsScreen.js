import { AntDesign, Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { colors } from "app/utils/colors"
import React from 'react'
import { useState } from "react"
import { Text, View, StyleSheet, ScrollView, 
  Pressable, TextInput } from "react-native"

export default function ChatScreen() {

  const [query, setQuery] = useState('')
  const [searchString, setSearchString] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [numOfPages, setNumOfPages] = useState(1)
  const [pageNum, setPageNum] = useState(0)
  const [numOfHits, setNumOfHits] = useState(0)
  const hitsLimit = 10
  const [hitsPerPage, setHitsPerPage] = useState(hitsLimit)
  const [loading, setLoading] = useState(false)
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <View style={styles.headerBar}>
        <Text style={styles.mainTitle}>Messages</Text>
        <Pressable 
          style={styles.newChatButton}
          onPress={() => navigation.navigate("NewChat")}
          android_ripple={{color: '#ddd'}}
        >
          <AntDesign name="plus" size={19} color="black" />
        </Pressable>
      </View>
      <View style={styles.searchBar}>
        <TextInput
          onChangeText={(text) => setSearchString(text)}
          returnKeyLabel="Search"
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
          
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
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
    backgroundColor: '#eee',
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
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
  }
})