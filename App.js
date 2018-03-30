import React, { Component } from 'react'
import { createStore, compose, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import reducer from './reducers'
import Navigation from './components/Navigation'
import { setLocalNotification } from './utils/helpers'

const store = createStore(
  reducer,
  compose(
    applyMiddleware(logger, thunk)
  )
)

export default class App extends Component {
  componentDidMount() {
    setLocalNotification()
  }
  render() {
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    )
  }
}
