import React from 'react'
import { StyleSheet } from "react-native"
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet'

export default function AppBottomSheet(props) {

  const { showSheet, sheetRef, children, snapPoints=['50%', '90%'] } = props

  return (
    showSheet ?
    <BottomSheet
      ref={sheetRef}
      enableOverDrag
      handleIndicatorStyle={styles.handleIndicator}
      snapPoints={snapPoints}
      enablePanDownToClose
      containerStyle={styles.container}
    >
      <BottomSheetScrollView>
        {children}
      </BottomSheetScrollView>
    </BottomSheet> :
    null
  )
}

const styles = StyleSheet.create({
  container: {
    zIndex: 9999
  },
  handleIndicator: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    width: 40,
    height: 4,
  }
})