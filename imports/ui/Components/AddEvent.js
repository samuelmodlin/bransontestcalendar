import React, {Component} from 'react';
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
import Slide from '@material-ui/core/Slide';

function Transition(props) {
    return <Slide direction="up" {...props} />;
}
export default class AddEvent extends Component {
    addAssessment = () => {
        console.log('save');
        this.props.handleModalClose();
    }
    render(){
        const { addModal } = this.props
        const { handleModalClose } = this.props
        return(
            <div>
                <Dialog
                fullScreen
                open={addModal}
                onClose={handleModalClose}
                TransitionComponent={Transition}
                >
                    <AppBar>
                        <Toolbar>
                        <IconButton color="inherit" onClick={handleModalClose} aria-label="Close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="title" color="inherit" style={{flex: '1'}}>
                            Add New Assessment
                        </Typography>
                        <Button variant="raised" color="secondary" onClick={this.addAssessment}>
                            ADD
                        </Button>
                        </Toolbar>
                    </AppBar>
                    <List>
                        <ListItem button>
                        <ListItemText primary="Phone ringtone" secondary="Titania" />
                        </ListItem>
                        <Divider />
                        <ListItem button>
                        <ListItemText primary="Default notification ringtone" secondary="Tethys" />
                        </ListItem>
                    </List>
                </Dialog>
            </div>
        );
    }
}
