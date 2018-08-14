import React, {Component} from 'react';
import Grid from "@material-ui/core/Grid"
import LinearProgress from '@material-ui/core/LinearProgress';
import {withStyles} from "@material-ui/core/styles"
import Fade from '@material-ui/core/Fade';
import Hidden from "@material-ui/core/Hidden";

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: 0
  },
  text: {
    fontSize: 24,
    lineHeight: 1.28,
    letterSpacing: 0.3,
    fontWeight: 300,
    textAlign: 'center',
    color: '#67676a',
    margin: `${theme.spacing.unit * 10}px 0 ${theme.spacing.unit * 5}px 0`
  },
  textAnimation: {
    fontSize: 16,
    fontWeight: 300,
    lineHeight: 1.25,
    letterSpacing: 0.3,
    textAlign: 'center',
    color: '#3023ae',
    position: 'absolute',
    width: '50%',
    margin: `${theme.spacing.unit * 6}px 25% `
  }
});

class QuoteLoading extends Component {
  timer = null;

  constructor(props) {
    super(props);
    this.state = {
      completed: 0,
    }
  }

  componentDidMount() {
    this.timer = setInterval(this.progress, 200);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  progress = () => {
    const {completed} = this.state;
    if (completed === 100) {
      this.setState({completed: 0});
      this.props.setLoading(false)
    } else {
      const diff = Math.random() * 10;
      this.setState({completed: Math.min(completed + diff, 100)});
    }
  };

  render() {
    const {classes} = this.props;

    let showAnimation = {
      1: (this.state.completed > 5) && (this.state.completed < 45),
      2: (this.state.completed > 55) && (this.state.completed < 95),
    };

    return (
      <Grid container justify={"center"}>

        <Hidden smDown>
          <Grid item md={3}/>
        </Hidden>
        <Grid item xs={9} sm={8} md={6}>
          <p className={classes.text}>Analyzing Factors: </p>
        </Grid>
        <Hidden smDown>
          <Grid item md={3}/>
        </Hidden>

        <Hidden smDown>
          <Grid item md={3}/>
        </Hidden>
        <Grid item xs={9} sm={8} md={6}>
          <div className={classes.root}>
            <LinearProgress
              className={`progressBar`}
              color="secondary"
              thickness={20}
              variant={"determinate"}
              value={this.state.completed}
            />
          </div>
        </Grid>
        <Hidden smDown>
          <Grid item md={3}/>
        </Hidden>

        <Hidden smDown>
          <Grid item md={3}/>
        </Hidden>
        <Grid item xs={9} sm={8} md={6} style={{position: 'relative', height: `80px`}}>
          <Fade in={showAnimation[1]}>
            <p className={classes.textAnimation}>DRIVING RECORDS</p>
          </Fade>
          <Fade in={showAnimation[2]}>
            <p className={classes.textAnimation}>VEHICLE RECORDS</p>
          </Fade>
        </Grid>
        <Hidden smDown>
          <Grid item md={3}/>
        </Hidden>
        
      </Grid>
    )
  }
}

export default withStyles(styles)(QuoteLoading);
