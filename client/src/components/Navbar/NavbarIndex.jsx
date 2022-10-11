import React from "react";
import { Nav, NavLink, NavMenu, PokerZoneTitle } from "./NavbarElements";

const Navbar = () => {
  return (
    <div>
      <Nav>
        <NavMenu>
          <NavLink to="/Login">Login</NavLink>
          <NavLink to="/Register">Register</NavLink>
        </NavMenu>
      </Nav>
      <br />
      <PokerZoneTitle>PokerZone</PokerZoneTitle>
    </div>
  );
};

export default Navbar;
