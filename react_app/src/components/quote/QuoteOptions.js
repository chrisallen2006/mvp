import React, {Component} from 'react';
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from "@material-ui/core/FormControl";
import Paper from '@material-ui/core/Paper';
import {withStyles} from "@material-ui/core/styles"
import Hidden from "@material-ui/core/Hidden";

const styles = theme => ({
  bootstrapRoot: {
    padding: 0,
    'label + &': {
      marginTop: theme.spacing.unit * 3,
    },
  },
  textEstimatePrice: {
    fontSize: 24,
    lineHeight: 1.25,
    fontWeight: 300,
    textAlign: 'center',
    color: '#5c5a56',
    margin: `${theme.spacing.unit}px 0`
  },
  textPrice: {
    color: '#3023ae',
    fontSize: 42
  },
  textNextPayment: {
    fontSize: 16,
    lineHeight: 2,
    fontWeight: 300,
    letterSpacing: 0.3,
    textAlign: 'center',
    color: '#827d75',
    margin: `${theme.spacing.unit}px 0`
  },
  textUpperCase: {
    fontSize: 16,
    fontWeight: 600,
    lineHeight: 1.25,
    letterSpacing: 0.3,
    textAlign: 'left',
    color: '#5c5a56 !important',
    margin: `${theme.spacing.unit}px 0`,
    textTransform: 'uppercase',
    fontFamily: "'Roboto Condensed', sans-serif",
  },
  text: {
    fontSize: 14,
    lineHeight: 1.25,
    letterSpacing: 0.3,
    textAlign: 'left',
    color: '#5c5a56',
    margin: `${theme.spacing.unit}px 0`
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
    color: '#FFFFFF',
    boxShadow: 'none'
  },
  page: {
    borderRadius: theme.spacing.unit,
    backgroundImage: 'linear-gradient(to top, rgba(244, 244, 244, 0.6), rgba(255, 255, 255, 0.6))',
    border: 'solid 1px rgba(112, 112, 112, 0.6)',
    boxShadow: 'none',
    margin: `${theme.spacing.unit}px 0`,
    padding: `${theme.spacing.unit * 2}px !important`
  }
});

class QuoteOptions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      price: this.props.liability,
      physicalValue: this.props.physical,
      nextPayment: 'Oct. 7, 2018',
      physical: '3',
      bodilyInjury: '1',
      propertyDamage: '1',
      uninsuredMotorist: '1',
      personalInjury: '1',
      aggregateNoFault: '1'
    }
  }

  handleChange = event => {
    this.setState({physical: event.target.value});
  };

  render() {
    const {classes} = this.props;

    let option = parseInt(this.state.physical, 10),
      classActive;
    classActive = {
      1: option === 1 ? 'active' : '',
      2: option === 2 ? 'active' : '',
      3: option === 3 ? 'active' : ''
    };

    return (
      <Grid container justify={"center"}>

        <Grid item xs={12}>
          <Grid container justify={"center"}>
            <Hidden xsDown>
              <Grid item sm={2}/>
            </Hidden>
            <Grid item xs={10} sm={8}>
              <br/>
              <p className={classes.textEstimatePrice}>
                Estimated monthly price: <br/>
                <span className={classes.textPrice}>${Math.round(this.state.price)}</span>
              </p>
            </Grid>
            <Hidden xsDown>
              <Grid item sm={2}/>
            </Hidden>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Grid container justify={"center"}>
            <Grid item xs={8} sm={4}>
              <p className={classes.textNextPayment}>Next payment Due: {this.state.nextPayment}</p>
            </Grid>
            <Hidden lgDown>
              <Grid item xs={3} sm={2}>
                <p className={classes.textNextPayment} style={{textAlign: 'right'}}>
                  <Button className={`more`} size="small">more</Button>
                </p>
              </Grid>
            </Hidden>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Grid container justify={"center"}>
            <Hidden xsDown>
              <Grid item sm={2}/>
            </Hidden>
            <Grid item xs={10} sm={8}>
              <p className={classes.text} style={{textAlign: 'center'}}>Please choose how much Physical <br/>
                Coverage you would like on your policy:</p>
            </Grid>
            <Hidden xsDown>
              <Grid item sm={2}/>
            </Hidden>
          </Grid>
        </Grid>

        <Hidden smDown>
          <Grid item md={3}/>
        </Hidden>
        <Grid item xs={11} sm={8} md={6}>
          <FormControl fullWidth className={`physicalSelector`}>
            <Grid container justify={"center"}>
              <Grid item xs={4}>
                <FormLabel style={{float: 'left'}} className={classes.textUpperCase}>Physical *</FormLabel>
              </Grid>
              <Grid item xs={8}>
                <RadioGroup
                  style={{float: 'right'}}
                  aria-label="Physical Coverage"
                  name="physical"
                  value={this.state.physical}
                  onChange={this.handleChange}
                >
                  <FormControlLabel value="1" control={<Radio/>} label={`$0`} className={`${classActive[1]}`}/>
                  <FormControlLabel value="2" control={<Radio/>}
                                    label={`$${Math.round(this.state.physicalValue / 2)}`} className={`${classActive[2]}`}/>
                  <FormControlLabel value="3" control={<Radio/>} label={`$${Math.round(this.state.physicalValue)}`} className={`${classActive[3]}`}/>
                </RadioGroup>
              </Grid>
            </Grid>
          </FormControl>
        </Grid>
        <Hidden smDown>
          <Grid item md={3}/>
        </Hidden>

        <Hidden smDown>
          <Grid item md={3}/>
        </Hidden>
        <Grid item xs={10} sm={8} md={6}>
          <p className={classes.textUpperCase} style={{textAlign: 'center'}}>Already included</p>
          <p className={classes.text} style={{textAlign: 'center'}}>The following policy options are required by the NYC
            TLC License Commission.</p>
        </Grid>
        <Hidden smDown>
          <Grid item md={3}/>
        </Hidden>

        <Hidden smDown>
          <Grid item md={3}/>
        </Hidden>
        {/***BODILY INJURY***/}
        <Grid item xs={11} sm={8} md={6}>
          <Paper className={`${classes.page} page`} elevation={1}>
            <Grid container>
              <Grid item xs={6}>
                <h4 className={classes.textUpperCase}>BODILY INJURY</h4>
              </Grid>
              <Grid item xs={6}>
                <FormControl component="fieldset" className={`pageSelector`}
                             style={{float: 'right'}}>
                  <RadioGroup
                    aria-label="BODILY INJURY"
                    name="physical"
                    value={this.state.bodilyInjury}
                  >
                    <FormControlLabel
                      value="1"
                      control={<Radio/>}
                      label={`$100,000 / $300,000`}
                      className={`active`}
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <p className={classes.text}>Bodily Injury Liability insurance pays for injuries you cause to another
                  driver if you are
                  at-fault in the accident.</p>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Hidden smDown>
          <Grid item md={3}/>
        </Hidden>

        <Hidden smDown>
          <Grid item md={3}/>
        </Hidden>
        {/***PROPERTY DAMAGE***/}
        <Grid item xs={11} sm={8} md={6}>
          <Paper className={`${classes.page} page`} elevation={1}>
            <Grid container spacing={0}>
              <Grid item xs={6}>
                <h4 className={classes.textUpperCase}>PROPERTY DAMAGE</h4>
              </Grid>
              <Grid item xs={6}>
                <FormControl component="fieldset" className={`pageSelector`}
                             style={{float: 'right'}}>
                  <RadioGroup
                    aria-label="PROPERTY DAMAGE"
                    name="physical"
                    value={this.state.propertyDamage}
                  >
                    <FormControlLabel
                      value="1"
                      control={<Radio/>}
                      label={`$100,000`}
                      className={`active`}
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <p className={classes.text}>Property Damage Liability insurance pays for damages to someone else's
                  property after an accident you cause.</p>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Hidden smDown>
          <Grid item md={3}/>
        </Hidden>

        <Hidden smDown>
          <Grid item md={3}/>
        </Hidden>
        {/***UNINSURED MOTORIST ***/}
        <Grid item xs={11} sm={8} md={6}>
          <Paper className={`${classes.page} page`} elevation={1}>
            <Grid container spacing={0}>
              <Grid item xs={6}>
                <h4 className={classes.textUpperCase}>UNINSURED MOTORIST </h4>
              </Grid>
              <Grid item xs={6}>
                <FormControl component="fieldset" className={`pageSelector`}
                             style={{float: 'right'}}>
                  <RadioGroup
                    aria-label="UNINSURED MOTORIST "
                    name="physical"
                    value={this.state.uninsuredMotorist}
                  >
                    <FormControlLabel
                      value="1"
                      control={<Radio/>}
                      label={`$25,000 / $50,000`}
                      className={`active`}
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <p className={classes.text}>Uninsured Motorist insurance pays you damages for any injury recieved from
                  an uninsured, negligent driver.</p>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Hidden smDown>
          <Grid item md={3}/>
        </Hidden>

        <Hidden smDown>
          <Grid item md={3}/>
        </Hidden>
        {/*** PERSONAL INJURY PROTECTION ***/}
        <Grid item xs={11} sm={8} md={6}>
          <Paper className={`${classes.page} page`} elevation={1}>
            <Grid container spacing={0}>
              <Grid item xs={8}>
                <h4 className={classes.textUpperCase}>PERSONAL INJURY PROTECTION</h4>
              </Grid>
              <Grid item xs={4}>
                <FormControl component="fieldset" className={`pageSelector`}
                             style={{float: 'right'}}>
                  <RadioGroup
                    aria-label="PERSONAL INJURY PROTECTION"
                    name="physical"
                    value={this.state.personalInjury}
                  >
                    <FormControlLabel
                      value="1"
                      control={<Radio/>}
                      label={`$200,000`}
                      className={`active`}/>
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <p className={classes.text}>Personal Injury Protection insurance covers medical expenses and can cover
                  lost wages.</p>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Hidden smDown>
          <Grid item md={3}/>
        </Hidden>

        <Hidden smDown>
          <Grid item md={3}/>
        </Hidden>
        {/*** AGGREGATE NO-FAULT ***/}
        <Grid item xs={11} sm={8} md={6}>
          <Paper className={`${classes.page} page`} elevation={1}>
            <Grid container spacing={0}>
              <Grid item xs={6}>
                <h4 className={classes.textUpperCase}>AGGREGATE NO-FAULT</h4>
              </Grid>
              <Grid item xs={6}>
                <FormControl component="fieldset" className={`pageSelector`}
                             style={{float: 'right'}}>
                  <RadioGroup
                    aria-label="AGGREGATE NO-FAULT"
                    name="physical"
                    value={this.state.aggregateNoFault}
                  >
                    <FormControlLabel
                      value="1"
                      control={<Radio/>}
                      label={`$200,000`}
                      className={`active`}/>
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <p className={classes.text}>Aggregate No-Fault insurance can cover medical expensive and lost wages. As
                  no fault insurance, because it is available regardless of who caused the accident.</p>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Hidden smDown>
          <Grid item md={3}/>
        </Hidden>

        <Grid item xs={9} sm={6}>
          <Button variant="contained"
                  size="large"
                  color="primary"
                  fullWidth
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

QuoteOptions.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(QuoteOptions);
