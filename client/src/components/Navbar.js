import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom"; //<!super important to get router to work 
import axios from "axios";
import { IdentityContext } from "../identity-context";

class Navbar extends Component {
    state = {
        username: "",
        password: "",
        user: {},
        loggedIn: false
    }

    componentDidMount() {
        // check for logged in user
        axios.get("/api/user")
            .then(response => {
                if (response.data) {
                    console.log("USER FROM API", response.data)
                    this.setState({
                        user: response.data,
                        userStateInfo: `${response.data.username} is logged in`
                    })
                }
            })
    }

   render () {
       let buttonText = this.state.loggedIn ? "Log Out" : "Log In"
       return (
        <nav>
              <IdentityContext.Provider value={{
                user: this.state.user,
                loggedIn: this.state.loggedIn,
                login: this.login,
                logout: this.logout
            }}></IdentityContext.Provider>
            
            <div className="nav-wrapper">
            <a href="/" className="brand-logo"><img src="../Images/logo.png" width="150px" /> </a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/events'>Events</Link></li>
                <li><Link to='/formtest'>Create Event</Link></li>
                <IdentityContext.Consumer>
                    <button className="login-button">{buttonText}</button>
                </IdentityContext.Consumer>

            </ul>
            </div>
        </nav>
       
       )
   }
}

export default Navbar