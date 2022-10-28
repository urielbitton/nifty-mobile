import React, { useState } from 'react'
import { Drawer, DrawerItem, IndexPath } from '@ui-kitten/components'

export default function AppDrawer(props) {

  const { items } = props
  const [selectedIndex, setSelectedIndex] = useState(new IndexPath(0))

  const itemsRender = items?.map((item, index) => {
    <DrawerItem 
      title={item.title}
      onPress={() => item.onPress()}
      key={index}
    />
  })

  return (
    <Drawer
      selectedIndex={selectedIndex}
      onSelect={index => setSelectedIndex(index)}
    >
      {itemsRender}
    </Drawer>
  )
}
