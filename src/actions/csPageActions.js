export const GET_STREAMER = 'GET_STREAMER'

export function handleSuccessQuery(s) {
    return function(dispatch) {
        dispatch({
            type: GET_STREAMER,
            payload: s
        });
    }
}
