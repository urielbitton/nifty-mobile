import React from 'react'
import { View } from "react-native"
import IconContainer from "./IconContainer"
import { AntDesign } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { StyleSheet } from "react-native"

export default function GoBackBar(props) {

  const { rightComponent, backgroundColor="#e5e5e5",
    iconColor="#555", iconSize=20, dimensions } = props
  const navigation = useNavigation()

  return (
    <View style={styles.topBar}>
      <IconContainer
        dimensions={dimensions}
        backgroundColor={backgroundColor}
        IconComponent={AntDesign}
        iconColor={iconColor}
        iconSize={iconSize}
        iconName="arrowleft"
        borderRadius={100}
        onPress={() => navigation.goBack()}
      />
      {rightComponent}
    </View>
  )
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 0,
    paddingTop: 20,
    paddingBottom: 15
  },
})