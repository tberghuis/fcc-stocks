import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import socket from "../socket";

const Form = styled.form`
  text-align: left;
  display: flex;
  .form-group {
    flex-grow: 1;
    margin-right: 10px;
  }
`;

class AddStock extends Component {
  handleSubmit = event => {
    let symbol = this.input.value.toUpperCase();

    // if doing rewrite i would do
    // validation first
    this.props.dispatch({
      type: "CHART_LOADING_START",
      symbol
    });
    socket.emit("add symbol", symbol.toUpperCase().trim());
    event.preventDefault();
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        {/* is there a aimpler way to write the className line? */}
        <div className={"form-group" + (this.props.error ? " has-danger" : "")}>
          <input
            className={
              "form-control" + (this.props.error ? " form-control-danger" : "")
            }
            placeholder="Enter a stock ticker symbol"
            type="text"
            ref={input => (this.input = input)}
          />
          {this.props.error === "SYMBOL_NOT_FOUND" &&
            <div className="form-control-feedback">
              Stock ticker symbol not found. Symbols to try MSFT, IBM, GOOG,
              AAPL
            </div>}

          {this.props.error === "SYMBOL_ALREADY_EXIST" &&
            <div className="form-control-feedback">
              Stock ticker symbol already added.
            </div>}
        </div>
        <div>
          <button type="submit" className="btn btn-primary pull-right">
            Submit
          </button>
        </div>
      </Form>
    );
  }
}

function mapStateToProps(state) {
  return {
    error: state.form
  };
}

export default connect(mapStateToProps)(AddStock);
