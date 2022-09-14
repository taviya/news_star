import React, { Component } from 'react'
import NavBar from './Component/NavBar'
import News from './Component/News'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <>
      <Router>
        <NavBar />
        {/* <News pageSize={5} category='sports' country='in'/> */}

        <Routes>
          <Route exact  path="/" element={<News key="sports" pageSize={5} category='sports' country='in' />}></Route>
          <Route exact  path="/business" element={<News key="business" pageSize={5} category='business' country='in' />}></Route>
          <Route exact  path="/entertainment" element={<News key="entertainment" pageSize={5} category='entertainment' country='in' />}></Route>
          <Route exact  path="/general" element={<News key="general" pageSize={5} category='general' country='in' />}></Route>
          <Route exact  path="/health" element={<News key="health" pageSize={5} category='health' country='in' />}></Route>
          <Route exact  path="/science" element={<News key="science" pageSize={5} category='science' country='in' />}></Route>
          <Route exact  path="/sports" element={<News key="sports" pageSize={5} category='sports' country='in' />}></Route>
          <Route exact  path="/technology" element={<News key="technology" pageSize={5} category='technology' country='in' />}></Route>
        </Routes>
      </Router>
      </>
    )
  }
}
