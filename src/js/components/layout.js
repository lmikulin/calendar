import React from "react";
import {connect} from "react-redux";
import {getWeather} from "../actions/weather";
import Calendar from "./calendar";
import AddEvent from "./add-event";
import Weather from "./weather";
import EventsList from "./events-list";

@connect(store => {
  return {
    calendar: store.calendar,
    events: store.events,
    weather: store.weather
  }
})
export default class Layout extends React.Component {
  componentWillMount() {
    this.props.dispatch(getWeather(this.props.calendar.selected.year, this.props.calendar.selected.month, this.props.calendar.selected.day));
  }
  render() {
    return (
      <div className="container">
        <AddEvent {...this.props}/>
        <h2 className="text-center">Calendar, Events and Weather</h2>
        <div className="wrapper">
          <Calendar {...this.props}/>
          <div className="col-wrapper">
            <label className="text-center" style={{width: "100%", marginTop: "16px"}}>
              {(new Date(this.props.calendar.selected.year, this.props.calendar.selected.month, this.props.calendar.selected.day)).toDateString()}
            </label>
            <Weather {...this.props}/>
            <EventsList {...this.props}/>
          </div>
        </div>
      </div>
    )
  }
}
