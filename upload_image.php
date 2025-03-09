<?php
if (isset($_POST['upload'])) {
	$foto = $_FILES['codebar']['tmp_name'];
	$nombre = "codebar.png";
	move_uploaded_file($foto, $nombre);
	header("Location: scanner_image.html");
}	
?>