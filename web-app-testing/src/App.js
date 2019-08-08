import React, {useState} from 'react';
import './App.css';
import Display from "./components/Display.js";
import Dashboard from "./components/Dashboard.js"

function App(props) {
  const resetCount = {strikes: 0, balls: 0};
  const [count, setCount] = useState({...resetCount, ...props.count});
  const resetTotalCount = () => {
    setCount(resetCount)
  };
  const strike = () => {
    count.strikes >= 2 ? resetTotalCount() : setCount({...count, strikes: count.strikes+1})
  };
  const ball = () => {
    count.balls >= 3 ? resetTotalCount() : setCount({...count, balls: count.balls+1})
  };
  const foul = () => setCount({...count, strikes: Math.min(count.strikes + 1, 2)});
  const hit = () => resetTotalCount();

  return (
    <div className="App">
      <div>Hello Game</div>
      <Display strikes={count.strikes} balls={count.balls} />
      <Dashboard strike={strike} ball={ball} foul={foul} hit={hit} />
    </div>
  );
}

export default App;
