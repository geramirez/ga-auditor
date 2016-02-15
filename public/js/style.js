document.getElementById("get-stats").addEventListener("click", getStats);
function getStats()
{
var xhr = new XMLHttpRequest();
xhr.open('POST', '/api/audit', true);
xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
xhr.onreadystatechange = function() {
if (xhr.readyState == 4 && xhr.status == 200)
{
  var stats = JSON.parse(xhr.responseText);

  if (stats.DAP) {
      dapData(stats["DAP"]);
    }

}
}
xhr.send(JSON.stringify({"url": document.getElementById("submission-text").value}));
};

function dapData(DAP) {
  var dap_div = document.createElement('div');
  dap_div.id = "dap";
  data_div = document.getElementById('data');
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
  var ua_codes_heading = document.createTextNode("UA Codes: ");
  var ua_codes = document.createTextNode(DAP.ua_codes);
  var ua_codes_version = document.createTextNode(DAP.version);
  var br = document.createElement("br");
  ua_codes_h3.appendChild(ua_codes_heading);
  ua_codes_p.appendChild(ua_codes);
  ua_codes_p.appendChild(br);
  ua_codes_p.appendChild(ua_codes_version);
  ua_codes_div.appendChild(ua_codes_h3);
  ua_codes_div.appendChild(ua_codes_p);
  dap_div.appendChild(ua_codes_div);
}
