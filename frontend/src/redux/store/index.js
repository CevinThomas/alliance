import {applyMiddleware, compose, createStore} from "redux";
import rootReducer from "../reducer/index";
import async from "../middlewares/async";

const store = createStore( rootReducer, compose( applyMiddleware( async ), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__( { trace: true } ) ) );
export default store;