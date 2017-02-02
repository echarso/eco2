import React from "react";
import D3LineChartComponent from "../components/D3LineChartComponent";
import D3LineChartBalanceComponent from "../components/D3LineChartBalanceComponent";


export default class Info extends React.Component {
  render() {
    return (
          <div>
            <h1> line chart comparing income vs expenses </h1>
            <D3LineChartComponent/>
             <h1> line chart for balance </h1>
            <D3LineChartBalanceComponent/>
          </div>
    );
  }
}
