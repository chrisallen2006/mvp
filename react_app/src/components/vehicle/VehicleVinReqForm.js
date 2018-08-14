import React, {Component} from 'react';
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {withStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import {Link} from "react-router-dom";

const styles = theme => ({
  bootstrapRoot: {
    padding: 0,
    'label + &': {
      marginTop: theme.spacing.unit * 3,
    },
  },
  text: {
    fontSize: 24,
    lineHeight: 1.25,
    fontWeight: 300,
    textAlign: 'center',
    color: '#5c5a56',
    margin: `${theme.spacing.unit * 2}px 0 ${theme.spacing.unit * 2}px 0`
  },
  subText: {
    fontSize: 16,
    lineHeight: 1.25,
    textAlign: 'center',
    fontWeight: 300,
    letterSpacing: 0.3,
    color: '#5c5a56',
    margin: `${theme.spacing.unit * 2}px 0 ${theme.spacing.unit * 2}px 0`
  },
  inputText: {
    fontSize: 16,
    fontWeight: 500,
    lineHeight: 1.25,
    letterSpacing: 0.3,
    textAlign: 'left',
    color: '#827d75'
  },
  bootstrapInput: {
    borderRadius: 30,
    backgroundImage: 'linear-gradient(317deg, rgba(244,244,244,0.6), rgba(255,255,255,0.6))',
    border: 'solid 1px rgba(112,112,112,0.6)',
    fontSize: 16,
    fontWeight: 500,
    lineHeight: 1.25,
    letterSpacing: 0.3,
    textAlign: 'left',
    color: '#827d75',
    margin: `${theme.spacing.unit}px 0`,

    fontFamily: "'Roboto Condensed', sans-serif",
    padding: `${theme.spacing.unit * 1.625}px ${theme.spacing.unit * 2}px`,
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
  button: {
    margin: `${theme.spacing.unit * 2.5}px 0 0 0`,
    borderRadius: 30,
    backgroundImage: 'linear-gradient(104deg, #eeb200, #e36c18)',
    textTransform: 'capitalize',
    padding: `${theme.spacing.unit * 1.75}px ${theme.spacing.unit * 3}px`,
    fontFamily: "'Roboto Condensed', sans-serif",
    fontSize: 16,
    fontWeight: 500,
    lineHeight: 1.25,
    letterSpacing: 0.3,
    textAlign: 'center',
    color: theme.palette.common.white,
    boxShadow: 'none'
  },
});

class VehicleVinReqForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vin: '',
      name: '',
      email: '',
      phone: ''
    };
    this.handleChange = this.handleChange.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handlePhoneChange = this.handlePhoneChange.bind(this)
  }

  handleChange = event => this.setState({vin: event.target.value});
  handleNameChange = event => this.setState({name: event.target.value});
  handleEmailChange = event => this.setState({email: event.target.value});
  handlePhoneChange = event => this.setState({phone: event.target.value});

  render() {
    const {classes} = this.props;
    return (
      <Grid container justify={"center"}>

        <Grid item xs={9}>
          <br/>
          <p className={classes.text}>We're sorry, we didn't <br/> find that VIN number.</p>
          <br/>
        </Grid>

        <Grid item xs={9}>
          <TextField
            placeholder="ENTER VIN #"
            value={this.state.vin}
            onChange={this.handleChange}
            fullWidth
            InputProps={{
              disableUnderline: true,
              classes: {
                root: classes.bootstrapRoot,
                input: `${classes.bootstrapInput} has-error`,
              },
            }}
          />
        </Grid>

        <Grid item xs={9}>
          <p className={classes.subText}>We’re having trouble locating your car in the TLC database.
            You can enter your info below and we’ll reach out.</p>
        </Grid>

        <Grid item xs={9}>
          <TextField
            placeholder="ENTER YOUR NAME"
            value={this.state.name}
            onChange={this.handleNameChange}
            fullWidth
            InputProps={{
              disableUnderline: true,
              classes: {
                root: classes.bootstrapRoot,
                input: classes.bootstrapInput,
              },
            }}
          />
        </Grid>

        <Grid item xs={9}>
          <TextField
            placeholder="ENTER YOUR EMAIL"
            value={this.state.email}
            onChange={this.handleEmailChange}
            fullWidth
            InputProps={{
              disableUnderline: true,
              classes: {
                root: classes.bootstrapRoot,
                input: classes.bootstrapInput,
              },
            }}
          />
        </Grid>

        <Grid item xs={9}>
          <TextField
            placeholder="ENTER YOUR PHONE (optional)"
            value={this.state.phone}
            onChange={this.handlePhoneChange}
            fullWidth
            InputProps={{
              disableUnderline: true,
              classes: {
                root: classes.bootstrapRoot,
                input: classes.bootstrapInput,
              },
            }}
          />
        </Grid>

        <Grid item xs={9}>
          <Button variant="contained"
                  fullWidth
                  color="primary"
                  className={classes.button}
                  component={Link}
                  to="/thankyou"
          >
            Next
          </Button>
        </Grid>

      </Grid>
    )
  }
}

VehicleVinReqForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(VehicleVinReqForm)