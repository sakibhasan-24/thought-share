import React from "react";
import GoogleSignUpButton from "../../components/GoogleSignUpButton";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="max-w-2xl my-8 mx-auto p-8 shadow-2xl shadow-blue-950 ">
      <h1 className="text-4xl font-bold mb-6 text-center tracking-wider">
        Login
      </h1>
      <form>
        <div className="mb-4 space-y-6">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="user email"
            className="w-full rounded-lg py-4 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="*************"
            className="w-full rounded-lg py-4 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />

          <input
            type="submit"
            value="login"
            className="w-full bg-slate-900 px-4 py-4 rounded-lg cursor-pointer text-slate-50 font-bold uppercase hover:bg-slate-600"
          />
          <GoogleSignUpButton />
        </div>
      </form>
      <div className="text-md text-center ">
        <p>
          Don{"'t"} have an account? <Link to="/signup">SignUp</Link>{" "}
        </p>
      </div>
    </div>
  );
}
