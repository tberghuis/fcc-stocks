var express = require("express");
var router = express.Router();
var yahooFinance = require("yahoo-finance");

router.get("/financedata", function(req, res) {
  var symbol = req.query.symbol;

  // error if symbol ! in GLOB_SYMBOLS
  if (GLOB_SYMBOLS.indexOf(symbol) === -1) {
    // TODO ... design and test this
    res.json({ data: "error" });
    return;
  }

  // fetch data yahoo api, I could cache this if i wanted to
  let pQuotes = yahooFinance
    .historical({
      symbol,
      from: "2012-01-01",
      period: "d"
    })
    .then(data => {
      data = data.map(quote => {
        let { adjClose, date } = quote;
        return [date.getTime(), adjClose];
      });
      data.reverse();
      console.log("data historical", data);
      return { quotes: data };
    });

  let pSummary = yahooFinance
    .quote(symbol, ["summaryProfile", "price"])
    .then(data => {
      console.log("data summary", data);
      let { city, website, industry, sector } = data.summaryProfile;
      let { shortName } = data.price;
      return { symbol, name: shortName, city, website, industry, sector };
    });

  Promise.all([pQuotes, pSummary])
    .catch(error => {
      console.log("error", error);
    })
    .then(([quoteData, summaryData]) => {
      res.json({ ...quoteData, ...summaryData });
    });
});

router.get("/symbols", function(req, res) {
  res.json(GLOB_SYMBOLS);
});

module.exports = router;
