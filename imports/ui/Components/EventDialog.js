import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

import Settings from '../../../departments.json';

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

export default class EventDialog extends React.Component {
    deleteEvent = () => {
        this.props.handleClose();
        Meteor.call('removeEvent', {
            id: this.props.event._id
        }, (err, res) => {
            if (err) {
                alert(err);
            } else {
                this.props.handleClose();
            }
        })
    }
    render() {
        if (this.props.event != null) {
            let blocks = "";
            for (let i = 0; i < this.props.event.blocks.length; i++) {
                if (this.props.event.blocks[i]) {
                    blocks += Settings.blocks[i] + ", ";
                }
            }
            blocks = blocks.substring(0, blocks.length-2);
            let grades = "";
            for (let i = 0; i < this.props.event.grades.length; i++) {
                if (this.props.event.grades[i]) {
                    grades += Settings.grades[i] + ", ";
                }
            }
            grades = grades.substring(0, grades.length-2);

            const { open } = this.props;
            console.log(this.props.event);
            return (
                <div>
                    <Dialog
                        open={this.props.open}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={this.props.handleClose}
                        aria-labelledby="alert-dialog-slide-title"
                        aria-describedby="alert-dialog-slide-description"
                    >
                        <DialogTitle id="alert-dialog-slide-title">
                            {Settings.departments[this.props.event.department].name + " " + this.props.event.type}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-slide-description">
                                Posted By: {this.props.event.name}
                                <br/>
                                Department: {Settings.departments[this.props.event.department].name}
                                <br/>
                                Class: {this.props.event.className}
                                <br/>
                                Date of Assessment: {this.props.event.start._i}
                                <br/>
                                Type of Assessment: {this.props.event.type}
                                <br/>
                                Blocks: {blocks}
                                <br/>
                                Grades: {grades}
                                <br/>
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            { 
                                Meteor.userId() == this.props.event.googleId ?
                                <span>
                                    <Button onClick={this.deleteEvent} color="secondary">
                                        Delete
                                    </Button>
                                    <Button onClick={this.props.handleClose} color="primary">
                                        Edit
                                    </Button>
                                </span>
                                :
                                <span>
                                    <Button disabled color="secondary">
                                        Delete
                                    </Button>
                                    <Button disabled color="primary">
                                        Edit
                                    </Button>
                                </span>
                            }
                        </DialogActions>
                    </Dialog>
                </div>
            );
        } 
        else {
            return null;
        }
    }
}

