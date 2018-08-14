import React, { Component } from 'react';
import Header from '../Shared/Header';
import Footer from '../Shared/Footer';

class About extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <div className="App-intro">
          ABOUT
        </div>
        <Footer history={this.props.history}/>
      </div>
    )
  }
}

export default About;