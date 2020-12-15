// Компонент отображения основного контента сайта.
import React from 'react'
import PropTypes from 'prop-types'
import css from './streamer.module.css'

export class Streamer extends React.Component {
    render() {
        const {display_name, status, description, followers, logo, url} = this.props 
        return (
            <div className = {css.wrapper}>
                <img className={css.logo} 
                        src={logo}
                        alt = {display_name}>
                </img>
                <div>
                    <a className={css.name} href={url}>{display_name}</a>
                    <p className={css.status} >{status}</p>
                    <p className={css.about}>{description}</p>
                    <p className={css.followers + ' ' + this.getColorDecorator(followers)}>
                          {this.reduceNum(followers)} фолловеров</p>
                </div>
            </div>
        )
    }


    reduceNum = (num) => {
        if(1000000 > num && num > 999) return (num /=1000).toFixed(0) + 'К';
        else if(num >= 1000000) return (num /=1000000).toFixed(1) + 'М';
        return num;
      }
    
    
      getColorDecorator = num =>{
        let d = css.smallDecorator;
        if(100000 > num && num >= 1000) d = css.thousandDecorator;
        else if(1000000 > num && num >= 100000) d = css.hundredThousandDecorator;
        else if(num >= 1000000) d = css.millionDecorator;
        return d;
      }
}




Streamer.propTypes = {
    display_name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    followers: PropTypes.number.isRequired,
    logo: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
}