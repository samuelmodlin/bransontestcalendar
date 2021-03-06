import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Fade from '@material-ui/core/Fade';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { withTracker } from 'meteor/react-meteor-data';
import { Settings } from '../../api/settings.js';



import VisitDays from './VisitDays.js';

function Transition(props) {
    return <Fade direction="up" {...props} />;
}
function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}
export default class FullScreenDialog extends React.Component {
    state = {
        open: this.props.open,
        value: 0,
        // registrationOpen: Settings.find({})[0].registrationOpen,
    };
    handleSwitchChange = (event, value) => {
        this.setState({ value });
    };
    render() {
        return (
            <div>
                <Dialog
                    fullScreen
                    open={this.state.open}
                    onClose={this.props.handleClose}
                    TransitionComponent={Transition}
                >

                    <AppBar style={{ position: 'relative' }}>
                        <Toolbar>
                            <IconButton color="inherit" onClick={this.props.handleClose} aria-label="Close">
                                <CloseIcon />
                            </IconButton>
                            <Typography variant="title" color="inherit" style={{ flex: '1' }}>
                                Admin Panel
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <ExpansionPanel>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>Visit Days</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <VisitDays></VisitDays>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>Admin Tools</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                        <FormGroup row>
                            <FormControlLabel
                            control={
                                <Switch disabled
                                // checked={this.state.registrationOpen}
                                // onChange={this.handleSwitchChange('registrationOpen')}
                                value="New Teacher Registration"
                                />
                            }
                            label="New Teacher Registration"
                            />
                        </FormGroup>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel disabled>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>Special Events</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                sit amet blandit leo lobortis eget.
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    
                </Dialog>
            </div>
        );
    }
}

