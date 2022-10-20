import AddScreen from "../screens/AddScreen";
import ChatsScreen from "../screens/ChatsScreen";
import HomeScreen from "../screens/HomeScreen";
import MyProfileScreen from "../screens/MyProfileScreen";
import SearchScreen from "../screens/SearchScreen";

export const bottomBarLinks = [
  {
    name: 'Home',
    icon: 'home',
    link: 'Home',
    Component: HomeScreen,
  },
  {
    name: 'Search',
    icon: 'search',
    link: 'Search',
    Component: SearchScreen,
  },
  {
    name: 'Add',
    icon: 'plus-circle',
    link: 'AddProperty',
    Component: AddScreen,
  },
  {
    name: 'Messages',
    icon: 'comment',
    link: 'Messages',
    Component: ChatsScreen,
  },
  {
    name: 'Profile',
    icon: 'user',
    link: 'Profile',
    Component: MyProfileScreen,
  },
]