var table, row, tempVal = [], maxwidth, maxheight, node = [], spawns = [[]];


$(document).ready(function(){
	createContent();
	scanSpawns();
	posx = $(positionx)[0].value;
	posy = $(positiony)[0].value;
	putHuman(posy,posx);
});	

function createContent(){
	table = $(".content tr");
	node.length = table.length;
	maxwidth = $(".content tr")[0].childElementCount;
	maxheight = $(".content tr").length;	
	
	for(y=0;y<table.length;y++){
		row = table[y].childNodes;
		table[y].classList.add(y);
		node[y] = [];
		node[y].length = row.length;
		for(x=0; x<row.length; x++){node[y][x] = row[x].classList[0]; row[x].classList.add(x);}
	}
}

function scanSpawns(){
	length = $("#spawns tr.sitem").length;
	spawns.length = length;
	i=0;
	while(i < length){
		spawns[i] = new Object();
		spawns[i]["id"] = $(".sitem","#spawns")[i].id.slice(2, $(".sitem","#spawns")[i].id.length);
		spawns[i]["name"] = $(".name", "#spawns tr.sitem")[i].innerText;
		spawns[i]["minlvl"] = $(".minlvl", "#spawns tr.sitem")[i].innerText;
		spawns[i]["maxlvl"] = $(".maxlvl", "#spawns tr.sitem")[i].innerText;
		spawns[i]["rate"] = $(".rate", "#spawns tr.sitem")[i].innerText;
		spawns[i]["time"] = $(".time", "#spawns tr.sitem")[i].innerText;
		i++;
	}
}

function putHuman(y, x){
	if(tempVal != ""){
		$("tr")[tempVal[1]].childNodes[tempVal[2]].classList[0] = tempVal[0];
		$("tr")[tempVal[1]].childNodes[tempVal[2]].innerText = "";
	}
	tempVal = [node[y][x], parseInt(y), parseInt(x)];
	
	$("tr")[y].childNodes[x].innerText = "X";
}

function moveUp(){
	if(tempVal[1] <= 0) return;
	innerTextVal = $("tr")[tempVal[1]-1].children[tempVal[2]].classList[0];
		if(innerTextVal == "b"){
		checkEncounter();
	}
	if(innerTextVal != "p" && innerTextVal != "b" && innerTextVal != "x" && innerTextVal != "su"){return;}
	else if(innerTextVal == "su"){putHuman(tempVal[1]-2, tempVal[2]);console.log("hopup");}
	else {putHuman(tempVal[1]-1, tempVal[2]);console.log("up");}
}

function moveRight(){
	if(tempVal[2] >= maxwidth) return;
	innerTextVal = $("tr")[tempVal[1]].children[tempVal[2]+1].classList[0];
		if(innerTextVal == "b"){
		checkEncounter();
	}
	if(innerTextVal != "p" && innerTextVal != "b" && innerTextVal != "x" && innerTextVal != "sr"){return;}
	else if(innerTextVal == "sr"){putHuman(tempVal[1], tempVal[2]+2);console.log("hopright");}
	else {putHuman(tempVal[1], tempVal[2]+1);console.log("right");}
}

function moveLeft(){
	if(tempVal[2] <= 0) return;
	innerTextVal = $("tr")[tempVal[1]].children[tempVal[2]-1].classList[0];
		if(innerTextVal == "b"){
		checkEncounter();
	}
	if(innerTextVal != "p" && innerTextVal != "b" && innerTextVal != "x" && innerTextVal != "sl"){return;}
	else if(innerTextVal == "sl"){putHuman(tempVal[1], tempVal[2]-2);console.log("hopleft");}
	else {putHuman(tempVal[1], tempVal[2]-1);console.log("left");}
}

function moveDown(){
	if(tempVal[1] >= maxheight) return;
	innerTextVal = $("tr")[tempVal[1]+1].children[tempVal[2]].classList[0];
	if(innerTextVal == "b"){
		checkEncounter();
	}
	
	if(innerTextVal != "p" && innerTextVal != "b" && innerTextVal != "x" && innerTextVal != "sd"){return;}
	else if(innerTextVal == "sd"){putHuman(tempVal[1]+2, tempVal[2]);console.log("hopdown");}
	else {putHuman(tempVal[1]+1, tempVal[2]);console.log("down");}
}

function checkEncounter(){
	j=0;
	while(j<spawns.length){
		if(spawns[j]["rate"]<=Math.random()*100){ 
			mon_id = spawns[j]["id"];
			level = calcEncounter(mon_id);
			showEncounter($(".name", "#id"+mon_id)[0].innerText, calcEncounter(mon_id));
			return;
		} 
		j++;
	}
}

function showEncounter(name, level){
	alert("You encoutered a "+name+" Level "+level);
}

function calcEncounter(id){
	max_lvl = $(".maxlvl", "#id"+id)[0].innerText;
	min_lvl = $(".minlvl", "#id"+id)[0].innerText;
	level = Math.round(Math.random()*(max_lvl-min_lvl+1))+2;
	return level;
}


/*
j=0;while(j<spawns.length){if(spawns[j]["rate"]<=checkEncounter()){ console.log("enc");}else{console.log("noenc");} j++;}
*/