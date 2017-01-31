import React from "react";
import D3BarChart from "../components/D3BarChartComponent";

import * as D3Actions from "../actions/D3Actions";
import D3DataStore from "../stores/D3DataStore";



var _ = require('lodash');
var d3CycleChart = require ("../d3/d3CycleChart.js");


export default class D3CycleChart extends React.Component {


  constructor(){
    super();
    this.fetchNewMonthData = this.fetchNewMonthData.bind(this);
    this.fetchNewMonthAmountOFMoneyData = this.fetchNewMonthAmountOFMoneyData.bind(this);
    this.fetchNewYearData = this.fetchNewYearData.bind(this);
    this.fetchNewYearAmountOFMoneyData = this.fetchNewYearAmountOFMoneyData.bind(this);

    this.fetchNewExcellData = this.fetchNewExcellData.bind(this);

    //this.fetchNewExcellCycleData = this.fetchNewExcellCycleData.bind(this);


    this.state = {
      cycleData : D3DataStore.getCycleData(),
      monthTransaction:       D3DataStore.getBarMonth(),
      monthTransactionKeys:         D3DataStore.getBarMonthKeys(),
      barCostCategory:   D3DataStore.getBarCostCategory(),
      costCategoryKeys:  D3DataStore.getCostCategoryKeys()
    };


  }

  
  // a listener to change month event
  componentWillMount() {
    D3DataStore.on("MONTH_COST_CHART_CHANGE", this.fetchNewMonthData);
    D3DataStore.on("MONTH_AMOUNT_OF_MONEY_CHART_CHANGE", this.fetchNewMonthAmountOFMoneyData);
    D3DataStore.on("YEAR_COST_CHART_CHANGE", this.fetchNewYearData);
    D3DataStore.on("YEAR_AMOUNT_OF_MONEY_CHART_CHANGE", this.fetchNewYearAmountOFMoneyData); 
     D3DataStore.on("DATA_FROM_EXCELL_LOADED", this.fetchNewExcellData); 
 }

  componentWillUnmount() {
    D3DataStore.removeListener("MONTH_COST_CHART_CHANGE", this.fetchNewMonthData);
    D3DataStore.removeListener("MONTH_AMOUNT_OF_MONEY_CHART_CHANGE", this.fetchNewMonthAmountOFMoneyData);
    D3DataStore.removeListener("YEAR_COST_CHART_CHANGE", this.fetchNewYearData);
    D3DataStore.removeListener("YEAR_AMOUNT_OF_MONEY_CHART_CHANGE", this.fetchNewYearAmountOFMoneyData);
    D3DataStore.removeListener("DATA_FROM_EXCELL_LOADED", this.fetchNewExcellData); 
 
  }



  fetchNewMonthData(){       

    this.setState({
      cycleData : D3DataStore.getCycleData(),
      monthTransaction: D3DataStore.getBarMonth(),
      monthTransactionKeys: D3DataStore.getBarMonthKeys(),
      barCostCategory:  D3DataStore.getBarCostCategory(),
      costCategoryKeys: D3DataStore.getCostCategoryKeys()
    });

  }

  fetchNewMonthAmountOFMoneyData(){
    console.log(" d3CycleBar fetchNewMonthAmountOFMoneyData");
  }
 
  fetchNewYearData (){
        console.log(" d3CycleBar fetchNewYearData");
  }
 
  fetchNewYearAmountOFMoneyData (){
        console.log(" d3CycleBar fetchNewYearAmountOFMoneyData");
  }

 fetchNewExcellData(){

      console.log(" fetching excell data ");

    this.setState({
      cycleData   :  D3DataStore.getCycleData(),
      monthTransaction: D3DataStore.getBarMonth(),
      monthTransactionKeys: D3DataStore.getBarMonthKeys(),
      barCostCategory:  D3DataStore.getBarCostCategory(),
      costCategoryKeys: D3DataStore.getCostCategoryKeys()
    });
 }



componentDidMount() {
    var el = this.refs.chart;
    var explanation = this.refs.explanation;
    var percentage = this.refs.percentage;
  


    d3CycleChart.create(el,explanation,percentage, {
      width: 600,
      height: 800
    }, 
    this.getChartState());
  };

  componentDidUpdate() {
    var el = this.refs.chart;
    var explanation = this.refs.explanation;
    d3CycleChart.update(el, this.getChartState());
  };

  getChartState() {
    return {
      cycleData   :  D3DataStore.getCycleData(),
      monthTransaction: D3DataStore.getBarMonth(),
      monthTransactionKeys: D3DataStore.getBarMonthKeys(),
      barCostCategory:  D3DataStore.getBarCostCategory(),
      costCategoryKeys: D3DataStore.getCostCategoryKeys()
    };
  };

  componentWillUnmount() {
    var el = this.refs.chart;
    var explanation = this.refs.explanation;
    d3CycleChart.destroy(el);
  };

  
  render() {
     var styles = _.cloneDeep(this.constructor.styles);
    return (
      <div>
        <div ref="chart" className = "chartcontainerdivLeft"> 
             <div ref="explanation" className = "explanation"> 
               <span ref="percentage" className = "percentage" ></span>        
             </div>
         </div>

        <div ref="bar" className="chartcontainerdivRight">
          <D3BarChart indexBar={0} barData={this.state.monthTransaction} colorKeys={this.state.monthTransactionKeys}/>
        </div>
        <div ref="bar2" className="chartcontainerCostCatecogory">
          <D3BarChart indexBar={1} barData={this.state.barCostCategory} colorKeys={this.state.costCategoryKeys}/>
        </div>
        
      </div>
    );
  }

}

D3CycleChart.styles = {
  general: {
    border: "5px solid green",
    padding: 10,  // Becomes "10px" when rendered.
    background: "yellow",
    overflow: scroll,
    
	}
};

