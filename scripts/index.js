var map;

//quiz data
var quiz = false;
var secretBuilding;
var score;
var count;
var tryCount;

function initialize()
{
var myCenter = new google.maps.LatLng(47.610627, -122.333099);
var mapProp = {
 center:myCenter,
 zoom:15,
 mapTypeId:google.maps.MapTypeId.ROADMAP
 };

map=new google.maps.Map(document.getElementById("googleMap"),mapProp);

// Create a DIV to hold the control and call QuizControl()
 var quizControlDiv = document.createElement('div');
 quizControlDiv.id = 'controlDiv';
 var quizControl = new QuizControl(quizControlDiv, map, 'Quiz');
// quizControlDiv.index = 1;
 map.controls[google.maps.ControlPosition.TOP_RIGHT].push(quizControlDiv);

new Building('Columbia Center', 47.604497, -122.330466, 1985, 943, '/media/Columbia_Center.png');
new Building('1201 Third Ave', 47.607182, -122.336096, 1988, 772, '/media/1201_Third_Ave.png');
new Building('Two Union Square', 47.609695, -122.332143, 1989, 740, '/media/Two_Union_Square.png');
new Building('Seattle Municipal Tower', 47.605097, -122.329756, 1990, 722, '/media/Seattle_Municipal_Tower.png');
new Building('Safeco Plaza', 47.606218, -122.333713, 1969, 630, '/media/Safeco_Plaza.png');
new Building('Space Needle', 47.620513, -122.349342, 1962, 605, '/media/Space_Needle.png');
new Building('Russell Investments Center', 47.607782, -122.338112, 2006, 598, '/media/Russell_Investments_Center.png');
new Building('US Bank Centre', 47.610615, -122.334758, 1989, 580, '/media/US_Bank_Center.png');
new Building('Wells Fargo Center', 47.604974, -122.334064, 1983, 573, '/media/Wells_Fargo_Center.png');
new Building('Bank of America Fifth Avenue Plaza', 47.605829, -122.330374, 1981, 543, '/media/Bank_of_America_Fifth_Avenue_Plaza.png');
new Building('901 Fifth Avenue', 47.605805, -122.331982, 1973, 536, '/media/901_Fifth_Avenue.png');
new Building('Rainier Tower', 47.608827, -122.334371, 1977, 514, '/media/Rainier_Tower.png');
new Building('Fourth and Madison Building', 47.605688, -122.333095, 2002, 512, '/media/Fourth_and_Madison_Building.png');
new Building('1918 Eighth Avenue', 47.615676, -122.335963, 2009, 500, '/media/1918_Eighth_Avenue.png');
new Building('Qwest Plaza', 47.613270, -122.334455, 1976, 498, '/media/Qwest_Plaza.png');
console.log('buildings created');

Building.addMarkers(map);

}

// Add a Home control that returns the user to London
function QuizControl(controlDiv, map, building) {
 controlDiv.style.padding = '5px';
 controlDiv.style.display = 'block';
 var controlUI = document.createElement('div');
 controlUI.id = 'control';
 controlUI.style.backgroundColor = 'black';
 controlUI.style.color = 'white';
 controlUI.style.border='1px solid';
 controlUI.style.cursor = 'pointer';
 controlUI.style.textAlign = 'center';
 controlUI.title = 'Set map to London';
 controlDiv.appendChild(controlUI);
 var controlText = document.createElement('div');
 controlText.id = 'controlTxt';
 controlText.style.fontFamily='Arial,sans-serif';
 controlText.style.fontSize='14px';
 controlText.style.paddingLeft = '6px';
 controlText.style.paddingRight = '6px';
 controlText.innerHTML = '<h2>'.concat(building, '<h2>');
 controlUI.appendChild(controlText);

 // Setup click-event listener: simply set the map to London
 /*google.maps.event.addDomListener(controlUI, 'click', function() {
 map.setCenter(new google.maps.LatLng(47.605627, -122.333099))
 });*/
 google.maps.event.addDomListener(controlUI, 'click', function() {
 quizBuilding(false)
 });
}

function alterQuizControl(controlDiv, map, building) {
 controlDiv.style.padding = '5px';
 controlDiv.style.display = 'block';
 var controlUI = document.getElementById('control');
 controlUI.style.backgroundColor = 'white';
 controlUI.style.color = 'black';
 controlUI.style.border='1px solid';
 controlUI.style.cursor = 'pointer';
 controlUI.style.textAlign = 'center';
 controlUI.title = 'Set map to London';
 controlDiv.appendChild(controlUI);
 var controlText = document.getElementById('controlTxt');
 controlText.style.fontFamily='Arial,sans-serif';
 controlText.style.fontSize='14px';
 controlText.innerHTML = '';
 controlText.innerHTML = '<h2>'.concat(building, '?<h2>');
 controlUI.appendChild(controlText);
 return quizControl;
}

function quizBuilding(fromBuildingSelection) {
 if (quiz && !fromBuildingSelection) {
 //must move forward by selecting secretBuilding
 alert('select building from map');
 return;
 }
 if (!quiz) {
 //new quiz
 quiz = true;
 Building.buildingsToQuiz = Building.buildings.slice();
 score = 0;
 count = 0;
 makeScoreDisplay();
 }
 updateScoreDisplay();

 if (Building.buildingsToQuiz.length < 1) {
 //all buildings completed
 alert('all buildings quizzed');
 endQuiz();
 return;
 }

 var r = Math.floor(Math.random() * Building.buildingsToQuiz.length);
 var building = Building.buildingsToQuiz[r];
 secretBuilding = building;
 tryCount = 0;

 // Create a DIV to hold the control and call QuizControl()
 var quizControlDiv = document.getElementById('controlDiv');
 var quizControl = alterQuizControl(quizControlDiv, map, building.getName());
// quizControlDiv.index = 1;
 map.controls[google.maps.ControlPosition.TOP_RIGHT].push(quizControlDiv);

};

function makeScoreDisplay() {
 var scoreDisplay = document.createElement('div');
 scoreDisplay.id = 'scoreDisplay';

 scoreDisplay.style.padding = '5px';
 scoreDisplay.style.backgroundColor = 'white';
 scoreDisplay.style.color = 'black';
 scoreDisplay.style.fontSize='14px';
 scoreDisplay.style.border='1px solid';
 scoreDisplay.style.paddingLeft = '6px';
 scoreDisplay.style.paddingRight = '6px';
 scoreDisplay.style.display = 'block';


 scoreDisplay.innerHTML = '<h2>'.concat(score, '/', count ,'</h2>');
 map.controls[google.maps.ControlPosition.RIGHT_CENTER].push(scoreDisplay);
}

function updateScoreDisplay() {
 var scoreDisplay = document.getElementById('scoreDisplay');
 scoreDisplay.innerHTML = '';
 scoreDisplay.innerHTML = '<h2>'.concat(score, '/', count ,'</h2>');

}

function endQuiz() {
 quiz = false;
 var quizControl = document.getElementById('control');
 quizControl.style.backgroundColor = 'black';
 quizControl.style.color = 'white';
 var controlTxt = document.getElementById('controlTxt');
 controlTxt.innerHTML = '';
 controlTxt.innerHTML = '<h2>Quiz</h2>';

 //remove scoreDisplay
 var scoreDisplay = document.getElementById("scoreDisplay");
 scoreDisplay.parentNode.removeChild(scoreDisplay);
}




function changeColor(div) {
 var r = Math.random() * 7;
 var color = "#ffffff";
 if (r < 1) {
 color = "#FFA500"; //orange
 } else if (r < 2) {
 color = "#00ff00"; //green
 } else if (r < 3) {
 color = "#ffff00"; //yellow
 } else if (r < 4) {
 color = "#00ffff"; //cyan
 } else if (r < 5) {
 color = "#FFB6C1"; //pink
 } else if (r < 6) {
 color = "#0000ff"; //blue
 }

 div.style.color = color;
}

/*function rearrange(div) {
 var html = div.innerHTML;
 var toks = html.split("&nbsp;");
 alert(toks);
 var west = toks[0];
 var east = toks[toks.lenght-1];

 var skyscraps = [west, east];
 for (var i=0; i<skyscraps.length; i++) {
 alert(skyscraps[i]);
 for (var c=0; c<skyscraps[i].length; c++) {
 var skyscrap = "";
 if (2*Math.random() < 1) {
 skyscrap += "&lhblk;";
 } else {
 skyscrap += "&block;";
 }
 skyscraps[i] = skyscrap;
 }
 }

 west = skyscrap[0];
 east = skyscrap[1];

 toks[0] = west;
 toks[1] = east;

 var html = "";
 for (var i=0; i<toks.length; i++) {
 html += toks[i];
 }
 alert(html);
 div.innerHTML = html;
 alert('rearranged;');
}*/
