(function(module) {

  var Pic = function(tmp) {
    this.src = tmp.src;
    this.desc = tmp.desc;
    this.buildings = this.buildings;
  };

  Pic.all = [];

Pic.loadAll = function(rawData) {
  Pic.all = rawData.map(function(tmp) {
    return new Pic(tmp);
  });
};

Pic.fetchAll = function(callNext) {
  console.log('fetch all');
  if (localStorage.reviewData) {
    console.log('load from storage');
    Pic.checkUpdate(callNext); //checks if needs update, calls loadAll() either way
  } else {
      Pic.update(callNext);
  }
};

Pic.update = function(callNext) {
 $.getJSON('/data/picData.json', function(data, message, xhr) {
    Pic.loadAll(data);
    localStorage.picData = JSON.stringify(data);
    localStorage.picEtag = xhr.getResponseHeader('eTag');
    if (callNext) { callNext(); }
  });
};

Pic.checkUpdate = function(callNext) {
  $.ajax({
  type: 'HEAD',
  url: "/data/picData.json",
  complete: function(data) {
    var etag = data.getResponseHeader('eTag');
    if (localStorage.picEtag !== etag) {
      Pic.update();
      if (callNext) { callNext(); }
    } else {
      Pic.loadAll(JSON.parse(localStorage.picData));
      if (callNext) { callNext(); }
    }
  }
  });
};

Pic.ensureAll = function(ctx, next) {
  console.log('ensure all');
  if (!Pic.all || Pic.all.length === 0) {
    Pic.fetchAll(next);
  } else {
    if (next) { next(); }
  }
};


  module.Pic = Pic;
})(window);
