import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {withStyles} from "@material-ui/core/styles";
import Footer from "../Shared/Footer";
import '../App.css';
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import homeMobileBg from "../images/homeMobileBg.svg";
import homeTabletBg from "../images/homeTabletBg.svg";
import homeDesktopBg from "../images/homeDesktopBg.svg";
import logo from "../images/logo.svg";
import Toolbar from "@material-ui/core/Toolbar";
import Hidden from '@material-ui/core/Hidden';
import withWidth from '@material-ui/core/withWidth';

const styles = theme => ({
    root: {
      height: '100%',
      display: 'flex',
      flexFlow: 'column',
    },
    homeHeader: {
      color: '#FFFFFF'
    },
    menuButton: {
      margin: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 3}px -${theme.spacing.unit * 1.5}px`
    },
    logo: {
      margin: `-${theme.spacing.unit * 3.75}px auto 0 auto`,
      width: '100%',
      maxWidth: '200px'
    },
    fullScreen: {
      minHeight: '100vh',
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: -1,
      width: '100%',
      height: '100%',
      backgroundSize: 'cover !important',
      backgroundPosition: '50% 0% !important'
    },
    text: {
      fontSize: 24,
      fontWeight: 300,
      lineHeight: 1.3,
      textAlign: 'center',
      color: '#f2f2f2',
      margin: 0
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
      backgroundColor: theme.palette.common.white,
      border: '1px solid #707070',
      fontSize: 16,
      fontWeight: 500,
      fontFamily: "'Roboto Condensed', sans-serif",
      padding: `${theme.spacing.unit * 1.75}px ${theme.spacing.unit * 3}px`,
      color: '#827d75',
      lineHeight: 1.25,
      letterSpacing: 0.3,
      textAlign: 'left',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      '&:focus': {
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
    button: {
      margin: `-${theme.spacing.unit * 3}px 0 0 0`,
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
    textSubTitle: {
      fontSize: '39px',
      fontWeight: '500',
      fontStyle: 'normal',
      fontStretch: 'normal',
      lineHeight: '1.2',
      letterSpacing: '0.5px',
      textAlign: 'center',
      color: '#ffffff',
      margin: '0'
    },
    separator: {
      border: 'none',
      borderBottom: '1px solid #f2f2f2',
      width: '28%',
      margin: `${theme.spacing.unit * 2.5}px auto -${theme.spacing.unit * 4.5}px auto`
    },
    bootstrapRoot: {
      padding: 0,
      'label + &': {
        marginTop: theme.spacing.unit * 3,
      },
    },
  })
;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tlc: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleNext = this.handleNext.bind(this);
  }

  handleChange = event => {
    this.setState({tlc: event.target.value});
  };

  async handleNext (event) {
    const apiUrl = process.env.REACT_APP_API_ENDPOINT + '/api/v1/checkTLC'
    const response = await fetch(apiUrl, {
      method: 'POST',
      body: JSON.stringify({number: this.state.tlc})
    })
    const json = await response.json();

    this.props.history.push({
      pathname: '/driver',
      state: {
        tlc: this.state.tlc,
        driver: json.driver,
        driverName: json.driverName,
        tryNum: json.trynum
      },
    });
  };

  render() {
    const {classes, width} = this.props;

    let background;
    switch (width) {
      case 'xs':
        background = `url('${homeMobileBg}')`;
        break;
      case 'sm':
        background = `url('${homeTabletBg}')`;
        break;
      case 'md':
        background = `url('${homeDesktopBg}')`;
        break;
      default:
        background = `url('${homeDesktopBg}')`;
    }

    return (
      <div className={classes.root}>
        <div className={classes.fullScreen} style={{'background': background}}/>
        <Grid container spacing={0} className={classes.homeHeader}>
          <Grid item xs={12}>
            <Toolbar style={{'height': 56, 'min-height': 56}}>
              <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                <MenuIcon/>
              </IconButton>
            </Toolbar>
          </Grid>
        </Grid>
        <Grid container spacing={0} className="HomeApp" justify='center'>
          <Grid item xs={9} sm={10} md={8} style={{'height': 50}}>
            <img src={logo} alt="Stable Insurance" className={`${classes.logo} home-logo`}/>
          </Grid>
          <Grid item xs={9} sm={10} md={8}>
            <Hidden xsDown>
              <p className={classes.textSubTitle}>Lets get you a TLC Insurance Quote!</p>
            </Hidden>
            <Hidden smUp>
              <p className={`${classes.text} lets-get-a-quote`}>Lets get you a Quote!</p>
              <hr className={`${classes.separator} separator`}/>
            </Hidden>
          </Grid>
          <Grid item xs={9} sm={10} md={9}>
            <Hidden xsDown>
              <p className={classes.text}>
                To start, we need the TLC license <br/> number of the person you are insuring.
              </p>
            </Hidden>
            <Hidden smUp>
              <p className={classes.text}>
                To start, we need the <br/> TLC license number.
              </p> <br/>
            </Hidden>
          </Grid>

          <Hidden xsDown>
            <Grid item sm={4}/>
          </Hidden>
          <Grid item xs={9} sm={4} md={3}>
            <TextField
              className={`inputField`}
              placeholder="Enter TLC License Number"
              value={this.state.tlc}
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
            <Grid item sm={4}/>
          </Hidden>

          <Hidden xsDown>
            <Grid item sm={4}/>
          </Hidden>
          <Grid item xs={9} sm={4} md={3}>
            <Button variant="contained"
                    fullWidth
                    color="primary"
                    className={` ${classes.button} buttonField`}
                    onClick={this.handleNext}
            >
              Next
            </Button>
          </Grid>
          <Hidden xsDown>
            <Grid item sm={4}/>
          </Hidden>

          <Grid item xs={12} className="footer-home">
            <Footer history={this.props.history}/>
          </Grid>
        </Grid>
      </div>
    )
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withWidth()(Home));
