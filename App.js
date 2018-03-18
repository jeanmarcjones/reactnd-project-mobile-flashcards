import React, { Component } from 'react';
import { Platform, View, StatusBar } from 'react-native'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { Constants } from 'expo'
import { MaterialCommunityIcons, Entypo } from '@expo/vector-icons'
import { receiveDecks, getDecks } from './utils/api'
import { white, purple, lightPurple } from './utils/colors'
import Decks from './components/Decks'
import Deck from './components/Deck'
import NewDeck from './components/NewDeck'
import AddCard from './components/AddCard'

function UdaciStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tabs = TabNavigator({
  Decks: {
    screen: Decks,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name='cards-outline' size={30} color={tintColor} />
    },
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'New Deck',
      tabBarIcon: ({ tintColor }) => <Entypo name='add-to-list' size={30} color={tintColor} />
    },
  },
}, {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? purple : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : purple,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1,
    },
  },
})

const MainNavigation = StackNavigator({
  Home: {
    screen: Tabs,
  },
  Deck: {
    screen: Deck,
  },
  AddCard: {
    screen: AddCard,
  },
}, {
  headerMode: 'screen',
  navigationOptions: {
    headerBackTitle: null,
    headerTintColor: white,
    headerStyle: {
      backgroundColor: lightPurple,
    }
  },
})

const DB =  {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'Java Script',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  },
}

export default class App extends Component {
  componentDidMount() {
    receiveDecks(DB)
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <UdaciStatusBar backgroundColor={purple} barStyle="light-content" />
        <MainNavigation />
      </View>
    );
  }
}
