import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <div className="min-h-screen mt-24  p-6 flex flex-col md:flex-row gap-6">
      <div className="flex-1 sm:mt-20 ">
        <h1 className="text-4xl font-semibold text-center">Go With Us</h1>
        <p className="text-center text-xl">
          Find A very effective and necessary information from us
        </p>
      </div>
      <div className="flex-1 shadow-2xl p-6 rounded-lg shadow-sky-100">
        <form className="flex max-w-md flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="name" value="Your Name" />
            </div>
            <TextInput id="name" type="email" placeholder="name" required />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email1" value="Your email" />
            </div>
            <TextInput id="email" type="email" placeholder="email" required />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password1" value="Your password" />
            </div>
            <TextInput id="password1" type="password" required />
          </div>

          <Button type="submit">Submit</Button>
          <div>
            <p className="mt-8 text-center font-semibold text-slate-800">
              Already a member?
              <Link className="text-blue-400 ml-2" to="/login">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
