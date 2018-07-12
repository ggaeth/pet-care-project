import React, { Component } from "react";
import CatPic from "../../components/CatPic";
import Footer from "../../components/Footer";
import InfoBox from "../../components/InfoBox";
import "./About.css";

class CarePetView extends Component {
  state = {
    careGiver: {},
  };
  render() {
    return (
      <div className="background">
        <div className="container-fluid">
          <CatPic>
            <div className="col-md-8">
            </div>
            <InfoBox />
          </CatPic>
        </div>
        <Footer />
      </div>
    );
  }
}
export default CarePetView;

