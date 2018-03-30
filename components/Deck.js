import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { deckIndex } from '../utils/helpers'
import { black, grey, lightGray, white } from '../utils/colors'

function Deck({ deck, navigation }) {
  return (deck
    ? <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{deck.title}</Text>
        <Text style={styles.cards}>{deck.questions.length} Cards</Text>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate(
            'AddCard',
            { index: deckIndex(deck.title) }
          )}>
          <Text style={styles.buttonText}>Add Card</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#000' }]}
          onPress={() => navigation.navigate(
            'Quiz',
            { index: deckIndex(deck.title) }
          )}>
          <Text style={[styles.buttonText, { color: white }]}>Start Quiz</Text>
        </TouchableOpacity>
      </View>
    </View>
    : <Text>Loading</Text>
  )
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

const mapStateToProps = (state, ownProps) => ({
  deck: state.decks[ownProps.navigation.state.params.index],
})

export default connect(
  mapStateToProps,
)(Deck)
