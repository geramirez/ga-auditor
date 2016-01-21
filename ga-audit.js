var phantom = require('phantom');

function GoogleAnalyticsAuditor(URL) {
  var self = this;
  self.URL = URL;
  console.log("Working on page:" + URL);
}

GoogleAnalyticsAuditor.prototype.evaluateGA = function() {
  var data = {'UACodes': []};
  var gaUniversal = window.ga;
  if (typeof gaUniversal === "function") {
    gaUniversal.getAll().map(function (element){
        data['UACodes'].push({
          version: 'Google Analytics Universal',
          trackingId: element.get('trackingId'),
          anonymizeIp: element.get('anonymizeIp'),
          forceSSL: element.get('forceSSL')
        })
    });
  }
  if (oCONFIG) {
	  data['DAP'] = {
	    agency: oCONFIG['AGENCY'],
	    ua_codes: oCONFIG['GWT_UAID'],
	    sub_agnecy: oCONFIG['SUB_AGENCY'],
	    version: oCONFIG['VERSION'],
	  };
  }
  return data;
}

GoogleAnalyticsAuditor.prototype.getStats = function(callback) {
  var self = this;
  phantom.create(function (ph) {
    ph.createPage(function (page) {
      page.open(self.URL, function (status) {
        if (status === "success") {
          page.evaluate(self.evaluateGA, function (stats) {
            ph.exit();          
	    callback(stats);
          });
        } else {
	  console.log(status);
	  ph.exit();
          callback({'error': 'Invalid URL'})
        }
      });
    });
  });
};


module.exports = GoogleAnalyticsAuditor;
