import { colors } from "app/utils/colors"
import React, { useState } from 'react'
import { View, StyleSheet } from "react-native"
import { Feather, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'
import { useJob } from "app/hooks/jobsHooks"
import { Text } from "react-native"
import { getTimeAgo } from "app/utils/dateUtils"
import TouchIcon from "../ui/TouchIcon"
import { Pressable } from "react-native"
import OptionsBottomSheet from "../ui/OptionsBottomSheet"

export default function JobMatchCard(props) {

  const { jobID, dateCreated, userID } = props.match
  const [showBottomSheet, setShowBottomSheet] = useState(false)
  const job = useJob(jobID)

  const matchOptions = [
    {
      title: 'Cancel Match', 
      onPress: () => console.log('Cancel Match'), 
      icon: <MaterialCommunityIcons name="cancel" style={{marginRight: 10}} size={24} color="#333" />
    },
    {
      title: 'View Job', 
      onPress: () => console.log('View Job'),
      icon: <Feather name="briefcase" style={{marginRight: 10}} size={24} color="#333" />
    },
    {
      title: 'View Company Profile', 
      onPress: () => console.log('Company Profile'),
      icon: <FontAwesome name="building-o" style={{marginRight: 10}} size={24} color="#333" />
    },
  ]

  return (
    <Pressable 
      style={styles.container}
      onLongPress={() => setShowBottomSheet(true)}
    >
      <View style={styles.left}>
        <View style={styles.iconContainer}>
          <FontAwesome 
            name="handshake-o" 
            size={20} 
            color="#fff" 
          />
        </View>
        <View style={styles.textInfo}>
          <Text style={styles.title}>{job?.title}</Text>
          <View style={styles.itemRow}>
            <FontAwesome 
              name="building-o" 
              size={15} 
              color={colors.darkGrayText}
              style={styles.itemRowIcon}
            />
            <Text style={styles.companyName}>{job?.companyName}</Text>
          </View>
          <View style={styles.itemRow}>
            <MaterialCommunityIcons 
              name="calendar-check-outline" 
              size={15} 
              color={colors.darkGrayText}
              style={[styles.itemRowIcon, styles.calendarIcon]}
            />
            <Text style={styles.matchedDate}>Matched: {getTimeAgo(dateCreated?.toDate(), true)}</Text>
          </View>
        </View>
      </View>
      <View style={styles.right}>
        <TouchIcon
          onPress={() => setShowBottomSheet(true)}
          iconComponent={
            <MaterialCommunityIcons 
              name="dots-vertical" 
              size={24} 
              color={colors.darkBlueGray} 
            />
          }
        />
      </View>
      <OptionsBottomSheet
        showSheet={showBottomSheet}
        setShowSheet={setShowBottomSheet}
        items={matchOptions}
      />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '93%',
    padding: 15,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: colors.grayText,
    shadowOffset: {
      width: 8,
      height: 3,
    },
    shadowOpacity: 1,
    shadowRadius: 4.65,
    elevation: 15,
    marginBottom: 8,
    borderRadius: 20,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '87%',
    marginRight: 7
  },
  iconContainer: {
    width: 45,
    height: 45,
    borderRadius: 45,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  textInfo: {

  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemRowIcon: {
    width: 20,
  },  
  calendarIcon: {
    left: -1.5
  },  
  title: {
    fontSize: 17,
    fontWeight: '500',
    marginBottom: 3
  },  
  companyName: {
    fontSize: 13,
    color: colors.darkGrayText,
    fontWeight: '400',
    marginBottom: 3
  },
  matchedDate: {
    fontSize: 12,
    color: colors.darkGrayText,
    fontWeight: '400',
  },
  right: {

  }
})
