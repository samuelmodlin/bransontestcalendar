import React, { Component } from 'react';
import Fullcalendar from 'fullcalendar';
import './Styles/bootstrap.min.css';
import 'fullcalendar/dist/fullcalendar.min.css';
import { withTracker } from 'meteor/react-meteor-data';
import { Events } from '../../api/events.js';
import { Session } from 'meteor/session';
import Settings from '../../../departments.json';
import moment from 'moment';

export class Calendar extends Component {
    state = {
        handleDialogOpen: this.props.handleDialogOpen, 
    }
    openDialog = (eventObject) => {
        this.state.handleDialogOpen(eventObject);
    }
    moveDate(event){
        Meteor.call('removeEvent', {
            id: event._id,
            googleId: Meteor.userId()
        }, (err, res) => {
            if (err) {
                //console.log("Error with deleting event!")
            } else {
                //console.log("success deleting, now adding...");
                Meteor.call('addEvent', {
                    name: event.name,
                    classTitle: event.classTitle,
                    department: event.department,
                    date: event.start.format('YYYY-MM-DD'),
                    type: event.type,
                    blocks: event.blocks,
                    grades: event.grades,
                    created: new Date(),
                    googleId: Meteor.userId(),
                }, (err, res) => {
                    if (err) {
                        //console.log("error adding event");
                    } else {
                        //console.log("success with edit");
                    }
                });
            }
        });
    }
    render() {
        return (
            <div style={{ marginTop: "15px" }} className="bootstrap-scope">
                <div style={{ margin: "0 auto", maxWidth: '1265px' }} className="bootstrap-scope" id="calendar">
                </div>
            </div>
        );
    }
    componentDidMount() {
        $('#calendar').fullCalendar({
            themeSystem: 'bootstrap4',
            events: this.props.events,
            eventLimit: 4,
            eventDrop: (event, delta, revertFunc) => {
                this.moveDate(event);
            },
            eventColor: 'rgb(63, 81, 181)',
            dayClick: (date, jsEvent, view) => {
                this.props.selectDate(date);
                this.props.handleModalOpen();
            },
            // hiddenDays: [0, 6],
            views: {
                basicWeek: {
                    eventLimit: false,
                }
            },
            eventOrder: (a, b) => {
                if (a.miscProps.created > b.miscProps.created){
                    return 1;
                }
                return -1;
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
            let blocks = "";
            let grades = "";

            for (let i = 0; i < obj.blocks.length; i++) {
                if (obj.blocks[i]) {
                    blocks += Settings.blocks[i] + ", ";
                }
            }
            for (let i = 0; i < obj.grades.length; i++) {
                if (obj.grades[i]) {
                    grades += Settings.grades[i] + ", ";
                }
            }

            blocks = blocks.substring(0, blocks.length-2);
            grades = grades.substring(0, grades.length-2);

            obj.title = obj.classTitle 
                        + " " + obj.type
                        + " (" + blocks + ")"
                        + " (" + grades + ")";

            if (obj.googleId == Meteor.userId()){
                obj.editable = true;
                obj.color = 'rgb(245, 0, 87)';

            } 
            else {
                obj.editable = false;
            }
            obj.eventColor = 'rgb(245, 0, 87)';

            return obj;
        }),
    }
})(Calendar);
