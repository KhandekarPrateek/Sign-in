import React, { useEffect } from "react";
import { useState } from "react";
import { GiNotebook } from "react-icons/gi";
import { PiSignOut } from "react-icons/pi";
import { VscAccount } from "react-icons/vsc";

import {
  Container,
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
} from "reactstrap";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";

const NavigationBar = () => {
  const [Data, setParsedData] = useState(null);

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const storedData = localStorage.getItem("userInfo");
    const parsedData = JSON.parse(storedData);
    setParsedData(parsedData);
  }, []);

  console.log(Data, "data");
  const routeToDashboard = () => {
    console.log(Data, "dashboardData");
    navigate(`/dashboard/${Data.displayName}`);
  };
  const routeToProfile = () => {
    console.log(Data, "dataProfile");

    navigate(`/profile/${Data.displayName}`);
  };

  return (
    <>
      <Container fluid>
        <Navbar color="dark" light expand="md" dark>
          <GiNotebook
            size={35}
            className="mx-3 text-light  navbar-icon"
            onClick={routeToDashboard}
          />
          <NavbarToggler onClick={toggle} />
          {location.pathname === `/dashboard/${Data?.displayName}` ? (
            <NavbarText>
              <h5>Note name</h5>
            </NavbarText>
          ) : (
            <NavbarText>
              <h5>Go to Dashboard</h5>
            </NavbarText>
          )}

          <Collapse isOpen={isOpen} navbar className="navbar-text">
            <Nav className="ml-auto " navbar>
              <NavItem>
                <VscAccount
                  size={35}
                  className="mt-2 text-light navbar-icon"
                  onClick={routeToProfile}
                />
              </NavItem>
              <NavItem>
                <NavLink href="/signin">
                  <PiSignOut size={35} className="mx-3 navbar-icon" />
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </Container>
    </>
  );
};

export default NavigationBar;
