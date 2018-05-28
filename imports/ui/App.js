import React, { Component } from 'react';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import GoogleButton from 'react-google-button'
//Components
import Fullcalendar from './Components/Fullcalendar.js';
import Header from './Components/Header.js';
import AddEvent from './Components/AddEvent.js';


export default class App extends Component {
    state = {
        addModal: false,
        settingsModal: false,
        loggedIn: false,
    }
    handleModalOpen = () => {
        this.setState({ addModal: true });
    }
    handleModalClose = () => {
        console.log('close');
        this.setState({ addModal: false });
    }
    loginWithGoogle = () => {
        Meteor.loginWithGoogle({
        }, (err) => {
            if (err) {
                console.log('false');
                this.setState({ loggedIn: false });
            } else {
                console.log('true');
                this.setState({ loggedIn: true });
            }
        });
    }
    logout = () => {
        Meteor.logout();
        this.setState({ loggedIn: false });
    }
    render() {
        if (this.state.loggedIn) {
            return (
                <div>
                    <Header
                        addModal={this.state.addModal}
                        style={{ marginBottom: "10px" }}
                        logout={this.logout}
                    />
                    <Fullcalendar />
                    <Button onClick={this.handleModalOpen} variant="fab" color="primary" aria-label="add" style={{ position: 'absolute', right: '5px', bottom: '5px', zIndex: "99" }}>
                        <AddIcon />
                    </Button>
                    <AddEvent
                        addModal={this.state.addModal}
                        handleModalClose={this.handleModalClose}
                    />
                </div>
            );
        } else {
            return (
                <div style={{width: "100%", textAlign: "center"}}>
                    <GoogleButton
                        onClick={this.loginWithGoogle}
                        style={{display: 'inline-block'}}
                    />
                </div>
            );
        }
    }
}