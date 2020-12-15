// Компонент отображения основного контента сайта.
import React from 'react'
import { connect } from 'react-redux';
import { Streamer } from './Streamer/Streamer.js'
import { handleSuccessQuery } from '../../actions/mainPageActions.js'
import {CLIENT_ID} from '../../apiRequests.js'
import css from './mainPage.module.css'

const NUMBER_OF_STREAMERS_PER_QUERY = 5;


class MainPage extends React.Component {
    constructor(props){
        super(props);
        this.endListRef = React.createRef(); // Элемент маркер. При пролистывании до него вызывается дальнейшая загрузка контента
        this.waitForQuery = false;
        this.offset = 0;
    }

    render() {
        let streamerTemplate = this.props.streamers.map((s, i) =>{
            return(
                <Streamer key = {s.display_name + i}
                          display_name = {s.display_name}
                          description =  {s.description}
                          status = {s.status}
                          followers =  {s.followers}
                          logo = {s.logo}
                          url = {s.url}
                           />
            )
        });

        return (
            <div className = {css.wrapper}>
               <h2> Стримеры онлайн:  </h2>
               {streamerTemplate}
               <div ref = {this.endListRef}></div>
            </div>
        )
    }


    onScroll = () => {
            const endList  = this.endListRef.current.getBoundingClientRect();
            if(endList.y < window.innerHeight){
                if(this.waitForQuery === false){
                    this.waitForQuery = true;
                    this.getStreams(this.offset, NUMBER_OF_STREAMERS_PER_QUERY);
                    this.offset += NUMBER_OF_STREAMERS_PER_QUERY;
                }
            }
    }


    componentDidMount() {
        window.addEventListener('scroll', this.onScroll);   
        this.getStreams(this.offset, NUMBER_OF_STREAMERS_PER_QUERY);
        this.offset += NUMBER_OF_STREAMERS_PER_QUERY;
    }

    
    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll);   
    }


    //Api запрос на твич
    getStreams = (offset, n) => {
        fetch(`https://api.twitch.tv/kraken/streams/?language=ru&offset=${offset}&limit=${n}`,  
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


    onGetStreamers = d => {
        let newS = d.map(ch => {
            return ch.channel;
        });
        let curS = this.props.streamers.concat(newS);
        this.waitForQuery = false;
        this.props.handleSuccessQuery(curS);
    }

}


const mapStateToProps = store => {
    return {
        streamers: store.mainPageReducer.streamers
    }
}


const mapDispatchToProps = dispatch => {
    return {
        handleSuccessQuery: s => dispatch(handleSuccessQuery(s))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)


