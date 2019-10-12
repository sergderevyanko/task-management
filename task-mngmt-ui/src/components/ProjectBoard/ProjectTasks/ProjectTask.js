import React, {Component} from 'react';

class ProjectTask extends Component {
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
                    <a href="#" className="btn btn-primary">
                        View / Update
                    </a>

                    <button className="btn btn-danger ml-4">
                        Delete
                    </button>
                </div>
            </div>
        );
    }
}

export default ProjectTask;