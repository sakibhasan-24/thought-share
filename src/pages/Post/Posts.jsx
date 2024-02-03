import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../apiCallHooks/useAxiosSecure";
import {
  Alert,
  Spinner,
  Table,
  TableHead,
  TableHeadCell,
} from "flowbite-react";
import TableData from "../../components/TableData";
import { useShowPost } from "../../apiCallHooks/showPost";
import Swal from "sweetalert2";

const axiosSecure = useAxiosSecure();

export default function Posts() {
  const query = useQueryClient();
  const [showMore, setShowMore] = useState(true);

  // const {
  //   data: posts,
  //   refetch,
  //   isLoading,
  //   isError,
  // } = useQuery({
  //   queryKey: ["posts"],
  //   queryFn: async () => {
  //     const res = await axiosSecure.get("/posts");
  //     // console.log(res.data);
  //     return res.data;
  //   },
  // });
  const [startIndex, setStartIndex] = useState(0);
  const { posts, isError, isLoading, refetch } = useShowPost(startIndex);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <Alert>Something went wrong</Alert>;
  }

  // const handleShowMore = async () => {
  //   console.log(startIndex);
  //   setStartIndex(posts.totalPost);
  //   refetch();
  // };
  // console.log(posts);
  const handleDelete = (id) => {
    // console.log("deleted", id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosSecure.delete(`/posts/${id}`);
        refetch();
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };
  return (
    <div className="table-auto md:mx-auto p-4 overflow-x-auto  scrollbar scrollbar-track-slate-200 scrollbar-thumb-slate-800">
      {posts.posts.length > 0 ? (
        <>
          <Table hoverable className="shadow-md ">
            <TableHead>
              <TableHeadCell>Date</TableHeadCell>
              <TableHeadCell>image</TableHeadCell>
              <TableHeadCell>title</TableHeadCell>
              <TableHeadCell>category</TableHeadCell>
              <TableHeadCell>delete</TableHeadCell>
              <TableHeadCell>Edit</TableHeadCell>
            </TableHead>
            {posts.posts.map((post) => (
              <TableData
                key={post._id}
                contentsOfTable={post}
                handleDelete={handleDelete}
              />
            ))}
          </Table>
          {posts.totalPost > 9 && (
            <button className=" px-4 mx-auto my-6 bg-teal-500 font-bold py-4 hover:bg-teal-900 rounded-md">
              Show more
            </button>
          )}
        </>
      ) : (
        "nothing is found"
      )}
    </div>
  );
  // console.log(posts.posts.length);
}
