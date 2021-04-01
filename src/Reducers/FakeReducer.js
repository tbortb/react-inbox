import {MESSAGES_REQUEST_SUCCESS, MESSAGES_REQUEST_STARTED} from '../Actions/loadMessages'

export default function reducer(state = { }, action) {
  switch (action.type) {
    case MESSAGES_REQUEST_SUCCESS:
      return {...state, messages: action.messages, isLoading: false}
    case MESSAGES_REQUEST_STARTED:
        return {...state, isLoading: true}
    default:
      return state
  }
}