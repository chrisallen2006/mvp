import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Header from '../Shared/Header';
import Progress from '../Shared/Progress';
import DriverSelector from '../components/driver/DriverSelector';
import DriverTlc from '../components/driver/DriverTlc';
import Footer from '../Shared/Footer';

class Driver extends Component {
  constructor(props) {
    super(props);
    let tlc = ''
    let driver = ''
    let driverName = ''
    let tryNum = 1
    try {
      tlc = this.props.location.state.tlc
      driver = this.props.location.state.driver
      driverName = this.props.location.state.driverName
      tryNum = this.props.location.state.tryNum
    } catch (e) {
      console.warn(e.toString())
    }

    this.state = {
      tlc: tlc,
      driver: driver,
      driverName: driverName,
      tryNum: tryNum,
      value: '1'
    };

    this.setDriver = this.setDriver.bind(this)
    this.setTlc = this.setTlc.bind(this)
    this.setOption = this.setOption.bind(this)
    this.selectComponentToRenter = this.selectComponentToRenter.bind(this)
  }

  setDriver = driver => this.setState({driver})
  setDriverName = driverName => this.setState({driverName})
  setTlc = tlc => this.setState({tlc})
  setOption = value => this.setState({value})


  selectComponentToRenter = () => {
    const selector = this.state.value;
    const tlc = this.state.tlc;
    const tryNum = this.state.tryNum
    if(selector === '3' || tlc === '' || tryNum > 0) {
      return(<DriverTlc
        history={this.props.history}
        setTlc={this.setTlc}
        setOption={this.setOption}
        setDriver={this.setDriver}
        setDriverName={this.setDriverName}
        tryNum={this.state.tryNum}
      />)
    } else {
      return (<DriverSelector
        history={this.props.history}
        tlc={this.state.tlc}
        setTlc={this.setTlc}
        setOption={this.setOption}
        driver={this.state.driver}
        driverName={this.state.driverName}
        tryNum={this.state.tryNum}
        option={this.state.value}
      />)
    }
  }

  render() {
    return (
      <div className="App">
        <Header />
        <div className="App-intro">
          <Grid container spacing={0}>
            <Grid item xs={12}>
              <Progress step="Driver"/>
            </Grid>
          </Grid>
          {this.selectComponentToRenter()}
        </div>
        <Footer history={this.props.history}/>
      </div>
    )
  }
}

export default Driver;