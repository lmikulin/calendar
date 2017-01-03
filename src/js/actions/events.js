export function showModal(dateString) {
  return {
    type: "EVENTS_SHOW_MODAL",
    payload: {dateString}
  }
}

export function hideModal() {
  return {
    type: "EVENTS_HIDE_MODAL"
  }
}

export function addEvent(dateString, type, body) {
  return {
    type: "EVENTS_ADD_EVENT",
    payload: {dateString, type, body}
  }
}

export function deleteEvent(dateString, index) {
  return {
    type: "EVENTS_DELETE_EVENT",
    payload: {dateString, index}
  }
}
