import React, { Component } from 'react';
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
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormGroup from '@material-ui/core/FormGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Settings from "../../../departments.json";
import DatePicker from 'react-datepicker';
import moment from 'moment';

function Transition(props) {
    return <Slide direction="up" {...props} />;
}
const styles = {
    paper: {
        minHeight: "100%",
        margin: "10px 10px 0px 10px",
        display: 'flex',
        flexWrap: 'wrap',
    },
    input: {
        width: '200px',
        marginLeft: '16px',
        marginTop: '16px',
        marginBottom: "8px",
    },
}
export default class EditEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.event.name,
            classTitle: this.props.event.classTitle,
            department: this.props.event.department,
            date: this.props.event.start,
            type: this.props.event.type,
            blocks: this.props.event.blocks,
            grades: this.props.event.grades,
            edited: false,
        }
        this.handleDateChange = this.handleDateChange.bind(this);
    }

    editAssessment = () => {
        // console.log(Meteor.userId());
        // console.log(this.props.event.googleId);
        if (this.state.name == "" || this.state.classTitle == "" || this.state.date == undefined || this.state.type == undefined || this.state.blocks == [false, false, false, false, false, false, false] || this.state.grades == [false, false, false, false]) {
            alert("Please fill out all fields!");
        }
        else {
            Meteor.call('removeEvent', {
                id: this.props.event._id,
                googleId: this.props.event.googleId,
            }, (err, res) => {
                if (err) {
                    // console.log("Error with deleting event!")
                } else {
                    // console.log("success deleting, now adding...");
                    Meteor.call('addEvent', {
                        name: this.state.name,
                        classTitle: this.state.classTitle,
                        department: this.state.department,
                        date: this.state.date.format('YYYY-MM-DD'),
                        type: this.state.type,
                        blocks: this.state.blocks,
                        grades: this.state.grades,
                        created: new Date(),
                        googleId: this.props.event.googleId,
                    }, (err, res) => {
                        if (err) {
                            // console.log("error adding event");
                        } else {
                            // console.log("success with edit");
                        }
                    });
                }
            });

            this.props.handleModalClose();
        }
    }
    isWeekday = (date) => {
        const day = date.day()
        return day !== 0 && day !== 6
    }
    handleDateChange = (date) => {
        this.setState({
            date: date,
            edited: true,
        })
    }
    handleTextChange = name => event => {
        this.setState({
            [name]: event.target.value,
            ["edited"]: true,
        });
    }
    handleBlockChange = id => event => {
        const blocks = this.state.blocks;
        blocks[id] = event.target.checked;
        this.setState({ ["blocks"]: blocks, ["edited"]: true });
    }
    handleGradeChange = id => event => {
        const grades = this.state.grades;
        grades[id] = event.target.checked;
        this.setState({ ["grades"]: grades, ["edited"]: true });
    }
    render() {
        const { editModal } = this.props
        const { handleModalClose } = this.props

        const typeRadioButtons = [];
        const assessmentTypes = Settings.types;
        for (let i = 0; i < assessmentTypes.length; i++) {
            typeRadioButtons.push(
                <FormControlLabel key={i} value={assessmentTypes[i]} control={<Radio color="primary" />} label={assessmentTypes[i]} />
            );
        }

        const blockCheckboxes = [];
        const blocks = Settings.blocks;
        for (let i = 0; i < blocks.length; i++) {
            blockCheckboxes.push(
                <FormControlLabel
                    key={i}
                    control={
                        <Checkbox
                            key={i}
                            num={i}
                            checked={this.state.blocks[i]}
                            onChange={this.handleBlockChange(i)}
                            value={blocks[i]}
                        />
                    }
                    label={blocks[i]}
                />
            );
        }

        const gradeCheckboxes = [];
        const grades = Settings.grades;
        for (let i = 0; i < grades.length; i++) {
            gradeCheckboxes.push(
                <FormControlLabel
                    key={i}
                    control={
                        <Checkbox
                            key={i}
                            num={i}
                            checked={this.state.grades[i]}
                            onChange={this.handleGradeChange(i)}
                            value={grades[i]}
                        />
                    }
                    label={grades[i]}
                />
            );
        }

        const departmentMenuItems = [];
        const departments = Settings.departments;
        for (let i = 0; i < departments.length; i++) {
            departmentMenuItems.push(
                <MenuItem value={i} key={i}>{departments[i].name}</MenuItem>
            );
        }

        const classMenuItems = [];
        const classes = Settings.departments[this.state.department].classes;
        for (let i = 0; i < classes.length; i++){
            classMenuItems.push(
                <MenuItem value={i} key={i}>{classes[i]}</MenuItem>
            );
        }

        console.log(this.state.date);
        return (
            <div>
                <Dialog
                    fullScreen
                    open={editModal}
                    onClose={handleModalClose}
                    TransitionComponent={Transition}
                >
                    <AppBar style={{ position: 'relative' }}>
                        <Toolbar>
                            <IconButton color="inherit" onClick={handleModalClose} aria-label="Close">
                                <CloseIcon />
                            </IconButton>
                            <Typography variant="title" color="inherit" style={{ flex: '1' }}>
                                Edit Assessment
                        </Typography>
                            {
                                this.state.edited
                                    ?
                                    <Button variant="raised" color="secondary" onClick={this.editAssessment}>
                                        EDIT
                                </Button>
                                    :
                                    <Button variant="raised" color="secondary" disabled>
                                        EDIT
                                </Button>
                            }
                        </Toolbar>
                    </AppBar>
                    <Grid container spacing={0} style={{}}>
                        <Grid item xs={6} style={{}}>
                            <Paper elevation={4} style={styles.paper}>
                                <Typography style={{ width: "100%", margin: "16px 0px 0px 16px" }} variant="title">Basic Information</Typography>
                                <TextField
                                    id="name"
                                    label="Name"
                                    value={this.state.name}
                                    onChange={this.handleTextChange('name')}
                                    margin="normal"
                                    style={styles.input}
                                />
                                <br />
                                <FormControl style={{ marginTop: "16px" }}>
                                    <InputLabel style={{ marginLeft: "16px" }} htmlFor="department-menu">Department</InputLabel>
                                    <Select
                                        value={this.state.department}
                                        onChange={this.handleTextChange('department')}
                                        style={styles.input}
                                    >
                                        {departmentMenuItems}
                                    </Select>
                                </FormControl>
                                <br />
                                <FormControl style={{ marginTop: "16px" }}>
                                    <InputLabel style={{ marginLeft: "16px" }} htmlFor="classes-menu">Class</InputLabel>
                                    <Select
                                        value={this.state.classTitle}
                                        onChange={this.handleTextChange('classTitle')}
                                        style={styles.input}
                                    >
                                        {classMenuItems}
                                    </Select>
                                </FormControl>
                                <br />
                                <DatePicker
                                    style={styles.input}
                                    selected={this.state.date}
                                    onChange={this.handleDateChange}
                                    filterDate={this.isWeekday}
                                    placeholderText={"Date Of Assessment"}
                                    minDate={moment()}
                                    showDisabledMonthNavigation={true}
                                />

                            </Paper>
                        </Grid>
                        <Grid item xs={6} style={{}}>
                            <Paper elevation={4} style={styles.paper}>
                                <Typography style={{ width: "100%", margin: "16px 0px 0px 16px" }} variant="title">Assessment Details</Typography>
                                <FormControl component="fieldset" style={styles.input}>
                                    <FormLabel component="legend">Blocks</FormLabel>
                                    <FormGroup>
                                        {blockCheckboxes}
                                    </FormGroup>
                                </FormControl>
                                <FormControl component="fieldset" style={styles.input}>
                                    <FormLabel component="legend">Assessment Type</FormLabel>
                                    <RadioGroup
                                        aria-label="type"
                                        name="type"
                                        value={this.state.type}
                                        onChange={this.handleTextChange("type")}
                                    >
                                        {typeRadioButtons}
                                    </RadioGroup>
                                </FormControl>
                                <FormControl component="fieldset" style={styles.input}>
                                    <FormLabel component="legend">Grades</FormLabel>
                                    <FormGroup>
                                        {gradeCheckboxes}
                                    </FormGroup>
                                </FormControl>
                            </Paper>
                        </Grid>
                    </Grid>
                </Dialog>
            </div>
        );
    }
}
