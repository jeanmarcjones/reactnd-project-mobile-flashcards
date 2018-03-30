import * as DecksAPI from '../utils/api'
import { deckIndex } from '../utils/helpers'

export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const ADD_CARD = 'ADD_CARD'

export const receiveDecks = ({ decks }) => {
  return {
    type: RECEIVE_DECKS,
    decks,
  }
}

export const fetchDecks = () => (dispatch) => {
  DecksAPI
    .getDecks()
    .then((res) => {
      dispatch(receiveDecks({ decks: res }))
    })
}

export const addDeck = ({ deck, title }) => {
  return {
    type: ADD_DECK,
    deck,
    title,
  }
}

export const addCard = ({ deck, card }) => {
  return {
    type: ADD_CARD,
    deck,
    card,
  }
}

export const createDeck = ({ deck }) => (dispatch) => {
  DecksAPI
    .saveDeckTitle(deck)
    .then((res) => {
      dispatch(addDeck({ deck: deckIndex(res), title: res }))
    })
}

export const createCard = ({ deck, card }) => (dispatch) => {
  DecksAPI
    .addCardToDeck(deck, card)
    .then((res) => {
      dispatch(addCard({ deck: deckIndex(res.title), card: res.card }))
    })
}
