<?php
include('heade.php');
include('conn.php');

$req=file_get_contents("php://input");
$data=json_decode($req);

$sdate=$data->sdate;
$edate=$data->edate;



$start_date = date("Y-m-d", strtotime($sdate));
$end_date = date("Y-m-d", strtotime($edate));

$sql = "SELECT * FROM loan WHERE date > '$start_date' AND date < '$end_date'";
$res=mysqli_query($conn,$sql);


try{
$loans=array();

if(mysqli_num_rows($res)>0){
    while ($row = mysqli_fetch_assoc($res)) {
        $inv_id = $row['investor_id'];
        $bor_id = $row['user_id'];

        if (!empty($inv_id) && !empty($bor_id)) {
            $sql1 = "select username as iname from authentication where user_id=$inv_id";
            $sql2 = "select username as bname from authentication where user_id=$bor_id";

            $res1 = mysqli_query($conn, $sql1);
            $res2 = mysqli_query($conn, $sql2);

            if (mysqli_num_rows($res1) > 0 && mysqli_num_rows($res2) > 0) {
                $row1 = mysqli_fetch_assoc($res1);
                $row2 = mysqli_fetch_assoc($res2);

                $combinedRow = array_merge($row, $row1, $row2);
                $loans[] = $combinedRow;
            }
        } else {
            // Add row directly if `investor_id` or `user_id` is empty
            $sql2 = "select username as bname from authentication where user_id=$bor_id";
            $res2 = mysqli_query($conn, $sql2);

            if(mysqli_num_rows($res2)>0){
                $row2=mysqli_fetch_assoc($res2);

                $combRow=array_merge($row,$row2);
            }
            $loans[] = $combRow;
        }
    }
    echo json_encode($loans);
}else{
    echo "zero";
}}catch(Exception $e){
    echo $e;
}
?>