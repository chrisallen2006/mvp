import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../Shared/Header';
import Footer from '../Shared/Footer';
import { withStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
import { Link } from "react-router-dom"
import Progress from "../Shared/Progress"

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    background: 'linear-gradient(45deg, #EEB200 30%, #E36C18 90%)',
    borderRadius: 25
  }
});

class Payment extends Component {
  render() {
    const { classes } = this.props
    return (
      <div className="App">
        <Header />
        <div className="App-intro">
          <Grid container spacing={0}>
            <Grid item xs={12}>
              <Progress step="Payment"/>
            </Grid>
            <Grid item xs={12}>
              <h2>Payment</h2>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained"
                      size="large"
                      color="primary"
                      className={classes.button}
                      component={Link}
                      to="/thankyou"
              >
                Next
              </Button>
            </Grid>
          </Grid>
        </div>
        <Footer history={this.props.history}/>
      </div>
    )
  }
}

Payment.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Payment);