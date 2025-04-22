<?php
include('heade.php');
include('conn.php');

$req = file_get_contents("php://input");
$data = json_decode($req);

$user_id=$data->uid;

$sql="select * from Loan where user_id=$user_id";
$res=mysqli_query($conn,$sql);

$llist=array();

if(mysqli_num_rows($res)>0){
    while($row=mysqli_fetch_assoc($res)){
        //$llist[]=$row;
        $inv_id=$row['investor_id'];
        if (!empty($inv_id)) {
            $sql1 = "select username, phone_number FROM authentication WHERE user_id = $inv_id";
            $res1 = mysqli_query($conn, $sql1);

            if (mysqli_num_rows($res1) > 0) {
                $row1 = mysqli_fetch_assoc($res1);

                // Merge $row and $row1
                $combinedRow = array_merge($row, $row1);
                $llist[] = $combinedRow;
            }
        }else{
            $llist[]=$row;
        }           
    }
    echo json_encode($llist);
}else{
    echo "zero";
}
?>