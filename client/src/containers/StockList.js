import React, { Component } from "react";
import { connect } from "react-redux";
import socket from "../socket";

class StockList extends Component {
  removeStock = symbol => () => {
    socket.emit("remove symbol", symbol);
  };
  render() {
    var table = Object.keys(this.props.stockData).map(symbol => {
      let { city, industry, name, sector, website } = this.props.stockData[
        symbol
      ];
      return (
        <tr key={symbol}>
          <td>
            {symbol}
          </td>
          <td>
            <a target="_blank" rel="noopener noreferrer" href={website}>
              {name}
            </a>
          </td>
          <td className="hidden-sm-down">
            {city}
          </td>
          <td className="hidden-sm-down hidden-md-down">
            {industry}
          </td>
          <td className="hidden-sm-down">
            {sector}
          </td>
          <td>
            <button
              type="button"
              className="btn btn-danger pull-right"
              onClick={this.removeStock(symbol)}
            >
              <i className="fa fa-trash" aria-hidden="true" />
            </button>
          </td>
        </tr>
      );
    });

    return (
      <table className="table mt-4 align-middle">
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Name</th>
            <th className="hidden-sm-down">City</th>
            <th className="hidden-sm-down hidden-md-down">Industry</th>
            <th className="hidden-sm-down">Sector</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {table}
        </tbody>
      </table>
    );
  }
}

function mapStateToProps(state) {
  return {
    stockData: state.data
  };
}

export default connect(mapStateToProps)(StockList);
