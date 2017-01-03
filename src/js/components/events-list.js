import React from "react";
import {deleteEvent} from "../actions/events";
import {eventTypeColorHash} from "../constants/constants";

export default class EventsList extends React.Component {
  constructor() {
    super();
    this._onDeleteEvent = this._onDeleteEvent.bind(this);
  }
  _onDeleteEvent(event) {
    event.stopPropagation();
    event.preventDefault();
    let dataArr = event.target.getAttribute("data").split(" ");
    this.props.dispatch(deleteEvent(dataArr[0], dataArr[1]));
  }
  render() {
    let eventsKey = `${this.props.calendar.selected.year}-${this.props.calendar.selected.month}-${this.props.calendar.selected.day}`;
    let eventsList = this.props.events.events[eventsKey] || [];
    if (eventsList.length) {
      return (
        <ul className="list-group">{eventsList.map((event, index) => <li className="list-group-item" key={`event-${index}`}>
            <span style={{color: "darkred", fontWeight: "bold", padding: "4px", cursor: "pointer", fontFamily: "sans-serif"}}
                data={`${eventsKey} ${index}`}
                onClick={this._onDeleteEvent}> x </span>
                <span className={`text-${eventTypeColorHash[event.type]}`}> {event.type}, {event.body}</span></li>)}
        </ul>
      )
    }
    return null;
  }
}
