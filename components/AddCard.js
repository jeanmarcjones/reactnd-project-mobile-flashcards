import React, { Component } from 'react'
import { KeyboardAvoidingView, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { createCard } from '../actions'
import { black, grey, lightGreen, white } from '../utils/colors'

const resetAction = NavigationActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'Home' })],
});

class AddCard extends Component {
  state = {
    question: '',
    answer: '',
  }
  static navigationOptions = () => ({
    title: 'Add Card',
  })
  submit = (deck, card) => {
    const { createCard } = this.props

    createCard({ deck, card })
    this.home()
  }
  home = () => {
    this.props.navigation.dispatch(resetAction);
  }
  render() {
    const { question, answer } = this.state
    const { index } = this.props.navigation.state.params

    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <TextInput
          value={question}
          style={styles.input}
          onChangeText={(question) => this.setState({ question })}
          placeholder="Like Pie?"
          placeholderTextColor="grey"
          underlineColorAndroid="transparent"
          selectionColor={lightGreen}
        />
        <TextInput
          value={answer}
          style={styles.input}
          onChangeText={(answer) => this.setState({ answer })}
          placeholder="Yes..."
          placeholderTextColor="grey"
          underlineColorAndroid="transparent"
          selectionColor={lightGreen}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.submit(index, { question: question, answer: answer })}>
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
  createCard: (data) => dispatch(createCard(data))
})

export default connect(
  null,
  mapDispatchToProps,
)(AddCard)
