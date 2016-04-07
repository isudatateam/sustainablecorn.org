<?php
$f = isset($_GET["f"]) ? htmlentities($_GET["f"]) : null;
function endsWith($haystack, $needle) {
    // search forward starting from end minus needle length characters
    return $needle === "" || strpos($haystack, $needle, strlen($haystack) - strlen($needle)) !== FALSE;
}

if (isset($_GET["d"])){
  header("Content-type: application/pdf");
  if (endsWith($f, ".pdf")){
    die(file_get_contents($f));
  }
  die();
}
if (isset($_SERVER["PATH_INFO"])){
  header("Content-type: application/pdf");
  $f = $_SERVER["PATH_INFO"];
  if (endsWith($f, ".pdf")){
    die(file_get_contents(".".$f));
  }
  die();
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml"><!-- InstanceBegin template="/Templates/insidetest3.dwt" codeOutsideHTMLIsLocked="false" -->
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<!-- InstanceBeginEditable name="doctitle" -->
<title>Sustainablecorn.org</title>
<!-- InstanceEndEditable -->
<link rel="stylesheet" type="text/css" href="/styles/style2.css" />
<!--[if lte IE 6]>
<link rel="stylesheet" type="text/css" href="/styles/style-ie.css" />
<![endif]-->
<meta name="description" content="Homepage for sustainablecorn.org." />
<meta name="keywords" content="sustainablecorn" />
<meta name="keywords" content="corn, sustainable agriculture, corn research" />
<script language="javascript" type="text/javascript" src="/js/jq.js"></script>
<script language="javascript" type="text/javascript" src="/js/jq.cycle.js"></script>
<script language="javascript" type="text/javascript" src="/js/global.js"></script>
<script src="/SpryAssets/SpryMenuBar.js" type="text/javascript"></script>
<!-- InstanceBeginEditable name="head" --><!-- InstanceEndEditable -->
<script type="text/javascript">

   var _gaq = _gaq || [];
   _gaq.push(['_setAccount', 'UA-784549-4']);
   _gaq.push(['_trackPageview']);

   (function() {
     var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
     ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 
'http://www') + '.google-analytics.com/ga.js';
     var s = document.getElementsByTagName('script')[0];
s.parentNode.insertBefore(ga, s);
   })();

</script>
<link href="/SpryAssets/SpryMenuBarHorizontal.css" rel="stylesheet" type="text/css" />
</head>

<body>
<div id="container">
	<div id="header"><a href="/index.html"><img src="/img/headerlogo.jpg" width="1080" height="219"/ border="0"></a></div>
    <div></div>
    
<div id="left_col">
		<div id="fast_clicks">
<h2 align="left">&nbsp;</h2>
<p align="left">&nbsp;</p>
<h2 align="left"><a href="/conf-pages/2014NationalConference.html">Resilient Agriculture Conference</a></h2>
<br />
<h2 align="left">In-field Management</h2>
<p align="left" id="leftsubnav"><a href="/In_Field_Management/Extended_crop_rotations.html">Extended Crop Rotations</a><br />
  <a href="/In_Field_Management/cover_crops.html">Cover Crops</a><br />
  <a href="/In_Field_Management/tillage_management.html">Tillage Management</a><br />
  <a href="/In_Field_Management/drainage_water_management.html">Drainage Water Management</a><br />
  <a href="/In_Field_Management/nitrogen_management.html">Nitrogen Management</a><br />
  <a href="/In_Field_Management/landscape.html">Landscape</a><br />
  <a href="/In_Field_Management/integrated_pest_management.html">Integrated Pest Management</a><br />
  <a href="/In_Field_Management/organic.html">Organic</a><br /></p>
<h2 align="left"><a href="/What_Farmers_are_Saying/Index.html">What Farmers are Saying</a></h2>
<p align="left" id="leftsubnav"><a href="/What_Farmers_are_Saying/Farmer_Survey.html">Farmer Survey</a>
<h2 align="left">Weather &amp; Agriculture</h2>
<p align="left" id="leftsubnav"><a href="/Weather-and-Ag/Climate-Facts.html">Climate Facts</a><br />
  <a href="/Weather-and-Ag/Midwest-Climate-Information.html">State &amp; Regional Climate Information</a><br />
  <a href="/Weather-and-Ag/Weather-Outlook_Current-Conditions.html">Weather Outlook &amp; Current Conditions
  </a></p>
<h2 align="left"><a href="/About-Project/Extension_Farmers.html">Project Outreach to Farmers</a></h2>
<br />
<h2><a href="https://sites.google.com/site/sustainablecorn/" target="_blank">Internal Log-In</a></h2><br />
<p><a href="https://twitter.com/sustainablecorn"><img src="/img/Twitter.png" width="67" height="67" alt="Find-us-on-Twitter" />Find us on Twitter</a></p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<h2>&nbsp;</h2>
</div>
</div>
<div id="sprynav"> 
  <ul id="MenuBar1" class="MenuBarHorizontal">
    <li>
      <div align="center"><a href="http://www.sustainablecorn.org/">Home</a>        </div>
    </li>
    <li>
      <div align="center"><a href="#" class="MenuBarItemSubmenu">About</a>
        <ul>
          <li><a href="/About-Project/Index.html">The Project</a></li>
          <li><a href="/About-People/Index.html">The People</a></li>
        </ul>
      </div>
    </li>
    <li>
      <div align="center"><a href="#" class="MenuBarItemSubmenu">News</a>
        <ul>
          <li><a href="/news/Project-News.html">Project News</a></li>
          <li><a href="/news/Related-Stories.html">Related News</a></li>
          <li><a href="/news/Press-Room.html">Press</a></li>
        </ul>
      </div>
    </li>
    <li>
      <div align="center"><a href="/Videos/Index.html">Videos</a></div>
    </li>
    <li>
      <div align="center"><a href="#" class="MenuBarItemSubmenu">Publications</a>
        <ul>
          <li><a href="/Publications/Fact_Sheets.html">Fact Sheets</a></li>
          <li><a href="/Publications/Posters.html">Posters</a></li>
          <li><a href="/Publications/Peer-reviewed_Publications.html">Peer-reviewed Publications</a></li>
          <li><a href="/Publications/Research_Summaries.html">Research Summaries</a></li>
        </ul>
      </div>
    </li>
    <li>
      <div align="center"><a href="/resources/Index.html">Resources</a></div>
    </li>
    <li>
      <div align="center"><a href="/Contact/Index.html">Contact</a></div>
    </li>
  </ul>
</div>
<div id="right_col"><!-- InstanceBeginEditable name="EditRegion3" -->
  <div id="maincontentleft"><br />
    <h3>View PDF (<?php echo $f;?>)</h3>

    <p>Having trouble viewing this PDF below? Here is a direct link to <a href="/PDF_download.php/<?php echo $f;?>">download the PDF</a>.</p>

    <iframe src="/PDF_download.php?f=<?php echo $f;?>&d=true" width="800px" height="600px" >
</iframe>
  </div>
<div class="clear">
  <div align="center">SUSTAINABLECORN.ORG    | <a href="mailto:lynnlaws@iastate.edu">Website Administrator</a><br />
This material is based upon work that is supported by the National Institute of Food and<br />
Agriculture, U.S. Department of Agriculture, under award number 2011-68002-30190<br />
Any opinions, findings, conclusions, or recommendations expressed on this website are those of the author(s)<br />
and do not necessarily reflect the view of the U.S. Department of Agriculture.
</div>
</div>
</div>
</div>
<script type="text/javascript">
var MenuBar1 = new Spry.Widget.MenuBar("MenuBar1", {imgDown:"/SpryAssets/SpryMenuBarDownHover.gif", imgRight:"/SpryAssets/SpryMenuBarRightHover.gif"});
</script>
</body>
<!-- InstanceEnd --></html>
