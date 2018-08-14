import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
import {Link} from "react-router-dom"
import Header from '../Shared/Header';
import Footer from '../Shared/Footer';
import Hidden from "@material-ui/core/Hidden";

const styles = theme => ({
  text: {
    fontSize: 36,
    lineHeight: 1.11,
    textAlign: 'center',
    fontWeight: 300,
    letterSpacing: 0.4,
    color: '#67676a',
    margin: `${theme.spacing.unit * 6}px 0`
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

class Thankyou extends Component {
  render() {
    const {classes} = this.props;
    return (
      <div className="App">
        <Header/>
        <div className="App-intro">
          <Grid container justify={"center"}>

            <Grid item xs={12}>
              <Grid container justify={"center"}>
                <Hidden xsDown>
                  <Grid item sm={3}/>
                </Hidden>
                <Grid item xs={9} sm={6}>
                  <h2 className={classes.text}>Thank you<br/>for testing our<br/>insurance<br/>quote system!</h2>
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
                          size="large"
                          color="primary"
                          fullWidth
                          className={classes.button}
                          component={Link}
                          to="/"
                  >
                    Go Home
                  </Button>
                </Grid>
                <Hidden xsDown>
                  <Grid item sm={3}/>
                </Hidden>
              </Grid>
            </Grid>

          </Grid>
        </div>
        <Footer history={this.props.history}/>
      </div>
    )
  }
}

Thankyou.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Thankyou);
