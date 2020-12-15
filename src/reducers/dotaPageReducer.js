import {GET_STREAMER} from '../actions/dotaPageActions.js'


const initialState = {
    streamer: { channel: {display_name: '',
                          logo: '',
                          description: '',
                          followers: 0},
                preview: {large: ''},
                url: '',
                viewers: ''
              }
}


export function dotaPageReducer(state = initialState, action) {

    switch (action.type) {
    case GET_STREAMER:
        return { ...state, streamer: action.payload }
    default:
        return state
    }
}


