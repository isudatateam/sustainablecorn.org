/* TODO
 * - If it varies by experimental plot, enter the estimated cover on a plot 
> basis (We will need people to enter % values on a per plot basis
> somewhere... where does this make the most sense? On the spreadsheet
> where they have to enter plot numbers to the treatments??)

 * Make fonts appear the same for all portions of the form.
 */
  var service;
  var sites = [];
  var sitekeys = [];
  var operationsEntry;
  var managementEntry;
  var ipmEntry;
  var myYear = 2011;
  var man_sskey = '0AqZGw0coobCxdE9wN2J4aVE1bUthdWFsWjNrYURHWGc';
  var site_sskey = '0AugT6NSY_M5HdGd2cFV2WXBCQlJZNDRoSjZ0Qml4bnc';
  var SITES_FEED;
  var FERTELEM = [ 'nitrogen', 'phosphorus', 'phosphate', 'potassium', 
    'potash', 'sulfur', 'calcium', 
           'magnesium', 'zinc','iron'];
  var MANURE_ELEM = [ 'nitrogen', 'phosphate', 
    'potash', 'sulfur', 'calcium', 'magnesium'];

function loadNotes(){
  var selectedSite = document.getElementById("siteSelector").value;
  var siteEntry = 0;
  for (var i=0, n=SITES_FEED.entry.length; i < n; i++) {
        var entry = SITES_FEED.entry[i];
        if (entry.gsx$uniqueid.$t == selectedSite){
           siteEntry = entry;
        }
  }
  if (siteEntry == 0){
    document.getElementById("notes").value = "";
    return;
  }

  document.getElementById("notes").value = siteEntry['gsx$notes'+myYear].$t;
}

function loadLonLat(){
  var keys = ['nw_lon','nw_lat','ne_lon','ne_lat','se_lon','se_lat','sw_lon','sw_lat', 'raw_lonlat'];

  var selectedSite = document.getElementById("siteSelector").value;
  var siteEntry = 0;
  for (var i=0, n=SITES_FEED.entry.length; i < n; i++) {
        var entry = SITES_FEED.entry[i];
        if (entry.gsx$uniqueid.$t == selectedSite){
           siteEntry = entry;
        }
  }
  if (siteEntry == 0){
    return;
  }

  for (var i=0;i<keys.length;i++){
    var key = keys[i];
    document.getElementById(keys[i]).value = siteEntry['gsx$'+ key.replace("_","")].$t;
  }
}

/* Save the Notes Information Entered */
function saveNotes(){
  var selectedSite = document.getElementById("siteSelector").value;
  var siteEntry = 0;
  for (var i=0, n=SITES_FEED.entry.length; i < n; i++) {
        var entry = SITES_FEED.entry[i];
        if (entry.gsx$uniqueid.$t == selectedSite){
           siteEntry = entry;
        }
  }
  if (siteEntry == 0){
    alert("Could not find site for saveNotes");
    return;
  }

  var val = document.getElementById("notes").value;
  siteEntry['gsx$notes'+myYear] = {$t: val};
  function good(entry){
        alert('Notes Entry was saved!');
  }
  function bad(error){
        alert(error);
  }
  service.setHeaders({"If-Match": "*"});
  service.updateEntry(siteEntry.id.$t, siteEntry, good, bad);
  service.setHeaders({"If-Match": null});
}

/* Save the Lat/Lon Information Entered */
function saveLonLat(){
  var keys = ['nw_lon','nw_lat','ne_lon','ne_lat','se_lon','se_lat','sw_lon','sw_lat', 'raw_lonlat'];

  var selectedSite = document.getElementById("siteSelector").value;
  var siteEntry = 0;
  for (var i=0, n=SITES_FEED.entry.length; i < n; i++) {
        var entry = SITES_FEED.entry[i];
        if (entry.gsx$uniqueid.$t == selectedSite){
           siteEntry = entry;
        }
  }
  if (siteEntry == 0){
    alert("Could not find site for saveLonLat");
    return;
  }

  for (var i=0;i<keys.length;i++){
    var key = keys[i];
    var val = document.getElementById(keys[i]).value;
    //if (val.trim() == "" && key != 'raw_lonlat'){
    //  alert("Coordinate "+ keys[i] +" invalid, try again");
    //  return;
    //}
    siteEntry['gsx$'+key.replace("_","")] = {$t: val};
  }
    function good(entry){
        alert('LonLat Entry was saved!');
    }
    function bad(error){
        alert(error);
    }
    service.setHeaders({"If-Match": "*"});
    service.updateEntry(siteEntry.id.$t, siteEntry, good, bad);
    service.setHeaders({"If-Match": null});
}

function irrigation_show(val){
  var el = document.getElementById("irrigation-sub");
  if (val == "yes"){
    el.style.display = 'block';
  } else {
    el.style.display = 'none';
  }
}

function residue_show(val){
  var elyes = document.getElementById("residue-sub-yes");
  var elno = document.getElementById("residue-sub-no");
  if (val == "yes"){
    elyes.style.display = 'block';
    elno.style.display = 'none';
  } else {
    elyes.style.display = 'none';
    elno.style.display = 'block';
  }
}

/* Sets the current operation */
function setOperation(op_code){
    if (op_code == "invalid"){ return; }
    var tokens = op_code.split("_");
    showOneOperation( tokens[0], tokens[1] );
}

/* Sets the current IPM operation */
function setIpmOperation(op_code){
    if (op_code == "invalid"){ return; }
    showOneIpmOperation( op_code );
}

/* Sets the current site */
function setSite(site_code){
    document.getElementById("theform").style.display = 'block';
    loadPreviousOperations();
    loadPreviousManagement();
    loadPreviousIpm();
    loadLonLat();
    loadNotes();
}

/* Sets the current year, simple enough */
function setYear(year){
    //console.log("setYear called "+ year);
    myYear = year;
    document.getElementById("foryear").innerHTML = year;
    document.getElementById("ipm_foryear").innerHTML = year;
    loadPreviousOperations();
    loadPreviousManagement();
    loadPreviousIpm();
    loadLonLat();
    loadNotes();
}

/* Reset the app */
function clearData(){
    document.getElementById("previousOperationEdit").style.display = 'none';
    document.getElementById("rowid").value = "0";
    document.getElementById("plant_hybrid").value = "";
    document.getElementById("plant_rate").value = "";
    document.getElementById("comments").value = "";
    for (var i=0; i < FERTELEM.length; i++){
        var elem = FERTELEM[i];
        document.getElementById(elem + "_rate").value = 0;
        document.getElementById(elem + "_rate_lbs").value = 0;
    }
    document.getElementById("submitbutton").value = "SUBMIT";
}

function clearIpmData(){
    document.getElementById("previousIpmOperationEdit").style.display = 'none';
    document.getElementById("ipm_rowid").value = "0";
    var ops = ['herbicide','insecticide','pesticide'];
    var fields = ['comments','justify', 'stage', 'reference'];
    for (var o=0; o < ops.length; o++){
       for (var f=0; f < fields.length; f++){
          var el = document.getElementById(ops[o]+"_"+fields[f]);
          if (el){ el.value = ""; }
       }
    }
    document.getElementById("ipm_submitbutton").value = "SUBMIT";
}

function clearManagementData(){
    document.getElementById("previousOperationEdit").style.display = 'none';
    document.getElementById("rowid").value = "0";
    document.getElementById("plant_hybrid").value = "";
    document.getElementById("plant_rate").value = "";
    document.getElementById("organic_amendments_text").value = "";
    document.getElementById("submitbutton2").value = "SUBMIT";
}

/* Return an operation entry for the given id */
function getIpmEntryByRowId(myrowid){
    for (var i=0, n=ipmEntry.length; i < n; i++) {
        var entry = ipmEntry[i];
        var tokens = entry.id.$t.split("/");
        var rowid = tokens[ tokens.length - 1];
        if (myrowid == rowid){ return entry; }
    }
    return null;
}

/* Return an operation entry for the given id */
function getOperationEntryByRowId(myrowid){
    for (var i=0, n=operationsEntry.length; i < n; i++) {
        var entry = operationsEntry[i];
        var tokens = entry.id.$t.split("/");
        var rowid = tokens[ tokens.length - 1];
        if (myrowid == rowid){ return entry; }
    }
    return null;
}

/* Delete a row from the database table */
function deleteRow(myrowid){
    var entry = getOperationEntryByRowId(myrowid);
    var url = entry.id.$t;
    function good(){ 
        loadPreviousOperations();
        alert("Row Deleted!"); 
    }
    function bad(error){
         alert(error);
    }
    service.setHeaders({"If-Match": "*"});
    service.deleteEntry(url, good, bad);
    service.setHeaders({"If-Match": null});
}

/* Delete a row from the database table */
function deleteIpmRow(myrowid){
    var entry = getIpmEntryByRowId(myrowid);
    var url = entry.id.$t;
    function good(){ 
        loadPreviousIpm();
        alert("Row Deleted!"); 
    }
    function bad(error){
         alert(error);
    }
    service.setHeaders({"If-Match": "*"});
    service.deleteEntry(url, good, bad);
    service.setHeaders({"If-Match": null});
}

/*
 * Edit a pre-existing IPM Entry!
 */
function editIpmRow(myrowid){
    document.getElementById("ipm_rowid").value = myrowid;
    document.getElementById("previousIpmOperationEdit").style.display = 'block';
    var entry = getIpmEntryByRowId(myrowid);
    var op = entry['gsx$operation'].$t;
    setIpmOperation(op);
    document.getElementById("ipm_operation").value = op;
    $("#ipm_datepicker").datepicker("setDate", entry.gsx$date.$t);
    document.getElementById(op+"_timing").value = entry['gsx$timing'].$t;
    document.getElementById(op+"_crop").value = entry['gsx$crop'].$t;
    document.getElementById(op+"_method").value = entry['gsx$method'].$t;
    document.getElementById(op+"_total_rate").value = entry['gsx$totalrate'].$t;
    $("#"+op+"_total_rate_units_lha").click();
    document.getElementById(op+"_pressure").value = entry['gsx$pressure'].$t;
    $("#"+op+"_pressure_units_kpa").click();
    document.getElementById(op+"_adjuvant").value = entry['gsx$adjuvant'].$t;
    document.getElementById(op+"_stage").value = entry['gsx$stage'].$t;
    document.getElementById(op+"_justify").value = entry['gsx$justify'].$t;
    document.getElementById(op+"_reference").value = entry['gsx$reference'].$t;
    document.getElementById(op+"_comments").value = entry['gsx$comments'].$t;
    for(var i=1;i<5;i++){
        if (i > 1 && op != 'herbicide'){ continue; }
        document.getElementById(op+"_product"+i).value = entry['gsx$product'+i].$t;
        document.getElementById(op+"_rate"+i).value = entry['gsx$rate'+i].$t;
        var ra = entry['gsx$rateunit'+i].$t;
        if (ra != null && ra != ""){
            $("#"+op+"_rate_units"+i+"a_"+ra).click();
            $("#"+op+"_rate_units"+i+"b_hectare").click();
        }
    }

    for(var i=1;i<11;i++){
       document.getElementById(op+"_target"+i).value = entry['gsx$target'+i].$t;
    }
    document.getElementById("ipm_submitbutton").value = "Save Edit of Previous Operation";
}

function modify_plant_rate(entry){
    /* Set the units for planting rate */
    var pru = entry.gsx$plantrateunits.$t;
    var pr = entry.gsx$plantrate.$t;
    if (pr != null && pr != ""){
      if (pru == 'seeds'){
        $("#plant_rate_units_acre").click();
        document.getElementById("plant_rate").value = parseFloat(pr) / 2.47105;
      } else if (pru == 'lbs'){
        $("#plant_rate_units_lbs").click();
        document.getElementById("plant_rate").value = parseFloat(pr);
      }
    }
}
function modify_tillage_depth(entry){
  var td = entry.gsx$tillagedepth.$t;
  if (td != null && td != ""){
    document.getElementById("tillage_depth").value = parseFloat(td) / 2.54;
    $("#tillage_depth_units_in").click();
  }
}
function modify_manure(entry){
    /* 
       1 gallons/acre = 9.353956 L/ha 
       1 L/ha = 0.1069066 gallons/acre
       1 T/acre =  2.2417400 Mg/ha
       1 Mg/ha = 0.4460821 T/acre
     */
    document.getElementById("manure_rate").value = entry.gsx$manurerate.$t;
    var mru = entry.gsx$manurerateunits.$t;
    if (mru != null && mru != ""){
       $('#manure_rate_units_'+mru).click();
    }
    document.getElementById("manure_type").value = entry.gsx$manuretype.$t;
}

/* Load up the data interface with a pre-existing row! */
function editOperationRow(myrowid){
    
    document.getElementById("previousOperationEdit").style.display = 'block';
    var entry = getOperationEntryByRowId(myrowid);
    /* Load up form based on this entry! */
    document.getElementById("comments").value = entry.gsx$comments.$t;
    document.getElementById("rowid").value = myrowid;
    document.getElementById("operation").value = entry.gsx$operation.$t;
    document.getElementById("plant_hybrid").value = entry.gsx$planthybrid.$t;

    modify_plant_rate(entry);
    modify_tillage_depth(entry);
    modify_manure(entry);

    document.getElementById("soiladmend_rate").value = entry.gsx$soiladmendrate.$t;
document.getElementById("soiladmend_current_ph").value = entry.gsx$currentph.$t;
document.getElementById("soiladmend_target_ph").value = entry.gsx$targetph.$t;
document.getElementById("soiladmend_neutral_index").value = entry.gsx$neutralindex.$t;
    

    document.getElementById("terminate_method").value = entry.gsx$terminatemethod.$t;
    setOperation(entry.gsx$operation.$t);
    $("#datepicker").datepicker("setDate", entry.gsx$date.$t);
    document.getElementById("foryear").innerHTML = entry.gsx$year.$t;
    document.getElementById("submitbutton").value = "Save Edit of Previous Operation";

    var pr = parseFloat(entry.gsx$productrate.$t);
    if (pr > 0){
      for (var i=0; i < FERTELEM.length; i++){
        var elem = FERTELEM[i];
        document.getElementById(elem + "_rate").value = entry['gsx$'+elem].$t;
      }
      document.getElementById("product_rate").value = parseFloat(entry.gsx$productrate.$t) / 1.12;
    }
    if (pr == -1){
      for (var i=0; i < FERTELEM.length; i++){
        var elem = FERTELEM[i];
        document.getElementById(elem + "_rate_lbs").value = entry['gsx$'+elem].$t;
      }
    }
}

/*
 * Load entries from the IPM worksheet on the managemnet spreadsheet
 */
function loadPreviousIpm(){
  url = 'https://spreadsheets.google.com/feeds/list/'+ man_sskey +'/3/private/full';
  var callback = function(response) {
      if (response.oauthApprovalUrl) {
      } else if (response.feed) {
          var sheetFeed = response.feed;
          ipmEntry = sheetFeed.entry;
          var prevIpmOpsUL = document.getElementById("previousIpmOperations");
          while(prevIpmOpsUL.hasChildNodes()){
              prevIpmOpsUL.removeChild(prevIpmOpsUL.childNodes[0]);
          }
          if (ipmEntry){
            for(var i=0, n=ipmEntry.length; i < n; i++) {
              var entry = ipmEntry[i];
              if (entry.gsx$year.$t == myYear  && entry.gsx$uniqueid.$t == document.getElementById("siteSelector").value){
                  var tokens = entry.id.$t.split("/");
                  var rowid = tokens[ tokens.length - 1];
                  var ipmdate = new Date(entry.gsx$date.$t);
                  txt = entry.gsx$date.$t +" "+ entry.gsx$operation.$t +" <a href='#' onClick='javascript: editIpmRow(\""+ rowid +"\");'>Edit</a> &nbsp; <a href='#' onClick='javascript: deleteIpmRow(\""+ rowid +"\");'>Delete</a> &nbsp; <a href='#' onClick='javascript: editIpmRow(\""+ rowid +"\");'>View</a>";
                  var li = document.createElement("li");
                  li.setAttribute("opdate", entry.gsx$date.$t);
                  li.innerHTML = txt;
                  if (prevIpmOpsUL.children.length == 0){
                     prevIpmOpsUL.appendChild(li);
                  } else {
                    var placed = false;
                    for (var c=0; c < prevIpmOpsUL.children.length; c++){
                      var ldate = new Date(prevIpmOpsUL.children[c].getAttribute("opdate"));
                      if (ipmdate < ldate){
                         prevIpmOpsUL.insertBefore(li, prevIpmOpsUL.children[c]);
                         placed = true;
                         break;
                      }
                    }
                    if (! placed){
                      prevIpmOpsUL.appendChild(li);
                    }
                 }
              }
            }
          }
          if (prevIpmOpsUL.children.length == 0){
              var li = document.createElement("li");
              li.innerHTML = 'No IPM operations found...';
              prevIpmOpsUL.appendChild(li);
          }
      } else {
            var main = document.getElementById('main');
            var err = document.createTextNode('Something went wrong');
            main.appendChild(err);
            showOneSection('main');
      }
  };
  service = new google.gdata.client.GoogleService('testapp');
  service.useOAuth('google');
  service.getFeed(url, callback, callback);
}


function loadPreviousManagement(){
  url = 'https://spreadsheets.google.com/feeds/list/'+ man_sskey +'/2/private/full';
  var callback = function(response) {
      if (response.oauthApprovalUrl) {
      } else if (response.feed) {
          var sheetFeed = response.feed;
          managementEntry = sheetFeed.entry;
          if (managementEntry){
          for(var i=0, n=managementEntry.length; i < n; i++) {
              var entry = managementEntry[i];
              if (entry.gsx$year.$t == myYear  && entry.gsx$uniqueid.$t == document.getElementById("siteSelector").value){
                  /* Assign form values based on this entry */
                 //document.getElementById("cover_crop").value = entry.gsx$covercrop.$t;
document.getElementById("lime_year").value = entry.gsx$limeyear.$t;
                 document.getElementById("residue_vary").value = entry.gsx$residuevary.$t;
                 document.getElementById("residue_type").value = entry.gsx$residuetype.$t;
                 $( "#residue_removed_slider" ).slider("value", entry.gsx$residueremovalpercentage.$t);
                 $( "#residue_planting_slider" ).slider("value", entry.gsx$residueplantingpercentage.$t);
                 $( "#residue_planting" ).val( entry.gsx$residueplantingpercentage.$t +" %");
$( "#residue_removed" ).val( entry.gsx$residueremovalpercentage.$t +" %");
                
                 //document.getElementById("manure_rate").value = entry.gsx$manurerate.$t;          
//document.getElementById("manure_rate_units").value = entry.gsx$manurerateunits.$t;
                 //document.getElementById("manure_type").value = entry.gsx$manuretype.$t;
                //document.getElementById("lime").value = entry.gsx$lime.$t;
                 document.getElementById("organic_amendments").value = entry.gsx$organicamendments.$t;
                 document.getElementById("organic_amendments_text").value = entry.gsx$organicamendmentstext.$t;
document.getElementById("irrigation").value = entry.gsx$irrigation.$t;
var ia = entry.gsx$irrigationamount.$t;
if (ia != null && ia != ""){
  document.getElementById("irrigation_amount").value = parseFloat(ia) / 2.54;
  $("#irrigation_units_in").click();
}
document.getElementById("irrigation_method").value = entry.gsx$irrigationmethod.$t;

              }
          }}
      } else {
            var main = document.getElementById('main');
            var err = document.createTextNode('Something went wrong');
            main.appendChild(err);
            showOneSection('main');
      }
  };
  service = new google.gdata.client.GoogleService('testapp');
  service.useOAuth('google');
  service.getFeed(url, callback, callback);
}

function loadPreviousOperations(){
  url = 'https://spreadsheets.google.com/feeds/list/'+ man_sskey +'/1/private/full';
  var callback = function(response) {
      if (response.oauthApprovalUrl) {
      } else if (response.feed) {
          var sheetFeed = response.feed;
          operationsEntry = sheetFeed.entry;
          var prevOpsUL = document.getElementById("previousOperations");
          while(prevOpsUL.hasChildNodes()){
              prevOpsUL.removeChild(prevOpsUL.childNodes[0]);
          }
          if (operationsEntry){
            for(var i=0, n=operationsEntry.length; i < n; i++) {
              var entry = operationsEntry[i];
              if (entry.gsx$year.$t == myYear  && entry.gsx$uniqueid.$t == document.getElementById("siteSelector").value){
                  var tokens = entry.id.$t.split("/");
                  var opdate = new Date(entry.gsx$date.$t);
                  var rowid = tokens[ tokens.length - 1];
                  txt = entry.gsx$date.$t +" "+ entry.gsx$operation.$t +" <a href='#' onClick='javascript: editOperationRow(\""+ rowid +"\");'>Edit</a> &nbsp; <a href='#' onClick='javascript: deleteRow(\""+ rowid +"\");'>Delete</a> &nbsp; <a href='#' onClick='javascript: editOperationRow(\""+ rowid +"\");'>View</a>";
                  var li = document.createElement("li");
                  li.setAttribute("opdate", entry.gsx$date.$t);
                  li.innerHTML = txt;
                  if (prevOpsUL.children.length == 0){
                     prevOpsUL.appendChild(li);
                  } else {
                    var placed = false;
                    for (var c=0; c < prevOpsUL.children.length; c++){
                      var ldate = new Date(prevOpsUL.children[c].getAttribute("opdate"));
                      if (opdate < ldate){
                         prevOpsUL.insertBefore(li, prevOpsUL.children[c]);
                         placed = true;
                         break;
                      }
                    }
                    if (! placed){
                      prevOpsUL.appendChild(li);
                    }
                  }
              }
            }
          }
          if (prevOpsUL.children.length == 0){
              var li = document.createElement("li");
              li.innerHTML = 'No management operations found...';
              prevOpsUL.appendChild(li);
          }
      } else {
            var main = document.getElementById('main');
            var err = document.createTextNode('Something went wrong');
            main.appendChild(err);
            showOneSection('main');
      }
  };
  service = new google.gdata.client.GoogleService('testapp');
  service.useOAuth('google');
  service.getFeed(url, callback, callback);
}

function showOneIpmOperation(toshow) {
    var sections = [ 'herbicide', 'insecticide', 'fungicide' ];
    for (var i=0; i < sections.length; ++i) {
        var s = sections[i];
        var el = document.getElementById(s+"_options");
        if (s === toshow) {
            el.style.display = "block";
        } else {
            el.style.display = "none";
        }
    }
}

function showOneOperation(toshow, subtype) {
    var sections = [ 'plant', 'harvest', 'tillage', 
        'fertilizer', 'soiladmend', 'manure','termination'];
    var sectionLabels = [ 'Planting Date:', 'Harvest Date:', 'Tillage Date:', 
        'Fertilizer Date:', 'Lime Application Date:', 'Manure Application Date:', 'Termination Date'];
    for (var i=0; i < sections.length; ++i) {
        var s = sections[i];
        var el = document.getElementById(s+"_options");
        if (s === toshow) {
            document.getElementById("operation_label").innerHTML = sectionLabels[i];
            
            el.style.display = "block";
        } else {
            el.style.display = "none";
        }
    }
}

      function showOneSection(toshow) {
        var sections = [ 'loading', 'main', 'approval', 'waiting' ];
        for (var i=0; i < sections.length; ++i) {
          var s = sections[i];
          var el = document.getElementById(s);
          if (s === toshow) {
            el.style.display = "block";
          } else {
            el.style.display = "none";
          }
        }
      }

/*
 * Called from clicking on the save data button
 */
function saveIpmData(){
    var operation = document.getElementById("ipm_operation").value;
    if (operation == 'invalid'){
       alert("Please select a valid IPM Operation");
       return;
    }

    if (document.getElementById("ipm_rowid").value != "0"){ 
        var myrowid = document.getElementById("ipm_rowid").value;
        entry = getIpmEntryByRowId(myrowid);
        url = entry.id.$t;
     } else {
      url = 'https://spreadsheets.google.com/feeds/list/'+ man_sskey +'/3/private/full';
      entry = {xmlns: "http://www.w3.org/2005/Atom", 
         xmlns$gsx: "http://schemas.google.com/spreadsheets/2006/extended"};
      }
    entry['gsx$uniqueid'] = {$t:document.getElementById("siteSelector").value};
    entry['gsx$year'] = {$t:myYear};
    entry['gsx$operation'] = {$t: operation};
    for(var i=1;i<5;i++){  
        if (i > 1 && operation != 'herbicide'){ continue; }  
        entry['gsx$product'+i] = {$t: document.getElementById(operation+"_product"+i).value};
        var rate = parseFloat(document.getElementById(operation+"_rate"+i).value);
        
        var units = $('#'+operation+'_rate_units'+i+'a :radio:checked')[0].value;
        entry['gsx$rateunit'+i] = {$t: units};
        var units2 = $('#'+operation+'_rate_units'+i+'b :radio:checked')[0].value;
        if (units2 == 'acre'){ rate = rate * 2.47105; }
        entry['gsx$rate'+i] = {$t: rate};
    }
    entry['gsx$crop'] = {$t: document.getElementById(operation+"_crop").value};

    var units = $('#'+operation+'_total_rate_units :radio:checked')[0].value;
    var rate = parseFloat(document.getElementById(operation+"_total_rate").value);
    if (units == 'gpa'){ rate = rate * 9.3539; }
    entry['gsx$totalrate'] = {$t: rate};

    var units = $('#'+operation+'_pressure_units :radio:checked')[0].value;
    var rate = parseFloat(document.getElementById(operation+"_pressure").value);
    if (units == 'psi'){ rate = rate * 6.89475; }
    entry['gsx$pressure'] = {$t: rate};

entry['gsx$adjuvant'] = {$t: document.getElementById(operation+"_adjuvant").value};
    entry['gsx$method'] = {$t: document.getElementById(operation+"_method").value};
    entry['gsx$timing'] = {$t: document.getElementById(operation+"_timing").value};
    entry['gsx$stage'] = {$t: document.getElementById(operation+"_stage").value};
    entry['gsx$justify'] = {$t: document.getElementById(operation+"_justify").value};
    entry['gsx$reference'] = {$t: document.getElementById(operation+"_reference").value}; 
    entry['gsx$comments'] = {$t: document.getElementById(operation+"_comments").value};
    for(var i=1;i<11;i++){
       entry["gsx$target"+i] = {$t: document.getElementById(operation+"_target"+i).value};
    }
    entry['gsx$date'] = {$t:
  $.datepicker.formatDate("yy/mm/dd", $("#ipm_datepicker").datepicker("getDate"))};

    function good(entry){
        alert('IPM Entry was saved!');
        loadPreviousIpm();
    }
    function bad(error){
        alert(error);
    }
      if (document.getElementById("ipm_rowid").value != "0"){
          service.setHeaders({"If-Match": "*"});
          service.updateEntry(entry.id.$t, entry, good, bad);
          service.setHeaders({"If-Match": null});
    } else {
          service.insertEntry(url, entry, good, bad);
    }
}

function saveManagementData(){
    var foundEntry = null;
    if (managementEntry){
    for(var i=0, n=managementEntry.length; i < n; i++) {
        var entry = managementEntry[i];
        if (entry.gsx$year.$t == myYear  && entry.gsx$uniqueid.$t == document.getElementById("siteSelector").value){
           foundEntry = entry;
        }
    }}
    var url = 'https://spreadsheets.google.com/feeds/list/'+ man_sskey +'/2/private/full';
    if (foundEntry){
      entry = foundEntry;
    } else {
      entry = {xmlns: "http://www.w3.org/2005/Atom", 
         xmlns$gsx: "http://schemas.google.com/spreadsheets/2006/extended"};
      entry['gsx$uniqueid'] = {$t:document.getElementById("siteSelector").value};
      entry['gsx$year'] = {$t:myYear};
    }
    entry['gsx$residueremoval'] = {$t:document.getElementById("residue_removal").value};
    entry['gsx$residuehow'] = {$t:document.getElementById("residue_how").value};
    entry['gsx$residuetype'] = {$t:document.getElementById("residue_type").value};
    entry['gsx$residuevary'] = {$t:document.getElementById("residue_vary").value};
    //entry['gsx$covercrop'] = {$t:document.getElementById("cover_crop").value};
    entry['gsx$limeyear'] = {$t:document.getElementById("lime_year").value};
    entry['gsx$residueremovalpercentage'] = {$t: $( "#residue_removed_slider" ).slider("value")};
    entry['gsx$residueplantingpercentage'] = {$t: $( "#residue_planting_slider" ).slider("value")}; 
    entry['gsx$organicamendments'] = {$t:document.getElementById("organic_amendments").value};
    entry['gsx$organicamendmentstext'] = {$t:document.getElementById("organic_amendments_text").value};

    entry['gsx$irrigation'] = {$t:document.getElementById("irrigation").value};
    var depth = parseInt(document.getElementById("irrigation_amount").value);
    if (depth > 0){
       var units = $('#irrigation_units :radio:checked')[0].value;
       if (units == 'in'){ depth = depth * 2.54; }
       entry['gsx$irrigationamount'] = {$t:depth};
    }
    entry['gsx$irrigationmethod'] = {$t:document.getElementById("irrigation_method").value};

    function good(entry){
        alert('Management Entry was saved!');
        loadPreviousManagement();
    }
    function bad(error){
        alert(error);
    }
    if (foundEntry != null){
          service.setHeaders({"If-Match": "*"});
          service.updateEntry(entry.id.$t, entry, good, bad);
          service.setHeaders({"If-Match": null});
      } else {
          service.insertEntry(url, entry, good, bad);
      }
}

function saveOperationData(){
    if (document.getElementById("operation").value == "invalid"){
        alert("Invalid Operation Selected");
        return;
    }
  
    document.getElementById("previousOperationEdit").style.display = 'none';
    var entry;
    var url;
    if (document.getElementById("rowid").value != "0"){ 
        var myrowid = document.getElementById("rowid").value;
        entry = getOperationEntryByRowId(myrowid);
        url = entry.id.$t;
     } else {
      url = 'https://spreadsheets.google.com/feeds/list/'+ man_sskey +'/1/private/full';
      entry = {xmlns: "http://www.w3.org/2005/Atom", 
         xmlns$gsx: "http://schemas.google.com/spreadsheets/2006/extended"};
      }
      var operation = document.getElementById("operation").value;
      if (operation == 'invalid'){
          alert("Invalid Operation Selected");
          return;
      }
      var optokens = operation.split("_");
      //console.log(optokens[0]);
      if (optokens[0] == "plant"){ 
          var prate = document.getElementById("plant_rate").value;
          prate = parseInt( prate.replace(',','') );
          var units = $('#plant_rate_units :radio:checked')[0].value;
          if (units == 'acre' || units == 'lbs'){ 
             prate = prate * 2.47105; 
          }
          if (units == 'lbs'){
             entry['gsx$plantrateunits'] = {$t: 'kg'};
          } else {
             entry['gsx$plantrateunits'] = {$t: 'seeds'};
          }
          entry['gsx$plantrate'] = {$t: prate};

          entry['gsx$planthybrid'] = {$t: document.getElementById("plant_hybrid").value};
          
      }
      if (optokens[0] == "harvest"){ 
          
      }
      if (optokens[0] == "terminate"){ 
          entry['gsx$terminatemethod'] = {$t: document.getElementById("terminate_method").value};
      }
      if (optokens[0] == "tillage"){
          var depth = parseInt(document.getElementById("tillage_depth").value);
          //console.log("Tillage Depth:"+ depth);
          if (depth > 0){
            var units = $('#tillage_depth_units :radio:checked')[0].value;
            if (units == 'in'){ depth = depth * 2.54; }
            entry['gsx$tillagedepth'] = {$t:depth};
          }
      }
      if (optokens[0] == "soiladmend"){
          var fertrate = parseFloat(document.getElementById("soiladmend_rate").value);
          if (fertrate > 0){
            var units = $('#soiladmend_rate_units :radio:checked')[0].value;
            // Mg per hectre or tons per acre
            if (units == 'acre'){ fertrate = fertrate / 0.446089; }
            entry['gsx$soiladmendrate'] = {$t:fertrate};
          }
          entry['gsx$currentph'] = document.getElementById("soiladmend_current_ph").value;
          entry['gsx$targetph'] = document.getElementById("soiladmend_target_ph").value;
          entry['gsx$neutralindex'] = document.getElementById("soiladmend_neutral_index").value;

      }
      if (optokens[0] == "manure"){
          var manure_rate = parseFloat(document.getElementById("manure_rate").value);
            entry['gsx$manuretype'] = {$t:document.getElementById("manure_type").value};
          if (manure_rate > 0){
            var units = $('#manure_rate_units :radio:checked')[0].value;
            // TODO
            if (units == 'gpa'){ manure_rate = manure_rate * 1; }
            if (units == 'tpa'){ manure_rate = manure_rate * 1; }
            if (units == 'lph'){ manure_rate = manure_rate * 1; }
            if (units == 'mgph'){ manure_rate = manure_rate * 1; }
            entry['gsx$manurerate'] = {$t:manure_rate};
            entry['gsx$manurerateunits'] = {$t:units};
            for (var i=0; i < MANURE_ELEM.length; ++i) {
               var elem = MANURE_ELEM[i];
               var rate = parseFloat(document.getElementById("manure_"+elem+"_rate").value);
               if (rate >= 0){
                 entry['gsx$'+ elem] = {$t:rate};
               }
             }
          }
      }
      if (optokens[0] == "fertilizer"){
         /* Two options here, need to be clever... */
         var prate_text = document.getElementById("product_rate").value;
         var prodrate = parseFloat(document.getElementById("product_rate").value) * 1.12; 
         var fieldappend = '';       
         if (prate_text != ""){
           if (prodrate < 1 || prodrate > 1000){
             alert("Error, product rate outside of bounds 1-1000");
             return;
           }
         } else {
           prodrate = -1;
           fieldappend = '_lbs';
         }
         entry['gsx$productrate'] = {$t:prodrate};

         for (var i=0; i < FERTELEM.length; ++i) {
           var elem = FERTELEM[i];
           var rate = parseFloat(document.getElementById(elem+"_rate"+fieldappend).value);
           if (rate >= 0){
             entry['gsx$'+ elem] = {$t:rate};
           }
         }
      }
      entry['gsx$uniqueid'] = {$t:document.getElementById("siteSelector").value};
      entry['gsx$operation'] = {$t:operation};
      entry['gsx$year'] = {$t:myYear};
      entry['gsx$comments'] = {$t: document.getElementById("comments").value};
      entry['gsx$date'] = {$t:
  $.datepicker.formatDate("yy/mm/dd", $("#datepicker").datepicker("getDate"))};
      //console.log(entry);
      function good(entry){
        alert('Entry was saved!');
        loadPreviousOperations();
      }
      function bad(error){
         alert(error);
      }
      if (document.getElementById("rowid").value != "0"){
          service.setHeaders({"If-Match": "*"});
          service.updateEntry(url,entry, good, bad);
          service.setHeaders({"If-Match": null});
      } else {
          service.insertEntry(url,entry, good, bad);
      }
  }

  function adjustSiteSelector(){
     var el = document.getElementById('siteSelector');

     for (i=0;i<sites.length;i++){
       var opt = document.createElement("option");
       opt.text = sites[i];
       opt.value = sitekeys[i];
       el.options.add(opt);
     }


  }
  
/*
 * Called with the results of the Site Metadata & History Form
 */
function showResults(result){
    var sheetFeed = result.feed;
    var list = sheetFeed.entry;
    for(var i=0, n=list.length; i < n; i++) {
       var entry = list[i];
       //console.log(entry);
       sites.push(entry.gsx$uniqueid.$t +": "+ entry.gsx$leadpi.$t );
       sitekeys.push(entry.gsx$uniqueid.$t);
    }
    adjustSiteSelector();
    var today = new Date();
    setYear( today.getFullYear() ); 
    setOperation("plant_corn");
    setIpmOperation("herbicide");
  }

/* Called once google has all our apis loaded! */
function bootstrap(){
    $( "#tabs" ).tabs();
    $( "#residue_removed_slider" ).slider({
      value:0,
      min: 0,
      max: 100,
      step: 5,
      slide: function( event, ui ) {
        $( "#residue_removed" ).val( ui.value +" %");
      }
    });
     $( "#residue_planting_slider" ).slider({
      value:100,
      min: 0,
      max: 100,
      step: 5,
      slide: function( event, ui ) {
        $( "#residue_planting" ).val( ui.value +" %");
      }
    });
   $( "#amount" ).val( "$" + $( "#slider" ).slider( "value" ) );
    var today = new Date();
    $( "#datepicker" ).datepicker();
    $( "#datepicker" ).datepicker('setDate', today);
    $( "#ipm_datepicker" ).datepicker();
    $( "#ipm_datepicker" ).datepicker('setDate', today);
    $("#years").buttonset();
    $('#years input[type=radio]').change(function() {
       setYear(this.value);  
    });
    $("#tillage_depth_units").buttonset();
    $("#plant_rate_units").buttonset();
    $("#irrigation_units").buttonset();
    $("#herbicide_total_rate_units").buttonset();
    $("#insecticide_total_rate_units").buttonset();
    $("#fungicide_total_rate_units").buttonset();
    $("#herbicide_pressure_units").buttonset();
    $("#insecticide_pressure_units").buttonset();
    $("#fungicide_pressure_units").buttonset();
    $("#herbicide_rate_units1a").buttonset();
    $("#herbicide_rate_units2a").buttonset();
    $("#herbicide_rate_units3a").buttonset();
    $("#herbicide_rate_units4a").buttonset();
    $("#herbicide_rate_units1b").buttonset(); 
    $("#herbicide_rate_units2b").buttonset();
    $("#herbicide_rate_units3b").buttonset();
    $("#herbicide_rate_units4b").buttonset();
    //$("#pesticide_rate_units1").buttonset();
    $("#insecticide_rate_units1a").buttonset();
    $("#insecticide_rate_units1b").buttonset();
    $("#fungicide_rate_units1a").buttonset();
    $("#fungicide_rate_units1b").buttonset();

    $("#soiladmend_rate_units").buttonset();
    $("#manure_rate_units").buttonset();
    url = 'https://spreadsheets.google.com/feeds/list/'+site_sskey+'/1/private/full';
    var callback = function(response) {
          if (response.oauthApprovalUrl) {
            var personalize = document.getElementById('personalize');
            personalize.href = response.oauthApprovalUrl;
            showOneSection('approval');
          } else if (response.feed) {
            showOneSection('main');
            SITES_FEED = response.feed;
            showResults(response);
          } else {
            var main = document.getElementById('main');
            var err = document.createTextNode('Something went wrong');
            main.appendChild(err);
            showOneSection('main');
          }
        };
        service = new google.gdata.client.GoogleService('testapp');
        service.useOAuth('google');
        service.getFeed(url, callback, callback);

  }

/* called after gadgets are ready, now we need more apis */
function myinit(){
    google.load("gdata", "2.x");
    google.load("jquery", "1.7.1");
    google.load("jqueryui", "1.8.16");
    google.setOnLoadCallback(bootstrap);

}

/* Wait until google gadgets is fired up */
gadgets.util.registerOnLoadHandler(myinit);
