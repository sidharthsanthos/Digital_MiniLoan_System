<?php
include('heade.php');

// Get the request data
$request = file_get_contents("php://input");
$data = json_decode($request);

// Access the properties correctly
$name = $data->name;  // Correctly access 'name'
$gender = $data->gender;  // Correctly access 'gender'
$phno = $data->phno;  // Correctly access 'phone_number'
$email=$data->email;
$dob= $data->dob;
$nation= $data->nation;
$state= $data->state;
$district= $data->district;
$address= $data->address;
$uid= $data->uid;
$credit_score=700;

// Database connection
$conn = mysqli_connect("localhost", "root", "", "digital_miniloan");

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
$sql1="select acct_no from bank where email='$email'";
$res=mysqli_query($conn,$sql1);

if(mysqli_num_rows($res)>0){
    echo "email already in use";
}
else{
// Prepare SQL query
$sql = "INSERT INTO bank (name, gender, phone_number,email,date_of_birth,nationality,state,district,address,uid_number,credit_score) VALUES ('$name', '$gender', $phno,'$email','$dob','$nation','$state','$district','$address','$uid',$credit_score)";

// Execute the query
try {
    if (mysqli_query($conn, $sql)) {
        echo "success";
    } else {
        echo "failed: ";
    }
} catch (Exception $e) {
    echo $e;
}
}
// Close connection
mysqli_close($conn);
?>
