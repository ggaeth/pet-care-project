import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { OwnerBtn, CareBtn } from "../../components/Buttons";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import "./Create.css";

class Create extends Component {

  // handleFormSubmit = event => {
  //   event.preventDefault();
  //   if (this.state.title && this.state.author) {
  //     API.saveBook({
  //       title: this.state.title,
  //       author: this.state.author,
  //       synopsis: this.state.synopsis
  //     })
  //       .then(res => this.loadBooks())
  //       .catch(err => console.log(err));
  //   }
  // };

    render() {
    return (
      <div>
        {/* <Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}</Button> */}
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
          <ModalBody>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }

  // render() {
  //   return (
  //     <div className="modal fade" id="createModal" tabIndex="-1" role="dialog" aria-labelledby="createModalLabel" aria-hidden="true">
  //       <div className="modal-dialog" role="document">
  //         <div className="modal-content">
  //           <div className="modal-header">
  //             <h5 className="modal-title" id="createModalLabel">Create Account</h5>
  //             <button type="button" className="close" data-dismiss="modal" aria-label="Close">
  //               <span aria-hidden="true">&times;</span>
  //             </button>
  //           </div>
  //           <div className="modal-body">
  //             <div className="row">
  //               <div className="col text-center">
  //                 <Link to="/createowner" className="btn-link">
  //                   <OwnerBtn>
  //                     Owner
  //                   </OwnerBtn>
  //                 </Link>
  //               </div>
  //             </div>
  //             <div className="row">
  //               <div className="col text-center">
  //                 <Link to="/createcare" className="btn-link">
  //                   <CareBtn>
  //                     Caregiver
  //                   </CareBtn>
  //                 </Link>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>

      // <div className="container fluid">
      //   <div className="row">
      //     <div className="col">
      //       <Jumbotron>
      //         <p>Create Account</p>
      //       </Jumbotron>
      //     </div>
      //   </div>
      //   <div className="row">
      //     <div className="col text-center">
      //       <Link to="/createowner" className="btn-link">
      //         <OwnerBtn>
      //           Owner
      //         </OwnerBtn>
      //       </Link>
      //     </div>
      //   </div>
      //   <div className="row">
      //     <div className="col text-center">
      //       <Link to="/createcare" className="btn-link">
      //         <CareBtn>
      //           Caregiver
      //         </CareBtn>
      //       </Link>
      //     </div>
      //   </div>
      // </div>


  //   );
  // }
}

export default Create;