import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Grid from "@material-ui/core/Grid";
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from "@material-ui/core/SvgIcon";
import {withStyles} from "@material-ui/core/styles";
import {Link} from 'react-router-dom';
import Hidden from "@material-ui/core/Hidden";

const styles = theme => ({
  button: {
    margin: `0 0 ${theme.spacing.unit * 3.75}px 0`,
    backgroundImage: 'linear-gradient(127deg, #eeb200, #e36c18)',
    borderRadius: 30,
    color: '#FFFFFF'
  },
  arrow: {
    padding: '5px 0 0 15px',
    fontSize: 26
  },
  chat: {
    padding: '5px 0 0 5px',
    fontSize: 26
  },
  link: {
    textDecoration: 'none',
    textAlign: 'left',
    fontSize: 14,
    lineHeight: 1.2,
    letterSpacing: 0.5,
    color: '#f2f2f2',
    margin: 0
  }
});

const ArrowIcon = (props) => (
  <SvgIcon {...props}>
    <path d="M5.36.5L.591 8l4.767 7.5h2.885L3.447 8 8.244.5H5.36z"/>
  </SvgIcon>
);

const ChatIcon = (props) => (
  <SvgIcon {...props}>
    <defs>
      <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="a">
        <stop stopColor="#FAFAFA" offset="0%"/>
        <stop stopColor="#E6E6E6" offset="100%"/>
      </linearGradient>
      <linearGradient x1="50%" y1="99.495%" x2="50%" y2="82.357%" id="b">
        <stop stopColor="#F4F4F4" offset="0%"/>
        <stop stopColor="#FFF" offset="100%"/>
      </linearGradient>
    </defs>
    <g transform="translate(-14 -14)" fill="url(#a)" stroke="url(#b)" fillRule="evenodd" fillOpacity=".8">
      <path
        d="M29.5 28.903L25.583 25.5H20.683a2.183 2.183 0 0 1-2.183-2.183V18a3.5 3.5 0 0 1 3.5-3.5h8a3.5 3.5 0 0 1 3.5 3.5v5.333c0 1.197-.97 2.167-2.167 2.167H29.5v3.403z"/>
      <path
        d="M18.5 34.903l3.917-3.403H27.317a2.183 2.183 0 0 0 2.183-2.183V24a3.5 3.5 0 0 0-3.5-3.5h-8a3.5 3.5 0 0 0-3.5 3.5v5.333c0 1.197.97 2.167 2.167 2.167H18.5v3.403z"/>
    </g>
  </SvgIcon>
);

class Footer extends Component {

  onClickBack() {
    this.props.history.goBack()
  }

  render() {
    let classText = (this.props.history.location.pathname === '/') ? 'white' : 'gray';
    const {classes} = this.props;
    return (
      <footer className="App-footer">
        <Grid container spacing={0} justify='center' wrap={'nowrap'}>
          <Grid item xs={3} style={{textAlign: 'left'}}>
            <IconButton
              className={classes.button}
              aria-label="Back"
              color="primary"
              onClick={() => this.onClickBack()}
            >
              <ArrowIcon className={classes.arrow}/>
            </IconButton>
          </Grid>
          <Hidden mdUp>
            <Grid item xs={3} md={2}/>
          </Hidden>
          <Grid item xs={3} style={{textAlign: 'right'}}>
            <IconButton
              className={classes.button}
              aria-label="Back"
              color="primary"
              onClick={() => this.onClickBack()}
            >
              <ChatIcon className={classes.chat}/>
            </IconButton>
          </Grid>
        </Grid>
        <Grid container justify={"center"} spacing={0}>
          <Grid item xs={9} md={6}>
            <Link to="#" className={`${classes.link} ${classText}`}>Terms of Service</Link>
          </Grid>
        </Grid>
      </footer>
    )
  }
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer);