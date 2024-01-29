import { Button, Label, Spinner, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hook/useAuth";
import Swal from "sweetalert2";
import GoogleButton from "../../components/GoogleButton";

export default function Login() {
  const { userLogIn } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    userLogIn(email, password).then((result) => {
      const user = result.user;
      if (user) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Login Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      form.reset();
      navigate("/");
    });
  };
  return (
    <div className="min-h-screen mt-24  p-6 flex flex-col md:flex-row gap-6">
      <div className="flex-1 sm:mt-20 ">
        <h1 className="text-4xl font-semibold text-center">Welcome Back</h1>
        <p className="text-center text-xl">
          Find A very effective and necessary information from us
        </p>
      </div>
      <div className="flex-1 shadow-2xl p-6 rounded-lg shadow-sky-100">
        <form onSubmit={handleLogin} className="flex max-w-md flex-col gap-4">
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
            <TextInput id="password" type="password" required />
          </div>

          <Button disabled={loading} type="submit">
            {loading ? <Spinner /> : "Login"}
          </Button>
          <GoogleButton />
          <div>
            <p className="mt-8 text-center font-semibold text-slate-800">
              don't have an account?
              <Link className="text-blue-400 ml-2" to="/signup">
                SignUp
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
