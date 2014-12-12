var width = 1200,
  height = 635,
  centered;

var projection = d3.geo.albersUsa()
  .scale(1200)
  .translate([width / 2, height / 2]);

var path = d3.geo.path()
  .projection(projection);

window.clickZoomOut = function () {
  var x, y, k;
  x = width / 2;
  y = height / 2;
  k = 1;
  g.selectAll('.' + centered.id)
    .classed('centered', false);
  centered.centered = false;
  centered = null;
  g.classed('centered', false);
  zoomInOut(null, x, y, k);
};

var svg = d3.select(".svg-map").append("svg")
  .attr("width", width)
  .attr("height", height)
  .on('click', clickZoomOut);

svg.append("rect")
  .attr("class", "background")
  .attr("width", width)
  .attr("height", height)
  .on('click', clickZoomOut);

var g = svg.append("g")
  .attr('class', 'city-container');

d3.json("/demo/us.json", function (error, us) {

  g.append("g")
    .attr("id", "states")
    .selectAll("path")
    .data(topojson.feature(us, us.objects.states).features)
    .enter().append("path")
    .attr("d", path)
    .on('click', clickZoomOut);

  g.append("path")
    .datum(topojson.mesh(us, us.objects.states, function (a, b) {
      return a !== b;
    }))
    .attr("id", "state-borders")
    .attr("d", path)
    .on('click', clickZoomOut);
});

window.setHappiness = function (data) {
  data = data.map(function (d) {
    d.positive = Math.random() * 50;
    d.negative = Math.random() * 50;
    return d;
  });
  window.data = data;
  window.render(window.data);
};

window.addSingleCity = function (id, name, lat, lon) {
  data.push({
    id: id,
    name: name,
    lat: '' + lat,
    lon: '' + lon,
    positive: Math.random() * 50,
    negative: Math.random() * 50,
  });
  render(data, 0);
};

window.addSingleCity = function (name, lat, lon, positive, negative) {
  data.push({
    name: name,
    lat: '' + lat,
    lon: '' + lon,
    positive: positive,
    negative: negative
  });
  render(data, 0);
};

window.render = function (data, timeDelay) {


  var total_radius = 30;
  var getRadius = function (type) {
    return function (d) {
      return total_radius * (d[type] * 0.01);
    };
  };
  var getPositiveRadius = getRadius('positive');
  var getNegativeRadius = getRadius('negative');
  var getDelay = function (d, i) {
    if (timeDelay !== undefined) return timeDelay;
    return i * 100;
  };
  var getY = function (d) {
    return projection([d.lon, d.lat])[1];
  };
  var getName = function (d) {
    return d.name;
  };
  var getData = function (type) {
    return function (d) {
      return Math.floor(d[type]) + '%';
    };
  };
  var getPositiveData = getData('positive');
  var getNegativeData = getData('negative');
  var cityCircle = g.selectAll("g.city")
    .data(data)
    .enter()
    .append("g")
    .attr('class', function (d) {
      var centered = '';
      if (d.centered === true) {
        centered = 'centered';
      }
      return 'city ' + d.id + ' ' + d.name + ' ' + centered;
    })
    .on("click", nodeClicked.bind(null, 'hello'));

  // Append Neutral
  cityCircle
    .append("circle")
    .attr("cx", function (d) {
      return projection([d.lon, d.lat])[0];
    })
    .attr("cy", getY)
    .attr("r", 0)
    .attr('class', 'city neutral')
    .transition()
    .delay(getDelay)
    .duration(500)
    .attr("r", total_radius);

  // Append Positive Circle
  cityCircle
    .append("circle")
    .attr("cx", function (d) {
      return (projection([d.lon, d.lat])[0] - (total_radius - getPositiveRadius(d)));
    })
    .attr("cy", getY)
    .attr("r", 0)
    .attr('class', 'city positive')
    .transition()
    .delay(getDelay)
    .duration(700)
    .attr("r", getPositiveRadius);

  // Append Positive Text
  cityCircle
    .append("text")
    .text(getPositiveData)
    .attr("dx", function (d) {
      return (projection([d.lon, d.lat])[0] - (total_radius - getPositiveRadius(d)));
    })
    .attr("dy", getY)
    .attr('class', 'text positive');

  // Append Negative
  cityCircle
    .append("circle")
    .attr("cx", function (d) {
      return (projection([d.lon, d.lat])[0] + (total_radius - getNegativeRadius(d)));
    })
    .attr("cy", getY)
    .attr("r", 0)
    .attr('class', 'city negative')
    .transition()
    .delay(getDelay)
    .duration(700)
    .attr("r", getNegativeRadius);

  // Append Negative Text
  cityCircle
    .append("text")
    .text(getNegativeData)
    .attr("dx", function (d) {
      return (projection([d.lon, d.lat])[0] + (total_radius - getNegativeRadius(d)));
    })
    .attr("dy", getY)
    .attr('class', 'text negative');
};

window.centered = null;

var nodeClicked = function (str, d, b, c) {
  d3.event.preventDefault();
  d3.event.stopPropagation();
  var x, y, k;
  x = projection([d.lon, d.lat])[0];
  y = projection([d.lon, d.lat])[1];
  k = 4;
  centered = d;
  centered.centered = true;

  var centeredEl = g.selectAll('.' + d.id)
    .classed('centered', true);
  g.classed('centered', true);
  zoomInOut(d, x, y, k);
};

var zoomInOut = function (d, x, y, k) {
  d3.event.preventDefault();
  d3.event.stopPropagation();
  g.selectAll("path")
    .classed("active", centered && function (d) {
      return d === centered;
    });
  var transform = "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")";
  g.transition()
    .duration(800)
    .attr("transform", transform)
    .style("stroke-width", 1.5 / k + "px");
};