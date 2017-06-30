import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
var Loader = require("react-loader");
var ReactHighstock = require("react-highcharts/ReactHighstock.src");

const Wrapper = styled.div`
  margin-top: 20px;
  position: relative;
`;

class Chart extends Component {
  render() {
    const config = {
      plotOptions: {
        series: {
          compare: "percent",
          showInNavigator: true
        }
      },
      title: {
        text: "Stock Price % change comparison"
      }
    };
    config.series = Object.keys(this.props.stockData).map(symbol => {
      return {
        name: symbol,
        data: this.props.stockData[symbol].quotes,
        tooltip: {
          valueDecimals: 2
        }
      };
    });
    return (
      <Wrapper>
        <ReactHighstock config={config} />
        {Object.keys(this.props.loading).length !== 0 && <Loader />}
      </Wrapper>
    );
  }
}

function mapStateToProps(state) {
  return {
    stockData: state.data,
    loading: state.loading
  };
}

export default connect(mapStateToProps)(Chart);
