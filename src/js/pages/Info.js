import React from "react";
import D3LineChartComponent from "../components/D3LineChartComponent";

export default class Info extends React.Component {
  render() {
    return (
          <div>
            <h1> line chart comparing income vs expenses </h1>
            <D3LineChartComponent/>
          </div>
    );
  }
}
