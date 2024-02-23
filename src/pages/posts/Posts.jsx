import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import useGetPosts from "../../hook/useGetPosts";
import { Link } from "react-router-dom";
import { Table, TableCell, TableHead } from "flowbite-react";
import { FaRegTrashAlt } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
export default function Posts() {
  const { currentUser } = useSelector((state) => state.user);
  const { loading, posts, getPosts } = useGetPosts();
  useEffect(() => {
    if (currentUser?.isAdmin) {
      getPosts();
    }
  }, [currentUser?._id]);
  //   console.log(posts);
  return (
    <div className="p-3 table-auto overflow-x-scroll md:overflow-hidden md:mx-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-blue-600 bg-white">
      {currentUser?.isAdmin && posts?.posts?.length > 0 ? (
        <>
          <Table hoverable className="shadow-lg ">
            <Table.Head>
              <Table.HeadCell>Date</Table.HeadCell>
              <Table.HeadCell>Image</Table.HeadCell>
              <Table.HeadCell>Title</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
              <Table.HeadCell>
                <span>Edit</span>
              </Table.HeadCell>
            </Table.Head>
            {posts?.posts?.map((post) => (
              <Table.Body key={post._id}>
                <Table.Row className="border-b dark:border-neutral-500">
                  <Table.Cell className="font-medium text-xs">
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/posts/${post.title}/${post._id}`}>
                      <img
                        src={post?.blogImage}
                        alt="image"
                        className="w-full h-[40px] rounded-full object-coverv hover:scale-125 transition-all duration-300 ease-in-out"
                      />
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/posts/${post.title}/${post._id}`}>
                      {post.title}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>{post?.category}</Table.Cell>
                  <Table.Cell>
                    <FaRegTrashAlt className="cursor-pointer hover:text-red-600 text-2xl" />
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={""}>
                      <CiEdit className="cursor-pointer hover:text-green-600 text-2xl" />
                    </Link>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
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
