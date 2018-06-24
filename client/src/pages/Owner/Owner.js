import React, { Component } from "react";
import API from "../../utils/API";
import "./Owner.css";

class Owner extends Component {
  state = {
    owner_id: "",
    name: "",
    address: "",
    city: "",
    state: "",
    zip_code: "",
    phone: "",
    secondary_phone: "",
    email: "",
    username: "",
    owner_info: "",
    owner_image: ""
  };

  componentDidMount() {
    console.log("in mount ", this.props.location.state);
    this.getHistory(this.props.location.state);
  };

  getHistory = userName => {
    console.log(userName);

    API.getOwner(userName)
      .then(res =>
        this.setState(
          { owner_id: res.data[0].owner_id,
            name: res.data[0].name,
            address: res.data[0].address,
            city: res.data[0].city,
            state: res.data[0].state,
            zip_code: res.data[0].zip_code,
            phone: res.data[0].phone,
            secondary_phone: res.data[0].secondary_phone,
            email: res.data[0].email,
            username: res.data[0].username,
            owner_info: res.data[0].owner_info,
            owner_image: res.data[0].owner_image
           },
          () => console.log("this.state is now " + JSON.stringify(this.state, null, 2) + "\n")
        )
      )
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="container fluid">
        <div className="row">
          <div className="col text-center">
            <h1>Pet Owner View</h1>
          </div>
        </div>
        <div className="row">
          <div className="col">
            {this.state.owner_id ?
              (<p>owner_id: {this.state.owner_id}</p>) : (<p></p>)}
            {this.state.owner_id ?
              (<p>name: {this.state.name}</p>) : (<p></p>)}
            {this.state.owner_id ?
              (<p>address: {this.state.address}</p>) : (<p></p>)}
            {this.state.owner_id ?
              (<p>city: {this.state.city}</p>) : (<p></p>)}
            {this.state.owner_id ?
              (<p>state: {this.state.state}</p>) : (<p></p>)}
            {this.state.owner_id ?
              (<p>zip_code: {this.state.zip_code}</p>) : (<p></p>)}
            {this.state.owner_id ?
              (<p>phone: {this.state.phone}</p>) : (<p></p>)}
            {this.state.owner_id ?
              (<p>secondary_phone: {this.state.secondary_phone}</p>) : (<p></p>)}
            {this.state.owner_id ?
              (<p>email: {this.state.email}</p>) : (<p></p>)}
            {this.state.owner_id ?
              (<p>username: {this.state.username}</p>) : (<p></p>)}
            {this.state.owner_id ?
              (<p>owner_info: {this.state.owner_info}</p>) : (<p></p>)}
            {this.state.owner_id ?
              (<p>owner_image: {this.state.owner_image}</p>) : (<p></p>)}
          </div>
        </div>
      </div>
    );
  }
}

export default Owner;