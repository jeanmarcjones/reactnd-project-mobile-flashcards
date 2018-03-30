import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { grey, lightGray, purple, white } from '../utils/colors'

function Decks({ decks, navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.list}>
      {Object.keys(decks).map((key) => {
        const { title, questions } = decks[key]

        return (
          <TouchableOpacity
            key={key}
            style={styles.deck}
            onPress={() => navigation.navigate(
              'Deck',
              { deck: decks[key] }
            )}>
            <View>
              <Text style={styles.deckTitle}>{title}</Text>
              <Text style={styles.deckCards}>{questions.length} Cards</Text>
            </View>
          </TouchableOpacity>
        )
      })}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  list: {
    flexGrow: 1,
    alignItems: 'center',
    paddingBottom: 12,
  },
  deck: {
    width: '90%',
    marginTop: 12,
    paddingVertical: 25,
    backgroundColor: white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: purple,
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowRadius: 2,
  },
  deckTitle: {
    fontSize: 19,
    color: grey,
    textAlign: 'center',
    fontWeight: '500',
    marginBottom: 5,
  },
  deckCards: {
    fontSize: 16,
    color: lightGray,
    textAlign: 'center',
  }
})

const mapStateToProps = (state) => ({
  decks: state.decks,
})

export default connect(
  mapStateToProps
)(Decks)
