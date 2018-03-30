import React, { Component } from 'react'
import { connect } from 'react-redux'
import { KeyboardAvoidingView, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { createDeck } from '../actions'
import { black, grey, lightGreen, white } from '../utils/colors'
import { deckIndex } from '../utils/helpers'

class NewDeck extends Component {
  state = {
    title: '',
  }
  submit = (title) => {
    const { createDeck, navigation } = this.props

    createDeck({ deck: title })
    navigation.navigate(
      'Deck',
      { index: deckIndex(title) },
    )
  }
  render() {
    const { title } = this.state

    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <Text style={styles.title}>Enter your decks title.</Text>
        <TextInput
          value={title}
          style={styles.input}
          onChangeText={(title) => this.setState({ title })}
          placeholder="Deck title"
          placeholderTextColor="grey"
          underlineColorAndroid="transparent"
          selectionColor={lightGreen}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.submit(title)}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: white,
  },
  title: {
    fontSize: 27,
    color: grey,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 5,
  },
  input: {
    width: '80%',
    height: 40,
    color: black,
    fontSize: 18,
    borderWidth: 2,
    borderColor: grey,
    borderRadius: 3,
    marginTop: 20,
    paddingVertical: 6,
    paddingHorizontal: 3,
  },
  button: {
    width: 150,
    marginTop: 25,
    paddingVertical: 12,
    borderRadius: 5,
    backgroundColor: lightGreen,
  },
  buttonText: {
    fontSize: 18,
    color: white,
    textAlign: 'center',
    fontWeight: '500',
  },
})

const mapDispatchToProps = (dispatch) => ({
  createDeck: (data) => dispatch(createDeck(data))
})

export default connect(
  null,
  mapDispatchToProps,
)(NewDeck)
