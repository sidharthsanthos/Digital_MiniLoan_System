<?php
include('heade.php');
include('conn.php');

$sql="SELECT * FROM loan ORDER BY last_updated_date DESC LIMIT 1";
$res=mysqli_query($conn,$sql);
$row=mysqli_fetch_assoc($res);
$last=$row['last_updated_date'];
$last=new DateTime($last);
$flast=$last->format('d-m-Y');

echo json_encode(["last" => $flast]);


?>