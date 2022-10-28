import { useJobMatches } from "app/hooks/jobsHooks"
import { StoreContext } from "app/store/store"
import React, { useContext, useState } from 'react'
import { View, StyleSheet } from "react-native"
import JobMatchCard from "./JobMatchCard"

export default function JobMatches() {

  const { myUserID } = useContext(StoreContext) 
  const [matchesLimit, setMatchesLimit] = useState(10)
  const jobMatches = useJobMatches(myUserID, matchesLimit)

  const jobMatchesList = jobMatches?.map((match, index) => {
    return <JobMatchCard
      match={match}
      key={index}
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
    marginTop: 20
  }
})