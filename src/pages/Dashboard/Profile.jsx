import { Avatar, Button, Card, Dropdown } from "flowbite-react";
import useAuth from "../../hook/useAuth";

export default function Profile() {
  const { user } = useAuth();
  // console.log(user);
  return (
    <div>
      <Card className="w-full md:max-w-xl mx-auto my-12">
        <div className="flex justify-end px-4 pt-4">
          <Dropdown inline label="action">
            <Dropdown.Item>
              <Button color="success" className="block px-2 py-1 text-sm ">
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
    </div>
  );
}
