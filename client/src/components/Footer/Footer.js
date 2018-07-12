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
            </Col>
            <Col sm="6">
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