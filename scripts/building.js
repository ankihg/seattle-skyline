//Building class
var Building = function(name, lat, lng, year, height, icon) {
  console.log('buidling hi');
 this.name = name;
 this.id = this.name.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").replace(/ /g, '-' ).toLowerCase();
 this.lat = lat;
 this.lng = lng;
 this.year = year;
 this.height = height;
 this.icon = icon;
 console.log('constructor');
 this.makeSection();
 Building.buildings.push(this);
};

Building.buildings = [];
Building.buildingsToQuiz = [];

Building.addMarkers = function(map) {
 for (var i=0; i<Building.buildings.length; i++) {
 var building = Building.buildings[i];
 building.addMarker(map);
 }
};

Building.prototype.addMarker = function(map) {
 var pos = new google.maps.LatLng(this.lat, this.lng);
 var name = this.name;
 var icon = this.icon;
 var marker=new google.maps.Marker({
 position:pos,
 name:name,
 icon:icon
 });
 marker.setMap(map);

 this.addInfoWindow(map, marker);
};

Building.prototype.addInfoWindow = function(map, marker) {
 var infoText = this.generateInfoText();
 var infowindow = new google.maps.InfoWindow({
 content:infoText
 });

 google.maps.event.addListener(marker, 'click', function() {
 infowindow.close(map,marker);
 if (quiz) {
 if (marker.name == secretBuilding.getName() ) {
 alert('good job!');
 if (tryCount == 0) {
 score++;
 }
 count++;

 //remove from Building.buildingsToQuiz
 var index = Building.buildingsToQuiz.indexOf(secretBuilding);
 if (index > -1) {
 Building.buildingsToQuiz.splice(index, 1);
 }

 quizBuilding(true);

 } else {
 alert('try again...');
 tryCount++;

 }
 } else {
 infowindow.open(map,marker);
 }
 });

 google.maps.event.addListener(marker, 'mouseover', function() {
 if (quiz) {
 marker.setAnimation(google.maps.Animation.BOUNCE);
 if (tryCount >= 2) {
 infowindow.open(map,marker);
 }
 }
 });

 google.maps.event.addListener(marker, 'mouseout', function() {
 marker.setAnimation(null);
 if (quiz && tryCount >= 2) {
 infowindow.close(map,marker);
 }
 });
};


Building.prototype.generateInfoText = function() {
 var r = Math.random() * 3;
 if (r < 1) {
 return this.name.concat(", built in ", this.year, ", is ", this.height, " ft tall.");
 } else if (r < 2) {
 return "Built in ".concat(this.year, ", ", this.name, " is ", this.height, " ft tall.");
 } else {
 return this.name.concat(" was built in ", this.year, " and is ", this.height, " ft tall.");
 }
};

Building.prototype.makeSection = function() {
  console.log('make');
  this.$section = $('<section>').attr('id', this.id);
  this.$section.html('<h1>'+this.name+'</h1>');
  $('#buildings').append(this.$section);
  console.log('appended');
};



Building.prototype.getName = function() {
 return this.name;
};
