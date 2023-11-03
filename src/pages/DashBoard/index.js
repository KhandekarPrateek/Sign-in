import React from "react";
import { useState } from "react";
import { GiNotebook } from "react-icons/gi";
import { GoSignOut } from "react-icons/go";
import { CgProfile } from "react-icons/cg";

import {
  Container,
  Row,
  Col,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
} from "reactstrap";

const DashBoard = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  return (
    <div>
      <Navbar color="dark" light expand="md" dark>
        <NavbarBrand href="/">
          <GiNotebook size={35} />
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto align-items-end" navbar>
            <div className="d-flex justify-row ">
              <NavItem>
                <NavLink href="/profile">
                  <CgProfile size={30} />
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/signin">
                  <GoSignOut size={30} />
                </NavLink>
              </NavItem>
              <NavbarText>Powered by firebase</NavbarText>
            </div>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default DashBoard;
{
  /* 
<Row>
  <Col sm={1}>
    <button
      class="btn btn-primary"
      type="button"
      data-bs-toggle="offcanvas"
      data-bs-target="#offcanvasWithBothOptions"
      aria-controls="offcanvasWithBothOptions"
    >
      notes
    </button>
    <div
      class="offcanvas offcanvas-start"
      data-bs-scroll="true"
      tabindex="-1"
      id="offcanvasWithBothOptions"
      aria-labelledby="offcanvasWithBothOptionsLabel"
    >
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasWithBothOptionsLabel">
          NOTES
        </h5>
        <button
          type="button"
          class="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div class="offcanvas-body">
        <p>work</p>
      </div>
    </div>
  </Col>
</Row>
*/
}
