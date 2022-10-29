import { useJob } from "app/hooks/jobsHooks"
import React, { useContext } from 'react'
import { View, Text, StyleSheet } from "react-native"
import Constants from 'expo-constants'
import { Image } from "react-native"
import { convertClassicDate } from "app/utils/dateUtils"
import GoBackBar from "app/components/ui/GoBackBar"
import { colors } from "app/utils/colors"
import { Avatar, Button } from "@rneui/themed"
import { useNavigation } from "@react-navigation/native"
import { StoreContext } from "app/store/store"
import Screen from "app/components/layout/Screen"
import IconContainer from "app/components/ui/IconContainer"
import { Ionicons } from "@expo/vector-icons"

export default function JobScreen(props) {

  const { myUser, myUserName, myInterestedJobIDs } = useContext(StoreContext)
  const { jobID } = props?.route?.params
  const job = useJob(jobID)
  const navigation = useNavigation()
  const myUserIsInterested = myInterestedJobIDs?.includes(jobID)

  const tagsList = job?.tags?.map((tag, index) => {
    return <Button
      key={index}
      title={`#${tag}`}
      titleStyle={{ color: colors.primary }}
      buttonStyle={styles.chip}
      containerStyle={styles.chipContainer}
      onPress={() => navigation.navigate('Search', { search: tag })}
      type="outline"
    />
  })

  const skillsList = job?.skillsRequired?.map((skill, index) => {
    return <View
      style={styles.skillRow}
      key={index}
    >
      <IconContainer
        backgroundColor={colors.primary}
        IconComponent={Ionicons}
        iconColor="#fff"
        iconSize={16}
        dimensions={30}
        iconName="hammer"
        borderRadius={100}
      />
      <View style={styles.skillTexts}>
        <Text style={styles.skillName}>{skill.name}</Text>
        <Text style={styles.skillExperience}>{skill.experience}</Text>
      </View>
    </View>
  })

  return (
    <Screen>
      <View style={styles.container}>
        <GoBackBar />
        <View style={styles.intro}>
          <Image
            source={{ uri: job?.coverImg }}
            style={styles.coverImg}
          />
          <Text style={styles.title}>{job?.title}</Text>
          <Text style={styles.companyName}>{job?.companyName}</Text>
          <Text style={styles.status}>Job Status: {job?.status}</Text>
          <View style={styles.skillsSection}>
            {skillsList}
          </View>
          <Text style={styles.description}>
            <Text style={styles.descriptionTitle}>Job Description</Text>
            {"\n"}{"\n"}
            {job?.description}
          </Text>
          <View style={styles.hr} />
          <View>
            <Text style={styles.infoTextItem}>Posted On: {convertClassicDate(job?.dateCreated?.toDate())}</Text>
            <Text style={styles.infoTextItem}>Interests: {job?.interests}</Text>
            <Text style={styles.tagsTitle}>Tags</Text>
            <View style={styles.tagsList}>
              {tagsList}
            </View>
          </View>
          {
            myUserIsInterested &&
            <View style={styles.interestedSection}>
              <Avatar
                rounded
                size="medium"
                source={{ uri: myUser?.photoURL }}
              />
              <View style={styles.userTexts}>
                <Text style={styles.userName}>{myUserName}</Text>
                <Text style={styles.interestedText}>You expressed interest for this job</Text>
              </View>
            </View>
          }
        </View>
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    padding: 20
  },
  intro: {
    width: "100%",
  },
  coverImg: {
    width: '100%',
    height: 100,
    borderRadius: 20
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    marginTop: 20
  },
  companyName: {
    color: colors.darkGrayText,
    fontSize: 20,
    fontWeight: '400',
  },
  status: {
    color: '#999',
    fontWeight: '400',
    fontSize: 15,
    textTransform: 'capitalize'
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10
  },
  description: {
    marginVertical: 30,
    fontSize: 17,
    fontWeight: '400',
    lineHeight: 30,
    color: '#555'
  },
  hr: {
    borderBottomColor: colors.darkBlueGray,
    borderBottomWidth: 1,
    marginVertical: 20
  },
  tagsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginTop: 5,
  },
  tagsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    marginTop: 20
  },
  infoTextItem: {
    fontSize: 16,
    fontWeight: '400',
    color: '#777',
    marginBottom: 10
  },
  chipContainer: {
    marginRight: 7,
    marginBottom: 7,
    borderRadius: 40
  },
  chip: {
    paddingVertical: 5,
    borderRadius: 40,
    borderColor: colors.primary,
  },
  interestedSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    borderTopColor: colors.darkBlueGray,
    borderTopWidth: 1,
    paddingTop: 20
  },
  userTexts: {
    marginLeft: 15,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#444',
  },
  interestedText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#777',
  },
  skillsSection: {
    marginTop: 30
  },
  skillRow: {
    flexDirection: 'row',
    marginBottom: 15
  },
  skillTexts: {
    marginLeft: 15
  },
  skillName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#444',
  },
  skillExperience: {
    fontSize: 14,
    fontWeight: '400',
    color: '#777',
    textTransform: 'capitalize'
  }
})