import React from 'react'
import IconContainer from "./IconContainer"
import { AntDesign } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"

export default function GoBackBtn(props) {

  const { backgroundColor="transparent", rippleColor="#ccc",
    iconColor="#555", iconSize=22, dimensions, style,
    borderlessRipple } = props
  const navigation = useNavigation()

  return (
    <IconContainer
      dimensions={dimensions}
      backgroundColor={backgroundColor}
      IconComponent={AntDesign}
      iconColor={iconColor}
      iconSize={iconSize}
      iconName="arrowleft"
      borderRadius={100}
      rippleColor={rippleColor}
      borderlessRipple={borderlessRipple}
      style={[style, {marginRight: 10}]}
      onPress={() => navigation.goBack()}
    />
  )
}