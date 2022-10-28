import { colors } from "app/utils/colors"
import React from 'react'
import { Text } from "react-native"
import { TouchableNativeFeedback } from "react-native"
import { View, StyleSheet } from "react-native"

export default function MenuSwitch(props) {

  const { activeTab, setActiveTab, rippleColor, menuLinks } = props
  const rippleOverflow = true

  const menuLinksRender = menuLinks?.map((link, index) => {
    return <TouchableNativeFeedback
      background={TouchableNativeFeedback.Ripple(rippleColor, rippleOverflow)}
      onPress={() => setActiveTab(link.value)}
      key={index}
    >
      <View style={[styles.tab, activeTab === link.value && styles.activeTab]}>
        <Text style={styles.tabText}>{link.label}</Text>
      </View>
    </TouchableNativeFeedback>
  })

  return (
    <View style={styles.container}>
      <View style={styles.roudTabs}>
        {menuLinksRender}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    padding: 10,
  },
  roudTabs: {
    borderRadius: 40,
    padding: 3,
    flexDirection: 'row',
    backgroundColor: colors.blueGray,
    shadowColor: colors.blueGray,
    shadowOffset: {
      width: 8,
      height: 3,
    },
    shadowOpacity: 0.8,
    shadowRadius: 4.65,
    elevation: 12,
  },
  tab: {
    borderRadius: 40,
    paddingVertical: 13,
    paddingHorizontal: 25,
  },
  activeTab: {
    backgroundColor: '#fff',
    borderRadius: 40
  },
  tabText: {
    fontWeight: '500',
  }
})
