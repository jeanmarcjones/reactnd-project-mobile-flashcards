import { AsyncStorage } from 'react-native'

export const DECK_STORAGE_KEY = 'FlashCards:deck'

// Initial decks
export function receiveDecks(decks) {
  return AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(decks))
}

// return all of the decks along with their titles, questions, and answers.
export function getDecks() {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then((res) => {
      return JSON.parse(res)
    })
}

// take in a single id argument and return the deck associated with that id.
export function getDeck(deck) {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then((res) => {
      const data = JSON.parse(res)
      return data[deck]
    })
}

// take in a single title argument and add it to the decks.
export function saveDeckTitle(deck) {
  return AsyncStorage.setItem(DECK_STORAGE_KEY, deck)
}

// take in two arguments, title and card, and will add the card to the list of questions for the deck with the
// associated title.
export function addCardToDeck(title, card) {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then((res) => {
      const data = JSON.parse(res)
      data[title].questions = [...data[title].questions, card]
      AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data))
      return data[title]
    })
}
