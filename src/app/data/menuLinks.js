import AddScreen from "../screens/AddScreen";
import ChatsScreen from "../screens/ChatsScreen";
import HomeScreen from "../screens/HomeScreen";
import MyProfileScreen from "../screens/MyProfileScreen";
import SearchScreen from "../screens/SearchScreen";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

export const bottomBarLinks = [
  {
    name: 'Home',
    icon: {
      component: MaterialIcons,
      name: 'home-filled',
    },
    link: 'Home',
    Component: HomeScreen,
    require: 'all'
  },
  {
    name: 'Search',
    icon: {
      component: Ionicons,
      name: 'ios-search-outline',
    },
    link: 'Search',
    Component: SearchScreen,
    require: 'all'
  },
  {
    name: 'Add',
    icon: {
      component: Ionicons,
      name: 'add-sharp'
    },
    link: 'AddProperty',
    Component: AddScreen,
    require: 'employer'
  },
  {
    name: 'Messages',
    icon: {
      component: Feather,
      name: 'message-circle'
    },
    link: 'Messages',
    Component: ChatsScreen,
    require: 'all'
  },
  {
    name: 'Profile',
    icon: {
      component: Feather,
      name: 'user'
    },
    link: 'Profile',
    Component: MyProfileScreen,
    require: 'all'
  },
]