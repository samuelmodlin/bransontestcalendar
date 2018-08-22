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
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

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
    };
    handleChange = (event, value) => {
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
                    <div style={{ flexGrow: "1" }}>
                        <AppBar position="relative">
                        <IconButton color="inherit" onClick={this.props.handleClose} aria-label="Close">
                                <CloseIcon />
                            </IconButton>
                            <Typography variant="title" color="inherit" style={{ marginLeft: '5px', flex: '1' }}>
                                Admin Panel
                            </Typography>
                            <Tabs value={this.state.value} onChange={this.handleChange}>
                                <Tab label="Item One" />
                                <Tab label="Item Two" />
                                <Tab label="Item Three"/>
                            </Tabs>
                        </AppBar>
                        {
                            this.state.value === 0 &&
                            <TabContainer>Item One</TabContainer>
                        }
                        {
                            this.state.value === 1 &&
                            <TabContainer>Item Two</TabContainer>
                        }
                        {
                            this.state.value === 2 &&
                            <TabContainer>Item Three</TabContainer>
                        }
                    </div>
                </Dialog>
            </div>
        );
    }
}
