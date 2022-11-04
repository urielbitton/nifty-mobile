import { colors } from "app/utils/colors";
import React, { useContext } from 'react'
import { SafeAreaView, StyleSheet, ScrollView } from 'react-native'
import { StoreContext } from '../../store/store';
import Constants from "expo-constants";

export default function Screen(props) {

  const { scrollRef } = useContext(StoreContext)
  const { children, style, scrollViewStyles } = props

  return (
    <SafeAreaView style={[styles.screen, style]}>
      <ScrollView 
        ref={scrollRef}
        keyboardShouldPersistTaps='always'
        alwaysBounceVertical 
        contentContainerStyle={scrollViewStyles}
      >
        {children} 
      </ScrollView>
    </SafeAreaView>
  ) 
} 

const styles = StyleSheet.create({
  screen: {
    paddingTop: Constants.statusBarHeight + 10,
    backgroundColor: colors.appBg,
  }
})