import { colors } from "app/utils/colors"
import React, { useState } from 'react'
import { View, StyleSheet } from "react-native"
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Text } from "react-native"
import TouchIcon from "../ui/TouchIcon"
import { Pressable } from "react-native"
import OptionsBottomSheet from "../ui/OptionsBottomSheet"
import { Vibration } from "react-native"

export default function JobCard(props) {

  const { mainIcon, mainIconBgColor=colors.primary, sheetOptions,
    title, subtitleText1, subtitleText2, SubtitleIcon1,
    SubtitleIcon2, subtitleIconName1, subtitleIconName2,
    additionalInfo, onPress } = props
  const [showBottomSheet, setShowBottomSheet] = useState(false)

  return (
    <Pressable 
      style={styles.container}
      onLongPress={() => {
        Vibration.vibrate(1 * 5)
        setShowBottomSheet(true)
      }}
      onPress={() => onPress && onPress()}
    >
      <View style={styles.left}>
        <View style={[styles.iconContainer, {backgroundColor: mainIconBgColor}]}>
          {mainIcon}
        </View>
        <View style={styles.textInfo}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.itemRow}>
            <SubtitleIcon1 
              name={subtitleIconName1} 
              size={15} 
              color={colors.darkGrayText}
              style={styles.itemRowIcon}
            />
            <Text style={styles.subtitleText1}>{subtitleText1}</Text>
          </View>
          <View style={styles.itemRow}>
            <SubtitleIcon2
              name={subtitleIconName2}
              size={15}
              color={colors.darkGrayText}
              style={styles.itemRowIcon}
            />
            <Text style={styles.subtitleText2}>{subtitleText2}</Text>
          </View>
          {additionalInfo}
        </View>
      </View>
      <View style={styles.right}>
        <TouchIcon
          onPress={() => setShowBottomSheet(true)}
          iconComponent={
            <MaterialCommunityIcons 
              name="dots-vertical" 
              size={24} 
              color={colors.darkBlueGray} 
            />
          }
        />
      </View>
      <OptionsBottomSheet
        showSheet={showBottomSheet}
        setShowSheet={setShowBottomSheet}
        items={sheetOptions}
      />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 15,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: colors.grayText,
    shadowOffset: {
      width: 8,
      height: 3,
    },
    shadowOpacity: 1,
    shadowRadius: 4.65,
    elevation: 15,
    marginBottom: 8,
    borderRadius: 20,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '87%',
    marginRight: 7
  },
  iconContainer: {
    width: 45,
    height: 45,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  textInfo: {

  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemRowIcon: {
    width: 20,
  },  
  calendarIcon: {
    left: -1.5
  },  
  title: {
    fontSize: 17,
    fontWeight: '500',
    marginBottom: 3
  },  
  subtitleText1: {
    fontSize: 14,
    color: colors.darkGrayText,
    fontWeight: '400',
    marginBottom: 3
  },
  subtitleText2: {
    fontSize: 14,
    color: colors.darkGrayText,
    fontWeight: '400',
    textTransform: 'capitalize',
  },
  right: {

  }
})
