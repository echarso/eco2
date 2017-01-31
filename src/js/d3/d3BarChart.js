//
var d3 = require('d3');
var d3tip = require('d3-tip');

var d3BarChart ={};
var x0;
var x1;
var y;
var z;
var svg=[];
var margin;
var height;
var width;
var g=[];
var data = new Array ();
var keys =[];
var indexBar;
/*
var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<strong>Value:</strong> <span style='color:red'>" + d.value + "</span>";
  });
*/

d3BarChart.create = function(el,props, state) {



console.log( " calling update for Bar Chart " );

  data = state.barData;
  keys = state.colorKeys;
  indexBar = state.indexBar;

	svg[indexBar] = d3.select(el),
	    margin = {top: 6, right: 20, bottom: 10, left: 40},
	    width = props.width - margin.left - margin.right,
	    height = props.height  - margin.top - margin.bottom,
	    g[indexBar] = svg[indexBar].append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  
  x0 = d3.scaleBand()
      .rangeRound([0, width])
      .paddingInner(0.1);

  x1 = d3.scaleBand()
      .padding(0.05);

  y = d3.scaleLinear()
      .rangeRound([height, 0]);


  this.update(el, state);
};


d3BarChart.update = function(el, state) {



 z = d3.scaleOrdinal()
    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);


data = state.barData;
keys = state.colorKeys;
var indexBar = state.indexBar;

console.log( " calling update for Bar Chart " + indexBar);
console.log( " calling update for Bar Chart data -> " + data);
console.log( " calling update for Bar Chart SVG " + svg[indexBar]);

x0.domain(data.map(function(d) { return d.State; }));


x1.domain(keys).rangeRound([0, x0.bandwidth()]);
y.domain([0, d3.max(data, function(d) { return d3.max(keys, function(key) { return d[key]; }); })]).nice();
//y.domain(d3.extent(data, function(d) { return d.y; }));
//y.domain(d3.extent(data, function(d) { return d3.extent(keys, function(key) { return d[key]; }); })).nice();
var transitionDuration;
if (indexBar == 0 ){ transitionDuration = 600;}
if (indexBar == 1 ){ transitionDuration = 600;}

svg[indexBar].selectAll("rect").transition().duration(transitionDuration).attr("height", 0).attr("width", 0).remove();
svg[indexBar].selectAll(".axis").transition().duration(0).attr("height", 0).attr("width", 0).remove();
svg[indexBar].selectAll(".axis").transition().duration(0).attr("height", 0).attr("width", 0).remove();
svg[indexBar].selectAll(".legentText").transition().duration(0).attr("height", 0).attr("width", 0).remove();

g[indexBar].append("g")
    .selectAll("g")
    .data(data)
    .enter().append("g")
      .attr("transform", function(d) { return "translate(" + x0(d.State) + ",0)"; })
    .selectAll("rect")
    .data(function(d) { return keys.map(function(key) { return {key: key, value: d[key]}; }); })
    .enter().append("rect")
      .attr("x", function(d) { return x1(d.key); })
      .attr("y", function(d) { return y(d.value); })
      .attr("width", x1.bandwidth())
      .attr("height", function(d) { return height - y(d.value); })
      .attr("fill", function(d) { 
             if ( d.key =="times"){ return z(d.key); return"#97CAB1";}
             if( d.key == "expenses" || d.key =="amount"  ){
                        return "#e2aa66";
             }else if (  d.key  == "income" ){
                         return z("balance");// inocent hack to change color between income and balance// return "#0B4B17"
            }else if (  d.key  == "balance" ){
                          return z("income");// inocent hack to change color between income and balance //return "#FFA500";
            } else if (  d.key  != "flare"){
                      return "#E3E3E3";
            }
      });
      //.on('mouseover', tip.show)
      //.on('mouseout', tip.hide)

  g[indexBar].append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x0));

  g[indexBar].append("g")
      .attr("class", "axis")
      .call(d3.axisLeft(y).ticks(null, "s"))
    .append("text")
      .attr("x", 2)
      .attr("y", y(y.ticks().pop()) + 0.5)
      .attr("dy", "0.32em")
      .attr("fill", "#000")
      .attr("font-weight", "bold")
      .attr("text-anchor", "start")
      .text("Swedish Kronas (SEK)");

  var legend = g[indexBar].append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 15)
      .attr("text-anchor", "end")
    .selectAll("g")
    .data(keys.slice().reverse())
    .enter().append("g")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  legend.append("rect")
      .attr("x", width - 19)
      .attr("width", 19)
      .attr("height", 19)
      .attr("fill", function(d) { 
              console.log(" setting legend color " + d.key);
             if (  d =="times"){return z(d.key); return "#97CAB1";}
             if( d == "expenses" ||  d =="amount" ){
                        return "#e2aa66";
             }else if (  d  == "income" ){
                         return z("balance");// inocent hack to change color between income and balance// return "#0B4B17"
            }else if (  d  == "balance" ){
                          return z("income");// inocent hack to change color between income and balance //return "#FFA500";
            } else if (  d  != "flare"){
                      return "#E3E3E3";
            }
      });
  legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9.5)
      .attr("dy", "0.32em")
      .attr("class","legentText")
      .text(function(d) {   if ( d =="amount") return "expenses for category";
                            if ( d =="times")  return "times for that expense"  ;
                            return d;
                          });


};


d3BarChart.destroy = function(el) {
  // Any clean-up would go here
  // in this example there is nothing to do
};

function mouseover(d) {
   
  console.log(" mouseover " + d.value );




}

// Restore everything to full opacity when moving off the visualization.
function mouseleave(d) {

}

module.exports = d3BarChart;