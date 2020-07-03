import React, { useState, useEffect, useRef } from "react";

// CSSTransition/react-transition-group module for Animations
import { CSSTransition, TransitionGroup } from "react-transition-group";

// SVG Icons imported as React Components
import { ReactComponent as IconBell } from "./icons/bell.svg";
import { ReactComponent as IconMessenger } from "./icons/messenger.svg";
import { ReactComponent as IconCaret } from "./icons/caret.svg";
import { ReactComponent as IconPlus } from "./icons/plus.svg";
import { ReactComponent as IconCog } from "./icons/cog.svg";
import { ReactComponent as IconChevron } from "./icons/chevron.svg";
import { ReactComponent as IconArrow } from "./icons/arrow.svg";
import { ReactComponent as IconBolt } from "./icons/bolt.svg";

function App() {
  return (
    <NavBar>
      <NavItem icon={<IconPlus />} />
      <NavItem icon={<IconMessenger />} />
      <NavItem icon={<IconBell />} />

      <NavItem icon={<IconCaret />}>
        <DropdownMenu></DropdownMenu>
      </NavItem>
    </NavBar>
  );
}

function NavBar(props) {
  return (
    <nav className="navbar">
      <ul className="navbar__nav">{props.children}</ul>
    </nav>
  );
}

function NavItem(props) {
  const [open, setOpen] = useState(false);

  return (
    <li className="nav__item">
      <a href="#0" className="icon-button" onClick={() => setOpen(!open)}>
        {props.icon}
      </a>
      {open && props.children}
    </li>
  );
}

function DropdownMenu(props) {
  const [activeMenu, setActiveMenu] = useState("main");
  const [menuHeight, setMenuHeight] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight);
  }, []);

  function calculateMenuHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  function DropdownItem(props) {
    return (
      <a
        href="#0"
        className="dropdown__item"
        onClick={() => dropdownMenuItemPressed(props)}
      >
        <span className="icon-button">{props.leftIcon}</span>
        {props.children}
        <span className="icon-right">{props.rightIcon}</span>
      </a>
    );
  }

  function dropdownMenuItemPressed(props) {
    //console.log(props);

    //Set active menu if it has one to go to
    if (props.goToMenu) setActiveMenu(props.goToMenu);
  }

  // Animation time (set in CSS)
  const animationTimeout = 300; // timeout for animation finished state
  const menuAnimationClasses = {
    primary: "menu-primary",
    secondary: "menu-secondary",
  };

  return (
    <div className="dropdown" style={{ height: menuHeight }} ref={dropdownRef}>
      {/***** Main Menu *****/}
      <CSSTransition
        in={activeMenu === "main"}
        classNames={menuAnimationClasses.primary}
        timeout={animationTimeout}
        unmountOnExit
        onEnter={calculateMenuHeight}
      >
        <div className="menu">
          <DropdownItem leftIcon="😀">
            <p>My Profile</p>
          </DropdownItem>
          <DropdownItem
            leftIcon={<IconCog />}
            rightIcon={<IconChevron />}
            goToMenu="settings"
          >
            <p>Settings</p>
          </DropdownItem>
          <DropdownItem
            leftIcon={<IconPlus />}
            rightIcon={<IconChevron />}
            goToMenu="listtest"
          >
            <p>List Test</p>
          </DropdownItem>
        </div>
      </CSSTransition>

      {/***** Settings *****/}
      <CSSTransition
        in={activeMenu === "settings"}
        classNames={menuAnimationClasses.secondary}
        timeout={animationTimeout}
        unmountOnExit
        onEnter={calculateMenuHeight}
      >
        <div className="menu">
          <DropdownItem leftIcon={<IconArrow />} goToMenu="main">
            <p>Go Back</p>
          </DropdownItem>
        </div>
      </CSSTransition>

      {/***** List Test *****/}
      <CSSTransition
        in={activeMenu === "listtest"}
        classNames={menuAnimationClasses.secondary}
        timeout={animationTimeout}
        unmountOnExit
        onEnter={calculateMenuHeight}
      >
        <div className="menu">
          <DropdownItem leftIcon={<IconArrow />} goToMenu="main">
            <p>Go Back</p>
          </DropdownItem>
          <DropdownItem
            leftIcon={"😅"}
            rightIcon={<IconChevron />}
            goToMenu="sublisttest"
          >
            <p>Nested List Item</p>
          </DropdownItem>
          <DropdownItem leftIcon={"😝"}>
            <p>List Item</p>
          </DropdownItem>
          <DropdownItem leftIcon={"😎"}>
            <p>List Item</p>
          </DropdownItem>
          <DropdownItem leftIcon={"😡"}>
            <p>List Item</p>
          </DropdownItem>
          <DropdownItem leftIcon={"🥶"}>
            <p>List Item</p>
          </DropdownItem>
        </div>
      </CSSTransition>

      {/***** Sub List Test *****/}
      <CSSTransition
        in={activeMenu === "sublisttest"}
        classNames={menuAnimationClasses.secondary}
        timeout={animationTimeout}
        unmountOnExit
        onEnter={calculateMenuHeight}
      >
        <div className="menu">
          <DropdownItem leftIcon={<IconArrow />} goToMenu="listtest">
            <p>Go Back</p>
          </DropdownItem>
          <DropdownItem leftIcon={"😡"}>
            <p>List Item</p>
          </DropdownItem>
          <DropdownItem leftIcon={"🥶"}>
            <p>List Item</p>
          </DropdownItem>
          <DropdownItem leftIcon={"😡"}>
            <p>List Item</p>
          </DropdownItem>
          <DropdownItem leftIcon={"🥶"}>
            <p>List Item</p>
          </DropdownItem>
        </div>
      </CSSTransition>
    </div>
  );
}

export default App;
