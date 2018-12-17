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
	
	$stmt = "SELECT id, abbreviation FROM field_types";
	$field_types = dbfetch($stmt, $connection);
	echo "<pre>";
	//print_r($field_types);
	echo "</pre>";


	$file = file("bromonrouten.csv", FILE_IGNORE_NEW_LINES);
	$i=0;
	$insert = "INSERT INTO zone_contents (zone_id, field_type_id, pos_x, pos_y) VALUES ";
	$insert2 = $insert;
	
	
	foreach($file as $line){
		$line = explode(",", $line);
		$file[$i] = $line;
		echo "<pre>";
		//print_r($line);
		echo "</pre>";
		$i++;
	}
	
	
	$max_x = intval(end($file[0]))+1;

	$max_y = intval(end($file)[0]) + 1;
		echo "<pre>";
		print_r($max_x);
		echo "</pre>";		echo "<pre>";
		print_r($max_y);
		echo "</pre>";		
		
		echo "<pre>";
		print_r($file);
		echo "</pre>";
	
	for($y = 1; $y <= $max_y; $y++){
		$y2 = $file[$y][0];
		for($x = 1; $x <= $max_x; $x++){
				$insert .= "(".$file[0][0].",";
				$insert2 .= "(".$file[0][0].",";
				$x2 = $file[0][$x];
				$insert2 .= $file[$y][$x];

				foreach($field_types as $field_type){
						if($field_type["abbreviation"] == $file[$y][$x]){
							$insert .= $field_type["id"];
						}
						
				}
				$insert .= ",$x2,$y2),";
				$insert2 .= ",$x2,$y2),";
		}
	}
	


	echo "<pre>";
	print_r($insert);
	echo "</pre>";
	echo "<pre>";
	print_r($insert2);
	echo "</pre>";

	echo "<pre>";
	//print_r($file[0][0]);
	echo "</pre>";
	
	
	echo "<pre>";
	//print_r($max_y." ".$max_x);
	echo "</pre>";	

	
	
?>
