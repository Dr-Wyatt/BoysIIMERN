import React, { Component } from "react";
import { IdentityContext } from "../../identity-context";
import axios from "axios";
import GroupMembers from "../../components/groupMembers/index";
import ImageHeader from "../../components/eventContent/Comments/imageHeader";
import HomeMyEvents from "../../components/HomeMyEvents";



class HomeGroups extends Component {


state = {
    username: "",
    password: "",
    user:{},
    loggedIn: false,
    events: "" ||["ting ma ma de hua"],
    members: "" || ["nada mucho"]
};

componentDidMount(){
    const id = this.props.match.params.gid;
    // console.log("this is id", this.props.match.params.gid)

    axios.get("/api/user").then(response => {
        if (response.data) {
          // console.log("USER FROM API", response.data);
          this.setState({
            user: response.data,
            userStateInfo: `${response.data.username} is logged in`,
            loggedIn: true
          });


    axios
    .get("/api/groups/detail/" + id)
    .then(next => {
      if (next.data) {
        //   console.log("next data for grps", next.data)
        this.setState({
        events: next.data.data.groupInfo.Events,
        members: next.data.data.members
        });
      }
    });
    
}});
}

  render() {
    console.log("latest Group state", this.state);
    return (
      <IdentityContext.Provider
        value={{
          user: this.state.user,
          loggedIn: this.state.loggedIn,
          login: this.login,
          logout: this.logout
        }}
      >
        <IdentityContext.Consumer>
          {({ user }) => (
            <div className="row">

              <div className="col s12 m4 l3 side-content">
                {/* <h3 /> */}

                <GroupMembers
                members={this.state.members}
                />

                {/* Currently commented out GroupEvents */}
                {/* <GroupEvents /> */}
              </div>
              <div className="card-content">
                <div className="card-stacked">
                {this.state.events.map(event => (
                  <HomeMyEvents
                    eventId={event.id}
                    eventName={event.name}
                  />
                ))}
                </div>
              </div>
            </div>
          )}
        </IdentityContext.Consumer>
      </IdentityContext.Provider>
    );
  }
}

export default HomeGroups;