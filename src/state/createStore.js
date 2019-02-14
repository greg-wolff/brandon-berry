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
    case `RESUME`:
      return Object.assign({}, state, {
        playing: true,
      })
    case `SEEK`:
      return Object.assign({}, state, {
        status: action.status
      })
    default:
      return state
  }
}

const initialState = {
  playing: false,   
  currentFile: "",
  currentName: "",
  status: 0,
}

const createStore = () => reduxCreateStore(reducer, initialState)
export default createStore
