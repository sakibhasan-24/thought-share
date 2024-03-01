import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useGetPosts from "../../hook/useGetPosts";
import { Link } from "react-router-dom";
import {
  Button,
  Checkbox,
  Label,
  Modal,
  Table,
  TableCell,
  TableHead,
  TextInput,
} from "flowbite-react";
import { FaRegTrashAlt } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import useGetUsers from "../../hook/useGetUsers";
import useAdminRequest from "../../hook/useAdminRequest";
export default function Users() {
  const { currentUser } = useSelector((state) => state.user);
  const [openModal, setOpenModal] = useState(false);
  const [user, setUser] = useState({});
  const [isChecked, setIsChecked] = useState(false);
  const [status, setStatus] = useState("");
  function onCloseModal() {
    setOpenModal(false);
  }

  //   const {
  //     loading,
  //     posts,
  //     getPosts,
  //     handleShowAllPosts,
  //     showMoreButton,
  //     handleDeletePost,
  //   } = useGetPosts();
  const { getUsers, users, handleDeleteuser, getUser } = useGetUsers();
  const { handleRequest } = useAdminRequest();
  useEffect(() => {
    if (currentUser?.isAdmin) {
      //   getPosts();
      getUsers();
    }
  }, [currentUser?._id]);
  //   console.log(posts);

  const handleChangeStatus = async (user) => {
    setOpenModal(true);
    const result = await getUser(user._id);
    setUser(result?.user);
  };

  const handleReject = async (id) => {
    setOpenModal(false);
    const status = "reject";
    const result = await handleRequest(status, id);
    console.log(result);
  };
  const handleAccept = async (id) => {
    setOpenModal(false);
    const status = "approve";
    const result = await handleRequest(status, id);
    console.log(result);
  };
  // console.log("user", user);
  return (
    <div className="p-3 table-auto overflow-x-scroll md:overflow-hidden md:mx-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-blue-600 bg-white">
      {currentUser?.isAdmin && users.length > 0 ? (
        <>
          <Table hoverable className="shadow-lg ">
            <Table.Head>
              <Table.HeadCell>Date</Table.HeadCell>
              <Table.HeadCell>Image</Table.HeadCell>
              <Table.HeadCell>Name</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Role</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>
            {users.map((user) => (
              <Table.Body key={user._id}>
                <Table.Row className="border-b dark:border-neutral-500">
                  <Table.Cell className="font-medium text-xs">
                    {new Date(user.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/users/${user.title}/${user._id}`}>
                      <img
                        src={user?.profilePicture}
                        alt="image"
                        className="w-[40px] h-[40px] rounded-full object-coverv hover:scale-125 transition-all duration-300 ease-in-out"
                      />
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/users/${user.title}/${user._id}`}>
                      {user.userName}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>{user?.email}</Table.Cell>

                  {/* <Table.Cell>{user?.isAdmin ? "Admin" : "User"}</Table.Cell> */}
                  <Table.Cell>
                    {user?.isAdmin ? (
                      "Admin"
                    ) : user?.adminRequest ? (
                      <button onClick={() => handleChangeStatus(user)}>
                        Pending
                      </button>
                    ) : (
                      "User"
                    )}
                  </Table.Cell>

                  <Table.Cell>
                    <FaRegTrashAlt
                      onClick={() => handleDeleteuser(user?._id)}
                      className="cursor-pointer hover:text-red-600 text-2xl"
                    />
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
          {/* {showMoreButton && (
            <button
              onClick={handleShowAllPosts}
              className="bg-slate-800 my-6  text-white rounded-lg font-semibold px-4 py-2   mx-auto"
            >
              Show More
            </button>
          )} */}
        </>
      ) : (
        <>
          <p>currently You Have No Posts</p>
          <Link to="/dashboard/create-post">Create Post</Link>
        </>
      )}
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-center text-gray-900 dark:text-white">
              Make Admin
            </h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Your email" />
              </div>
              <TextInput
                id="email"
                // placeholder="name@company.com"
                defaultValue={currentUser?.email || email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="userName" value=" userName" />
              </div>
              <TextInput
                id="userName"
                defaultValue={currentUser?.userName}
                type="userName"
                required
              />
            </div>
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleAccept(user?._id)}
                  className="bg-success px-4 py-2 rounded-lg font-bold  cursor-pointer hover:bg-green-800"
                >
                  Make Admin
                </button>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleReject(user?._id)}
                  className="bg-red-600 px-4 py-2 rounded-lg font-bold  cursor-pointer hover:bg-red-800"
                >
                  Reject
                </button>
              </div>
            </div>
            <div className="w-full">
              <Link
                to="/dashboard/profile"
                className="text-sm text-cyan-700 hover:underline dark:text-cyan-500"
              >
                Go <span>Profile</span>
              </Link>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
