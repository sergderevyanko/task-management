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
import jwt_decode from "jwt-decode";
import setJWTToken from "./securityUtils/setJWTToken";
import {SET_CURRENT_USER} from "./actions/types";
import {logout} from "./actions/securityActions";

const jwtToken =  localStorage.jwtToken;

if(jwtToken){
    setJWTToken(jwtToken);
    const decodedJWTToken = jwt_decode(jwtToken);
    store.dispatch({
        type: SET_CURRENT_USER,
        payload: decodedJWTToken
    })
    const currentTime = Date.now()/1000;
    if(decodedJWTToken.exp < currentTime ){
        //handle logout
        store.dispatch(logout());
        window.location.href = "/";
    }
}



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
