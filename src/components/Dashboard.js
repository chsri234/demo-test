import React, { Component } from "react";
import { Table, Container, Row, Col } from "reactstrap";
import {store, getUsers} from '../Redux';

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      loading: false,
      error: false
    };

    store.subscribe(() => {
      let state = store.getState();
      this.setState({
        loading: state.users.loading,
        error: state.users.error,
        users: state.users.users
      });
    });
  }

  componentDidMount() {
    store.dispatch(getUsers());
  }

  render() {
    if (this.state.loading === true) {
      return(
      <React.Fragment>
        <h1 className="mt-4 text-warning">Employee List</h1>
        <Container className="mt-5">
          <Row>
            <Col md="6" className="offset-md-3"></Col>
            <p>Please wait... loading...</p>
          </Row>
        </Container>
      </React.Fragment>
      )
    }

    if(this.state.error === true) {
      return(
        <React.Fragment>
          <h1 className="mt-4 text-warning">Employee List</h1>
          <Container className="mt-5">
            <Row>
              <Col md="6" className="offset-md-3"></Col>
              <p>Something went wrong... Please try later... </p>
            </Row>
          </Container>
        </React.Fragment>
        )
    }
    return (
      <React.Fragment>
        <h1 className="mt-4 text-warning">Employee List</h1>
        <Container className="mt-5">
          <Row>
            <Col md="6" className="offset-md-3">
              <Table striped>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Gender</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.users.map((user, index) => {
                    return (
                      <tr key={index}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.age}</td>
                        <td>{user.gender}</td>
                        <td>{user.email}</td>
                        <td>{user.phoneNo}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default Dashboard;
