import React from "react";
import {calendarNavToday, calendarNavPrev, calendarNavNext, calendarSelectDay} from "../actions/calendar";
import {showModal} from "../actions/events";
import {eventTypeColorHash} from "../constants/constants";

export default class Calendar extends React.Component {
  constructor() {
    super();
    this._onToday = this._onToday.bind(this);
    this._onPrevMonth = this._onPrevMonth.bind(this);
    this._onNextMonth = this._onNextMonth.bind(this);
    this._onSelect = this._onSelect.bind(this);
    this._onShowAddEvent = this._onShowAddEvent.bind(this);
    let now = new Date();
    this.now = {
      year: now.getFullYear(),
      month: now.getMonth(),
      day: now.getDate()
    }
  }
  // user events
  _onSelect(event) {
    event.stopPropagation();
    event.preventDefault();
    // could be child element handling this event
    let dateStr = event.target.getAttribute("data") || event.target.parentElement.getAttribute("data") || event.target.parentElement.parentElement.getAttribute("data");
    if (!dateStr) return;
    let dateArray = dateStr.split("-");
    this.props.dispatch(calendarSelectDay(dateArray[0], dateArray[1], dateArray[2]));
  }
  _onShowAddEvent(event) {
    event.stopPropagation();
    event.preventDefault();
    // could be child element handling this event
    let dateStr = event.target.getAttribute("data") || event.target.parentElement.getAttribute("data") || event.target.parentElement.parentElement.getAttribute("data");
    if (!dateStr) return;
    this.props.dispatch(showModal(dateStr));
  }
  _onToday(event) {
    event.stopPropagation();
    event.preventDefault();
    this.props.dispatch(calendarNavToday());
  }
  _onPrevMonth(event) {
    event.stopPropagation();
    event.preventDefault();
    this.props.dispatch(calendarNavPrev());
  }
  _onNextMonth(event) {
    event.stopPropagation();
    event.preventDefault();
    this.props.dispatch(calendarNavNext());
  }
  // calendar render
  _getWeek() {
    // this method mutates this.dayOfMonth
    let weekArray = [];
    for (let dayOfWeek=0; dayOfWeek <= 6; dayOfWeek++) {
      this.dayOfMonth++;
      let selectedClass =  this.props.calendar.thisMonthSelected && (this.props.calendar.selected.day == this.dayOfMonth) ? " selected" : "";
      let todayClass = this.props.calendar.thisMonthNow && (this.now.day == this.dayOfMonth) ? " today" : "";
      if ((this.dayOfMonth > 0) && (this.dayOfMonth <= this.lastDayOfMonth)) {
        let key = `${this.props.calendar.year}-${this.props.calendar.month}-${this.dayOfMonth}`;
        // get the list of events for each day
        let badges = {};
        if (this.props.events.events[key] && this.props.events.events[key].length) {
          this.props.events.events[key].forEach(event => badges[event.type] = badges[event.type] ? (badges[event.type] + 1) : 1);
        }
        let badgesList = Object.keys(badges).map(eventType => <span key={eventType} className={`text-${eventTypeColorHash[eventType]}`}> {badges[eventType]} </span>);

        weekArray.push(<div className={`day ${selectedClass} ${todayClass}`}
            key={"day" + this.dayOfMonth}
            data={key}
            onClick={this._onSelect}
            onDoubleClick={this._onShowAddEvent}>
              {this.dayOfMonth}
              <div>{badgesList}</div>
            </div>);
      } else {
        weekArray.push(<div className="day" key={"day" + this.dayOfMonth}>&nbsp;</div>)
      }
    }
    return weekArray;
  }
  render() {
    let currentFistDay = new Date(this.props.calendar.year, this.props.calendar.month, 1);
    let currentLastDay = new Date(this.props.calendar.year, this.props.calendar.month +1, 0);
    this.dayOfMonth = -currentFistDay.getDay(); // offset day of month
    this.lastDayOfMonth = currentLastDay.getDate();
    let monthArray = [];

    let weekCount = 0;
    while (this.dayOfMonth < this.lastDayOfMonth) {
      weekCount++;
      monthArray.push(<div className="week" key={"week" + weekCount}>{this._getWeek()}</div>);
    }
    let dow = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let nowShowing = new Date(this.props.calendar.year, this.props.calendar.month, 1);
    let options = {year: 'numeric', month: 'long'};
    return (
      <div className="month">
        <div className="month-nav-bar">
          <label className="month-nav">
            {nowShowing.toLocaleString("en-US", options)}
          </label>
          <div>
            <button className="btn btn-default" onClick={this._onPrevMonth}>
              <span className="glyphicon glyphicon-arrow-left"/>
            </button>
            <button className="btn btn-default" onClick={this._onToday}>Today</button>
            <button className="btn btn-default" onClick={this._onNextMonth}>
              <span className="glyphicon glyphicon-arrow-right"/>
            </button>
          </div>
        </div>
        <div className="dow-container">
          {dow.map(dayString => <div className="text-muted dow" key={dayString}>{dayString}</div>)}
        </div>
        {monthArray}
      </div>
    )
  }
}
