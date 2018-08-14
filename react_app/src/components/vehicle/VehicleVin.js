import React, {Component} from 'react';
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
    margin: `${theme.spacing.unit * 7.5}px 0 ${theme.spacing.unit * 3.75}px 0`
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

    fontFamily: "'Roboto Condensed', sans-serif",
    padding: `${theme.spacing.unit * 1.75}px ${theme.spacing.unit * 3}px`,
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

class VehicleVin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vin: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleNext = this.handleNext.bind(this);
  }

  handleChange = event => {
    this.setState({vin: event.target.value});
  };

  async handleNext () {
    const apiUrl = process.env.REACT_APP_API_ENDPOINT + '/api/v1/checkVin'

    const response = await fetch(apiUrl, {
      method: 'POST',
      body: JSON.stringify({vin: this.state.vin})
    })
    const json = await response.json();

    if (json.car.vinEnd !== '') {
      this.props.setCar({
        vehicle: json.car.vehicle,
        vinEnd: json.car.vinEnd,
        plate: json.car.plate
      })
    } else {
      this.props.setNext('VehicleVinReqForm')
    }

  };

  render() {
    const {classes} = this.props;
    return (
      <Grid container justify={"center"}>

        <Grid item xs={12}>
          <Grid container justify={"center"}>
            <Hidden xsDown>
              <Grid item sm={3}/>
            </Hidden>
            <Grid item xs={9} sm={6}>
              <p className={classes.text}>
                Ok, tell us the VIN <br/> number of the car you <br/> would like to insure.</p>
            </Grid>
            <Hidden xsDown>
              <Grid item sm={3}/>
            </Hidden>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Grid container justify={"center"}>
            <Hidden xsDown>
              <Grid item sm={3}/>
            </Hidden>
            <Grid item xs={9} sm={6}>
              <TextField
                placeholder="ENTER VIN #"
                value={this.state.vin}
                onChange={this.handleChange}
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
              <Grid item sm={3}/>
            </Hidden>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Grid container justify={"center"}>
            <Hidden xsDown>
              <Grid item sm={3}/>
            </Hidden>
            <Grid item xs={9} sm={6}>
              <Button variant="contained"
                      fullWidth
                      color="primary"
                      className={classes.button}
                      onClick={this.handleNext}
              >
                Next
              </Button>
            </Grid>
            <Hidden xsDown>
              <Grid item sm={3}/>
            </Hidden>
          </Grid>
        </Grid>

      </Grid>
    )
  }
}

export default withStyles(styles)(VehicleVin);
