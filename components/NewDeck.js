import React from 'react'
import {View, Text, StyleSheet} from 'react-native'

function NewDeck() {
  return (
    <View style={styles.center}>
      <Text>New Deck</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default NewDeck
