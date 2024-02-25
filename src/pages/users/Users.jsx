import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import useGetPosts from "../../hook/useGetPosts";
import { Link } from "react-router-dom";
import { Table, TableCell, TableHead } from "flowbite-react";
import { FaRegTrashAlt } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import useGetUsers from "../../hook/useGetUsers";
export default function Users() {
  const { currentUser } = useSelector((state) => state.user);
  //   const {
  //     loading,
  //     posts,
  //     getPosts,
  //     handleShowAllPosts,
  //     showMoreButton,
  //     handleDeletePost,
  //   } = useGetPosts();
  const { getUsers, users, handleDeleteuser } = useGetUsers();

  useEffect(() => {
    if (currentUser?.isAdmin) {
      //   getPosts();
      getUsers();
    }
  }, [currentUser?._id]);
  //   console.log(posts);
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
                  <Table.Cell>{user?.isAdmin ? "Admin" : "User"}</Table.Cell>

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
    </div>
  );
}
