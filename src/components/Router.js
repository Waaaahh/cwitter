import React from 'react';
import {HashRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import Auth from "../routes/Auth"
import Home from "../routes/Home"
import Profile from "../routes/Profile"
import { useState } from 'react';
import Navigation from './Navigation';



export default ({isLoggedIn, userObj}) => {

    return (
        <Router>
            {isLoggedIn && <Navigation />}
            <Switch>
                {isLoggedIn ? (
                    <>
                <Route exact path="/">
                    <Home userObj={userObj}/>
                </Route>
                <Route exact path="/profile">
                    <Profile />
                </Route>
                </> ): ( <Route exact path="/"><Auth /></Route> )}
            </Switch>
        </Router>
    )
}


