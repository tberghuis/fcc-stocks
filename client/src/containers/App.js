import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import styled from "styled-components";

import AddStock from "./AddStock";
import Chart from "./Chart";
import StockList from "./StockList";
import socket from "../socket";

const Wrapper = styled.div`
  margin-top: 20px;
  > h1 > a {
    color: black;
    margin-right: 20px;
  }
  > h1 {
    margin-bottom: 20px;
    text-align: center;
  }
`;

// grow this until refactor
class App extends Component {
  getFinanceData = symbol => {
    return axios
      .get(`${process.env.REACT_APP_API_BASE}/financedata?symbol=${symbol}`)
      .then(res => {
        console.log("data", res.data);
        this.props.dispatch({
          type: "RECIEVE_STOCK_DATA",
          data: res.data
        });
        this.props.dispatch({
          type: "CHART_LOADING_FINISHED",
          symbol
        });
      });
  };

  componentWillMount() {
    axios.get(`${process.env.REACT_APP_API_BASE}/symbols`).then(res => {
      console.log("symbols data", res.data);
      res.data.forEach(symbol => {
        this.props.dispatch({
          type: "CHART_LOADING_START",
          symbol
        });
        this.getFinanceData(symbol);
      });
    });
  }

  componentDidMount() {
    socket.on("add symbol error invalid", symbol => {
      console.log("add symbol error invalid", symbol);
      this.props.dispatch({
        type: "CHART_LOADING_FINISHED",
        symbol
      });
      this.props.dispatch({
        type: "SYMBOL_NOT_FOUND"
      });
    });
    socket.on("add symbol error exists", symbol => {
      this.props.dispatch({
        type: "CHART_LOADING_FINISHED",
        symbol
      });
      this.props.dispatch({
        type: "SYMBOL_ALREADY_EXIST"
      });
    });

    socket.on("add symbol", symbol => {
      console.log("add symbol", symbol);
      this.getFinanceData(symbol);
    });

    socket.on("remove symbol", symbol => {
      console.log("remove symbol", symbol);
      this.props.dispatch({
        type: "REMOVE_SYMBOL",
        symbol
      });
    });
  }

  render() {
    return (
      <Wrapper className="container">
        <h1>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/tberghuis/fcc-stocks"
          >
            <i className="fa fa-github" aria-hidden="true" />
          </a>
          FCC - Chart the Stock Market
        </h1>
        <AddStock />
        <Chart />
        <StockList />
      </Wrapper>
    );
  }
}

export default connect()(App);
