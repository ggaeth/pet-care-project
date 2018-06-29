import React from "react";
import { Col, Container, Row, Footer } from "mdbreact";
import "./Footer.css";


class FooterPage extends React.Component {
  render() {
    return (
      <Footer className="font-small">
        <Container className="text-left">
          <Row>
            <Col sm="6">
              <h3 className="footerTitle"><i className="fas fa-paw"></i>Pet Purfect</h3>
              {/* <p>
               All Pets All Care
              </p> */}
            </Col>
            <Col sm="6">
              {/* <h5 className="linksTitle">Links</h5>
              <ul>
                <li className="list-unstyled">
                  <a href="#!">Link 1</a>
                </li>
                <li className="list-unstyled">
                  <a href="#!">Link 2</a>
                </li>
                <li className="list-unstyled">
                  <a href="#!">Link 3</a>
                </li>
                <li className="list-unstyled">
                  <a href="#!">Link 4</a>
                </li>
              </ul> */}
            </Col>
          </Row>
        </Container>
        <div className="footer-copyright text-center">
          <Container fluid>
            &copy; {new Date().getFullYear()} Copyright 
          </Container>
        </div>
      </Footer>
    );
  }
}

export default FooterPage;