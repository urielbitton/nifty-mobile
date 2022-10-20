// @ts-nocheck
import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from "react-native"
import { bottomBarLinks } from "../../data/menuLinks"
import { colors } from '../../utils/colors'

export default function BottomBar() {

  const menuLinksRender = bottomBarLinks.map((link, i) => {
    return <TouchableOpacity 
      activeOpacity={0.7} 
      style={styles.menuLink}
      key={i}
    >
      <FontAwesome name={link.icon} size={30} color={colors.grayText} />
      <Text style={styles.menuLinkText}>{link.name}</Text>
    </TouchableOpacity>
  })

  return (
    <View style={styles.container}>
      {menuLinksRender}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingVertical: 15,
    paddingHorizontal: 10,
  }
})