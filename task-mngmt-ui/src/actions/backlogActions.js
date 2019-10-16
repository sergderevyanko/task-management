import axios from "axios";
import {DELETE_PROJECT_TASK, GET_BACKLOG, GET_ERRORS, GET_PROJECT_TASK} from "./types";


export const addProjectTask  = (project_code, project_task, history)=> async dispatch =>{
    try{
        await axios.post(`/api/backlog/${project_code}`, project_task);
        history.push(`/projectBoard/${project_code}`);
        dispatch({
            type: GET_ERRORS,
            payload: {}
        });
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    }
}

export const getBacklog  = (project_code)=> async dispatch =>{
    try{
        const res = await axios.get(`/api/backlog/${project_code}`);
        dispatch({
            type: GET_BACKLOG,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    }
}

export const getProjectTask  = (projectCode, projectTaskId, history) => async dispatch =>{
    try{
        const res = await axios.get(`/api/backlog/${projectCode}/${projectTaskId}`);
        dispatch({
            type: GET_PROJECT_TASK,
            payload: res.data
        });
    } catch (err) {
            history.push('/dashboard');
            //type: GET_ERRORS,
            //payload: err.response.data
    }
}

export const updateProjectTask  = (projectCode, projectTaskId, projectTask, history)=> async dispatch =>{
    try{
        await axios.patch(`/api/backlog/${projectCode}/${projectTaskId}`, projectTask);
        history.push(`/projectBoard/${projectCode}`);
        dispatch({
            type: GET_ERRORS,
            payload: {}
        });
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    }
}

export const deleteProjectTask = (projectCode, projectTaskId) => async dispatch => {
    if(window.confirm(`Are you sure? This will delete the Project Task: ${projectTaskId}`)){
        try {
            await axios.delete(`/api/backlog/${projectCode}/${projectTaskId}`)
            dispatch({
                type: DELETE_PROJECT_TASK,
                payload: projectTaskId
            });
        } catch (err) {
            //TODO: implement error handling
            history.push('/dashboard');
        }
    }
};