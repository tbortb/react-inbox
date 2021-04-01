export const MESSAGES_REQUEST_SUCCESS = 'MESSAGES_REQUEST_SUCCESS'
export const MESSAGES_REQUEST_STARTED = 'MESSAGES_REQUEST_STARTED'

export function fetchMessages() {
  return async (dispatch) => {
      dispatch({type: MESSAGES_REQUEST_STARTED})
    const response = await fetch('/messages');
    const respJson = await response.json();
    const messages = respJson.messages;
    dispatch({
      type: MESSAGES_REQUEST_SUCCESS,
      messages
    })
  }
}