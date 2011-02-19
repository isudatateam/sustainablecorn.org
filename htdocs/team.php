<?php
/*
 * Created on Jan 12, 2011
 *
 * Lists out information about project team members
 */
 include("../config/settings.inc.php");
 $dbconn = pg_connect(DBCONNSTR);
 
 $rs = pg_query($dbconn, "SELECT * from people ORDER by role, lname ASC");
 
 include(ROOTPATH."/include/header.php");

?>

<table id="main" cellspacing="0">

<tr>
<td  id="a2" rowspan="2" valign="top">
<?php include(ROOTPATH."/include/side.php"); ?>

</td>

<!-- 2ND COLUMN -->
<td id="b2">
<div class="maintext">
<img src="images/team-110210.jpg" />
<br />Photo taken 10 Feb 2011 of available team members during meeting in Chicago.
<?php
echo "<h3>Project Team</h3>";
echo "<table cellpadding=\"2\" cellspacing=\"0\" border=\"1\" id=\"people\">" .
		"<thead><tr><th>Name</th>" .
		"<th>Affiliation</th></tr></thead>";
echo "<tbody>";
for($i=0;$row=@pg_fetch_array($rs,$i);$i++){
	$special = '';
	if ( $row["role"] == 1 ){ $special = " , project director";}
	echo sprintf("<tr><td><a href=\"mailto:%s\">%s %s</a>%s</td><td>%s</td></tr>", $row["email"],
		$row["fname"], $row["lname"], $special, $row["affiliation"] );
	
}
echo "</tbody>";
echo "</table>";
?>
</div>
</td>


</tr>
</table>
<?php
 include(ROOTPATH."/include/footer.php");
?>
