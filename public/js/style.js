document.getElementById("get-stats").addEventListener("click", getStats);
function getStats()
{
var xhr = new XMLHttpRequest();
xhr.open('POST', '/api/audit', true);
xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
xhr.onreadystatechange = function() {
if (xhr.readyState == 4 && xhr.status == 200)
{
  document.getElementById('data').innerHTML = "";
  var stats = JSON.parse(xhr.responseText);
  console.log(stats)
  if (stats.DAP) {
      dapData(stats["DAP"]);
    }
  if (stats.UACodes.length > 0) {
      uaData(stats["UACodes"]);
  }

}
}
xhr.send(JSON.stringify({"url": document.getElementById("submission-text").value}));
};

function dapData(DAP) {
  data_div = document.getElementById('data');
  // document.body.style.borderColor = "green";
  var dap_div = document.createElement('div');
  dap_div.id = "dap";
  data_div.appendChild(dap_div);
  
  var heading = document.createElement("H1");
  var title = document.createTextNode("DAP");
  heading.appendChild(title);
  
  dap_div.appendChild(heading);
  
  var agency_div = document.createElement('div');
  agency_div.id = "agency";
  var agency_h2 = document.createElement("H2");
  var agency_p = document.createElement("P");
  var agency_heading = document.createTextNode("Agency: ");
  var agency_name = document.createTextNode(DAP.agency);
  agency_h2.appendChild(agency_heading);
  agency_p.appendChild(agency_name);
  agency_div.appendChild(agency_h2);
  agency_div.appendChild(agency_p);
  dap_div.appendChild(agency_div);

  var sub_agency_div = document.createElement('div');
  sub_agency_div.id = "subagency";
  var sub_agency_h3 = document.createElement("H3");
  var sub_agency_p = document.createElement("P");
  var sub_agency_heading = document.createTextNode("Subagency: ");
  var sub_agency_name = document.createTextNode(DAP.sub_agency);
  sub_agency_h3.appendChild(sub_agency_heading);
  sub_agency_p.appendChild(sub_agency_name);
  sub_agency_div.appendChild(sub_agency_h3);
  sub_agency_div.appendChild(sub_agency_p);
  dap_div.appendChild(sub_agency_div);

  var ua_codes_div = document.createElement('div');
  ua_codes_div.id = "ua_codes";
  var ua_codes_h3 = document.createElement("H3");
  var ua_codes_p = document.createElement("P");
  var ua_codes_version_p = document.createElement("P");
  var ua_codes_heading = document.createTextNode("UA Codes: ");
  var ua_codes = document.createTextNode(DAP.ua_codes);
  var ua_version_h3 = document.createElement("H3");
  var ua_version = document.createTextNode("Version: ");
  var ua_codes_version = document.createTextNode(DAP.version);
  var br = document.createElement("br");
  ua_codes_h3.appendChild(ua_codes_heading);
  ua_version_h3.appendChild(ua_version);
  ua_codes_p.appendChild(ua_codes);
  ua_codes_p.appendChild(br);
  ua_codes_version_p.appendChild(ua_codes_version);
  ua_codes_div.appendChild(ua_codes_h3);
  ua_codes_div.appendChild(ua_codes_p);
  ua_codes_div.appendChild(ua_version_h3);
  ua_codes_div.appendChild(ua_codes_version);
  dap_div.appendChild(ua_codes_div);
  dap_div.className += "col-md-6";
}

function uaData(UA) {
  document.body.style.borderColor = "green";
  var ua_div = document.createElement('div');
  ua_div.id = "ua";
  var ua_h1 = document.createElement("H1");
  var ua_title = document.createTextNode("UA Codes");
  ua_h1.appendChild(ua_title);

  ua_div.appendChild(ua_h1);
  
  data_div = document.getElementById('data');
  data_div.appendChild(ua_div);
  ua_div.className += "col-md-6";


  for (item in UA) {
    
    var tracking_id_div = document.createElement('div');
    tracking_id_div.id = "trackingId";
    var tracking_id_h3 = document.createElement("H3");
    var tracking_id_p = document.createElement("P");
    var tracking_id_heading = document.createTextNode("Tracking ID: ");
    var tracking_id = document.createTextNode(UA[item].trackingId);
    tracking_id_p.appendChild(tracking_id);
    tracking_id_h3.appendChild(tracking_id_heading);
    tracking_id_div.appendChild(tracking_id_h3);
    tracking_id_div.appendChild(tracking_id_p);

    var tracking_id_version_h3 = document.createElement("H3");
    var tracking_id_version_p = document.createElement("P");
    var tracking_id_version_heading = document.createTextNode("Version: ");
    tracking_id_version_h3.appendChild(tracking_id_version_heading);
    var tracking_id_version = document.createTextNode(UA[item].version);
    tracking_id_version_p.appendChild(tracking_id_version)
    tracking_id_div.appendChild(tracking_id_version_h3);
    tracking_id_div.appendChild(tracking_id_version_p);
    ua_div.appendChild(tracking_id_div);


  }
}
