import React, { Component } from 'react';
import Fullcalendar from 'fullcalendar';
import './Styles/bootstrap.min.css';
import 'fullcalendar/dist/fullcalendar.min.css';
import { withTracker } from 'meteor/react-meteor-data';
import { Visits } from '../../api/visits.js';
import { Session } from 'meteor/session';
import Settings from '../../../departments.json';
import moment from 'moment';

export class Calendar extends Component {
    render() {
        return (
            <div style={{ width: "100%", textAlign: "center" }} className="bootstrap-scope">
                <div style={{ margin: "0 auto", maxWidth: '632px' }} className="bootstrap-scope" id="visit-days">
                </div>
            </div>
        );
    }
    updateCalendar = () => {
        $('#visit-days').fullCalendar('prev');
        $('#visit-days').fullCalendar('next'); 
    }
    componentDidMount() {
        $('#visit-days').fullCalendar({
            themeSystem: 'bootstrap4',
            events: [],
            dayRender: (date, cell) => {
                for (let i = 0; i < this.props.visits.length; i++){
                    if (this.props.visits[i].start  == date.format('YYYY-MM-DD')){
                        cell.css('background-color', 'lightgray');
                    }
                }
            },
            hiddenDays: [0, 6],
            dayClick: (date, jsEvent, view) => {
                Meteor.call('toggleVisit', {
                    start: date.format('YYYY-MM-DD')
                });
            },
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month'
            },
        });   
    }
    componentDidUpdate() {
        this.updateCalendar();
    }
}

export default withTracker(props => {
    Session.set('visits', Visits.find({}).fetch());
    return {
        visits: Session.get('visits')
    }
})(Calendar);

