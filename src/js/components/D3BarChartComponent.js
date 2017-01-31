import React from "react";
var d3BarChart = require ("../d3/d3BarChart.js");
import D3DataStore from "../stores/D3DataStore";

export default class D3BarChart extends React.Component {
 

constructor(){
  super();

 if( D3DataStore.getBarId() == 0 ){ 
   this.state = {
      indexBar:D3DataStore.getBarId(),
      barData:  D3DataStore.getBarMonth(),
      colorKeys: D3DataStore.getBarMonthKeys()
    };
  }
 
 if( D3DataStore.getBarId() == 1 ){ 
   this.state = {
      indexBar:  D3DataStore.getBarId(),
      barData:   D3DataStore.getBarCostCategory(),
      colorKeys  :   D3DataStore.getCostCategoryKeys()
    };
  }
    
  D3DataStore.increaseBarId();


}


componentDidMount() {
    var el = this.refs.bar;
    d3BarChart.create(el, {
      width: 700,
      height: 400
    }, 
    this.getChartState());
  };

  componentDidUpdate() {

    var el = this.refs.bar;
    var explanation = this.refs.explanation;

    d3BarChart.update(el, {
        "indexBar":this.props.indexBar,
        "barData":  this.props.barData,
        "colorKeys": this.props.colorKeys
      });
  };

  getChartState() {


     if ( this.state == null ){

         if( D3DataStore.getBarId()%2 == 0 ){
           this.state = {
              indexBar:0,
              barData:  D3DataStore.getBarMonth(),
              colorKeys: D3DataStore.getBarMonthKeys()
            };
          }

         if( D3DataStore.getBarId()%2 == 1 ){
           this.state = {
              indexBar: 1,
              barData:   D3DataStore.getBarCostCategory(),
              colorKeys  :   D3DataStore.getCostCategoryKeys()
            };
          }

          D3DataStore.increaseBarId();


     }

    return {
      indexBar:this.state.indexBar,
      barData: this.state.barData,
      colorKeys: this.state.colorKeys
    };
  };

  componentWillUnmount() {
    var el = this.refs.chart;
    var explanation = this.refs.explanation;
    d3BarChart.destroy(el);
  };

  
  render() {
  	
    return (

    	
     	   <svg ref="bar"  className="chartcontainerdivRight" ></svg>
    	
               
    );
  }
}