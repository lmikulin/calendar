export default function reducer(state={}, action) {
  switch (action.type) {
    case "WEATHER_FORECAST_FULFILLED":
      console.log("got weather conditions", action.payload);
      return {...state, condition: action.payload.condition, forecast: action.payload.forecast};
  }
  return state;
}
