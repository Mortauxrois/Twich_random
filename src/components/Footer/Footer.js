// Компонент отображения основного контента сайта.
import React from 'react'
// import PropTypes from 'prop-types'
import css from './footer.module.css'

export class Footer extends React.Component {

    render() {
        return (
            <div className = {css.wrapper}>
               <p> © 2020 Все права защищены  </p> 
            </div>
        )
    }
}


// Footer.propTypes = {

// }