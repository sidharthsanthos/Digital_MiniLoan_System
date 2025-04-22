<?php
include 'heade.php';
include 'conn.php';
include 'loan_setting.php';

// Enable error reporting for debugging
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
error_reporting(E_ALL);
ini_set('display_errors', 1);

$method = $_SERVER['REQUEST_METHOD'];
$system_intrest=System_intrest_rate;
$cs=minimum_credit_score;

if ($method === 'POST') {
    // Handle POST request (Insert data)
    $req = file_get_contents("php://input");
    $data = json_decode($req);

    $uid = $data->uid;
    $amt = $data->amount;
    $status = "pending";
    $intrest=$system_intrest;

    $sql1="select credit_score from bank where user_id=$uid";
    $res=mysqli_query($conn,$sql1);
    $row=mysqli_fetch_assoc($res);
    $credit=$row['credit_score'];

    date_default_timezone_set('Asia/Kolkata');
    $date=date('Y-m-d');
    $time=date('H:i:s');

    if($amt >2500){
        echo json_encode(array("status"=>"limit exceeded"));
    }
    else if($credit<$cs){
        echo json_encode(array("status"=>"credit_issue"));
    }
    else{
    $sql = "insert into loan (user_id,amount,status,intrest_rate,date) values($uid,$amt,'$status',$intrest,'$date')";
    try {
        if(mysqli_query($conn,$sql)){
            echo json_encode(array("status"=>"requested"));
        }
        else{
            echo json_encode(array("status"=>"failed"));
        }
    } catch (Exception $e) {
        echo json_encode(array("status" => "failed", "error" => $e->getMessage()));
    }

    // $sql = "INSERT INTO loan (user_id, amount, status) VALUES (?, ?, ?)";

    // try {
    //     $stmt = $conn->prepare($sql);
    //     $stmt->bind_param("iis", $uid, $amt, $status);
    //     if ($stmt->execute()) {
    //         echo json_encode(array("status" => "requested"));
    //     } else {
    //         echo json_encode(array("status" => "failed"));
    //     }
    //     $stmt->close();
    // } catch (Exception $e) {
    //     echo json_encode(array("status" => "failed", "error" => $e->getMessage()));
    // }
}
} elseif ($method === 'GET') {
    // Handle GET request (Retrieve data)
    $sql = "SELECT * FROM loan l,authentication a,bank b where l.user_id=a.user_id and b.user_id=a.user_id and b.user_id=l.user_id and l.status='pending' order by l.status desc";
    $result = mysqli_query($conn, $sql);

    $loans = array();
    while ($row = mysqli_fetch_assoc($result)) {
        $loans[] = $row;
    }

    echo json_encode($loans);
} else {
    echo json_encode(array("status" => "error", "message" => "Invalid request method"));
}

mysqli_close($conn);
?>
