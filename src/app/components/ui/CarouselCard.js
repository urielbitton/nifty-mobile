import React from 'react'
import { View, Text, StyleSheet, Image, Dimensions } from "react-native"

export const SLIDER_WIDTH = Dimensions.get('window').width + 90
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.75)

export default function CarouselCard(props) {

  const { jobID, coverImg, title } = props.item

  return (
    <View 
      style={styles.container} 
      key={jobID}
    >
      <Image
        source={{uri: coverImg}}
        style={styles.image}
      />
      <Text style={styles.header}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    width: ITEM_WIDTH,
    paddingBottom: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  image: {
    width: ITEM_WIDTH,
    height: 300,
  },
  header: {
    color: "#222",
    fontSize: 28,
    fontWeight: "bold",
    paddingLeft: 20,
    paddingTop: 20
  },
  body: {
    color: "#222",
    fontSize: 18,
    paddingHorizontal: 20,
  }
})
