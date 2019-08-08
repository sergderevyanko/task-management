import {createStore, applyMiddleware, compose} from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const initialState = {}
const middleware = [thunk]

let store;

if(window.navigator.userAgent.includes("Chrome")){
    store = createStore(
        rootReducer,
        initialState,
        compose(applyMiddleware(...middleware)),
        // from https://github.com/zalmoxisus/redux-devtools-extension
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
}
else {
    // don't use chrone extension in non-chrome
    store = createStore(
        rootReducer,
        initialState,
        compose(applyMiddleware(...middleware))
    );
}

export default store;