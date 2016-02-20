var map;

//quiz data
var quiz = false;
var secretBuilding;
var score;
var count;
var tryCount;

function initialize()
{
var myCenter = new google.maps.LatLng(47.609127, -122.333099);
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

};

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
};


function shuffle(elm) {
  var imgs = $(elm).find('img');
  var txt = $(elm).text();
  txt = txt.split('').map(function(c) {
    if (3*Math.random() < 2) {
      return c.toLowerCase();
    } else {
      return c.toUpperCase();
    }
  }).join('');
  $(elm).text(txt);
  $(elm).prepend(imgs);
};

function prevent(e) {
  console.log('hi');
  e.stopPropagation();
};


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
