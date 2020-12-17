// Компонент отображения основного контента сайта.
import React from 'react'
import { connect } from 'react-redux';
import {StreamerDetail} from '../StreamerDetail/StreamerDetail.js'
import {handleSuccessQuery} from '../../actions/csPageActions.js'
import {fetchRandomGameStreamer} from '../../apiRequests.js'
import css from './csPage.module.css'
import '../../assets/css/buttons.css'

let cs_offset = 0;
const NUMBER_OF_STREAMERS_PER_QUERY = 10;


class CSpage extends React.Component {
    constructor(props){
        super(props);
        this.streamers = [];
    }

    render() {
        let streamerClass = (this.streamers.length > 0)? '' : css.none;
        return (
            <div className = {css.wrapper}  >
               <button className = 'btn' 
                       onClick = {this.onClick}>
                       Сгенерировать случайного стримера по CS
                </button> 
                <div className ={streamerClass}>
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
        this.getRandom(cs_offset, NUMBER_OF_STREAMERS_PER_QUERY);
    }

    //Api запрос на стимеров по доте.
    getRandom = async (offset, n) => {
        try{
            const response = await fetchRandomGameStreamer('Counter-Strike: Global Offensive', offset, n);
            console.log(response);
            const data = await response.json();
            this.onGetStreamers(data.streams);
            cs_offset += NUMBER_OF_STREAMERS_PER_QUERY;
        } catch(err){
            alert(err);
        }   
    }

    onGetStreamers = (s) => {
        this.streamers = this.streamers.concat(s);
        // Рандом из  полученных стримеров
        let i = (Math.random() * this.streamers.length).toFixed(0);
        this.props.handleSuccessQuery(this.streamers[i]);
    }


const mapStateToProps = store => {
    return {
        streamer: store.csPageReducer.streamer
    }
}


const mapDispatchToProps = dispatch => {
    return {
        handleSuccessQuery: s => dispatch(handleSuccessQuery(s))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CSpage)
