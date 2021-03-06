// d3 LineChart
// be carefull with the date format


var d3 = require('d3');
var d3LineChart = {};

var x;
var y;
var z;
var parseTime;
var bisectDate;
var formatTime;

var line;
var width;
var height;
var margin;

var g=[];
var svg = [];
var indexPageSpecific = 0;
var div ;
var dateFormat = d3.timeFormat("%b %d, %y");


d3LineChart.create= function(el,props, state) {


if ( indexPageSpecific > 1 ) indexPageSpecific = 0;

svg[indexPageSpecific] = d3.select(el);

margin = {top: 20, right: 80, bottom: 30, left: 50};
width = props.width - margin.left - margin.right;
height = props.height - margin.top - margin.bottom;



if ( indexPageSpecific == 0 ){
  
  // tool tip placeholder attached only once
  div = d3.select("body").append("div") 
      .attr("class", "tooltip")       
     .style("opacity", 1.5);
}


g[indexPageSpecific] = svg[indexPageSpecific].append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")") ;

parseTime = d3.timeParse("%Y%m%d");
bisectDate = d3.bisector(function(d) { return d.date; }).left;

x = d3.scaleTime().range([0, width]);
y = d3.scaleLinear().range([height, 0]);
z = d3.scaleOrdinal(d3.schemeCategory10);

line = d3.line()
    .curve(d3.curveBasis)
    .x(function(d) {  return x(d.date); })
    .y(function(d) { return y(d.money); }) ;


 this.update(el, state);
 indexPageSpecific++;
 //highway();
}



d3LineChart.update =  function(el, state) {


// Define the div for the tooltip



var data = state.barData;

var moneyGroups = state.colorKeys;


  var keys = moneyGroups.map(function(id) {
     return {
        id: id,
        values: data.map(function(d) {
          d.date = d.date.replace(/-/g,"");
          return {date: parseTime(d.date), money: d[id]};
        })
      };
  });


  x.domain(d3.extent(data, function(d) {  d.date = d.date.replace(/-/g,"");
                                          return parseTime(d.date);
                                        }));

  y.domain([
    d3.min(keys, function(c) { return d3.min(c.values, function(d) { return d.money; }); }),
    d3.max(keys, function(c) { return d3.max(c.values, function(d) { return d.money; }); })
  ]);

  z.domain(keys.map(function(c) { return c.id; }));


  g[indexPageSpecific%2].append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  g[indexPageSpecific%2].append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(y).ticks(6).tickFormat(function(d) { return parseInt(d / 1000) + "k"; }))
      //.call(d3.axisLeft(y))
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("fill", "#000")
      .text("Amount of Money , SEK");



  var lineKey = g[indexPageSpecific%2].selectAll(".lineKey")
    .data(keys)
    .enter().append("g")
      .attr("class", "lineKey");

  lineKey.append("path")
      .attr("class", "line")
      .attr("d", function(d) {
      	return line(d.values); })
      .style("stroke", function(d) { return z(d.id); });


  lineKey.append("text")
      .datum(function(d) { return {id: d.id, value: d.values[d.values.length - 1]}; })
      .attr("transform", function(d) { return "translate(" + x(d.value.date) + "," + y(d.value.money) + ")"; })
      .attr("x", 3)
      .attr("dy", "0.35em")
      .style("font", "10px sans-serif")
      .text(function(d) {  return d.id; });


   lineKey.each(function(d,i){
      
            var inputD = d;
            d3.select(this).selectAll("dot")
            .data(d.values)
            .enter()
            .append("circle")
                  .attr("r", 2)   
                  .style("fill",function(d) { return z(inputD.id); })
                  .attr("cx", function(d) {  d.parentId = inputD.id; return x(d.date); })     
                  .attr("cy", function(d) {   return y(d.money); })   
                  .on("mouseover", function(d) {    
                                div.transition()    
                                    .duration(200)    
                                    .style("opacity", 1.9);    

                                div.html( inputD.id +" : "+ dateFormat(d.date) + "<br/>"  + d.money)  
                                    .style("left", (d3.event.pageX) + "px")   
                                    .style("top", (d3.event.pageY - 28) + "px");  
                                })          
                  .on("mouseout", function(d) {   
                                div.transition()    
                                    .duration(500)    
                                    .style("opacity", 0); 
                  });
    });



//////////////////// tool tip 
/*
var focus = g[indexPageSpecific%2].append("g")
        .attr("class", "focus")
        .style("display", "none");

    focus.append("line")
        .attr("class", "x-hover-line hover-line")
        .attr("y1", 0)
        .attr("y2", height);

    focus.append("line")
        .attr("class", "y-hover-line hover-line")
        .attr("x1", width)
        .attr("x2", width);

    focus.append("circle")
        .attr("r", 7.5);

    focus.append("text")
        .attr("x", 15)
        .attr("dy", ".31em");



  svg[indexPageSpecific%2].append("rect")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .attr("class", "overlay")
        .attr("width", width)
        .attr("height", height)
        .on("mouseover", function() { focus.style("display", null); })
        .on("mouseout", function() { focus.style("display", "none"); })
        .on("mousemove", mousemove);

    function mousemove(d) {
      console.log ( "  fomr x " );
      console.log( d3.mouse(this)[0] );

      var x0 = x.invert(d3.mouse(this)[0]);
      var i = bisectDate(data, x0, 1);
      console.log( data );  
     // findDForDate( data , x0);
      var d0 = data[i - 1];
      var d1 = data[i];

console.log ( " d ---->" );
console.log( d);
      console.log ( "i---->" + i);
                    

      
          
          console.log( "x0");
          console.log(x0);

          console.log( "x0 date " + x0.getDay());
          console.log( " x0 month " + x0.getMonth()) ;
          console.log( " x0 year " + x0.getYear()) ;

          // wrong dates 
      var  d = x0 - d0.date > d1.date - x0 ? d1 : d0;

          

      focus.attr("transform", "translate(" + x(d.date) + "," + y(d.value) + ")");
      focus.select("text").text(function() { return d.value; });
      focus.select(".x-hover-line").attr("y2", height - y(d.value));
      focus.select(".y-hover-line").attr("x2", width + width);
     
 
 }
*/
}// end of update


d3LineChart.destroy =  function(el, state) {

console.log(" line chart burned with fire ");

}


module.exports = d3LineChart;