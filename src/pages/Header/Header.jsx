import { Button, Navbar, TextInput } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
export default function Header() {
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
        <Button className="rounded-full sm:hidden">
          <AiOutlineSearch />
        </Button>
      </form>
    </Navbar>
  );
}
