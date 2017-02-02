//d3LineChart
import React from "react";
import * as D3Actions from "../actions/D3Actions";
import D3DataStore from "../stores/D3DataStore";

//import D3LineDataStore from "../store/D3LineDataStore";


var _ = require('lodash');
var d3LineChart = require ("../d3/d3LineChart.js");

export default class D3LineChartBalanceComponent extends React.Component {


constructor(){
  super();

  this.fetchMonthBalanceData   = this.fetchMonthBalanceData.bind(this);  
  this.fetchYearBalanceData  = this.fetchYearBalanceData.bind(this);

  this.state = {
      barData:  D3DataStore.getYearLineBalanceChartArray(),
      colorKeys: ["balance"]
  };

 

}


componentDidMount() {

    D3DataStore.on("MONTH_LINE_CHART_BALANCE_CHANGE", this.fetchMonthBalanceData);
    D3DataStore.on("YEAR_LINE_CHART_BALANCE_CHANGE", this.fetchYearBalanceData);

  D3DataStore.setAlreadyLineMounted(true);

     var el = this.refs.lineBar2;
     
       d3LineChart.create(el, {
        width: 1000,
        height: 500
        }, 
      this.getChartState());

  //}

}
  componentDidUpdate() {


  //	console.log(" 3 componentDidUpdate bar chart it is updating ");
     var el = this.refs.lineBar2;

    d3LineChart.update(el, {
        "barData":  D3DataStore.getYearLineBalanceChartArray(),
        "colorKeys":  ["balance"]
      });
  
  };


  fetchYearBalanceData(){       

    this.setState({
        "barData":  D3DataStore.getYearLineBalanceChartArray(),
        "colorKeys":  ["balance"]
    });

  }

  fetchMonthBalanceData(){       

    this.setState({
        "barData":  D3DataStore.getYearLineBalanceChartArray(),
        "colorKeys":  ["balance"]
    });

  }

  getChartState() {
    	return {
      	barData:  D3DataStore.getYearLineBalanceChartArray(),
      	colorKeys: ["balance"]
  		};
  	
  };

  componentWillUnmount() {

  	D3DataStore.removeListener("MONTH_LINE_CHART_CHANGE", this.fetchMonthBalanceData);
    D3DataStore.removeListener("YEAR_LINE_CHART_CHANGE", this.fetchYearBalanceData);

  	var el = this.refs.lineBar2;
    d3LineChart.destroy(el);
  };

  
  render() {
  	
    return (
     	 <svg ref="lineBar2" width="960" height="500"></svg>   
    );

  }

}