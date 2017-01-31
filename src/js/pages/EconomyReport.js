import React from "react";
import XLSX from "xlsx";
import D3CycleChart from "../components/D3CycleChartComponent";
var execellParser  = require ("../d3/excellParsingTimeLiner.js");

export default class EconomyReport extends React.Component {


     
  componentDidMount() {
  	const element =document.getElementById('xlf');
  	console.log(XLSX);

  	execellParser.XLSX = XLSX;
  	execellParser.setXlf(element);

  }

  render() {
    return (
      <div>
        <h1> Welcome to  economy Report Tab</h1>
        <p><input type="file" name="xlfile" id="xlf" /> ... or click here to select a file</p>
        <D3CycleChart />
      </div>
    );
  }
}
