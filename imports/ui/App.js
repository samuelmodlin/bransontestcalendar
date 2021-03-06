import React, { Component } from 'react';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';

import GoogleButton from 'react-google-button'

//Components
import Fullcalendar from './Components/Fullcalendar.js';
import Header from './Components/Header.js';
import AddEvent from './Components/AddEvent.js';
import SettingsModal from './Components/SettingsModal.js';
import AdminPanel from './Components/AdminPanel.js';

import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import EventDialog from './Components/EventDialog.js';
import EditEvent from './Components/EditEvent.js';

export default class App extends Component {
    state = {
        addModal: false,
        editModal: false,
        settingsModal: false,
        loggedIn: false,
        eventDialog: false,
        eventObject: null,
        selectedDate: undefined,
        adminPanel: false,
    }
    componentWillMount = () => {
        Tracker.autorun(() => {
            if (Meteor.user() != null) {
                this.setState({loggedIn: true});
            }
        });
    }
    selectDate = (date) => {
        this.setState({ selectedDate: date });
    }
    handleAdminOpen = () => {
        this.setState({ adminPanel: true });
    }
    handleAdminClose = () => {
        this.setState({ adminPanel: false })
    }
    handleModalOpen = () => {
        this.setState({ addModal: true });
    }
    handleModalClose = () => {
        this.setState({ addModal: false });
    }
    handleEditOpen = () => {
        this.setState({ editModal: true });
    }
    handleEditClose = () => {
        this.setState({ editModal: false });
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
        if (window.frameElement){
            Meteor.loginWithGoogle({
                loginStyle: 'popup',
            }, (err) => {
                if (err) {
                    this.setState({ loggedIn: false });
                } else {
                    this.setState({ loggedIn: true });
                }
            });
        }
        else {
            Meteor.loginWithGoogle({
                loginStyle: 'redirect',
            }, (err) => {
                if (err) {
                    this.setState({ loggedIn: false });
                } else {
                    this.setState({ loggedIn: true });
                }
            });
        }
    }
    logout = () => {
        Meteor.logout(() => {
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
                            handleAdminOpen={this.handleAdminOpen}
                        />
                        <Fullcalendar
                            handleDialogOpen={this.handleDialogOpen}
                            handleModalOpen={this.handleModalOpen}
                            selectDate={this.selectDate}
                        />
                        <Button onClick={this.handleModalOpen} variant="fab" color="primary" aria-label="add" style={{ position: 'fixed', right: '5px', bottom: '5px', zIndex: "99" }}>
                            <AddIcon />
                        </Button>
                        {
                            this.state.addModal &&
                            <AddEvent
                                addModal={this.state.addModal}
                                handleModalClose={this.handleModalClose}
                                name={Meteor.user().profile.name}
                                classTitle=""
                                department={Meteor.user().profile.department}
                                date={this.state.selectedDate}
                                type={undefined}
                                blocks={[false, false, false, false, false, false, false]}
                                grades={[false, false, false, false]}
                            />
                        }
                        {
                            this.state.editModal &&
                            <EditEvent
                                editModal={this.state.editModal}
                                handleModalClose={this.handleEditClose}
                                event={this.state.eventObject}
                            />
                        }
                        {
                            this.state.settingsModal &&
                            <SettingsModal
                                open={this.state.settingsModal}
                                handleClose={this.handleSettingsClose}
                            />
                        }
                        {
                            this.state.eventDialog &&
                            <EventDialog
                                open={this.state.eventDialog}
                                handleClose={this.handleDialogClose}
                                event={this.state.eventObject}
                                handleEditOpen={this.handleEditOpen}
                            />
                        }
                        {
                            this.state.adminPanel &&
                            <AdminPanel 
                                open={this.state.adminPanel}
                                handleClose={this.handleAdminClose}
                            />
                        }
                    </div>
            );
        } else {
            return (
                <div className="loginWrap" style={{ width: "100%", textAlign: "center" }}>
                    <GoogleButton
                        onClick={this.loginWithGoogle}
                        style={{ display: 'inline-block' }}
                    />
                </div>
            );
        }
    }
}