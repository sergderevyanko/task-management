import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {deleteProjectTask} from "../../../actions/backlogActions";
import PropTypes from "prop-types";
import {connect} from "react-redux";

class ProjectTask extends Component {

    onDeleteClick(projectCode, projectTaskId){
        this.props.deleteProjectTask(projectCode, projectTaskId);
    }

    render() {
        const {projectTask} = this.props;
        let priorityRenderMap = {
            1: {
                class: "bg-danger text-light",
                text: "HIGH"
            },
            2: {
                class: "bg-warning text-light",
                text: "MEDIUM"
            },
            3: {
                class: "bg-info text-light",
                text: "LOW"
            }
        };
        return (
            <div className="card mb-1 bg-light">

                <div className={`card-header text-primary ${priorityRenderMap[projectTask.priority].class}`}>
                    ID: {projectTask.projectSequence} -- Priority: {priorityRenderMap[projectTask.priority].text}
                </div>
                <div className="card-body bg-light">
                    <h5 className="card-title">{projectTask.summary}</h5>
                    <p className="card-text text-truncate ">
                        {projectTask.acceptanceCriteria}
                    </p>
                    <Link to={`/updateProjectTask/${projectTask.projectIdentifier}/${projectTask.projectSequence}`} className="btn btn-primary">
                        View / Update
                    </Link>

                    <button className="btn btn-danger ml-4"
                            onClick={this.onDeleteClick.bind(this, projectTask.projectIdentifier, projectTask.projectSequence)}>
                        Delete
                    </button>
                </div>
            </div>
        );
    }
}


ProjectTask.propTypes = {
    deleteProjectTask: PropTypes.func.isRequired
}

export default connect(null, {deleteProjectTask})(ProjectTask);