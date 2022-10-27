import { useAllJobs } from "app/hooks/jobsHooks"
import { StoreContext } from "app/store/store"
import React, { useContext, useEffect, useRef, useState } from 'react'
import { View, StyleSheet, Dimensions } from "react-native"
import Carousel from "react-native-snap-carousel"
import CarouselCard from "../ui/CarouselCard"

export const SLIDER_WIDTH = Dimensions.get('window').width + 90
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.75)

export default function JobsSlides() {

  const { myInterestedJobIDs, myNotInterestedJobIDs } = useContext(StoreContext)
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
    if(slideIndex === jobs?.length - 1) {
      setJobsLimit(prev => prev + limitIncrement)
    }
  },[slideIndex])

  useEffect(() => {
    if(jobs?.length < 2) {
      setJobsLimit(prev => prev + 1)
    }
  },[jobs])

  return (
    <View style={styles.container}>
      {/* @ts-ignore */}
      <Carousel
        layout="stack"
        onScrollIndexChanged={(index) => setSlideIndex(index)}
        loop={jobs?.length > 10}
        enableSnap
        layoutCardOffset={0}
        ref={isCarousel}
        data={uninteractedJobs}
        renderItem={CarouselCard}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        inactiveSlideShift={0}
        useScrollView={true}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10
  }
})