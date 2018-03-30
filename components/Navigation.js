import React, { Component } from 'react';
import { Platform, View, StatusBar } from 'react-native'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { connect } from 'react-redux'
import { Constants } from 'expo'
import { MaterialCommunityIcons, Entypo } from '@expo/vector-icons'
import { white, purple, lightPurple, lightGreen } from '../utils/colors'
import { fetchDecks } from '../actions'
import Decks from '../components/Decks'
import Deck from '../components/Deck'
import NewDeck from '../components/NewDeck'
import AddCard from '../components/AddCard'
import Quiz from '../components/Quiz'

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
    indicatorStyle: {
      backgroundColor: lightGreen,
    },
  },
})

const MainNavigation = StackNavigator({
  Home: {
    screen: Tabs,
  },
  Deck: {
    screen: Deck,
    navigationOptions: () => ({
      title: 'Deck',
    }),
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: () => ({
      title: 'Add Card',
    }),
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: () => ({
      title: 'Quiz',
    }),
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

class Navigation extends Component {
  componentDidMount() {
    const { fetchDecks } = this.props
    fetchDecks()
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

const mapDispatchToProp = {
  fetchDecks,
}

export default connect(
  null,
  mapDispatchToProp,
)(Navigation)
