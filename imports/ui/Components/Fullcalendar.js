import React, { Component } from 'react';
import Fullcalendar from 'fullcalendar';
import './Styles/bootstrap.min.css';
import 'fullcalendar/dist/fullcalendar.min.css';   
import { Events } from '../../api/events.js';

export default class Calendar extends Component {
    state = {
        events: Events.find({}).fetch(),
    }
    render() {
        return (
            <div style={{marginTop: "15px"}} className="bootstrap-scope">
                <div style={{margin: "0 auto", maxWidth: '840px'}} className="bootstrap-scope" id="calendar">
                </div>
            </div>
        );
    }
    componentDidMount() {
    console.log(this.state.events);
      $('#calendar').fullCalendar({
              themeSystem: 'bootstrap4',
              events: this.state.events,
              eventLimit: 4, 
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
      });
    }
  }
  