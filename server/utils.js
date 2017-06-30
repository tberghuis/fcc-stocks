const yahooFinance = require("yahoo-finance");

var exports = (module.exports = {});

exports.asyncValidateSymbol = async function(symbol) {
  try {
    await yahooFinance.quote(symbol);
    return true;
  } catch (err) {
    // let allKeys = Object.getOwnPropertyNames(err);
    // console.log(allKeys); // message stack
    return false;
  }
};
