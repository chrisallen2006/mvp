import React, {Component} from 'react';
import PropTypes from "prop-types"
import Grid from "@material-ui/core/Grid"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import {withStyles} from "@material-ui/core/styles"
import Hidden from "@material-ui/core/Hidden";
import Grow from '@material-ui/core/Grow';

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
    textAlign: 'center',
    fontWeight: 300,
    color: '#5c5a56',
    margin: `${theme.spacing.unit * 7}px 0`
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
    padding: `${theme.spacing.unit * 1.625}px ${theme.spacing.unit * 3}px`,
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

class DriverTlc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tlc: '',
      showForm: false,
      tryNum: 1,
      name: '',
      email: '',
      phone: ''
    };

    this.handleChange = this.handleChange.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handlePhoneChange = this.handlePhoneChange.bind(this)
    this.handleNext = this.handleNext.bind(this);
  }

  handleChange = event => this.setState({tlc: event.target.value});
  handleNameChange = event => this.setState({name: event.target.value});
  handleEmailChange = event => this.setState({email: event.target.value});
  handlePhoneChange = event => this.setState({phone: event.target.value});

  async handleNext () {
    const apiUrl = process.env.REACT_APP_API_ENDPOINT + '/api/v1/checkTLC'
    const response = await fetch(apiUrl, {
      method: 'POST',
      body: JSON.stringify({number: this.state.tlc})
    })
    const json = await response.json();
    const tryNum = this.state.tryNum + json.trynum
    this.setState({tryNum: tryNum, showForm: tryNum > 1})

    this.props.setDriver(json.driver);
    this.props.setDriverName(json.driverName);
    this.props.setTlc(this.state.tlc);
    this.props.setOption('1');

    if (tryNum > 2) {
      this.props.history.push('/thankyou',)
    }
  };

  render() {
    const {classes} = this.props;
    return (
      <Grid container justify={"center"}>
        <Grid item xs={9}>
          <p className={classes.text}>
            Sorry for the mixup. <br/>
            Please re-enter your <br/>
            TLC number!
          </p>
        </Grid>

        <Hidden xsDown>
          <Grid item sm={4}/>
        </Hidden>
        <Grid item xs={9} sm={4} md={3}>
          <TextField
            placeholder="Enter TLC Number #"
            value={this.state.tlc}
            onChange={this.handleChange}
            fullWidth
            InputProps={{
              disableUnderline: true,
              classes: {
                root: classes.bootstrapRoot,
                input: `${classes.bootstrapInput} ${this.state.showForm ? 'has-error' : ''}`,
              },
            }}
          />
        </Grid>
        <Hidden xsDown>
          <Grid item sm={4}/>
        </Hidden>

        <Grow
          in={this.state.showForm}
        >
          <Grid container justify={'center'}>
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
          </Grid>
        </Grow>

        <Grid item xs={9} sm={4} md={3}>
          <Button variant="contained"
                  fullWidth
                  color="primary"
                  className={classes.button}
                  onClick={this.handleNext}
          >
            Next
          </Button>
        </Grid>

      </Grid>
    )
  }
}

DriverTlc.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  setDriver: PropTypes.func.isRequired,
  setTlc: PropTypes.func.isRequired,
  setOption: PropTypes.func.isRequired,
};

export default withStyles(styles)(DriverTlc);
