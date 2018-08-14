import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Grid from "@material-ui/core/Grid"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import {withStyles} from "@material-ui/core/styles"
import Hidden from "@material-ui/core/Hidden";

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
    textAlign: 'center',
    color: '#827d75',
    margin: `0 ${theme.spacing.unit}px`,

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

class VehicleReqForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      month: '',
      day: '',
      year: ''
    }

    this.handleNext = this.handleNext.bind(this)
  }

  handleEmailChange = event => this.setState({email: event.target.value})
  handleMonthChange = event => this.setState({month: event.target.value})
  handleDayChange = event => this.setState({day: event.target.value})
  handleYearChange = event => this.setState({year: event.target.value})

  async handleNext () {
    const apiUrl = process.env.REACT_APP_API_ENDPOINT + '/api/v1/saveEmailDob'
    const postJson = {
      email: this.state.email,
      month: this.state.month,
      day: this.state.day,
      year: this.state.year
    }
    const response = await fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify(postJson)
    })
    await response.json();

    this.props.history.push({
      pathname: '/quote',
      state: { requestDetails: postJson, tlc: this.props.tlc},
    });
  }

  render() {
    const {classes} = this.props;
    return (
      <Grid container justify={'center'}>

        <Grid item xs={12}>
          <Grid container justify={"center"}>
            <Hidden xsDown>
              <Grid item sm={3} lg={4} />
            </Hidden>
            <Grid item xs={11} sm={6} md={3} lg={3}>
              <br/>
              <p className={classes.text}>Great! We just need your <br/> email address</p>
            </Grid>
            <Hidden xsDown>
              <Grid item sm={3} lg={4}/>
            </Hidden>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Grid container justify={'center'}>
            <Hidden xsDown>
              <Grid item sm={3} lg={4}/>
            </Hidden>
            <Grid item xs={9} sm={6} md={3} lg={3}>
              <TextField
                placeholder="ENTER EMAIL"
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
            <Hidden xsDown>
              <Grid item sm={3} lg={4}/>
            </Hidden>
          </Grid>
        </Grid>

        <Grid item xs={10} sm={6} md={4}>
          <p className={classes.text}>And to verify your date of birth</p>
        </Grid>

        <Grid item xs={12}>
          <Grid container justify={"center"}>
            <Hidden xsDown>
              <Grid item sm={3} lg={4}/>
            </Hidden>
            <Grid item xs={3} sm={2} md={1} lg={1}>
              <TextField
                placeholder="MM"
                value={this.state.month}
                onChange={this.handleMonthChange}
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
            <Grid item xs={3} sm={2} md={1} lg={1}>
              <TextField
                placeholder="DD"
                value={this.state.day}
                onChange={this.handleDayChange}
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
            <Grid item xs={3} sm={2} md={1} lg={1}>
              <TextField
                placeholder="YYYY"
                value={this.state.year}
                onChange={this.handleYearChange}
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
            <Hidden xsDown>
              <Grid item sm={3} lg={4}/>
            </Hidden>
          </Grid>
        </Grid>


        <Grid item xs={12}>
          <Grid container justify={"center"}>
            <Hidden xsDown>
              <Grid item sm={3} lg={4}/>
            </Hidden>
            <Grid item xs={9} sm={6} md={3}>
              <br/>
              <Button variant="contained"
                      size="large"
                      color="primary"
                      fullWidth
                      className={classes.button}
                      onClick={this.handleNext}
              >
                Next
              </Button>
            </Grid>
            <Hidden xsDown>
              <Grid item sm={3} lg={4}/>
            </Hidden>
          </Grid>
        </Grid>

      </Grid>
    )
  }
}

VehicleReqForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(VehicleReqForm);
