import {applyMiddleware, compose, createStore} from "redux";
import rootReducer from "../reducer/index";
import async from "../middlewares/async";
import stateValidator from "../middlewares/stateValidator";

const store = createStore( rootReducer, compose( applyMiddleware( stateValidator, async ), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__( { trace: true } ) ) );
export default store;