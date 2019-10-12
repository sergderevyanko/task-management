import React, {Component} from 'react';
import ProjectTask from "./ProjectTasks/ProjectTask";

class Backlog extends Component {
    render() {
        const {projectTasks} = this.props;
        let taskByStatus = {};
        projectTasks.map(projectTask => {
            if(!taskByStatus[projectTask.status]){
                taskByStatus[projectTask.status] = [];
            }
            taskByStatus[projectTask.status].push(<ProjectTask key={projectTask.id} projectTask={projectTask} />);
        });


        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <div className="card text-center mb-2">
                            <div className="card-header bg-secondary text-white">
                                <h3>TO DO</h3>
                            </div>
                        </div>
                        {taskByStatus["TO_DO"]}
                    </div>
                    <div className="col-md-4">
                        <div className="card text-center mb-2">
                            <div className="card-header bg-primary text-white">
                                <h3>In Progress</h3>
                            </div>
                        </div>
                        {taskByStatus["IN_PROGRESS"]}

                    </div>
                    <div className="col-md-4">
                        <div className="card text-center mb-2">
                            <div className="card-header bg-success text-white">
                                <h3>Done</h3>
                            </div>
                        </div>
                        {taskByStatus["DONE"]}
                    </div>
                </div>
            </div>
        );
    }
}

export default Backlog;