import React, {Component} from 'react';
import PropTypes from "prop-types"
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
import {withStyles} from "@material-ui/core/styles"
import Hidden from "@material-ui/core/Hidden";

const styles = theme => ({
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
    color: '#FFFFFF',
    boxShadow: 'none'
  },
  text: {
    fontSize: 24,
    lineHeight: 1.25,
    fontWeight: 300,
    textAlign: 'center',
    color: '#5c5a56',
    margin: `${theme.spacing.unit * 2.5}px 0`,
    padding: `0 ${theme.spacing.unit * 2}px`
  },
  driverName: {},
  carName: {
    color: '#3023ae'
  }
});

class VehicleSelector extends Component {
  render() {
    const {classes} = this.props;
    return (
      <Grid container justify={"center"}>

        <Hidden xsDown>
          <Grid item sm={3} lg={4}/>
        </Hidden>
        <Grid item xs={10} sm={6} md={4} lg={3}>
          <br/>
          <p className={classes.text}>Hi <span className={classes.driverName}>{this.props.driver}</span>, we also found
            a <span className={classes.carName}>{this.props.car.vehicle}</span></p>
          <p className={classes.text}><span className={classes.carName}>
            VIN # ending in – {this.props.car.vinEnd} <br/>
            with Plate # {this.props.car.plate}</span></p>
          <p className={classes.text}>Is that the car<br/>you want to insure?</p>
        </Grid>
        <Hidden xsDown>
          <Grid item sm={3} lg={4}/>
        </Hidden>

        <Hidden xsDown>
          <Grid item sm={3} lg={4}/>
        </Hidden>
        <Grid item xs={12} sm={6} lg={3}>
          <Grid container justify={"center"}>
            <Grid item xs={4}>
              <Button variant="contained"
                      size="large"
                      color="primary"
                      fullWidth
                      className={classes.button}
                      onClick={() => this.props.isCarOk(true)}
              >
                Yes
              </Button>
            </Grid>
            <Grid item xs={1}/>
            <Grid item xs={4}>
              <Button variant="contained"
                      size="large"
                      color="primary"
                      fullWidth
                      className={classes.button}
                      onClick={() => this.props.isCarOk(false)}
              >
                No
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Hidden xsDown>
          <Grid item sm={3} lg={4}/>
        </Hidden>

      </Grid>
    )
  }
}

VehicleSelector.propTypes = {
  classes: PropTypes.object.isRequired,
  car: PropTypes.object.isRequired
};

export default withStyles(styles)(VehicleSelector)