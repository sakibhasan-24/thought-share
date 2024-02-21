import { Avatar, Button, Dropdown, Navbar } from "flowbite-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser);
  const [themeNumber, setThemeNumber] = useState(0);
  const ariaLevel = ["Default", "Retro", "Cyberpunk", "Valentine", "Aqua"];
  const value = ["default", "retro", "cyberpunk", "valentine", "aqua"];
  const handleTheme = () => {
    setThemeNumber((themeNumber) => themeNumber + 1);
    if (themeNumber === 4) setThemeNumber(0);
  };
  return (
    <Navbar fluid rounded className="bg-slate-900 p-6 rounded-lg">
      <Link to="/" className="font-semibold flex items-center">
        <span className="text-neutral-content text-2xl">Thought</span>
        <span className="text-orange-800 sm:text-3xl">Share</span>
      </Link>

      {/* dynamic */}
      {currentUser && (
        <div className="flex md:order-2">
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt="UserImage"
                img={currentUser?.profilePicture}
                rounded
              />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">Bonnie Green</span>
              <span className="block truncate text-sm font-medium">
                {currentUser?.email}
              </span>
            </Dropdown.Header>
            <Dropdown.Item>Dashboard</Dropdown.Item>
            <Dropdown.Item>Settings</Dropdown.Item>
            <Dropdown.Item>Earnings</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>Sign out</Dropdown.Item>
          </Dropdown>
          <Navbar.Toggle />
        </div>
      )}

      <Navbar.Collapse>
        <Navbar.Link
          active={!currentUser && location.pathname === "/login"}
          as={"div"}
        >
          <Link className="cursor-pointer text-xl font-bold" to="/login">
            {currentUser ? "LogOut" : "Login"}
          </Link>
        </Navbar.Link>
        <Navbar.Link active={location.pathname === "/projects"} as={"div"}>
          <Link className="cursor-pointer text-xl font-bold" to="/projects">
            projects
          </Link>
        </Navbar.Link>
      </Navbar.Collapse>
      <input
        onClick={handleTheme}
        type="radio"
        name="theme-buttons"
        className="btn px-2 theme-controller join-item w-[100px] rounded-md"
        aria-label={ariaLevel[themeNumber]}
        value={value[themeNumber]}
      />
    </Navbar>
  );
}

{
  /* <form className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered sm:w-24 md:w-auto"
          />
        </form> */
}
