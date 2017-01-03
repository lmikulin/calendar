import React from "react";
const MS_TO_DAY = 24 * 60 * 60 * 1000;

export default class Weather extends React.Component {
  render() {
    if (this.props.weather.condition) {
      let now = new Date();
      now = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      let selected = new Date(this.props.calendar.selected.year, this.props.calendar.selected.month, this.props.calendar.selected.day);
      let forecastComponent = null;
      let index = Math.round((selected - now)/MS_TO_DAY);
      if ((index >= 0) && (index < this.props.weather.forecast.length)) {
        let forecast = this.props.weather.forecast[index];
        forecastComponent =  <p><label>Forecast:</label> {forecast.day}, {forecast.date}<br/>High: {forecast.high}&deg;F, Low: {forecast.low}&deg;F, {forecast.text}</p>
      }
      return (
        <div>
          <p style={{paddingTop: "5px"}}><label>Current conditions</label><br/>{this.props.weather.condition.temp}&deg;F, {this.props.weather.condition.text}</p>
          {forecastComponent}
        </div>
      )
    }
    return null;
  }
}
