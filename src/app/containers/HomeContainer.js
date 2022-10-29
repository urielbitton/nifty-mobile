// @ts-nocheck
import React, { useContext } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { bottomBarLinks } from "../data/menuLinks"
import { colors } from "../utils/colors"
import { StoreContext } from "app/store/store"

const Tab = createBottomTabNavigator()

export default function HomeContainer({navigation}) {

  const { myUserType } = useContext(StoreContext)

  const tabsBarRender = bottomBarLinks
    ?.filter(tab => tab.require.includes(myUserType) || tab.require.includes('all'))
    .map((tab, i) => {
      return <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) =>
            <tab.icon.component
              style={{ top: -3 }}
              name={tab.icon.name}
              size={23}
              color={focused ? colors.primary : colors.grayText}
            />,
          tabBarStyle: {
            paddingVertical: 10,
            height: 60,
            justifyContent: 'center',
            alignItems: 'center',
            borderTopWidth: 0,
            backgroundColor: colors.appBg,
          },
          tabBarLabelStyle: {
            top: -8,
            fontSize: 12
          },
          tabBarActiveTintColor: colors.primary,
          tabBarShowLabel: false,
        }}
        children={() => <tab.Component />}
        name={tab.name}
        key={i}
      />
    })

  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
    >
      {tabsBarRender}
    </Tab.Navigator>
  )
}
