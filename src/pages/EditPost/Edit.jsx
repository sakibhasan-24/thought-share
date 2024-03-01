import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import {
  Button,
  FileInput,
  Modal,
  Select,
  Spinner,
  TextInput,
} from "flowbite-react";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// import useCreatePost from "../../../hook/useCreatePost";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import app from "../../firebase/firebase.config";
// import useCreatePost from "../../hook/useCreatePost";
import useAxiosPublic from "../../hook/useAxiosPublic";
import useUpdatePost from "../../hook/useUpdatePost";

export default function Edit() {
  const { id } = useParams();
  //   console.log(id);
  const navigate = useNavigate();
  const { postLoading, updatePost } = useUpdatePost();
  const [loading, setLoading] = useState(true);

  const [upload, setUpload] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [imageUrl, setImageUrl] = useState(null);
  const axiosPublic = useAxiosPublic();
  useEffect(() => {
    const fetchSinglePost = async (id) => {
      setLoading(false);
      try {
        const res = await axiosPublic(`/api/post/get-posts?postId=${id}`);
        const data = await res.data;
        setFormData(data.posts[0]);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSinglePost(id);
  }, [id]);
  //   console.log(formData);
  //   console.log(formData?.blogImage);
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setUpload(progress);

        if (progress < 100 && progress > 0) {
        }
        // console.log("Upload is " + progress + "% done");
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData((prevFormData) => ({
            ...prevFormData,
            blogImage: downloadURL,
          }));
          console.log(formData.blogImage);
          setImageUrl(downloadURL);
        });
      }
    );
  };
  useEffect(() => {
    if (upload >= 0 && upload <= 100) {
      setOpenModal(true);
    }
  }, [upload]);
  useEffect(() => {
    if (imageUrl === null) {
      setOpenModal(false);
    }
  }, [imageUrl]);
  //   console.log(formData);
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    // console.log(formData);
    const savedData = await updatePost(id, formData);
    // console.log(savedData);-
    if (savedData) {
      Swal.fire({
        icon: "success",
        title: "Post Update  Successfully",
        timer: 1500,
      });
      //   navigate(`/post-details/${savedData?.title}/${savedData?._id}`);
      //   navigate();
    }
  };
  //   console.log(formData.blogImage);
  return (
    <div className="min-h-screen p-4 max-w-3xl mx-auto ">
      <h1 className="text-2xl font-bold mb-4 text-center">Update a Post</h1>
      <div>
        <form className="flex flex-col gap-6" onSubmit={handleSubmitForm}>
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <TextInput
              type="text"
              required
              placeholder="Title"
              className="flex-1"
              id="title"
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              value={formData?.title && formData?.title}
            />
            <Select
              id="category"
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              value={formData?.category && formData?.category}
            >
              <option value="uncategorized">Select A category</option>
              <option value="educational">Educational</option>
              <option value="entertainment">Entertainment</option>
              <option value="technology">Technology</option>
              <option value="political">Political</option>
              <option value="sports">Sports</option>
              <option value="history">History</option>
              <option value="Food">Food</option>
              <option value="culture">culture</option>
              <option value="travel">Travel</option>
              <option value="SoftwareEngineering"> Software Engeerning</option>
            </Select>
          </div>
          <div className="px-4 py-6 border-2 border-blue-600 border-dashed">
            <FileInput
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />
            {/* modal */}
            {upload > 0 && (
              <>
                <Modal show={openModal} size="md" popup>
                  <Modal.Header />
                  <Modal.Body>
                    <div className="text-center">
                      <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                        Are you sure you want to Confirm this photo?
                      </h3>
                      <div>
                        <img
                          src={formData?.blogImage}
                          alt="img"
                          className="w-full rounded-md p-4"
                        />
                      </div>
                      <div className="flex justify-center gap-4">
                        <Button
                          color="success"
                          onClick={() => setOpenModal(false)}
                        >
                          {"Yes, I'm sure"}
                        </Button>
                        <Button color="gray" onClick={() => setImageUrl(null)}>
                          No, change it
                        </Button>
                      </div>
                    </div>
                  </Modal.Body>
                </Modal>
              </>
            )}
            {/* end of modal */}
            {formData.blogImage && (
              <div>
                <img
                  src={formData?.blogImage}
                  alt="img"
                  className="w-full rounded-md p-4"
                />
                <Button onClick={() => setImageUrl(null)}>Delete</Button>
              </div>
            )}
          </div>
          <ReactQuill
            theme="snow"
            value={formData?.content}
            placeholder="write your post"
            onChange={(value) => setFormData({ ...formData, content: value })}
          />
          <Button type="submit" outline gradientDuoTone="pinkToOrange">
            Update
          </Button>
        </form>
      </div>
    </div>
  );
}
