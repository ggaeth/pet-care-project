import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Jumbotron from "../../components/Jumbotron";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import icon from "../../assets/icon.jpg";
import { DeleteBtn, CreatePetBtn } from "../../components/Buttons";
import { Card, CardTitle, CardBody, CardFooter, CardImg, CardSubtitle, CardText } from "reactstrap";
import "./OwnerView.css";

class OwnerView extends Component {

  state = {
    owner: [],
    pets: []
  }

  componentDidMount() {
    console.log("in mount Owner.js", this.props.location);

    this.getOwner(this.props.location.state.username);

    if (this.props.location.state.fromPage === "CreatePet") {
      console.log("location fromPage CreatePet");
      this.getPets(this.props.location.state.ownerid);
    }
    if (this.props.location.state.pathName === "/petview/") {
      console.log("location pathName petview");
      this.getPets(this.props.location.state.ownerId);
    }
  };

  getOwner = userName => {
    console.log("inside getOwner function of OwnerView Page")
    console.log(userName);

    API.getOwner(userName)
      .then(res =>
        //        console.log(res.data[0])
        this.setState(
          { owner: res.data },
          () => console.log(this.state)
        )
      )
      .then(res => console.log("owner state ", this.state.owner))
      .then(res => this.hasPets(this.props.location.state))
      .catch(err => console.log(err))
  };

  getPets = ownerId => {
    console.log("inside getPets function of OwnerView Page")
    console.log(ownerId);

    API.getPets(ownerId)
      .then(res =>
        this.setState(
          { pets: res.data },
          console.log("pets res.data in ownerview.js ", res)
        )
      )
      .then(res => console.log("pets state ", this.state.pets))
      .catch(err => console.log(err))
  };

  deletePet = event => {
    event.preventDefault();
    console.log("inside deletePet function of OwnerView Page")

    console.log("event.target.value is" + event.target.value);

    const petId = event.target.value;
    console.log("petId is " + petId);

    API.deletePet(petId)
      .then(res =>
        console.log("res ", res), 
        this.getPets(this.props.location.state.ownerId)
      )
      .catch(err => console.log(err))
  };

  hasPets() {
    if (this.props.location.state.fromPage === "CreatePet") {
      console.log("hasPets");
      this.getPets(this.props.location.state.ownerid);
    }
  }
  petPage = (id, username) => {
    this.props.history.push("/createpet/", { id: id, username: username })
  };

  petView = (ownerId, petId, username) => {
    this.props.history.push("/petview/", { ownerid: ownerId, petid: petId, username: username })
  };

  // const OwnerView = (props) => {
  render() {
    return (
      <div className="background">
        <div className="container fluid">
          <Jumbotron>
            <div className="owner"><i className="fas fa-paw"></i>Owner View</div>
            
            </Jumbotron>
          <div className="row">

            <div className=" pet-card col-2">

              <CreatePetBtn  onClick={() => this.petPage(this.state.owner[0].owner_id, this.state.owner[0].username)} >
              <div className="pet"><i className=" paw2 fas fa-paw"></i>Create Pet</div> 
              </CreatePetBtn>
            </div>
            {this.state.pets.length ? (
              
              <div className="col-9">
                  {this.state.pets.map(pet => (
                    
                      <div className="col-4 pet-card2">
              
                    <Card onClick={() => this.petView(pet.owner_id, pet.pet_id, this.state.owner[0].username)} >
                      <div>
                        <CardImg div className="pet-img" top width="100%"
                          src={pet.pet_image}
                          alt="Card image cap"
                          id={pet.pet_id}
                          key={pet.pet_id}
                          onClick={() => this.petView(pet.owner_id, pet.pet_id)}
                        />
                        <CardBody div className="pet-body" onClick={() => this.petView(pet.owner_id, pet.pet_id)} >
                          <CardTitle><div className="pet2"><i className="fas fa-paw"></i>
                            {pet.name}
                            <DeleteBtn
                            onClick={this.deletePet}
                            name="pet_id"
                            value={pet.pet_id} >Delete
                            </DeleteBtn>
                            </div>
                          </CardTitle>
                        </CardBody>
                        {/* <CardFooter> */}
                          {/* <DeleteBtn
                            onClick={this.deletePet}
                            name="pet_id"
                            value={pet.pet_id} >Delete
                            </DeleteBtn> */}
                        {/* </CardFooter> */}
                      </div>
                    </Card>
                    </div>
                  ))}
                </div>
                
              ) : (
                  
                  <div className="no-pet"><i className="fas fa-paw"></i>Please Create a Pet! </div>
                )}
            
          </div>
          
        </div>
        <Footer />
      </div>


    );
  }
}

export default OwnerView;
