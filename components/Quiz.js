import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { red, lightGreen, white, grey, black } from '../utils/colors'
import { deckIndex, setLocalNotification, clearLocalNotification } from '../utils/helpers'

class Quiz extends Component {
  state = {
    viewQuestion: true,
    currentQuestion: 0,
    score: 0,
  }
  changeView = () => {
    this.setState((prevState) => ({
      viewQuestion: !prevState.viewQuestion
    }))
  }
  correct = () => {
    this.setState((prevState) => ({
      currentQuestion: prevState.currentQuestion + 1,
      score: prevState.score + 1,
      viewQuestion: true,
    }))

    this.updateNotifications()
  }
  incorrect = () => {
    this.setState((prevState) => ({
      currentQuestion: prevState.currentQuestion + 1,
      viewQuestion: true,
    }))

    this.updateNotifications()
  }
  updateNotifications = () => {
    if ( this.state.currentQuestion + 1 === this.props.deck.questions.length ) {
      clearLocalNotification()
        .then(setLocalNotification)
    }
  }
  render() {
    const { currentQuestion, viewQuestion, score } = this.state
    const { deck, navigation } = this.props

    return currentQuestion === deck.questions.length
      ? <View style={styles.container}>
        <Text style={[styles.text, { fontSize: 23, marginBottom: 25 }]}>
          All Done you scored {Math.round((score / deck.questions.length) * 100)}%
        </Text>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: white, borderColor: black, borderWidth: 1 }]}
          onPress={() => navigation.navigate(
            'Deck',
            { index: deckIndex(deck.title) }
          )}>
          <Text style={[styles.buttonText, { color: black }]}>Back to Deck</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: black }]}
          onPress={() => navigation.navigate(
            'Quiz',
            { index: deckIndex(deck.title) }
          )}>
          <Text style={styles.buttonText}>Restart Quiz</Text>
        </TouchableOpacity>
      </View>
      : <View style={styles.container}>
        <Text style={styles.counter}>{currentQuestion + 1} / {deck.questions.length}</Text>
        <Text style={styles.text}>
          {viewQuestion
            ? deck.questions[currentQuestion].question
            : deck.questions[currentQuestion].answer}
          </Text>
        <TouchableOpacity
          onPress={this.changeView}>
          <Text style={styles.textButton}>
            {viewQuestion
              ? 'Answer'
              : 'Question'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: lightGreen }]}
          onPress={this.correct}>
          <Text style={styles.buttonText}>Correct</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: red }]}
          onPress={this.incorrect}>
          <Text style={styles.buttonText}>Incorrect</Text>
        </TouchableOpacity>
      </View>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: white
  },
  counter: {
    position: 'absolute',
    top: 10,
    left: 10,
    fontSize: 18,
  },
  text: {
    fontSize: 27,
    color: grey,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  textButton: {
    fontSize: 18,
    color: red,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    width: 150,
    marginTop: 10,
    paddingVertical: 12,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    color: white,
    textAlign: 'center',
    fontWeight: '500',
  },
})

const mapStateToProps = (state, ownProps) => ({
  deck: state.decks[ownProps.navigation.state.params.index],
})

export default connect(
  mapStateToProps,
)(Quiz)
