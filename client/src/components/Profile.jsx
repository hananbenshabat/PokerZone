import { Component } from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { update, logout } from "../actions/authActions";
import { buttonReset, applyButtonClicked } from "../actions/uiActions";
import Game from "./Game";
import {
  Nav,
  NavBtn,
  NavBtnLink,
  PokerZoneTitle,
} from "./Navbar/NavbarElements";
import "../style.css";

export class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: this.props.user,
      msg: "",
    };
  }

  static propTypes = {
    button: PropTypes.bool,
    user: PropTypes.object,
    update: PropTypes.func,
    authState: PropTypes.object.isRequired,
    status: PropTypes.object.isRequired,
    buttonReset: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
  };

  componentDidUpdate(prevProps) {
    const status = this.props.status;

    // Changes status message if it is different from previous message
    if (status !== prevProps.status) {
      if (status.id === "UPDATE_FAIL") {
        this.setState({ msg: status.statusMsg });
      } else {
        this.setState({ msg: this.props.status.statusMsg });
      }
    }
  }

  onLogout = (e) => {
    window.alert = console.log;
    e.preventDefault();
    this.props.buttonReset();
    this.props.logout();
    window.location.reload(false);
  };

  onUpdate = (updatedUser) => {
    if (this.props.authState.isAuthenticated) {
      this.setState({ user: updatedUser });
      this.props.applyButtonClicked();
      this.props.update(updatedUser);
    }
  };

  render() {
    if (!this.props.authState.isAuthenticated) {
      return <Navigate to="/" />;
    }

    return (
      <div>
        <Nav>
          <NavBtn onClick={this.onLogout}>
            <NavBtnLink to=""> Logout</NavBtnLink>
          </NavBtn>
        </Nav>
        <br />
        <PokerZoneTitle>PokerZone</PokerZoneTitle>
        <br />
        <div>{<Game onUpdate={this.onUpdate} />}</div>
        <br />
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  //Maps state to redux store as props
  button: state.ui.button,
  status: state.status,
  authState: state.auth,
  user: state.auth.user,
});

export default connect(mapStateToProps, {
  update,
  logout,
  applyButtonClicked,
  buttonReset,
})(Profile);
