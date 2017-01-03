let now = new Date();
export const calendarInitialState = {
  year: now.getFullYear(),
  month: now.getMonth(),
  // keep these two in the state for speed
  thisMonthNow: true, // is today's date on this month being shown
  thisMonthSelected: true, // is the selected day on this month being shown
  selected: {
    year: now.getFullYear(),
    month: now.getMonth(),
    day: now.getDate()
  }
};

export const eventsInitialState = {
  modal: false,
  events: {}
};

export const eventTypeColorHash = {
  MEETING: "success", APPOINTMENT: "warning", TASK: "info"
};
