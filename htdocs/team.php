<?php
/*
 * Created on Jan 12, 2011
 *
 * Lists out information about project team members
 */
 include("../config/settings.inc.php");
 $dbconn = pg_connect(DBCONNSTR);
 
 $rs = pg_query($dbconn, "SELECT * from people ORDER by lname ASC");
 
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
<?php
echo "<h3>Project Team</h3>";
echo "<table cellpadding=\"2\" cellspacing=\"0\" border=\"1\" id=\"people\">" .
		"<thead><tr><th>Name</th>" .
		"<th>Affiliation</th></tr></thead>";
echo "<tbody>";
for($i=0;$row=@pg_fetch_array($rs,$i);$i++){
	echo sprintf("<tr><td><a href=\"mailto:%s\">%s %s</td><td>%s</td></tr>", $row["email"],
		$row["fname"], $row["lname"], $row["affiliation"] );
	
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
