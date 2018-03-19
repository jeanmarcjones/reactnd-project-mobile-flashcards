import {
  RECEIVE_DECKS,
  ADD_DECK,
  ADD_CARD
} from '../actions'

const initialState =  {
  decks: {}
}

export default function decks (state = initialState, action) {
  switch ( action.type ) {
    case RECEIVE_DECKS :
      return {
        ...state,
        decks: {
          ...state.decks,
          ...action.decks
        },
      }
    case ADD_DECK :
      return {
        ...state,
        ...action.deck
      }
    case ADD_CARD :
      const { deck, card } = action
      return {
        ...state,
        decks: {
          ...state.decks,
          [deck]: {
            ...state.decks[deck],
            questions: [ ...state.decks[deck].questions, card ]
          }
        }
      }
    default :
      return state
  }
}
