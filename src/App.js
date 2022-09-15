import React, { Component } from 'react'
import NavBar from './Component/NavBar'
import News from './Component/News'
import LoadingBar from 'react-top-loading-bar'

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";


export default class App extends Component {
  pageNumber = 5;
  apiKey = process.env.REACT_APP_API_KEY;

  state = {
    progress: 0
  }

  setProgress = (progress) => {
    this.setState({progress: progress})
  }

  render() {
    return (
      <>
      <Router>
        <LoadingBar
          color='#f11946'
          height={3}
          progress={this.state.progress}
        />
        <NavBar />
        {/* <News pageSize={this.pageNumber} category='sports' country='in'/> */}

        <Routes>
          <Route exact  path="/" element={<News apiKey={this.apiKey} setProgress={this.setProgress} key="sports" pageSize={this.pageNumber} category='sports' country='in' />}></Route>
          <Route exact  path="/business" element={<News apiKey={this.apiKey} setProgress={this.setProgress} key="business" pageSize={this.pageNumber} category='business' country='in' />}></Route>
          <Route exact  path="/entertainment" element={<News apiKey={this.apiKey} setProgress={this.setProgress} key="entertainment" pageSize={this.pageNumber} category='entertainment' country='in' />}></Route>
          <Route exact  path="/general" element={<News apiKey={this.apiKey} setProgress={this.setProgress} key="general" pageSize={this.pageNumber} category='general' country='in' />}></Route>
          <Route exact  path="/health" element={<News apiKey={this.apiKey} setProgress={this.setProgress} key="health" pageSize={this.pageNumber} category='health' country='in' />}></Route>
          <Route exact  path="/science" element={<News apiKey={this.apiKey} setProgress={this.setProgress} key="science" pageSize={this.pageNumber} category='science' country='in' />}></Route>
          <Route exact  path="/sports" element={<News apiKey={this.apiKey} setProgress={this.setProgress} key="sports" pageSize={this.pageNumber} category='sports' country='in' />}></Route>
          <Route exact  path="/technology" element={<News apiKey={this.apiKey} setProgress={this.setProgress} key="technology" pageSize={this.pageNumber} category='technology' country='in' />}></Route>
        </Routes>
      </Router>
      </>
    )
  }
}
