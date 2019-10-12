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
        this.state = {
            errors: {}
        };

    }

    componentDidMount() {
        const {id} = this.props.match.params;
        this.props.getBacklog(id);
    }


    componentWillReceiveProps(nextProps) {
        if(nextProps.errors){
            this.setState({errors: nextProps.errors});
        }
    }

    render() {
        const {id} = this.props.match.params;
        const {projectTasks} = this.props.backlog;
        const {errors} = this.state;
        let BoardContent;

        const boardAlgorithm = (errors, projectTasks) => {
            if(projectTasks.length < 1){
                if(errors.projectNotFound){
                    return (<div className="alert alert-danger text-center">
                        {errors.projectNotFound}
                    </div>)
                }
                else {
                    return (
                        <div className="alert alert-info">
                            No Project Tasks Found
                        </div>
                    )
                }
            } else{
                return  <Backlog projectTasks={projectTasks}/>;
            }
        };

        BoardContent = boardAlgorithm(errors, projectTasks);
        return (
            <div className="container">
                <Link to={`/addProjectTask/${id}`} className="btn btn-primary mb-3">
                    <i className="fas fa-plus-circle"> Create Project Task</i>
                </Link>
                <br/>
                <hr/>

                {BoardContent}
            </div>
        );
    }
}

ProjectBoard.propTypes = {
    backlog: PropTypes.object.isRequired,
    getBacklog: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    backlog: state.backlog,
    errors: state.errors
})

export default connect(mapStateToProps, {getBacklog})(ProjectBoard);