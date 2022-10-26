import React from 'react'
import { Tab, TabView } from '@rneui/themed' 
import { colors } from "app/utils/colors"

export default function AppTabSlider(props) {

  const { index, setIndex, items, pages, animationType="spring" } = props

  const itemsRender = items.map((item, i) => {
    return <Tab.Item
      title={item.title}
      titleStyle={{ fontSize: 13, color: index === item.index ? colors.primary : '#333' }}
      buttonStyle={{ backgroundColor: '#fff' }}
      key={i}
    />
  })

  const pagesRender = pages.map((page, i) => {
    return <TabView.Item 
      style={{ width: '100%' }}
      key={i}
    >
      {page}
    </TabView.Item>
  })

  return (
    <>
      <Tab
        value={index}
        onChange={(e) => setIndex(e)}
        containerStyle={{ backgroundColor: '#fff' }}
        indicatorStyle={{
          backgroundColor: colors.primary,
          height: 2,
        }}
        variant="primary"
      >
        {itemsRender}
      </Tab>
      <TabView
        value={index}
        onChange={setIndex}
        animationType={animationType}
        disableSwipe
      >
        {pagesRender}
      </TabView>
    </>
  )
}
