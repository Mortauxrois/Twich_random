// Компонент отображения основного контента сайта.
import React from 'react'
// import PropTypes from 'prop-types'
import css from './navigation.module.css'
import { NavLink } from 'react-router-dom'


export class Navigation extends React.Component {

    render() {
        return (
            <div className = {css.wrapper}>
                <NavLink exact to='/' activeClassName={css.active}> Главная</NavLink>
                <NavLink to='/cs' activeClassName={css.active}> Случайный CS</NavLink>
                <NavLink to='/dota2' activeClassName={css.active}> Случайная Dota2</NavLink>
                <NavLink to='/just_chating' activeClassName={css.active}> Случайная болтовня</NavLink>
            </div>
        )
    }
}


// Navigation.propTypes = {

// }
