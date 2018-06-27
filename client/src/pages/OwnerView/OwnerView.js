import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Jumbotron from "../../components/Jumbotron";
import Nav from "../../components/Nav";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import icon from "../../assets/icon.jpg";
import { Card, CardTitle, CardBody, CardImg, CardSubtitle, CardText } from "reactstrap";
// import Create from "../Create";
import "./OwnerView.css";

class OwnerView extends Component {

  state = {
    owner: [],
    pets: []
  }



  // componentDidMount() {
  //   console.log("in mount Owner.js", this.props.location.state);
  //   if (this.props.location.state.fromPage === "CreateOwner") {
  //     this.getOwner(this.props.location.state.username);
  //   } else {
  //     this.getOwner(this.props.location.state.username);
  //     this.getPets(this.props.location.state.petid);
  //   }
  // };

  getOwner = userName => {
    console.log(userName);

    API.getOwner(userName)
      .then(res =>
        this.setState(
          { owner: res.data },
          // { owner_id: res.data[0].owner_id,
          //   name: res.data[0].name,
          //   address: res.data[0].address,
          //   city: res.data[0].city,
          //   state: res.data[0].state,
          //   zip_code: res.data[0].zip_code,
          //   phone: res.data[0].phone,
          //   secondary_phone: res.data[0].secondary_phone,
          //   email: res.data[0].email,
          //   username: res.data[0].username,
          //   owner_info: res.data[0].owner_info,
          //   owner_image: res.data[0].owner_image
          //  },
          // () => console.log("this.state is now " + JSON.stringify(this.state, null, 2) + "\n")
          console.log("res.data in ownerview.js ", res)
        )
      )
      .then(res => console.log("owner state ", this.state.owner))
      .catch(err => console.log(err))

  };

  petPage = (id, username) => {
    this.props.history.push("/createpet/", { id: id, username: username })
  };
  // const OwnerView = (props) => {
  render() {
    return (
      <div className="background">
        <div className="container fluid">
          <Jumbotron>
            Owner View
            </Jumbotron>
          <div className="row">

            <div className="col-3">

<Card>
              <CardImg top width="100%" src={icon}
                onClick={() => this.petPage(this.state.owner[0].owner_id, this.state.owner[0].username)} alt="Card image cap" />
              <CardBody>
                <CardTitle>Create Pet</CardTitle>
              </CardBody>
            </Card>
            <div className="col-3">
              {this.state.pets.length ? (
                <Card>
                  {this.state.pets.map(pet => (
                    <div>
                      <CardImg top width="100%" src={pet.pet_image} alt="Card image cap" onClick={() => this.petPage(pet.owner_id, pet.ownerUserName)} />

                      <CardBody>
                        <CardTitle>
                          {pet.name}
                        </CardTitle>
                      </CardBody>
                    </div>
                  ))}
                </Card>

              ) : (
                  <h3>No Results to Display</h3>
                )}
            </div>
          </div>
        </div>
      </div>
      </div>


    );
  }
}

export default OwnerView;
