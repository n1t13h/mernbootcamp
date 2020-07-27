import React from 'react';
// import API from "../backend";
import Base from './Base';
const App = () => {
  // console.log("API IS ",API);
  return (
    <Base title="Homepage">
      <div className="row">
        <div className="col-4">
          <button className="btn btn-success">Test</button>
        </div>
        <button className="btn btn-success">Test</button>
        <div className="col-4"></div>
        <button className="btn btn-success">Test</button>
        <div className="col-4"></div>
      </div>

    </Base>
  )
}

export default App;