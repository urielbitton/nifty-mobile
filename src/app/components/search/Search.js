import { Feather, Ionicons } from "@expo/vector-icons"
import { jobsIndex } from "app/algolia"
import { useInstantSearch } from "app/hooks/searchHooks"
import { colors } from "app/utils/colors"
import { LinearGradient } from "expo-linear-gradient"
import React, { useState } from 'react'
import { Text, View, StyleSheet, TextInput } from "react-native"
import Screen from "../layout/Screen"
import GoBackBar from "../ui/GoBackBar"
import IconContainer from "../ui/IconContainer"
import SearchJobItem from "./SearchJobItem"

export default function Search() {

  const [query, setQuery] = useState('')
  const [searchString, setSearchString] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [numOfPages, setNumOfPages] = useState(1)
  const [pageNum, setPageNum] = useState(0)
  const [numOfHits, setNumOfHits] = useState(0)
  const [hitsPerPage, setHitsPerPage] = useState(5)
  const [loading, setLoading] = useState(false)
  const filters = ''

  const results = useInstantSearch(
    query,
    searchResults,
    setSearchResults,
    jobsIndex,
    filters,
    setNumOfHits,
    setNumOfPages,
    pageNum,
    hitsPerPage,
    setLoading
  )

  const resultsList = results?.map((result, index) => {
    return <SearchJobItem
      result={result}
      key={index}
    />
  })

  return (
    <Screen>
      <LinearGradient 
        colors={[colors.primary, colors.darkPrimary]} 
        style={styles.header}
      >
        <GoBackBar 
          backgroundColor="transparent"
          iconColor="#fff"
        />
        <TextInput
          style={styles.searchInput}
          onChangeText={setSearchString}
          value={searchString}
          returnKeyType="search"
          onSubmitEditing={() => setQuery(searchString)}
          placeholder="Search jobs..."
          placeholderTextColor="rgba(255,255,255,0.7)"
        />
        <View style={styles.filtersBar}>
          <Feather
            name="sliders"
            size={20}
            color="#fff"
            style={styles.filterIcon}
          />
          <Ionicons 
            name="ios-filter-outline" 
            size={20} 
            color="#fff" 
            style={styles.filterIcon}
          />
        </View>
      </LinearGradient>
      <View style={styles.searchContent}>
        <View style={styles.searchResults}>
          {resultsList}
        </View>
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  header: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingHorizontal: 15,
    paddingBottom: 10,
  },
  searchInput: {
    color: "#fff",
    fontSize: 18,
    borderColor: 'rgba(255,255,255,0.2)',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  filtersBar: {
    flexDirection: "row",
    paddingTop: 10,
    justifyContent: "flex-end",
  },
  filterIcon: {
    marginLeft: 12,
  }
})