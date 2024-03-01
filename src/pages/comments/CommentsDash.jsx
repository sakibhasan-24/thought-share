import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import useGetPosts from "../../hook/useGetPosts";
import { Link } from "react-router-dom";
import { Table, TableCell, TableHead } from "flowbite-react";
import { FaRegTrashAlt } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import useGetUsers from "../../hook/useGetUsers";
import useGetComments from "../../hook/useGetComments";
export default function CommentsDash() {
  const { currentUser } = useSelector((state) => state.user);

  const { users, handleDeleteuser } = useGetUsers();
  const { getAllComments, comments, loading, handleDeleteComment } =
    useGetComments();

  useEffect(() => {
    if (currentUser?._id) getAllComments(currentUser?._id);
  }, [currentUser?._id]);
  return (
    <div className="p-3 table-auto overflow-x-scroll md:overflow-hidden md:mx-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-blue-600 bg-white">
      {comments.length > 0 ? (
        <>
          <Table hoverable className="shadow-lg ">
            <Table.Head>
              <Table.HeadCell>Date</Table.HeadCell>
              <Table.HeadCell>comment</Table.HeadCell>
              <Table.HeadCell>post</Table.HeadCell>

              <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>
            {comments.map((comment) => (
              <Table.Body key={comment._id}>
                <Table.Row className="border-b dark:border-neutral-500">
                  <Table.Cell className="font-medium text-xs">
                    {new Date(comment.updatedAt).toLocaleDateString()}
                  </Table.Cell>

                  <Table.Cell>{comment?.comment}</Table.Cell>
                  <Table.Cell>{comment?.postId}</Table.Cell>

                  <Table.Cell>
                    <FaRegTrashAlt
                      onClick={() => handleDeleteComment(comment?._id)}
                      className="cursor-pointer hover:text-red-600 text-2xl"
                    />
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
