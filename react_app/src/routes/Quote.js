import React, { Component } from 'react';
import Grid from "@material-ui/core/Grid"
import Header from '../Shared/Header';
import Footer from '../Shared/Footer';
import Progress from "../Shared/Progress"
import QuoteLoading from "../components/quote/QuoteLoading"
import QuoteOptions from "../components/quote/QuoteOptions"

class Quote extends Component {
  constructor (props) {
    super(props)
    let requestDetails = {}
    let tlc =''
    try {
      requestDetails = this.props.location.state.requestDetails
      tlc = this.props.location.state.tlc
    } catch (e) {
      console.warn(e.toString())
    }
    this.state = {
      loading: true,
      tlc: tlc,
      requestDetails: requestDetails,
      liability: 0,
      physical: 0
    }
    this.setLoading = this.setLoading.bind(this)
    this.selectComponentToRenter = this.selectComponentToRenter.bind(this)
  }

  setLoading = loading => this.setState({loading})

  componentDidMount () {
    this.getQuote()
  }

  async getQuote () {
    const apiUrl = process.env.REACT_APP_API_ENDPOINT + '/api/v1/createQuote'
    const postJson = {
      tlc: this.state.tlc
    }
    const response = await fetch(apiUrl, {
      method: 'POST',
      body: JSON.stringify(postJson)
    })
    const json = await response.json();
    this.setState({
      liability: json.liability,
      physical: json.physical
    })
  }

  selectComponentToRenter = () => {
    if(this.state.loading) {
      return (<QuoteLoading
        setLoading={this.setLoading}
      />)
    } else {
      return (<QuoteOptions
        liability={this.state.liability}
        physical={this.state.physical}
      />)
    }
  }

  render() {

    return (
      <div className="App">
        <Header />
        <div className="App-intro">
          <Grid container>
            <Grid item xs={12}>
              <Progress step="Quote"/>
            </Grid>
            { this.selectComponentToRenter() }
        </Grid>
        </div>
        <Footer history={this.props.history}/>
      </div>
    )
  }
}


export default Quote;