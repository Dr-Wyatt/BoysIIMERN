import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"; //<!super important to get router to work 
import Groups from "./Pages/Groups";
import Events from "./Pages/Events";
import NoMatch from "./Pages/NoMatch";
// import Nav from "./components/Nav";

function App() {
  return (
    <Router>
      <div>
        {/* <Nav /> */}
        <Switch>
          {/* home page route goes to user hub */}
          <Route exact path="/" component={Groups} />
          {/* /events goes to group */}
          <Route exact path="/events" component={Events} />

          {/* <Route exact path="/books/:id" component={Detail} /> */}
          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
