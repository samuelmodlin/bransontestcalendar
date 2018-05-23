import React, { Component } from 'react';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
//Components
import Fullcalendar from './Components/Fullcalendar.js';
import Header from './Components/Header.js';
import AddEvent from './Components/AddEvent.js';

export default class App extends Component {
    state = {
        addModal: false,
    }
    handleModalOpen = () => {
        this.setState({addModal: true});
    }
    handleModalClose = () => {
        console.log('close');
        this.setState({addModal: false});
    }
    render() {
        return (
            <div>
                <Header 
                    addModal={this.state.addModal}
                    style={{marginBottom: "10px"}}
                />
                <Fullcalendar />
                <Button onClick={this.handleModalOpen} variant="fab" color="primary" aria-label="add" style={{position: 'absolute', right: '5px', bottom: '5px'}}>
                    <AddIcon />
                </Button>
                <AddEvent   
                    addModal={this.state.addModal}
                    handleModalClose={this.handleModalClose}
                />
            </div>
        );  
    }
}