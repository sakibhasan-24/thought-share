import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useAxiosPublic from "../../hook/useAxiosPublic";
import useUserUpdate from "../../hook/useUserUpdate";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import app from "../../firebase/firebase.config";
import Swal from "sweetalert2";
import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import {
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailed,
  logOutSuccess,
} from "../../redux/store/userSlice";
import userDelete from "../../hook/userDelete";
import useLogOut from "../../hook/useLogOut";
import { useNavigate } from "react-router-dom";
export default function Profile() {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [email, setEmail] = useState("");

  const { logOut } = useLogOut();
  function onCloseModal() {
    setOpenModal(false);
    setEmail("");
  }

  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { updateUser, updateMessage } = useUserUpdate();
  const IMAGE_HOISTING = import.meta.env.VITE_IMAGE_API_KEY;
  const fileRef = useRef(null);
  const IMAGE_URL = `https://api.imgbb.com/1/upload?key=${IMAGE_HOISTING}`;
  const axiosPublic = useAxiosPublic();
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progressOfImage, setProgressOfImage] = useState(0);
  const [formData, setFormData] = useState({});
  const [confirmation, setConfirmation] = useState(true);
  const { deleteUser } = userDelete();
  useEffect(() => {
    if (email === currentUser?.email) {
      // console.log(email === currentUser?.email);
      setConfirmation(false);
    }
  }, [email]);
  // console.log(email);
  const handleImageChange = async (e) => {
    setLoading(true);
    // setImageFile(e.target.files[0]);
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("image", image);
    // try {
    //   const res = await axiosPublic.post(IMAGE_URL, formData, {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //   });
    //   console.log(res);
    //   setImageFile(res.data.data.display_url);
    //   setFormData({
    //     ...formData,
    //     profilePicture: res?.data?.data?.display_url,
    //   });
    // } catch (error) {
    //   console.log(error);
    // }
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgressOfImage(progress);
        if (progress < 100 && progress > 0) {
          setLoading(true);
        }
        // console.log("Upload is " + progress + "% done");
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({
            ...formData,
            profilePicture: downloadURL,
          });
          setImageFile(downloadURL);
          setLoading(false);
        });
      }
    );
  };
  // console.log(formData);
  //   console.log(Object.keys(formData).length);
  const handleUpdateForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await updateUser(formData);
      // console.log(result);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Profile updated successfully",
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id) => {
    // console.log(id);
    setLoading(true);
    try {
      const res = await deleteUser(id);
      if (res) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "User deleted successfully",
        });
        dispatch(deleteUserSuccess(res));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const handleLogOut = async (id) => {
    try {
      const res = await logOut(id);
      dispatch(logOutSuccess(res));
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Logged out successfully",
      });
      navigate("/login");
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

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
            {loading && (
              <p className="text-green-800 text-center font-semibold">
                image uploading {progressOfImage}%
              </p>
            )}
          </div>
          <div>
            <form
              onSubmit={handleUpdateForm}
              className="my-6 flex flex-col space-y-4 gap-4"
            >
              <input
                type="text"
                name="userName"
                id="userName"
                defaultValue={currentUser?.userName}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-100"
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.id]: e.target.value })
                }
              />
              <input
                type="email"
                name="email"
                id="email"
                defaultValue={currentUser?.email}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-100"
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.id]: e.target.value })
                }
              />
              <input
                type="password"
                name="password"
                id="password"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-100"
                placeholder="**************************"
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.id]: e.target.value })
                }
              />
              {/* {Object.keys(formData).length > 0 && ( */}
              <input
                type="submit"
                value={`${loading ? "updating........." : "update"}`}
                className="w-full rounded-lg bg-slate-800 text-white px-2 py-2 cursor-pointer hover:bg-slate-700 transition-all duration-200"
              />
            </form>
            <div className="flex items-center justify-between">
              <button
                onClick={() => handleLogOut(currentUser?._id)}
                className="bg-orange-700 text-slate-300 px-4 py-2 rounded-lg"
              >
                SignOut
              </button>
              <>
                <button
                  className="text-red-600 hover:underline"
                  onClick={() => setOpenModal(true)}
                >
                  Delete
                </button>
                <Modal show={openModal} size="md" onClose={onCloseModal} popup>
                  <Modal.Header />
                  <Modal.Body>
                    <div className="mb-2 block">
                      <Label htmlFor="email" value="Your email" />
                    </div>
                    <TextInput
                      id="email"
                      placeholder="name@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <Modal.Body>
                      <div className="text-center">
                        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                          Are you sure you want to delete this product?
                        </h3>
                        <div className="flex justify-center gap-4">
                          <Button
                            color="failure"
                            disabled={confirmation}
                            // onClick={() => setOpenModal(false)}
                            onClick={() => handleDeleteUser(currentUser?._id)}
                          >
                            {"Yes, I'm sure"}
                          </Button>
                          <Button
                            color="gray"
                            onClick={() => setOpenModal(false)}
                          >
                            No, cancel
                          </Button>
                        </div>
                      </div>
                    </Modal.Body>
                  </Modal.Body>
                </Modal>
              </>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
