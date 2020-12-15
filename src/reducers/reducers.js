import {combineReducers} from 'redux'
import {mainPageReducer} from './mainPageReducer.js'
import {csPageReducer} from './csPageReducer.js'
import {dotaPageReducer} from './dotaPageReducer.js'
import {justChattingPageReducer} from './justChattingPageReducer.js'




export const rootReducer = combineReducers({
    mainPageReducer: mainPageReducer,
    csPageReducer: csPageReducer,
    dotaPageReducer: dotaPageReducer,
    justChattingPageReducer: justChattingPageReducer
})

 