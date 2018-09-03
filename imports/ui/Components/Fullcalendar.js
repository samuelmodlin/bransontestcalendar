import React, { Component } from 'react';
import Fullcalendar from 'fullcalendar';
import './Styles/bootstrap.min.css';
import 'fullcalendar/dist/fullcalendar.min.css';
import { withTracker } from 'meteor/react-meteor-data';
import { Events } from '../../api/events.js';
import { Visits } from '../../api/visits.js';
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
            <div style={{ marginTop: "15px" }} className="bootstrap-scope assessments">
                <div style={{ margin: "0 auto", maxWidth: '1265px' }} className="bootstrap-scope" id="calendar">
                </div>
            </div>
        );
    }
    componentDidMount() {
        $('#calendar').fullCalendar({
            themeSystem: 'bootstrap4',
            events: this.props.events.concat(this.props.visits),
            eventLimit: 4,
            eventDrop: (event, delta, revertFunc) => {
                this.moveDate(event);
            },
            eventColor: 'dimgray',
            dayClick: (date, jsEvent, view) => {
                if (jsEvent.target.classList.contains('fc-future')){
                    this.props.selectDate(date);
                    this.props.handleModalOpen();
                }
            },
            validRange: {
                start: moment().subtract(2, 'months').startOf('month').format('YYYY-MM-DD'),
                end: moment().add(10, 'months').endOf('month').format('YYYY-MM-DD')
            },
            hiddenDays: [0, 6],
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
                if (!(calEvent.title === "Visit Day")){
                    this.openDialog(calEvent);
                }
            },
            dayRender: (date, cell) => {
                let visits = this.props.visits;
                for (let i = 0; i < visits.length; i++){
                    if (visits[i].start  == date.format('YYYY-MM-DD')){
                        
                    }
                }
            }
        });    
    }
    componentDidUpdate() {
        $("#calendar").fullCalendar('removeEvents'); 
        $("#calendar").fullCalendar('addEventSource', this.props.events); 
        $("#calendar").fullCalendar('addEventSource', this.props.visits); 
    }
}

export default withTracker(props => {
    Session.set('events', Events.find({}).fetch());
    return {
        visits: Visits.find({}).fetch().map((obj) => {
            obj.title = "Visit Day";
            obj.created = new Date(1999, 1, 1);
            obj.editable = false;
            obj.className = "fc-visitday";
                    
            return obj;
        }),
        events: Session.get('events').map((obj) => {
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
                obj.color = 'rgb(63, 81, 181)';
            }

            return obj;
        }),
    }
})(Calendar);
