import { createStore as reduxCreateStore } from 'redux'

const reducer = (state, action) => {
  switch(action.type) {
    case `PLAY`:
      return Object.assign({}, state, {
        playing: true,
        currentFile: action.currentFile,
        currentName: action.currentName
      })
    case `PAUSE`:
      return Object.assign({}, state, {
        playing: false,
      })
    default:
      return state
  }
}

const initialState = {
  playing: false,   
  currentFile: "",
  currentName: "",
}

const createStore = () => reduxCreateStore(reducer, initialState)
export default createStore
