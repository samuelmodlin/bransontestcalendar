import React, { Component } from 'react';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import GoogleButton from 'react-google-button'
//Components
import Fullcalendar from './Components/Fullcalendar.js';
import Header from './Components/Header.js';
import AddEvent from './Components/AddEvent.js';
import SettingsModal from './Components/SettingsModal.js';

import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import EventDialog from './Components/EventDialog.js';

export default class App extends Component {
    state = {
        addModal: false,
        settingsModal: false,
        loggedIn: false,
        eventDialog: false,
        eventObject: null,
    }
    componentWillMount = () => {
        if (Meteor.userId() === null) {
            this.setState({ loggedIn: false });
        }
        else {
            this.setState({ loggedIn: true });
        }
    }
    handleModalOpen = () => {
        this.setState({ addModal: true });
    }
    handleModalClose = () => {
        this.setState({ addModal: false });
    }
    handleSettingsOpen = () => {
        this.setState({ settingsModal: true });
    }
    handleSettingsClose = () => {
        this.setState({ settingsModal: false });
    }
    handleDialogOpen = (eventObject) => {
        this.setState({ eventObject: eventObject });
        this.setState({ eventDialog: true });
    }
    handleDialogClose = () => {
        this.setState({ eventDialog: false });
    }
    loginWithGoogle = () => {
        Meteor.loginWithGoogle({
        }, (err) => {
            if (err) {
                this.setState({ loggedIn: false });
            } else {
                this.setState({ loggedIn: true });
            }
        });
    }
    logout = () => {
        Meteor.logout(() => {
            console.log(Meteor.user());
            if (Meteor.user() == null) {
                this.setState({ loggedIn: false });
            }
        });
    }
    render() {
        if (this.state.loggedIn) {
            return (
                <div>
                    <Header
                        handleSettingsOpen={this.handleSettingsOpen}
                        style={{ marginBottom: "10px" }}
                        logout={this.logout}
                    />
                    <Fullcalendar
                        handleDialogOpen={this.handleDialogOpen}
                    />
                    <Button onClick={this.handleModalOpen} variant="fab" color="primary" aria-label="add" style={{ position: 'absolute', right: '5px', bottom: '5px', zIndex: "99" }}>
                        <AddIcon />
                    </Button>
                    <AddEvent
                        addModal={this.state.addModal}
                        handleModalClose={this.handleModalClose}
                        name={Meteor.user().profile.name}
                        class=""
                        department={0}
                        date={undefined}
                        type={undefined}
                        blocks={[false, false, false, false, false, false, false]}
                        grades={[false, false, false, false]}
                    />
                    <SettingsModal
                        open={this.state.settingsModal}
                        handleClose={this.handleSettingsClose}
                    />
                    {
                        this.state.eventDialog &&
                        <EventDialog 
                        open={this.state.eventDialog}
                        handleClose={this.handleDialogClose}
                        event={this.state.eventObject}
                        />
                    }
                </div>
            );
        } else {
            return (
                <div style={{ width: "100%", textAlign: "center" }}>
                    <GoogleButton
                        onClick={this.loginWithGoogle}
                        style={{ display: 'inline-block' }}
                    />
                </div>
            );
        }
    }
}