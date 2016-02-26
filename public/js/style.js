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
  $("body").css("border-color", "green");
  
  data_div = $("#data");

  var $ua_div = $("<div id='ua' class='col-md-6'/>");

  $ua_div.append("<h1>UA Codes</h1>");

  data_div.append($ua_div);

  for (item in UA) {

    var $tracking_id_div = $("<div id='trackingId'/>");
    $tracking_id_div.append("<h3>Tracking ID:</h3>" + "<p>" + UA[item].trackingId + "</p>" + "<h3>Version:</h3>" + "<p>" + UA[item].version + "</p>")
    $ua_div.append($tracking_id_div);


  }
}
