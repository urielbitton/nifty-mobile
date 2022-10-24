import React, { useState } from 'react'
import { StyleSheet, Text, View, Dimensions } from "react-native"
import Navbar from "../layout/Navbar"
import Screen from "../layout/Screen"
import AppTabSlider from "../ui/AppTabSlider"
import JobsSlides from "./JobsSlides"

const screenHeight = Dimensions.get('screen').height - 130

export default function Home() {

  const [index, setIndex] = useState(0)

  return (
    <Screen style>
      <Navbar />
      <View style={styles.tabSliderContainer}>
        <AppTabSlider
          index={index}
          setIndex={setIndex}
          items={[
            { title: 'Jobs', index: 0 },
            { title: 'Matches', index: 1 }
          ]}
          pages={[
            <JobsSlides />,
            <Text>All Matches</Text>
          ]}
        />
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  tabSliderContainer: {
    flex: 1,
    width: '100%',
    height: screenHeight,
  }
})