import { AntDesign, Feather, FontAwesome, Ionicons, 
  MaterialIcons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { jobsIndex } from "app/algolia"
import { useInstantSearch } from "app/hooks/searchHooks"
import { colors } from "app/utils/colors"
import { formatCurrency } from "app/utils/generalUtils"
import { LinearGradient } from "expo-linear-gradient"
import React, { useState } from 'react'
import { Text, View, StyleSheet, TextInput, Image, Pressable } from "react-native"
import JobCard from "../jobs/JobCard"
import Screen from "../layout/Screen"
import GoBackBar from "../ui/GoBackBar"
import searchPlaceholder from '../../../../assets/search-placeholder.png'
import noResultsPlaceholder from '../../../../assets/no-results-placeholder.png'
import { Button, CheckBox } from "@rneui/themed"
import { jobEnvironmentOptions, jobTypesOptions } from "app/data/searchFiltersData"

export default function Search() {

  const [query, setQuery] = useState('')
  const [searchString, setSearchString] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [numOfPages, setNumOfPages] = useState(1)
  const [pageNum, setPageNum] = useState(0)
  const [numOfHits, setNumOfHits] = useState(0)
  const [hitsPerPage, setHitsPerPage] = useState(10)
  const [loading, setLoading] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [jobType, setJobType] = useState([])
  const [jobEnvironment, setJobEnvironment] = useState([])
  const [jobCity, setJobCity] = useState('')
  const [jobCityFilter, setJobCityFilter] = useState('')
  const navigation = useNavigation()
  const noResultsFound = searchResults.length < 1 && query.length > 0 && !loading
  const hasMoreResults = query.length > 0 && numOfHits > (pageNum + 1) * hitsPerPage
  const emptySearch = query.length < 1 && searchResults.length < 1

  const emptyFilter = 'jobType != 0 AND'
  const jobTypeFilters = jobType.length ? `jobType:${jobType.join(' OR jobType:')} AND` : emptyFilter
  const jobEnvironmentFilters = jobEnvironment.length ? `disposition:${jobEnvironment.join(' OR disposition:')} AND` : emptyFilter
  const jobCityFilters = jobCity.length ? `jobCity:${jobCityFilter} AND` : emptyFilter
  const filters = `${jobTypeFilters} ${jobEnvironmentFilters} ${jobCityFilters} jobType != 0`

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

  const jobTypesOptionsRender = jobTypesOptions.map((option, index) => {
    return <CheckBox
      title={option.label}
      checked={jobType.includes(option.value)}
      containerStyle={styles.filtersCheckbox}
      onPress={() => {
        if (jobType.includes(option.value)) {
          setJobType(jobType.filter((item) => item !== option.value))
        } 
        else {
          setJobType([...jobType, option.value])
        }
      }}
      checkedColor="#fff"
      checkedIcon={<AntDesign name="checksquare" size={21} color="#fff" />}
      uncheckedIcon={<AntDesign name="checksquareo" size={21} color="#fff" />}
      textStyle={styles.filtersCheckboxText}
      key={index}
    />
  })

  const jobEnvironmentsOptionsRender = jobEnvironmentOptions.map((option, index) => {
    return <CheckBox
      title={option.label}
      checked={jobEnvironment.includes(option.value)}
      containerStyle={styles.filtersCheckbox}
      onPress={() => {
        if (jobEnvironment.includes(option.value)) {
          setJobEnvironment(jobEnvironment.filter((item) => item !== option.value))
        } 
        else {
          setJobEnvironment([...jobEnvironment, option.value])
        }
      }}
      checkedColor="#fff"
      checkedIcon={<AntDesign name="checksquare" size={21} color="#fff" />}
      uncheckedIcon={<AntDesign name="checksquareo" size={21} color="#fff" />}
      textStyle={styles.filtersCheckboxText}
      key={index}
    />
  })

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
      subtitleText2={`${job?.disposition}, ${job?.jobType.replace('-',' ')}`}
      SubtitleIcon2={AntDesign}
      subtitleIconName2="enviromento"
      additionalInfo={
        <View>
          <Text style={styles.additionalItem}>{job?.jobCity}, {job?.jobCountry}</Text>
          <Text style={styles.additionalItem}>
            Salary: {formatCurrency(job?.salary?.min, job?.currency?.symbol)} 
            &nbsp;-&nbsp; 
            {formatCurrency(job?.salary?.max, job?.currency?.symbol)}
          </Text>
        </View>
      }
      sheetOptions={sheetOptions(job)}
      onPress={() => navigation.navigate('Job', {jobID: job.jobID})}
    />
  })

  const clearFilters = () => {
    setJobType([])
    setJobEnvironment([])
    setShowFilters(false)
  }

  const applyFilters = () => {
    setJobCityFilter(jobCity)
    setShowFilters(false)
  }

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
                setSearchResults([])
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
          <View style={styles.filtersBarSide}>
            {
              query.length > 0 && !loading &&
              <Text style={styles.resultsFound}>{numOfHits} results found</Text>
            }
          </View>
          <View style={styles.filtersBarSide}>
            <Feather
              name="sliders"
              size={20}
              color="#fff"
              style={styles.filterIcon}
              onPress={() => setShowFilters(prev => !prev)}
            />
            <Ionicons 
              name="ios-filter-outline" 
              size={20} 
              color="#fff" 
              style={styles.filterIcon}
              onPress={() => setShowFilters(prev => !prev)}
            />
          </View>
        </View>
        {
          showFilters &&
          <View style={styles.filtersContainer}>
            <View style={styles.filtersSection}>
              <Text style={styles.filterSectionTitle}>Job Type</Text>
              <View style={styles.filterSectionItem}>
                {jobTypesOptionsRender}
              </View>
            </View>
            <View style={styles.filtersSection}>
              <Text style={styles.filterSectionTitle}>Job Environment</Text>
              <View style={styles.filterSectionItem}>
                {jobEnvironmentsOptionsRender}
              </View>
            </View>
            <View style={styles.filtersSection}>
              <Text style={styles.filterSectionTitle}>Job City</Text>
              <View style={styles.filterSectionItem}>
                <TextInput
                  style={styles.filtersInput}
                  onChangeText={setJobCity}
                  value={jobCity}
                  placeholder="Job City"
                  placeholderTextColor="rgba(255,255,255,0.7)"
                />
              </View>
            </View>
            <Button
              title="Clear Filters"
              onPress={clearFilters}
              icon={
                <MaterialIcons 
                  name="clear" 
                  size={20} 
                  color={colors.primary} 
                  style={{marginRight: 10}}
                />
              }
              containerStyle={styles.clearFiltersButtonContainer}
              buttonStyle={styles.clearFiltersButton}
              titleStyle={{color: colors.primary}}
            />
            <Button
              title="Apply Filters"
              onPress={() => applyFilters()}
              icon={
                <MaterialIcons
                  name="filter-list"
                  size={20}
                  color="#fff"
                  style={{marginRight: 10}}
                />
              }
              containerStyle={styles.applyFiltersButtonContainer}
              buttonStyle={styles.applyFiltersButton}
            />
          </View>
        }
      </LinearGradient>
      {
        showFilters && searchResults.length > 0 &&
        <Pressable 
          style={styles.searchContentCover} 
          onPress={() => setShowFilters(false)}
        />
      }
      <View style={styles.searchContent}>
        <View style={styles.searchResults}>
          {
            !noResultsFound ?
            resultsList :
            <View style={styles.noResults}>
              <Image
                source={noResultsPlaceholder}
                style={styles.noResultsImg}
              />
              <Text style={styles.noResultsText}>No results found.</Text>
            </View>
          }
        </View>
        {
          hasMoreResults ?
          <Button
            title="Load More"
            onPress={() => setHitsPerPage(prev => prev + 3)}
            buttonStyle={styles.loadMoreBtn}
          /> :
          query.length > 0 && !loading && !noResultsFound &&
          <Text style={styles.endOfResults}>You've reached the end of the results</Text>
        }
        {
          emptySearch &&
          <View style={styles.noResults}>
            <Image
              source={searchPlaceholder}
              style={styles.noResultsImg}
            />
            <Text style={styles.noResultsText}>Start searching for jobs.</Text>
          </View>
        }
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
    zIndex: 200
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
    alignItems: "center",
    paddingTop: 10,
    paddingHorizontal: 5,
    justifyContent: "space-between",
  },
  filtersBarSide: {
    flexDirection: "row",
    alignItems: "center",
  },
  resultsFound: {
    fontSize: 14,
    color: "#fff",
    fontWeight: '400',
  },
  filterIcon: {
    marginLeft: 12,
  },
  filtersContainer: {
    paddingVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexWrap: "wrap",
  },
  filtersSection: {
    width: '48%',
    marginBottom: 30,
  },
  filterSectionTitle: {
    fontSize: 16,
    color: "#fff",
    fontWeight: '400',
    marginBottom: 10
  },
  filtersInput: {
    color: "#fff",
    fontSize: 16,
    borderColor: 'rgba(255,255,255,0.2)',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  filtersCheckbox: {
    backgroundColor: 'transparent',
    marginBottom: -13
  },  
  filtersCheckboxText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: '400',
  },
  clearFiltersButtonContainer: {
    flexBasis: '100%',
  },
  applyFiltersButtonContainer: {
    flexBasis: '100%',
    marginTop: 15,
  },
  applyFiltersButton: {
    backgroundColor: colors.secondary,
    borderRadius: 10,
    width: '100%',
  },
  clearFiltersButton: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: 15,
    width: '100%',
  },
  searchContent: {
    padding: 10,
    width: "100%",
    alignItems: "center",
  },
  searchContentCover: {
    position: "absolute",
    width: "100%",
    height: "110%",
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 100,
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
    fontSize: 20,
    color: colors.darkGrayText,
    fontWeight: '400',
  },
  loadMoreBtn: {
    marginVertical: 20,
    backgroundColor: colors.primary,
    borderRadius: 10,
  },
  endOfResults: {
    fontSize: 16,
    color: colors.darkGrayText,
    fontWeight: '400',
    marginVertical: 20
  },
})