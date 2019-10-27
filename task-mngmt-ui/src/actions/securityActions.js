import axios from "axios";
import {GET_ERRORS, SET_CURRENT_USER} from "./types";
import setJWTToken from "../securityUtils/setJWTToken";
import jwt_decode from "jwt-decode";

export const createNewUser = (newUser, history) => async dispatch => {
    try{
        await axios.post("/api/users/register", newUser);
        history.push("/login");
        dispatch({
            type: GET_ERRORS,
            payload: {}
        });
    }
    catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    }
}


// post -> Login Request
// extract token from res.data
// store the token in the localStorage
// set out token in header ***
// decode token on React
// dispatch to our securityReducer
export const login = LoginRequest => async dispatch => {
    try{
        const resp  = await axios.post("/api/users/login", LoginRequest);
        const {token} = resp.data;
        localStorage.setItem("jwtToken", token);
        setJWTToken(token);
        const decoded = jwt_decode(token);

        dispatch({
            type: SET_CURRENT_USER,
            payload: decoded
        });
    }
    catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    }
}

export const logout = () => dispatch => {
    localStorage.removeItem("jwtToken");
    setJWTToken(false);
    dispatch({
        type: SET_CURRENT_USER,
        payload: {}
    })
}
