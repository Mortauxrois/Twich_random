export const GET_STREAMERS = 'GET_STREAMERS'


// Запрос вернул сримеров, обработаем их
export function handleSuccessQuery(s) {
    return function(dispatch) {
        dispatch({
            type: GET_STREAMERS,
            payload: s
        });
    }
}
