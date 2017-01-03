import {eventsInitialState} from "../constants/constants";

export default function reducer(state=eventsInitialState, action) {
  switch (action.type) {
    case "EVENTS_HIDE_MODAL":
      return {...state, modal: null};
    case "EVENTS_SHOW_MODAL":
      return {...state, modal: action.payload.dateString};
    case "EVENTS_ADD_EVENT":
      let event = {type: action.payload.type, body: action.payload.body}
      let eventsMore = state.events[action.payload.dateString] ? [...state.events[action.payload.dateString], event] : [event];
      return {...state, modal: null, events: {...state.events, [action.payload.dateString]: eventsMore}};
    case "EVENTS_DELETE_EVENT":
      let eventsLess = [
        ...state.events[action.payload.dateString].slice(0, action.payload.index),
        ...state.events[action.payload.dateString].slice(Number(action.payload.index) + 1)
      ];
      return {...state, events: {...state.events, [action.payload.dateString]: eventsLess}};
  }
  return state;
}
