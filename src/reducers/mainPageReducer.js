import {GET_STREAMERS} from '../actions/mainPageActions.js'


const initialState = {
    streamers: []
}


export function mainPageReducer(state = initialState, action) {

    switch (action.type) {
    case GET_STREAMERS:
        return { ...state, streamers: action.payload }
    default:
        return state
    }
}


