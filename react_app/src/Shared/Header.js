import React, {Component} from 'react';
import PropTypes from 'prop-types';
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"
import logo from "../images/logo.svg"
import {withStyles} from "@material-ui/core/styles"
import '../App.css';
import withWidth from '@material-ui/core/withWidth';
import headerMobileBg from "../images/headerMobileBg.svg";
import headerTabletBg from "../images/headerTabletBg.svg";
import headerDesktopBg from "../images/headerDesktopBg.svg";

const styles = theme => ({
  menuButton: {
    margin: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 3}px -${theme.spacing.unit * 1.5}px`
  },
  appBar: {
    backgroundSize: 'cover !important',
    backgroundPosition: '50% 0% !important'
  },
  logo: {
    margin: '0 auto',
    padding: `${theme.spacing.unit * 3.75}px ${theme.spacing.unit * 3.75}px ${theme.spacing.unit * 3.75}px 0`,
    height: 36
  }
});

class Header extends Component {
  render() {
    const {classes, width} = this.props;

    let background;
    switch (width) {
      case 'xs':
        background = `url('${headerMobileBg}')`;
        break;
      case 'sm':
        background = `url('${headerTabletBg}')`;
        break;
      case 'md':
        background = `url('${headerDesktopBg}')`;
        break;
      default:
        background = `url('${headerDesktopBg}')`;
    }
    
    if (document.getElementById('root') != null) {
      document.getElementById('root').classList.remove('fixedToTop');
    }

    return (
      <header className="App-header">
        <AppBar position="static" className={classes.appBar} style={{'background': background}} elevation={0}>
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon/>
            </IconButton>
            <img src={logo} alt="Stable Insurance" className={classes.logo}/>
          </Toolbar>
        </AppBar>
      </header>
    )
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withWidth()(Header));
