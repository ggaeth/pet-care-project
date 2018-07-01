import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { OwnerBtn, CareBtn } from "../../components/Buttons";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import "./CarePetView.css";

class CarePetView extends Component {
    state = {
        careGiver: {},
      };
    }
    export default CarePetView;