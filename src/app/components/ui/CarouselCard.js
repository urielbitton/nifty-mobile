import React, { useContext, useState } from 'react'
import { View, Text, StyleSheet, Image, Dimensions,
  TouchableOpacity } from "react-native"
import { Feather, AntDesign } from '@expo/vector-icons'
import { colors } from "app/utils/colors"
import { convertClassicDate } from "app/utils/dateUtils"
import jobCardBg from "../../../../assets/job-card-bg.png"
import { Button } from "@rneui/base";
import { truncateText } from "app/utils/geenralUtils"
import { firebaseArrayAdd, firebaseArrayRemove, updateDB } from "app/services/crudDB"
import { StoreContext } from "app/store/store"

export const SLIDER_WIDTH = Dimensions.get('window').width + 90
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.75)

export default function CarouselCard(props) {

  const { myUserID, myInterestedJobIDs, myNotInterestedJobIDs } = useContext(StoreContext)
  const { jobID, companyName, title, dateCreated,
    interests, tags, description } = props.item
  const [loading, setLoading] = useState(false)
  const jobIsInterestedByUser = myInterestedJobIDs?.includes(jobID)
  const jobIsNotInterestedByUser = myNotInterestedJobIDs?.includes(jobID)

  const tagsList = tags?.map((tag, index) => {
    return (
      <Text 
        key={index} 
        style={styles.tag}
      >
        {tag}{index < tags?.length - 1 && ", "}
      </Text>
    )
  })

  const addToInterested = () => {
    if(!jobIsInterestedByUser) {
      setLoading(true)
      updateDB('users', myUserID, { 
        interestedJobIDs: firebaseArrayAdd(jobID),
        notInterestedJobIDs: firebaseArrayRemove(jobID)
      })
      .then(() => {
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
        setLoading(false)
      })
    }
  }

  const addToNotInterested = () => {
    if(!jobIsNotInterestedByUser) {
      setLoading(true)
      updateDB('users', myUserID, { 
        interestedJobIDs: firebaseArrayRemove(jobID),
        notInterestedJobIDs: firebaseArrayAdd(jobID)
      })
      .then(() => {
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
        setLoading(false)
      })
    }
  }

  return (
    <View
      style={styles.container}
      key={jobID}
    >
      <Image
        source={jobCardBg}
        style={styles.bgImg}
      />
      <View style={styles.cardContent}>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Feather
              name="briefcase" 
              size={24} 
              color="#fff" 
            />
          </View>
          <Text style={styles.companyName}>{companyName}</Text>
        </View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>
          {truncateText(description, 100)}
        </Text>
        <TouchableOpacity 
          style={styles.readMore}
          onPress={() => console.log('read more')}
          activeOpacity={0.7}
        >
          <Text style={styles.readMoreText}>Read more</Text>
        </TouchableOpacity>
        <View style={styles.infoRow}>
          <Text style={styles.dateText}>Posted On: {convertClassicDate(dateCreated?.toDate())}</Text>
          <Text style={styles.interests}>Interests: {interests}</Text>
          <View style={styles.tagsList}>
            <Text style={styles.tagsTitle}>Tags:</Text>
            {tagsList}
          </View>
        </View>
      </View>
      <View style={styles.actionsFlex}>
        <Button
          onPress={() => addToInterested()}
          title="Interested"
          buttonStyle={styles.actionBtn}
          titleStyle={styles.actionBtnText}
          icon={
            <AntDesign 
              name="hearto" 
              size={20} 
              color={colors.primary} 
              style={styles.actionBtnIcon}
            />
          }
        />
        <Button
          onPress={() => addToNotInterested()}
          title="Not Interested"
          buttonStyle={styles.actionBtn}
          titleStyle={styles.actionBtnText}
          icon={
            <Feather 
              name="x" 
              size={22} 
              color={colors.primary} 
              style={styles.actionBtnIcon}
            />
          }
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: ITEM_WIDTH,
    justifyContent: 'space-between',
    minHeight: '72%',
    backgroundColor: colors.primary,
    borderRadius: 40,
    shadowColor: colors.primary,
    shadowOffset: {
      width: 8,
      height: 3,
    },
    shadowOpacity: 0.8,
    shadowRadius: 4.65,
    elevation: 12,
    overflow: 'hidden',
  },
  bgImg: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },  
  cardContent: {
    padding: 25,
    width: '100%',
    paddingBottom: 40,
    alignItems: 'flex-start',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  iconContainer: {
    marginRight: 10,
    width: 45,
    height: 45,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.darkPrimary,
  },
  companyName: {
    color: "#fff",
    fontSize: 18,
    fontWeight: '400',
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
    lineHeight: 35,
    width: '80%',
  },
  description: {
    color: "#fff",
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 25,
  },  
  readMore: {
    paddingVertical: 5,
    paddingHorizontal: 7,
    borderRadius: 5,
    backgroundColor: '#fff',
    marginTop: 3
  },  
  readMoreText: {
    color: '#333',
    fontSize: 12,
  },
  infoRow: {
    marginTop: 20,
    paddingTop: 20,
    borderTopColor: 'rgba(255, 255, 255, 0.3)',
    borderTopWidth: 1,
  },
  dateText: {
    color: "#fff",
    fontSize: 15,
  },
  interests: {
    color: "#fff",
    fontSize: 15,
    marginTop: 5,
  },
  tagsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  tag: {
    color: "#fff",
    fontSize: 14,
    marginRight: 3,
  },
  tagsTitle: {
    color: "#fff",
    fontSize: 14,
    marginRight: 5,
  },
  actionsFlex: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingBottom: 25,
    width: '100%',
  },
  actionBtn: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginHorizontal: 20
  },
  actionBtnText: {
    color: colors.primary
  },
  actionBtnIcon: {
    marginRight: 10
  }
})
