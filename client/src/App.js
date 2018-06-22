import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Create from "./pages/Create";
import CreateOwner from "./pages/CreateOwner";
// import CreateCare from "./pages/CreateCare";
// import Owner from "./pages/Owner";
// import OwnerCreate from "./pages/OwnerCreate";
// import Care from "./pages/Care";
// import CareCreate from "./pages/CareCreate";
import Nav from "./components/Nav";

const App = () => (
  <Router>
    <div>
      <Nav />
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/create" component={Create} />
        <Route exact path="/createowner" component={CreateOwner} />     
        {/* <Route exact path="/createcare" component={CreateCare} /> */}
        {/* <Route exact path="/owner" component={Owner} />
        <Route exact path="/ownercreate" component={OwnerCreate} />
        <Route exact path="/care" component={Care} />
        <Route exact path="/carecreate" component={CareCreate} /> */}
      </Switch>
    </div>
  </Router>
);

export default App;
