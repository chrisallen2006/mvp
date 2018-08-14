import React, { Component } from 'react';
import Grid from "@material-ui/core/Grid"
import Header from '../Shared/Header';
import Footer from '../Shared/Footer';
import Progress from "../Shared/Progress"
import VehicleSelector from "../components/vehicle/VehicleSelector"
import VehicleVin from "../components/vehicle/VehicleVin"
import VehicleReqForm from "../components/vehicle/VehicleReqForm"
import VehicleVinReqForm from "../components/vehicle/VehicleVinReqForm"

class Vehicle extends Component {
  constructor(props) {
    super(props);
    let driver = ''
    let driverName = ''
    let tlc = ''
    let car = ''
    let next = 'VehicleSelector'
    try {
      driver = this.props.location.state.driver
      driverName = this.props.location.state.driverName
      tlc = this.props.location.state.tlc
      car = this.props.location.state.car
      if(car.vehicle === '' || car.vehicle === undefined) next = 'VehicleVin'
    } catch (e) {
      console.warn(e.toString())
    }

    this.state = {
      next: next,
      driver: driver,
      driverName: driverName,
      tlc: tlc,
      car: car
    };
    this.carOk = this.carOk.bind(this)
    this.setCar = this.setCar.bind(this)
    this.setNext = this.setNext.bind(this)
    this.selectComponentToRenter = this.selectComponentToRenter.bind(this)
  }

  carOk = (value) => {
    if(!value) {
      this.setState({
        next: 'VehicleVin',
        car: {
          vehicle: '',
          vinEnd: '',
          plate: ''
        }
      })
    } else {
      this.setState({ next: 'VehicleReqForm'})
    }
  }

  setCar = (value) => {
    this.setState({next: 'VehicleSelector', car: value})
  }

  setNext = next => {
    this.setState({next})
  }

  selectComponentToRenter = () => {
    switch (this.state.next) {
      case 'VehicleVin':
        return (<VehicleVin
          driver={this.state.driver}
          tlc={this.state.tlc}
          setCar={this.setCar}
          setNext={this.setNext}
        />)
      case 'VehicleReqForm':
        return (<VehicleReqForm
          driver={this.state.driver}
          tlc={this.state.tlc}
          history={this.props.history}
        />)
      case 'VehicleVinReqForm':
        return (<VehicleVinReqForm
          driver={this.state.driver}
          tlc={this.state.tlc}
        />)
      default:
        return (<VehicleSelector
          car={this.state.car}
          driver={this.state.driver}
          tlc={this.state.tlc}
          isCarOk={this.carOk}
        />);
    }
  }

  render() {
    return (
      <div className="App">
        <Header />
        <div className="App-intro">
          <Grid container spacing={0}>
            <Grid item xs={12}>
              <Progress step="Vehicle"/>
            </Grid>
          </Grid>
          {this.selectComponentToRenter()}
        </div>
        <Footer history={this.props.history}/>
      </div>
    )
  }
}

export default Vehicle;