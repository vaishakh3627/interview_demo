import React from "react";

import "./App.scss";

import Layout from "./components";

function App() {
  return (
    <>
      <div className="blur" style={{ top: "-18%", right: "0" }}></div>
      <div className="blur" style={{ top: "36%", left: "-8rem" }}></div>
      <div className="App">
        <div></div>
        <Layout />
        <div></div>
      </div>
    </>
  );
}

export default App;
