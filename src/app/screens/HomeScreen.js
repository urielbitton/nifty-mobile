import JobMatches from "app/components/jobs/JobMatches"
import JobsSlides from "app/components/jobs/JobsSlides"
import Navbar from "app/components/layout/Navbar"
import Screen from "app/components/layout/Screen"
import MenuSwitch from "app/components/ui/MenuSwitch"
import { colors } from "app/utils/colors"
import React, { useState } from 'react'
import { StyleSheet, View, Dimensions } from "react-native"

const screenHeight = Dimensions.get('screen').height - 130

export default function HomeScreen() {

  const [activeTab, setActiveTab] = useState('jobs')
  const rippleColor = colors.darkBlueGray 
  const rippleOverflow = true
 
  return (
    <Screen style>
      <Navbar />
      <View style={styles.tabSliderContainer}>
        <MenuSwitch
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          rippleColor={rippleColor}
          rippleOverflow={rippleOverflow}
          menuLinks={[
            { label: 'Jobs', value: 'jobs',  },
            { label: 'Matches', value: 'matches' }
          ]}
        />
        {
          activeTab === 'jobs' ? 
          <JobsSlides /> : 
          <JobMatches />
        }
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
})