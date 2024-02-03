import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../apiCallHooks/useAxiosSecure";
import {
  Alert,
  Spinner,
  Table,
  TableHead,
  TableHeadCell,
} from "flowbite-react";
import TableData from "../../components/TableData";

const axiosSecure = useAxiosSecure();

export default function Posts() {
  const {
    data: posts,
    refetch,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await axiosSecure.get("/posts");
      // console.log(res.data);
      return res.data;
    },
  });
  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <Alert>Something went wrong</Alert>;
  }

  return (
    <div className="table-auto md:mx-auto p-4 overflow-x-auto  scrollbar scrollbar-track-slate-200 scrollbar-thumb-slate-800">
      {/* overflow-x-scroll md:mx-auto p-8 scrollbar scrollbar-track-slate-700 scrollbar-thumb-slate-800 */}
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
              <TableData key={post._id} contentsOfTable={post} />
            ))}
          </Table>
        </>
      ) : (
        "nothing is found"
      )}
    </div>
  );
  // console.log(posts.posts.length);
}
