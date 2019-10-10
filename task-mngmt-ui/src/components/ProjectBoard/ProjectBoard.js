import React, {Component} from 'react';
import {Link} from "react-router-dom";
import Backlog from "./Backlog";
import {connect} from "react-redux";
import classnames from "classnames";
import {getBacklog} from "../../actions/backlogActions";
import PropTypes from "prop-types";

class ProjectBoard extends Component {

    constructor(props) {
        super(props);

    }

    componentDidMount() {
        const {id} = this.props.match.params;
        this.props.getBacklog(id);
    }


    render() {
        const {id} = this.props.match.params;
        const {projectTasks} = this.props.backlog;
        return (
            <div className="container">
                <Link to={`/addProjectTask/${id}`} className="btn btn-primary mb-3">
                    <i className="fas fa-plus-circle"> Create Project Task</i>
                </Link>
                <br/>
                <hr/>
                {
                 //   <!-- Backlog STARTS HERE -->
                }
                <Backlog projectTasks={projectTasks}/>

            </div>
        );
    }
}

ProjectBoard.propTypes = {
    backlog: PropTypes.object.isRequired,
    getBacklog: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    backlog: state.backlog
})

export default connect(mapStateToProps, {getBacklog})(ProjectBoard);