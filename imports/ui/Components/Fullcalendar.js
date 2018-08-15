import React, { Component } from 'react';
import Fullcalendar from 'fullcalendar';
import './Styles/bootstrap.min.css';
import 'fullcalendar/dist/fullcalendar.min.css';
import { withTracker } from 'meteor/react-meteor-data';
import { Events } from '../../api/events.js';
import { Session } from 'meteor/session';
import Settings from '../../../departments.json';

export class Calendar extends Component {
    state = {
        handleDialogOpen: this.props.handleDialogOpen, 
    }
    openDialog = (eventObject) => {
        this.state.handleDialogOpen(eventObject);
    }
    render() {
        return (
            <div style={{ marginTop: "15px" }} className="bootstrap-scope">
                <div style={{ margin: "0 auto", maxWidth: '1012px' }} className="bootstrap-scope" id="calendar">
                </div>
            </div>
        );
    }
    componentDidMount() {
        $('#calendar').fullCalendar({
            themeSystem: 'bootstrap4',
            events: this.props.events,
            eventLimit: 4,
            hiddenDays: [0, 6],
            views: {
                basicWeek: {
                    eventLimit: false,
                }
            },
            displayEventTime: false,
            displayEventEnd: false,
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,basicWeek'
            },
            eventClick: (calEvent) => {
                // alert('Event: ' + calEvent.title);
                this.openDialog(calEvent);
            }
        });    
    }
    componentDidUpdate() {
        $("#calendar").fullCalendar('removeEvents'); 
        $("#calendar").fullCalendar('addEventSource', this.props.events); 
    }
}

export default withTracker(props => {
    Session.set('events', Events.find({}).fetch());
    return {
        events: Events.find({}).fetch().map((obj) => {
            obj.title = Settings.departments[obj.department].name + " " + obj.type;
            return obj;
        }),
    }
})(Calendar);
