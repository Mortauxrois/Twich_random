// Компонент отображения случайного стримера в разделе JustChating.
import React from 'react'
import { connect } from 'react-redux'
import { handleSuccessQuery } from '../../actions/dotaPageActions.js'
import { StreamerDetail } from '../StreamerDetail/StreamerDetail.js'
import { fetchRandomGameStreamer } from '../../apiRequests.js'
import css from './justChatingPage.module.css'
import '../../assets/css/buttons.css'


let j_offset = 0;
const NUMBER_OF_STREAMERS_PER_QUERY = 10;


class JustChatingPage extends React.Component {
    constructor(props){
        super(props);
        this.streamers = [];
    }
    render() {
        let streamerClass = (this.streamers.length > 0)? '' : css.none;
        return (
            <div className = {css.wrapper}>
               <button className = 'btn' 
                       onClick = {this.onClick}>
                       Сгенерировать случайного болтающего стримера
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
        this.getRandom(j_offset, NUMBER_OF_STREAMERS_PER_QUERY);
    }

    //Api запрос на стимеров по доте.
    getRandom = async (offset, n) => {
        try{
            const response = await fetchRandomGameStreamer('Just Chatting', offset, n);
            console.log(response);
            const data = await response.json();
            this.onGetStreamers(data.streams);
            j_offset += NUMBER_OF_STREAMERS_PER_QUERY;
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
}


const mapStateToProps = store => {
    return {
        streamer: store.justChattingPageReducer.streamer
    }
}


const mapDispatchToProps = dispatch => {
    return {
        handleSuccessQuery: s => dispatch(handleSuccessQuery(s))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(JustChatingPage)
