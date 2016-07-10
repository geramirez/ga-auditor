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
  if (window.oCONFIG) {
	  data['DAP'] = {
	    agency: oCONFIG['AGENCY'],
	    ua_codes: oCONFIG['GWT_UAID'],
	    sub_agency: oCONFIG['SUB_AGENCY'],
	    version: oCONFIG['VERSION'],
	  };
  }
  return data;
}

GoogleAnalyticsAuditor.prototype.getStats = function(callback) {
    var self = this;
    var sitepage = null;
    var phInstance = null;
    phantom.create()
    .then(instance => {
        phInstance = instance;
        return instance.createPage();
    })
    .then(page => {
        sitepage = page;
        return page.open(self.URL);
    })
    .then(status => {
        if (status == "success") {
            sitepage.evaluate(self.evaluateGA)            
                .then(function(data){
                    sitepage.close();
                    phInstance.exit();
                    callback(data);
                });
        } else {
            sitepage.close();
            phInstance.exit();
            callback({'error': 'Invalid URL'})
        }
    })
    .catch(error => {
        sitepage.close();
        phInstance.exit();
        callback({'error': 'Invalid URL'})
    }); 
};


module.exports = GoogleAnalyticsAuditor;
