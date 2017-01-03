import React from "react";
import {hideModal, addEvent} from "../actions/events";

export default class AddEvent extends React.Component {
  constructor() {
    super();
    this._onResetAndHideModal = this._onResetAndHideModal.bind(this);
    this._onAddEvent = this._onAddEvent.bind(this);
  }
  _onResetAndHideModal(event) {
    event.preventDefault();
    event.stopPropagation();
    this.refs.addForm.reset();
    this.props.dispatch(hideModal());
  }
  _onAddEvent(event) {
    event.preventDefault();
    event.stopPropagation();
    this.props.dispatch(addEvent(this.props.events.modal, event.target.elements["event-type"].value, event.target.elements["event-body"].value));
    event.target.reset();
  }
  render() {
    return (
      <div className={`add-event ${this.props.events.modal ? "show-modal" : ""}`} id="modal">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">Add a Calendar Event</h3>
          </div>
          <div className="panel-body">
            <form ref="addForm" onSubmit={this._onAddEvent}>
              <div className="form-group">
                <label>Event type</label>
                <select name="event-type" className="form-control">
                  <option value="MEETING" style={{color: "#3fad46"}}>Meeting</option>
                  <option value="APPOINTMENT" style={{color: "#f0ad4e"}}>Appointment</option>
                  <option value="TASK" style={{color: "#5bc0de"}}>Task</option>
                </select>
              </div>
              <div className="form-group">
                <textarea name="event-body" cols="40" placeholder="event details..." style={{borderColor: "lightgray"}}></textarea>
              </div>
              <div className="text-right">
                <button type="cancel" onClick={this._onResetAndHideModal} className="btn btn-default">Cancel</button>
                <button type="submit" className="btn btn-default" style={{marginLeft: "12px"}}>Add Event</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
