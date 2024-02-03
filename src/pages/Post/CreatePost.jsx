import { Button, FileInput, Select, Spinner, TextInput } from "flowbite-react";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import useAxiosPublic from "../../apiCallHooks/useAxiosPublic";
import useAxiosSecure from "../../apiCallHooks/useAxiosSecure";
import useAuth from "../../hook/useAuth";
import Swal from "sweetalert2";
export default function CreatePost() {
  const { user } = useAuth();
  const [imageFile, setImageFile] = useState(null);

  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const image_key = import.meta.env.VITE_IMAGE_API_KEY;
  //   console.log(image_key);
  const image_hosting = `https://api.imgbb.com/1/upload?key=${image_key}`;
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  //   const handlePost = async (e) => {
  //     e.preventdefault();
  //   };
  //   console.log(imageFile);

  const handleUploadImage = async () => {
    const image = { image: imageFile };
    const res = await axiosPublic.post(image_hosting, image, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    setFormData({ ...formData, image: res.data.data.display_url });
  };

  //   console.log(formData);

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    const userPostData = {
      ...formData,
      userEmail: user?.email,
      createdAt: new Date(),
      privacy: "public",
    };
    const res = await axiosSecure.post("/create-post", userPostData);
    // console.log(res);
    if (res.data.insertedId) {
      Swal.fire({
        icon: "success",
        title: "Post created successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    setLoading(false);
    // setImageFile(null);
    // setFormData({});
  };
  console.log(formData);
  const isButtonDisabled =
    formData?.image === null || formData?.image === undefined ? true : false;
  //   console.log(isButtonDisabled);
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-3xl font-bold mb-3 text-center">Create Post</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmitForm}>
        <div className="flex flex-col gap-6 sm:flex-row justify-between">
          <TextInput
            type="text"
            className="flex-1"
            placeholder="title"
            id="title"
            required
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          ></TextInput>
          <Select
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            <option value="uncategorized">Select a Category</option>
            <option value="technology">Technology</option>
            <option value="lifestyle">Lifestyle</option>
            <option value="food">Food</option>
            <option value="travel">Travel</option>
            <option value="fashion">Fashion</option>
            <option value="sports">Sports</option>
            <option value="entertainment">Entertainment</option>
            <option value="music">Music</option>
            <option value="art">Art</option>
            <option value="science">Science</option>
            <option value="history">History</option>
            <option value="politics">Politics</option>
            <option value="education">Education</option>
            <option value="health">Health</option>
            <option value="environment">Environment</option>
            <option value="technology">Technology</option>
            <option value="business">Business</option>
            <option value="entertainment">Entertainment</option>
            <option value="sports">Sports</option>
          </Select>
        </div>
        <div className="flex gap-6 items-center justify-between border-4 border-teal-950 border-dotted p-4">
          <FileInput
            type="file"
            accept="image/*"
            required
            onChange={(e) => setImageFile(e.target.files[0])}
          />
          <Button onClick={handleUploadImage} type="button">
            Upload Image
          </Button>
        </div>
        <ReactQuill
          theme="snow"
          placeholder="write relevent things"
          className="h-60 mb-16"
          onChange={(value) => setFormData({ ...formData, content: value })}
        />
        <Button disabled={isButtonDisabled} type="submit">
          {loading ? <Spinner /> : "create A post"}
        </Button>
      </form>
    </div>
  );
}
