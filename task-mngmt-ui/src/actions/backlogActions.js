import axios from "axios";


export const addProjectTask  = (project_code, project_task, history)=> async dispatch =>{
    await axios.post(`/api/backlog/${project_code}`, project_task);
    history.push(`/projectBoard/${project_code}`);
}