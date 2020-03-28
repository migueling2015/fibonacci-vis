import * as d3 from "d3";

var width = 600,
    height = 600;

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g");

  
var iterationNumber = 15;
var u = [];
    u[0]= 1;
    u[1]= 1;

var d = "m" + width * .5 + "," +height * .5;

var r = 0;
var x = 0;
var y = 0;
var path = '';
var totalLength = 0;
for (let i=0; i<iterationNumber ; i++) {
  r = u[i];
  x = (i % 4 < 2) ? r : r * (-1);
  y = ((i+1) % 4 < 2) ? r : r * (-1);
  d += "a" + r + "," + r + " 0 0 0" + x + "," + y
  u[i+2] = u[i] + u[i+1];

path = svg.append("path")
          .attr("d", d)
          .style("stroke-width", 3)
          .style("stroke","#1f78b4")
          .style("fill","none");

totalLength = path.node().getTotalLength();

path.attr("stroke-dasharray", totalLength + " " + totalLength)
    .attr("stroke-dashoffset", totalLength)
    .transition()
    .duration(2000)
    .delay(500)
    .ease("exp")
    .attr("stroke-dashoffset", 0);
}