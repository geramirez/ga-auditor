var express = require('express'),
    router = express.Router(),
    gaAudit = require('../ga-audit');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/api/audit', function (req, res) {
  var URL = req.body.url;
  var auditor = new gaAudit(URL);
  auditor.getStats(function (stats) {
    res.json(stats);
  });
});

module.exports = router;
