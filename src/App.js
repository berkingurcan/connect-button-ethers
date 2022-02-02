import "./App.css";
import { ethers, BigNumber } from "ethers";
import { useEffect, useState, useRef } from "react";
import Connect from "./components/Connect";

function App() {
  return (
    <div className="App">
      <Connect />
    </div>
  );
}

export default App;
