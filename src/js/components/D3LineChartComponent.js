//d3LineChart
import React from "react";
import * as D3Actions from "../actions/D3Actions";
import D3DataStore from "../stores/D3DataStore";

//import D3LineDataStore from "../store/D3LineDataStore";


var _ = require('lodash');
var d3LineChart = require ("../d3/d3LineChart.js");

export default class D3LineChartComponent extends React.Component {


constructor(){
  super();

  this.fetchNewMonthLineData   = this.fetchNewMonthLineData.bind(this);  
  this.fetchYearMonthLineData  = this.fetchYearMonthLineData.bind(this);

  this.state = {
      barData:  D3DataStore.getYearLineChartArray(),
      colorKeys: ["expenses","income"]
  };

 

}


componentDidMount() {

    D3DataStore.on("MONTH_LINE_CHART_CHANGE", this.fetchNewMonthLineData);
    D3DataStore.on("YEAR_LINE_CHART_CHANGE", this.fetchYearMonthLineData);


     D3DataStore.setAlreadyLineMounted(true);

     var el = this.refs.lineBar;
     
       d3LineChart.create(el, {
        width: 1000,
        height: 500
        }, 
      this.getChartState());

  //}

}
  componentDidUpdate() {


  //	console.log(" 3 componentDidUpdate bar chart it is updating ");
     var el = this.refs.lineBar;

    d3LineChart.update(el, {
        "barData":  D3DataStore.getYearLineChartArray(),
        "colorKeys":  ["expenses","income"]
      });
  
  };


  fetchYearMonthLineData(){       

    this.setState({
        "barData":  D3DataStore.getYearLineChartArray(),
        "colorKeys":  ["expenses","income"]
    });

  }

  fetchNewMonthLineData(){       

    this.setState({
        "barData":  D3DataStore.getYearLineChartArray(),
        "colorKeys":  ["expenses","income"]
    });

  }

  getChartState() {
    	return {
      	barData:  D3DataStore.getYearLineChartArray(),
      	colorKeys: ["expenses","income"]
  		};
  	
  };

  componentWillUnmount() {

  	D3DataStore.removeListener("MONTH_LINE_CHART_CHANGE", this.fetchNewMonthLineData);
    D3DataStore.removeListener("YEAR_LINE_CHART_CHANGE", this.fetchYearMonthLineData);

  	var el = this.refs.lineBar;
    d3LineChart.destroy(el);
  };

  
  render() {
  	
    return (
     	 <svg ref="lineBar" width="960" height="500"></svg>   
    );

  }

}