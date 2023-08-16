import React, { useEffect, useState } from 'react';

import { Route, Switch, Link, Router, useHistory } from 'react-router-dom';
import PlayoffComponent from './components/PlayoffComponent';
import StandingComponent from './components/StandingComponent';
import HomeComponent from './components/HomeComponent';
import ScoreDetails from './components/ScoreDetails';

import logo from './images/nba_logo1.png';



import './App.css';
import Playoffs from './components/playoffs';
import TeamDetails from './components/TeamDetails';
import Register from './components/Register';
import Login from './components/Login';
import Admin from './components/Admin';
import Favorites from './components/Favorites';
import FavoritesDetails from './components/FavoritesDetails';
import FavoritesDetailsPlayers from './components/FavoritesDetailsPlayers';
import FavoritesDetailsSeries from './components/FavoritesDetailsSeries';
import FavoritesDetailsGames from './components/FavoritesDetailsGames';





function App() {

  const history = useHistory()

  const [loginRegister, handleLoginRegister] = useState(0)
  const [token, setToken] = useState("")
  const [roleId, setRoleId] = useState();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userinfo"))
    console.log(userInfo)
    if (userInfo) {
      setToken(userInfo.token)
      setRoleId(userInfo.role_id)
    }
  }, [])

  return (
    <div className="App">
      <div className={loginRegister === 0 ? 'header' : "header login-register-container-nav"}>
        <div className={roleId === 1 ? `main-logo-container role${roleId}` : 'main-logo-container'}>
          <img src={logo} className='nba-logo' alt='logo' />
          {/* <Link to='/admin' id='admin-panel' className='buttons' onClick={() => { handleLoginRegister(0) }}>Admin Panel</Link> */}
          {
            roleId === 1 ?
              <li>
                <Link to='/admin' id='admin-panel' className='buttons' onClick={() => { handleLoginRegister(0) }}>Admin Panel</Link>
              </li> : null
          }
        </div>
        <div className='button-container'>
          <ul>
            {
              token &&
              (
                <li>
                  <Link to='/favs' className='buttons'>Favorites</Link>
                </li>
              )
            }
            <li>
              <Link to='/' className='buttons' onClick={() => { handleLoginRegister(0) }}>Home</Link>
            </li>
            <li>
              <Link to='/standings' className='buttons' onClick={() => { handleLoginRegister(0) }}>Standings</Link>
            </li>
            <li>
              <Link to='/playoffs' className='buttons' onClick={() => { handleLoginRegister(0) }}>Playoffs</Link>
            </li>
            {
              token ?
                (
                  <li>
                    <Link to='/login' className='buttons' onClick={() => {
                      localStorage.removeItem("userinfo");
                      localStorage.removeItem("token");
                      history.push("/login")
                      window.location.reload();
                      handleLoginRegister(1)
                    }}>Logout</Link>
                  </li>
                ) : (
                  <div>
                    <li>
                      <Link to='/register' className='buttons' onClick={() => { handleLoginRegister(1) }}>Register</Link>
                    </li>
                    <li>
                      <Link to='/login' className='buttons' onClick={() => { handleLoginRegister(1) }}>Login</Link>
                    </li>
                  </div>
                )
            }


          </ul>
        </div>
      </div>

      <Switch>

        <Route exact path='/'>
          <StandingComponent />
        </Route>

        <Route path='/playoffs/:id'>
          <Playoffs />
        </Route>

        <Route path='/series/:serid/:id'>
          <ScoreDetails />
        </Route>

        <Route exact path='/playoffs'>
          <PlayoffComponent />
        </Route>

        <Route exact path='/standings/:id'>
          <TeamDetails />
        </Route>

        <Route path='/standings'>
          <StandingComponent />
        </Route>

        <Route path='/register'>
          <Register />
        </Route>

        <Route path='/login'>
          <Login />
        </Route>

        <Route path='/favs'>
          <Favorites />
        </Route>

        <Route path='/admin'>
          <Admin />
        </Route>


      </Switch>


    </div>
  );
}

export default App;
