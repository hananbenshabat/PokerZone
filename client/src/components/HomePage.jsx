import { Component } from "react";
import { connect } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { isAuth } from "../actions/authActions";
import Navbar from "./Navbar/NavbarIndex";
import Register from "./Register";
import Login from "./Login";
import store from "../store";
import "../style.css";

const NavigateToLogin = () => {
  return <Navigate to="/Login" />;
};

export class HomePage extends Component {
  componentDidMount() {
    // Check if session cookie is present
    store.dispatch(isAuth());
  }

  static propTypes = {
    button: PropTypes.bool,
    isAuthenticated: PropTypes.bool,
  };

  render() {
    if (this.props.isAuthenticated) {
      return <Navigate to="/profile" />;
    } else {
      return (
        <div>
          <Navbar />
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NavigateToLogin />} />
          </Routes>
        </div>
      );
    }
  }
}
const mapStateToProps = (state) => ({
  //Maps state to redux store as props
  button: state.ui.button,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(HomePage);
