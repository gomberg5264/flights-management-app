import {createStore,applyMiddleware,compose} from "redux";
import thunk from "redux-thunk";
import {reducer} from "./reducers/flights.reducer"
import {combineReducers} from "redux";
const initialState={}
const combinedReducers=combineReducers({
    reducer
})
const store=createStore(combinedReducers,initialState,compose(applyMiddleware(...middleware)))//
export default store;
