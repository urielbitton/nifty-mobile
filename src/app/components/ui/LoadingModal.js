import React from 'react'
import { View, StyleSheet, ActivityIndicator } from "react-native"
import { colors } from "app/utils/colors"

export default function LoadingModal() {

  return (
    <View style={styles.container}>
      <ActivityIndicator 
        size="large" 
        color={colors.primary} 
        style={{transform: [{scale: 1.2}]}}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "105%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    position: "absolute",
    top: 0,
    zIndex: 9000,
  }
})