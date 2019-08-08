import React, {Component} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {createProject} from "../../actions/projectActions";

class AddProject extends Component {
    constructor(){
        super()
        this.state = {
            projectName: "",
            projectIdentifier: "",
            description: "",
            startDate: "",
            endDate: ""
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault();
        const newProject = {
            projectName: this.state.projectName,
            projectIdentifier: this.state.projectIdentifier,
            description: this.state.description,
            startDate: this.state.startDate,
            endDate: this.state.endDate
        }
        this.props.createProject(newProject, this.props.history);
    }
    render() {
        return (
            <div className="project">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h5 className="display-4 text-center">Create Project</h5>
                            <hr/>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input type="text" className="form-control form-control-sm"
                                           name="projectName"
                                           value={this.state.projectName}
                                           onChange={this.onChange}
                                           placeholder="Project Name"/>
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control form-control-sm"
                                           name="projectIdentifier"
                                           value={this.state.projectIdentifier}
                                           onChange={this.onChange}
                                           placeholder="Unique Project ID" />
                                </div>
                                <div className="form-group">
                                    <textarea className="form-control form-control-sm"
                                              name="description"
                                              value={this.state.description}
                                              onChange={this.onChange}
                                              placeholder="Project Description"></textarea>
                                </div>
                                <h6>Start Date</h6>
                                <div className="form-group">
                                    <input type="date" className="form-control form-control-sm" name="startDate"
                                           onChange={this.onChange}
                                           value={this.state.startDate}
                                    />
                                </div>
                                <h6>Estimated End Date</h6>
                                <div className="form-group">
                                    <input type="date" className="form-control form-control-sm" name="endDate"
                                           onChange={this.onChange}
                                           value={this.state.endDate}
                                    />
                                </div>
                                <input type="submit" className="btn btn-primary btn-block mt-sm-4"/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

AddProject.propTypes = {
    createProject: PropTypes.func.isRequired
}

export default connect (null, {createProject}) (AddProject);