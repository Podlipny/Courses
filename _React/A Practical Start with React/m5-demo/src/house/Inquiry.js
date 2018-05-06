import React, { Component } from 'react';

class Inquiry extends Component {
  state = {
    name: "",
    email: "",
    remarks: ""
  }

  onNameChange = (e) => {
    e.preventDefault();
    this.setState({ name: e.target.value });
  }

  onEmailChange = (e) => {
    e.preventDefault();
    this.setState({ email: e.target.value });
  }

  onRemarksChange = (e) => {
    e.preventDefault();
    this.setState({ remarks: e.target.value });
  }

  onSubmit = (e) => {
    e.preventDefault();
    const house = this.props.house;
    const contactInfo = this.state;
    //send
  }
  render() {
    return (
      <form className="mt-2">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            id="name"
            value={this.state.name}
            onChange={this.onNameChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="text"
            id="email"
            className="form-control"
            placeholder="Email"
            value={this.state.password}
            onChange={this.onEmailChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="remarks">Remarks</label>
          <input
            type="text"
            id="remarks"
            className="form-control"
            placeholder="Remarks"
            value={this.state.remarks}
            onChange={this.onRemarksChange}
          />
        </div>
        <button
          className="btn btn-primary"
          disabled={this.state.name.length === 0 || this.state.email.length === 0}
          onClick={this.onSubmit}
        >
          Submit
      </button>
      </form>
    );
  }
}

export default Inquiry;
