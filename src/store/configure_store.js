import {createStore, applyMiddleware} from 'redux'
import { rootReducer } from '../reducers/reducers.js'
import thunk from 'redux-thunk'


export const store = createStore(rootReducer, applyMiddleware(thunk));
