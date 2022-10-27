import React from 'react'
import { View, Text, StyleSheet, Image, Dimensions } from "react-native"
import { FontAwesome5, AntDesign } from '@expo/vector-icons'
import {LinearGradient} from 'expo-linear-gradient'
import { colors } from "app/utils/colors"

export const SLIDER_WIDTH = Dimensions.get('window').width + 90
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.75)

export default function CarouselCard(props) {

  const { jobID, coverImg, title } = props.item

  return (
    <View
      style={[styles.container]}
      key={jobID}
    >
      <View style={styles.cardContent}>
        <Image
          source={{ uri: coverImg }}
          // @ts-ignore
          style={styles.image}
        />
        <Text style={styles.header}>{title}</Text>
      </View>
      <View style={styles.actionFlex}>
        <LinearGradient 
          colors={['#fff', '#ffcfcf', colors.red]} 
          style={styles.gradientIcon}
        >
          <FontAwesome5 
            name="times" 
            size={35} 
            color={colors.red} 
          />
        </LinearGradient>
        <LinearGradient 
          colors={['#fff', '#dec7ff', colors.primary]} 
          style={styles.gradientIcon}
        >
          <AntDesign 
            name="heart"  
            size={35} 
            color={colors.primary} 
          />
        </LinearGradient>
      </View>
    </View >
  )
}

const styles = StyleSheet.create({
  container: {
    width: ITEM_WIDTH,
    height: '99%',
    backgroundColor: '#fff',
    borderRadius: 10
  },
  cardContent: {
    backgroundColor: '#fff',
    width: '100%',
    paddingBottom: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4.65,
    elevation: 3,
    borderRadius: 10
  },
  image: {
    width: ITEM_WIDTH,
    height: 100,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  header: {
    color: "#222",
    fontSize: 28,
    fontWeight: "bold",
    paddingLeft: 20,
    paddingTop: 20
  },
  actionFlex: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 20,
    marginTop: 40
  },
  gradientIcon: {
    width: 75,
    height: 75,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4.65,
    elevation: 3,
  }
})
