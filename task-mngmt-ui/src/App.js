import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import './App.css';
import Header from "./components/Layout/Header";
import Dashboard from "./components/Dashboard";
import {BrowserRouter as Router, Route} from "react-router-dom";
import AddProject from "./components/Project/AddProject";
import {Provider} from "react-redux";
import store from "./store";
import UpdateProject from "./components/Project/UpdateProject";
import ProjectBoard from "./components/ProjectBoard/ProjectBoard";
import AddProjectTask from "./components/ProjectBoard/ProjectTasks/AddProjectTask";
import UpdateProjectTask from "./components/ProjectBoard/ProjectTasks/UpdateProjectTask";
import Landing from "./components/Layout/Landing";
import SignUp from "./components/UserManagement/SignUp";
import Login from "./components/UserManagement/Login";


class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div className="App">
                        <Header/>
                        {
                            //Public routes
                        }
                        <Route exact path="/" component={Landing}/>
                        <Route exact path="/signup" component={SignUp}/>
                        <Route exact path="/login" component={Login}/>
                        {
                            //Private routes
                        }
                        <Route exact path="/dashboard" component={Dashboard}/>
                        <Route exact path="/addProject" component={AddProject}/>
                        <Route exact path="/updateProject/:id" component={UpdateProject}/>
                        <Route exact path="/projectBoard/:id" component={ProjectBoard}/>
                        <Route exact path="/addProjectTask/:id" component={AddProjectTask}/>
                        <Route exact path="/updateProjectTask/:projectCode/:projectTaskId" component={UpdateProjectTask}/>
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;
