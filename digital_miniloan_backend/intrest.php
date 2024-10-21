<?php
include('conn.php');

$sql="select * from loan where status='approved'";
$res=mysqli_query($conn,$sql);

if(mysqli_num_rows($res)>0){
    while($row=mysqli_fetch_assoc($res)){
        $amt=$row['Amount'];
        $intrest=$row['intrest_rate'];
        $last=$row['last_updated_date'];
        $due=$row['due_date'];
        $rid=$row['req_id'];

        $today=date('Y-m-d');

        if($last!='0000-00-00'){
            $amt_int=($amt*$intrest)/100;
            $total=$amt+$amt_int;
            $sql1="update loan set last_updated_date='$today',total_amount=$total where req_id=$rid";
            try{
                if(mysqli_query($conn,$sql1)){
                    echo("👍");
                }
            }catch(Exception $e){
                echo $e;
            }
        }
    }
}

?>