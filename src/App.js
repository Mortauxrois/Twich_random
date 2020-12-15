import React, { Component } from 'react';
import { Route, BrowserRouter} from 'react-router-dom';
import { Navigation } from './components/Navigation/Navigation.js';
import MainPage from './components/MainPage/MainPage.js'
import JustChatingPage from './components/JustChatingPage/JustChatingPage.js'
import Dota2page from './components/Dota2page/Dota2page.js'
import CSpage from './components/CSpage/CSpage.js'
import { Footer } from './components/Footer/Footer.js'
import { connect } from 'react-redux';
import './assets/css/style.css';

class App extends Component {
    render(){
      return (
        <BrowserRouter>
        <div className='appWrapper'>
          <header className = 'headerWrapper'>
            <nav className = 'navWrapper'>
              <Navigation />
            </nav>
          </header>
          <main className = 'contentWrapper'>
              <Route exact path='/' component={MainPage} />
              <Route path='/cs' component={CSpage} />
              <Route path='/dota2' component={Dota2page} />
              <Route path='/just_chating' component={JustChatingPage} />
          </main>
          <aside className = 'asideWrapper'>

          </aside>
          <footer className = 'footerWrapper'>
            <Footer />
          </footer>
        </div>
        </BrowserRouter>
      );
    }
}


// Создает в компоненте пропсы, вытаскивая из состояния нужные нам элементы
const mapStateToProps = store => {
    return {

    }
}


const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

