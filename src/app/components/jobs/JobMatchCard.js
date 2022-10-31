import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { useJob } from "app/hooks/jobsHooks"
import { convertClassicDate } from "app/utils/dateUtils"
import React from 'react'
import JobCard from "./JobCard"

export default function JobMatchCard(props) {

  const { jobID, match, sheetOptions } = props
  const job = useJob(jobID)
  const navigation = useNavigation()

  return <JobCard
    jobID={match?.jobID}
    key={match?.jobID}
    mainIcon={<FontAwesome name="handshake-o" size={20} color="#fff" />}
    title={job?.title}
    subtitleText1={job?.companyName}
    SubtitleIcon1={FontAwesome}
    subtitleIconName1="building-o"
    subtitleText2={`Matched: ${convertClassicDate(match?.dateCreated?.toDate())}`}
    SubtitleIcon2={MaterialCommunityIcons}
    subtitleIconName2="calendar-check-outline"
    sheetOptions={sheetOptions}
    onPress={() => navigation.navigate('Job', {jobID: match.jobID})}
  />
}
