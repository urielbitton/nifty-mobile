import { colors } from "app/utils/colors"
import React, { useState } from 'react'
import { Text } from "react-native"
import { StyleSheet, View, Dimensions, TouchableNativeFeedback } from "react-native"
import Navbar from "../layout/Navbar"
import Screen from "../layout/Screen"
import AppTabSlider from "../ui/AppTabSlider"
import JobMatches from "./JobMatches"
import JobsSlides from "./JobsSlides"

const screenHeight = Dimensions.get('screen').height - 130

export default function Home() {

  const [index, setIndex] = useState(0)
  const [rippleColor, setRippleColor] = useState(colors.appBg)
  const rippleOverflow = true

  return (
    <Screen style>
      <Navbar />
      <View style={styles.tabSliderContainer}>
        <View style={styles.roundTabsContainer}>
          <View style={styles.roudTabs}>
            <TouchableNativeFeedback 
              background={TouchableNativeFeedback.Ripple(rippleColor, rippleOverflow)}
            >
              <View style={[styles.tab, styles.activeTab]}>
                <Text style={styles.tabText}>Jobs</Text>
              </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback 
              background={TouchableNativeFeedback.Ripple(rippleColor, rippleOverflow)}
            >
              <View style={styles.tab}>
                <Text style={styles.tabText}>Matches</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
        <JobsSlides />
        {/* <AppTabSlider
          index={index}
          setIndex={setIndex}
          items={[
            { title: 'Jobs', index: 0 },
            { title: 'Matches', index: 1 }
          ]}
          pages={[
            <JobsSlides />,
            <JobMatches />
          ]}
        /> */}
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  tabSliderContainer: {
    flex: 1,
    width: '100%',
    height: screenHeight,
  },
  roundTabsContainer: {
    width: '100%',
    alignItems: 'center',
    padding: 10,
  },
  roudTabs: {
    borderRadius: 40,
    padding: 3,
    flexDirection: 'row',
    backgroundColor: colors.blueGray,
    shadowColor: colors.blueGray,
    shadowOffset: {
      width: 8,
      height: 3,
    },
    shadowOpacity: 0.8,
    shadowRadius: 4.65,
    elevation: 12,
  },
  tab: {
    borderRadius: 40,
    paddingVertical: 13,
    paddingHorizontal: 25,
  },
  activeTab: {
    backgroundColor: '#fff',
    borderRadius: 40
  },
  tabText: {
    fontWeight: '500',
  }
})