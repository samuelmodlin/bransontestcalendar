import React, { Component } from 'react';
import Fullcalendar from 'fullcalendar';

import './Styles/bootstrap.min.css'
import 'fullcalendar/dist/fullcalendar.min.css';   

export default class Calendar extends Component {
    state = {
        events: [
            {
                title: 'History Test',
                start: '2018-05-08',
                fuckallofthis: "xd",
            },
            {
                title: 'English Essay',
                start: '2018-05-08'
            },
            {
                title: 'Science Lab',
                start: '2018-05-08'
            },
            {
                title: 'Microbiology',
                start: '2018-05-08'
            },
            {
                title: 'Other',
                start: '2018-05-08'
            },
        ]
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
  