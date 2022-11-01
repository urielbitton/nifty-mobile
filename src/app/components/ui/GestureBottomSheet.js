import React from 'react'
import BottomSheet from "react-native-gesture-bottom-sheet"

export default function GestureBottomSheet(props) {

  const { children, height, sheetRef } = props

  return (
    <BottomSheet
      hasDraggableIcon
      ref={sheetRef}
      height={height}
    >
      {children}
    </BottomSheet>
  )
}
