import { Button, FileInput, Select, Spinner, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import useAxiosPublic from "../../apiCallHooks/useAxiosPublic";
import useAxiosSecure from "../../apiCallHooks/useAxiosSecure";
import useAuth from "../../hook/useAuth";
import Swal from "sweetalert2";
import { useShowPost } from "../../apiCallHooks/showPost";
import { useParams } from "react-router-dom";
export default function Edit() {
  const { id } = useParams();
  const { user } = useAuth();

  const { refetch } = useShowPost();
  const [formData, setFormData] = useState({});
  const [imageFile, setImageFile] = useState(formData?.image);

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

  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosSecure.get(`/post/${id}`);
      setFormData(res.data);
    };
    if (formData) {
      fetchData();
    }
  }, [id]);
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    const userPostData = {
      ...formData,
      createdAt: new Date(),
    };
    const res = await axiosSecure.patch(`/posts/edit/${id}`, userPostData);
    // console.log(res);
    if (res.data.success) {
      refetch();
      Swal.fire({
        icon: "success",
        title: "Save the changes",
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
            value={formData?.title || ""}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          ></TextInput>
          <Select
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            value={formData?.category || ""}
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
        <div className="flex  gap-6 items-center justify-between border-4 border-teal-950 border-dotted p-4">
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
          />
          <Button onClick={handleUploadImage} type="button">
            Upload Image
          </Button>
          <img src={formData?.image} alt="image" className="w-20 h-20" />
        </div>
        <ReactQuill
          theme="snow"
          placeholder="write relevent things"
          className="h-60 mb-16"
          value={formData?.content || ""}
          onChange={(value) => setFormData({ ...formData, content: value })}
        />
        <Button disabled={isButtonDisabled} type="submit">
          {loading ? <Spinner /> : "Update "}
        </Button>
      </form>
    </div>
  );
}
