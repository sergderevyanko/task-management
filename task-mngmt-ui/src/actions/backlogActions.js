import axios from "axios";
import {GET_ERRORS} from "./types";


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