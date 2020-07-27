import React from "react";
import logo from "./logo.svg";

import "./bootstrap.min.css";
import "./App.css";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newItem: "",
      list: []
    };
  }

  addItem(todoValue) {
    if (todoValue !== "") {
      const newItem = {
        id: Date.now(),
        value: todoValue,
        isDone: false
      };
      const list = [...this.state.list];
      list.push(newItem);

      this.setState({
        list,
        newItem: ""
      });
    }
  }

  deleteItem(id) {
    const list = [...this.state.list];
    const updatedlist = list.filter(item => item.id !== id);
    this.setState({ list: updatedlist });
  }

  updateInput(input) {
    this.setState({ newItem: input });
  }
  render() {
    return (
      <div>
        <img src={logo} alt="Logo" width="100" height="100" className="logo" />
        <div className="container">
          <div className="row ">
            <div className="col-lg-12 d-flex justify-content-center">
              <h1 className="app-title">LCO TODO APP</h1>
            </div>
            <div className="col-lg-10 col-sm-8">
            <input
            type="text"
            className="form-control"
            placeholder="Write a Todo"
            required
            value={this.state.newItem}
            onChange={e => this.updateInput(e.target.value)}
          />

            </div>
            <div className="col-lg-2 col-sm-4">
            <button
            className="add-btn btn btn-primary"
            onClick={() => this.addItem(this.state.newItem)}
            disabled={!this.state.newItem.length}
          >Add A Todo</button>

            </div>
          </div>
        </div>
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="col-lg-6" width="500">
              <div className="card todo">
                <ul>
                {this.state.list.map(item => {
                return (
                  <li key={item.id}>
                    <input
                      type="checkbox"
                      name="idDone"
                      // checked={item.isDone}
                      onChange={() => {}}
                    />
                    {item.value}
                    <button
                      className="btn btn-danger"
                      onClick={() => this.deleteItem(item.id)}
                    >
                      Delete
                    </button>
                  </li>
                );
              })}
                </ul>

              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
