//Building class
var Building = function(name, lat, lng, year, height, icon) {
 this.name = name;
 this.id = this.name.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").replace(/ /g, '-' ).toLowerCase();
 this.lat = lat;
 this.lng = lng;
 this.year = year;
 this.height = height;
 this.icon = icon;
 this.pics = Pic.filterByBuilding(this);
 console.log(this.pics);
 this.makeSection();
 Building.buildings.push(this);
};

Building.buildings = [];
Building.buildingsToQuiz = [];

Building.build = function() {
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
};

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
  this.$section = $('<section>').attr('id', this.id);
  var template = Handlebars.compile($('#building-section-template').text());
  var html = template(this);
  this.$section.html(html);
  $('#buildings').append(this.$section);
};

Building.prototype.getName = function() {
 return this.name;
};
