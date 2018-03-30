import { AsyncStorage } from 'react-native'
import { deckIndex } from '../utils/helpers'

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
export function saveDeckTitle(title) {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then((res) => {
      let data = JSON.parse(res)
      data = {
        ...data,
        [deckIndex(title)]: { title: title, questions: [] }
      }
      AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data))
      return title
    })
}

// take in two arguments, title and card, and will add the card to the list of questions for the deck with the
// associated title.
export function addCardToDeck(title, card) {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then((res) => {
      const data = JSON.parse(res)
      data[title].questions = [...data[title].questions, card]
      AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data))
      return { title, card }
    })
}
