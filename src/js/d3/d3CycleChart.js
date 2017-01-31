
var keys = ["expenses","balance","income"];




var d3 = require('d3');
import * as  D3Actions from "../actions/D3Actions";


var d3Chart = {};
var width = 700;
var height = 450;

var radius = Math.min(width, height) / 2;
var x = d3.scaleLinear().range([0, 2 * Math.PI]);
var y = d3.scaleSqrt().range([0, radius]);
// Breadcrumb dimensions: width, height, spacing, width of tip/tail.
var b = {
  w: 75, h: 30, s: 3, t: 10
};

// Mapping of step names to colors.


var z = d3.scaleOrdinal()
      .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
      //.range([  "#a05d56", "#d0743c", "#ff8c00"]);


// Total size of all segments; we set this later, after loading the data.
var totalSize = 0; 

var vis ;

var partition ;

var arc;

var radius = Math.min(width, height) / 2;
var padding = 0.005;
var explanationElement; 
var percentageElement;
//var radius = Math.min(width - padding * 2, height - padding * 2) / 2;

d3Chart.create = function(el,explanation, percentage,props, state) {



console.log( " calling update for Cycle Chart " );

explanationElement = explanation;
percentageElement  = percentage;
partition = d3.partition();

arc = d3.arc()
    .startAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x0))) + padding; })
    .endAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x1))) - padding; })
    .innerRadius(function(d) { return Math.max(0, y(d.y0)); })
    .outerRadius(function(d) { return Math.max(0, y(d.y1)); });

vis= d3.select(el).append("svg:svg")
    .attr("width", width)
    .attr("height", height)
    .append("svg:g")
    .attr("id", "container")
    .attr("transform", "translate(" + width/3 + "," + height/2 + ")");

  /*vis.append("svg:circle")
      .attr("r", radius)
      .attr("cx", function (d) { return width/2 ;})
      .attr("cx", function (d) { return height/2 ;})
      
      .style("opacity", 0.01);*/

  this.update(el, state);
};


d3Chart.update = function(el, state) {


console.log( " calling update for Cycle Chart " );

console.log( " calling update for Cycle Chart vis " );
      //var root = json;
      var root = state.cycleData;
      var nodes = d3.hierarchy(root);
      nodes.sum(function(d) { return d.size; });

     var path = vis.selectAll("path")
          .data(partition(nodes).descendants())
          .enter().append("path")
          .attr("display", function(d) { return d.depth ? null : "none"; })
          .attr("d", arc)
          .attr("id", function(d,i){ return "monthArc_"+i})
          .style("fill", function(d) { 
                      if( d.data.name == "expenses" ){
                        return "#e2aa66";
                      }else if ( d.data.name == "income" ){
                         return z("balance");// inocent hack to change color between income and balance// return "#0B4B17"
                      }else if ( d.data.name == "balance" ){
                          return z("income");// inocent hack to change color between income and balance //return "#FFA500";
                     } 
                     else if ( d.data.name != "flare"){
                      return "#E3E3E3";
                    }
                   })
          .on("mouseover", mouseover)
          .on("click", mouseover)
          .append("title")
          .text(function(d) { return d.data.name + "\n" + d.data.value; });
           

    vis.selectAll(".monthText")
              .data(partition(nodes).descendants())
              .enter().append("text")
              .attr("class", "monthText")
              .attr("x", 5) //Move the text from the start angle of the arc
              .attr("dy", 48) //Move the text down
              .append("textPath")
              .attr("xlink:href",function(d,i){
                return "#monthArc_"+i;
              })
           //  .attr("startOffset","50%")
            // .style("text-anchor","middle")
              .text(function(d){
                if ( !d.data.children  ) return " ";
                if (d.data.name == "flare") return" ";  
                return d.data.name;});  

        d3.select("#container").on("mouseleave", mouseleave);



};


d3Chart.destroy = function(el) {
  // Any clean-up would go here
  // in this example there is nothing to do
};

function mouseover(d) {
   
  var mouseoverD = d;
  // it should be the name of the month 
  var mouseoverMonthName ; 

   if ( !mouseoverD.data.children ) {
           mouseoverMonthName = d.parent.data.name;
  }else{
       mouseoverMonthName = d.data.name;
  }


  var percentage = (100 * d.data.value / totalSize).toPrecision(3);
  var percentageString ;
  

  D3Actions.LOAD_DATA_FOR_MONTH(d);


  if ( !d.data.children ) {
      percentageString =d.parent.data.name +"'s "  + d.data.name + " is " + d.data.size +" SEK" ;
  }
  else{
    percentageString = d.data.name + "'s income is " + d.data.children[2].size + " SEK" ;
  }

  d3.select(percentageElement)
      .text(percentageString);

  d3.select(explanationElement)
      .style("visibility", "");

  d3.selectAll("path")
      .style( "opacity", function(d) { 
        if ( d == null){
          return 1.0;
        }
        if ( d.data == null){
          return 1.0;
        }

        if ( !d.data.children ) {
          // we are shadowing all the childs of the father/month
            if(d.parent.data.name == mouseoverMonthName){
               return 3.0;
            }else{
              return 0.3;
            }
        }else{
           if(d.data.name == mouseoverMonthName){
               return 1.0;
            }else{
              return 0.3;
            }
        }
      
      });

  

}

// Restore everything to full opacity when moving off the visualization.
function mouseleave(d) {
  // Deactivate all segments during transition.
  //d3.selectAll("path").on("mouseover", null);
  console.log(" mouse leave");

  // Transition each segment to full opacity and then reactivate it.
// d3.selectAll("path")
 //     .transition()
 //     .duration(0)
 //     .style("opacity", 1);

 // d3.select(percentageElement)
 //     .text("");
//      .style("visibility", "hidden");
    
}

// Given a node in a partition layout, return an array of all of its ancestor
// nodes, highest first, but excluding the root.
function getAncestors(node) {
  var path = [];
  var current = node;
  while (current.parent) {
    path.unshift(current);
    current = current.parent;
  }
  return path;
};

module.exports = d3Chart;