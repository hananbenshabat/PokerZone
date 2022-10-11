import { Component } from "react";
import { Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Profile from "./components/Profile";
import HomePage from "./components/HomePage";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Routes>
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </Provider>
    );
  }
}

export default App;
