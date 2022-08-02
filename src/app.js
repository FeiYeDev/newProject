import React from "react";
import "antd/dist/antd.css";
import "@ant-design/pro-components/dist/components.css";
import "./index.css";
import Tables from './pages/Tables'

const App = (props) => (
  <Tables props={props} />
);

export default App;
