import { useJobMatches } from "app/hooks/jobsHooks"
import { StoreContext } from "app/store/store"
import React, { useContext, useState } from 'react'
import { View, StyleSheet } from "react-native"
import JobCard from "./JobCard"
import { Feather, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation } from "@react-navigation/native"
import JobMatchCard from "./JobMatchCard"

export default function JobMatches() {

  const { myUserID } = useContext(StoreContext) 
  const [matchesLimit, setMatchesLimit] = useState(10)
  const jobMatches = useJobMatches(myUserID, matchesLimit)
  const navigation = useNavigation()

  const sheetOptions = (match) => {
    return [
      {
        title: 'Cancel Match', 
        onPress: () => console.log('Cancel Match'), 
        icon: <MaterialCommunityIcons name="cancel" style={{marginRight: 10}} size={24} color="#333" />
      },
      {
        title: 'View Job', 
        onPress: () => navigation.navigate('Job', {jobID: match.jobID}),
        icon: <Feather name="briefcase" style={{marginRight: 10}} size={24} color="#333" />
      },
      {
        title: 'View Company Profile', 
        onPress: () => console.log('Company Profile'),
        icon: <FontAwesome name="building-o" style={{marginRight: 10}} size={24} color="#333" />
      },
    ]
  }

  const jobMatchesList = jobMatches?.map((match, index) => {
    return <JobMatchCard
      key={index}
      jobID={match.jobID}
      match={match}
      sheetOptions={sheetOptions(match)}
    />
  })

  return (
    <View style={styles.matchesList}>
      {jobMatchesList}
    </View>
  )
}

const styles = StyleSheet.create({
  matchesList: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 15
  }
})