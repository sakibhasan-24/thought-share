import {
  Avatar,
  Button,
  Card,
  Dropdown,
  FileInput,
  Label,
  TextInput,
} from "flowbite-react";
import useAuth from "../../hook/useAuth";
import { useState } from "react";

export default function Profile() {
  const { user } = useAuth();
  const [isEdit, setIsEdit] = useState(false);
  const showEditForm = () => {
    setIsEdit(!isEdit);
  };
  // console.log(user);
  return (
    <div>
      <Card className="w-full md:max-w-xl mx-auto my-12">
        <div className="flex justify-end px-4 pt-4">
          <Dropdown inline label="action">
            <Dropdown.Item>
              <Button
                onClick={showEditForm}
                color="success"
                className="block px-2 py-1 text-sm "
              >
                Edit
              </Button>
            </Dropdown.Item>

            <Dropdown.Item>
              <Button
                gradientMonochrome="failure"
                className="block px-2 py-1 text-sm text-white-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Delete
              </Button>
            </Dropdown.Item>
            <Dropdown.Item>
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
              src={user?.photoURL}
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
                <Label htmlFor="file-upload" value="change image" />
              </div>
              <FileInput id="file-upload" />
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
