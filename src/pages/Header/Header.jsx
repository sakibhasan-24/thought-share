import { Button, Navbar, TextInput } from "flowbite-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";
export default function Header() {
  const location = useLocation();

  return (
    <Navbar className="border-b-2 border-sky-200 sm:p-4">
      <Link className="font-bold text-xs sm:text-xl " to="/">
        Thought
        <span className="bg-[#5cbdb9] px-1 rounded-xl sm:text-2xl dark:text-slate-300 mx-0">
          Share
        </span>
      </Link>
      <form>
        <TextInput
          className="hidden sm:inline"
          type="text"
          placeholder="search..."
          rightIcon={AiOutlineSearch}
        />
        <Button className="rounded-full sm:hidden w-8 h-8">
          <AiOutlineSearch />
        </Button>
      </form>
      <div className="flex gap-2 md:order-2">
        <Button className="w-8 h-8 sm:w-10 sm:h-10">
          <FaMoon />
        </Button>
        <Link to="/signup">
          <Button gradientDuoTone="greenToBlue">SignUp</Button>
        </Link>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link as={"div"} active={location.pathname === "/"}>
          <Link to="/">Home</Link>
        </Navbar.Link>
        <Navbar.Link as={"div"} active={location.pathname === "/about"}>
          <Link to="/about">About</Link>
        </Navbar.Link>
        <Navbar.Link as={"div"} active={location.pathname === "/projects"}>
          <Link to="/projects">Projects</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
