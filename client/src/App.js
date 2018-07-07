import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import CreateOwner from "./pages/CreateOwner";
import CreateCare from "./pages/CreateCare";
import CreatePet from "./pages/CreatePet";
import OwnerView from "./pages/OwnerView";
import PetView from "./pages/PetView";
import About from "./pages/About";
import CareGiverView from "./pages/CareGiverView";
import CarePetView from "./pages/CarePetView";
import Owner from "./pages/Owner";
// import OwnerCreate from "./pages/OwnerCreate";
// import Care from "./pages/Care";
// import CareCreate from "./pages/CareCreate";
import Nav from "./components/Nav";
import firebase from "./firebase.js";

const App = () => (
  <Router>
    <div>
      <Nav />
      
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/createowner" component={CreateOwner} />
        <Route exact path="/createcare/" component={CreateCare} /> 
        <Route exact path="/createpet/" component={CreatePet} /> 
        <Route exact path="/ownerview/" component={OwnerView} /> 
        <Route exact path="/petview/" component={PetView} />
        <Route exact path="/about/" component={About} />
        <Route exact path="/caregiverview/" component={CareGiverView} />
        <Route exact path="/caregiverpetview/" component={CarePetView} />
        {/* <Route exact path="/createcare" component={CreateCare} /> */}
        <Route exact path="/owner" component={Owner} />
        {/*<Route exact path="/ownercreate" component={OwnerCreate} />
        {/*<Route exact path="/care" component={Care} /> */}
        {/*<Route exact path="/carecreate" component={CareCreate} /> */}
      </Switch>
    </div>
    
  </Router>
);

export default App;
