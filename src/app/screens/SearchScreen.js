import React, { useState } from 'react'
import {
  AntDesign, Feather, FontAwesome,
  Ionicons, MaterialIcons
} from "@expo/vector-icons"
import { Button, Chip } from "@rneui/themed"
import { useNavigation, useRoute } from "@react-navigation/native"
import { useInstantSearch } from "app/hooks/searchHooks"
import { colors } from "app/utils/colors"
import { formatCurrency } from "app/utils/generalUtils"
import { LinearGradient } from "expo-linear-gradient"
import { Text, View, StyleSheet, TextInput, Image, Dimensions, ScrollView } from "react-native"
import searchPlaceholder from '../../../assets/search-placeholder.png'
import noResultsPlaceholder from '../../../assets/no-results-placeholder.png'
import MultiSlider from "@ptomasroos/react-native-multi-slider"
import { jobEnvironmentOptions, jobTypesOptions,
  sortByOptions } from "app/data/searchFiltersData"
import { useRef } from "react"
import GestureBottomSheet from "app/components/ui/GestureBottomSheet"
import AppCheckbox from "app/components/ui/AppCheckbox"
import { useEffect } from "react"
import JobCard from "app/components/jobs/JobCard"

const screenHeight = Dimensions.get('window').height

export default function SearchScreen() {

  const route = useRoute()
  const [query, setQuery] = useState('')
  const [searchString, setSearchString] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [numOfPages, setNumOfPages] = useState(1)
  const [pageNum, setPageNum] = useState(0)
  const [numOfHits, setNumOfHits] = useState(0)
  const hitsLimit = 10
  const [hitsPerPage, setHitsPerPage] = useState(hitsLimit)
  const [loading, setLoading] = useState(false)
  const [jobType, setJobType] = useState([])
  const [jobTypeFilter, setJobTypeFilter] = useState([])
  const [jobEnvironment, setJobEnvironment] = useState([])
  const [jobEnvironmentFilter, setJobEnvironmentFilter] = useState([])
  const [jobCity, setJobCity] = useState('')
  const [jobCityFilter, setJobCityFilter] = useState('')
  const [salaryRange, setSalaryRange] = useState([0, 1000000])
  const [salaryRangeFilter, setSalaryRangeFilter] = useState([0, 1000000])
  const [sortBy, setSortBy] = useState(sortByOptions[0])
  const [sortByIndex, setSortByIndex] = useState(sortByOptions[0].index)
  const filtersSheetRef = useRef(null)
  const sortSheetRef = useRef(null)
  const navigation = useNavigation()
  const noResultsFound = searchResults.length < 1 && query.length > 0 && !loading
  const hasMoreResults = query.length > 0 && numOfHits > (pageNum + 1) * hitsPerPage
  const emptySearch = query.length < 1 && searchResults.length < 1

  const emptyFilter = 'jobType != 0 AND'
  const jobTypeFilters = jobTypeFilter.length ? `jobType:${jobTypeFilter.join(' OR jobType:')} AND` : emptyFilter
  const jobEnvironmentFilters = jobEnvironmentFilter.length ? `disposition:${jobEnvironmentFilter.join(' OR disposition:')} AND` : emptyFilter
  const jobCityFilters = jobCityFilter.length ? `jobCity:${jobCityFilter} AND` : emptyFilter
  const salaryFilters = `salary.min >= ${salaryRangeFilter[0]} AND salary.max <= ${salaryRangeFilter[1]} AND`
  const filters = `${jobTypeFilters} ${jobEnvironmentFilters} ${jobCityFilters} ${salaryFilters} jobType != 0`

  const jobs = useInstantSearch(
    query,
    searchResults,
    setSearchResults,
    sortByIndex,
    filters,
    setNumOfHits,
    setNumOfPages,
    pageNum,
    hitsPerPage,
    setLoading
  )

  const jobTypesOptionsRender = jobTypesOptions.map((option, index) => {
    return <Chip 
      key={index}
      containerStyle={styles.filterChipContainer}
      buttonStyle={[styles.filterChip, jobType?.includes(option.value) && styles.filterChipActive]}
      titleStyle={styles.filterChipText}
      title={option.label}
      onPress={() => {
        if (jobType?.includes(option.value)) {
          setJobType(jobType?.filter((item) => item !== option.value))
        }
        else {
          setJobType([...jobType, option.value])
        }
      }}
    />
  })

  const jobEnvironmentsOptionsRender = jobEnvironmentOptions.map((option, index) => {
    return <Chip
      key={index}
      containerStyle={styles.filterChipContainer}
      buttonStyle={[styles.filterChip, jobEnvironment?.includes(option.value) && styles.filterChipActive]}
      titleStyle={styles.filterChipText}
      title={option.label}
      onPress={() => {
        if (jobEnvironment?.includes(option.value)) {
          setJobEnvironment(jobEnvironment?.filter((item) => item !== option.value))
        }
        else {
          setJobEnvironment([...jobEnvironment, option.value])
        }
      }}
    />
  })

  const sortByOptionsRender = sortByOptions?.map((option, index) => {
    return <AppCheckbox
      key={index}
      title={option.label}
      containerStyle={styles.sortByCheckboxContainer}
      checked={option.value === sortBy.value}
      onPress={() => setSortBy(option)}
    />
  })

  const sheetOptions = (job) => {
    return [
      {
        title: 'View Similar Jobs',
        onPress: () => console.log('View Similar Jobs'),
        icon: <MaterialIcons name="view-column" style={{ marginRight: 10 }} size={24} color="#333" />
      },
      {
        title: 'View Job',
        onPress: () => navigation.navigate('Job', { jobID: job.jobID }),
        icon: <Feather name="briefcase" style={{ marginRight: 10 }} size={24} color="#333" />
      },
      {
        title: 'View Company Profile',
        onPress: () => console.log('Company Profile'),
        icon: <FontAwesome name="building-o" style={{ marginRight: 10 }} size={24} color="#333" />
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
      subtitleText2={`${job?.disposition}, ${job?.jobType.replace('-', ' ')}`}
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
      onPress={() => navigation.navigate('Job', { jobID: job.jobID })}
    />
  })

  const clearFilters = () => {
    setJobTypeFilter([])
    setJobEnvironmentFilter([])
    setJobCityFilter('')
    setSalaryRangeFilter([0, 1000000])
    setSalaryRange([0, 1000000])
    filtersSheetRef.current.close()
  }
  
  const applyFilters = () => {
    setJobTypeFilter(jobType)
    setJobEnvironmentFilter(jobEnvironment)
    setJobCityFilter(jobCity)
    setSalaryRangeFilter(salaryRange)
    filtersSheetRef.current.close()
  }

  const clearSorting = () => {
    setSortBy(sortByOptions[0])
    sortSheetRef.current.close()
  }

  const applySorting = () => {
    setSortByIndex(sortBy.index)
    sortSheetRef.current.close()
  }

  useEffect(() => {
    if(route?.params?.search) {
      setSearchString(route.params.search)
      setQuery(route.params.search)
    }
  },[route?.params])

  return (
    <View>
      <LinearGradient
        colors={[colors.primary, colors.darkPrimary]}
        style={styles.header}
      >
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
            <Button
              title="Filters"
              icon={
                <Feather
                  name="filter"
                  size={14}
                  color="#fff"
                  style={{ marginRight: 5 }}
                />
              }
              containerStyle={styles.filterBtnContainer}
              titleStyle={styles.filterBtnText}
              buttonStyle={styles.filterBtn}
              onPress={() => filtersSheetRef.current.show()}
            />
            <Button
              title="Sort"
              icon={
                <Ionicons
                  name="ios-filter-outline"
                  size={17}
                  color="#fff"
                  style={{ marginRight: 5 }}
                />
              }
              containerStyle={styles.filterBtnContainer}
              buttonStyle={styles.filterBtn}
              titleStyle={styles.filterBtnText}
              onPress={() => sortSheetRef.current.show()}
            />
          </View>
        </View>
      </LinearGradient>
      <ScrollView contentContainerStyle={styles.searchContent}>
        { 
          query.length > 0 && !loading &&
          <Text style={styles.resultsFound}>{numOfHits} results found</Text>
        }
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
              onPress={() => setHitsPerPage(prev => prev + hitsLimit)}
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
      </ScrollView>
      <GestureBottomSheet
        height={screenHeight - 100}
        sheetRef={filtersSheetRef}
      >
        <View style={styles.filtersContainer}>
          <Text style={styles.filterTitle}>Filters</Text>
          <View style={styles.filtersSection}>
            <Text style={styles.filterSectionTitle}>Job Type</Text>
            <View style={styles.filtersFlex}>
              {jobTypesOptionsRender}
            </View>
          </View>
          <View style={styles.filtersSection}>
            <Text style={styles.filterSectionTitle}>Job Environment</Text>
            <View style={styles.filtersFlex}>
              {jobEnvironmentsOptionsRender}
            </View>
          </View>
          <View style={[styles.filtersSection]}>
            <Text style={styles.filterSectionTitle}>Job City</Text>
            <View>
              <TextInput
                style={styles.filtersInput}
                onChangeText={setJobCity}
                value={jobCity}
                placeholder="Enter a City"
                placeholderTextColor="#ccc"
              />
            </View>
          </View>
          <View style={[styles.filtersSection]}>
            <Text style={styles.filterSectionTitle}>
              Salary Range: ${formatCurrency(salaryRange[0], '')} - ${formatCurrency(salaryRange[1], '')}
            </Text>
            <View style={styles.sliderContainer}>
              <MultiSlider
                isMarkersSeparated={true}
                onValuesChangeFinish={(value) => setSalaryRange(value)}
                values={salaryRange}
                min={10000}
                max={1000000}
                step={1000}
                enableLabel
                customMarkerLeft={() => <View style={styles.sliderCircle} />}
                customMarkerRight={() => <View style={styles.sliderCircle} />}
              />
            </View>
          </View>
        </View>
        <View style={styles.filtersActionsBar}>
          <Button
            title="Clear Filters"
            onPress={clearFilters}
            icon={
              <MaterialIcons
                name="clear"
                size={20}
                color="#fff"
                style={{ marginRight: 10 }}
              />
            }
            containerStyle={[styles.filterBtnContainer, styles.bottomFilterBtnContainer]}
            buttonStyle={styles.clearFiltersBtn}
            titleStyle={{ color: '#fff' }}
          />
          <Button
            title="Apply Filters"
            onPress={() => applyFilters()}
            icon={
              <Ionicons
                name="ios-filter-outline"
                size={20}
                color="#fff"
                style={{ marginRight: 10 }}
              />
            }
            containerStyle={[styles.filterBtnContainer, styles.bottomFilterBtnContainer]}
            buttonStyle={styles.applyFiltersBtn}
          />
        </View>
      </GestureBottomSheet>
      <GestureBottomSheet
        height={500}
        sheetRef={sortSheetRef}
      >
        <View style={styles.filtersContainer}>
          <Text style={styles.filterTitle}>Sort Results</Text>
          <View style={styles.filtersSection}>
            <View style={styles.pickerContainer}>
              {sortByOptionsRender}
            </View>
          </View>
        </View>
        <View style={styles.filtersActionsBar}>
          <Button
            title="Clear Sort"
            onPress={clearSorting}
            icon={
              <MaterialIcons
                name="clear"
                size={20}
                color="#fff"
                style={{ marginRight: 10 }}
              />
            }
            containerStyle={[styles.filterBtnContainer, styles.bottomFilterBtnContainer]}
            buttonStyle={styles.clearFiltersBtn}
            titleStyle={{ color: '#fff' }}
          />
          <Button
            title="Apply Sort"
            onPress={applySorting}
            icon={
              <Ionicons
                name="ios-filter-outline"
                size={20}
                color="#fff"
                style={{ marginRight: 10 }}
              />
            }
            containerStyle={[styles.filterBtnContainer, styles.bottomFilterBtnContainer]}
            buttonStyle={styles.applyFiltersBtn}
          />
        </View>
      </GestureBottomSheet>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingTop: 20,
    padding: 15,
    paddingBottom: 5,
    zIndex: 200
  },
  searchInputContainer: {
    width: '100%',
  },
  searchInput: {
    color: "#fff",
    fontSize: 16,
    borderColor: 'rgba(255,255,255,0.4)',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 7
  },
  searchIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  filtersBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 5,
    paddingHorizontal: 5,
    justifyContent: "space-between",
  },
  filtersBarSide: {
    flexDirection: "row",
    alignItems: "center",
    width: '100%',
  },
  filterBtnContainer: {
    borderRadius: 10,
    width: "50%",
  },
  filterBtn: {
    backgroundColor: 'transparent',
    paddingVertical: 10,
    borderRadius: 10,
  },
  filterBtnText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: '400'
  },
  //filters container
  filtersContainer: {
    padding: 20,
    paddingTop: 10,
    height: '85%',
  },
  filterTitle: {
    fontSize: 19,
    fontWeight: '600',
    marginTop: 5,
    marginBottom: 10
  },
  filtersSection: {
    width: '100%',
    paddingBottom: 20,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  filtersFlex: {
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  pickerContainer: {
    width: '100%',
    marginTop: 20
  },
  sortByCheckboxContainer: {
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 15,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },  
  sliderContainer: {
    paddingHorizontal: 10,
    paddingLeft: 20,
    width: '100%',
    marginTop: 25
  },
  sortPicker: {
    fontSize: 16,
  },
  filterSectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginVertical: 10,
  },
  filtersInput: {
    fontSize: 16,
    borderColor: 'rgba(0,0,0,0.5)',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  filterChipContainer: {
    marginBottom: 5,
    marginRight: 5
  },
  filterChip: {
    borderColor: colors.primary,
    backgroundColor: 'transparent',
    borderWidth: 1,
  },
  filterChipActive: {
    backgroundColor: colors.lightPrimary,
  },
  filterChipText: {
    color: colors.primary,
  },
  sliderCircle: {
    width: 20,
    height: 20,
    borderRadius: 20,
    backgroundColor: colors.primary,
  },
  filtersActionsBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    bottom: 0,
    left: 0,
    padding: 20,
    width: '100%',
  },
  bottomFilterBtnContainer: {
    width: "48%",
  },
  applyFiltersBtn: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    padding: 15
  },
  clearFiltersBtn: {
    backgroundColor: colors.secondary,
    borderRadius: 10,
    padding: 15
  },
  searchContent: {
    alignItems: "center",
    width: "100%",
    padding: 10,
    paddingBottom: 120
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
    marginVertical: 20,
  },
  resultsFound: {
    fontSize: 14,
    fontWeight: '400',
    alignSelf: 'flex-start',
    paddingVertical: 10
  },
})