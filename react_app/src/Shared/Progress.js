import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import SvgIcon from "@material-ui/core/SvgIcon"
import Button from "@material-ui/core/Button"
import {withStyles} from "@material-ui/core/styles"
import bgButtonSeparator from "../images/progressBg.png";
import Header from "./Header";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    background: 'linear-gradient(to top, rgba(238, 178, 0, 0.8), rgba(227, 108, 24, 0.8))',
    borderRadius: '50%',
    color: '#FFFFFF',
    border: '1px solid #BABABA',
    width: '40px',
    height: '40px',
    boxShadow: 'none',
    marginTop: '20px'
  },
  buttonActive: {
    fontSize: 10,
    fontWeight: 600,
    lineHeight: 1.2,
    letterSpacing: 0.7,
    textAlign: 'center',
    color: '#020e9f'
  },
  buttonDisable: {
    fontSize: 10,
    fontWeight: 'bold',
    fontStretch: 'condensed',
    lineHeight: 1.2,
    letterSpacing: 0.7,
    textAlign: 'center',
    color: '#44413c',
    opacity: 0.4
  },
  step: {
    fontSize: 10,
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  stepIconDriver: {
    padding: '8px 0 0 12px',
    fontSize: '30px'
  },
  stepIconVehicle: {
    padding: '9px 0 0 13px',
    fontSize: '33px'
  },
  stepIconQuote: {
    padding: '8px 0 0 13px',
    fontSize: '28px'
  },
  stepIconPayment: {
    padding: '13px 0 0 9px',
    fontSize: '32px'
  },
  chat: {
    padding: '10px 0 0 10px',
    fontSize: 26
  },
  link: {
    color: '#FFFFFF',
    textDecoration: 'none'
  },
  buttonSeparator: {
    background: `url('${bgButtonSeparator}')`,
    opacity: '0.4'
  }
});

const DriverIcon = (props) => (
  <SvgIcon {...props}>
    <defs>
      <linearGradient x1="50%" y1="99.495%" x2="50%" y2="82.357%" id="a">
        <stop stopColor="#F4F4F4" offset="0%"/>
        <stop stopColor="#FFF" offset="100%"/>
      </linearGradient>
    </defs>
    <g transform="translate(-25 -8)" fill="url(#a)" fillRule="evenodd">
      <ellipse cx="32" cy="19.5" rx="7" ry="4.5"/>
      <circle cx="32" cy="12" r="4"/>
    </g>
  </SvgIcon>
);
const VehicleIcon = (props) => (
  <SvgIcon {...props}>
    <g transform="translate(.464 1)" stroke="#FFF" strokeWidth="2" fill="none" fillRule="evenodd">
      <ellipse cx="6.801" cy="6" rx="5.959" ry="6"/>
      <path d="M6.8 6l4.966-1M6.8 11V6" strokeLinecap="square"/>
      <path d="M6.8 6L1.836 5"/>
    </g>
  </SvgIcon>
);
const QuoteIcon = (props) => (
  <SvgIcon {...props}>
    <defs>
      <linearGradient x1="50%" y1="99.495%" x2="50%" y2="82.357%" id="a">
        <stop stopColor="#F4F4F4" offset="0%"/>
        <stop stopColor="#FFF" offset="100%"/>
      </linearGradient>
    </defs>
    <g fill="none" fillRule="evenodd">
      <rect fill="url(#a)" width="13" height="16" rx="1"/>
      <path d="M2 5h8M2 9h8M2 13h8" stroke="#979797" strokeLinecap="square"/>
    </g>
  </SvgIcon>
);
const PaymentIcon = (props) => (
  <SvgIcon {...props}>
    <defs>
      <linearGradient x1="50%" y1="99.495%" x2="50%" y2="82.357%" id="a">
        <stop stopColor="#F4F4F4" offset="0%"/>
        <stop stopColor="#FFF" offset="100%"/>
      </linearGradient>
    </defs>
    <g transform="translate(.282)" fill="none" fillRule="evenodd">
      <rect fill="url(#a)" width="15.89" height="9" rx="1"/>
      <path fill="#9E9B96" d="M0 2h15.89v2H0zM.993 5h7.945v2H.993z"/>
      <ellipse fill="#9E9B96" cx="11.918" cy="6" rx="1" ry="1"/>
      <ellipse fill="#9E9B96" cx="13.904" cy="6" rx="1" ry="1"/>
    </g>
  </SvgIcon>
);

class Progress extends Component {
  render() {
    const {classes} = this.props;

    let $path = this.props.step;
    let containerStatus = {
      Driver: 'Driver' === $path ? classes.buttonActive : classes.buttonDisable,
      Vehicle: 'Vehicle' === $path ? classes.buttonActive : classes.buttonDisable,
      Quote: 'Quote' === $path ? classes.buttonActive : classes.buttonDisable,
      Payment: 'Payment' === $path ? classes.buttonActive : classes.buttonDisable
    };
    let status = {
      Driver: 'Driver' !== $path,
      Vehicle: 'Vehicle' !== $path,
      Quote: 'Quote' !== $path,
      Payment: 'Payment' !== $path
    };

    window.addEventListener('scroll', () => {
      if (window.scrollY > 176) {
        if (document.getElementById('progressBar') != null) {
          document.getElementById('progressBar').classList.add('fixedToTop');
          document.getElementById('root').classList.add('fixedToTop');
        }
      } else {
        if (document.getElementById('progressBar') != null) {
          document.getElementById('progressBar').classList.remove('fixedToTop');
          document.getElementById('root').classList.remove('fixedToTop');
        }
      }
    });

    return (
      <Grid id={`progressBar`} container justify={"center"} className={`${classes.step}`}>

        <Header/>

        <Grid container id={`elements`}>
          <Grid item sm={3} md={4}/>
          <Grid item xs={12} sm={6} md={4}>
            <Grid item container justify={"center"}>
              <Grid item xs={2} className={`${classes.step} ${containerStatus.Driver}`}>
                <Button
                  className={classes.button}
                  variant="fab" mini
                  aria-label="Driver"
                  color="primary"
                  disabled={status['Driver']}
                >
                  <DriverIcon className={classes.stepIconDriver}/>
                </Button><br/>Driver
              </Grid>
              <Grid item xs={1} className={`${classes.buttonSeparator} separator`}/>
              <Grid item xs={2} className={`${classes.step} ${containerStatus.Vehicle}`}>
                <Button
                  className={classes.button}
                  variant="fab" mini
                  aria-label="Vehicle"
                  color="primary"
                  disabled={status['Vehicle']}
                >
                  <VehicleIcon className={classes.stepIconVehicle}/>
                </Button><br/>Vehicle
              </Grid>
              <Grid item xs={1} className={`${classes.buttonSeparator} separator`}/>
              <Grid item xs={2} className={`${classes.step} ${containerStatus.Quote}`}>
                <Button
                  className={classes.button}
                  variant="fab" mini
                  aria-label="Quote"
                  color="primary"
                  disabled={status['Quote']}
                >
                  <QuoteIcon className={classes.stepIconQuote}/>
                </Button><br/>Quote
              </Grid>
              <Grid item xs={1} className={`${classes.buttonSeparator} separator`}/>
              <Grid item xs={2} className={`${classes.step} ${containerStatus.Payment}`}>
                <Button
                  className={classes.button}
                  variant="fab" mini
                  aria-label="Payment"
                  color="primary"
                  disabled={status['Payment']}
                >
                  <PaymentIcon className={classes.stepIconPayment}/>
                </Button><br/>Payment
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={3} md={4}/>
        </Grid>
      </Grid>
    )
  }
}

Progress.propTypes = {
  step: PropTypes.string.isRequired,
};

export default withStyles(styles)(Progress);
