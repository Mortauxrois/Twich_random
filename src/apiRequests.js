const CLIENT_ID = 'xxx'; // Use your client ID


export function fetchRandomStreamers(offset, n){
    return fetch(`https://api.twitch.tv/kraken/streams/?language=ru&offset=${offset}&limit=${n}`,  
            {method: 'get',
             headers: {
                        'Accept': 'application/vnd.twitchtv.v5+json', 
                        'Client-ID': `${CLIENT_ID}`}
            }
    )
}


export function fetchRandomGameStreamer(gameType, offset, n){
    return fetch(`https://api.twitch.tv/kraken/streams/?language=ru&game=${gameType}&offset=${offset}&limit=${n}`,  
                 {method: 'get',
                        headers: {
                                'Accept': 'application/vnd.twitchtv.v5+json', 
                                'Client-ID': `${CLIENT_ID}`}
                    }
                 )
}
