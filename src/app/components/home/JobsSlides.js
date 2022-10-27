// @ts-nocheck
import { useAllJobs } from "app/hooks/jobsHooks"
import { StoreContext } from "app/store/store"
import { colors } from "app/utils/colors"
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Text } from "react-native"
import { View, StyleSheet, Dimensions } from "react-native"
import Carousel from "react-native-snap-carousel"
import CarouselCard from "../ui/CarouselCard"

export const SLIDER_WIDTH = Dimensions.get('window').width + 90
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.75)

export default function JobsSlides() {

  const { myUser, myInterestedJobIDs, myNotInterestedJobIDs } = useContext(StoreContext)
  const limitIncrement = 3
  const [slideIndex, setSlideIndex] = useState(0)
  const [jobsLimit, setJobsLimit] = useState(limitIncrement)
  const jobs = useAllJobs(jobsLimit)
  const isCarousel = useRef(null)
  const uninteractedJobs = jobs.filter(job => (
    !myInterestedJobIDs?.includes(job.jobID) && 
    !myNotInterestedJobIDs?.includes(job.jobID)
  ))

  useEffect(() => {
    if(slideIndex === uninteractedJobs?.length - 1) {
      setJobsLimit(prev => prev + limitIncrement)
    }
  },[slideIndex])

  useEffect(() => {
    if(uninteractedJobs?.length < 4) {
      setJobsLimit(prev => prev + 1)
    }
  },[jobs])

  return (
    <View style={styles.container}>
      <View style={styles.greeting}>
        <View style={styles.titles}>
          <Text style={styles.title}>Hello,</Text>
          <Text style={styles.nameTitle}>{myUser?.firstName}</Text>
        </View>
        <Text style={styles.subtitle}>Here are some jobs you might be interested in</Text>
      </View>
      <Carousel
        layout="default"
        inactiveSlideScale={0.8}
        inactiveSlideOpacity={0.1}
        onScrollIndexChanged={(index) => setSlideIndex(index)}
        loop={uninteractedJobs?.length > 10}
        enableSnap
        layoutCardOffset={0}
        ref={isCarousel}
        data={uninteractedJobs}
        renderItem={({ item }) => <CarouselCard item={item} />}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        inactiveSlideShift={0}
        disableIntervalMomentum
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10
  },
  greeting: {
    paddingVertical: 15,
    paddingHorizontal: 5,
    width: '100%',
    marginBottom: 10,
  },
  titles: {
    flexDirection: 'row',
  },
  title: {
    fontSize: 30,
    fontWeight: '400',
    marginRight: 5
  },
  nameTitle: {
    fontSize: 30,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '400',
    color: colors.grayText
  }
})