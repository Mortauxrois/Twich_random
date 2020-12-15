// Компонент отображения случайного стримера по Dota2.
import React from 'react'
import { connect } from 'react-redux'
import { handleSuccessQuery } from '../../actions/dotaPageActions.js'
import { StreamerDetail } from '../StreamerDetail/StreamerDetail.js'
import {CLIENT_ID} from '../../apiRequests.js'
import css from './dota2page.module.css'
import '../../assets/css/buttons.css'

let dota_offset = 0;
const NUMBER_OF_STREAMERS_PER_QUERY = 10;

class Dota2page extends React.Component {
    constructor(props){
        super(props);
        this.streamers = []; // Набираем массив стримеров, затем рандомно выбираем из него
    }

    render() {
        let streamerClass = (this.streamers.length > 0)? '' : css.none;
        return (
            <div className = {css.wrapper}>
                <button className = 'btn' 
                       onClick = {this.onClick}>
                       Сгенерировать случайного стримера по Dota2
                </button>
                <div className = {streamerClass}>
                    <StreamerDetail  
                        display_name = {this.props.streamer.channel.display_name}
                        logo = {this.props.streamer.channel.logo}
                        preview = {this.props.streamer.preview.large}
                        description = {this.props.streamer.channel.description}
                        followers = {this.props.streamer.channel.followers}
                        url = {this.props.streamer.url}
                        viewers = {this.props.streamer.viewers} />
                </div>
            </div>
        )
    }

    onClick = () => {
        this.getRandom(dota_offset, NUMBER_OF_STREAMERS_PER_QUERY);
    }

    //Api запрос на стимеров по доте.
    getRandom = (offset, n) => {
        fetch(`https://api.twitch.tv/kraken/streams/?language=ru&game=Dota 2&offset=${offset}&limit=${n}`,  
        {method: 'get',
                headers: {
                        'Accept': 'application/vnd.twitchtv.v5+json', 
                        'Client-ID': `${CLIENT_ID}`}
            }
        )
            .then(response => response.json())
            .then(data => {
                this.onGetStreamers(data.streams);
            });       
    }

    onGetStreamers = (s) => {
        dota_offset += NUMBER_OF_STREAMERS_PER_QUERY;
        this.streamers = this.streamers.concat(s);
        // Рандом из  полученных стримеров
        let i = (Math.random() * this.streamers.length).toFixed(0);
        this.props.handleSuccessQuery(this.streamers[i]);
    }
}


const mapStateToProps = store => {
    return {
        streamer: store.dotaPageReducer.streamer
    }
}


const mapDispatchToProps = dispatch => {
    return {
        handleSuccessQuery: s => dispatch(handleSuccessQuery(s))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dota2page)