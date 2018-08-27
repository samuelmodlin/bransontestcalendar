import React, { Component } from 'react';
import Fullcalendar from 'fullcalendar';
import './Styles/bootstrap.min.css';
import 'fullcalendar/dist/fullcalendar.min.css';
import { withTracker } from 'meteor/react-meteor-data';
import { Specials } from '../../api/specials.js';
import { Session } from 'meteor/session';
import Settings from '../../../departments.json';
import moment from 'moment';

export class Calendar extends Component {
    state = {
        visits: this.props.visits
    }
    render() {
        return (
            <div style={{ marginTop: "15px" }} className="bootstrap-scope">
                <div style={{ margin: "0 auto", maxWidth: '632px' }} className="bootstrap-scope" id="calendar">
                </div>
            </div>
        );
    }
    componentDidMount() {
        $('#calendar').fullCalendar({
            themeSystem: 'bootstrap4',
            events: [],
            dayRender: (date, cell) => {
                if (this.state.visits.includes(date)){
                    cell.css('background-color', 'gray');
                }
            },
            hiddenDays: [0, 6],
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month'
            },
        });    
    }
}

export default withTracker(props => {
    Session.set('visits', Specials.findOne({name: 'visits'}).fetch().days);
    return {
        visits: Specials.findOne({name: 'visits'}).days
    }
})(Calendar);

