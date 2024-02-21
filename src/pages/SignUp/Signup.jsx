import React, { useState } from "react";
import GoogleSignUpButton from "../../components/GoogleSignUpButton";
import { Link, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hook/useAxiosPublic";
import useCreateUser from "../../hook/useCreateUser";
import Swal from "sweetalert2";
const IMAGE_HOISTING = import.meta.env.VITE_IMAGE_API_KEY;

const IMAGE_URL = `https://api.imgbb.com/1/upload?key=${IMAGE_HOISTING}`;
export default function Signup() {
  const { saveUserWhileSignUp } = useCreateUser();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const [imageUrl, setImageUrl] = useState("");
  const [formData, setFormData] = useState({});
  const handleChange = (e) => {
    if (e.target.name === "image") {
      const image = e.target.files[0];
      setFormData({ ...formData, image });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("image", image);
    const res = await axiosPublic.post(IMAGE_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      params: {
        key: IMAGE_HOISTING,
      },
    });
    setImageUrl(res.data.data.display_url);
  };
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const data = {
      ...formData,
      profilePicture: imageUrl,
    };
    // console.log(data);
    if (formData.password !== formData.confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Password and Confirm Password does not match!",
        timer: 1500,
      });
      return;
    }
    const res = await saveUserWhileSignUp(data);
    //
    // console.log(res);
    if (res.success === false) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `${res.message}`,
      });
    }
    if (res.success === true) {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: `${res.message}`,
        timer: 1500,
      });
      navigate("/login");
    }
  };
  return (
    <div className="max-w-2xl my-8 mx-auto p-8 shadow-2xl shadow-blue-950 ">
      <h1 className="text-4xl font-bold mb-6 text-center tracking-wider">
        Signup
      </h1>
      <form onSubmit={handleSubmitForm}>
        <div className="mb-4 space-y-6">
          <input
            type="text"
            name="userName"
            id="userName"
            placeholder="user name"
            className="w-full rounded-lg py-4 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            id="email"
            placeholder="user email"
            className="w-full rounded-lg py-4 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="*************"
            className="w-full rounded-lg py-4 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={handleChange}
          />
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="*************"
            className="w-full rounded-lg py-4 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={handleChange}
          />
          <p>Upload Image</p>
          <input
            type="file"
            name="image"
            id="image"
            onChange={handleImageUpload}
          />
          {imageUrl && (
            <>
              <img
                src={imageUrl}
                alt="Uploaded"
                className="w-[100px]  rounded-2xl h-[100px] "
              />
              <button onClick={() => setImageUrl(null)}>❌</button>
            </>
          )}
          <input
            type="submit"
            value="sign up"
            className="w-full bg-slate-900 px-4 py-4 rounded-lg cursor-pointer text-slate-50 font-bold uppercase hover:bg-slate-600"
          />
          <GoogleSignUpButton />
        </div>
      </form>
      <div className="text-md text-center ">
        <p>
          already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
