const yahooFinance = require("yahoo-finance");

var exports = (module.exports = {});

exports.asyncValidateSymbol = async function(symbol) {
  try {
    //await yahooFinance.quote(symbol);
    // i should be caching data
    var data = await yahooFinance.quote(symbol, ["summaryProfile", "price"]);
    // some symbols did not have summaryProfile data, causing
    // infinate loading
    if (!data.summaryProfile || !data.price) return false;
    return true;
  } catch (err) {
    // let allKeys = Object.getOwnPropertyNames(err);
    // console.log(allKeys); // message stack
    return false;
  }
};
