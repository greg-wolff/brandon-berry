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
    case `INIT`:
      return Object.assign({}, state, {
        mixes: action.mixes
      })
    default:
      return state
  }
}

const initialState = {
  playing: false,   
  currentFile: "",
  currentName: "",
  mixes: null
}

const createStore = () => reduxCreateStore(reducer, initialState)
export default createStore
