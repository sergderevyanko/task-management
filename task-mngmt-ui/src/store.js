import {createStore, applyMiddleware, compose} from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const initialState = {}
const middleware = [thunk]

let store;

//Make it working without React/Redux tools installed
const ReactReduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

if(window.navigator.userAgent.includes("Chrome") && ReactReduxDevTools){
    store = createStore(
        rootReducer,
        initialState,
        compose(applyMiddleware(...middleware),
        // from https://github.com/zalmoxisus/redux-devtools-extension
            ReactReduxDevTools
        )
    );
}
else {
    // don't use chrome extension in non-chrome
    store = createStore(
        rootReducer,
        initialState,
        compose(applyMiddleware(...middleware))
    );
}

export default store;