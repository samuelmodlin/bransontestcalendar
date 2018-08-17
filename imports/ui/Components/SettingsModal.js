import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { withTracker } from 'meteor/react-meteor-data';


class SettingsModal extends React.Component {
    state = {
        department: this.props.department,
    };

    handleSave = () => {
        Meteor.call('changeDepartment', {
            department: this.state.department
        });
        this.props.handleClose();
    };

    handleTextChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    }

    render() {
        const { open } = this.props
        const { handleClose } = this.props
        return (
            <div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Edit Settings</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            To set your default settings, edit the fields below. They will be saved with your google id.
                        </DialogContentText>
                        <FormControl style={{marginTop: "16px"}}>
                            <InputLabel htmlFor="department-menu">Department</InputLabel>
                            <Select
                                value={this.state.department}   
                                onChange={this.handleTextChange('department')}
                                fullWidth
                            >
                                <MenuItem value={0}>Art</MenuItem>
                                <MenuItem value={1}>English</MenuItem>
                                <MenuItem value={2}>History</MenuItem>
                                <MenuItem value={3}>Language</MenuItem>
                                <MenuItem value={4}>Math</MenuItem>
                                <MenuItem value={5}>Science</MenuItem>
                            </Select>
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="secondary">
                            Cancel
            </Button>
                        <Button onClick={this.handleSave} color="primary">
                            Save
            </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default withTracker(props => {
    Session.set('department', Meteor.user().profile.department);
    return {
        department: Meteor.user().profile.department,
    }
})(SettingsModal);
