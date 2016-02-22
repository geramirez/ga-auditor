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
  data_div = $("#data");
  var $dap_div = $( "<div id='dap' class='col-md-6'/>" );

  var $agency_div = $( "<div id='agency'/>" );

  $agency_div.append("<h1>DAP</h1>" + "<h2>Agency:</h2>" + "<p>" + DAP.agency + "</p>");

  var $sub_agency_div = $( "<div id='subagency'/>" );
  $sub_agency_div.append("<h2>Subagency:</h2>" + "<p>" + DAP.sub_agency + "</p>");

  var $ua_codes_div = $( "<div id='ua_codes'/>" );

  $ua_codes_div.append("<h3>UA Codes: </h3>" + "<p>" + DAP.ua_codes + "</p>" + "<h3>Version: </h3>" + "<p>" + DAP.version + "</p>" );

  data_div.append($dap_div);
  $dap_div.append($agency_div);
  $dap_div.append($sub_agency_div);
  $dap_div.append($ua_codes_div);
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
