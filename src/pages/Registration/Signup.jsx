import {
  Button,
  Checkbox,
  FileInput,
  Label,
  Spinner,
  TextInput,
} from "flowbite-react";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";

import useAxiosPublic from "../../apiCallHooks/useAxiosPublic";
import useAuth from "../../hook/useAuth";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import app from "../../firebase/firebase.config";
import Swal from "sweetalert2";
import GoogleButton from "../../components/GoogleButton";

export default function Signup() {
  const { user, createUser, updateUser } = useAuth();
  const navigate = useNavigate();
  // console.log(user);

  const axiosPublic = useAxiosPublic();
  const [formData, setFormData] = useState({});
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleOnChange = (e) => {
    if (e.target.type === "file") {
      setFormData({ ...formData, [e.target.id]: e.target.files[0] });
    }
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmitForm = async (e) => {
    setLoading(true);
    e.preventDefault();

    const email = formData?.email;
    // const password = formData?.password;
    const name = formData?.name;
    // create user in firebase
    const userInFirebase = await createUser(email, formData?.password);

    // console.log(userInFirebase);
    // console.table();
    // end of createUser in firebase
    const userImageFile = e.target.userImage.files[0];
    const storage = getStorage(app);
    const storageRef = ref(
      storage,
      `${new Date().getTime()}${userImageFile.name}`
    );
    const uploadTask = uploadBytesResumable(storageRef, userImageFile);

    await uploadTask;
    const url = await getDownloadURL(uploadTask.snapshot.ref);
    setImageUrl(url);
    // now update it for photo and display name

    await updateUser(name, url);
    const userInfo = {
      email,
      name,
      userPhoto: url,
      userCreated: userInFirebase.user.metadata.createdAt,
    };
    const res = await axiosPublic.post("/users", userInfo);
    if (res.data.success) {
      Swal.fire({
        icon: "success",
        text: "User created successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/login");
    }
    setLoading(false);
    // console.log("hello");
    // end of update it for photo and display name
  };
  // console.log(imageUrl);
  return (
    <div className="min-h-screen mt-24  p-6 flex flex-col md:flex-row gap-6">
      <div className="flex-1 sm:mt-20 ">
        <h1 className="text-4xl font-semibold text-center">Go With Us</h1>
        <p className="text-center text-xl">
          Find A very effective and necessary information from us
        </p>
      </div>
      <div className="flex-1 shadow-2xl p-6 rounded-lg shadow-sky-100">
        <form
          onSubmit={handleSubmitForm}
          className="flex max-w-md flex-col gap-4"
        >
          <div>
            <div className="mb-2 block">
              <Label htmlFor="name" value="Your Name" />
            </div>
            <TextInput
              id="name"
              type="text"
              placeholder="name"
              required
              onChange={handleOnChange}
            />
          </div>
          <div>
            <div>
              <Label htmlFor="file-upload-helper-text" value="Upload Image" />
            </div>
            <input
              type="file"
              onChange={handleOnChange}
              id="userImage"
              name="userImage"
              className="rounded-lg"
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email1" value="Your email" />
            </div>
            <TextInput
              id="email"
              type="email"
              placeholder="email"
              required
              onChange={handleOnChange}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password1" value="Your password" />
            </div>
            <TextInput
              id="password"
              type="password"
              required
              onChange={handleOnChange}
            />
          </div>

          <Button disabled={loading} type="submit">
            {loading ? <Spinner /> : "Sign Up"}
          </Button>
          <GoogleButton />
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
