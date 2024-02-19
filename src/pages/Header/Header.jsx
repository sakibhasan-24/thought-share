import { Avatar, Dropdown, Navbar } from "flowbite-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  return (
    <Navbar fluid rounded className="bg-slate-900 p-6 rounded-lg">
      <Link to="/" className="font-semibold flex items-center">
        <span>Thought</span>
        <span className="text-orange-800 sm:text-3xl">Share</span>
      </Link>

      {/* dynamic */}
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar
              alt="User settings"
              img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              rounded
            />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">Bonnie Green</span>
            <span className="block truncate text-sm font-medium">
              name@flowbite.com
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
      <div>
        {/* <form className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered sm:w-24 md:w-auto"
          />
        </form> */}
      </div>
      <Navbar.Collapse>
        <Navbar.Link active={location.pathname === "/login"} as={"div"}>
          <Link className="cursor-pointer text-xl font-bold" to="/login">
            Login
          </Link>
        </Navbar.Link>
        <Navbar.Link active={location.pathname === "/projects"} as={"div"}>
          <Link
            active={location.pathname === "/projects"}
            className="cursor-pointer text-xl font-bold"
            to="/projects"
          >
            projects
          </Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
