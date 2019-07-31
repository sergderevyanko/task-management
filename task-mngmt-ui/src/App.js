import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import './App.css';
import Header from "./components/Layout/Header";
import Dashboard from "./components/Dashboard";
import ProjectItem from "./components/Project/ProjectItem";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <Dashboard/>
        <ProjectItem/>
      </div>
    );
  }
}

export default App;
