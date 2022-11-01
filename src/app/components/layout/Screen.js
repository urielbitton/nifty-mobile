import { colors } from "app/utils/colors";
import React, { useContext } from 'react'
import { SafeAreaView, StyleSheet, ScrollView } from 'react-native'
import { StoreContext } from '../../store/store';

export default function Screen(props) {

  const { scrollRef } = useContext(StoreContext)
  const { children, style } = props

  return (
    <SafeAreaView style={[styles.screen, style]}>
      <ScrollView 
        ref={scrollRef}
        keyboardShouldPersistTaps='always'
        alwaysBounceVertical 
      >
        {children} 
      </ScrollView>
    </SafeAreaView>
  ) 
} 

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.appBg,
  }
})