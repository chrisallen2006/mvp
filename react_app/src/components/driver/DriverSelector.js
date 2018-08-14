import React, {Component} from 'react';
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Radio from "@material-ui/core/Radio";
import Button from "@material-ui/core/Button";
import {withStyles} from "@material-ui/core/styles";
import Hidden from "@material-ui/core/Hidden";
import withWidth from "@material-ui/core/withWidth";

const styles = theme => ({
  button: {
    margin: `${theme.spacing.unit * 2}px 0 0 0`,
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
  driverName: {
    color: '#020E9F'
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },
  text: {
    fontSize: 24,
    lineHeight: 1.25,
    fontWeight: 300,
    textAlign: 'center',
    color: '#5c5a56',
    margin: `${theme.spacing.unit * 4}px 0`
  },
});

class DriverSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.option,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleNext = this.handleNext.bind(this)
  }

  handleChange = event => {
    this.setState({value: event.target.value});
    this.props.setOption(event.target.value)
  };

  async handleNext () {
    if (this.state.value === '3') {
      this.props.setTlc('')
    } else {
      const apiUrl = process.env.REACT_APP_API_ENDPOINT + '/api/v1/queryVehicle'
      const response = await fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify({driver: this.props.driverName})
      })
      const json = await response.json();

      this.props.history.push({
        pathname: '/vehicle',
        state: {
          driver: this.props.driver,
          driverName: this.props.driverName,
          tlc: this.props.tlc,
          car: json.car
        }
      });
    }
  };

  render() {
    const {classes, width} = this.props;

    let option = parseInt(this.props.option, 10),
      classActive, labelPlacement, classSpecial;
    classActive = {
      1: option === 1 ? 'active' : '',
      2: option === 2 ? 'active' : '',
      3: option === 3 ? 'active' : ''
    };

    switch (width) {
      case 'xs':
        labelPlacement = `end`;
        classSpecial = ``;
        break;
      case 'sm':
        labelPlacement = `start`;
        classSpecial = `classSpecial`;
        break;
      case 'md':
        labelPlacement = `start`;
        classSpecial = `classSpecial`;
        break;
      default:
        labelPlacement = `start`;
        classSpecial = `classSpecial`;
    }

    return (
      <Grid container justify={"center"}>


        <Hidden xsDown>
          <Grid item md={2} lg={4}/>
        </Hidden>
        <Grid item xs={11} md={8} lg={4}>
          <p className={classes.text}>We found<br/><span
            className={classes.driverName}>{this.props.driver}</span><br/>associated with that TLC number.</p>
        </Grid>
        <Hidden xsDown>
          <Grid item md={2} lg={4}/>
        </Hidden>

        <Hidden xsDown>
          <Grid item md={2} lg={3}/>
        </Hidden>
        <Grid item xs={10} sm={9} md={7} lg={5}>
          <FormControl component="fieldset" className={`${classes.formControl} driverSelector`} fullWidth>
            <RadioGroup
              aria-label="Driver Options"
              name="driver"
              className={classes.group}
              value={this.state.value}
              onChange={this.handleChange}
            >
              <FormControlLabel
                labelPlacement={`${labelPlacement}`}
                value="1"
                control={<Radio/>}
                className={`${classActive[1]} ${classSpecial} special1`}
                label={`I am ${this.props.driver}`}/>
              <FormControlLabel
                labelPlacement={`${labelPlacement}`}
                value="2"
                control={<Radio/>}
                className={`${classActive[2]} ${classSpecial} special2`}
                label={`I am getting insurance for ${this.props.driver}`}/>
              <FormControlLabel
                labelPlacement={`${labelPlacement}`}
                value="3"
                control={<Radio/>}
                className={`${classActive[3]} ${classSpecial} special3`}
                label={`I am not ${this.props.driver}`}
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Hidden xsDown>
          <Grid item md={2} lg={3}/>
        </Hidden>

        <Hidden xsDown>
          <Grid item sm={4}/>
        </Hidden>
        <Grid item xs={9} sm={4}>
          <Button variant="contained" size="large" color="primary" className={classes.button} fullWidth
                  onClick={() => this.handleNext()}>
            Next
          </Button>
        </Grid>
        <Hidden xsDown>
          <Grid item sm={4}/>
        </Hidden>
      </Grid>
    )
  }
}

DriverSelector.propTypes = {
  classes: PropTypes.object.isRequired,
  setTlc: PropTypes.func.isRequired,
  setOption: PropTypes.func.isRequired,
  driverName: PropTypes.string.isRequired,
  option: PropTypes.string.isRequired
};

export default withStyles(styles)(withWidth()(DriverSelector));
