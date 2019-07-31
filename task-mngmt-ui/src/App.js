import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import './App.css';
import Header from "./components/Layout/Header";
import Dashboard from "./components/Dashboard";
import ProjectItem from "./components/Project/ProjectItem";
import {BrowserRouter as Router, Route} from "react-router-dom";

class App extends Component {
  render() {
    return (
        <Router>
          <div className="App">
            <Header/>
            <Dashboard/>
            <ProjectItem/>
          </div>
        </Router>
    );
  }
}

export default App;
