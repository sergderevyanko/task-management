import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import './App.css';
import Header from "./components/Layout/Header";
import Dashboard from "./components/Dashboard";
import ProjectItem from "./components/Project/ProjectItem";
import {BrowserRouter as Router, Route} from "react-router-dom";
import AddProject from "./components/Project/AddProject";

class App extends Component {
  render() {
    return (
        <Router>
          <div className="App">
            <Header/>
              <Route exact path="/" component={Dashboard}/>
              <Route exact path="/dashboard" component={Dashboard}/>
              <Route exact path="/addProject" component={AddProject}/>
          </div>
        </Router>
    );
  }
}

export default App;
