import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory } from "react-router";

import EconomyReport from "./pages/EconomyReport";
import Todos from "./pages/Todos";
import Layout from "./pages/Layout";
import Info from "./pages/Info";


const app = document.getElementById('app');

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Todos}></IndexRoute>
      <Route path="economyreport" component={EconomyReport}></Route>
      <Route path="info" component={Info}></Route>
    </Route>
  </Router>,
app);
