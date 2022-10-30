import { AntDesign, Feather, FontAwesome, Ionicons, 
  MaterialIcons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { jobsIndex } from "app/algolia"
import { useInstantSearch } from "app/hooks/searchHooks"
import { colors } from "app/utils/colors"
import { formatCurrency } from "app/utils/generalUtils"
import { LinearGradient } from "expo-linear-gradient"
import React, { useState } from 'react'
import { Text, View, StyleSheet, TextInput, Image } from "react-native"
import JobCard from "../jobs/JobCard"
import Screen from "../layout/Screen"
import GoBackBar from "../ui/GoBackBar"
import noResultsImg from '../../../../assets/search-placeholder.png'

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
  const navigation = useNavigation()
  const noResultsFound = searchResults.length < 1 && query.length > 0 && !loading

  const jobs = useInstantSearch(
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

  const sheetOptions = (job) => {
    return [
      {
        title: 'View Similar Jobs', 
        onPress: () => console.log('View Similar Jobs'), 
        icon: <MaterialIcons name="view-column" style={{marginRight: 10}} size={24} color="#333" />
      },
      {
        title: 'View Job', 
        onPress: () => navigation.navigate('Job', {jobID: job.jobID}),
        icon: <Feather name="briefcase" style={{marginRight: 10}} size={24} color="#333" />
      },
      {
        title: 'View Company Profile', 
        onPress: () => console.log('Company Profile'),
        icon: <FontAwesome name="building-o" style={{marginRight: 10}} size={24} color="#333" />
      },
    ]
  }

  const resultsList = jobs?.map((job, index) => {
    return <JobCard
      jobID={job?.jobID}
      key={index}
      mainIcon={<FontAwesome name="briefcase" size={20} color="#fff" />}
      title={job?.title}
      subtitleText1={job?.companyName}
      SubtitleIcon1={FontAwesome}
      subtitleIconName1="building-o"
      subtitleText2={`${job?.disposition}, ${job?.jobType}`}
      SubtitleIcon2={AntDesign}
      subtitleIconName2="enviromento"
      additionalInfo={
        <View>
          <Text style={styles.additionalItem}>{job?.jobCity}, {job?.jobCountry}</Text>
          <Text style={styles.additionalItem}>
            Salary: {formatCurrency(job?.salary?.min, job?.currency?.symbol)} - {formatCurrency(job?.salary?.max, job?.currency?.symbol)}
          </Text>
        </View>
      }
      sheetOptions={sheetOptions(job)}
      onPress={() => navigation.navigate('Job', {jobID: job.jobID})}
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
        <View style={styles.searchInputContainer}>
          <TextInput
            style={styles.searchInput}
            onChangeText={setSearchString}
            value={searchString}
            returnKeyType="search"
            onSubmitEditing={() => setQuery(searchString)}
            placeholder="Search jobs..."
            placeholderTextColor="rgba(255,255,255,0.7)"
          />
          {
            searchString.length > 0 ?
            <Ionicons
              name="close-circle"
              size={24}
              color="#fff"
              onPress={() => {
                setSearchString('')
                setQuery('')
              }}
              style={styles.searchIcon}
            /> : 
            <Ionicons
              name="search"
              size={22}
              color="rgba(255,255,255,0.7)"
              style={styles.searchIcon}
            />
          }
        </View>
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
          {
            !noResultsFound ?
            resultsList :
            <View style={styles.noResults}>
              <Image
                source={noResultsImg}
                style={styles.noResultsImg}
              />
              <Text style={styles.noResultsText}>No results found.</Text>
            </View>
          }
        </View>
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  header: {
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingHorizontal: 15,
    paddingBottom: 10,
  },
  searchInputContainer: {
    width: '100%',
  },  
  searchInput: {
    color: "#fff",
    fontSize: 18,
    borderColor: 'rgba(255,255,255,0.2)',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  searchIcon: {
    position: 'absolute',
    top: 12,
    right: 10,
  },  
  filtersBar: {
    flexDirection: "row",
    paddingTop: 10,
    justifyContent: "flex-end",
  },
  filterIcon: {
    marginLeft: 12,
  },
  searchContent: {
    padding: 10,
    width: "100%",
    alignItems: "center",
  },
  searchResults: {
    width: "100%",
  },
  additionalItem: {
    fontSize: 14,
    color: colors.darkGrayText,
    fontWeight: '400',
    marginBottom: 3
  },
  noResults: {
    alignItems: "center",
    justifyContent: "center"
  },
  noResultsImg: {
    height: 250,
    resizeMode: "contain",
    marginTop: 30
  },  
  noResultsText: {  
    fontSize: 21,
    color: colors.darkGrayText,
    fontWeight: '400',
  }
})