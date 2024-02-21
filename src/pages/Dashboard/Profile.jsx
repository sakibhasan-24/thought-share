import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import useAxiosPublic from "../../hook/useAxiosPublic";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const IMAGE_HOISTING = import.meta.env.VITE_IMAGE_API_KEY;
  const fileRef = useRef(null);
  const IMAGE_URL = `https://api.imgbb.com/1/upload?key=${IMAGE_HOISTING}`;
  const axiosPublic = useAxiosPublic();
  const [imageFile, setImageFile] = useState(null);
  const handleImageChange = async (e) => {
    // setImageFile(e.target.files[0]);
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
    setImageFile(res.data.data.display_url);
  };
  console.log(imageFile);
  return (
    <div className="max-w-lg mx-auto">
      <div>
        <h1 className="text-center font-bold">
          Porfile <br />
          <span className="text-xl font-semibold text-orange-600">
            {currentUser.userName}
          </span>
        </h1>
        <div className="max-w-xl mx-auto p-4 rounded-lg shadow-2xl shadow-blue-950">
          <div>
            <input
              type="file"
              onChange={handleImageChange}
              accept="images/*"
              ref={fileRef}
              hidden
            />
            <img
              src={imageFile || currentUser?.profilePicture}
              alt="userImage"
              className="rounded-full w-[80px] h-[80px] mx-auto mt-4 object-cover cursor-pointer"
              title="Change Profile Picture"
              onClick={() => fileRef.current.click()}
            />
          </div>
          <div>
            <form className="my-6 flex flex-col space-y-4 gap-4">
              <input
                type="text"
                name="userName"
                id="userName"
                defaultValue={currentUser?.userName}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
              <input
                type="email"
                name="email"
                id="email"
                defaultValue={currentUser?.email}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
              <input
                type="password"
                name="password"
                id="password"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-100"
                placeholder="**************************"
              />
              <input
                type="submit"
                value={"update"}
                className="w-full rounded-lg bg-slate-800 text-white px-2 py-2 cursor-pointer hover:bg-slate-700 transition-all duration-200"
              />
            </form>
            <div className="flex items-center justify-between">
              <button className="bg-orange-700 text-slate-300 px-4 py-2 rounded-lg">
                SignOut
              </button>
              <button className="text-red-700 font-semibold hover:underline">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
