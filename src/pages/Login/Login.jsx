import React, { useState } from "react";
import GoogleSignUpButton from "../../components/GoogleSignUpButton";
import { Link } from "react-router-dom";
import useLogIn from "../../hook/useLogIn";
// import { Toast } from "flowbite-react";
import Swal from "sweetalert2";

export default function Login() {
  const [loading, setLoading] = useState(false);

  const { logIn } = useLogIn();
  const [formData, setFormData] = useState({});
  const handleLogIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      //   console.log(formData);
      const res = await logIn(formData.email, formData.password);
      Swal.fire({
        icon: "success",
        title: "Logged in successfully",
        text: `Welcome back ${res.userName}`,
      });
    } catch (error) {
      console.log(error.response.data.message);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.response.data.message}`,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <div className="max-w-2xl cur my-8 mx-auto p-8 shadow-2xl shadow-blue-950 ">
      <h1 className="text-4xl font-bold mb-6 text-center tracking-wider">
        Login
      </h1>
      <form onSubmit={handleLogIn}>
        <div className="mb-4 space-y-6">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="user email"
            className="w-full rounded-lg py-4 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={handleOnChange}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="*************"
            className="w-full rounded-lg py-4 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={handleOnChange}
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
