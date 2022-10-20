// @ts-nocheck
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { FontAwesome } from '@expo/vector-icons'
import { bottomBarLinks } from "../data/menuLinks"
import { colors } from "../utils/colors"
 
const Tab = createBottomTabNavigator()

export default function HomeContainer() {


  const tabsBarRender = bottomBarLinks.map((tab, i) => {
    return <Tab.Screen 
      options={{
        tabBarIcon: ({focused}) => <FontAwesome style={{top: -3}} name={tab.icon} size={25} color={focused ? colors.primary : colors.grayText} />,
        tabBarStyle: {paddingVertical: 10, height: 60, justifyContent: 'center', alignItems: 'center'},
        tabBarLabelStyle: {top: -8, fontSize: 12},
        tabBarActiveTintColor: colors.primary
      }} 
      name={tab.name}
      component={tab.Component} 
      key={i}
    />
  })

  return (
    <Tab.Navigator 
      screenOptions={{headerShown: false}} 
    >
      {tabsBarRender}
    </Tab.Navigator>
  )
}
