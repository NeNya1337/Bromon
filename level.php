<?php
	$connection = dbconnect("bromon");
	
	function dbfetch($statement, $connection){
		$sql = $connection->prepare($statement);
		$sql->execute();
		return $sql->fetchAll(PDO::FETCH_ASSOC);
	}
	
	function dbconnect($dbname, $dbuser = "root", $dbpass = "", $dbhost = "localhost"){
		$pdo = new PDO("mysql:host=".$dbhost.";dbname=".$dbname, $dbuser, $dbpass);	
		return $pdo;
	}
	
	$stmt = "SELECT id, description FROM experience_types";
	$experience_types = dbfetch($stmt, $connection);

	$file = file("exp_levels.csv", FILE_IGNORE_NEW_LINES);
	$i = 0;
	foreach($file as $line){
		$line = explode(",", $line);
		$file[$i] = $line;
		$i++;
	}
	
	$insert = "INSERT INTO experience_levels (type_id, value, level) VALUES ";
	for($lvl = 1; $lvl <=100; $lvl++){
		for($id = 1; $id <= 6; $id++){
			$insert .= "(";
			foreach($experience_types as $experience_type){
				if($experience_type["description"]==$file[0][$id]){
					$insert .= $experience_type["id"];
				}
			}
			$insert .= ",".intval($file[$lvl][$id]).",".intval($file[$lvl][0])."),";
		}
	}
	
	echo "<pre>";
	print_r($insert);
	echo "</pre>";	
?>
