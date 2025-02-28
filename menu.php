<?php
$serverName = "localhost";
$connectionOptions = array(
    "Database" => "RestauranteDB",
    "Uid" => "usuario",
    "PWD" => "password"
);

// Conectar con SQL Server
$conn = sqlsrv_connect($serverName, $connectionOptions);

if ($conn === false) {
    die(json_encode(["error" => "Error en la conexión con la base de datos"]));
}

// Consultar hamburguesas
$sql = "SELECT nombre, imagen FROM Hamburguesas";
$stmt = sqlsrv_query($conn, $sql);

$hamburguesas = [];

while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
    $hamburguesas[] = $row;
}

echo json_encode($hamburguesas);
?>
