import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { deckIndex } from '../utils/helpers'
import { black, grey, lightGray, white } from '../utils/colors'

class Deck extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.deck.title
  })
  render() {
    const { navigate } = this.props.navigation
    const { title, questions } = this.props.navigation.state.params.deck

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.cards}>{questions.length} Cards</Text>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigate(
              'AddCard',
              { index: deckIndex(title) }
            )}>
            <Text style={styles.buttonText}>Add Card</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#000' }]}
            onPress={() => navigate(
              'Quiz',
              { index: deckIndex(title) }
            )}>
            <Text style={[styles.buttonText, { color: white }]}>Start Quiz</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: white
  },
  header: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 140
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 70
  },
  title: {
    fontSize: 27,
    color: grey,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cards: {
    fontSize: 21,
    color: lightGray,
  },
  button: {
    width: 150,
    marginTop: 10,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: black,
    borderRadius: 5,
    backgroundColor: white,
  },
  buttonText: {
    fontSize: 18,
    color: black,
    textAlign: 'center',
    fontWeight: '500',
  },
})

export default Deck
