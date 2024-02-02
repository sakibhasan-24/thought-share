import {
  Avatar,
  Button,
  Card,
  Dropdown,
  FileInput,
  Label,
  TextInput,
} from "flowbite-react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import useAuth from "../../hook/useAuth";
import { useEffect, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import app from "../../firebase/firebase.config";

export default function Profile() {
  const { user } = useAuth();
  const [isEdit, setIsEdit] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imageProgress, setImageProgress] = useState(0);
  const [imageUploadError, setImageUploadError] = useState(null);

  const showEditForm = () => {
    setIsEdit(!isEdit);
  };
  // console.log(user);

  // task-1 upload image and get an url

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    // console.log(file);
    setImageFile(file);
    setImageUrl(URL.createObjectURL(file));
  };
  useEffect(() => {
    if (imageFile) {
      // call function
      uploadImage();
    }
  }, [imageFile]);
  // console.log(imageFile);
  // function of upload image
  const uploadImage = async () => {
    // console.log("image uploading..............");
    const storage = getStorage(app);
    const fileName = `${user?.email}_${imageFile.name}_${new Date().getTime()}`;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // console.log("Upload is " + progress + "% done");
        setImageProgress(progress.toFixed(0));
      },
      (error) => {
        setImageUploadError(error.message);
      },
      () =>
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setImageUrl(downloadUrl);
        })
    );
  };

  // console.log(userFormData);
  // store it with display name in firebase
  // also update in mongodb database

  console.log(imageUploadError, imageProgress);
  return (
    <div>
      <Card className="w-full md:max-w-xl mx-auto my-12">
        <div className="flex justify-end px-4 pt-4">
          <Dropdown inline label="action">
            <Dropdown.Item as="div">
              <Button
                onClick={showEditForm}
                color="success"
                className="block px-2 py-1 text-sm "
              >
                Edit
              </Button>
            </Dropdown.Item>

            <Dropdown.Item as="div">
              <Button
                gradientMonochrome="failure"
                className="block px-2 py-1 text-sm text-white-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Delete
              </Button>
            </Dropdown.Item>
            <Dropdown.Item as="div">
              <Button
                color="warning"
                className="block px-2 py-1 text-sm text-white-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Sign Out
              </Button>
            </Dropdown.Item>
          </Dropdown>
        </div>
        <div className="flex flex-col items-center pb-10">
          <div className="font-bold text-xl my-4 sm:text-2xl ">
            <h1>Profile</h1>
          </div>
          <div className="h-[40px] w-[40px] ">
            <img
              src={imageUrl || user?.photoURL}
              alt="image"
              className="object-cover w-full rounded-full"
            />
          </div>
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {user?.displayName}
          </h5>
          <span className="text-sm bg-slate-950 text-gray-200 px-4 py-2 rounded-lg dark:text-gray-400">
            Admin
          </span>
        </div>
      </Card>
      {/* edit form */}
      {isEdit && (
        <div className="max-w-xl mx-auto">
          <h1 className="text-2xl font-bold  text-center text-slate-800">
            Edit Profile
          </h1>
          <form className="flex flex-col gap-6 my-6 shadow-2xl shadow-slate-200 p-6">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Your email" />
              </div>
              <TextInput
                id="email"
                type="email"
                defaultValue={user?.email}
                readOnly
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="Your name" />
              </div>
              <TextInput
                id="name"
                type="name"
                defaultValue={user?.displayName}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label value="change image" />
              </div>
              <input
                type="file"
                id="imageUpload"
                onChange={handleImageUpload}
              />
              {/* {imageProgress > 0 && (
                <CircularProgressbar
                  className="text-xs w-[40px] h-[40px]"
                  as="span"
                  maxValue={1}
                  text={`${imageProgress}`}
                />
              )} */}
            </div>
            <Button color="success">Update </Button>
            <Button type="button" color="failure" className="text-slate-100">
              forget Password
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}
