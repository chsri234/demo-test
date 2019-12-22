import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from "reactstrap";
import { store, verifyLogin } from "../Redux";
import { Redirect } from "react-router-dom";
class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      loading: false,
      error: false,
      errorMsg: "",
      loginStatus: false
    };

    store.subscribe(() => {
      let state = store.getState();
      this.setState({
        loading: state.login.loading,
        error: state.login.error,
        loginStatus: state.login.loginStatus
      });
    });
  }

  onSubmit = () => {
    if (this.state.username === "" || this.state.password === "") {
      this.setState({
        errorMsg: "Feilds should not be empty"
      });
    } else if (this.state.username !== "" && this.state.password !== "") {
      this.setState({
        errorMsg: "Please enter valid login details"
      });
    }
    store.dispatch(verifyLogin(this.state.username, this.state.password));
  };

  onEmailChange = e => {
    this.setState({
      username: e.target.value
    });
  };

  onPasswordChange = e => {
    this.setState({
      password: e.target.value
    });
  };

  render() {
    if (this.state.loginStatus === true) {
      return <Redirect to="/dashboard"></Redirect>;
    }

    return (
      <React.Fragment>
        <h1 className="mt-5">Login Page</h1>
        <Container className="mt-5 pt-md-5">
          <Row>
            <Col lg="4" className="offset-lg-4">
              <Form>
                <FormGroup>
                  <Row>
                    <Col md="3" className="mt-md-2">
                      <Label for="email">Email</Label>
                    </Col>
                    <Col md="9">
                      <Input
                        onChange={this.onEmailChange}
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter EmailID"
                      />
                    </Col>
                  </Row>
                </FormGroup>
                <FormGroup>
                  <Row>
                    <Col md="3" className="mt-md-2">
                      <Label for="password">Password</Label>
                    </Col>
                    <Col md="9">
                      <Input
                        onChange={this.onPasswordChange}
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Enter Password"
                      />
                    </Col>
                  </Row>
                </FormGroup>
                <Button color="success" onClick={this.onSubmit}>
                  Login
                </Button>
                {this.state.errorMsg !== "" && (
                  <div className="text-danger mt-4 font-weight-bolder">
                    <p>{this.state.errorMsg}</p>
                  </div>
                )}
              </Form>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default Login;
