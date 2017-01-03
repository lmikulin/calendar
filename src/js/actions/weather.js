import axios from "axios";

export function getWeather(day) {
  return function(dispatch) {
    axios.get("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22vancouver%2C%20bc%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys")
      .then(response => {
        dispatch({
          type: "WEATHER_FORECAST_FULFILLED",
          payload: {
            condition: response.data.query.results.channel.item.condition,
            forecast: response.data.query.results.channel.item.forecast
          }
        });
      })
      .catch(err => dispatch({type: "WEATHER_FORECAST_ERROR", payload: err}));
  }
}
